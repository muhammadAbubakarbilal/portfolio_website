import React, { useState } from 'react';

interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string; // Placeholder for icon, could be a path or a class name
}

const SkillsAdmin: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: 'React', category: 'Frontend', icon: 'react-icon' },
    { id: 2, name: 'TypeScript', category: 'Programming Language', icon: 'typescript-icon' },
    { id: 3, name: 'Tailwind CSS', category: 'Styling', icon: 'tailwind-icon' },
  ]);
  const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: '',
    icon: '',
  });
  const [editedSkill, setEditedSkill] = useState<Skill | null>(null);

  const handleNewSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSkill({ ...newSkill, [e.target.id]: e.target.value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedSkill) {
      setEditedSkill({ ...editedSkill, [e.target.id]: e.target.value });
    }
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.name && newSkill.category) {
      setSkills([...skills, { ...newSkill, id: skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1 }]);
      setNewSkill({ name: '', category: '', icon: '' });
    }
  };

  const handleEditClick = (skill: Skill) => {
    setEditingSkillId(skill.id);
    setEditedSkill({ ...skill });
  };

  const handleSaveClick = (id: number) => {
    if (editedSkill) {
      setSkills(skills.map((skill) => (skill.id === id ? editedSkill : skill)));
      setEditingSkillId(null);
      setEditedSkill(null);
    }
  };

  const handleCancelClick = () => {
    setEditingSkillId(null);
    setEditedSkill(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter((skill) => skill.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Manage Skills</h2>

        <form onSubmit={handleAddSkill} className="space-y-4 mb-8 p-6 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Add New Skill</h3>
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Skill Name:</label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newSkill.name}
              onChange={handleNewSkillChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
            <input
              type="text"
              id="category"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newSkill.category}
              onChange={handleNewSkillChange}
              required
            />
          </div>
          <div>
            <label htmlFor="icon" className="block text-gray-700 text-sm font-bold mb-2">Icon (e.g., 'react-icon'):</label>
            <input
              type="text"
              id="icon"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={newSkill.icon}
              onChange={handleNewSkillChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Skill
          </button>
        </form>

        <h3 className="text-xl font-semibold mb-4">Existing Skills</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Icon</th>
                <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  {editingSkillId === skill.id ? (
                    <>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <input
                          type="text"
                          id="name"
                          value={editedSkill?.name || ''}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <input
                          type="text"
                          id="category"
                          value={editedSkill?.category || ''}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <input
                          type="text"
                          id="icon"
                          value={editedSkill?.icon || ''}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <button
                          onClick={() => handleSaveClick(skill.id)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-xs mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelClick}
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4 border-b border-gray-200">{skill.name}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{skill.category}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{skill.icon}</td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <button
                          onClick={() => handleEditClick(skill)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkillsAdmin;