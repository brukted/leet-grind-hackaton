import React, { useEffect, useState } from "react";
import { Clipboard, Clock, CheckCircle, XCircle } from "phosphor-react";
import TabItem from "../components/TabItem";
import ApplicationTableRow from "../components/ApplicationTableRow.js";
import { MyApplicationCard } from "../../../  components/MyApplicationCard";
import { useRecoilState } from "recoil";
import { myApplicationsState } from "../../../recoil_state";
import { getMyApplications } from "../../../services/applicationService";

const Applications = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [applications, setApplications] = useRecoilState(myApplicationsState);

  useEffect(() => {
    getMyApplications().then((response) => {
      console.log("My Applications: ", response);
      const results = response.map((val) => {
        return {
          id: val._id,
          title: val.gigModel.title,
          note: val.note,
          createdAt: val.createdAt,
          status: val.status,
          description: val.gigModel.description,
          tags: val.gigModel.tags,
        };
      });
      setApplications(results || []);
    });
  }, []);

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
        <h2 className="text-xl font-bold">My Applications </h2>
      </div>
      <nav className="flex mt-8 border-b border-gray-300">
        <SubNavItem tabName="Pending" Icon={Clock} count={""} />
        <SubNavItem tabName="Accepted" Icon={CheckCircle} count={""} />
        <SubNavItem tabName="Rejected" Icon={XCircle} count={""} />
      </nav>
      <div className="flex-1 px-4 py-8 overflow-auto">
        {activeTab === "Pending" && (
          <div class="grid grid-cols-1 gap-4">
            {applications
              .filter(
                (val) => val.status.toLowerCase() === "Pending".toLowerCase()
              )
              .map((application) => (
                <MyApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
          </div>
        )}
        {activeTab === "Accepted" && (
          <div class="grid grid-cols-1 gap-4">
            {applications
              .filter(
                (val) => val.status.toLowerCase() === "Accepted".toLowerCase()
              )
              .map((application) => (
                <MyApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
          </div>
        )}
        {activeTab === "Rejected" && (
          <div class="grid grid-cols-1 gap-4">
            {applications
              .filter(
                (val) => val.status.toLowerCase() === "Rejected".toLowerCase()
              )
              .map((application) => (
                <MyApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
