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
    window.history.scrollRestoration = "manual";
  }, []);

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
        "thesis",
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
              "thesis",
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
              href={`${import.meta.env.BASE_URL}resume/Rupak_Resume.pdf`}
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
              "thesis",
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
              href={`${import.meta.env.BASE_URL}resume/Rupak_Resume.pdf`}
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
        className="flex flex-col items-center justify-center text-center min-h-[100svh] px-4 pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
                  "ML & Data Science Engineer",
                  "Full Stack Developer",
                  "Geospatial AI Researcher",
                  "IIT Kanpur M.Tech Student",
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
          <b>Building ML systems • Geospatial AI • Shipping real products</b>
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
            "M.Tech. Geoinformatics student at IIT Kanpur with a background in software engineering. I build end-to-end ML systems, geospatial pipelines, and full-stack data products — bridging the gap between research and production."
          }
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-6 py-3 border rounded-full font-semibold transition-all duration-300 shadow-md ${
              dark
                ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
                : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            View My Work
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-6 py-3 border rounded-full font-semibold transition-all duration-300 ${
              dark
                ? "border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white"
                : "border-gray-400 text-gray-600 hover:bg-gray-200 hover:text-black"
            }`}
          >
            Contact Me
          </motion.a>
        </div>
      </motion.section>

      {/* --- ABOUT SECTION --- */}
      <motion.section
        id="about"
        className="max-w-4xl mx-auto mt-32 px-6 flex flex-col items-center text-center"
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
            "I'm a software engineer turned ML practitioner — currently pursuing M.Tech. in Geoinformatics at IIT Kanpur under Prof. Onkar Dikshit. I started my career building production web applications at ASP OL Media and DevKalp Technologies, and now I channel that same builder's instinct into ML systems, data pipelines, and geospatial AI. I care about work that sits at the intersection of rigorous engineering and meaningful insight — whether that's a production-grade RAG service, a geodetic adjustment tool, or a model that says something real about the world."
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
                  ? "border-gray-700 bg-black/30 hover:border-blue-500"
                  : "border-gray-200 bg-white/50 hover:border-blue-400"
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

        {/* Focus areas — styled like skill tags to match Skills section */}
        <div className="mb-10 w-full max-w-2xl">
          <p
            className={`text-sm font-semibold uppercase tracking-widest mb-5 ${dark ? "text-gray-400" : "text-gray-500"}`}
          >
            <b>Currently Exploring</b>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Machine Learning",
              "Data Science",
              "Geospatial AI",
              "RAG & LLM Systems",
              "Deep Learning",
              "Remote Sensing",
              "InSAR & GNSS",
              "Analytics Engineering",
            ].map((tag, i) => (
              <span
                key={i}
                className={`px-4 py-2 border rounded-full text-sm font-medium transition-all cursor-default ${
                  dark
                    ? "border-gray-600 text-gray-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10"
                    : "border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Current status card — styled like exp/edu cards */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`w-full max-w-2xl mb-10 p-5 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
            dark
              ? "border-gray-700 bg-black/30 hover:border-blue-500 hover:bg-blue-500/10"
              : "border-gray-200 bg-white/50 hover:border-blue-500 hover:bg-blue-100/30"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-widest mb-2 ${dark ? "text-blue-400" : "text-blue-500"}`}
          >
            Current Status
          </p>
          <p
            className={`text-sm leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`}
          >
            {
              "M.Tech. Geoinformatics @ IIT Kanpur (Civil Engg. Dept.) · Thesis under Prof. Onkar Dikshit · Building ML, geospatial & data products · Open to internships & research collaborations"
            }
          </p>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href={`${import.meta.env.BASE_URL}resume/Rupak_Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-6 py-3 border rounded-full font-semibold transition-all duration-300 shadow-md ${
              dark
                ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
                : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
          >
            View Resume
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/rupak-ganvir-8a46a7213/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-6 py-3 border rounded-full font-semibold transition-all duration-300 ${
              dark
                ? "border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white"
                : "border-gray-400 text-gray-600 hover:bg-gray-200 hover:text-black"
            }`}
          >
            LinkedIn
          </motion.a>
        </div>
      </motion.section>

      {/* --- WORK EXPERIENCE SECTION --- */}
      <motion.section
        id="experience"
        className="max-w-4xl mx-auto mt-32 px-6"
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
                ? "border-gray-700 bg-black/30 hover:border-blue-500 hover:bg-blue-500/10"
                : "border-gray-300 bg-white/50 hover:border-blue-500 hover:bg-blue-100/30"
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
              April 2024 - November 2024
            </p>
            <ul
              className={`list-disc list-inside space-y-2 ${dark ? "text-gray-400" : "text-gray-600"}`}
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
                ? "border-gray-700 bg-black/30 hover:border-blue-500 hover:bg-blue-500/10"
                : "border-gray-300 bg-white/50 hover:border-blue-500 hover:bg-blue-100/30"
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
              April 2023 - September 2023
            </p>
            <ul
              className={`list-disc list-inside space-y-2 ${dark ? "text-gray-400" : "text-gray-600"}`}
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
        className="max-w-4xl mx-auto mt-32 px-6"
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
                ? "border-gray-700 bg-black/30 hover:border-blue-500 hover:bg-blue-500/10"
                : "border-gray-300 bg-white/50 hover:border-blue-500 hover:bg-blue-100/30"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <h4 className="text-xl font-bold">
                {"Indian Institute of Technology (IIT) Kanpur"}
              </h4>
              <span
                className={`text-xs px-3 py-1 rounded-full border ${dark ? "border-blue-400 text-blue-400" : "border-blue-500 text-blue-500"}`}
              >
                Ongoing
              </span>
            </div>
            <p className="text-blue-400 mb-1">{"M.Tech. in Geoinformatics"}</p>
            <p
              className={`text-sm mb-4 ${dark ? "text-gray-500" : "text-gray-400"}`}
            >
              2025 - Present
            </p>
            <ul
              className={`list-disc list-inside space-y-2 ${dark ? "text-gray-400" : "text-gray-600"}`}
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
                ? "border-gray-700 bg-black/30 hover:border-blue-500 hover:bg-blue-500/10"
                : "border-gray-300 bg-white/50 hover:border-blue-500 hover:bg-blue-100/30"
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
              2019 - 2023
            </p>
            <ul
              className={`list-disc list-inside space-y-2 ${dark ? "text-gray-400" : "text-gray-600"}`}
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
        className="max-w-5xl mx-auto mt-32 px-6"
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
              emoji: "",
              skills: [
                "Python",
                "NumPy",
                "Pandas",
                "Scikit-learn",
                "XGBoost",
                "TensorFlow",
                "PyTorch",
                "SMOTE",
                "Isolation Forest",
                "LSTM",
                "CNN",
                "FinBERT",
              ],
            },
            {
              category: "RAG & LLM Systems",
              emoji: "",
              skills: [
                "FastAPI",
                "ChromaDB",
                "BM25",
                "Reciprocal Rank Fusion",
                "HuggingFace",
                "OpenAI API",
                "Pydantic",
                "Docker",
              ],
            },
            {
              category: "Analytics & BI",
              emoji: "",
              skills: [
                "SQL",
                "DuckDB",
                "Streamlit",
                "Plotly",
                "Statistical Testing",
                "Cohort Analysis",
                "Power Analysis",
                "CUPED",
              ],
            },
            {
              category: "Programming Languages",
              emoji: "",
              skills: ["Python", "C++", "JavaScript", "TypeScript", "SQL"],
            },
            {
              category: "Full Stack & UI",
              emoji: "",
              skills: [
                "React",
                "Vite",
                "Tailwind CSS",
                "Framer Motion",
                "Node.js",
                "Express",
                "MongoDB",
                "PostgreSQL",
                "PostGIS",
                "Leaflet",
              ],
            },
            {
              category: "Geospatial & Remote Sensing",
              emoji: "",
              skills: [
                "GIS",
                "InSAR",
                "GNSS",
                "Remote Sensing",
                "Google Earth Engine",
                "QGIS",
                "SAR",
                "Mogi Source Modelling",
                "Kalman Filter",
                "Geodetic Adjustment",
              ],
            },
            {
              category: "Tools & DevOps",
              emoji: "",
              skills: [
                "Git",
                "GitHub Actions",
                "Docker",
                "Linux",
                "AWS",
                "Render",
                "Vercel",
                "Pytest",
              ],
            },
          ].map((group, gi) => (
            <motion.div
              key={gi}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
                dark
                  ? "border-gray-700 bg-black/30 hover:border-blue-500"
                  : "border-gray-200 bg-white/50 hover:border-blue-400"
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
        className="max-w-6xl mx-auto mt-32 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl font-semibold mb-10 text-center">Projects</h3>

        {/* Project Data */}
        {(() => {
          // ✏️ TO UPDATE: Add or change GitHub links / descriptions here
          const projects = [
            {
              title: "DocuMind — Production RAG Service",
              desc: "Production-grade document Q&A API with hybrid dense+BM25 retrieval fused via Reciprocal Rank Fusion, cross-encoder reranker, a 5-metric evaluation harness (context precision, faithfulness, ROUGE-L), 82-test CI suite, and a two-stage Docker build baking HuggingFace weights at image build time.",
              tech: [
                "FastAPI",
                "ChromaDB",
                "BM25",
                "HuggingFace",
                "Docker",
                "GitHub Actions",
                "Python",
              ],
              link: "https://github.com/RupakGanvir/DocuMind", // ✏️ Update if URL changes
            },
            {
              title: "TerraWatch — Geospatial Anomaly Platform",
              desc: "Full-stack geospatial anomaly detection platform: React/Leaflet interactive map frontend, FastAPI + PostgreSQL/PostGIS backend, JWT authentication, and Isolation Forest ML for detecting spatial anomalies. Deployed across Vercel, Render, and Neon (free tier).",
              tech: [
                "React",
                "Leaflet",
                "FastAPI",
                "PostGIS",
                "Isolation Forest",
                "JWT",
                "Vercel",
              ],
              link: "https://github.com/RupakGanvir", // ✏️ Replace with actual repo link
            },
            {
              title: "RetailPulse — Analytics Pipeline",
              desc: "End-to-end e-commerce analytics pipeline: raw data ingestion, documented SQL cleaning layer, DuckDB warehouse with cohort retention marts using CTEs and window functions, a pytest data-quality suite, and a Streamlit + Plotly dashboard with Welch's t-test significance testing on channel LTV.",
              tech: [
                "DuckDB",
                "SQL",
                "Streamlit",
                "Plotly",
                "Pytest",
                "Python",
              ],
              link: "https://github.com/RupakGanvir/retail-analytics-pipeline",
            },
            {
              title: "CausalLens — A/B Testing Framework",
              desc: "Experiment design and analysis framework: statistical power analysis, CUPED variance reduction, sample ratio mismatch (SRM) diagnostics, Benjamini-Hochberg corrected segment analysis, and 12 unit tests. Built to bring causal inference rigour to A/B test workflows.",
              tech: ["Python", "Scipy", "Pandas", "Pytest", "Statistics"],
              link: "https://github.com/RupakGanvir/CausalLens",
            },
            {
              title: "Fraud Detection System",
              desc: "ML pipeline on the IEEE-CIS dataset (590K+ transactions). Implemented Logistic Regression from scratch in NumPy, applied SMOTE for class imbalance, and pushed AUC-ROC from 0.784 to 0.904 with XGBoost. Includes a FastAPI serving layer and a Folium geospatial fraud heatmap.",
              tech: [
                "Python",
                "XGBoost",
                "SMOTE",
                "FastAPI",
                "Folium",
                "Scikit-learn",
              ],
              link: "https://github.com/RupakGanvir/fraud-detection-system", // ✏️ Update if URL changes
            },
            {
              title: "Intraday Trading System",
              desc: "Autonomous intraday trading system built from scratch — ensemble of XGBoost, LSTM, CNN, and FinBERT sentiment analysis. Live market data via Zerodha Kite and Binance WebSocket feeds, paper trading mode, and a React dashboard for monitoring signals in real time.",
              tech: [
                "Python",
                "XGBoost",
                "LSTM",
                "CNN",
                "FinBERT",
                "React",
                "Zerodha Kite API",
              ],
              link: "https://github.com/RupakGanvir", // ✏️ Replace with actual repo link
            },
            {
              title: "InSAR Anomaly Detection — Joshimath",
              desc: "LSTM autoencoder in PyTorch to detect surface deformation anomalies from Sentinel-1 SAR data using the LiCSAR/LiCSBAS pipeline. Applied to the Joshimath land subsidence events in Uttarakhand — a real geospatial hazard monitoring use case.",
              tech: [
                "Python",
                "PyTorch",
                "LSTM Autoencoder",
                "Sentinel-1",
                "LiCSBAS",
                "Google Colab",
              ],
              link: "https://github.com/RupakGanvir", // ✏️ Replace with actual repo link
            },
            {
              title: "Monte Carlo T20 Simulation",
              desc: "Monte Carlo simulation to estimate T20 cricket run chase probabilities across match scenarios. Built while studying probability distributions at IIT Kanpur — grounded in real statistical theory.",
              tech: ["Python", "NumPy", "Matplotlib", "Jupyter Notebook"],
              link: "https://github.com/RupakGanvir/monte-carlo-t20-simulation",
            },
            {
              title: "Human Counting System",
              desc: "Human detection and counting system using OpenCV's HOG descriptor, supporting image, video, and real-time webcam input. Accuracy improved using Non-Maximum Suppression to eliminate duplicate bounding boxes.",
              tech: ["Python", "OpenCV", "HOG Descriptor", "Jupyter Notebook"],
              link: "https://github.com/RupakGanvir/Humans-Counting",
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
                    className={`p-6 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
                      dark
                        ? "border-gray-700 bg-black/30 hover:border-blue-500 hover:bg-blue-500/10"
                        : "border-gray-300 bg-white/50 hover:border-blue-500 hover:bg-blue-100/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
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
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline font-medium"
                    >
                      View Project →
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Show More / Less + GitHub buttons */}
              <div className="flex flex-wrap justify-center gap-4 mt-10">
                <motion.button
                  onClick={() => setShowAll(!showAll)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-6 py-3 border rounded-full font-semibold transition-all duration-300 shadow-md ${
                    dark
                      ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
                      : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {showAll ? "Show Less" : "Show More Projects"}
                </motion.button>
                {showAll && (
                  <motion.a
                    href="https://github.com/rupakganvir"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    className={`px-6 py-3 border rounded-full font-semibold transition-all duration-300 ${
                      dark
                        ? "border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "border-gray-400 text-gray-600 hover:bg-gray-200 hover:text-black"
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

      {/* --- THESIS SECTION --- */}
      <motion.section
        id="thesis"
        className="max-w-4xl mx-auto mt-32 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h3 className="text-3xl font-semibold mb-3 text-center">
          M.Tech Thesis
        </h3>
        <p
          className={`text-center text-sm mb-10 ${dark ? "text-gray-500" : "text-gray-400"}`}
        >
          IIT Kanpur · Geoinformatics · Supervisor: Prof. Onkar Dikshit
        </p>

        {/* Title card */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`p-6 rounded-2xl border mb-8 shadow-md backdrop-blur-md ${
            dark
              ? "border-blue-500/40 bg-blue-500/5 hover:border-blue-400"
              : "border-blue-400/40 bg-blue-50/50 hover:border-blue-500"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-widest mb-2 ${dark ? "text-blue-400" : "text-blue-500"}`}
          >
            Thesis Title
          </p>
          <h4 className="text-xl font-bold mb-2">
            Sequential Adjustment and Kalman Filter Integration in GeoNet Adjust
          </h4>
          <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Extending an existing geodetic network adjustment software (GeoNet
            Adjust) with sequential least-squares adjustment, a Kalman filter
            engine, and a Kalman-LSTM hybrid for GNSS state estimation — applied
            to India's national GNSS CORS network.
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Background */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`p-6 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
              dark
                ? "border-gray-700 bg-black/30 hover:border-blue-500 hover:bg-blue-500/10"
                : "border-gray-300 bg-white/50 hover:border-blue-500 hover:bg-blue-100/30"
            }`}
          >
            <h4
              className={`text-lg font-bold mb-3 flex items-center gap-2 ${dark ? "text-white" : "text-gray-800"}`}
            >
              Background & Starting Point
            </h4>
            <p
              className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}
            >
              GeoNet Adjust was originally developed by Himanshu Shekhar
              (M.Tech, IIT Kanpur) under the same supervisor and submitted in
              May 2026. The thesis extends that existing codebase rather than
              starting from scratch — adding new computational capabilities on
              top of an established geodetic adjustment foundation.
            </p>
          </motion.div>

          {/* Core Technical Work */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`p-6 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
              dark
                ? "border-gray-700 bg-black/30 hover:border-blue-500 hover:bg-blue-500/10"
                : "border-gray-300 bg-white/50 hover:border-blue-500 hover:bg-blue-100/30"
            }`}
          >
            <h4
              className={`text-lg font-bold mb-4 flex items-center gap-2 ${dark ? "text-white" : "text-gray-800"}`}
            >
              Core Technical Contributions
            </h4>
            <ul
              className={`space-y-3 text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}
            >
              <li className="flex gap-3">
                <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                <span>
                  <span
                    className={`font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}
                  >
                    Sequential Least-Squares Adjustment:
                  </span>{" "}
                  Implementing the recursive form of geodetic network
                  adjustment, enabling the software to process GNSS observations
                  incrementally rather than in a single batch — critical for
                  real-time and time-series geodetic applications.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                <span>
                  <span
                    className={`font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}
                  >
                    Kalman Filter Engine:
                  </span>{" "}
                  Building a full Kalman filter module within GeoNet Adjust for
                  dynamic GNSS state estimation — predicting and correcting
                  position and velocity states as new measurements arrive,
                  handling process and measurement noise covariance.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                <span>
                  <span
                    className={`font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}
                  >
                    Kalman-LSTM Hybrid:
                  </span>{" "}
                  A proactively proposed ML extension — coupling the Kalman
                  filter with an LSTM network (inspired by the KalmanNet
                  architecture) to learn the process noise covariance from data
                  rather than hand-tuning it, improving state estimation
                  accuracy in non-stationary GNSS signal environments.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                <span>
                  <span
                    className={`font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}
                  >
                    Parallel Processing:
                  </span>{" "}
                  Adding multi-core parallel computation support to handle the
                  scale of India's full national GNSS CORS network — a
                  significant step up from the smaller UP CORS network used in
                  prior testing.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                <span>
                  <span
                    className={`font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}
                  >
                    SINEX Format Support:
                  </span>{" "}
                  Full SINEX (Solution INdependent EXchange) format I/O for both
                  input and output — the standard interchange format for GNSS
                  solution sharing across geodetic agencies worldwide —
                  alongside PDF report and time-series output.
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Dataset & Scale */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`p-6 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
              dark
                ? "border-gray-700 bg-black/30 hover:border-blue-500 hover:bg-blue-500/10"
                : "border-gray-300 bg-white/50 hover:border-blue-500 hover:bg-blue-100/30"
            }`}
          >
            <h4
              className={`text-lg font-bold mb-4 flex items-center gap-2 ${dark ? "text-white" : "text-gray-800"}`}
            >
              Dataset & Scale
            </h4>
            <p
              className={`text-sm leading-relaxed ${dark ? "text-gray-400" : "text-gray-600"}`}
            >
              The expanded thesis scope covers{" "}
              <span
                className={`font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}
              >
                India's full national GNSS CORS (Continuously Operating
                Reference Stations) network
              </span>{" "}
              — a substantial scale-up from the smaller Uttar Pradesh CORS
              network used in earlier validation. This scale tests the parallel
              processing implementation in a real national geodetic
              infrastructure context.
            </p>
          </motion.div>

          {/* Key References */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`p-6 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
              dark
                ? "border-gray-700 bg-black/30 hover:border-blue-500 hover:bg-blue-500/10"
                : "border-gray-300 bg-white/50 hover:border-blue-500 hover:bg-blue-100/30"
            }`}
          >
            <h4
              className={`text-lg font-bold mb-4 flex items-center gap-2 ${dark ? "text-white" : "text-gray-800"}`}
            >
              Key References
            </h4>
            <ul
              className={`space-y-3 text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}
            >
              <li className="flex gap-3">
                <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                <span>
                  <span
                    className={`font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}
                  >
                    Verma et al. (Remote Sensing, April 2025)
                  </span>{" "}
                  — Hybrid DNN + Extended Kalman Filter for GNSS state
                  estimation. Primary reference for the Kalman-LSTM hybrid
                  component.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                <span>
                  <span
                    className={`font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}
                  >
                    Revach et al. — KalmanNet (IEEE TSP, 2022)
                  </span>{" "}
                  — Model-based deep learning for state estimation; closest
                  architectural match to the Kalman-LSTM hybrid approach.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                <span>
                  <span
                    className={`font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}
                  >
                    Fraser, Leahy & Collier (Survey Review, 2023)
                  </span>{" "}
                  — Automatic segmentation and parallel phased least squares.
                  Core reference for the parallel processing implementation.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 mt-0.5 shrink-0">▸</span>
                <span>
                  <span
                    className={`font-semibold ${dark ? "text-gray-200" : "text-gray-800"}`}
                  >
                    Mateo & Mackern
                  </span>{" "}
                  — Regional terrestrial reference frame densification and
                  adjustment methodology.
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Tech stack */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className={`p-6 rounded-2xl border transition-all shadow-md backdrop-blur-md ${
              dark
                ? "border-gray-700 bg-black/30 hover:border-blue-500"
                : "border-gray-200 bg-white/50 hover:border-blue-400"
            }`}
          >
            <h4
              className={`text-lg font-bold mb-4 flex items-center gap-2 ${dark ? "text-white" : "text-gray-800"}`}
            >
              Tools & Technologies
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                "Python",
                "NumPy",
                "PyTorch",
                "Kalman Filter",
                "LSTM",
                "SINEX Format",
                "GNSS CORS",
                "Parallel Processing",
                "Geodetic Adjustment",
                "Least Squares",
              ].map((skill, si) => (
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
        </div>
      </motion.section>

      {/* --- CONTACT SECTION --- */}
      <motion.section
        id="contact"
        className="max-w-4xl mx-auto mt-32 mb-20 px-6 text-center"
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
            className={`px-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:border-blue-500 ${dark ? "border-gray-600 text-white placeholder-gray-500" : "border-gray-300 text-gray-800 placeholder-gray-400"}`}
          />
          <input
            type="email"
            name="Email"
            placeholder="Your Email"
            required
            className={`px-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:border-blue-500 ${dark ? "border-gray-600 text-white placeholder-gray-500" : "border-gray-300 text-gray-800 placeholder-gray-400"}`}
          />
          <textarea
            name="Message"
            placeholder="Your Message"
            rows="5"
            required
            className={`px-4 py-3 rounded-lg border bg-transparent focus:outline-none focus:border-blue-500 ${dark ? "border-gray-600 text-white placeholder-gray-500" : "border-gray-300 text-gray-800 placeholder-gray-400"}`}
          />
          <button
            type="submit"
            className={`mt-2 px-6 py-3 border rounded-full font-semibold transition-all duration-300 shadow-md ${
              dark
                ? "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
                : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            }`}
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
              href="https://www.linkedin.com/in/rupak-ganvir-8a46a7213/"
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
