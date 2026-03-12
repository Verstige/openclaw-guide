'use client';

import { useState } from 'react';
import { ArrowRight, Code2, MessageSquare } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

const MODELS = [
  { name: 'GLM-5', provider: 'z.ai', cost: 'FREE', quality: 4, speed: 4, tasks: 'Research, Writing, Day-to-day', color: '#00ffaa' },
  { name: 'GLM-4.7-Flash', provider: 'z.ai', cost: 'FREE', quality: 3, speed: 5, tasks: 'Quick tasks, Summaries', color: '#00d4ff' },
  { name: 'Claude Sonnet', provider: 'Anthropic', cost: 'PAID', quality: 5, speed: 3, tasks: 'Architecture, Judgment', color: '#bf5fff' },
  { name: 'Qwen3-Coder', provider: 'Ollama Pro', cost: '$20/mo', quality: 5, speed: 4, tasks: 'Complex coding, Builds', color: '#ff9500' },
  { name: 'Gemini Flash', provider: 'Google', cost: 'FREE', quality: 4, speed: 5, tasks: 'Trading, Web search', color: '#00d4ff' },
];

const AGENTS = [
  { name: 'ZORA', role: 'Main Orchestrator', model: 'Claude', tasks: 'Architecture, Strategy', icon: '🌀' },
  { name: 'ZEN', role: 'Deputy', model: 'GLM-5', tasks: 'Day-to-day, Dispatch', icon: '🧘' },
  { name: 'ATLAS', role: 'Lead Builder', model: 'Qwen3', tasks: 'Complex builds', icon: '🏗️' },
  { name: 'LYRA', role: 'Researcher', model: 'GLM-4.7', tasks: 'Research, Summaries', icon: '📚' },
  { name: 'NOVA', role: 'Trading', model: 'Gemini', tasks: 'Market analysis', icon: '📈' },
  { name: 'CIPHER', role: 'Security', model: 'GLM-5', tasks: 'Audits', icon: '🔐' },
  { name: 'EMBER', role: 'Content', model: 'GLM-5', tasks: 'Copy, Emails', icon: '✍️' },
  { name: 'PULSE', role: 'Monitor', model: 'GLM-4.7', tasks: 'Health checks', icon: '💓' },
];

