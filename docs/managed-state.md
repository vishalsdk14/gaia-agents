# Managed Agent State (Tier 4)

One of the core design principles of the GAIA ecosystem is that **Agents should not manage their own persistent databases.** 

Instead, the GAIA Kernel acts as a resource provider (like an Operating System), offering a secure, partitioned, and auditable storage layer known as **Tier 4 Managed State**.

## 🧠 The Philosophy

By outsourcing persistence to the Kernel, GAIA ensures:
1.  **Total Auditability**: Every change to an agent's memory is recorded in the HMAC-signed audit log.
2.  **Instant Cleanup**: If an agent is blacklisted, the Kernel can instantly wipe its state without needing to access the agent's internal infrastructure.
3.  **Portability**: Agents can be moved between hosts or providers without losing their historical context.

## 🛠 Using the State API

The GAIA SDKs provide a simple interface for interacting with Tier 4 state.

### TypeScript Example

```typescript
const agent = new GaiaAgent(manifest);

// Store data
await agent.state.set("user_preferences", { theme: "dark" });

// Retrieve data
const prefs = await agent.state.get("user_preferences");

// List all keys for this agent
const keys = await agent.state.list();
```

### Python Example

```python
agent = GaiaAgent(manifest)

# Store data
await agent.state.set("search_cache", {"query": "Llama 3", "result": "..."})

# Retrieve data
cache = await agent.state.get("search_cache")
```

## 🔐 Isolation & Security

The Kernel enforces strict isolation:
-   **Namespace Partitioning**: An agent can *only* access keys in its own namespace (identified by its `agent_id`).
-   **Header Authentication**: The `X-Agent-ID` header is required for all state requests and is validated against the agent's registered session.
-   **Size Limits**: The Kernel imposes a quota (defined in Phase 11) on the total size of an agent's Tier 4 state to prevent resource exhaustion.

---

> [!IMPORTANT]
> For more details on how the Kernel implements this persistence, refer to the [GAIA State Management Specification](https://github.com/vishalsdk14/GAIA/blob/main/docs/specs/state-management.md).
