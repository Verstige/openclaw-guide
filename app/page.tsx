'use client';

import { useState } from 'react';
import { ArrowRight, Zap, DollarSign, TrendingUp, Brain, Clock, Users, CheckCircle, XCircle } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// COMPLETE MODEL DATA
// ═══════════════════════════════════════════════════════════════════════════

const MODELS = [
  {
    name: 'GLM-5',
    provider: 'z.ai (Zhipu AI)',
    cost: 'FREE',
    monthlyLimit: '5 hours/week',
    quality: 4.5,
    speed: 4,
    contextWindow: '128K tokens',
    bestFor: ['Research', 'Writing', 'Day-to-day tasks', 'Business strategy', 'Content creation', 'Summarization'],
    avoid: ['Complex coding', 'Architecture decisions', 'Math reasoning'],
    color: '#00ffaa',
    description: 'The workhorse. Handles 80% of all tasks at zero cost. Perfect for research, writing, and general assistance.',
  },
  {
    name: 'GLM-4.7-Flash',
    provider: 'z.ai (Zhipu AI)',
    cost: 'FREE',
    monthlyLimit: '5 hours/week',
    quality: 3.5,
    speed: 5,
    contextWindow: '128K tokens',
    bestFor: ['Quick summaries', 'Fast responses', 'Cron jobs', 'Background tasks', 'Notifications'],
    avoid: ['Complex reasoning', 'Long-form content', 'Critical decisions'],
    color: '#00d4ff',
    description: 'The speed demon. Blazing fast for quick tasks. Ideal for automated jobs and instant responses.',
  },
  {
    name: 'Claude Sonnet 4-6',
    provider: 'Anthropic',
    cost: 'PAY-PER-USE',
    monthlyLimit: 'Unlimited (pay per token)',
    quality: 5,
    speed: 3,
    contextWindow: '200K tokens',
    bestFor: ['Architecture decisions', 'Complex reasoning', 'Judgment calls', 'Code review', 'Strategy', 'Legal/Compliance'],
    avoid: ['Simple tasks', 'Quick lookups', 'Repetitive work'],
    color: '#bf5fff',
    description: 'The judge. Premium quality for critical decisions. Use sparingly for maximum impact, minimum cost.',
  },
  {
    name: 'Qwen3-Coder 480B',
    provider: 'Ollama Pro (Cloud)',
    cost: '$20/month flat',
    monthlyLimit: 'UNLIMITED',
    quality: 5,
    speed: 4,
    contextWindow: '32K tokens',
    bestFor: ['Complex coding', 'Full-stack builds', 'Component creation', 'Refactoring', 'Bug fixes', 'Code generation'],
    avoid: ['Research', 'Writing', 'Quick questions'],
    color: '#ff9500',
    description: 'The builder. 480B parameter coding specialist. Unlimited usage for $20/month. Best value for developers.',
  },
  {
    name: 'Gemini 2.0 Flash',
    provider: 'Google (via OpenRouter)',
    cost: 'FREE',
    monthlyLimit: 'Rate limited',
    quality: 4,
    speed: 5,
    contextWindow: '1M tokens',
    bestFor: ['Trading signals', 'Web search', 'Market analysis', 'Real-time data', 'Cron jobs', 'Agents'],
    avoid: ['Coding', 'Long-form writing', 'Complex reasoning'],
    color: '#4285f4',
    description: 'The researcher. Google\'s fastest model. Perfect for trading signals and web-grounded tasks. FREE.',
  },
  {
    name: 'Gemini 2.0 Flash Lite',
    provider: 'Google (via OpenRouter)',
    cost: 'FREE',
    monthlyLimit: 'Higher rate limit',
    quality: 3.5,
    speed: 5,
    contextWindow: '1M tokens',
    bestFor: ['System monitoring', 'Health checks', 'Watchdogs', 'Simple crons', 'Notifications'],
    avoid: ['Complex tasks', 'Anything requiring quality'],
    color: '#34a853',
    description: 'The monitor. Lighter version for high-frequency automated tasks. Runs every 2 minutes for free.',
  },
  {
    name: 'Llama 3.2',
    provider: 'Ollama (Local)',
    cost: 'FREE',
    monthlyLimit: 'UNLIMITED',
    quality: 3,
    speed: 3,
    contextWindow: '128K tokens',
    bestFor: ['Private tasks', 'Offline work', 'Small fixes', 'Overnight builds', 'Sensitive data'],
    avoid: ['Complex coding', 'Time-sensitive tasks'],
    color: '#ff3d77',
    description: 'The local option. Runs on your machine. Completely free, private, and offline-capable.',
  },
];

