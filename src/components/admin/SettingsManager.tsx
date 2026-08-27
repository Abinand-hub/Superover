import React, { useState, useEffect } from 'react';
import { Settings, Save, Loader2, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

export const SettingsManager: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [settings, setSettings] = useState({
    flashMessage: 'Welcome to Superover! Play and win real cash.',
    wheelProbabilities: [
      { multiplier: 75, probability: 40 },
      { multiplier: 100, probability: 30 },
      { multiplier: 120, probability: 15 },
      { multiplier: 150, probability: 10 },
      { multiplier: 200, probability: 4 },
      { multiplier: 500, probability: 1 },
    ]
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await api.getSettings();
      if (data) {
        setSettings({
          flashMessage: data.flashMessage || settings.flashMessage,
          wheelProbabilities: data.wheelProbabilities?.length === 6 ? data.wheelProbabilities : settings.wheelProbabilities,
        });
      }
    } catch (error) {
      console.error('Failed to load settings', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Validate probabilities equal 100%
      const totalProb = settings.wheelProbabilities.reduce((acc, wp) => acc + wp.probability, 0);
      if (totalProb !== 100) {
        setMessage(`Error: Probabilities must add up to 100%. Current total: ${totalProb}%`);
        return;
      }

      await api.updateSettings(settings);
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save settings', error);
      setMessage('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleProbChange = (index: number, field: 'multiplier' | 'probability', value: number) => {
    const newProbs = [...settings.wheelProbabilities];
    newProbs[index] = { ...newProbs[index], [field]: value };
    setSettings(prev => ({ ...prev, wheelProbabilities: newProbs }));
  };

  if (loading) {
    return (
      <div className="p-8 text-center bg-[#0D122B] border border-[#1A223E] rounded-2xl">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-3" />
        <p className="text-slate-400">Loading settings...</p>
      </div>
    );
  }

  const currentTotal = settings.wheelProbabilities.reduce((acc, wp) => acc + wp.probability, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            Platform Settings & CMS
          </h2>
          <p className="text-xs text-slate-400">Manage global app configurations, flash banners, and wheel mechanics.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:brightness-110 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Changes</span>
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${
          message.includes('Error') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        }`}>
          <AlertCircle className="w-4 h-4" />
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flash Message CMS */}
        <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E]">
          <h3 className="text-base font-black text-white mb-4">Global Flash Banner (CMS)</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Banner Text</label>
              <textarea
                value={settings.flashMessage}
                onChange={(e) => setSettings({ ...settings, flashMessage: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                rows={3}
                placeholder="Enter message to display across the app..."
              />
              <p className="text-xs text-slate-500 mt-2">This message will appear in the ticker bar for all users.</p>
            </div>
          </div>
        </div>

        {/* Wheel of Fortune Configuration */}
        <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-black text-white">Wheel of Fortune Math</h3>
            <span className={`text-xs font-black px-2.5 py-1 rounded-lg border ${
              currentTotal === 100 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>
              Total Probability: {currentTotal}%
            </span>
          </div>
          
          <div className="space-y-3">
            {settings.wheelProbabilities.map((wp, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#080C1D] border border-[#1A223E]">
                <div className="flex-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Segment Multiplier (X)</label>
                  <input
                    type="number"
                    value={wp.multiplier}
                    onChange={(e) => handleProbChange(i, 'multiplier', Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#131A38] border border-[#1A223E] text-white font-mono text-sm focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Probability (%)</label>
                  <input
                    type="number"
                    value={wp.probability}
                    onChange={(e) => handleProbChange(i, 'probability', Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#131A38] border border-[#1A223E] text-white font-mono text-sm focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
