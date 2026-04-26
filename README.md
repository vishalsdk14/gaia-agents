<div align="center">
  <h1>GAIA-Agents</h1>
  <p><b>The Official Community Library of GAIA-Compatible Agents.</b></p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Ecosystem: GAIA](https://img.shields.io/badge/Ecosystem-GAIA-green.svg)](https://github.com/vishalsdk14/GAIA)
[![Status: Foundation](https://img.shields.io/badge/Status-Foundation-blue.svg)](#-getting-started)

---

**GAIA-Agents** is a collection of high-quality, reliable agents designed to run on the [GAIA Orchestration Kernel](https://github.com/vishalsdk14/GAIA).

[Catalog](docs/catalog.md) · [Intro](docs/intro.md) · [Boilerplates](docs/boilerplates.md) · [Main Repo](https://github.com/vishalsdk14/GAIA)

</div>

---

## 🏗 Repository Structure

This repository follows a modular, "Monorepo-lite" pattern to ensure scalability and strict protocol compliance:

```text
/gaia-agents
├── pkg/core/           # [CORE] Shared Universal Agent Skeleton (BaseAgent, Handshake)
├── agents/             # [AGENTS] The production-ready agent library
├── templates/          # [TEMPLATES] Ready-to-fork scaffolds (TS, Python)
├── docs/               # [DOCS] Catalog, guides, and kernel cross-references
├── scripts/            # [TOOLS] Validation and deployment automation
└── ...                 # [GOVERNANCE] LICENSE, CONTRIBUTING, etc.
```

## 🚀 Quickstart

Get the GAIA Agent Ecosystem running in minutes.

### 1. Initialize the Workspace
Run this at the root of the repository to link all agents and core packages:
```bash
npm install
```

### 2. Start the GAIA Kernel
Ensure your Kernel is running in a separate terminal with the correct LLM configuration:
```bash
cd ../GAIA/src/kernel
# Optional: Set GAIA_PLANNER_MODEL or GAIA_PLANNER_API_KEY in your .env
go run main.go
```

### 3. Start an Agent
Launch the tutorial agent:
```bash
cd agents/echo-agent
npm start
```

### 4. Submit a Goal
Submit a task to the Kernel and watch the Echo Agent respond:
```bash
cd ../GAIA/src/kernel
./gaia submit "Ask the echo-agent to say 'Hello GAIA!'"
```

---

## 🧬 Why this Repository?

The GAIA Kernel provides the "OS" for AI agents. This repository provides the "Applications." 

Every agent here is guaranteed to be:
*   **Traceable**: Every step is audited by the Kernel's HMAC-signed log.
*   **Secure**: Isolated via "Deny-by-Default" policies.
*   **Stateful**: Uses the Kernel's Tier 4 Managed State for persistence.
*   **Interoperable**: Communicates via GAIA's Native, A2A, or MCP protocols.

---

## 🚀 Getting Started

### 1. Browse the Catalog
Explore the [Agent Catalog](docs/catalog.md) to find the capabilities you need for your GAIA tasks.

### 2. Build Your Own Agent
We provide official boilerplates to help you get started in minutes:
- [TypeScript (Native Protocol)](docs/boilerplates.md#1-typescript-native-protocol)
- [Python (MCP Protocol)](docs/boilerplates.md#2-python-mcp-protocol)

### 3. Connect to a Kernel
Ensure you have a [GAIA Kernel](https://github.com/vishalsdk14/GAIA) running locally or in your cluster.

---

## 🧬 Cross-Repository Synchronization

This repository is deeply integrated with the GAIA Kernel. For technical specifications, please refer to:
*   [GAIA Design Specification](https://github.com/vishalsdk14/GAIA/blob/main/docs/design.md)
*   [Control Loop & Handshake](https://github.com/vishalsdk14/GAIA/blob/main/docs/specs/control-loop.md)
*   [Capability Registry Standards](https://github.com/vishalsdk14/GAIA/blob/main/docs/specs/registry.md)

---

## 🤝 Contributing

We welcome community contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to add new agents to the catalog while maintaining our "Open Source Gold Standard."

---

## ⚖️ License

GAIA-Agents is distributed under the [MIT License](LICENSE).