const USE_CASES = [
  {
    task: '"Research competitors in the AI space"',
    recommended: 'GLM-5',
    alternative: 'Gemini 2.0 Flash',
    cost: 'FREE',
    why: 'GLM-5 handles research perfectly at zero cost. Gemini if you need real-time web data.',
  },
  {
    task: '"Build me a React component with animations"',
    recommended: 'Qwen3-Coder',
    alternative: 'Claude Sonnet',
    cost: '$20/mo (unlimited)',
    why: 'Qwen3-Coder is specialized for code. Flat rate means unlimited builds.',
  },
  {
    task: '"Is this system architecture secure?"',
    recommended: 'Claude Sonnet',
    alternative: 'None',
    cost: 'Pay per token',
    why: 'Security judgments need premium reasoning. Worth the cost for critical decisions.',
  },
  {
    task: '"Monitor my server every 2 minutes"',
    recommended: 'Gemini 2.0 Flash Lite',
    alternative: 'GLM-4.7-Flash',
    cost: 'FREE',
    why: 'High-frequency cron jobs need a fast, free model. Flash Lite handles rate limits.',
  },
  {
    task: '"Generate trading signals for US30"',
    recommended: 'Gemini 2.0 Flash',
    alternative: 'GLM-5',
    cost: 'FREE',
    why: 'Gemini has real-time data access. Perfect for market analysis.',
  },
  {
    task: '"Write me an email sequence"',
    recommended: 'GLM-5',
    alternative: 'Claude Sonnet',
    cost: 'FREE',
    why: 'GLM-5 excels at content. Save Claude for architecture, not emails.',
  },
];

