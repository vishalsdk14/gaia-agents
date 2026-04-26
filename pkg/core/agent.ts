/**
 * Copyright 2026 GAIA Contributors
 * 
 * Universal GAIA Agent Skeleton (BaseAgent)
 */

import { AgentManifest } from '@gaia-kernel/sdk';
import { HandshakeManager } from './handshake';
import { StateManager } from './state';
import { AgentState, CapabilityHandler, SkeletonConfig } from './types';
import { AGENT_STATUS } from './constants';

export abstract class BaseAgent {
  protected manifest: AgentManifest;
  protected kernelURL: string;
  protected status: string = AGENT_STATUS.INITIALIZING;
  
  private handshake: HandshakeManager;
  public state: AgentState;

  private capabilities: Map<string, CapabilityHandler> = new Map();

  constructor(config: SkeletonConfig) {
    this.manifest = config.manifest;
    this.kernelURL = config.kernelURL || 'http://localhost:8080';
    
    // Initialize modular sub-systems
    this.handshake = new HandshakeManager(this.manifest, this.kernelURL);
    this.state = new StateManager(this.manifest.agent_id, this.kernelURL);
  }

  protected registerCapability(name: string, handler: CapabilityHandler): void {
    this.capabilities.set(name, handler);
  }

  public async start(): Promise<void> {
    try {
      await this.handshake.register();
      this.handshake.startHeartbeat();
      this.status = AGENT_STATUS.ACTIVE;
      
      console.log(`[GAIA-Agent] ${this.manifest.agent_id} is now online.`);
      await this.setupInboundListener();
    } catch (err: any) {
      this.status = AGENT_STATUS.ERROR;
      throw err;
    }
  }

  protected abstract setupInboundListener(): Promise<void>;

  public async stop(): Promise<void> {
    await this.handshake.deregister();
    this.status = AGENT_STATUS.INITIALIZING;
  }
}
