import React, { useState } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import type { NetworkPacket } from '../types';

interface PacketInspectorProps {
  packets: NetworkPacket[];
}

export const PacketInspector: React.FC<PacketInspectorProps> = ({ packets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState<string>('all');

  const filteredPackets = packets.filter(packet => {
    const matchesSearch = 
      packet.sourceIp.includes(searchTerm) ||
      packet.destinationIp.includes(searchTerm) ||
      packet.protocol.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProtocol = selectedProtocol === 'all' || packet.protocol === selectedProtocol;
    
    return matchesSearch && matchesProtocol;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Packet Inspector</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search packets..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedProtocol}
            onChange={(e) => setSelectedProtocol(e.target.value)}
          >
            <option value="all">All Protocols</option>
            <option value="TCP">TCP</option>
            <option value="UDP">UDP</option>
            <option value="ICMP">ICMP</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPackets.map((packet) => (
              <tr key={packet.id} className="hover:bg-gray-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{packet.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{packet.sourceIp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{packet.destinationIp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{packet.protocol}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{packet.size} bytes</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${packet.severity === 'high' ? 'bg-red-100 text-red-800' : 
                      packet.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {packet.severity || 'low'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};