const CRON_EXAMPLES = [
  { name: 'Health Check', interval: 'Every 2 min', model: 'Gemini Flash Lite', monthlyCost: '$0', calls: '21,600' },
  { name: 'Email Digest', interval: 'Every 6 hours', model: 'GLM-4.7-Flash', monthlyCost: '$0', calls: '120' },
  { name: 'Market Analysis', interval: 'Hourly', model: 'Gemini 2.0 Flash', monthlyCost: '$0', calls: '720' },
  { name: 'Weekly Report', interval: 'Weekly', model: 'GLM-5', monthlyCost: '$0', calls: '4' },
  { name: 'Code Build', interval: 'On demand', model: 'Qwen3-Coder', monthlyCost: '$20 (flat)', calls: 'Unlimited' },
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const [selectedModel, setSelectedModel] = useState(0);
  const [cronJobs, setCronJobs] = useState(5);
  const [monthlyTasks, setMonthlyTasks] = useState(100);
  const [activeTab, setActiveTab] = useState<'models' | 'routing' | 'cron' | 'calculator'>('models');

  const freeTasks = Math.round(monthlyTasks * 0.85);
  const paidTasks = Math.round(monthlyTasks * 0.10);
  const coderTasks = Math.round(monthlyTasks * 0.05);
  
  const totalCost = 20 + (paidTasks * 0.015);

  return (
    <main className="min-h-screen bg-[#0a0f19] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧠</span>
            <span className="font-bold text-lg">AI Model Guide</span>
          </div>
          <div className="hidden md:flex gap-2">
            {[
              { id: 'models', label: 'Models' },
              { id: 'routing', label: 'Smart Routing' },
              { id: 'cron', label: 'Cron Jobs' },
              { id: 'calculator', label: 'Calculator' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === tab.id ? 'bg-purple-500/20 text-purple-400' : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-[60vh] flex items-center justify-center px-6 pt-24 pb-12">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            Stop Wasting Money on AI
          </h1>
          
          <p className="text-xl md:text-2xl opacity-60 mb-8">
            Most people pay <span className="text-white font-bold">$20/month</span> for ONE AI.
            <br />
            You can get <span className="text-white font-bold">7 different AIs</span> for <span className="text-green-400 font-bold">$0-30/month</span>.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-4 py-2 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">
              85% of tasks = FREE
            </span>
            <span className="px-4 py-2 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">
              10% of tasks = $0.01 each
            </span>
            <span className="px-4 py-2 rounded-full text-sm bg-orange-500/20 text-orange-400 border border-orange-500/30">
              5% of tasks = $20/month unlimited
            </span>
          </div>

          <p className="opacity-40 text-sm max-w-2xl mx-auto">
            This guide explains every AI model you can use with OpenClaw — what they cost, what they're good at, 
            and how to route tasks to the cheapest option that can handle it.
          </p>
        </div>
      </section>

      {/* Models Tab */}
      {activeTab === 'models' && (
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">📋 Complete Model Breakdown</h2>

          {/* Model Selector */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {MODELS.map((model, i) => (
              <button
                key={model.name}
                onClick={() => setSelectedModel(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedModel === i 
                    ? 'scale-105' 
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  background: selectedModel === i ? `${model.color}20` : 'rgba(255,255,255,0.05)',
                  color: selectedModel === i ? model.color : 'white',
                  border: `1px solid ${selectedModel === i ? model.color + '50' : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                {model.name}
              </button>
            ))}
          </div>

          {/* Selected Model Details */}
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left: Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: MODELS[selectedModel].color }}>
                      {MODELS[selectedModel].name}
                    </h3>
                    <p className="opacity-40 text-sm">{MODELS[selectedModel].provider}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    MODELS[selectedModel].cost === 'FREE' 
                      ? 'bg-green-500/20 text-green-400' 
                      : MODELS[selectedModel].cost.includes('$20')
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {MODELS[selectedModel].cost}
                  </span>
                </div>

                <p className="opacity-60 mb-6">{MODELS[selectedModel].description}</p>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="opacity-60">Quality</span>
                      <span>{MODELS[selectedModel].quality}/5</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${MODELS[selectedModel].quality * 20}%`, background: MODELS[selectedModel].color }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="opacity-60">Speed</span>
                      <span>{MODELS[selectedModel].speed}/5</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${MODELS[selectedModel].speed * 20}%`, background: MODELS[selectedModel].color }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="opacity-40">Context Window</span>
                    <p className="font-medium">{MODELS[selectedModel].contextWindow}</p>
                  </div>
                  <div>
                    <span className="opacity-40">Monthly Limit</span>
                    <p className="font-medium">{MODELS[selectedModel].monthlyLimit}</p>
                  </div>
                </div>
              </div>

              {/* Right: Best For / Avoid */}
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Best For
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {MODELS[selectedModel].bestFor.map((use, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg text-xs bg-green-500/10 text-green-400 border border-green-500/20">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <XCircle size={16} className="text-red-400" />
                    Avoid For
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {MODELS[selectedModel].avoid.map((use, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg text-xs bg-red-500/10 text-red-400 border border-red-500/20">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Comparison Table */}
          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 opacity-40">Model</th>
                  <th className="text-left py-3 px-4 opacity-40">Cost</th>
                  <th className="text-left py-3 px-4 opacity-40">Quality</th>
                  <th className="text-left py-3 px-4 opacity-40">Speed</th>
                  <th className="text-left py-3 px-4 opacity-40">Best Use Case</th>
                </tr>
              </thead>
              <tbody>
                {MODELS.map((model, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 cursor-pointer" onClick={() => setSelectedModel(i)}>
                    <td className="py-3 px-4 font-medium" style={{ color: model.color }}>{model.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        model.cost === 'FREE' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        {model.cost}
                      </span>
                    </td>
                    <td className="py-3 px-4">{model.quality}/5</td>
                    <td className="py-3 px-4">{model.speed}/5</td>
                    <td className="py-3 px-4 opacity-60">{model.bestFor[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Routing Tab */}
      {activeTab === 'routing' && (
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">🎯 Smart Task Routing</h2>
          <p className="text-center opacity-60 mb-8 max-w-2xl mx-auto">
            The key to saving money is routing each task to the <span className="text-white font-bold">cheapest model that can handle it</span>.
            Here's exactly which model to use for common tasks.
          </p>

          <div className="space-y-4 max-w-4xl mx-auto">
            {USE_CASES.map((use, i) => (
              <div key={i} className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">💬</div>
                  <div className="flex-1">
                    <code className="text-sm opacity-80 block mb-3">{use.task}</code>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="opacity-40 text-xs block mb-1">Recommended</span>
                        <span className="font-bold text-green-400">{use.recommended}</span>
                      </div>
                      <div>
                        <span className="opacity-40 text-xs block mb-1">Alternative</span>
                        <span className="opacity-60">{use.alternative}</span>
                      </div>
                      <div>
                        <span className="opacity-40 text-xs block mb-1">Cost</span>
                        <span className="font-bold text-green-400">{use.cost}</span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs opacity-50 border-t border-white/10 pt-3">
                      💡 {use.why}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Routing Flow */}
          <div className="mt-12 backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-center">📊 The 85/10/5 Rule</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-400 mb-2">85%</div>
                <div className="text-sm opacity-60 mb-2">of tasks</div>
                <div className="px-3 py-2 rounded-lg bg-green-500/10 text-green-400 text-sm">
                  GLM-5 / Gemini Flash
                </div>
                <div className="mt-2 text-lg font-bold text-green-400">$0</div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-400 mb-2">10%</div>
                <div className="text-sm opacity-60 mb-2">of tasks</div>
                <div className="px-3 py-2 rounded-lg bg-purple-500/10 text-purple-400 text-sm">
                  Claude Sonnet
                </div>
                <div className="mt-2 text-lg font-bold text-purple-400">~$0.015 each</div>
              </div>
              
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-400 mb-2">5%</div>
                <div className="text-sm opacity-60 mb-2">of tasks</div>
                <div className="px-3 py-2 rounded-lg bg-orange-500/10 text-orange-400 text-sm">
                  Qwen3-Coder
                </div>
                <div className="mt-2 text-lg font-bold text-orange-400">$20/mo unlimited</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Cron Tab */}
      {activeTab === 'cron' && (
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">⏰ Cron Jobs & Automation</h2>
          <p className="text-center opacity-60 mb-8 max-w-2xl mx-auto">
            Cron jobs run automatically on a schedule. The trick is using <span className="text-white font-bold">fast, free models</span> for 
            high-frequency tasks. Here's how to set up 24/7 automation for $0.
          </p>

          {/* Cron Examples */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden max-w-4xl mx-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left py-4 px-6 opacity-40">Task</th>
                  <th className="text-left py-4 px-6 opacity-40">Interval</th>
                  <th className="text-left py-4 px-6 opacity-40">Model</th>
                  <th className="text-left py-4 px-6 opacity-40">Calls/Month</th>
                  <th className="text-right py-4 px-6 opacity-40">Cost</th>
                </tr>
              </thead>
              <tbody>
                {CRON_EXAMPLES.map((cron, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="py-4 px-6 font-medium">{cron.name}</td>
                    <td className="py-4 px-6 opacity-60">{cron.interval}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs ${
                        cron.monthlyCost === '$0' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                      }`}>
                        {cron.model}
                      </span>
                    </td>
                    <td className="py-4 px-6 opacity-60">{cron.calls}</td>
                    <td className="py-4 px-6 text-right font-bold text-green-400">{cron.monthlyCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Why Gemini Flash for Crons */}
          <div className="mt-8 backdrop-blur-xl bg-blue-500/10 rounded-2xl p-6 border border-blue-500/20 max-w-4xl mx-auto">
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Zap size={18} className="text-blue-400" />
              Why Gemini 2.0 Flash for Cron Jobs?
            </h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>✓ <span className="font-medium">FREE</span> — No per-token cost</li>
              <li>✓ <span className="font-medium">FAST</span> — Responds in milliseconds</li>
              <li>✓ <span className="font-medium">HIGH RATE LIMITS</span> — Can handle frequent calls</li>
              <li>✓ <span className="font-medium">WEB ACCESS</span> — Can fetch real-time data</li>
              <li>✓ <span className="font-medium">1M CONTEXT</span> — Handles large data checks</li>
            </ul>
          </div>

          {/* Cron Cost Breakdown */}
          <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">$0</div>
              <div className="text-sm opacity-60">Health checks (every 2 min)</div>
              <div className="text-xs opacity-40 mt-1">21,600 calls/month</div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">$0</div>
              <div className="text-sm opacity-60">Email digests (every 6 hrs)</div>
              <div className="text-xs opacity-40 mt-1">120 calls/month</div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">$0</div>
              <div className="text-sm opacity-60">Trading signals (hourly)</div>
              <div className="text-xs opacity-40 mt-1">720 calls/month</div>
            </div>
          </div>
        </section>
      )}

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">🧮 Personal Cost Calculator</h2>
          <p className="text-center opacity-60 mb-8 max-w-2xl mx-auto">
            Estimate your monthly AI costs based on how many tasks you do and how many cron jobs you run.
          </p>

          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
            <div className="space-y-8">
              <div>
                <label className="block text-sm opacity-60 mb-3">
                  Manual Tasks (per month)
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  value={monthlyTasks}
                  onChange={(e) => setMonthlyTasks(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span className="opacity-40">10</span>
                  <span className="font-bold text-lg">{monthlyTasks}</span>
                  <span className="opacity-40">1000</span>
                </div>
              </div>

              <div>
                <label className="block text-sm opacity-60 mb-3">
                  Automated Cron Jobs (per day)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cronJobs}
                  onChange={(e) => setCronJobs(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span className="opacity-40">0</span>
                  <span className="font-bold text-lg">{cronJobs}</span>
                  <span className="opacity-40">100</span>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="font-bold mb-6">Cost Breakdown</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="opacity-60">Free model tasks</span>
                      <span className="text-xs opacity-40 ml-2">({freeTasks} tasks)</span>
                    </div>
                    <span className="font-bold text-green-400">$0.00</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="opacity-60">Claude (judgment tasks)</span>
                      <span className="text-xs opacity-40 ml-2">({paidTasks} tasks)</span>
                    </div>
                    <span className="font-bold text-purple-400">${(paidTasks * 0.015).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="opacity-60">Qwen3-Coder (builds)</span>
                      <span className="text-xs opacity-40 ml-2">({coderTasks} tasks)</span>
                    </div>
                    <span className="font-bold text-orange-400">$20.00</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="opacity-60">Cron jobs (all free models)</span>
                      <span className="text-xs opacity-40 ml-2">({cronJobs * 30}/month)</span>
                    </div>
                    <span className="font-bold text-green-400">$0.00</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Monthly Total</span>
                    <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                      ${totalCost.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="mt-4 text-center text-sm opacity-40">
                    {monthlyTasks} manual tasks + {cronJobs * 30} automated runs per month
                  </div>
                </div>
              </div>

              {/* Comparison */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="font-bold mb-4 text-center">vs. Traditional AI</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="text-2xl font-bold text-red-400">${monthlyTasks > 100 ? '150+' : '20'}</div>
                    <div className="text-xs opacity-60 mt-1">ChatGPT / Claude Pro</div>
                    <div className="text-xs opacity-40 mt-1">1 assistant, no automation</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="text-2xl font-bold text-green-400">${totalCost.toFixed(2)}</div>
                    <div className="text-xs opacity-60 mt-1">OpenClaw Smart Routing</div>
                    <div className="text-xs opacity-40 mt-1">7 models, full automation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 text-center opacity-40 text-sm border-t border-white/5 mt-12">
        <p>Made with 🧠 by Julylan Johnson • Verstige Technologies</p>
        <p className="mt-2">Learn more at <a href="https://openclaw.ai" className="text-purple-400 hover:underline">openclaw.ai</a></p>
      </footer>
    </main>
  );
}
