/**
 * Copyright 2026 GAIA Contributors
 *
 * GAIA Native Agent (Concrete Implementation)
 * Provides a ready-to-use Express server for the GAIA Native Protocol.
 */

import express from 'express';
import { BaseAgent } from './agent';
import { SkeletonConfig } from './types';

export class GaiaAgent extends BaseAgent {
  private port: number;

  constructor(config: SkeletonConfig) {
    super(config);
    
    // Extract port from endpoint (e.g., http://localhost:3000 -> 3000)
    const url = new URL(this.manifest.endpoint);
    this.port = parseInt(url.port) || 80;
  }

  protected async setupInboundListener(): Promise<void> {
    const app = express();
    app.use(express.json());

    app.post('/invoke', async (req, res) => {
      try {
        const { capability, input, request_id } = req.body;
        
        // Find the registered handler
        const handler = (this as any).capabilities.get(capability);
        
        if (!handler) {
          return res.status(404).json({
            request_id,
            success: false,
            error: { code: 'CAPABILITY_NOT_FOUND', message: `Capability ${capability} not implemented` }
          });
        }

        // Execute handler
        const output = await handler(input);

        // Return standard GAIA response
        res.json({
          request_id,
          success: true,
          output
        });

      } catch (err: any) {
        console.error(`[GaiaAgent] Invocation error: ${err.message}`);
        res.status(500).json({
          request_id: req.body?.request_id,
          success: false,
          error: {
            code: 'AGENT_INTERNAL_ERROR',
            message: err.message
          },
          output: err.output
        });
      }
    });

    return new Promise((resolve) => {
      app.listen(this.port, () => {
        console.log(`[GaiaAgent] ${this.manifest.agent_id} listening on port ${this.port}`);
        resolve();
      });
    });
  }
}
