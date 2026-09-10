import React, { useState, useEffect } from 'react';
import { 
  Settings, Save, Loader2, AlertCircle, Plus, Trash2, RotateCcw, 
  Image as ImageIcon, ArrowUp, ArrowDown, Eye, CheckCircle, Radio, Sparkles, Upload, Link as LinkIcon
} from 'lucide-react';
import { api } from '../../services/api';
import { BannerItem, PlatformSettings } from '../../types';
import { DEFAULT_BANNERS, DEFAULT_FLASH_MESSAGE, DEFAULT_FLASH_BADGE } from '../../data/initialData';
import { FlashTicker } from '../FlashTicker';
import { BannerCarousel } from '../BannerCarousel';

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

const PRESET_WALLPAPERS = [
  {
    name: 'Stadium Floodlights',
    url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Cricket Batsman Action',
    url: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Turf Pitch & Red Ball',
    url: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Cricket Ground & Stands',
    url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'IPL Trophy & Stage Glow',
    url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
  },
];

export const SettingsManager: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'flash' | 'banners' | 'wheel'>('flash');

  const [settings, setSettings] = useState<PlatformSettings>({
    flashMessage: DEFAULT_FLASH_MESSAGE,
    flashBadge: DEFAULT_FLASH_BADGE,
    isFlashActive: true,
    banners: DEFAULT_BANNERS,
    wheelProbabilities: DEFAULT_15_PARTS,
  });

  // State for new banner creation
  const [newBanner, setNewBanner] = useState<Partial<BannerItem>>({
    title: '',
    subtitle: '',
    badge: '🔥 HOT CONTEST',
    imageUrl: PRESET_WALLPAPERS[0].url,
    linkTab: 'lobby',
    actionText: 'Play Now →',
    isActive: true,
  });

  const [showAddBannerModal, setShowAddBannerModal] = useState(false);

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

        const loadedBanners = data.banners && data.banners.length > 0
          ? data.banners
          : DEFAULT_BANNERS;

        setSettings({
          flashMessage: data.flashMessage ?? DEFAULT_FLASH_MESSAGE,
          flashBadge: data.flashBadge ?? DEFAULT_FLASH_BADGE,
          isFlashActive: data.isFlashActive !== undefined ? data.isFlashActive : true,
          banners: loadedBanners,
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
        setMessage(`Error: Wheel probabilities must add up to exactly 100%. Current total: ${totalProb.toFixed(1)}%`);
        return;
      }

      await api.updateSettings(settings);
      setMessage('Settings & CMS saved successfully!');
      setTimeout(() => setMessage(''), 3500);
    } catch (error) {
      console.error('Failed to save settings', error);
      setMessage('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  // Banner Actions
  const handleAddBanner = () => {
    if (!newBanner.title || !newBanner.imageUrl) {
      alert('Please provide a banner title and image URL.');
      return;
    }

    const created: BannerItem = {
      id: `banner_${Date.now()}`,
      title: newBanner.title || 'SuperOver Match',
      subtitle: newBanner.subtitle || '',
      badge: newBanner.badge || '',
      imageUrl: newBanner.imageUrl || PRESET_WALLPAPERS[0].url,
      linkTab: newBanner.linkTab || 'lobby',
      actionText: newBanner.actionText || 'Play Now →',
      isActive: newBanner.isActive !== undefined ? newBanner.isActive : true,
      order: (settings.banners?.length || 0) + 1,
    };

    setSettings((prev) => ({
      ...prev,
      banners: [...(prev.banners || []), created],
    }));

    setNewBanner({
      title: '',
      subtitle: '',
      badge: '🔥 HOT CONTEST',
      imageUrl: PRESET_WALLPAPERS[0].url,
      linkTab: 'lobby',
      actionText: 'Play Now →',
      isActive: true,
    });
    setShowAddBannerModal(false);
  };

  const handleDeleteBanner = (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      setSettings((prev) => ({
        ...prev,
        banners: (prev.banners || []).filter((b) => b.id !== id),
      }));
    }
  };

  const handleToggleBannerActive = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      banners: (prev.banners || []).map((b) =>
        b.id === id ? { ...b, isActive: !b.isActive } : b
      ),
    }));
  };

  const handleMoveBanner = (index: number, direction: 'up' | 'down') => {
    const list = [...(settings.banners || [])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    setSettings((prev) => ({
      ...prev,
      banners: list,
    }));
  };

  const handleResetDefaultBanners = () => {
    if (window.confirm('Reset to default preset banners?')) {
      setSettings((prev) => ({
        ...prev,
        banners: DEFAULT_BANNERS,
      }));
    }
  };

  // Wheel Actions
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
        <p className="text-slate-400">Loading platform settings...</p>
      </div>
    );
  }

  const currentTotal = settings.wheelProbabilities.reduce((acc, wp) => acc + (Number(wp.probability) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Header & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0D122B] p-5 rounded-2xl border border-[#1A223E]">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#FF6B00]" />
            Platform CMS & Settings
          </h2>
          <p className="text-xs text-slate-400">
            Configure Flash Marquee Ticker, Banner Carousel, and Spin Wheel (15 parts).
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:brightness-110 disabled:opacity-50 transition-all self-start sm:self-auto"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Changes</span>
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${
          message.includes('Error') ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        }`}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1A223E] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('flash')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'flash'
              ? 'bg-[#FF6B00] text-slate-950 shadow-md shadow-[#FF6B00]/20'
              : 'bg-[#0D122B] text-slate-400 hover:text-white border border-[#1A223E]'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Flash Ticker (Marquee)</span>
        </button>

        <button
          onClick={() => setActiveTab('banners')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'banners'
              ? 'bg-[#FF6B00] text-slate-950 shadow-md shadow-[#FF6B00]/20'
              : 'bg-[#0D122B] text-slate-400 hover:text-white border border-[#1A223E]'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Banner Carousel ({settings.banners?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('wheel')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'wheel'
              ? 'bg-[#FF6B00] text-slate-950 shadow-md shadow-[#FF6B00]/20'
              : 'bg-[#0D122B] text-slate-400 hover:text-white border border-[#1A223E]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Wheel of Fortune (15 Parts)</span>
        </button>
      </div>

      {/* TAB 1: FLASH TICKER CMS */}
      {activeTab === 'flash' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-sky-400" />
                  Top Flash Marquee Bar Settings
                </h3>
                <p className="text-xs text-slate-400">
                  Controls the live scrolling ticker at the very top of the How to Play screen.
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-xs text-slate-400 font-bold">Ticker Active:</span>
                <input
                  type="checkbox"
                  checked={settings.isFlashActive}
                  onChange={(e) => setSettings({ ...settings, isFlashActive: e.target.checked })}
                  className="w-4 h-4 accent-[#FF6B00] rounded cursor-pointer"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">
                  Left Badge Text
                </label>
                <input
                  type="text"
                  value={settings.flashBadge || ''}
                  onChange={(e) => setSettings({ ...settings, flashBadge: e.target.value })}
                  placeholder="e.g. News 📰 or Alert ⚡"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-sm font-bold focus:outline-none focus:border-[#FF6B00]"
                />
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {['News 📰', 'Update 🔥', 'Alert ⚡', 'Live 🔴', 'Offer 🎁'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setSettings({ ...settings, flashBadge: preset })}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#131A38] text-slate-300 hover:text-white border border-[#1A223E]"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">
                  Marquee Scrolling Message
                </label>
                <textarea
                  value={settings.flashMessage || ''}
                  onChange={(e) => setSettings({ ...settings, flashMessage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-sm focus:outline-none focus:border-[#FF6B00] transition-colors"
                  rows={2}
                  placeholder="Enter flash announcement text..."
                />
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="pt-3 border-t border-[#1A223E]">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live Preview:</span>
              </div>
              <FlashTicker
                message={settings.flashMessage}
                badge={settings.flashBadge}
                isActive={settings.isFlashActive}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BANNER CAROUSEL CMS */}
      {activeTab === 'banners' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#FF6B00]" />
                  Banner Carousel Management
                </h3>
                <p className="text-xs text-slate-400">
                  Upload, customize, and arrange responsive banners with automatic & manual sliding.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetDefaultBanners}
                  className="px-3 py-1.5 rounded-lg bg-[#131A38] text-xs font-bold text-amber-400 hover:bg-[#1A223E] border border-amber-400/20 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddBannerModal(true)}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-[#FF6B00]/20 hover:brightness-110"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Banner</span>
                </button>
              </div>
            </div>

            {/* List of Configured Banners */}
            <div className="space-y-3">
              {(settings.banners || []).map((banner, index) => (
                <div
                  key={banner.id || index}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    banner.isActive !== false
                      ? 'bg-[#080C1D] border-[#1A223E]'
                      : 'bg-[#080C1D]/50 border-red-500/20 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Thumbnail */}
                    <div
                      className="w-20 h-14 rounded-lg bg-cover bg-center shrink-0 border border-[#1A223E] relative overflow-hidden"
                      style={{ backgroundImage: `url(${banner.imageUrl})` }}
                    >
                      <div className="absolute top-1 left-1 px-1 rounded bg-black/70 text-[9px] text-white font-mono">
                        #{index + 1}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {banner.badge && (
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-[#FF6B00]/20 text-[#FF8800] border border-[#FF6B00]/30">
                            {banner.badge}
                          </span>
                        )}
                        <h4 className="text-sm font-bold text-white truncate">{banner.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{banner.subtitle}</p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1">
                        <span>Action: <strong>{banner.actionText || 'Play Now'}</strong></span>
                        <span>•</span>
                        <span>Target Tab: <strong>{banner.linkTab || 'lobby'}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions (Reorder, Active Toggle, Delete) */}
                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveBanner(index, 'up')}
                      title="Move Up"
                      className="p-1.5 rounded-lg bg-[#131A38] text-slate-300 hover:text-white disabled:opacity-30 border border-[#1A223E]"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === (settings.banners?.length || 0) - 1}
                      onClick={() => handleMoveBanner(index, 'down')}
                      title="Move Down"
                      className="p-1.5 rounded-lg bg-[#131A38] text-slate-300 hover:text-white disabled:opacity-30 border border-[#1A223E]"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleBannerActive(banner.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                        banner.isActive !== false
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {banner.isActive !== false ? 'Active' : 'Hidden'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteBanner(banner.id)}
                      title="Delete Banner"
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Interactive Carousel Preview */}
            <div className="pt-4 border-t border-[#1A223E]">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Live Carousel Preview:
                </span>
              </div>
              <BannerCarousel banners={settings.banners || []} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SPIN WHEEL CONFIGURATION */}
      {activeTab === 'wheel' && (
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
      )}

      {/* Modal: Add New Banner */}
      {showAddBannerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#0D122B] border border-[#1A223E] rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1A223E] pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#FF6B00]" />
                Upload & Create New Banner
              </h3>
              <button
                onClick={() => setShowAddBannerModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  Banner Title *
                </label>
                <input
                  type="text"
                  value={newBanner.title || ''}
                  onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                  placeholder="e.g. IPL 2026 Mega Jackpot"
                  className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-sm font-bold focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  Subtitle / Description
                </label>
                <textarea
                  value={newBanner.subtitle || ''}
                  onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                  placeholder="e.g. Predict 6 stats on CSK vs MI and win up to 500X real cash!"
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={newBanner.badge || ''}
                    onChange={(e) => setNewBanner({ ...newBanner, badge: e.target.value })}
                    placeholder="e.g. 🔥 HOT CONTEST"
                    className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={newBanner.actionText || ''}
                    onChange={(e) => setNewBanner({ ...newBanner, actionText: e.target.value })}
                    placeholder="e.g. Enter Lobby →"
                    className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    Target Navigation Tab
                  </label>
                  <select
                    value={newBanner.linkTab || 'lobby'}
                    onChange={(e) => setNewBanner({ ...newBanner, linkTab: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                  >
                    <option value="lobby">Match Lobby (Play Matches)</option>
                    <option value="intro">How to Play & Rules</option>
                    <option value="payouts-rules">Payout Rules & Tiers</option>
                    <option value="my-contests">My Predictions Tab</option>
                    <option value="profile">Profile & Wallet Tab</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newBanner.isActive !== false}
                      onChange={(e) => setNewBanner({ ...newBanner, isActive: e.target.checked })}
                      className="w-4 h-4 accent-[#FF6B00] rounded cursor-pointer"
                    />
                    <span className="text-xs text-slate-200 font-bold">Show Banner (Active)</span>
                  </label>
                </div>
              </div>

              {/* Preset Image Wallpaper Selector */}
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">
                  Select Preset Wallpaper or Custom Image URL
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
                  {PRESET_WALLPAPERS.map((preset, pIdx) => (
                    <div
                      key={pIdx}
                      onClick={() => setNewBanner({ ...newBanner, imageUrl: preset.url })}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all group relative ${
                        newBanner.imageUrl === preset.url
                          ? 'border-[#FF6B00] scale-105 shadow-md shadow-[#FF6B00]/30'
                          : 'border-[#1A223E] hover:border-slate-400'
                      }`}
                    >
                      <div
                        className="h-14 bg-cover bg-center"
                        style={{ backgroundImage: `url(${preset.url})` }}
                      />
                      <div className="p-1 bg-[#080C1D] text-[9px] font-bold text-slate-300 text-center truncate">
                        {preset.name}
                      </div>
                    </div>
                  ))}
                </div>

                <input
                  type="text"
                  value={newBanner.imageUrl || ''}
                  onChange={(e) => setNewBanner({ ...newBanner, imageUrl: e.target.value })}
                  placeholder="Or paste custom image URL (https://...)"
                  className="w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-mono focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              {/* Local File Upload preview */}
              <div className="p-3 rounded-xl bg-[#080C1D] border border-dashed border-[#1A223E] text-center">
                <label className="cursor-pointer inline-flex items-center gap-2 text-xs font-bold text-[#FF6B00] hover:text-[#FFAA00]">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image File from PC</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          if (reader.result) {
                            setNewBanner({ ...newBanner, imageUrl: reader.result as string });
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#1A223E]">
              <button
                type="button"
                onClick={() => setShowAddBannerModal(false)}
                className="px-4 py-2 rounded-xl bg-[#131A38] text-slate-300 hover:text-white text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddBanner}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-slate-950 text-xs font-extrabold shadow-md shadow-[#FF6B00]/20 hover:brightness-110"
              >
                Add Banner to Carousel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
