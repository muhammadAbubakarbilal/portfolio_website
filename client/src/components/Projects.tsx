import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Github, ExternalLink, Eye, Code, Sparkles, X, Calendar, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@shared/schema";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filters = [
    { id: "all", label: "All Projects", color: "bg-blue-600" },
    { id: "cv", label: "Computer Vision", color: "bg-purple-600" },
    { id: "nlp", label: "NLP", color: "bg-green-600" },
    { id: "ml", label: "Machine Learning", color: "bg-orange-600" },
    { id: "dl", label: "Deep Learning", color: "bg-red-600" },
  ];

  const filteredProjects = projects.filter((project: Project) => {
    const matchesFilter = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch = searchTerm === "" || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "cv": return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "nlp": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "ml": return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      case "dl": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default: return "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "cv": return "Computer Vision";
      case "nlp": return "NLP";
      case "ml": return "Machine Learning";
      case "dl": return "Deep Learning";
      default: return category;
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-center space-x-2 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
                />
                <span className="text-lg font-medium text-slate-600 dark:text-slate-300">Loading Projects...</span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg"
                  >
                    <div className="animate-pulse space-y-4">
                      <div className="h-48 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                      <div className="flex space-x-2">
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Explore my latest AI/ML projects showcasing cutting-edge techniques and real-world applications.
          </p>
        </motion.div>
        
        {/* Project Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter, index) => (
            <motion.div
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 relative overflow-hidden ${
                  activeFilter === filter.id 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {filter.label}
                {activeFilter === filter.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-blue-600 rounded-full"
                    style={{ zIndex: -1 }}
                  />
                )}
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </motion.div>
        
        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project: Project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white dark:bg-slate-800 border-none shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl ?? undefined}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-white/90 dark:bg-slate-900/90 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </motion.a>
                    )}
                    {project.projectUrl && (
                      <motion.a
                        href={project.projectUrl ?? undefined}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-white/90 dark:bg-slate-900/90 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <Badge className={`px-3 py-1 text-sm font-medium ${getCategoryColor(project.category)}`}>
                      {getCategoryLabel(project.category)}
                    </Badge>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                      >
                        <Badge variant="secondary" className="text-xs hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <motion.button
                      onClick={() => openProjectModal(project)}
                      whileHover={{ x: 5 }}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View Project
                    </motion.button>
                    <div className="flex space-x-2">
                      <motion.a
                        href={project.githubUrl ?? undefined}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </motion.a>
                      <motion.a
                        href={project.projectUrl ?? undefined}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              No projects found matching your search criteria.
            </p>
          </motion.div>
        )}

        {/* Project Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedProject?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className={`px-3 py-1 ${getCategoryColor(selectedProject.category)}`}>
                      {getCategoryLabel(selectedProject.category)}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                      <li>Advanced AI/ML algorithms implementation</li>
                      <li>Real-time data processing and analysis</li>
                      <li>Responsive and intuitive user interface</li>
                      <li>Scalable architecture and performance optimization</li>
                      <li>Integration with modern development tools</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="hover:bg-blue-100 dark:hover:bg-blue-900/20">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                      <div className="text-sm text-slate-500 dark:text-slate-400">Duration</div>
                      <div className="font-semibold">3-6 months</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                      <div className="text-sm text-slate-500 dark:text-slate-400">Rating</div>
                      <div className="font-semibold">4.8/5</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
                      <div className="text-sm text-slate-500 dark:text-slate-400">Team Size</div>
                      <div className="font-semibold">2-4 people</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <Button asChild className="flex-1">
                      <a href={selectedProject.projectUrl ?? undefined} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <a href={selectedProject.githubUrl ?? undefined} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Source Code
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
