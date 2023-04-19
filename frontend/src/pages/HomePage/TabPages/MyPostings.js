import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { MyGigCard } from "../../../  components/MyGigCard";
import { myGigsState } from "../../../recoil_state";

export const MyPostings = () => {
    const navigate = useNavigate();
    const [myGigs, setMyGigs] = useRecoilState(myGigsState);
    const [loading, setLoading] = useState(true);

    const [searchValue, setSearchValue] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const navigateToCreateGig = () => {
        navigate("/create-gig");
    };

    useEffect(() => {
        // Fetch my gigs
        axios.get("/me/gigs").then((response) => {
            setMyGigs(response.data.data);
            setLoading(false);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <div class="p-4 space-y-4 min-h-screen flex flex-col">
            <h2 class="text-2xl font-bold text-neutral">My Postings</h2>
            <div class="w-full max-w-md">
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    placeholder="Search by title or description"
                    class="w-full p-2 mb-4 border-2 border-gray-200 rounded-lg"
                />
            </div>
            {
                myGigs.length ? "" :
                    <div className="flex flex-col flex-grow justify-center items-center">
                        <div class="flex flex-col justify-center items-center w-96 h-56 border-2 border-dashed text-neutral-400 rounded-lg"
                            role="button"
                            onClick={() => navigateToCreateGig()}
                        >
                            <div class="text-neutral-400">
                                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 3a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V4a1 1 0 011-1z"
                                        clip-rule="evenodd"
                                    />
                                </svg>

                            </div>
                            <p class="text-neutral font-bold pt-5">
                                Create a new gig
                            </p>
                        </div>
                    </div>
            }

            <div class="grid grid-cols-1 gap-4">
                {myGigs.map((gig) => (
                    <MyGigCard key={gig.id} gig={gig} />
                ))}
            </div>
        </div>
    );
};