import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';

interface ProjectData {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  image: string | null;
}

const ProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectData>({
    title: '',
    description: '',
    techStack: [],
    githubLink: '',
    liveLink: '',
    image: null,
  });
  const [techInput, setTechInput] = useState('');
  const [activeTab, setActiveTab] = useState('details'); // 'details', 'media', 'links'

  useEffect(() => {
    if (id) {
      // Simulate fetching existing project data
      const dummyProject = {
        title: `Project ${id}`,
        description: `Description for Project ${id}.`,
        techStack: ['React', 'Node.js'],
        githubLink: 'https://github.com/dummy',
        liveLink: 'https://live.dummy',
        image: null,
      };
      setFormData(dummyProject);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTechAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && techInput.trim() !== '') {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleTechRemove = (techToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((tech) => tech !== techToRemove),
    }));
  };

  const handleImageUpload = (imageUrl: string | null) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to save project data
    console.log('Saving project:', formData);
    alert(`Project ${id ? 'updated' : 'added'} successfully!`);
    navigate('/admin/projects');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
              <input
                type="text"
                id="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
              <textarea
                id="description"
                rows={5}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="techStack" className="block text-gray-700 text-sm font-bold mb-2">Tech Stack (Press Enter to add):</label>
              <input
                type="text"
                id="techStackInput"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechAdd}
              />
              <div className="flex flex-wrap gap-2">
                {formData.techStack.map((tech, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {tech}
                    <button type="button" onClick={() => handleTechRemove(tech)} className="ml-2 -mr-0.5 h-4 w-4 flex items-center justify-center rounded-full hover:bg-blue-200">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      case 'media':
        return (
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Project Image:</label>
            <ImageUploader onImageUpload={handleImageUpload} currentImage={formData.image} />
          </div>
        );
      case 'links':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="githubLink" className="block text-gray-700 text-sm font-bold mb-2">GitHub Link:</label>
              <input
                type="url"
                id="githubLink"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.githubLink}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="liveLink" className="block text-gray-700 text-sm font-bold mb-2">Live Link:</label>
              <input
                type="url"
                id="liveLink"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.liveLink}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center">{id ? 'Edit Project' : 'Add New Project'}</h2>
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`${activeTab === 'details' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`${activeTab === 'media' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Media
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('links')}
              className={`${activeTab === 'links' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Links
            </button>
          </nav>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderTabContent()}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {id ? 'Update Project' : 'Add Project'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;