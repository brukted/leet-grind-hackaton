import React, { useState } from "react";
import { House, Clipboard, List, User, SignOut } from "phosphor-react";
import Home from "./TabPages/Home";
import { MyPostings } from "./TabPages/MyPostings";
import Applications from "./TabPages/Application";
import TabItem from "./components/TabItem";

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
      <div className="fixed top-0 left-0 flex flex-col h-screen py-4 bg-white border-r border-gray-200 w-60">
        <div className="px-4">
          <h1 className="text-lg font-bold">Project Partner Platform</h1>
        </div>
        <nav className="flex-1 mt-8 space-y-2">
          <TabItem
            tabName="Home"
            Icon={House}
            onClick={handleTabClick}
            isActive={activeTab === "Home"}
          />
          <TabItem
            tabName="Applications"
            Icon={Clipboard}
            onClick={handleTabClick}
            isActive={activeTab === "Applications"}
          />
          <TabItem
            tabName="My Postings"
            Icon={List}
            onClick={handleTabClick}
            isActive={activeTab === "My Postings"}
          />
          <TabItem
            tabName="Profile"
            Icon={User}
            onClick={handleTabClick}
            isActive={activeTab === "Profile"}
          />
        </nav>
        <button className="flex items-center justify-start w-full h-12 px-4 mt-4 text-red-500 rounded-none hover:text-white hover:bg-red-500 focus:outline-none">
          <SignOut size={20} />
          <span className="ml-4 text-sm font-medium">Sign Out</span>
        </button>
      </div>
      <main className="fixed top-0 bottom-0 right-0 overflow-auto left-60">
        {activeTab === "Home" && <Home />}
        {activeTab === "My Postings" && <MyPostings />}
        {activeTab === "Applications" && <Applications />}
        {/* {activeTab === "Profile" && <Profile />} */}
      </main>
    </div>
  );
};

export default HomePage;
