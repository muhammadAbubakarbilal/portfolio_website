import { users, projects, blogPosts, contactMessages, type User, type InsertUser, type Project, type InsertProject, type BlogPost, type InsertBlogPost, type ContactMessage, type InsertContactMessage } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private blogPosts: Map<number, BlogPost>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentBlogPostId: number;
  private currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.blogPosts = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentBlogPostId = 1;
    this.currentContactMessageId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize projects
    const sampleProjects: InsertProject[] = [
      {
        title: "AI-Powered Task Management App",
        description: "Full-stack React Native app with AI-powered task prioritization and smart scheduling using machine learning.",
        category: "cv",
        technologies: ["React Native", "Firebase", "PyTorch", "FastAPI"],
        imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        projectUrl: "#",
        githubUrl: "#",
        featured: true
      },
      {
        title: "E-commerce Platform with AI",
        description: "Full-stack e-commerce web application with AI-powered product recommendations and inventory management.",
        category: "ml",
        technologies: ["Next.js", "TailwindCSS", "MongoDB", "TensorFlow"],
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        projectUrl: "#",
        githubUrl: "#",
        featured: true
      },
      {
        title: "Real-time Object Detection System",
        description: "Computer vision system for real-time object detection and tracking using YOLO and OpenCV with web interface.",
        category: "cv",
        technologies: ["PyTorch", "OpenCV", "React.js", "WebSocket"],
        imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        projectUrl: "#",
        githubUrl: "#",
        featured: true
      },
      {
        title: "RAG-based Chatbot System",
        description: "Intelligent chatbot using RAG pipeline with HuggingFace transformers for document-based Q&A.",
        category: "nlp",
        technologies: ["HuggingFace", "LangChain", "FastAPI", "React.js"],
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        projectUrl: "#",
        githubUrl: "#",
        featured: true
      },
      {
        title: "Smart Home IoT Dashboard",
        description: "React-based dashboard for IoT device management with real-time monitoring and ML-powered automation.",
        category: "ml",
        technologies: ["React.js", "Express.js", "MongoDB", "IoT Sensors"],
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        projectUrl: "#",
        githubUrl: "#",
        featured: false
      },
      {
        title: "Flutter Fitness Tracker",
        description: "Cross-platform mobile app with AI-powered workout recommendations and progress tracking.",
        category: "dl",
        technologies: ["Flutter", "Firebase", "TensorFlow Lite", "Health APIs"],
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        projectUrl: "#",
        githubUrl: "#",
        featured: false
      }
    ];

    sampleProjects.forEach(project => {
      this.createProject(project);
    });

    // Initialize blog posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "Understanding Transformer Architectures",
        description: "A deep dive into the transformer architecture that revolutionized natural language processing and beyond.",
        content: "Full article content here...",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        tags: ["Deep Learning", "NLP"],
        readTime: 5,
        published: true
      },
      {
        title: "Optimizing Computer Vision Models",
        description: "Best practices for training efficient computer vision models with limited computational resources.",
        content: "Full article content here...",
        imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        tags: ["Computer Vision", "Optimization"],
        readTime: 8,
        published: true
      },
      {
        title: "MLOps: From Development to Production",
        description: "A comprehensive guide to building robust MLOps pipelines for scalable machine learning deployment.",
        content: "Full article content here...",
        imageUrl: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        tags: ["MLOps", "DevOps"],
        readTime: 12,
        published: true
      }
    ];

    sampleBlogPosts.forEach(post => {
      this.createBlogPost(post);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(project => project.category === category);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = { 
      ...insertProject, 
      id,
      projectUrl: insertProject.projectUrl || null,
      githubUrl: insertProject.githubUrl || null,
      featured: insertProject.featured || false,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(post => post.published);
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id,
      published: insertBlogPost.published || true,
      createdAt: new Date()
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id,
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
}

export const storage = new MemStorage();
