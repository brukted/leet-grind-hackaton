import React from "react";
import { CheckCircle, Clipboard, Lock } from "phosphor-react";

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Features
          </h2>
        </div>
        <div className="mt-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <CheckCircle size={96} color="#a9f553" weight="thin" />
              <div className="mt-5">
                <h4 className="text-lg font-medium leading-6 text-gray-900">
                  Create Project Ideas
                </h4>
                <p className="mt-2 text-base text-gray-500">
                  Users can create and post their project ideas, along with
                  relevant tags, descriptions, and Github links.
                </p>
              </div>
            </div>
            <div>
              <Clipboard className="w-10 h-10 text-blue-500" />
              <div className="mt-5">
                <h4 className="text-lg font-medium leading-6 text-gray-900">
                  Collaborate on Ideas
                </h4>
                <p className="mt-2 text-base text-gray-500">
                  Users can apply to collaborate on project ideas and ideas by
                  submitting their applications, which include their details and
                  a note.
                </p>
              </div>
            </div>
            <div>
              <Lock className="w-10 h-10 text-purple-500" />
              <div className="mt-5">
                <h4 className="text-lg font-medium leading-6 text-gray-900">
                  Manage Projects and Collaborations
                </h4>
                <p className="mt-2 text-base text-gray-500">
                  Users can view and manage their applications, as well as their
                  posted project ideas and ideas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
