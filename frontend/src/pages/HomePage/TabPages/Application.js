import React, { useState } from "react";
import { Clipboard, Clock, CheckCircle, XCircle } from "phosphor-react";
import TabItem from "../components/TabItem";
import ApplicationTableRow from "../components/ApplicationTableRow.js";

const Applications = () => {
  const [activeTab, setActiveTab] = useState("Pending");

  const [applications, setApplications] = useState([
    {
      name: "John Doe",
      date: "April 17, 2023",
      status: "Pending",
    },
    {
      name: "Jane Smith",
      date: "April 15, 2023",
      status: "Pending",
    },
    {
      name: "Alex Johnson",
      date: "April 12, 2023",
      status: "Accepted",
    },
    {
      name: "Sarah Lee",
      date: "April 10, 2023",
      status: "Accepted",
    },
    {
      name: "David Kim",
      date: "April 7, 2023",
      status: "Accepted",
    },
    {
      name: "Olivia Brown",
      date: "April 5, 2023",
      status: "Accepted",
    },
    {
      name: "Emily Wilson",
      date: "April 2, 2023",
      status: "Accepted",
    },
    {
      name: "Peter Parker",
      date: "March 30, 2023",
      status: "Rejected",
    },
  ]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const SubNavItem = ({ tabName, Icon, count }) => {
    const isActive = activeTab === tabName;

    return (
      <button
        className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-none transition-colors duration-200 ${
          isActive
            ? "text-white bg-primary"
            : "text-gray-500 hover:text-white hover:bg-secondary"
        }`}
        onClick={() => handleTabClick(tabName)}
      >
        <Icon
          size={isActive ? 28 : 24}
          weight={isActive ? "bold" : "regular"}
          className="mr-2"
        />
        <span>{tabName}</span>
        {count > 0 && <span className="ml-2">{`(${count})`}</span>}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-8">
        <h2 className="text-xl font-bold">Applications</h2>
      </div>
      <nav className="flex mt-8 border-b border-gray-300">
        <SubNavItem tabName="Pending" Icon={Clock} count={2} />
        <SubNavItem tabName="Accepted" Icon={CheckCircle} count={5} />
        <SubNavItem tabName="Rejected" Icon={XCircle} count={1} />
      </nav>
      <div className="flex-1 px-4 py-8 overflow-auto">
        {activeTab === "Pending" && (
          <ApplicationTableRow
            rows={applications.filter((val) => val.status === "Pending")}
          />
        )}
        {activeTab === "Accepted" && (
          <ApplicationTableRow
            rows={applications.filter((val) => val.status === "Accepted")}
          />
        )}
        {activeTab === "Rejected" && (
          <ApplicationTableRow
            rows={applications.filter((val) => val.status === "Rejected")}
          />
        )}
      </div>
    </div>
  );
};

export default Applications;
