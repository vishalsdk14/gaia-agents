/**
 * GAIA Echo Agent
 * A minimal, readymade example using the @gaia-agents/core SDK.
 */

import { GaiaAgent } from '../../../pkg/core';
import manifest from '../manifest.json';

class EchoAgent extends GaiaAgent {
  constructor() {
    super({
      manifest: manifest as any,
      kernelURL: process.env.GAIA_KERNEL_URL || 'http://localhost:8080'
    });

    // Register capability handlers
    this.registerCapability('echo', this.handleEcho.bind(this));
  }

  private async handleEcho(input: { text: string }) {
    console.log(`[EchoAgent] Received request: "${input.text}"`);

    // Use Tier 4 Managed State
    const currentCount = await this.state.get<number>('total_echoes') || 0;
    const newCount = currentCount + 1;
    await this.state.set('total_echoes', newCount);

    return { 
      result: `Echo: ${input.text} (total echoes: ${newCount})` 
    };
  }
}

// Start the agent
const agent = new EchoAgent();
agent.start().catch(err => {
  console.error('Failed to start Echo Agent:', err);
  process.exit(1);
});
