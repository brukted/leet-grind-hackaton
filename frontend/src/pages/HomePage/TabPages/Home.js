import React, { useEffect, useState } from "react";
import IdeaCard from "../components/IdeaCard";
import { ideasState } from "../../../recoil_state";
import { useRecoilState } from "recoil";

const Home = () => {
  const [ideas, setIdeas] = useRecoilState(ideasState);

  useEffect(()=>{
    setIdeas([
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
      {
        id: 3,
        author: { name: "Tom Wilson", id: "3" },
        tags: ["data analysis", "Python"],
        description:
          "Looking for a data analyst to help me analyze and visualize data using Python.",
        githubLink: "https://github.com/tomwilson/data-analysis",
      },
      {
        id: 4,
        author: { name: "Emily Lee", id: "4" },
        tags: ["game development", "Unity"],
        description:
          "I'm looking for a collaborator to help me create a game using Unity. Experience with game development preferred.",
        githubLink: "https://github.com/emilylee/my-game",
      },
      {
        id: 5,
        author: { name: "Alex Brown", id: "5" },
        tags: ["UI design", "Figma"],
        description:
          "Looking for a UI designer to help me design a web app using Figma.",
        githubLink: "https://github.com/alexbrown/my-app",
      },
      {
        id: 6,
        author: { name: "David Kim", id: "6" },
        tags: ["machine learning", "Python"],
        description:
          "Looking for a collaborator to help me build a machine learning model using Python.",
        githubLink: "https://github.com/davidkim/my-model",
      },
      {
        id: 7,
        author: { name: "Olivia Lee", id: "7" },
        tags: ["front-end development", "Vue.js"],
        description:
          "I'm looking for a collaborator to help me build a front-end using Vue.js. Previous experience with the framework preferred.",
        githubLink: "https://github.com/oliviale/my-app",
      },
      {
        id: 8,
        author: { name: "Henry Park", id: "8" },
        tags: ["back-end development", "Node.js"],
        description:
          "Looking for a collaborator to help me build a back-end using Node.js.",
        githubLink: "https://github.com/henrypark/my-app",
      },
      {
        id: 9,
        author: { name: "Sarah Johnson", id: "9" },
        tags: ["web development", "Ruby on Rails"],
        description:
          "I'm looking for a collaborator to help me build a web app using Ruby on Rails. Previous experience with the framework preferred.",
        githubLink: "https://github.com/sarahj/my-app",
      },
      {
        id: 10,
        author: { name: "Michael Brown", id: "10" },
        tags: ["mobile app", "React Native"],
        description:
          "Looking for a collaborator to help me build a mobile app using React Native. Previous experience with the framework preferred.",
        githubLink: "https://github.com/michaelb/my-app",
      },

      // add more ideas here
    ]);
  },[]);

  const [searchValue, setSearchValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([
    "mobile app",
    "Flutter",
    "data analysis",
    "game development",
    "Unity",
    "UI design",
    "Figma",
    "machine learning",
    "Python",
    "front-end development",
    "Vue.js",
    "back-end development",
    "Node.js",
    "web development",
    "Ruby on Rails",
    "React Native",
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
      <div class="w-full">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search by description"
          class="w-full p-2 mb-4 border-2 border-gray-200 rounded-lg"
        />
        <div class="flex flex-wrap mb-8 w-full">
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
