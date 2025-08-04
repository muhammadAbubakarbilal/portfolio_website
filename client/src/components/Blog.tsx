import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Calendar, Clock, BookOpen, TrendingUp, Tag, X, Share2, ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogPost } from "@shared/schema";

export function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  const openBlogModal = (post: BlogPost) => {
    setSelectedPost(post);
    setIsBlogModalOpen(true);
  };

  const closeBlogModal = () => {
    setIsBlogModalOpen(false);
    setSelectedPost(null);
  };

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const filteredPosts = posts.filter((post: BlogPost) => {
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTagColor = (tag: string) => {
    const colors = {
      "Deep Learning": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "NLP": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "Computer Vision": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "MLOps": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      "Optimization": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      "DevOps": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    };
    return colors[tag as keyof typeof colors] || "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400";
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-center space-x-2 mb-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-8 h-8 text-blue-600"
                >
                  <BookOpen className="w-full h-full" />
                </motion.div>
                <span className="text-lg font-medium text-slate-600 dark:text-slate-300">Loading Articles...</span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 shadow-lg"
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
    <section id="blog" className="py-20 bg-white dark:bg-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
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
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">Latest Articles</h2>
          </div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Insights and tutorials on AI/ML, sharing knowledge and experiences from the field.
          </p>
        </motion.div>
        
        {/* Blog Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post: BlogPost, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-slate-50 dark:bg-slate-900 border-none hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/90 dark:bg-slate-900/90 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(post.createdAt!)}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    <a href="#">{post.title}</a>
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, tagIndex) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: tagIndex * 0.1 }}
                        >
                          <Badge className={`text-xs ${getTagColor(tag)} hover:scale-110 transition-transform duration-200`}>
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      onClick={() => openBlogModal(post)}
                      whileHover={{ x: 5 }}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      Read More
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              No articles found matching your search criteria.
            </p>
          </motion.div>
        )}
        
        {/* View All Articles Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-semibold relative overflow-hidden group">
              <span className="relative z-10 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                View All Articles
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

        {/* Blog Post Detail Modal */}
        <Dialog open={isBlogModalOpen} onOpenChange={setIsBlogModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                {selectedPost?.title}
              </DialogTitle>
            </DialogHeader>
            
            {selectedPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={selectedPost.imageUrl} 
                    alt={selectedPost.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(selectedPost.createdAt!)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{selectedPost.readTime} min read</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="h-4 w-4" />
                    <span>42</span>
                    <MessageCircle className="h-4 w-4 ml-2" />
                    <span>12</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag, index) => (
                    <Badge key={index} className={`text-xs ${getTagColor(tag)}`}>
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {selectedPost.description}
                  </p>
                  
                  <div className="space-y-4 text-slate-700 dark:text-slate-300">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Introduction</h3>
                    <p>
                      In this comprehensive guide, we'll explore the fascinating world of artificial intelligence and machine learning. 
                      This article dives deep into the core concepts, practical implementations, and real-world applications that are 
                      shaping the future of technology.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Key Concepts</h3>
                    <p>
                      Understanding the fundamental principles is crucial for anyone looking to excel in AI/ML. We'll cover:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Neural network architectures and their applications</li>
                      <li>Data preprocessing and feature engineering techniques</li>
                      <li>Model training, validation, and optimization strategies</li>
                      <li>Deployment considerations and production best practices</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Practical Implementation</h3>
                    <p>
                      Let's look at some code examples and practical implementations that demonstrate these concepts in action. 
                      The following sections will provide you with hands-on experience and actionable insights.
                    </p>
                    
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                      <code className="text-sm">
                        # Example code snippet
                        <br />
                        import tensorflow as tf
                        <br />
                        model = tf.keras.Sequential([...])
                      </code>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Conclusion</h3>
                    <p>
                      The future of AI/ML is incredibly exciting, with new breakthroughs happening regularly. By understanding 
                      these fundamental concepts and staying updated with the latest developments, you'll be well-equipped to 
                      tackle the challenges and opportunities that lie ahead.
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Like (42)
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Comment (12)
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
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
