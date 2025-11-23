import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react";
import { APP_LOGO } from "@/const";
import { useEffect, useState } from "react";
import InteractivePlaything from "@/components/InteractivePlaything";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Trigger text animation after component mounts
    setTimeout(() => setTextVisible(true), 300);

    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "research", "education", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl font-bold text-gradient glow"
            >
              SH
            </button>
            
            <div className="hidden md:flex items-center gap-6">
              {["home", "about", "skills", "projects", "education", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-primary ${
                    activeSection === section ? "text-primary font-semibold" : "text-foreground/70"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
  id="home"
  className="min-h-screen flex items-center justify-center relative pt-20"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
  variants={fadeInUp}
>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className={`transition-all duration-1000 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient glow">
                Shri Harish<br />Saravanan
              </h1>
              <p className="text-lg md:text-xl text-cyan-400 mb-6 font-light">
                Software Development • AI Systems • Backend Engineering • Full-Stack Development
              </p>
              <p className="text-base text-foreground/80 mb-8 leading-relaxed">
                Graduate student in Computer Engineering at Texas A&M University with strong experience in
                software development, backend engineering, and system-level optimization. Currently exploring
                efficient LLM execution, distributed computing, and optimizing agentic LLM throughput.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="/resume.pdf" download className="inline-block">
                  <Button size="lg" className="group hover:scale-105 transition-transform">
                    <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                    Download Resume
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.location.href = 'mailto:shriharish@tamu.edu'}
                  className="group hover:scale-105 transition-transform"
                >
                  Contact Me
                  <Mail className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="flex gap-6 mt-8">
                <a href="https://github.com/shriharish1310/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors hover:scale-110 transform">
                  <Github className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/in/shriharishs/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-primary transition-colors hover:scale-110 transform">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="mailto:shriharish@tamu.edu" className="text-foreground/60 hover:text-primary transition-colors hover:scale-110 transform">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className={`flex justify-center transition-all duration-1000 delay-300 ${textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-full border-4 border-primary/30 bg-card/50 backdrop-blur-sm flex items-center justify-center card-glow overflow-hidden">
                  <img src="/profile.jpg" alt="Shri Harish Saravanan" className="w-full h-full object-cover" />
                </div>
                {/* Animated ring */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: '3s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
  id="about"
  className="min-h-screen flex items-center justify-center py-20 relative"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
  variants={fadeInUp}
>
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-5xl font-bold mb-12 text-gradient glow text-center">ABOUT &#123;</h2>
          <div className="space-y-6 text-lg text-foreground/90 leading-relaxed">
            <p>
              I am a graduate student in Computer Engineering at Texas A&M University with a strong focus on
              software engineering, full-stack development, intelligent systems, and backend performance optimization.
            </p>
            <p>
              With experience in Java, C++, Python, and JavaScript, I focus on building efficient, reliable, and
              optimized software systems. My background in software engineering, system-level design, and AI execution
              optimization helps me understand how applications interact with real-world architectures and performance
              constraints.
            </p>
            <p>
              I have worked on LLM execution optimizers (KV-cache based), automation frameworks and multi-user testing
              infrastructures. I enjoy solving complex problems where data handling, performance engineering, and system
              optimization intersect.
            </p>

          </div>
          <p className="text-5xl font-bold mt-12 text-gradient glow text-center">&#125;</p>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
  id="skills"
  className="min-h-screen flex items-center justify-center py-20 relative"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
  variants={fadeInUp}
>
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-5xl font-bold mb-12 text-gradient glow text-center">SKILLS &#123;</h2>
          <p className="text-lg text-foreground/90 max-w-4xl mx-auto mb-12 leading-relaxed text-center">
            I approach engineering problems by breaking them into modular, logical steps whether it's backend
            architecture, system optimization, or data flow design. I value maintainability, clarity, and practical
            execution in every solution I build.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Languages & Frameworks", 
                skills: ["Java", "Python", "C/C++", "JavaScript", "TypeScript", "React", "Node.js", "HTML/CSS", "Bash"]
              },
              { 
                title: "AI/ML & Data Science", 
                skills: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Hugging Face", "Transformers", "Pandas", "NumPy", "OpenCV"]
              },
              { 
                title: "Hardware Design", 
                skills: ["Verilog", "SystemVerilog", "UVM", "MATLAB", "FPGA", "RTL Design", "Xilinx Vivado"]
              },
              { 
                title: "Systems & Architecture", 
                skills: ["Computer Architecture", "VLSI", "Parallel Computing", "Distributed Systems", "Performance Optimization", "Linux/Unix"]
              }
            ].map((category, idx) => (
              <Card
                key={idx}
                className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:card-glow hover:scale-105 transform"
              >
                <h3 className="text-xl font-bold mb-4 text-primary">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/30 hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <p className="text-5xl font-bold mt-12 text-gradient glow text-center">&#125;</p>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
  id="projects"
  className="min-h-screen flex items-center justify-center py-20 relative"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
  variants={fadeInUp}
>
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-5xl font-bold mb-12 text-gradient glow text-center">PROJECTS &#123;</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "DeepMIMO-RIS",
                subtitle: "Deep Learning Enhanced RIS Configuration for Urban Scenario",
                description: "Designed a Reconfigurable Intelligent Surface (RIS) system using AlexNet-based deep learning to enhance wireless communication. Implemented sparse active sensors for efficient channel estimation, reducing training data requirements by 86% while achieving optimal data rates.",
                tech: ["Python", "TensorFlow", "MATLAB", "Deep Learning", "Wireless Communication"]
              },
              {
                title: "V2V DeepMIMO",
                subtitle: "Communication Simulator",
                description: "Vehicle-to-vehicle RF modeling using DeepMIMO and MATLAB. Implemented deep learning-based prediction models for realistic V2V communication scenarios.",
                tech: ["MATLAB", "Python", "Deep Learning", "RF Modeling", "V2V Communication"]
              },
              {
                title: "Agent-Based Execution Scheduler",
                subtitle: "LLM Workflow Execution Optimization",
                description: "Designed a simulation that models how an intelligent agent schedules different subtasks (prompt routing, summary, reasoning, search) based on cost, latency, and dependency graph. Shows how agentic AI optimizes execution efficiency.",
                tech: ["Python", "LLM", "Optimization", "Graph Theory", "AI Agents"]
              },
              {
                title: "KV-Cache Execution Visualizer",
                subtitle: "LLM Performance Analysis Dashboard",
                description: "Created a visual simulation that demonstrates how KV cache reuse affects inference latency across transformer layers. Supports multiple scenarios with visual comparison of cache hit/miss and impact on latency.",
                tech: ["Python", "PyTorch", "Transformers", "Visualization", "Performance Analysis"]
              }
            ].map((project, idx) => (
              <Card
                key={idx}
                className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:card-glow hover:scale-105 transform group"
              >
                <h3 className="text-2xl font-bold mb-2 text-primary group-hover:glow transition-all">{project.title}</h3>
                <p className="text-sm text-cyan-400 mb-4 font-semibold">{project.subtitle}</p>
                <p className="text-foreground/80 leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-2 py-1 bg-secondary/50 text-foreground/70 rounded text-xs border border-border hover:border-primary/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <p className="text-5xl font-bold mt-12 text-gradient glow text-center">&#125;</p>
        </div>
      </motion.section>

      {/* Research Interests Section */}
      <motion.section id="research" className="min-h-screen flex items-center justify-center py-20 relative" initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
  variants={fadeInUp}>
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-5xl font-bold mb-12 text-gradient glow text-center">RESEARCH INTERESTS &#123;</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "KV-Cache Optimization for LLM Inference",
              "Agentic LLM Execution and Reasoning Graph Optimization",
              "Hardware-Aware AI Acceleration (CPU/GPU Co-design)",
              "SystemVerilog/UVM-Based Functional Verification",
              "Distributed and Parallel Computing",
              "Memory Systems and Microarchitectural Design"
            ].map((interest, idx) => (
              <Card key={idx} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:card-glow hover:scale-105 transform">
                <p className="text-foreground/90 text-center">{interest}</p>
              </Card>
            ))}
          </div>
          <p className="text-5xl font-bold mt-12 text-gradient glow text-center">&#125;</p>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section id="education" className="min-h-screen flex items-center justify-center py-20 relative" initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
  variants={fadeInUp}>
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-5xl font-bold mb-12 text-gradient glow text-center">EDUCATION &#123;</h2>
          
          <div className="space-y-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:card-glow">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Master of Science in Computer Engineering (CECN)</h3>
                  <p className="text-lg text-foreground/90">Texas A&M University, College Station, USA</p>
                </div>
                <span className="text-cyan-400 font-semibold whitespace-nowrap">Aug 2025 – May 2027</span>
              </div>
              <p className="text-foreground/80">
                <span className="font-semibold">Concentration:</span> Frontend Digital Design, VLSI, Hardware Verification, Computer Architecture
              </p>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:card-glow">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Bachelor of Engineering in Electronics and Communication Engineering</h3>
                  <p className="text-lg text-foreground/90">Madras Institute of Technology, Anna University, India</p>
                </div>
                <span className="text-cyan-400 font-semibold whitespace-nowrap">Sep 2020 – May 2024</span>
              </div>
            </Card>
          </div>
          <p className="text-5xl font-bold mt-12 text-gradient glow text-center">&#125;</p>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section id="contact" className="min-h-screen flex items-center justify-center py-20 relative" initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.2 }}
  variants={fadeInUp}>
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-5xl font-bold mb-12 text-gradient glow text-center">CONTACT &#123;</h2>
          
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6 text-primary">Let's Connect</h3>
            <p className="text-lg text-foreground/90 mb-12 leading-relaxed">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
              Feel free to reach out!
            </p>
            
            <div className="flex gap-6 justify-center">
              <a
                href="https://github.com/shriharish1310/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg hover:border-primary/50 hover:card-glow transition-all hover:scale-110 transform"
              >
                <Github className="h-12 w-12 text-primary" />
              </a>
              <a
                href="https://www.linkedin.com/in/shriharishs/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg hover:border-primary/50 hover:card-glow transition-all hover:scale-110 transform"
              >
                <Linkedin className="h-12 w-12 text-primary" />
              </a>
              <a
                href="mailto:shriharish@tamu.edu"
                className="p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg hover:border-primary/50 hover:card-glow transition-all hover:scale-110 transform"
              >
                <Mail className="h-12 w-12 text-primary" />
              </a>
            </div>
          </div>
          <p className="text-5xl font-bold mt-12 text-gradient glow text-center">&#125;</p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 text-center text-foreground/60">
          <p>© 2024 Shri Harish Saravanan.</p>
        </div>
      </footer>
    </div>
  );
}
