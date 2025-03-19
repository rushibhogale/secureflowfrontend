import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Maximize2 } from 'lucide-react';
import type { TrafficData, NetworkPacket } from '../types';

interface NetworkGraphProps {
  data: TrafficData[];
  onViewDetails: () => void;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ data, onViewDetails }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Network Traffic</h2>
        <button
          onClick={onViewDetails}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Maximize2 size={18} />
          Detailed View
        </button>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(value) => format(value, 'HH:mm:ss')}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              labelFormatter={(value) => format(value as number, 'HH:mm:ss')}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="packets"
              stroke="#2563eb"
              name="Packets/s"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="bandwidth"
              stroke="#16a34a"
              name="Bandwidth (Mbps)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};