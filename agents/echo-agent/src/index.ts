/**
 * Copyright 2026 GAIA Contributors
 *
 * Licensed under the MIT License.
 *
 * GAIA Tutorial: The Echo Agent
 * ----------------------------
 * This agent is the simplest possible implementation of a GAIA-compatible agent.
 * It demonstrates how to extend the Universal Skeleton to create a production-ready
 * capability that integrates with the Kernel's orchestration and state layers.
 */

import express from 'express';
import { BaseAgent } from '../../../pkg/core/agent';
import manifest from '../manifest.json';

/**
 * EchoAgent extends the standard BaseAgent skeleton.
 * By doing this, it automatically inherits:
 * 1. Automated Registration with the GAIA Kernel.
 * 2. Automated Heartbeats for health monitoring.
 * 3. Access to Tier 4 Managed State for persistence.
 */
class EchoAgent extends BaseAgent {
  constructor() {
    super({
      manifest: manifest as any,
      kernelURL: process.env.GAIA_KERNEL_URL || 'http://localhost:8080'
    });

    // STEP 1: Register our capability handler.
    // This tells the skeleton to route any 'echo' requests to our handleEcho method.
    this.registerCapability('echo', this.handleEcho.bind(this));
  }

  /**
   * handleEcho is the core logic of our agent.
   * GAIA Principle: The logic should be as stateless as possible.
   * Any persistence MUST go through the this.state API.
   */
  private async handleEcho(input: { text: string }) {
    console.log(`[EchoAgent] Received request: "${input.text}"`);

    // STEP 2: Use Tier 4 Managed State.
    // We increment a counter stored in the GAIA Kernel. 
    // Even if this agent process restarts, this counter is safe in the Kernel's DB.
    const currentCount = await this.state.get<number>('total_echoes') || 0;
    const newCount = currentCount + 1;
    await this.state.set('total_echoes', newCount);

    console.log(`[EchoAgent] total_echoes incremented to: ${newCount}`);

    // STEP 3: Return the response.
    // This must match the 'output_schema' defined in our manifest.json.
    return {
      result: input.text
    };
  }

  /**
   * setupInboundListener implements the transport layer.
   * For this tutorial, we use a simple Express HTTP server.
   */
  protected async setupInboundListener(): Promise<void> {
    const app = express();
    app.use(express.json());

    // The GAIA Kernel sends requests to /invoke
    app.post('/invoke', async (req, res) => {
      const { capability, input } = req.body;
      
      // Route the request via our capability registry
      const handler = (this as any).capabilities.get(capability);
      if (handler) {
        const result = await handler(input);
        res.json(result);
      } else {
        res.status(404).json({ error: `Capability ${capability} not implemented` });
      }
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`[EchoAgent] Listening for Kernel requests on port ${port}`);
    });
  }
}

// Start the agent
const agent = new EchoAgent();
agent.start().catch(err => {
  console.error('Failed to start Echo Agent:', err);
  process.exit(1);
});
