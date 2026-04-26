/**
 * Copyright 2026 GAIA Contributors
 * 
 * GAIA State Manager (Tier 4 Abstraction)
 * Cross-ref: GAIA/pkg/state/tier4_sqlite.go
 */

import axios, { AxiosInstance } from 'axios';
import { GAIA_HEADERS, KERNEL_ENDPOINTS } from './constants';
import { AgentState } from './types';

export class StateManager implements AgentState {
  private client: AxiosInstance;

  constructor(agentId: string, kernelURL: string) {
    this.client = axios.create({
      baseURL: kernelURL,
      headers: {
        'Content-Type': 'application/json',
        [GAIA_HEADERS.AGENT_ID]: agentId,
      },
    });
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const resp = await this.client.get(`${KERNEL_ENDPOINTS.STATE}/${key}`);
      return resp.data as T;
    } catch (err: any) {
      if (err.response?.status === 404) return null;
      throw new Error(`State error: Failed to get key [${key}]: ${err.message}`);
    }
  }

  async set(key: string, data: any): Promise<void> {
    try {
      await this.client.put(`${KERNEL_ENDPOINTS.STATE}/${key}`, data);
    } catch (err: any) {
      throw new Error(`State error: Failed to set key [${key}]: ${err.message}`);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.delete(`${KERNEL_ENDPOINTS.STATE}/${key}`);
    } catch (err: any) {
      throw new Error(`State error: Failed to delete key [${key}]: ${err.message}`);
    }
  }

  async list(): Promise<string[]> {
    try {
      const resp = await this.client.get(KERNEL_ENDPOINTS.STATE);
      return resp.data.keys || [];
    } catch (err: any) {
      throw new Error(`State error: Failed to list keys: ${err.message}`);
    }
  }
}
