import AnimatedBackground from "./AnimatedBackground.jsx";
import { Typewriter } from "react-simple-typewriter";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

export default function App() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [showAll, setShowAll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [status, setStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xvzbndvj", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("✅ Message sent successfully! I'll get back to you soon.");
        form.reset();
      } else {
        setStatus("❌ Something went wrong. Please try again.");
      }
    } catch {
      setStatus("❌ Network error. Please try again later.");
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    // run once to set initial state (in case page opens scrolled)
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Smooth scroll detection for active link highlight
    const handleScroll = () => {
      const sections = [
        "about",
        "experience",
        "education",
        "skills",
        "projects",
        "contact",
      ];
      const scrollPos = window.scrollY + 150;
      for (const id of sections) {
        const section = document.getElementById(id);
        if (
          section &&
          section.offsetTop <= scrollPos &&
          section.offsetTop + section.offsetHeight > scrollPos
        ) {
          setActiveSection(id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global smooth scroll
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        dark ? "bg-black/10 text-white" : "bg-white/10 text-black"
      }`}
    >
      <AnimatedBackground darkMode={dark} />

      {/* --- NAVBAR --- */}
      <header
        className={`fixed w-full top-0 left-0 z-50 transition-colors duration-500 backdrop-blur-lg border-b ${
          dark ? "text-white" : "text-black"
        } ${
          scrolled ? (dark ? "bg-black/40" : "bg-white/60") : "bg-transparent"
        } ${dark ? "border-gray-800" : "border-gray-300"}`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-tight">
            <span className="text-blue-500">Rupak</span> Ganvir
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-lg items-center">
            {[
              "about",
              "experience",
              "education",
              "skills",
              "projects",
              "contact",
            ].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`capitalize transition-colors ${
                  activeSection === section
                    ? "text-blue-400 font-semibold"
                    : dark
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-gray-700 hover:text-blue-500"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}

            {/* Resume Button */}
            <a
              href="/public/resume/Rupak_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-4 px-4 py-2 rounded-lg font-semibold border transition-all ${
                dark
                  ? "border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-black"
                  : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Resume
            </a>
          </nav>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-lg transition-all border ${
              dark
                ? "border-gray-700 hover:bg-gray-700/30"
                : "border-gray-400 hover:bg-gray-200/50"
            }`}
            aria-label="Toggle light/dark mode"
          >
            {dark ? "🌞" : "🌙"}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl ml-3"
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden flex flex-col items-center space-y-4 py-6 ${
              dark ? "bg-black/90 text-white" : "bg-white/90 text-black"
            }`}
          >
            {[
              "about",
              "experience",
              "education",
              "skills",
              "projects",
              "contact",
            ].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => setMenuOpen(false)}
                className={`capitalize transition-colors ${
                  activeSection === section
                    ? "text-blue-400 font-semibold"
                    : dark
                      ? "text-gray-300 hover:text-blue-400"
                      : "text-gray-700 hover:text-blue-500"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}

            {/* Resume Button (Mobile) */}
            <a
              href="/Rupak_Ganvir_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-lg font-semibold border transition-all ${
                dark
                  ? "border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-black"
                  : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              }`}
            >
              Resume
            </a>
          </motion.nav>
        )}
      </header>

      {/* --- HERO --- */}
      <motion.section
        className="flex flex-col items-center justify-center text-center min-h-screen px-4 pt-24"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Photo */}
        <img
          src="/photos/RupakImg.png"
          alt="Rupak Ganvir"
          className="w-48 h-48 rounded-full border-4 border-blue-500 shadow-lg mb-6 object-cover"
        />

        {/* Name */}
        <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          {"Hi, I'm "}
          <span className="text-blue-500">Rupak Ganvir</span>
        </h2>

        {/* Typewriter */}
        <div className="h-14 flex items-center justify-center mb-3">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-blue-500">
              <Typewriter
                words={[
                  "Software Engineer",
                  "ML & DS Enthusiast",
                  "Full Stack Developer",
                  "Problem Solver",
                ]}
                loop={true}
                typeSpeed={80}
                deleteSpeed={40}
                delaySpeed={1800}
              />
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className={`mt-2 mb-6 text-base tracking-widest uppercase ${
            dark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Building intelligent systems • Exploring data • Shipping products
        </motion.p>

        {/* About blurb */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className={`max-w-2xl text-lg leading-relaxed mb-8 ${
            dark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {
            "I'm a software engineer turned data enthusiast — currently pursuing M.Tech. in Geoinformatics at IIT Kanpur, where I'm learning to see the world through the lens of spatial data and machine learning. I started my journey building responsive web applications and shipping real products, and now I'm channeling that same builder's instinct toward ML and Data Science."
          }
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className={`px-6 py-3 border rounded-full font-semibold transition-all duration-300 shadow-md ${
              dark
                ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
                : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className={`px-6 py-3 border rounded-full transition-all font-semibold ${
              dark
                ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                : "border-gray-400 text-gray-700 hover:bg-gray-200 hover:text-black"
            }`}
          >
            Contact Me
          </a>
        </div>
      </motion.section>

      {/* --- ABOUT SECTION --- */}
      <motion.section
        id="about"
        className="scroll-mt-24 max-w-4xl mx-auto mt-32 px-6 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl font-semibold mb-6">About Me</h3>

        <p
          className={`leading-relaxed mb-10 max-w-2xl ${dark ? "text-gray-400" : "text-gray-600"}`}
        >
          {
            "I'm a software engineer turned data enthusiast — currently pursuing M.Tech. in Geoinformatics at IIT Kanpur, where I'm learning to see the world through the lens of spatial data and machine learning. I started my journey building responsive web applications and shipping real products, and now I'm channeling that same builder's instinct toward ML and Data Science. I care deeply about work that sits at the intersection of elegant engineering and meaningful insight — whether that's a clean UI or a model that actually explains something about the world."
          }
        </p>

        {/* Stat counters */}
        {/* <div className="grid grid-cols-3 gap-6 w-full max-w-lg mb-10">
          {[
            { number: "", label: "" },
            { number: "", label: "" },
            { number: "", label: "" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-2xl border text-center transition-all ${
                dark
                  ? "border-gray-700 bg-black/30 hover:border-blue-500/60"
                  : "border-gray-200 bg-white/50 hover:border-blue-400/60"
              }`}
            >
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {stat.number}
              </div>
              <div
                className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div> */}

        {/* Currently exploring tags */}
        <div className="mb-10 w-full max-w-2xl">
          <p
            className={`text-sm font-semibold uppercase tracking-widest mb-4 ${dark ? "text-gray-500" : "text-gray-400"}`}
          >
            Currently Exploring
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: "🤖", label: "Machine Learning" },
              { icon: "📊", label: "Data Science" },
              { icon: "🌍", label: "Geospatial AI" },
              { icon: "🌐", label: "Full Stack Dev" },
              { icon: "🧠", label: "Deep Learning" },
              { icon: "📡", label: "Remote Sensing" },
            ].map((tag, i) => (
              <span
                key={i}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  dark
                    ? "border-blue-500/40 text-blue-300 bg-blue-500/10 hover:bg-blue-500/20"
                    : "border-blue-400/50 text-blue-600 bg-blue-50 hover:bg-blue-100"
                }`}
              >
                {tag.icon} {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* Status callout */}
        <div
          className={`w-full max-w-2xl mb-10 px-5 py-4 rounded-2xl border-l-4 border-blue-500 text-left ${
            dark ? "bg-blue-500/10" : "bg-blue-50"
          }`}
        >
          <p className="text-sm font-semibold text-blue-400 mb-1">Currently</p>
          <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
            {
              "Pursuing M.Tech. at IIT Kanpur · Building ML & geospatial projects · Open to internships & research collaborations"
            }
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="/public/resume/Rupak_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`border px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md ${
              dark
                ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
                : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            View Resume
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/rupakganvir"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-6 py-3 border rounded-full font-semibold transition-all duration-300 ${
              dark
                ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                : "border-gray-400 text-gray-700 hover:bg-gray-200 hover:text-black"
            }`}
          >
            LinkedIn
          </motion.a>
        </div>
      </motion.section>

      {/* --- WORK EXPERIENCE SECTION --- */}
      <motion.section
        id="experience"
        className="scroll-mt-24 max-w-4xl mx-auto mt-32 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl font-semibold mb-10 text-center">Experience</h3>

        <div className="space-y-8">
          {/* Software Engineer */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
              dark
                ? "border-gray-700 bg-black/70 hover:border-blue-500 hover:bg-blue-500/10"
                : "border-gray-300 bg-white/70 hover:border-blue-500 hover:bg-blue-100/30"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <h4 className="text-xl font-bold">
                {"Software Engineer — ASP OL Media Pvt. Ltd."}
              </h4>
              <span
                className={`text-xs px-3 py-1 rounded-full border ${dark ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-500"}`}
              >
                Full-time
              </span>
            </div>
            <p className="text-blue-400 text-sm mb-3">
              April 2024 – November 2024
            </p>
            <ul
              className="list-disc list-inside space-y-2"
              style={{ color: dark ? "#9ca3af" : "#4b5563" }}
            >
              <li>
                {
                  "Engineered responsive HTML/CSS email templates at production scale, ensuring cross-platform compatibility across major email clients and devices."
                }
              </li>
              <li>
                {
                  "Maintained mail server health by diagnosing delivery failures, resolving queue backlogs, and keeping campaign pipelines running under tight deadlines."
                }
              </li>
              <li>
                {
                  "Operated in a team-driven environment, taking ownership of daily deliverables and contributing directly to live product output."
                }
              </li>
            </ul>
          </motion.div>

          {/* Frontend Developer (Intern) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
              dark
                ? "border-gray-700 bg-black/70 hover:border-blue-500 hover:bg-blue-500/10"
                : "border-gray-300 bg-white/70 hover:border-blue-500 hover:bg-blue-100/30"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <h4 className="text-xl font-bold">
                {"Frontend Developer Intern — DevKalp Technologies"}
              </h4>
              <span
                className={`text-xs px-3 py-1 rounded-full border ${dark ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-500"}`}
              >
                Internship
              </span>
            </div>
            <p className="text-blue-400 text-sm mb-3">
              April 2023 – September 2023
            </p>
            <ul
              className="list-disc list-inside space-y-2"
              style={{ color: dark ? "#9ca3af" : "#4b5563" }}
            >
              <li>
                {
                  "Built a hospital management dashboard using React and Tailwind CSS — enabling staff to view patient records, check doctor availability, and book appointments in real time."
                }
              </li>
              <li>
                {
                  "Developed responsive UI components for e-commerce client projects, working in a 4-member agile team with direct client communication and feedback cycles."
                }
              </li>
              <li>
                {
                  "Gained hands-on experience with Git workflows, component-level code reviews, and shipping production features on real client deadlines."
                }
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* --- EDUCATION SECTION --- */}
      <motion.section
        id="education"
        className="scroll-mt-24 max-w-4xl mx-auto mt-32 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl font-semibold mb-10 text-center">Education</h3>

        <div className="space-y-8">
          {/* IIT Kanpur */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
              dark
                ? "border-gray-700 bg-black/10 hover:border-blue-500 hover:bg-blue-500/10"
                : "border-gray-300 bg-white/10 hover:border-blue-500 hover:bg-blue-100/30"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <h4 className="text-xl font-bold">
                {"Indian Institute of Technology (IIT) Kanpur"}
              </h4>
              <span className="text-xs px-3 py-1 rounded-full border border-blue-500/40 text-blue-400 bg-blue-500/10">
                Ongoing
              </span>
            </div>
            <p className="text-blue-400 mb-1">{"M.Tech. in Geoinformatics"}</p>
            <p
              className={`text-sm mb-4 ${dark ? "text-gray-500" : "text-gray-400"}`}
            >
              2025 – Present
            </p>
            <ul
              className="list-disc list-inside space-y-2"
              style={{ color: dark ? "#9ca3af" : "#4b5563" }}
            >
              <li>
                {
                  "Coursework includes Probability and Statistics, Numerical Methods, Spatial Analysis, GPS & GNSS Technology, Remote Sensing, and Advanced Geoinformatics."
                }
              </li>
              <li>
                {
                  "Currently pursuing 2nd semester courses in Spatial Data Science and Photogrammetry, while auditing Computer Vision."
                }
              </li>
              <li>
                {
                  "Actively working toward a research thesis at the intersection of geospatial technology and machine learning."
                }
              </li>
            </ul>
          </motion.div>

          {/* B.Tech */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
              dark
                ? "border-gray-700 bg-black/10 hover:border-blue-500 hover:bg-blue-500/10"
                : "border-gray-300 bg-white/10 hover:border-blue-500 hover:bg-blue-100/30"
            }`}
          >
            <h4 className="text-xl font-bold mb-1">
              {"Priyadarshini College of Engineering, Nagpur"}
            </h4>
            <p className="text-blue-400 mb-1">
              {"B.Tech. in Computer Science and Engineering"}
            </p>
            <p
              className={`text-sm mb-4 ${dark ? "text-gray-500" : "text-gray-400"}`}
            >
              2019 – 2023
            </p>
            <ul
              className="list-disc list-inside space-y-2"
              style={{ color: dark ? "#9ca3af" : "#4b5563" }}
            >
              <li>
                {
                  "Final year project: Fake Medicine Detection System using Blockchain — a decentralized solution to verify drug authenticity and combat counterfeit pharmaceuticals in the supply chain."
                }
              </li>
              <li>
                {
                  "Built a strong foundation in Data Structures, Algorithms, OOP, and Computer Networks, which continues to underpin both professional and academic work."
                }
              </li>
              <li>
                {
                  "Actively participated in technical events and coding competitions."
                }
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* --- SKILLS SECTION --- */}
      <motion.section
        id="skills"
        className="scroll-mt-24 max-w-5xl mx-auto mt-32 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl font-semibold mb-10 text-center">
          Technical Skills
        </h3>

        <div className="space-y-6">
          {[
            {
              category: "Machine Learning & Data Science",
              emoji: "🤖",
              skills: [
                "Python",
                "NumPy",
                "Pandas",
                "Scikit-learn",
                "TensorFlow",
                "Data Analysis",
              ],
            },
            {
              category: "Programming Languages",
              emoji: "💻",
              skills: ["C++", "Python", "JavaScript", "TypeScript"],
            },
            {
              category: "Frontend & UI",
              emoji: "🎨",
              skills: [
                "React",
                "Tailwind CSS",
                "HTML5",
                "CSS3",
                "Framer Motion",
              ],
            },
            {
              category: "Backend & Databases",
              emoji: "🛠️",
              skills: ["Node.js", "Express", "MongoDB", "REST API", "SQL"],
            },
            {
              category: "Geospatial & GNSS",
              emoji: "🌍",
              skills: [
                "GIS",
                "Remote Sensing",
                "GNSS",
                "Google Earth Engine",
                "QGIS",
              ],
            },
            {
              category: "Tools & DevOps",
              emoji: "⚙️",
              skills: ["Git", "Linux", "AWS", "VS Code"],
            },
          ].map((group, gi) => (
            <motion.div
              key={gi}
              whileHover={{ scale: 1.01 }}
              className={`p-6 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
                dark
                  ? "border-gray-700 bg-black/30 hover:border-blue-500/60"
                  : "border-gray-200 bg-white/50 hover:border-blue-400/60"
              }`}
            >
              <h4
                className={`text-lg font-bold mb-4 flex items-center gap-2 ${dark ? "text-white" : "text-gray-800"}`}
              >
                <span>{group.emoji}</span> {group.category}
              </h4>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, si) => (
                  <span
                    key={si}
                    className={`px-4 py-2 border rounded-full text-sm font-medium transition-all cursor-default ${
                      dark
                        ? "border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10"
                        : "border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* --- PROJECTS SECTION --- */}
      <motion.section
        id="projects"
        className="scroll-mt-24 max-w-6xl mx-auto mt-32 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl font-semibold mb-12 text-center">Projects</h3>

        {/* Project Data */}
        {(() => {
          const projects = [
            {
              title: "Email Template Optimizer",
              desc: "Designed optimized email templates to improve deliverability and reduce spam rates.",
              tech: ["HTML", "CSS", "JS"],
            },
            {
              title: "Reddit TTS YouTube Automation",
              desc: "Automated video creation using Reddit text-to-speech, building a scalable YouTube pipeline.",
              tech: ["Python", "FFmpeg", "API"],
            },
            {
              title: "Portfolio Website (This One!)",
              desc: "Built a fully responsive personal portfolio using React, Tailwind, and Framer Motion.",
              tech: ["React", "Tailwind", "Framer Motion"],
            },
            {
              title: "Weather Forecast App",
              desc: "A sleek weather app fetching real-time data using OpenWeather API.",
              tech: ["React", "API"],
            },
            {
              title: "Task Manager Dashboard",
              desc: "A full-stack task tracker with authentication and analytics.",
              tech: ["Node.js", "MongoDB", "Express"],
            },
          ];

          const displayed = showAll ? projects : projects.slice(0, 3);

          return (
            <>
              {/* Project Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {displayed.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.8 }}
                    viewport={{ once: true }}
                    className={`p-6 rounded-2xl border transition-all shadow-md ${
                      dark
                        ? "border-gray-700 bg-black/40 hover:border-blue-500 hover:bg-blue-500/10"
                        : "border-gray-300 bg-white hover:border-blue-500 hover:bg-blue-100/30"
                    } hover:shadow-blue-500/10`}
                    whileHover={{ scale: 1.03 }}
                  >
                    <h4 className="text-xl font-bold mb-3">{project.title}</h4>
                    <p
                      className={`mb-4 ${
                        dark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, j) => (
                        <span
                          key={j}
                          className={`text-sm px-3 py-1 border rounded-full ${
                            dark
                              ? "border-gray-600 text-gray-300"
                              : "border-gray-400 text-gray-700"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#"
                      className="text-blue-400 hover:underline font-medium"
                    >
                      View Project →
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Show More / Less + GitHub buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className={`px-6 py-3 border rounded-full font-semibold transition-all duration-300 shadow-md ${
                    dark
                      ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
                      : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {showAll ? "Show Less" : "Show More Projects"}
                </button>
                {showAll && (
                  <motion.a
                    href="https://github.com/rupakganvir"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`px-6 py-3 border rounded-full font-semibold transition-all duration-300 ${
                      dark
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "border-gray-400 text-gray-700 hover:bg-gray-200 hover:text-black"
                    }`}
                  >
                    View GitHub
                  </motion.a>
                )}
              </div>
            </>
          );
        })()}
      </motion.section>

      {/* --- CONTACT SECTION --- */}
      <motion.section
        id="contact"
        className="scroll-mt-24 max-w-4xl mx-auto mt-32 mb-20 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl font-semibold mb-6">Get In Touch</h3>
        <p className={`mb-8 ${dark ? "text-gray-400" : "text-gray-600"}`}>
          I’m currently open to research collaborations, internships, freelance
          projects, and professional opportunities. Feel free to reach out —
          I’ll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 max-w-xl mx-auto mb-8"
        >
          <input
            type="text"
            name="Name"
            placeholder="Your Name"
            required
            className="px-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            name="Email"
            placeholder="Your Email"
            required
            className="px-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:border-blue-500"
          />
          <textarea
            name="Message"
            placeholder="Your Message"
            rows="5"
            required
            className="px-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
          >
            Send Message
          </button>
          {status && (
            <p
              className={`mt-4 font-medium ${status.includes("❌") ? "text-red-500" : "text-green-500"}`}
            >
              {status}
            </p>
          )}
        </form>

        {/* Divider or “or contact directly” */}
        <p className={`${dark ? "text-gray-400" : "text-gray-600"} mb-6`}>
          Or you can email me directly at{" "}
          <a
            href="mailto:rupakganvir12@gmail.com"
            className="text-blue-400 hover:underline"
          >
            rupakganvir12@gmail.com
          </a>
        </p>
      </motion.section>

      {/* --- FOOTER --- */}
      <footer
        className={`mt-32 border-t py-12 px-6 text-center ${
          dark ? "border-gray-700 bg-black/80" : "border-gray-300 bg-white/80"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="text-xl font-semibold mb-4">Let’s Connect</h4>

          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://github.com/rupakganvir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-transform transform hover:scale-125"
            >
              <i className="fa-brands fa-github text-2xl"></i>
            </a>

            <a
              href="https://linkedin.com/in/rupakganvir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-transform transform hover:scale-125"
            >
              <i className="fa-brands fa-linkedin text-2xl"></i>
            </a>

            <a
              href="https://x.com/GanvirRupak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-transform transform hover:scale-125"
            >
              <i className="fa-brands fa-x-twitter text-2xl"></i>
            </a>
          </div>

          <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-600"}`}>
            © {new Date().getFullYear()} Rupak Ganvir. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </div>
  );
}
