import { useEffect, useState } from "react";
import { Paperclip, CheckCircle, Check, Clock, XCircle } from "phosphor-react";
import Applications from "../HomePage/TabPages/Application";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { myApplicationsState } from "../../recoil_state";

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const [applications, setApplications] = useRecoilState(myApplicationsState);
  const [application, setApplication] = useState({});
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(`/home#Application`);
  };

  useEffect(() => {
    const result = applications.find((val) => val.id == id);
    setApplication(result || {});
  }, [applications, id]);

  return (
    <div class="max-w-2xl mx-auto mt-8">
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
      <div class="flex justify-center items-center h-screen">
        <div class="bg-white shadow-lg rounded-lg px-6 py-8 max-w-2xl">
          <h3 class="text-lg font-semibold leading-7 text-gray-900 mb-4">
            Application Details
          </h3>
          <p class="text-sm leading-6 text-gray-500 mb-8">
            Description, applied date, message used to apply, status, and author
            of the application.
          </p>
          <dl class="divide-y divide-gray-100">
            <div class="py-4">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Description
              </dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700">
                {application.description}
              </dd>
            </div>
            <div class="py-4">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Applied Date
              </dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700">
                {application.createdAt}
              </dd>
            </div>
            <div class="py-4">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Message Used to Apply
              </dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700">
                {application.note}
              </dd>
            </div>
            <div class="py-4">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Status
              </dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700 flex items-center">
                {application.status === "Pending" && <Clock size={16} />}
                {application.status === "Accepted" && (
                  <CheckCircle size={16} weight="fill" color="#10B981" />
                )}
                {application.status === "Rejected" && (
                  <XCircle size={16} weight="fill" color="#EF4444" />
                )}
                <span class="ml-2">{application.status}</span>
              </dd>
            </div>

            <div class="py-4">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Author
              </dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700">Someone</dd>
            </div>

            <div class="py-4">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                Github Link
              </dt>
              <dd class="mt-1 text-sm leading-6 text-gray-700">
                <a
                  href={application.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View on Github
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
