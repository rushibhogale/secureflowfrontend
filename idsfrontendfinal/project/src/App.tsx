import React, { useState } from 'react';
import { NetworkGraph } from './components/NetworkGraph';
import { NetworkDetails } from './components/NetworkDetails';
import { IntrusionAlerts } from './components/IntrusionAlerts';
import { BlockedIPs } from './components/BlockedIPs';
import { IDSSettingsPanel } from './components/IDSSettings';
import { Shield, Activity, AlertTriangle } from 'lucide-react';
import type { NetworkPacket, BlockedIP, TrafficData, IDSSettings, IntrusionAlert } from './types';

// Mock data - replace with actual WebSocket/API calls
const mockTrafficData: TrafficData[] = Array.from({ length: 20 }, (_, i) => ({
  timestamp: Date.now() - (19 - i) * 1000,
  packets: Math.floor(Math.random() * 100) + 50,
  bandwidth: Math.floor(Math.random() * 50) + 20
}));

const mockPackets: NetworkPacket[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    sourceIp: '192.168.1.100',
    destinationIp: '10.0.0.1',
    protocol: 'TCP',
    size: 1500,
    payload: '48 65 6c 6c 6f 20 57 6f 72 6c 64',
    severity: 'low',
    port: 80,
    ttl: 64,
    checksum: '0x1234',
    flags: ['SYN', 'ACK']
  }
];

const mockBlockedIPs: BlockedIP[] = [
  {
    ip: '192.168.1.50',
    reason: 'Suspicious activity detected',
    timestamp: new Date().toISOString(),
    severity: 'high',
    autoBlocked: true
  }
];

const mockIntrusions: IntrusionAlert[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    sourceIp: '192.168.1.100',
    destinationIp: '10.0.0.1',
    type: 'SQL Injection Attempt',
    description: 'Malicious SQL pattern detected in HTTP request',
    severity: 'high',
    status: 'new'
  },
  {
    id: '2',
    timestamp: new Date().toISOString(),
    sourceIp: '192.168.1.101',
    destinationIp: '10.0.0.2',
    type: 'Port Scan',
    description: 'Sequential port scan detected',
    severity: 'medium',
    status: 'investigating'
  }
];

function App() {
  const [settings, setSettings] = useState<IDSSettings>({
    sensitivity: 5,
    autoBlock: true,
    allowedIPs: ['10.0.0.1', '192.168.1.1']
  });
  const [showNetworkDetails, setShowNetworkDetails] = useState(false);

  const handleUnblockIP = (ip: string) => {
    console.log(`Unblocking IP: ${ip}`);
  };

  const handleSaveSettings = (newSettings: IDSSettings) => {
    setSettings(newSettings);
    console.log('Saving settings:', newSettings);
  };

  const handleBlockIP = (ip: string, reason: string) => {
    console.log(`Blocking IP ${ip} for reason: ${reason}`);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">
                SecureFlow IDS
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-400">
                <Activity size={20} />
                <span>System Active</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <AlertTriangle size={20} />
                <span>3 Alerts</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <NetworkGraph 
            data={mockTrafficData}
            onViewDetails={() => setShowNetworkDetails(true)}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IntrusionAlerts
              alerts={mockIntrusions}
              onBlock={handleBlockIP}
            />
            <BlockedIPs 
              blockedIPs={mockBlockedIPs}
              onUnblock={handleUnblockIP}
            />
          </div>
          
          <IDSSettingsPanel
            settings={settings}
            onSave={handleSaveSettings}
          />
        </div>
      </main>

      {showNetworkDetails && (
        <NetworkDetails
          packets={mockPackets}
          onClose={() => setShowNetworkDetails(false)}
        />
      )}
    </div>
  );
}

export default App;