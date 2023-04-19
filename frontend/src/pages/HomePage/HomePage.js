import React, { useState } from "react";
import { House, Clipboard, List, User, SignOut } from "phosphor-react";
import Home from "./TabPages/Home";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const TabItem = ({ tabName, Icon }) => {
    const isActive = activeTab === tabName;

    return (
      <button
        className={`flex items-center justify-start w-full h-12 px-4 transition-colors duration-200 rounded-none focus:outline-none ${
          isActive
            ? "text-white bg-primary"
            : "text-gray-500 hover:text-white hover:bg-secondary"
        }`}
        onClick={() => handleTabClick(tabName)}
      >
        <Icon
          size={isActive ? 28 : 24}
          weight={isActive ? "bold" : "regular"}
        />
        <span className="ml-4 text-sm font-medium">{tabName}</span>
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col h-screen py-4 bg-white border-r border-gray-200 w-60">
        <div className="px-4">
          <h1 className="text-lg font-bold">Project Partner Platform</h1>
        </div>
        <nav className="flex-1 mt-8 space-y-2">
          <TabItem tabName="Home" Icon={House} />
          <TabItem tabName="Applications" Icon={Clipboard} />
          <TabItem tabName="My Postings" Icon={List} />
          <TabItem tabName="Profile" Icon={User} />
        </nav>
        <button className="flex items-center justify-start w-full h-12 px-4 mt-4 text-red-500 rounded-none hover:text-white hover:bg-red-500 focus:outline-none">
          <SignOut size={20} />
          <span className="ml-4 text-sm font-medium">Sign Out</span>
        </button>
      </div>
      <main className="flex-1">
        {activeTab === "Home" && <Home />}
        {/* {activeTab === "Applications" && <Applications />}
        {activeTab === "My Postings" && <MyPostings />}
        {activeTab === "Profile" && <Profile />} */}
      </main>
    </div>
  );
};

export default HomePage;