/**
 * Copyright 2026 GAIA Contributors
 *
 * Licensed under the MIT License.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * GAIA Agent Core Types
 */

import { AgentManifest, Request, Response } from '@gaia-kernel/sdk';

export interface CapabilityHandler {
  (input: any): Promise<any>;
}

export interface SkeletonConfig {
  manifest: AgentManifest;
  kernelURL?: string;
  port?: number;
}

export type AgentState = {
  get: <T>(key: string) => Promise<T | null>;
  set: (key: string, data: any) => Promise<void>;
  delete: (key: string) => Promise<void>;
  list: () => Promise<string[]>;
};

export interface IHandshakeManager {
  register(): Promise<void>;
  startHeartbeat(): void;
  stopHeartbeat(): void;
}
