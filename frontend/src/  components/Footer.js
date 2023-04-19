import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-6xl px-4 py-12 mx-auto overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap justify-center -mx-5 -my-2"
          aria-label="Footer"
        >
          <div className="px-5 py-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">GitHub</span>
              {/* Github SVG */}
            </a>
          </div>

          <div className="px-5 py-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              {/* Twitter SVG */}
            </a>
          </div>

          <div className="px-5 py-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">LinkedIn</span>
              {/* LinkedIn SVG */}
            </a>
          </div>
        </nav>

        <div className="flex items-center justify-center mt-8">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} Project Partner Platform. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
