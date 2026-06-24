export interface Feature {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  badge?: string;
  stats?: { label: string; value: string };
}

export interface UseCase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
  iconName: string;
  topologyNodes: string[];
  techHighlight: string;
}

export interface TechLayer {
  id: string;
  name: string;
  description: string;
  metrics: string;
  status: 'active' | 'synced' | 'optimizing';
  features: string[];
}

export interface CodeSnippet {
  language: string;
  title: string;
  code: string;
  explanation: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  logoType: string;
  improvement: string;
}

export type ThreatType = 'none' | 'bgp_hijack' | 'quantum_decrypt' | 'orbital_ddos';

export interface MitigationLog {
  id: string;
  timestamp: string;
  type: 'info' | 'warn' | 'success' | 'danger';
  message: string;
}

export interface LedgerBlock {
  height: number;
  hash: string;
  prevHash: string;
  timestamp: string;
  epoch: number;
  stateUpdate: string;
  peersCount: number;
  latencyMs: number;
  validator: string;
}

export interface ConsensusPeer {
  id: string;
  name: string;
  pingMs: number;
  vote: 'PENDING' | 'VALID' | 'INVALID';
  coords: string;
  status: 'ONLINE' | 'OFFLINE';
}


