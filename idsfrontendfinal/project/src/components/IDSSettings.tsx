import React from 'react';
import { Settings, Save, Info } from 'lucide-react';
import type { IDSSettings } from '../types';

interface IDSSettingsProps {
  settings: IDSSettings;
  onSave: (settings: IDSSettings) => void;
}

export const IDSSettingsPanel: React.FC<IDSSettingsProps> = ({ settings, onSave }) => {
  const [localSettings, setLocalSettings] = React.useState(settings);
  const [newAllowedIP, setNewAllowedIP] = React.useState('');
  const [showSensitivityInfo, setShowSensitivityInfo] = React.useState(false);

  const handleSave = () => {
    onSave(localSettings);
  };

  const addAllowedIP = () => {
    if (newAllowedIP && !localSettings.allowedIPs.includes(newAllowedIP)) {
      setLocalSettings({
        ...localSettings,
        allowedIPs: [...localSettings.allowedIPs, newAllowedIP]
      });
      setNewAllowedIP('');
    }
  };

  const removeAllowedIP = (ip: string) => {
    setLocalSettings({
      ...localSettings,
      allowedIPs: localSettings.allowedIPs.filter(allowedIP => allowedIP !== ip)
    });
  };

  const getSensitivityLabel = (value: number): string => {
    if (value <= 3) return 'Low';
    if (value <= 7) return 'Medium';
    return 'High';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Settings size={24} />
          IDS Settings
        </h2>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Detection Sensitivity
            </label>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowSensitivityInfo(!showSensitivityInfo)}
            >
              <Info size={16} />
            </button>
          </div>
          {showSensitivityInfo && (
            <div className="mb-4 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
              <p className="font-medium mb-2">Detection Sensitivity Levels:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Low (1-3):</strong> Only detect obvious threats, fewer false positives</li>
                <li><strong>Medium (4-7):</strong> Balanced detection, moderate false positive rate</li>
                <li><strong>High (8-10):</strong> Aggressive detection, may have more false positives</li>
              </ul>
            </div>
          )}
          <div className="relative pt-1">
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={localSettings.sensitivity}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                sensitivity: parseFloat(e.target.value)
              })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-600 px-2 mt-2">
              <span>Low (1-3)</span>
              <span>Medium (4-7)</span>
              <span>High (8-10)</span>
            </div>
            <div className="text-center mt-2 text-sm font-medium text-gray-700">
              Current: {localSettings.sensitivity.toFixed(1)} ({getSensitivityLabel(localSettings.sensitivity)})
            </div>
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-3 mb-4">
            <input
              type="checkbox"
              checked={localSettings.autoBlock}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                autoBlock: e.target.checked
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Automatically block suspicious IPs
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Allowed IPs
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newAllowedIP}
              onChange={(e) => setNewAllowedIP(e.target.value)}
              placeholder="Enter IP address"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addAllowedIP}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add IP
            </button>
          </div>
          <div className="space-y-2">
            {localSettings.allowedIPs.map((ip) => (
              <div key={ip} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-700">{ip}</span>
                <button
                  onClick={() => removeAllowedIP(ip)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};