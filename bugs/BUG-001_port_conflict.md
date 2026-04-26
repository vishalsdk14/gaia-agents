# BUG: Agent Port Conflict (EADDRINUSE)

## Summary
Agents currently use a hardcoded port defined in their `manifest.json`. When multiple agents are executed on the same host, or if another process occupies the default port (3000), the agent fails to start with an `EADDRINUSE` error.

## Environment
- **Workspace**: `gaia-agents`
- **Component**: `pkg/core/gaia-agent.ts`
- **OS**: macOS (User Report)
- **Node.js**: v18+

## Steps to Reproduce
1. Start the `echo-agent` (which defaults to port 3000).
2. Attempt to start the `iris` agent (which also defaults to port 3000).
3. Observe the `iris` agent's console output.

## Actual Results
The second agent process crashes with the following error:
```text
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (node:net:1940:16)
    ...
  code: 'EADDRINUSE',
  errno: -48,
  syscall: 'listen',
  address: '::',
  port: 3000
```

## Expected Results
Agents should either:
1. Detect a port conflict and automatically increment the port number.
2. Support dynamic port allocation (port `0`) and register their actual endpoint with the Kernel during the handshake phase.

## Root Cause Analysis
The `GaiaAgent` class (in `pkg/core/gaia-agent.ts`) parses the port directly from the static manifest at instantiation:
```typescript
const url = new URL(this.manifest.endpoint);
this.port = parseInt(url.port) || 80;
```
Furthermore, the `BaseAgent.start()` lifecycle registers the agent with the Kernel *before* the local listener is initialized, preventing the agent from knowing its actual assigned port if dynamic allocation were used.

## Proposed Solution
1. **Dynamic Bootstrap**: Modify `BaseAgent.start` to initialize the inbound listener *before* performing the handshake registration.
2. **Ephemeral Ports**: Update `GaiaAgent` to support port `0` in the manifest, allowing the OS to assign an available port.
3. **Endpoint Sync**: Update `this.manifest.endpoint` with the actual assigned port after `app.listen()` succeeds, ensuring the Kernel receives the correct routing address.
