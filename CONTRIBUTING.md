# Contributing to GAIA-Agents

Thank you for your interest in contributing to the GAIA-Agents ecosystem! This repository is the home for GAIA-compatible agents and capabilities.

## Standards & Synchronization

This project is a companion to the [GAIA Kernel](https://github.com/vishalsdk14/GAIA). To maintain the "Open Source Gold Standard," all agents must adhere to the following architectural invariants:

1.  **Capability-First**: Agents must define clear, typed capabilities using JSON Schema.
2.  **Managed State (Tier 4)**: Agents should use the GAIA Kernel's Managed State API for persistence rather than internal databases. See the [State Management Spec](https://github.com/vishalsdk14/GAIA/blob/main/docs/specs/state-management.md).
3.  **Deterministic Handshake**: All agents must implement the GAIA Handshake protocol as defined in the [Control Loop Spec](https://github.com/vishalsdk14/GAIA/blob/main/docs/specs/control-loop.md).

## How to Contribute

### 1. Adding a New Agent
- Propose your agent via an [Issue Template](https://github.com/vishalsdk14/gaia-agents/issues).
- Scaffold your agent using one of our [Reference Boilerplates](docs/boilerplates.md).
- Ensure your agent manifest follows the [AgentRecord schema](https://github.com/vishalsdk14/GAIA/blob/main/docs/specs/schemas.md).

### 2. Improving Documentation
- Update the [Agent Catalog](docs/catalog.md) when adding new capabilities.
- Cross-reference any architectural claims with the authoritative [GAIA Design Docs](https://github.com/vishalsdk14/GAIA/tree/main/docs).

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
