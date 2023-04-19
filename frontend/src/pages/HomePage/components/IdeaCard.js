import React from "react";
import { Heart, Eye } from "phosphor-react";

const IdeaCard = ({ idea }) => {
  const { author, tags, description, githubLink, id } = idea;

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-bold">{author.name}</div>
        <div className="flex items-center space-x-2">
          <button className="p-2 transition-colors duration-200 bg-gray-100 rounded-full hover:bg-gray-200">
            <Heart size={20} />
          </button>
          <button className="p-2 transition-colors duration-200 bg-gray-100 rounded-full hover:bg-gray-200">
            <Eye size={20} />
          </button>
        </div>
      </div>
      <div className="mb-4">{description}</div>
      <div className="flex flex-wrap mb-4 gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            id={tag}
            className="py-1 px-2 mr-2 rounded-lg border"
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <a
          href={githubLink}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          View on Github
        </a>
        <button className="px-4 py-2 text-white transition-colors duration-200 rounded-lg bg-primary hover:bg-secondary">
          Apply
        </button>
      </div>
    </div>
  );
};

export default IdeaCard;
