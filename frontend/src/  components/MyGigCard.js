import { Clipboard } from "phosphor-react";
import ReactTimeAgo from 'react-time-ago';
import { useNavigate } from "react-router-dom";


export const MyGigCard = ({ gig }) => {
    const navigate = useNavigate();
    return (
        <div className="w-full card bg-base-100 hover:shadow-md" onClick={() => navigate(`/gigs/${gig._id}`)}>
            <div className="card-body">
                <h2 className="font-bold card-title text-neutral">{gig.title}</h2>
                <p className="font-regular text-neutral-400">{gig.description}</p>
                <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2 text-neutral-400">
                        <Clipboard size={20} />
                        <span>{gig.applications.length}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400">
                        <div>
                            Posted <ReactTimeAgo date={gig.createdAt} locale="en-US" />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};