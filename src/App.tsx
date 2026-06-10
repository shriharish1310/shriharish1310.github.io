import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Download,
  GraduationCap,
  HelpCircle,
  Mail,
  Menu,
  Pause,
  Play,
  Shuffle,
  X,
} from "lucide-react";
import {
  learningItems,
  projects,
  resumePath,
  rotatingPhrases,
  skillGroups,
  timelineItems,
} from "./data";
import type { ParticleMode, Project, TimelineItem } from "./types";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life?: number;
  orbit?: number;
};

const modes: ParticleMode[] = ["calm", "chaos", "constellation"];

function BrandIcon({ label }: { label: string }) {
  return <span className="brand-icon" aria-hidden="true">{label}</span>;
}

function Section({
  id,
  title,
  children,
  note,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <section id={id} className="section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
      >
        <p className="section-note">{note ?? "workspace"}</p>
        <h2 className="section-title">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}

function ParticleCanvas({
  mode,
  paused,
  burstSignal,
  onMode,
}: {
  mode: ParticleMode;
  paused: boolean;
  burstSignal: number;
  onMode: (mode: ParticleMode) => void;
}) {
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvasElement = document.getElementById("particle-canvas") as HTMLCanvasElement | null;
    if (!canvasElement) return;
    const context = canvasElement.getContext("2d");
    if (!context) return;
    const canvas: HTMLCanvasElement = canvasElement;
    const ctx: CanvasRenderingContext2D = context;

    let frame = 0;
    let width = 0;
    let height = 0;
    let raf = 0;
    let lastTime = performance.now();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999, active: false };
    const palette = ["#8bd3ff", "#c8a2ff", "#ffb7d5", "#f6d365", "#9ee6b8"];
    const particles: Particle[] = [];
    const bursts: Particle[] = [];

    function particleCount() {
      const mobile = window.innerWidth < 700;
      if (reduced) return mobile ? 28 : 42;
      return mobile ? 58 : 120;
    }

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      while (particles.length < particleCount()) particles.push(makeParticle());
      particles.length = particleCount();
    }

    function makeParticle(): Particle {
      const speed = mode === "chaos" ? 1.2 : mode === "calm" ? 0.32 : 0.55;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: 1.2 + Math.random() * 2.2,
        color: palette[Math.floor(Math.random() * palette.length)],
        orbit: Math.random() * Math.PI * 2,
      };
    }

    function addBurst(x: number, y: number) {
      for (let i = 0; i < 34; i += 1) {
        const angle = (Math.PI * 2 * i) / 34;
        const speed = 1.5 + Math.random() * 3.1;
        bursts.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.4 + Math.random() * 2.8,
          color: palette[i % palette.length],
          life: 1,
        });
      }
    }

    function drawParticle(p: Particle, alpha = 1) {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    function stepParticle(p: Particle, delta: number) {
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const dist = Math.hypot(dx, dy);
      const radius = mode === "chaos" ? 190 : 135;
      if (pointer.active && dist < radius) {
        const force = (1 - dist / radius) * (mode === "chaos" ? 0.16 : 0.055);
        p.vx += (dx / Math.max(dist, 1)) * force * delta;
        p.vy += (dy / Math.max(dist, 1)) * force * delta;
      }

      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.vx *= Math.pow(mode === "chaos" ? 0.992 : 0.985, delta);
      p.vy *= Math.pow(mode === "chaos" ? 0.992 : 0.985, delta);
      p.orbit = (p.orbit ?? 0) + 0.02 * delta;

      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;
    }

    function connect() {
      const max = mode === "constellation" ? 128 : 84;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < max) {
            ctx.globalAlpha = (1 - dist / max) * (mode === "constellation" ? 0.34 : 0.14);
            ctx.strokeStyle = "#9edfff";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    }

    function render(time: number) {
      raf = requestAnimationFrame(render);
      if (pausedRef.current || document.hidden) {
        lastTime = time;
        return;
      }
      const delta = Math.min(Math.max((time - lastTime) / 16.67, 0.5), 2);
      lastTime = time;
      frame += delta;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(7, 10, 25, 0.26)";
      ctx.fillRect(0, 0, width, height);
      particles.forEach((p) => {
        stepParticle(p, delta);
        drawParticle(p, 0.86);
      });
      if (mode === "constellation" || mode === "calm") connect();
      for (let i = bursts.length - 1; i >= 0; i -= 1) {
        const b = bursts[i];
        b.x += b.vx * delta;
        b.y += b.vy * delta;
        b.vx *= Math.pow(0.965, delta);
        b.vy *= Math.pow(0.965, delta);
        b.life = (b.life ?? 1) - 0.018 * delta;
        drawParticle(b, Math.max(b.life ?? 0, 0));
        if ((b.life ?? 0) <= 0) bursts.splice(i, 1);
      }
    }

    function pointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }

    function click(event: PointerEvent) {
      pointerMove(event);
      addBurst(pointer.x, pointer.y);
    }

    function leave() {
      pointer.active = false;
    }

    resize();
    canvas.addEventListener("pointermove", pointerMove);
    canvas.addEventListener("pointerdown", click);
    canvas.addEventListener("pointerleave", leave);
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerdown", click);
      canvas.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", resize);
    };
  }, [mode]);

  useEffect(() => {
    const canvas = document.getElementById("particle-canvas") as HTMLCanvasElement | null;
    if (!canvas || !burstSignal) return;
    canvas.dispatchEvent(new PointerEvent("pointerdown", { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }));
  }, [burstSignal]);

  return (
    <div className="particle-shell" aria-hidden="false">
      <canvas id="particle-canvas" className="particle-canvas" />
      <div className="particle-panel">
        {modes.map((item) => (
          <button key={item} className={mode === item ? "active" : ""} onClick={() => onMode(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function Layout({
  children,
  devMode,
}: {
  children: React.ReactNode;
  devMode: boolean;
}) {
  const [open, setOpen] = useState(false);
  const links = ["about", "work", "projects", "skills", "learning", "contact"];
  return (
    <div className={devMode ? "dev-mode" : ""}>
      <header className="site-header">
        <nav className="desktop-nav" aria-label="main navigation">
          {links.map((link) => (
            <a key={link} href={`#${link}`}>{link}</a>
          ))}
        </nav>
        <button className="round-btn mobile-only" onClick={() => setOpen((v) => !v)} aria-label="open menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav className="mobile-nav" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>
            {links.map((link) => (
              <a key={link} href={`#${link}`} onClick={() => setOpen(false)}>{link}</a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}

function Hero({
  mode,
  paused,
  burstSignal,
  onMode,
  onPause,
}: {
  mode: ParticleMode;
  paused: boolean;
  burstSignal: number;
  onMode: (mode: ParticleMode) => void;
  onPause: () => void;
}) {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setPhraseIndex((i) => (i + 1) % rotatingPhrases.length), 1800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero">
      <ParticleCanvas mode={mode} paused={paused} burstSignal={burstSignal} onMode={onMode} />
      <div className="hero-inner">
        <div className="hero-content">
          <motion.p className="tiny-note" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            click around, the particles respond
          </motion.p>
          <h1 className="typewriter-name">hi, i&apos;m shri harish.</h1>
          <motion.p className="hero-lead" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
            I build backend systems, data tools, and ML infrastructure.
          </motion.p>
          <motion.p className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.75 }}>
            I&apos;m an MCS student at Texas A&M building reliable backend systems, distributed services, ML pipelines, and interactive tools that make complex systems easier to understand.
          </motion.p>
          <motion.div className="rotating-line" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
            currently orbiting: <AnimatePresence mode="wait"><motion.span key={phraseIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{rotatingPhrases[phraseIndex]}</motion.span></AnimatePresence>
          </motion.div>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.05 }}>
            <a className="primary-btn" href="#projects">explore my work <ArrowRight size={18} /></a>
            <a className="soft-btn" href={resumePath}><Download size={18} /> resume</a>
            <a className="soft-btn" href="mailto:shriharish12345@gmail.com"><Mail size={18} /> say hi</a>
          </motion.div>
          <div className="keyboard-row">
            <button onClick={onPause}>{paused ? <Play size={15} /> : <Pause size={15} />} p pauses particles</button>
            <button onClick={() => onMode(modes[(modes.indexOf(mode) + 1) % modes.length])}>m changes mode</button>
          </div>
        </div>
        <div className="hero-photo-card">
          <img src="/profile.webp" alt="Shri Harish" />
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    ["Name", "Shri Harish"],
    ["Focus", "Backend + ML Infrastructure"],
    ["Location", "College Station, TX"],
    ["Currently", "MCS at Texas A&M"],
    ["Core stack", "Java, Python, Spring Boot, FastAPI, Kafka, Docker, AWS"],
    ["Exploring", "Distributed systems, ML infrastructure, data platforms, systems design"],
  ];
  return (
    <Section id="about" title="about" note="small story">
      <div className="about-grid">
        <motion.div className="story-card" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p>I&apos;m Shri Harish Saravanan, currently pursuing my Master of Computer Science at Texas A&M University. I started in electronics and communication engineering, but over time I got pulled deeper into software because I liked how quickly ideas could become real systems.</p>
          <p>Most of my work sits between backend engineering and ML infrastructure. I like building APIs, distributed services, data pipelines, model-serving systems, and tools that make software more reliable and easier to operate.</p>
          <p>I also enjoy creative coding, particles, and interactive interfaces that make technical systems feel easier to explore, debug, and understand.</p>
          <p>I&apos;m especially interested in systems that are fast, fault-tolerant, and useful. The kind of software that quietly handles thousands of requests, moves data cleanly, recovers from failure, and makes complex workflows feel simple.</p>
        </motion.div>
        <motion.div className="profile-card" initial={{ opacity: 0, rotate: -1, y: 18 }} whileInView={{ opacity: 1, rotate: 0, y: 0 }} viewport={{ once: true }}>
          <div className="profile-top">
            <div className="avatar-dot">SH</div>
            <div><p className="muted">quick profile</p><h3>Shri Harish</h3></div>
          </div>
          {stats.map(([k, v]) => (
            <div className="stat-line" key={k}><span>{k}</span><strong>{v}</strong></div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

function Timeline() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="work" title="work & education" note="timeline">
      <div className="timeline-list">
        {timelineItems.map((item, index) => (
          <TimelineRow key={`${item.title}-${item.subtitle}`} item={item} index={index} open={open === index} onOpen={() => setOpen(open === index ? -1 : index)} />
        ))}
      </div>
    </Section>
  );
}

function TimelineRow({ item, index, open, onOpen }: { item: TimelineItem; index: number; open: boolean; onOpen: () => void }) {
  const Icon = item.kind === "work" ? Briefcase : GraduationCap;
  return (
    <motion.article className="timeline-row" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
      <button className="timeline-button" onClick={onOpen}>
        <span className="timeline-icon"><Icon size={18} /></span>
        <span className="timeline-main">
          <strong>{item.title}</strong>
          <small>{item.subtitle} - {item.dates}</small>
        </span>
        <span className="timeline-place">{item.place}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="timeline-details" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            {item.meta && <p className="chip">{item.meta}</p>}
            {item.details.map((detail) => <p key={detail}>{detail}</p>)}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <Section id="projects" title="things i've built" note="systems i've built">
      <div className="project-grid">
        {projects.map((project, index) => (
          <motion.button
            className="project-card"
            key={project.title}
            onClick={() => setSelected(project)}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 4) * 0.04 }}
            whileHover={{ y: -8, rotate: index % 2 ? 0.45 : -0.45 }}
          >
            <span className="project-number">0{index + 1}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-row">{project.tech.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}</div>
            <div className="metric-list">{project.metrics.slice(0, 3).map((metric) => <small key={metric}>{metric}</small>)}</div>
            <em>{project.learned}</em>
          </motion.button>
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.article className="project-modal" initial={{ opacity: 0, y: 34, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} onMouseDown={(e) => e.stopPropagation()}>
            <button className="round-btn close-btn" onClick={onClose} aria-label="close project"><X size={18} /></button>
            <p className="section-note">opened experiment</p>
            <h3>{project.title}</h3>
            <p className="modal-description">{project.description}</p>
            <div className="modal-grid">
              <div><h4>problem</h4><p>{project.problem}</p></div>
              <div><h4>metrics</h4>{project.metrics.map((metric) => <p className="chip" key={metric}>{metric}</p>)}</div>
              <div><h4>what i built</h4>{project.built.map((item) => <p className="dot-line" key={item}>{item}</p>)}</div>
              <div><h4>why it was interesting</h4><p>{project.learned}</p><p className="fun-note">{project.fun}</p></div>
            </div>
            <div className="architecture">{project.architecture.map((node) => <span key={node}>{node}</span>)}</div>
            <div className="tech-row">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SkillsConstellation() {
  const [category, setCategory] = useState(skillGroups[0].name);
  const [skill, setSkill] = useState(skillGroups[0].skills[0]);
  const active = skillGroups.find((group) => group.name === category) ?? skillGroups[0];
  const related = useMemo(() => projects.filter((project) => project.tech.some((tech) => tech.toLowerCase().includes(skill.toLowerCase().split(" ")[0]))).slice(0, 3), [skill]);

  function randomSkill() {
    const group = skillGroups[Math.floor(Math.random() * skillGroups.length)];
    const item = group.skills[Math.floor(Math.random() * group.skills.length)];
    setCategory(group.name);
    setSkill(item);
  }

  return (
    <Section id="skills" title="skills constellation" note="click a category, poke a node">
      <div className="skills-layout">
        <div>
          <div className="category-row">
            {skillGroups.map((group) => (
              <button key={group.name} className={category === group.name ? "active" : ""} onClick={() => { setCategory(group.name); setSkill(group.skills[0]); }}>
                {group.name}
              </button>
            ))}
          </div>
          <motion.div className="constellation" layout>
            {active.skills.map((item, index) => (
              <motion.button
                key={item}
                className={skill === item ? "skill-star active" : "skill-star"}
                onClick={() => setSkill(item)}
                animate={{ y: [0, index % 2 ? -8 : 8, 0] }}
                transition={{ duration: 3 + (index % 4), repeat: Infinity, ease: "easeInOut" }}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        </div>
        <aside className="skill-panel">
          <button className="soft-btn" onClick={randomSkill}><Shuffle size={16} /> random skill</button>
          <h3>{skill}</h3>
          <p>shows up around:</p>
          {(related.length ? related : projects.slice(0, 3)).map((project) => <span className="chip" key={project.title}>{project.title}</span>)}
        </aside>
      </div>
    </Section>
  );
}

function LearningLog() {
  return (
    <Section id="learning" title="things i'm learning / messing with" note="currently exploring">
      <div className="learning-grid">
        {learningItems.map(([item, status], index) => (
          <motion.div className="learning-card" key={item} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 5) * 0.04 }}>
            <span>{status}</span>
            <p>{item}</p>
          </motion.div>
        ))}
      </div>
      <div className="building-card">
        <Code2 size={20} />
        <div>
          <h3>currently building</h3>
          <p>Backend systems projects - ML infrastructure experiments - Distributed systems deep dives - Docker and Kubernetes deployment practice</p>
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="say hi" note="contact">
      <div className="contact-card">
        <p>Want to talk about backend systems, ML infrastructure, distributed systems, or creative engineering experiments? I&apos;m always happy to connect.</p>
        <div className="contact-actions">
          <a className="primary-btn" href="mailto:shriharish12345@gmail.com"><Mail size={18} /> Email</a>
          <a className="soft-btn" href="https://linkedin.com/in/shriharishs"><BrandIcon label="IN" /> LinkedIn</a>
          <a className="soft-btn" href="https://github.com/shriharish1310"><BrandIcon label="GH" /> GitHub</a>
          <a className="soft-btn" href={resumePath}><Download size={18} /> Resume</a>
        </div>
        <p className="muted">College Station, TX - 657-558-1379 - shriharish1310.github.io</p>
      </div>
    </Section>
  );
}

function KeyboardShortcuts({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="shortcuts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.div className="shortcuts-card" initial={{ y: 20 }} animate={{ y: 0 }} onMouseDown={(event) => event.stopPropagation()}>
            <button className="round-btn close-btn" onClick={onClose}><X size={18} /></button>
            <HelpCircle size={22} />
            <h3>keyboard shortcuts</h3>
            <p><kbd>p</kbd> pause particles</p>
            <p><kbd>m</kbd> cycle particle mode</p>
            <p><kbd>a</kbd> particle burst</p>
            <p><kbd>d</kbd> developer terminal mode</p>
            <p><kbd>?</kbd> this tiny menu</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [mode, setMode] = useState<ParticleMode>("constellation");
  const [paused, setPaused] = useState(false);
  const [burstSignal, setBurstSignal] = useState(0);
  const [devMode, setDevMode] = useState(false);
  const [shortcuts, setShortcuts] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const key = event.key.toLowerCase();
      if (key === "p") setPaused((value) => !value);
      if (key === "m") setMode((value) => modes[(modes.indexOf(value) + 1) % modes.length]);
      if (key === "a") {
        setBurstSignal((value) => value + 1);
      }
      if (key === "d") setDevMode((value) => !value);
      if (event.key === "?") setShortcuts(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <Layout devMode={devMode}>
      <Hero mode={mode} paused={paused} burstSignal={burstSignal} onMode={setMode} onPause={() => setPaused((value) => !value)} />
      <About />
      <Timeline />
      <Projects />
      <SkillsConstellation />
      <LearningLog />
      <Contact />
      <KeyboardShortcuts open={shortcuts} onClose={() => setShortcuts(false)} />
      <footer>built with react, canvas particles, backend brainrot, and probably too much coffee.</footer>
    </Layout>
  );
}
