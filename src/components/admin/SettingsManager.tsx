import React, { useState, useEffect } from 'react';
import { Settings, Save, Loader2, AlertCircle, Plus, Trash2, RotateCcw } from 'lucide-react';
import { api } from '../../services/api';

const DEFAULT_15_PARTS = [
  { multiplier: 50, probability: 20 },
  { multiplier: 60, probability: 15 },
  { multiplier: 75, probability: 14 },
  { multiplier: 80, probability: 10 },
  { multiplier: 100, probability: 10 },
  { multiplier: 110, probability: 8 },
  { multiplier: 120, probability: 6 },
  { multiplier: 140, probability: 5 },
  { multiplier: 150, probability: 4 },
  { multiplier: 175, probability: 3 },
  { multiplier: 200, probability: 2 },
  { multiplier: 250, probability: 1 },
  { multiplier: 300, probability: 1 },
  { multiplier: 400, probability: 0.5 },
  { multiplier: 500, probability: 0.5 },
];

export const SettingsManager: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [settings, setSettings] = useState({
    flashMessage: 'Welcome to Superover! Play and win real cash.',
    wheelProbabilities: DEFAULT_15_PARTS
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await api.getSettings();
      if (data) {
        const loadedProbs = data.wheelProbabilities && data.wheelProbabilities.length > 0
          ? data.wheelProbabilities.map((p: any) => ({
              multiplier: Number(p.multiplier || (typeof p.segment === 'string' ? parseInt(p.segment.replace(/\D/g, '')) : p.segment) || 50),
              probability: Number(p.probability || 0)
            }))
          : DEFAULT_15_PARTS;

        setSettings({
          flashMessage: data.flashMessage || settings.flashMessage,
          wheelProbabilities: loadedProbs,
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
      const totalProb = settings.wheelProbabilities.reduce((acc, wp) => acc + (Number(wp.probability) || 0), 0);
      if (Math.abs(totalProb - 100) > 0.01) {
        setMessage(`Error: Probabilities must add up to exactly 100%. Current total: ${totalProb.toFixed(1)}%`);
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

  const handleAddSegment = () => {
    setSettings(prev => ({
      ...prev,
      wheelProbabilities: [...prev.wheelProbabilities, { multiplier: 100, probability: 0 }]
    }));
  };

  const handleRemoveSegment = (index: number) => {
    if (settings.wheelProbabilities.length <= 2) return;
    setSettings(prev => ({
      ...prev,
      wheelProbabilities: prev.wheelProbabilities.filter((_, i) => i !== index)
    }));
  };

  const handleResetDefault15 = () => {
    setSettings(prev => ({ ...prev, wheelProbabilities: DEFAULT_15_PARTS }));
  };

  if (loading) {
    return (
      <div className="p-8 text-center bg-[#0D122B] border border-[#1A223E] rounded-2xl">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-3" />
        <p className="text-slate-400">Loading settings...</p>
      </div>
    );
  }

  const currentTotal = settings.wheelProbabilities.reduce((acc, wp) => acc + (Number(wp.probability) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400" />
            Platform Settings & CMS
          </h2>
          <p className="text-xs text-slate-400">Manage global app configurations, flash banners, and spin wheel (15 parts).</p>
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
        <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4 self-start">
          <h3 className="text-base font-black text-white mb-2">Global Flash Banner (CMS)</h3>
          
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

        {/* Wheel of Fortune Configuration */}
        <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E]">
          <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
            <div>
              <h3 className="text-base font-black text-white">Spin Wheel Configuration ({settings.wheelProbabilities.length} Parts)</h3>
              <p className="text-xs text-slate-400">Configure each slice multiplier & winning probability %.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black px-2.5 py-1 rounded-lg border ${
                Math.abs(currentTotal - 100) < 0.01 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                Total: {currentTotal.toFixed(1)}%
              </span>
              <button
                type="button"
                onClick={handleResetDefault15}
                title="Reset to 15 Default Multipliers"
                className="px-2.5 py-1 rounded-lg bg-[#131A38] text-xs font-bold text-amber-400 hover:bg-[#1A223E] border border-amber-400/20 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset 15 Parts</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {settings.wheelProbabilities.map((wp, i) => (
              <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E]">
                <div className="w-7 h-7 rounded-lg bg-[#131A38] text-indigo-400 text-xs font-black flex items-center justify-center shrink-0 border border-[#1A223E]">
                  #{i + 1}
                </div>

                <div className="flex-1">
                  <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Multiplier (X)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={wp.multiplier}
                      onChange={(e) => handleProbChange(i, 'multiplier', Number(e.target.value))}
                      className="w-full px-2.5 py-1 rounded-lg bg-[#131A38] border border-[#1A223E] text-white font-mono font-bold text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <span className="absolute right-2 top-1 text-xs text-amber-400 font-black pointer-events-none">X</span>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block mb-0.5">Chance (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={wp.probability}
                      onChange={(e) => handleProbChange(i, 'probability', Number(e.target.value))}
                      className="w-full px-2.5 py-1 rounded-lg bg-[#131A38] border border-[#1A223E] text-white font-mono font-bold text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <span className="absolute right-2 top-1 text-xs text-emerald-400 font-black pointer-events-none">%</span>
                  </div>
                </div>

                {settings.wheelProbabilities.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSegment(i)}
                    className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors self-end mb-0.5"
                    title="Remove Slice"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-[#1A223E] flex items-center justify-between">
            <button
              type="button"
              onClick={handleAddSegment}
              className="px-3 py-1.5 rounded-lg bg-[#131A38] hover:bg-[#1A223E] text-slate-200 text-xs font-bold border border-[#1A223E] flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-400" />
              <span>Add Another Slice</span>
            </button>
            <span className="text-[11px] text-slate-400">Total slices: <strong>{settings.wheelProbabilities.length}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
