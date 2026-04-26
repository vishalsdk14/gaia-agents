# Agent Implementation Boilerplates

This guide provides generic boilerplates for building GAIA-compatible agents using the official SDKs.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js 20+** (for TypeScript agents)
- **Python 3.10+** (for Python agents)
- **GAIA Kernel** running locally (see [Quickstart](https://github.com/vishalsdk14/GAIA#🚀-quickstart))

---

## 1. TypeScript (Native Protocol)

The following boilerplate provides a complete structure for a native GAIA agent.

### `manifest.json`
```json
{
  "agent_id": "my-custom-agent",
  "version": "1.0.0",
  "endpoint": "http://localhost:3000",
  "transport": "http",
  "protocol": "native",
  "state_requirements": {
    "required": true,
    "max_bytes": 10240
  },
  "capabilities": [
    {
      "name": "example_task",
      "description": "Performs an example task",
      "input_schema": {
        "type": "object",
        "properties": {
          "input": { "type": "string" }
        },
        "required": ["input"]
      },
      "output_schema": {
        "type": "object",
        "properties": {
          "result": { "type": "string" }
        }
      }
    }
  ]
}
```

### `src/index.ts`
```typescript
import { GaiaAgent } from '@gaia-agents/core';
import manifest from '../manifest.json';

class CustomAgent extends GaiaAgent {
  constructor() {
    super({
      manifest: manifest as any,
      kernelURL: process.env.GAIA_KERNEL_URL || 'http://localhost:8080'
    });

    // 1. Register your capability handlers
    this.registerCapability('example_task', this.handleExample.bind(this));
  }

  private async handleExample(input: { input: string }) {
    // 2. Use Tier 4 Managed State (Isolated persistence)
    const count = await this.state.get<number>('runs') || 0;
    await this.state.set('runs', count + 1);

    // 3. Return the result (The SDK handles the GAIA response envelope)
    return { result: `Processed: ${input.input} (Run #${count + 1})` };
  }
}

// 4. Start the agent (Automatically starts the HTTP server)
const agent = new CustomAgent();
agent.start();
```

## 2. Python (MCP Protocol)

The following boilerplate uses the `gaia-sdk` Python package.

```python
import asyncio
from gaia_sdk import GaiaAgent, AgentManifest

manifest = AgentManifest(
    agent_id="python-research-agent",
    version="1.0.0",
    state_requirements={
        "required": True,
        "max_bytes": 10240
    },
    capabilities=[{
        "name": "deep_search",
        "description": "Performs deep web searching",
        "input_schema": {"type": "object", "properties": {"query": {"type": "string"}}}
    }]
)

agent = GaiaAgent(manifest)

@agent.capability("deep_search")
async def handle_search(input_data):
    # Use Tier 4 Managed State
    history = await agent.state.get("search_history") or []
    history.append(input_data["query"])
    await agent.state.set("search_history", history)
    
    return {"result": f"Found results for {input_data['query']}"}

if __name__ == "__main__":
    asyncio.run(agent.start())
```

## 3. General Implementation Rules

- **Statelessness**: The agent code should be stateless. All persistence must go through the `agent.state` (Tier 4) API.
- **Validation**: The SDK automatically validates inputs against your `input_schema`. You are responsible for ensuring your return value matches the `output_schema`.
- **Error Handling**: Use the standard error codes (e.g., `TIMEOUT`, `EXECUTION_FAILED`) defined in the [Communication Spec](https://github.com/vishalsdk14/GAIA/blob/main/docs/specs/communication.md).
