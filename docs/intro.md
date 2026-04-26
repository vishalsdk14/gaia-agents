# Introduction to GAIA-Agents

GAIA-Agents is the official community library for agents compatible with the [GAIA Orchestration Kernel](https://github.com/vishalsdk14/GAIA).

## Mission

Our goal is to provide a collection of high-quality, reliable, and secure agents that can be instantly plugged into any GAIA-managed environment. These agents are designed to follow the core principles of the GAIA ecosystem:

1.  **Strict Contract Enforcement**: Every agent in this library defines its inputs and outputs using JSON Schema, ensuring predictable orchestration.
2.  **Tier 4 State Persistence**: Agents leverage the Kernel's managed state API to ensure their memory is persistent, auditable, and isolated.
3.  **Cross-Platform Portability**: By using standardized protocols like Google A2A and Anthropic MCP, our agents can work across different LLM providers and platforms.

## Relationship with the Kernel

The **GAIA Kernel** acts as the Operating System, providing the runtime, security policies, and resource management. **GAIA-Agents** are the "Applications" or "Processes" that run on top of that OS.

- **Kernel**: Manages the 10-phase control loop, handles failures, and enforces policies.
- **Agents**: Perform specific tasks like web searching, file manipulation, or data analysis.

## Getting Started

To learn how to build your own agents, check out our [Implementation Boilerplates](boilerplates.md) or explore the [Agent Catalog](catalog.md) to see existing capabilities.
