export interface NetworkPacket {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  protocol: string;
  size: number;
  payload: string;
  severity: 'low' | 'medium' | 'high';
  flags?: string[];
  port?: number;
  ttl?: number;
  checksum?: string;
}

export interface BlockedIP {
  ip: string;
  reason: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  autoBlocked: boolean;
}

export interface TrafficData {
  timestamp: number;
  packets: number;
  bandwidth: number;
}

export interface IDSSettings {
  sensitivity: number;
  autoBlock: boolean;
  allowedIPs: string[];
}

export interface IntrusionAlert {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'new' | 'investigating' | 'resolved';
}