import React, { useEffect, useState } from "react";
import IdeaCard from "../components/IdeaCard";
import { ideasState } from "../../../recoil_state";
import { useRecoilState } from "recoil";
import { getGigs, getIdeaGigs } from "../../../services/gigService";
import { getAllIdeas } from "../../../services/ideaService";

const Home = () => {
  const [ideas, setIdeas] = useRecoilState(ideasState);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getGigs().then((response) => {
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
      setLoading(false);
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

  const totalIdeas = filteredIdeas.length;
  const totalPages = Math.ceil(totalIdeas / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleIdeas = filteredIdeas.slice(startIndex, endIndex);

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
      {isLoading ? (
        <div role="status" class="flex justify-center items-center space-x-2">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          <div class="flex justify-center items-center flex-col md:flex-row space-y-4 md:space-x-4">
            <div class="flex justify-center items-center space-x-2">
              <div class="flex items-center">
                <span class="mr-2">Page</span>
                <input
                  type="number"
                  value={page}
                  onChange={(e) => setPage(Number(e.target.value))}
                  min="1"
                  max={totalPages}
                  class="w-16 p-2 border-2 border-gray-200 rounded-lg"
                />
                <span class="ml-2">of {totalPages}</span>
              </div>

              <button
                class="ml-4 px-4 py-2 text-white bg-primary rounded-lg shadow-lg hover:bg-primary-dark transition-colors duration-300"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
              <button
                class="ml-2 px-4 py-2 text-white bg-primary rounded-lg shadow-lg hover:bg-primary-dark transition-colors duration-300"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>

          <br></br>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>

          <br></br>
          <div class="flex justify-center items-center flex-col md:flex-row space-y-4 md:space-x-4">
            <div class="flex justify-center items-center space-x-2">
              <div class="flex items-center">
                <span class="mr-2">Page</span>
                <input
                  type="number"
                  value={page}
                  onChange={(e) => setPage(Number(e.target.value))}
                  min="1"
                  max={totalPages}
                  class="w-16 p-2 border-2 border-gray-200 rounded-lg"
                />
                <span class="ml-2">of {totalPages}</span>
              </div>
              <button
                class="ml-4 px-4 py-2 text-white bg-primary rounded-lg shadow-lg hover:bg-primary-dark transition-colors duration-300"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
              <button
                class="ml-2 px-4 py-2 text-white bg-primary rounded-lg shadow-lg hover:bg-primary-dark transition-colors duration-300"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
