import React, { useEffect, useState } from "react";
import IdeaCard from "../components/IdeaCard";
import { ideasState } from "../../../recoil_state";
import { useRecoilState } from "recoil";
import { getGigs, getIdeaGigs } from "../../../services/gigService";
import { getAllIdeas } from "../../../services/ideaService";

const Home = () => {
  const [ideas, setIdeas] = useRecoilState(ideasState);

  useEffect(() => {
    getGigs().then((response) => {
      console.log("Response: ", response);
      const tags = new Set();
      const results = response.map((val) => {
        val.tags.forEach((element) => {
          tags.add(element);
        });

        return {
          id: val._id,
          title: val.title,
          author: val.title,
          tags: val.tags,
          description: val.description,
          githubLink: val.ideaModel.github,
        };
      });
      setIdeas(results || []);
      setAvailableTags(Array.from(tags));
    });
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

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
                    class="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
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
