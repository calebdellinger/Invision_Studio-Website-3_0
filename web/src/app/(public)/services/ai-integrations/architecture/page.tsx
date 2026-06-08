import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Architecture Components | Invision Creative",
  description: "A simple guide to the technology powering our AI deployments.",
};

const terms = [
  {
    slug: "local-inference-nodes",
    title: "Local Inference Nodes",
    analogy: "Like a brilliant employee working in a locked, secure room.",
    description: "An 'inference node' is simply the brain of the AI where it does its thinking. When we say it is 'local', it means this brain physically lives on a computer inside your office rather than in a distant data center. Because it's local, your proprietary data and estimating formulas never leave your building, offering the highest level of security.",
  },
  {
    slug: "secure-api-gatekeepers",
    title: "Secure API Gatekeepers",
    analogy: "Like a corporate receptionist screening all incoming and outgoing mail.",
    description: "Sometimes your private AI needs to ask the internet a question (like checking current material prices). A 'gatekeeper' sits between your private network and the internet. It carefully reviews the question, strips out any confidential customer names or project details, and safely fetches the public information without leaking your private data.",
  },
  {
    slug: "human-validation",
    title: "Human-in-the-Loop Validation",
    analogy: "Like an ultra-fast assistant who drafts the emails, but asks for your signature before hitting send.",
    description: "AI is incredibly fast, but human judgment is still critical. This architecture ensures that the AI does 95% of the heavy lifting—like analyzing blueprints or drafting proposals—but it places the final result in a 'draft' folder. It pauses and waits for a human manager to review and click 'approve' before taking any permanent action.",
  },
  {
    slug: "cloud-orchestration",
    title: "Cloud Orchestration",
    analogy: "Like a master air-traffic controller coordinating a fleet of planes.",
    description: "Your business uses many different tools—a CRM, email, accounting software, and calendars. 'Orchestration' is the central conductor that connects all these separate tools together, ensuring that when the AI finishes a task in one system, the results automatically flow perfectly into the next system without any manual data entry.",
  },
  {
    slug: "enterprise-saas",
    title: "Enterprise SaaS (Software as a Service)",
    analogy: "Like renting a fully-furnished suite in a highly secure premium skyscraper.",
    description: "Instead of buying servers and building everything from scratch, we leverage top-tier, managed cloud platforms. This means you get military-grade security, instant scalability, and zero hardware maintenance headaches—all managed by massive tech providers who keep the systems running 24/7.",
  },
  {
    slug: "workflow-hosting",
    title: "Make & n8n Hosting",
    analogy: "The digital conveyor belts of your business.",
    description: "Make and n8n are industry-leading platforms used to build 'workflows.' If your business is a factory, these platforms are the conveyor belts that automatically move data from the AI to your CRM, to your email, and to your billing software exactly when they are supposed to.",
  },
  {
    slug: "secure-apis",
    title: "Secure APIs",
    analogy: "Like a secure drive-through window between two different businesses.",
    description: "An API (Application Programming Interface) is simply a way for two different pieces of software to talk to each other. 'Secure APIs' are highly encrypted connections that allow our AI to pass information directly into your existing software stack safely, without ever exposing the inner workings of either system.",
  },
  {
    slug: "local-hardware",
    title: "Enterprise Local Hardware (Mac Studio M3 Max)",
    analogy: "The high-performance physical engine sitting securely in your IT closet.",
    description: "To run advanced AI privately, you need serious computing horsepower. We specify and deploy dedicated, enterprise-grade hardware—like Apple's Mac Studio series—which provides the massive graphical processing power needed to run custom AI models entirely on your own premises.",
  },
  {
    slug: "local-llms",
    title: "Local LLMs (Llama 3 & Qwen)",
    analogy: "Owning the AI's brain rather than renting it.",
    description: "An LLM (Large Language Model) is the software brain that understands and generates text. Normally, businesses rent this brain from companies like OpenAI (ChatGPT). By using 'Local LLMs', we install a highly capable brain directly onto your own hardware. It doesn't send your prompts to the cloud; it thinks about them right on your desk.",
  },
  {
    slug: "air-gapped",
    title: "Air-Gapped Capable",
    analogy: "Like an island with no bridge to the mainland.",
    description: "For extreme security environments, an 'air-gapped' computer is physically disconnected from the internet and any unsecured networks. Because there is no digital bridge connecting it to the outside world, it is mathematically impossible for external hackers to access the system remotely.",
  },
  {
    slug: "zero-leaks",
    title: "Zero Public API Leaks",
    analogy: "Guaranteeing your secret recipes never accidentally become public knowledge.",
    description: "When you use public AI tools, your prompts and data are often absorbed by the tech companies to train their future public models. Our architectures are designed to strictly contain your data. We guarantee that your proprietary estimating formulas, client lists, and bidding strategies will never leak into public AI training data.",
  }
];

export default function ArchitectureComponentsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <Link 
            href="/services/ai-integrations" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-creative)] hover:underline mb-8"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            Back to AI Architectures
          </Link>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)] sm:text-5xl">
            Architecture Terminology
          </h1>
          <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
            We believe technology shouldn't be a black box. This guide breaks down our complex enterprise AI deployment architectures into simple, everyday business concepts.
          </p>
        </div>

        {/* Dictionary List */}
        <div className="space-y-16">
          {terms.map((term) => (
            <div 
              key={term.slug} 
              id={term.slug} 
              className="scroll-mt-32 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-200/50"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 [font-family:var(--font-fraunces)]">
                {term.title}
              </h2>
              
              <div className="mt-4 flex items-start gap-3 rounded-xl bg-[color-mix(in_srgb,var(--brand-creative)_8%,transparent)] p-4 text-[var(--brand-creative)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 w-5 h-5 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.496 1.509 1.333 1.509 2.316V18" />
                </svg>
                <p className="text-sm font-semibold tracking-wide uppercase leading-relaxed">
                  {term.analogy}
                </p>
              </div>

              <div className="mt-6 border-t border-zinc-100 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-600 mb-3">
                  Why it matters
                </h3>
                <p className="text-base leading-relaxed text-zinc-700">
                  {term.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
