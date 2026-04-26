/**
 * Copyright 2026 GAIA Contributors
 * 
 * GAIA Agent Core Constants
 * Synchronized with GAIA Kernel Specification:
 * https://github.com/vishalsdk14/GAIA/blob/main/docs/specs/communication.md
 */

export const GAIA_HEADERS = {
  AGENT_ID: 'X-Agent-ID',
  SIGNATURE: 'X-Gaia-Signature',
  TIMESTAMP: 'X-Gaia-Timestamp',
} as const;

export const PROTOCOL_VERSIONS = {
  HANDSHAKE: 'v1',
  STATE: 'v1',
  ORCHESTRATION: 'v1',
} as const;

export const DEFAULT_TIMEOUTS = {
  HANDSHAKE: 5000,
  HEARTBEAT: 30000,
  RECONNECT_BACKOFF: 2000,
} as const;

export const AGENT_STATUS = {
  INITIALIZING: 'initializing',
  ACTIVE: 'active',
  BUSY: 'busy',
  ERROR: 'error',
} as const;

export const KERNEL_ENDPOINTS = {
  REGISTER: '/api/v1/registry/register',
  DEREGISTER: '/api/v1/registry/deregister',
  STATE: '/internal/v1/state',
  HEARTBEAT: '/api/v1/registry/heartbeat',
} as const;