const COMPETITORS = [
  { name: 'ChatGPT Plus', price: 20, features: 1, automation: false },
  { name: 'Claude Pro', price: 20, features: 1, automation: false },
  { name: 'OpenAI API', price: 150, features: 1, automation: false },
  { name: 'OpenClaw', price: 20, features: 36, automation: true },
];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  const [cronJobs, setCronJobs] = useState(5);
  const [monthlyTasks, setMonthlyTasks] = useState(100);

  const totalCost = 20 + (monthlyTasks * 0.2 * 0.01);

  return (
    <main className="min-h-screen bg-[#0a0f19] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦞</span>
            <span className="font-bold text-lg">OpenClaw Guide</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#cost" className="opacity-60 hover:opacity-100">Cost</a>
            <a href="#models" className="opacity-60 hover:opacity-100">Models</a>
            <a href="#agents" className="opacity-60 hover:opacity-100">Agents</a>
            <a href="#calculator" className="opacity-60 hover:opacity-100">Calculator</a>
            <a href="#setup" className="opacity-60 hover:opacity-100">Setup</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-6xl">🦞</span>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              OpenClaw
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl opacity-60 mb-8">
            Your Personal AI Workforce — <span className="text-white">36+ Agents</span>, One Platform
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {['100% Free Models', '24/7 Automation', 'Persistent Memory', 'Trading Signals'].map((tag, i) => (
              <span key={i} className="px-4 py-2 rounded-full text-sm bg-white/10 backdrop-blur">
                {tag}
              </span>
            ))}
          </div>

          <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 max-w-2xl mx-auto border border-white/10">
            <p className="text-lg opacity-80 leading-relaxed">
              Instead of paying <span className="text-white font-bold">$20/month</span> for ONE AI chat...
              get <span className="text-white font-bold">36+ specialized AI employees</span> that build,
              research, trade, and manage your entire business <span className="text-white">while you sleep</span>.
            </p>
          </div>

          <a href="#cost" className="inline-flex items-center gap-2 px-6 py-3 mt-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            See the math <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Cost Comparison */}
      <section id="cost" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          💰 Cost Comparison
        </h2>
        
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {COMPETITORS.map((comp, i) => (
            <div 
              key={i}
              className={`backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:scale-105 transition-transform ${i === 3 ? 'ring-2 ring-purple-500' : ''}`}
            >
              <h3 className="text-lg font-bold mb-2">{comp.name}</h3>
              <div className={`text-4xl font-bold mb-4 ${comp.price <= 20 ? 'text-green-400' : 'text-red-400'}`}>
                ${comp.price}/mo
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="opacity-60 text-sm">AI Assistants</span>
                  <span className="font-bold">{comp.features}{comp.features > 1 ? '+' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60 text-sm">24/7 Automation</span>
                  <span className={comp.automation ? 'text-green-400' : 'text-red-400'}>{comp.automation ? '✓' : '✗'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 max-w-3xl mx-auto border border-white/10 text-center">
          <h3 className="text-xl font-bold mb-4">📊 The Bottom Line</h3>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="opacity-60 text-sm mb-2">ChatGPT Plus (1 year)</p>
              <p className="text-3xl font-bold text-red-400">$240</p>
              <p className="opacity-40 text-xs mt-1">1 assistant, no automation</p>
            </div>
            <div>
              <p className="opacity-60 text-sm mb-2">OpenClaw (1 year)</p>
              <p className="text-3xl font-bold text-green-400">$240</p>
              <p className="opacity-40 text-xs mt-1">36+ agents, full automation</p>
            </div>
          </div>
          <p className="mt-6 text-lg">
            <span className="opacity-60">Same price, </span>
            <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">36x more power</span>
          </p>
        </div>
      </section>

      {/* Models */}
      <section id="models" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          🧠 Model Routing Strategy
        </h2>

        <p className="text-center opacity-60 mb-8 max-w-2xl mx-auto">
          We route tasks to the <span className="text-white">cheapest model that can handle it</span>.
          Complex architecture? Claude. Quick research? GLM-5 (free).
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODELS.map((model, i) => (
            <div key={i} className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:scale-105 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">{model.name}</h3>
                  <p className="opacity-40 text-sm">{model.provider}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${model.cost === 'FREE' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                  {model.cost}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="opacity-60">Quality</span>
                    <span>{model.quality}/5</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${model.quality * 20}%`, background: model.color }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="opacity-60">Speed</span>
                    <span>{model.speed}/5</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${model.speed * 20}%`, background: model.color }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="opacity-40 text-xs mb-2">Best for:</p>
                <p className="text-sm">{model.tasks}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          🤖 Your AI Workforce
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {AGENTS.map((agent, i) => (
            <div key={i} className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{agent.icon}</span>
                <div>
                  <h3 className="font-bold">{agent.name}</h3>
                  <p className="opacity-40 text-xs">{agent.role}</p>
                </div>
              </div>
              <span className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-400">{agent.model}</span>
            </div>
          ))}
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 max-w-3xl mx-auto border border-white/10 text-center mt-8">
          <p className="text-lg mb-4">
            <span className="opacity-60">And </span>
            <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">28 more specialized agents</span>
            <span className="opacity-60"> for every aspect of your business</span>
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
          🧮 Cost Calculator
        </h2>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 max-w-2xl mx-auto border border-white/10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm opacity-60 mb-2">Cron Jobs (automated tasks/day)</label>
              <input
                type="range"
                min="0"
                max="50"
                value={cronJobs}
                onChange={(e) => setCronJobs(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-right text-sm opacity-40">{cronJobs} jobs/day</div>
            </div>

            <div>
              <label className="block text-sm opacity-60 mb-2">Monthly Tasks</label>
              <input
                type="range"
                min="10"
                max="500"
                value={monthlyTasks}
                onChange={(e) => setMonthlyTasks(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-right text-sm opacity-40">{monthlyTasks} tasks/month</div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h4 className="font-bold mb-4">Cost Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="opacity-60">Free model tasks ({Math.round(monthlyTasks * 0.8)})</span>
                  <span className="text-green-400 font-bold">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Paid model tasks ({Math.round(monthlyTasks * 0.2)})</span>
                  <span className="text-yellow-400 font-bold">${(monthlyTasks * 0.2 * 0.01).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Ollama Pro (unlimited coding)</span>
                  <span className="text-blue-400 font-bold">$20.00</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total Monthly Cost</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    ${totalCost.toFixed(2)}
                  </span>
                </div>
                <p className="text-center opacity-40 text-sm mt-2">
                  For {monthlyTasks} tasks + {cronJobs * 30} automated runs/month
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section id="setup" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          🚀 Quick Setup
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { num: 1, title: 'Install OpenClaw', cmd: 'npm install -g openclaw', time: '2 min' },
            { num: 2, title: 'Initialize', cmd: 'openclaw init', time: '1 min' },
            { num: 3, title: 'Configure models', cmd: 'Add API keys to openclaw.json', time: '5 min' },
            { num: 4, title: 'Create agents', cmd: 'Define in AGENTS.md', time: '10 min' },
            { num: 5, title: 'Start gateway', cmd: 'openclaw gateway start', time: '30 sec' },
            { num: 6, title: 'Chat!', cmd: 'Connect via Telegram/Discord', time: '1 min' },
          ].map((step) => (
            <div key={step.num} className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center font-bold text-purple-400">
                {step.num}
              </div>
              <div className="flex-1">
                <h4 className="font-bold">{step.title}</h4>
                <code className="text-sm opacity-60">{step.cmd}</code>
              </div>
              <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">{step.time}</span>
            </div>
          ))}
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 max-w-3xl mx-auto border border-white/10 text-center mt-8">
          <p className="text-lg mb-4">
            <span className="opacity-60">Total setup time: </span>
            <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">~20 minutes</span>
          </p>
          <p className="opacity-40 text-sm">Then your AI workforce runs 24/7</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 max-w-2xl mx-auto border border-white/10 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            Ready to Build Your AI Workforce?
          </h2>
          <p className="opacity-60 mb-8">
            Stop paying for one assistant. Get 36+ specialized employees for the same price.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://github.com/openclaw/openclaw" 
              target="_blank"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Code2 size={18} />
              View on GitHub
            </a>
            <a 
              href="https://docs.openclaw.ai" 
              target="_blank"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <MessageSquare size={18} />
              Read Docs
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center opacity-40 text-sm">
        <p>Made with 🦞 by Julylan Johnson • Verstige Technologies</p>
      </footer>
    </main>
  );
}
