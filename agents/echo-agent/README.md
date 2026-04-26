# Tutorial: Building Your First GAIA Agent (Echo Agent)

Welcome to the GAIA ecosystem! This tutorial will guide you through running and understanding the **Echo Agent**, the simplest building block in our modular architecture.

## 🧠 What You Will Learn
1. How an agent registers with the **GAIA Kernel**.
2. how to use **Tier 4 Managed State** for persistence.
3. How the Kernel orchestrates a simple task.

---

## 🚀 Step 1: Start the GAIA Kernel
Before running an agent, you must have the Kernel running.
```bash
cd GAIA/src/kernel
go run main.go
```

## 🚀 Step 2: Start the Echo Agent
Open a new terminal and start the agent:
```bash
cd gaia-agents/agents/echo-agent
npm install
npm start
```
You should see: `[GAIA-Agent] echo-agent is now online.`

## 🚀 Step 3: Submit a Goal
Talk to the Kernel using the CLI to trigger the agent:
```bash
./gaia submit "Tell the echo-agent to say 'Hello World'"
```

---

## 🔍 How it Works

### 1. The Handshake
When you run `npm start`, the agent sends its `manifest.json` to the Kernel's `/api/v1/registry/register` endpoint. The Kernel now knows that `echo-agent` provides the `echo` capability.

### 2. Managed State
Notice in `src/index.ts` how we use `this.state.get('total_echoes')`. The agent **does not have a database**. It stores this number inside the Kernel's SQLite database. If you stop the agent and restart it, the count will persist!

### 3. Orchestration
The Kernel's Planner sees your goal, identifies that `echo-agent` can satisfy the "say" requirement via its `echo` capability, and dispatches an HTTP request to the agent's `/invoke` endpoint.

---

## 🛠 Next Steps
Try modifying the `handleEcho` logic in `src/index.ts` to transform the text (e.g., make it uppercase) and see the changes in real-time!
