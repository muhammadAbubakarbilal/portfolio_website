import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Muhammad Abu Bakar</h3>
            <p className="text-slate-300 mb-6 max-w-md">
              Web Developer & AI Engineer passionate about creating innovative solutions that bridge 
              software engineering and artificial intelligence to solve real-world problems.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/muhammadabubakarbilal" className="text-slate-400 hover:text-white transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/muhammadabubakarbilal" className="text-slate-400 hover:text-white transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/muhammadabubakarbilal" className="text-slate-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:abgakhar787@gmail.com" className="text-slate-400 hover:text-white transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button 
                  onClick={() => handleNavClick("#home")}
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("#about")}
                  className="hover:text-white transition-colors duration-200"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("#projects")}
                  className="hover:text-white transition-colors duration-200"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("#blog")}
                  className="hover:text-white transition-colors duration-200"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick("#contact")}
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Specialties</h4>
            <ul className="space-y-2 text-slate-300">
              <li>React & Next.js</li>
              <li>Mobile Development</li>
              <li>Deep Learning & AI</li>
              <li>Computer Vision</li>
              <li>Full-Stack Development</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Muhammad Abu Bakar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
