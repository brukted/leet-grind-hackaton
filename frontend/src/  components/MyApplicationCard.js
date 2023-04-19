import { Clipboard } from "phosphor-react";
import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router-dom";

export const MyApplicationCard = ({ application }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full card bg-base-100 hover:shadow-md"
      onClick={() => navigate(`/applications/${application._id}`)}
    >
      <div className="card-body">
        <h2 className="font-bold card-title text-neutral">
          {application.title}
        </h2>
        <p className="font-regular text-neutral-400">
          {application.description}
        </p>
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2 text-neutral-400">
            <div>
              Posted{" "}
              <ReactTimeAgo date={application.createdAt} locale="en-US" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
