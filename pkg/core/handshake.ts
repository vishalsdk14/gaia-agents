/**
 * Copyright 2026 GAIA Contributors
 *
 * Licensed under the MIT License.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * GAIA Handshake Manager
 * Implements the registration and heartbeat protocol required by the GAIA Orchestrator.
 * Cross-ref: GAIA/src/kernel/pkg/core/orchestrator.go
 */

import axios from 'axios';
import { AgentManifest } from '@gaia-kernel/sdk';
import { KERNEL_ENDPOINTS, DEFAULT_TIMEOUTS } from './constants';
import { IHandshakeManager } from './types';

export class HandshakeManager implements IHandshakeManager {
  private manifest: AgentManifest;
  private kernelURL: string;
  private heartbeatTimer: NodeJS.Timeout | null = null;

  constructor(manifest: AgentManifest, kernelURL: string) {
    this.manifest = manifest;
    this.kernelURL = kernelURL;
  }

  async register(): Promise<void> {
    try {
      const url = `${this.kernelURL}${KERNEL_ENDPOINTS.REGISTER}`;
      await axios.post(url, this.manifest, {
        timeout: DEFAULT_TIMEOUTS.HANDSHAKE
      });
      console.log(`[Handshake] Successfully registered agent: ${this.manifest.agent_id}`);
    } catch (err: any) {
      throw new Error(`[Handshake] Registration failed: ${err.message}`);
    }
  }

  async deregister(): Promise<void> {
    try {
      const url = `${this.kernelURL}${KERNEL_ENDPOINTS.DEREGISTER}/${this.manifest.agent_id}`;
      await axios.delete(url);
      this.stopHeartbeat();
      console.log(`[Handshake] Successfully deregistered agent: ${this.manifest.agent_id}`);
    } catch (err: any) {
      console.error(`[Handshake] Deregistration error: ${err.message}`);
    }
  }

  startHeartbeat(): void {
    if (this.heartbeatTimer) return;

    this.heartbeatTimer = setInterval(async () => {
      try {
        const url = `${this.kernelURL}${KERNEL_ENDPOINTS.HEARTBEAT}/${this.manifest.agent_id}`;
        await axios.post(url);
      } catch (err: any) {
        console.warn(`[Handshake] Heartbeat failed for ${this.manifest.agent_id}: ${err.message}`);
      }
    }, DEFAULT_TIMEOUTS.HEARTBEAT);
  }

  stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}
