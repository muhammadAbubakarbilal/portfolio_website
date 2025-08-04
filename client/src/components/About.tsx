import { Brain, Code, Cloud, BarChart3, Download, Award, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function About() {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    experience: 0,
    projects: 0,
    clients: 0
  });

  useEffect(() => {
    const targets = { experience: 5, projects: 50, clients: 20 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const timers = Object.entries(targets).map(([key, target]) => {
      let current = 0;
      const increment = target / steps;
      
      return setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timers.find(t => t === timers[0]));
        }
        setAnimatedNumbers(prev => ({
          ...prev,
          [key]: Math.floor(current)
        }));
      }, stepDuration);
    });

    return () => timers.forEach(clearInterval);
  }, []);

  const skillCategories = [
    {
      title: "AI/ML Frameworks",
      icon: <Brain className="h-5 w-5 text-blue-600" />,
      skills: [
        { name: "TensorFlow", level: 90 },
        { name: "PyTorch", level: 85 },
        { name: "Scikit-learn", level: 90 },
        { name: "OpenCV", level: 75 },
      ]
    },
    {
      title: "Programming Languages",
      icon: <Code className="h-5 w-5 text-purple-600" />,
      skills: [
        { name: "Python", level: 95 },
        { name: "R", level: 80 },
        { name: "SQL", level: 85 },
        { name: "JavaScript", level: 75 },
      ]
    },
    {
      title: "Cloud & Tools",
      icon: <Cloud className="h-5 w-5 text-green-600" />,
      skills: [
        { name: "AWS", level: 85 },
        { name: "Docker", level: 80 },
        { name: "Git", level: 90 },
        { name: "Kubernetes", level: 65 },
      ]
    },
    {
      title: "Data Science",
      icon: <BarChart3 className="h-5 w-5 text-blue-600" />,
      skills: [
        { name: "Pandas", level: 95 },
        { name: "NumPy", level: 90 },
        { name: "Matplotlib", level: 80 },
        { name: "Jupyter", level: 85 },
      ]
    }
  ];

  const experiences = [
    {
      title: "Senior ML Engineer",
      company: "TechCorp AI",
      period: "2022 - Present",
      description: "Lead ML initiatives, developing computer vision models for autonomous systems.",
      color: "border-blue-600"
    },
    {
      title: "ML Engineer",
      company: "DataTech Solutions",
      period: "2020 - 2022",
      description: "Built NLP models for sentiment analysis and recommendation systems.",
      color: "border-purple-600"
    },
    {
      title: "Data Scientist",
      company: "StartupX",
      period: "2018 - 2020",
      description: "Developed predictive models and data pipelines for business intelligence.",
      color: "border-green-600"
    }
  ];

  const education = [
    {
      degree: "M.S. Computer Science",
      school: "Stanford University",
      year: "2018",
      description: "Specialization in Machine Learning and AI",
      color: "border-blue-600"
    },
    {
      degree: "B.S. Computer Engineering",
      school: "UC Berkeley",
      year: "2016",
      description: "Summa Cum Laude, Phi Beta Kappa",
      color: "border-purple-600"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-600 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-600 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            I'm a passionate developer and AI engineer who bridges the gap between traditional software engineering and cutting-edge artificial intelligence. 
            I create scalable, intelligent solutions across web, mobile, and AI domains.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Award className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {animatedNumbers.experience}+
            </h3>
            <p className="text-slate-600 dark:text-slate-300">Years of Experience</p>
          </div>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Trophy className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {animatedNumbers.projects}+
            </h3>
            <p className="text-slate-600 dark:text-slate-300">Completed Projects</p>
          </div>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Users className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {animatedNumbers.clients}+
            </h3>
            <p className="text-slate-600 dark:text-slate-300">Happy Clients</p>
          </div>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Skills Section */}
          <div className="lg:col-span-2">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-slate-900 dark:text-white mb-8"
            >
              Technical Skills
            </motion.h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-slate-50 dark:bg-slate-900 border-none hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-lg mb-4 flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.title}</span>
                      </h4>
                      <div className="space-y-3">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skill.name} className="flex items-center justify-between">
                            <span className="text-slate-700 dark:text-slate-300">{skill.name}</span>
                            <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: skillIndex * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-blue-600 h-2 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Experience & Education */}
          <div className="space-y-8">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-50 dark:bg-slate-900 border-none hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Experience</h3>
                  
                  <div className="space-y-6">
                    {experiences.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`border-l-4 ${exp.color} pl-6 hover:pl-8 transition-all duration-300`}
                      >
                        <h4 className="font-semibold text-lg text-slate-900 dark:text-white">{exp.title}</h4>
                        <p className="text-blue-600 font-medium">{exp.company} • {exp.period}</p>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">{exp.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-50 dark:bg-slate-900 border-none hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Education</h3>
                  
                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`border-l-4 ${edu.color} pl-6 hover:pl-8 transition-all duration-300`}
                      >
                        <h4 className="font-semibold text-lg text-slate-900 dark:text-white">{edu.degree}</h4>
                        <p className="text-blue-600 font-medium">{edu.school} • {edu.year}</p>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">{edu.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Resume Download */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
