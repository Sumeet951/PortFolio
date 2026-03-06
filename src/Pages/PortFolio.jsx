import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    title: "Job Portal Website",
    desc: "Full-stack job portal with recruiter dashboard, job posting, authentication, and application tracking.",
    tags: ["React", "Node.js", "MongoDB", "Redux"],
    color: "from-cyan-500 to-teal-500",
    icon: "💼",
    live: "https://job-portal-mu-ochre.vercel.app/",
    github: "https://github.com/Sumeet951/Job-Portal",
  },
  {
    title: "Car Price Prediction",
    desc: "Machine learning model predicting car prices using Random Forest with FastAPI backend.",
    tags: ["Python", "FastAPI", "React", "Machine Learning"],
    color: "from-pink-500 to-rose-500",
    icon: "🚗",
    live: "https://car-price-ui.vercel.app/",
    github: "https://github.com/Sumeet951/Car-Price-Prediction",
  },
  {
    title: "Food Delivery Time Prediction",
    desc: "ML model predicting food delivery time using Random Forest and deployed with FastAPI.",
    tags: ["Python", "FastAPI", "Scikit-Learn"],
    color: "from-amber-500 to-orange-500",
    icon: "🍔",
    live: "https://food-delivery-time-prediction.vercel.app/",
    github: "https://github.com/Sumeet951/Food-Delivery-Time-Prediction",
  },
];
const SKILLS = [
  {
    category: "Frontend",
    icon: "🎨",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    category: "Backend",
    icon: "⚙️",
    items: ["Node.js", "Python", "FastAPI", "REST APIs"]
  },
  {
    category: "Database",
    icon: "🗄️",
    items: ["MongoDB", "SQL"]
  },
  {
    category: "AI / ML",
    icon: "🤖",
    items: [
      "Machine Learning",
      "Deep Learning",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Model Deployment"
    ]
  },
  {
    category: "Generative AI",
    icon: "🧠",
    items: [
      "LLMs",
      "LangChain",
      "Prompt Engineering",
      "RAG",
      "AI Chatbots"
    ]
  },
  {
    category: "DSA",
    icon: "💻",
    items: [
      "Data Structures",
      "Algorithms",
      "Java",
      "Problem Solving"
    ]
  },
  {
    category: "Tools",
    icon: "🛠️",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Vercel",
    ]
  }
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/90 backdrop-blur-xl border-b border-white/5 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-violet-400 font-semibold text-lg tracking-wide">&lt;SumeetDev /&gt;</span>
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={`text-sm font-medium transition-colors duration-200 hover:text-white ${active === l.toLowerCase() ? "text-violet-400" : "text-gray-400"}`}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hidden md:block bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25">
          Hire Me
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-white text-sm font-medium">{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const roles = ["Full-Stack Developer", "React Specialist", "API Engineer", "Open Source Contributor"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setTyped(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setTyped(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setRoleIdx(r => (r + 1) % roles.length);
        }
      }
    }, deleting ? 50 : 90);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-950">
      {/* Background glows */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-8 text-violet-400 text-sm font-mono">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Available for opportunities
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          Hi, I'm <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Sumeet</span>
        </h1>
        <div className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6 h-10">
          <span className="text-violet-400">{typed}</span>
          <span className="animate-pulse text-violet-400">|</span>
        </div>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          I craft high-performance web applications with clean code and exceptional user experiences. Passionate about turning ideas into reality.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5">
            View My Work ↓
          </a>
          <a href="#contact" className="border border-white/10 hover:border-white/30 text-gray-300 hover:text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-white/5">
            Get In Touch
          </a>
        </div>
        {/* <div className="mt-16 flex justify-center gap-8 text-center">
          {[["3+", "Years Exp."], ["20+", "Projects"], ["15+", "Happy Clients"]].map(([num, label]) => (
            <div key={label}>
              <div className="text-3xl font-black text-white">{num}</div>
              <div className="text-gray-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-28 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="font-mono text-violet-400 text-sm mb-2">// WHO I AM</p>
            <h2 className="text-4xl font-black text-white">About Me</h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn delay={0.1}>
            <div className="relative">
              <div className="w-72 h-72 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-1">
                <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center text-8xl">
                  👨‍💻
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gray-800 border border-white/10 rounded-xl px-4 py-2 text-sm font-mono text-green-400 shadow-xl">
                &gt; status: building...
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Crafting Digital Experiences with Passion</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
I’m a passionate full-stack developer who enjoys turning ideas into real, working products. I work mainly with React, Node.js, FastAPI, and MongoDB, and I’m actively building AI-powered applications using modern generative models.              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                When I'm not coding, you'll find me contributing to open-source projects, writing technical blogs, or exploring the latest in AI and cloud technologies.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["📍", "Location", "Mumbai, India"],
                  ["🎓", "Degree", "B.Tech Information Technology"],
                  ["💼", "Experience", "Fresher"],
                  ["🌐", "Languages", "English, Hindi"],
                ].map(([icon, label, value]) => (
                  <div key={label} className="bg-gray-800/50 rounded-xl p-3 border border-white/5">
                    <div className="text-xs text-gray-500 mb-1">{icon} {label}</div>
                    <div className="text-sm text-white font-medium">{value}</div>
                  </div>
                ))}
              </div>
              <a href="#contact" className="inline-block mt-8 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25">
                Download Resume →
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="projects" className="py-28 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="font-mono text-violet-400 text-sm mb-2">// WHAT I'VE BUILT</p>
            <h2 className="text-4xl font-black text-white">Featured Projects</h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group relative bg-gray-900 border border-white/5 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {p.icon}
                    </div>
                    <div className="flex gap-3">
  
  {/* Live Demo */}
  <a
    href={p.live}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 hover:text-white transition-colors"
  >
    🌐
  </a>

  {/* GitHub */}
  <a
    href={p.github}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 hover:text-white transition-colors"
  >
    🐙
  </a>

</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <span key={t} className="text-xs font-mono bg-white/5 border border-white/10 text-gray-400 px-2.5 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div className="text-center mt-12">
            <a href="#" className="inline-flex items-center gap-2 border border-white/10 hover:border-violet-500/50 text-gray-400 hover:text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:bg-violet-500/5">
              View All Projects on GitHub
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-28 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="font-mono text-violet-400 text-sm mb-2">// WHAT I WORK WITH</p>
            <h2 className="text-4xl font-black text-white">Skills & Technologies</h2>
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((s, i) => (
            <FadeIn key={s.category} delay={i * 0.1}>
              <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-1">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-white font-bold mb-4">{s.category}</h3>
                <div className="flex flex-col gap-2">
                  {s.items.map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        {/* <FadeIn delay={0.5}>
          <div className="mt-16 bg-gray-900 border border-white/5 rounded-2xl p-8">
            <h3 className="text-white font-bold text-center mb-8">Proficiency Overview</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                ["React / Next.js", 92],
                ["Node.js / Python", 85],
                ["TypeScript", 88],
                ["Cloud / DevOps", 75],
                ["UI/UX Design", 70],
                ["Databases", 82],
              ].map(([skill, pct]) => (
                <div key={skill}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-medium">{skill}</span>
                    <span className="text-violet-400 font-mono">{pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                      style={{ width: `${pct}%`, transition: "width 1s ease" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn> */}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };
  return (
    <section id="contact" className="py-28 bg-gray-950">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="font-mono text-violet-400 text-sm mb-2">// LET'S TALK</p>
            <h2 className="text-4xl font-black text-white">Get In Touch</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Have a project in mind? I'd love to hear about it. Let's build something amazing together.</p>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-5 gap-10">
          <FadeIn delay={0.1} className="md:col-span-2">
            <div className="flex flex-col gap-6 h-full justify-center">
              {[
                ["📧", "Email", "sg297979@gmail.com"],
                ["📍", "Location", "Mumbai, India"],
                // ["💬", "Discord", "@alexdev#0001"],
                ["🐙", "GitHub", "github.com/Sumeet951"],
              ].map(([icon, label, val]) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div className="w-11 h-11 bg-gray-800 border border-white/5 rounded-xl flex items-center justify-center text-xl group-hover:border-violet-500/50 transition-colors">{icon}</div>
                  <div>
                    <div className="text-xs text-gray-500">{label}</div>
                    <div className="text-sm text-gray-300 font-medium">{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="md:col-span-3">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center bg-gray-900 border border-white/5 rounded-2xl p-10">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">Thanks for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className="bg-gray-900 border border-white/5 rounded-2xl p-8">
                <div className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1.5">Your Name</label>
                      <input name="name" value={form.name} onChange={handle}
                        className="w-full bg-gray-800 border border-white/5 focus:border-violet-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-gray-600"
                        placeholder="John Doe"/>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium block mb-1.5">Email Address</label>
                      <input name="email" value={form.email} onChange={handle}
                        className="w-full bg-gray-800 border border-white/5 focus:border-violet-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder-gray-600"
                        placeholder="john@example.com"/>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-medium block mb-1.5">Message</label>
                    <textarea name="message" value={form.message} onChange={handle} rows={5}
                      className="w-full bg-gray-800 border border-white/5 focus:border-violet-500/50 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors resize-none placeholder-gray-600"
                      placeholder="Tell me about your project..."/>
                  </div>
                  <button onClick={submit}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5">
                    Send Message →
                  </button>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-violet-400 text-sm">&lt;SumeetDev /&gt;</span>
        <p className="text-gray-600 text-sm">© 2026 Sumeet Dev</p>
        <div className="flex gap-4">
          {["GitHub", "LinkedIn", "Twitter"].map(s => (
            <a key={s} href="#" className="text-gray-600 hover:text-white text-sm transition-colors">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    document.querySelectorAll("section[id]").forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen">
      <Navbar active={active} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}