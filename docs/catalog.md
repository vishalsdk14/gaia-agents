# GAIA Agent Catalog

This catalog lists the available agents and capabilities in the `gaia-agents` repository. Every capability listed here is mapped to the authoritative [GAIA Capability Registry](https://github.com/vishalsdk14/GAIA/blob/main/docs/specs/registry.md).

## 🔍 Research & Analysis

| Agent | Capability | Description | Input Schema |
| :--- | :--- | :--- | :--- |
| `research-agent` | `research` | Deep web research and summarization | `{"query": "string"}` |
| `web-search` | `search` | Broad web search via Google/Bing | `{"query": "string"}` |

## 🛠 Tooling & Utilities

| Agent | Capability | Description | Input Schema |
| :--- | :--- | :--- | :--- |
| `file-manager` | `read_file` | Read local file contents | `{"path": "string"}` |
| `file-manager` | `write_file` | Write data to a local file | `{"path": "string", "data": "string"}` |
| `calculator` | `math` | Precise mathematical operations | `{"expr": "string"}` |

## 🧬 Infrastructure

| Agent | Capability | Description | Input Schema |
| :--- | :--- | :--- | :--- |
| `git-agent` | `git_clone` | Clone a git repository | `{"repo": "url"}` |
| `git-agent` | `git_commit` | Commit changes to a repo | `{"msg": "string"}` |

---

> [!TIP]
> To propose a new agent or capability, please open a [New Agent Proposal](https://github.com/vishalsdk14/gaia-agents/issues/new?template=new_agent.md).
