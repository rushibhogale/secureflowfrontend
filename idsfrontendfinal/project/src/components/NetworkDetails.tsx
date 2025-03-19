import React, { useState } from 'react';
import { X, Filter, Download, RefreshCw } from 'lucide-react';
import type { NetworkPacket } from '../types';

interface NetworkDetailsProps {
  packets: NetworkPacket[];
  onClose: () => void;
}

export const NetworkDetails: React.FC<NetworkDetailsProps> = ({ packets, onClose }) => {
  const [selectedPacket, setSelectedPacket] = useState<NetworkPacket | null>(null);
  const [protocolFilter, setProtocolFilter] = useState<string>('all');

  const filteredPackets = packets.filter(packet => 
    protocolFilter === 'all' || packet.protocol === protocolFilter
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-11/12 h-5/6 rounded-lg shadow-xl flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Network Traffic Analysis</h2>
          <div className="flex items-center gap-4">
            <select
              className="border rounded-lg px-4 py-2"
              value={protocolFilter}
              onChange={(e) => setProtocolFilter(e.target.value)}
            >
              <option value="all">All Protocols</option>
              <option value="TCP">TCP</option>
              <option value="UDP">UDP</option>
              <option value="ICMP">ICMP</option>
            </select>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <RefreshCw size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden flex">
          <div className="w-2/3 overflow-auto border-r">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Protocol</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Length</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Info</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPackets.map((packet, index) => (
                  <tr
                    key={packet.id}
                    onClick={() => setSelectedPacket(packet)}
                    className={`cursor-pointer hover:bg-blue-50 ${selectedPacket?.id === packet.id ? 'bg-blue-100' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{packet.timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{packet.sourceIp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{packet.destinationIp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{packet.protocol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{packet.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {packet.flags?.join(', ') || 'Standard packet'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="w-1/3 p-4 overflow-auto">
            {selectedPacket ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Packet Details</h3>
                <div className="space-y-2">
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-medium">Frame</h4>
                    <div className="ml-4 text-sm">
                      <p>Length: {selectedPacket.size} bytes</p>
                      <p>Arrival Time: {selectedPacket.timestamp}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-medium">{selectedPacket.protocol}</h4>
                    <div className="ml-4 text-sm">
                      <p>Source Port: {selectedPacket.port}</p>
                      <p>Destination Port: {selectedPacket.port}</p>
                      <p>TTL: {selectedPacket.ttl}</p>
                      <p>Checksum: {selectedPacket.checksum}</p>
                      <p>Flags: {selectedPacket.flags?.join(', ')}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-medium">Payload</h4>
                    <pre className="ml-4 text-sm font-mono overflow-x-auto">
                      {selectedPacket.payload}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                Select a packet to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};