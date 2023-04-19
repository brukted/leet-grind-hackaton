import React, { useState } from "react";
import IdeaCard from "../components/IdeaCard";

const Home = () => {
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      author: { name: "John Doe", id: "1" },
      tags: ["web development", "React"],
      description:
        "Looking for a developer to collaborate with on a web development project using React.",
      githubLink: "https://github.com/johndoe/my-project",
    },
    {
      id: 2,
      author: { name: "Jane Smith", id: "2" },
      tags: ["mobile app", "Flutter"],
      description:
        "I'm looking for a collaborator to help me build a mobile app using Flutter. Previous experience with the framework preferred.",
      githubLink: "https://github.com/janesmith/my-app",
    },
    // add more ideas here
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([
    "web development",
    "mobile app",
    "React",
    "Flutter",
  ]);

  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagDeselect = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredIdeas = ideas.filter((idea) => {
    // Filter by search value
    if (
      !searchValue ||
      idea.description.toLowerCase().includes(searchValue.toLowerCase())
    ) {
      // Filter by selected tags
      return selectedTags.every((tag) => idea.tags.includes(tag));
    }
    return false;
  });

  return (
    <div class="p-4 space-y-4">
      <h2 class="text-2xl font-bold">Browse Ideas</h2>
      <div class="w-full max-w-md">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search by description"
          class="w-full p-2 mb-4 border-2 border-gray-200 rounded-lg"
        />
        <div class="flex flex-wrap mb-4">
          {availableTags.map((tag) => (
            <div
              key={tag}
              class={`bg-gray-200 px-2 py-1 rounded-full mr-2 mb-2 cursor-pointer ${
                selectedTags.includes(tag)
                  ? "bg-primary text-white"
                  : "text-gray-700"
              }`}
              onClick={() => handleTagSelect(tag)}
            >
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                {tag}
                {selectedTags.includes(tag) && (
                  <button
                    type="button"
                    class="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
                    onClick={() => handleTagDeselect(tag)}
                  >
                    <span class="sr-only">Remove {tag}</span>
                    <svg
                      class="h-2 w-2"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 8 8"
                    >
                      <path stroke-linecap="round" d="M1 1l6 6M1 7l6-6" />
                    </svg>
                  </button>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
};

export default Home;
