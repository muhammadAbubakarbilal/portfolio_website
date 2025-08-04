import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd';

interface Project {
  id: string;
  title: string;
  techStack: string[];
}

const ProjectsAdmin: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', title: 'AI Portfolio Builder', techStack: ['React', 'TypeScript', 'Tailwind CSS'] },
    { id: '2', title: 'E-commerce Platform', techStack: ['Next.js', 'Node.js', 'MongoDB'] },
    { id: '3', title: 'Mobile Game', techStack: ['Unity', 'C#'] },
  ]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedProjects = Array.from(projects);
    const [removed] = reorderedProjects.splice(result.source.index, 1);
    reorderedProjects.splice(result.destination.index, 0, removed);

    setProjects(reorderedProjects);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Manage Projects</h2>
        <div className="flex justify-end mb-6">
          <Link
            to="/admin/projects/new"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add New Project
          </Link>
        </div>
        <div className="overflow-x-auto">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="projects-table">
              {(provided: DroppableProvided) => (
                <table {...provided.droppableProps} ref={provided.innerRef} className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Title</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Tech Stack</th>
                      <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, index) => (
                      <Draggable key={project.id} draggableId={project.id} index={index}>
                        {(provided: DraggableProvided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <td className="py-2 px-4 border-b border-gray-200">{project.title}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{project.techStack.join(', ')}</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              <Link
                                to={`/admin/projects/edit/${project.id}`}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs mr-2"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDelete(project.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );}

export default ProjectsAdmin;