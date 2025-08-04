import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';

const HeroAdmin: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [title, setTitle] = useState('Software Engineer');
  const [bio, setBio] = useState('A passionate software engineer with a focus on web development.');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [github, setGithub] = useState('https://github.com/johndoe');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/johndoe');
  const [twitter, setTwitter] = useState('https://twitter.com/johndoe');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to update hero section data
    console.log({
      name, title, bio, profileImage, github, linkedin, twitter, email
    });
    alert('Hero section updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Manage Hero Section</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">Bio:</label>
            <textarea
              id="bio"
              rows={5}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image:</label>
            <ImageUploader onImageUpload={setProfileImage} currentImage={profileImage} />
          </div>
          <div>
            <label htmlFor="github" className="block text-gray-700 text-sm font-bold mb-2">GitHub Link:</label>
            <input
              type="url"
              id="github"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="linkedin" className="block text-gray-700 text-sm font-bold mb-2">LinkedIn Link:</label>
            <input
              type="url"
              id="linkedin"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="twitter" className="block text-gray-700 text-sm font-bold mb-2">Twitter Link:</label>
            <input
              type="url"
              id="twitter"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address:</label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroAdmin;