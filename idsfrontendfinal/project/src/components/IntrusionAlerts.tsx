import React, { useState } from 'react';
import { AlertCircle, Shield, Search } from 'lucide-react';
import type { IntrusionAlert } from '../types';

interface IntrusionAlertsProps {
  alerts: IntrusionAlert[];
  onBlock: (sourceIp: string, reason: string) => void;
}

export const IntrusionAlerts: React.FC<IntrusionAlertsProps> = ({ alerts, onBlock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.sourceIp.includes(searchTerm) ||
      alert.destinationIp.includes(searchTerm) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <AlertCircle className="text-red-500" size={24} />
          <h2 className="text-xl font-semibold">Intrusion Alerts</h2>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search alerts..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg px-4 py-2 w-[140px] focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-shrink-0"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAlerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.sourceIp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.destinationIp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.type}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{alert.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${alert.severity === 'high' ? 'bg-red-100 text-red-800' : 
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'}`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${alert.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      alert.status === 'investigating' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {alert.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => onBlock(alert.sourceIp, alert.description)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800"
                  >
                    <Shield size={16} />
                    Block IP
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