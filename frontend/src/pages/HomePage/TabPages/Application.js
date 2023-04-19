import React, { useEffect, useState } from "react";
import { Clipboard, Clock, CheckCircle, XCircle } from "phosphor-react";
import TabItem from "../components/TabItem";
import ApplicationTableRow from "../components/ApplicationTableRow.js";
import { MyApplicationCard } from "../../../  components/MyApplicationCard";
import axios from "axios";
import { useRecoilState } from "recoil";
import { myApplicationsState } from "../../../recoil_state";

const Applications = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [applications, setApplications] = useRecoilState(myApplicationsState);

  useEffect(() => {
    setApplications([
      {
        id: 1,
        title: "Software Engineer",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        createdAt: "April 17, 2023",
        status: "Pending",
        applications: [],
      },
      {
        id: 2,
        title: "Product Manager",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        createdAt: "April 15, 2023",
        status: "Pending",
        applications: [],
      },
      {
        id: 3,
        title: "Data Analyst",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        createdAt: "April 12, 2023",
        status: "Accepted",
        applications: [],
      },
      {
        id: 4,
        title: "UX Designer",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        createdAt: "April 10, 2023",
        status: "Accepted",
        applications: [],
      },
      {
        id: 5,
        title: "Marketing Specialist",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        createdAt: "April 7, 2023",
        status: "Accepted",
        applications: [],
      },
      {
        id: 6,
        title: "Business Development Manager",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        createdAt: "April 5, 2023",
        status: "Accepted",
        applications: [],
      },
      {
        id: 7,
        title: "Graphic Designer",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        createdAt: "April 2, 2023",
        status: "Accepted",
        applications: [],
      },
      {
        id: 8,
        title: "Customer Support Representative",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
        createdAt: "March 30, 2023",
        status: "Rejected",
        applications: [],
      },
    ]);
    // axios
    //   .get("/me/applications")
    //   .then((response) => {
    //     console.log("Response Applications: ", response);
    //     const result = response.data.data.map((val) => {
    //       return {
    //         title: val.gig.title,
    //         description: val.gig.description,
    //         createdAt: val.gig.createdAt,
    //         status: val.status,
    //       };
    //     });
    //     setApplications(result);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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
              .filter((val) => val.status === "Pending")
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
              .filter((val) => val.status === "Accepted")
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
              .filter((val) => val.status === "Rejected")
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
