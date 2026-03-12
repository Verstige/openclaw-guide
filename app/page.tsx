'use client';

import { useState, useEffect } from 'react';
import {
  Zap, Users, DollarSign, TrendingUp, Brain, Code2, 
  MessageSquare, Calendar, Bot, Settings, Rocket,
  CheckCircle, XCircle, ArrowRight, Play, Pause, RefreshCw,
  ChevronDown, ChevronUp, ExternalLink, Copy, Sparkles
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

const MODELS = [
  { name: 'GLM-5', provider: 'z.ai', cost: 'FREE', quality: 4, speed: 4, tasks: 'Research, Writing, Day-to-day', color: '#00ffaa' },
  { name: 'GLM-4.7-Flash', provider: 'z.ai', cost: 'FREE', quality: 3, speed: 5, tasks: 'Quick tasks, Summaries', color: '#00d4ff' },
  { name: 'Claude Sonnet', provider: 'Anthropic', cost: 'PAID', quality: 5, speed: 3, tasks: 'Architecture, Judgment', color: '#bf5fff' },
  { name: 'Qwen3-Coder', provider: 'Ollama Pro', cost: '$20/mo', quality: 5, speed: 4, tasks: 'Complex coding, Builds', color: '#ff9500' },
  { name: 'Gemini Flash', provider: 'Google', cost: 'FREE', quality: 4, speed: 5, tasks: 'Trading, Web search', color: '#00d4ff' },
  { name: 'Llama 3.2', provider: 'Ollama Local', cost: 'FREE', quality: 3, speed: 3, tasks: 'Local, Private', color: '#ff3d77' },
];

const AGENTS = [
  { name: 'ZORA', role: 'Main Orchestrator', model: 'Claude Sonnet', tasks: 'Architecture, Strategy, Judgment', icon: '🌀' },
  { name: 'ZEN', role: 'Deputy Orchestrator', model: 'GLM-5', tasks: 'Day-to-day operations, Dispatch', icon: '🧘' },
  { name: 'ATLAS', role: 'Lead Builder', model: 'Qwen3-Coder', tasks: 'Complex builds, Full-stack', icon: '🏗️' },
  { name: 'LYRA', role: 'Researcher', model: 'GLM-4.7-Flash', tasks: 'Research, Summarization, News', icon: '📚' },
  { name: 'NOVA', role: 'Trading Analyst', model: 'Gemini Flash', tasks: 'Market analysis, Signals', icon: '📈' },
  { name: 'CIPHER', role: 'Security', model: 'GLM-5', tasks: 'Audits, Config checks', icon: '🔐' },
  { name: 'EMBER', role: 'Content Writer', model: 'GLM-5', tasks: 'Copy, Email sequences', icon: '✍️' },
  { name: 'PULSE', role: 'System Monitor', model: 'GLM-4.7-Flash', tasks: 'Health checks, Monitoring', icon: '💓' },
];

const COMPETITORS = [
  { name: 'ChatGPT Plus', price: 20, features: 1, automation: 0, memory: 0 },
  { name: 'Claude Pro', price: 20, features: 1, automation: 0, memory: 0 },
  { name: 'OpenAI API', price: 150, features: 1, automation: 0, memory: 0 },
  { name: 'OpenClaw', price: 20, features: 36, automation: 1, memory: 1 },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center gradient-text">{title}</h2>
      {children}
    </section>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass rounded-2xl p-6 hover-lift ${className}`}>
      {children}
    </div>
  );
}

function Badge({ children, color = '#667eea' }: { children: React.ReactNode; color?: string }) {
  return (
    <span 
      className="px-3 py-1 rounded-full text-xs font-medium"
      style={{ background: `${color}20`, color }}
    >
      {children}
    </span>
  );
}

function ProgressBar({ value, color = '#667eea' }: { value: number; color?: string }) {
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full rounded-full transition-all duration-1000"
        style={{ width: `${value * 20}%`, background: color }}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTIONS
// ═══════════════════════════════════════════════════════════════════════════

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="text-center relative z-10 max-w-4xl">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-6xl">🦞</span>
          <h1 className="text-6xl md:text-8xl font-bold gradient-text">OpenClaw</h1>
        </div>
        
        <p className="text-xl md:text-2xl text-white/60 mb-8">
          Your Personal AI Workforce — <span className="text-white">36+ Agents</span>, One Platform
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Badge color="#00ffaa">100% Free Models</Badge>
          <Badge color="#00d4ff">24/7 Automation</Badge>
          <Badge color="#bf5fff">Persistent Memory</Badge>
          <Badge color="#ff9500">Trading Signals</Badge>
        </div>

        <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
          <p className="text-lg text-white/80 leading-relaxed">
            Instead of paying <span className="text-white font-bold">$20/month</span> for ONE AI chat...
            get <span className="text-white font-bold">36+ specialized AI employees</span> that build,
            research, trade, and manage your entire business <span className="text-white">while you sleep</span>.
          </p>
        </div>

        <div className="mt-12">
          <a href="#cost-comparison" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
            See the math <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function CostComparisonSection() {
  const [selectedOption, setSelectedOption] = useState(3);

  return (
    <Section id="cost-comparison" title="💰 Cost Comparison">
      <div className="grid md:grid-cols-4 gap-4 mb-12">
        {COMPETITORS.map((comp, i) => (
          <Card 
            key={i}
            className={`cursor-pointer transition-all ${selectedOption === i ? 'ring-2 ring-purple-500' : ''}`}
          >
            <div onClick={() => setSelectedOption(i)}>
              <h3 className="text-lg font-bold mb-2">{comp.name}</h3>
              <div className="text-4xl font-bold mb-4" style={{ color: comp.price <= 20 ? '#00ffaa' : '#ff3d77' }}>
                ${comp.price}/mo
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">AI Assistants</span>
                  <span className="font-bold">{comp.features}{comp.features > 1 ? '+' : ''}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">24/7 Automation</span>
                  {comp.automation ? <CheckCircle size={18} className="text-green-400" /> : <XCircle size={18} className="text-red-400" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Persistent Memory</span>
                  {comp.memory ? <CheckCircle size={18} className="text-green-400" /> : <XCircle size={18} className="text-red-400" />}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4">📊 The Bottom Line</h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-white/60 text-sm mb-2">ChatGPT Plus (1 year)</p>
            <p className="text-3xl font-bold text-red-400">$240</p>
            <p className="text-white/40 text-xs mt-1">1 assistant, no automation</p>
          </div>
          <div>
            <p className="text-white/60 text-sm mb-2">OpenClaw (1 year)</p>
            <p className="text-3xl font-bold text-green-400">$240</p>
            <p className="text-white/40 text-xs mt-1">36+ agents, full automation</p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-lg">
            <span className="text-white/60">Same price, </span>
            <span className="font-bold gradient-text">36x more power</span>
          </p>
        </div>
      </Card>
    </Section>
  );
}

function ModelRoutingSection() {
  return (
    <Section id="models" title="🧠 Model Routing Strategy">
      <p className="text-center text-white/60 mb-8 max-w-2xl mx-auto">
        We route tasks to the <span className="text-white">cheapest model that can handle it</span>.
        Complex architecture? Claude. Quick research? GLM-5 (free).
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODELS.map((model, i) => (
          <Card key={i}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{model.name}</h3>
                <p className="text-white/40 text-sm">{model.provider}</p>
              </div>
              <Badge color={model.cost === 'FREE' ? '#00ffaa' : '#ff9500'}>
                {model.cost}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">Quality</span>
                  <span>{model.quality}/5</span>
                </div>
                <ProgressBar value={model.quality} color={model.color} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">Speed</span>
                  <span>{model.speed}/5</span>
                </div>
                <ProgressBar value={model.speed} color={model.color} />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-white/40 text-xs mb-2">Best for:</p>
              <p className="text-sm">{model.tasks}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="max-w-3xl mx-auto mt-8">
        <h3 className="text-lg font-bold mb-4 text-center">🎯 Smart Routing Example</h3>
        <div className="space-y-3">
          {[
            { task: '"Build me a website"', model: 'Qwen3-Coder', cost: '$20/mo', icon: '🏗️' },
            { task: '"Research competitors"', model: 'GLM-5', cost: 'FREE', icon: '📚' },
            { task: '"Is this architecture good?"', model: 'Claude Sonnet', cost: 'PAID', icon: '🧠' },
            { task: '"What\'s the market doing?"', model: 'Gemini Flash', cost: 'FREE', icon: '📈' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
              <span className="text-2xl">{item.icon}</span>
              <code className="text-sm flex-1">{item.task}</code>
              <span className="text-sm font-medium" style={{ color: item.cost === 'FREE' ? '#00ffaa' : '#ff9500' }}>
                → {item.model}
              </span>
              <Badge color={item.cost === 'FREE' ? '#00ffaa' : '#ff9500'}>{item.cost}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

function AgentsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Section id="agents" title="🤖 Your AI Workforce">
      <p className="text-center text-white/60 mb-8 max-w-2xl mx-auto">
            specialized agents, each with a specific role. Not one AI trying to do everything.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {AGENTS.map((agent) => (
          <Card key={agent.name} className="cursor-pointer" onClick={() => setExpanded(expanded === agent.name ? null : agent.name)}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{agent.icon}</span>
              <div>
                <h3 className="font-bold">{agent.name}</h3>
                <p className="text-white/40 text-xs">{agent.role}</p>
              </div>
            </div>
            
            <Badge color="#667eea">{agent.model}</Badge>
            
            {expanded === agent.name && (
              <div className="mt-4 pt-4 border-t border-white/10 text-sm text-white/60">
                {agent.tasks}
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card className="max-w-3xl mx-auto mt-8 text-center">
        <p className="text-lg mb-4">
          <span className="text-white/60">And </span>
          <span className="font-bold gradient-text">28 more specialized agents</span>
          <span className="text-white/60"> for every aspect of your business</span>
        </p>
        <p className="text-white/40 text-sm">
          Trading • Content • Research • Development • Security • Sales • Marketing • Operations
        </p>
      </Card>
    </Section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: '🧠', title: 'Persistent Memory', desc: 'Agents remember everything across sessions. No more repeating yourself.' },
    { icon: '⏰', title: '24/7 Automation', desc: 'Cron jobs run while you sleep. Wake up to completed work.' },
    { icon: '🔄', title: 'Model Fallbacks', desc: 'If one model hits rate limits, automatically switch to another.' },
    { icon: '📊', title: 'Dev Center Dashboard', desc: 'See all agents, tasks, projects, and analytics in one place.' },
    { icon: '🔗', title: 'API Integrations', desc: 'Connect to Supabase, Vercel, GitHub, trading platforms, and more.' },
    { icon: '📱', title: 'Multi-Platform Chat', desc: 'Chat via Telegram, Discord, WhatsApp, Signal, or iMessage.' },
  ];

  return (
    <Section id="features" title="✨ Core Features">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Card key={i}>
            <span className="text-4xl mb-4 block">{f.icon}</span>
            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
            <p className="text-white/60 text-sm">{f.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function CostCalculatorSection() {
  const [cronJobs, setCronJobs] = useState(5);
  const [monthlyTasks, setMonthlyTasks] = useState(100);

  const freeTasks = monthlyTasks * 0.8; // 80% routed to free models
  const paidTasks = monthlyTasks * 0.2; // 20% to paid models
  
  const ollamaCost = 20; // Flat rate
  const claudeCost = paidTasks * 0.01; // Estimate $0.01 per task
  const totalCost = ollamaCost + claudeCost;

  return (
    <Section id="calculator" title="🧮 Cost Calculator">
      <Card className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-white/60 mb-2">Cron Jobs (automated tasks/day)</label>
            <input
              type="range"
              min="0"
              max="50"
              value={cronJobs}
              onChange={(e) => setCronJobs(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-right text-sm text-white/40">{cronJobs} jobs/day</div>
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-2">Monthly Tasks</label>
            <input
              type="range"
              min="10"
              max="500"
              value={monthlyTasks}
              onChange={(e) => setMonthlyTasks(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-right text-sm text-white/40">{monthlyTasks} tasks/month</div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <h4 className="font-bold mb-4">Cost Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/60">Free model tasks ({Math.round(freeTasks)})</span>
                <span className="text-green-400 font-bold">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Paid model tasks ({Math.round(paidTasks)})</span>
                <span className="text-yellow-400 font-bold">${claudeCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Ollama Pro (unlimited coding)</span>
                <span className="text-blue-400 font-bold">$20.00</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total Monthly Cost</span>
                <span className="text-3xl font-bold gradient-text">${totalCost.toFixed(2)}</span>
              </div>
              <p className="text-center text-white/40 text-sm mt-2">
                For {monthlyTasks} tasks + {cronJobs * 30} automated runs/month
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}

function SetupSection() {
  const steps = [
    { num: 1, title: 'Install OpenClaw', cmd: 'npm install -g openclaw', time: '2 min' },
    { num: 2, title: 'Initialize', cmd: 'openclaw init', time: '1 min' },
    { num: 3, title: 'Configure models', cmd: 'Add API keys to openclaw.json', time: '5 min' },
    { num: 4, title: 'Create agents', cmd: 'Define in AGENTS.md', time: '10 min' },
    { num: 5, title: 'Start gateway', cmd: 'openclaw gateway start', time: '30 sec' },
    { num: 6, title: 'Chat!', cmd: 'Connect via Telegram/Discord', time: '1 min' },
  ];

  return (
    <Section id="setup" title="🚀 Quick Setup">
      <div className="max-w-3xl mx-auto space-y-4">
        {steps.map((step) => (
          <Card key={step.num}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center font-bold text-purple-400">
                {step.num}
              </div>
              <div className="flex-1">
                <h4 className="font-bold">{step.title}</h4>
                <code className="text-sm text-white/60">{step.cmd}</code>
              </div>
              <Badge color="#00d4ff">{step.time}</Badge>
            </div>
          </Card>
        ))}
      </div>

      <Card className="max-w-3xl mx-auto mt-8 text-center">
        <p className="text-lg mb-4">
          <span className="text-white/60">Total setup time: </span>
          <span className="font-bold gradient-text">~20 minutes</span>
        </p>
        <p className="text-white/40 text-sm">
          Then your AI workforce runs 24/7
        </p>
      </Card>
    </Section>
  );
}

function ArchitectureSection() {
  return (
    <Section id="architecture" title="🏗️ System Architecture">
      <Card className="max-w-4xl mx-auto">
        <pre className="text-xs md:text-sm overflow-x-auto text-white/80 font-mono leading-relaxed">
{`
┌─────────────────────────────────────────────────────────────────────┐
│                           YOU                                       │
│                    (Telegram/Discord/WhatsApp)                       │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                        OPENCLAW GATEWAY                               │
│                    (The Brain - Routes Everything)                    │
├──────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │   ZORA   │  │   ZEN    │  │  ATLAS   │  │  OTHERS  │            │
│  │(Orchestr.)│  │(Dispatch)│  │ (Builder)│  │ (36+)   │            │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘            │
└───────┼─────────────┼─────────────┼─────────────┼───────────────────┘
        │             │             │             │
        ▼             ▼             ▼             ▼
┌──────────────────────────────────────────────────────────────────────┐
│                         MODEL LAYER                                   │
├────────────┬────────────┬────────────┬────────────┬─────────────────┤
│  Claude    │   GLM-5    │   Qwen     │  Gemini    │    Llama       │
│  (Judge)   │  (Worker)  │  (Coder)   │ (Search)   │   (Local)      │
│   💰       │    🟢      │    💵      │    🟢      │     🟢         │
└────────────┴────────────┴────────────┴────────────┴─────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────────┐
│                       MEMORY & DATA                                   │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐        │
│  │ MEMORY.md │  │  Supabase │  │   Dev     │  │  Agent    │        │
│  │(Long-term)│  │   (DB)    │  │  Center   │  │  Profiles │        │
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘        │
└──────────────────────────────────────────────────────────────────────┘
`}
        </pre>
      </Card>
    </Section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-6">
      <Card className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 gradient-text">Ready to Build Your AI Workforce?</h2>
        <p className="text-white/60 mb-8">
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
      </Card>
    </section>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'glass py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦞</span>
          <span className="font-bold text-lg">OpenClaw</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm">
          <a href="#cost-comparison" className="text-white/60 hover:text-white transition-colors">Cost</a>
          <a href="#models" className="text-white/60 hover:text-white transition-colors">Models</a>
          <a href="#agents" className="text-white/60 hover:text-white transition-colors">Agents</a>
          <a href="#calculator" className="text-white/60 hover:text-white transition-colors">Calculator</a>
          <a href="#setup" className="text-white/60 hover:text-white transition-colors">Setup</a>
        </div>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <CostComparisonSection />
      <ModelRoutingSection />
      <AgentsSection />
      <FeaturesSection />
      <CostCalculatorSection />
      <SetupSection />
      <ArchitectureSection />
      <CTASection />
      
      <footer className="py-8 text-center text-white/40 text-sm">
        <p>Made with 🦞 by Julylan Johnson • Verstige Technologies</p>
      </footer>
    </main>
  );
}
