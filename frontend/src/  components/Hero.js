import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex items-center justify-center py-20 bg-gray-100">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col items-start justify-center">
            <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900">
              Find Your Perfect Project Partner
            </h1>
            <p className="mb-8 text-lg text-gray-700">
              Join our platform and connect with other professionals to
              collaborate on your next project.
            </p>
            <Link
              to="/sign-up"
              className="inline-block px-8 py-3 font-bold text-white bg-blue-900 rounded-full hover:bg-blue-800"
            >
              Join Now
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/images/hero-image.png"
              alt="Collaboration"
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
