import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ideasState } from "../../recoil_state";
import { useNavigate, useParams } from "react-router-dom";
import IdeaCard from "../HomePage/components/IdeaCard";

const ApplicationApply = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [ideas, setIdeas] = useRecoilState(ideasState);
  const [idea, setIdea] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const result = ideas.find((val) => val.id == id);
    setIdea(result || {});
  }, [ideas, id]);

  const handleMessageChange = (event) => setMessage(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: send form data to server
  };

  const handleGoBack = () => {
    navigate(`/home`);
  };

  return (
    <form class="max-w-2xl mx-auto mt-8" onSubmit={handleSubmit}>
      <a
        href="#"
        class="flex items-center text-gray-500 hover:text-gray-700"
        onClick={handleGoBack}
      >
        <svg
          class="h-5 w-5 mr-1"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back
      </a>
      <br></br>
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold">
            {idea && idea.author && idea.author.name}
          </div>
        </div>
        <div className="mb-4">{idea.description}</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {idea &&
            idea.tags &&
            idea.tags.map((tag) => (
              <button
                key={tag}
                id={tag}
                className="px-2 py-1 mr-2 border rounded-lg"
              >
                {tag}
              </button>
            ))}
        </div>
        <div className="flex items-center justify-between">
          <a
            href={idea.githubLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            View on Github
          </a>
        </div>
      </div>
      <br />
      <div class="pb-4">
        <label
          for="message"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          rows="3"
          value={message}
          onChange={handleMessageChange}
        ></textarea>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 bg-green-500 border border-transparent rounded-md font-semibold text-white tracking-widest hover:bg-green-600 active:bg-green-700 focus:outline-none focus:border-green-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default ApplicationApply;
