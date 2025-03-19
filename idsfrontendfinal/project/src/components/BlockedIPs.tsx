import React from 'react';
import { Shield, ShieldOff } from 'lucide-react';
import type { BlockedIP } from '../types';

interface BlockedIPsProps {
  blockedIPs: BlockedIP[];
  onUnblock: (ip: string) => void;
}

export const BlockedIPs: React.FC<BlockedIPsProps> = ({ blockedIPs, onUnblock }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Blocked IPs</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {blockedIPs.length} IPs blocked
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blockedIPs.map((ip) => (
              <tr key={ip.ip}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ip.ip}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ip.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ip.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${ip.severity === 'high' ? 'bg-red-100 text-red-800' : 
                      ip.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {ip.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {ip.autoBlocked ? (
                    <span className="flex items-center gap-1">
                      <Shield size={16} className="text-blue-500" />
                      Auto
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Shield size={16} className="text-gray-500" />
                      Manual
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onUnblock(ip.ip)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <ShieldOff size={16} />
                    Unblock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};