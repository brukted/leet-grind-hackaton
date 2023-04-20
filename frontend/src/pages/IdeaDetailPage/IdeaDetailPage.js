import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIdea } from "../../services/ideaService";
import ReactTimeAgo from "react-time-ago";
import { createGig, getIdeaGigs } from "../../services/gigService";
import { Dialog, Transition } from '@headlessui/react'
import { Plus, XCircle, X } from "phosphor-react";



const CreateGigForm = ({ onCreated, ideaId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: ["tag 1", "tag 2", "tag 3"],
        github: "",
    });
    const [lastTag, setLastTag] = useState("");

    const removeTag = (tag) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((t) => t !== tag),
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formData);
        if (isLoading) return;
        createGig(formData.title, formData.description, formData.tags, ideaId).then((res) => {
            console.log(res);
            onCreated(res);
        }
        ).catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4">
                <div className="sm:col-span-3">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-neutral-900">
                        Title
                    </label>
                    <div className="mt-2">
                        <input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Backend Developer with React.js experience"
                            type="text"
                            name="description"
                            id="title"
                            autoComplete="title"
                            className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-neutral-900">
                        Description
                    </label>
                    <div className="mt-2">
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Lorem ipsum dolor sit amet...."
                            type="text"
                            name="description"
                            id="description"
                            autoComplete="description"
                            className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-neutral-900">
                        Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {
                            formData.tags.map((tag, index) => (
                                <div key={index} className="inline-flex items-center px-3 py-1 font-medium text-gray-800 bg-gray-100 rounded-md text-md">
                                    <span  >
                                        {tag}
                                    </span>
                                    <X className="ps-3" size={24} onClick={() => removeTag(tag)} />
                                </div>
                            ))
                        }
                        <input
                            value={lastTag}
                            onChange={(e) => setLastTag(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    setFormData({
                                        ...formData,
                                        tags: [...formData.tags, lastTag],
                                    });
                                    setLastTag("");
                                }
                            }}
                            type="text"
                            name="region"
                            id="region"
                            className="inline w-auto rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="flex justify-end pt-4 sm:col-span-3">
                    <button className={"btn btn-primary" + (isLoading ? " loading" : "")}
                        onClick={submitForm}
                    >Create</button>
                </div>

            </div>

        </div>
    );
};


export const IdeaDetailPage = () => {
    const [showCreateGigModal, setShowCreateGigModal] = useState(false);
    const { ideaId } = useParams();
    const [idea, setIdea] = useState({});
    const [gigs, setGigs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isGigsLoading, setIsGigsLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        getIdea(ideaId).then((response) => {
            setIdea(response);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false);
        });
        getIdeaGigs(ideaId).then((response) => {
            setGigs(response);
            console.log(response);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsGigsLoading(false);
        });
    }, [ideaId]);

    const onGigCreated = (gig) => {
        setGigs([...gigs, gig]);
        setShowCreateGigModal(false);
    };


    return (
        <div className="flex flex-col w-full h-full  p-20 pt-10 overflow-scroll">
            {
                isLoading ? (
                    <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                ) : (
                    <Fragment>
                        <div className="flex items-end justify-between">
                            <div className="min-w-0 flex-1 flex flex-col">
                                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                                    {idea.title}
                                </h2>
                                <div className='flex items-center pt-3'>
                                    {
                                        idea.tags.map((tag, index) => (
                                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                                                {tag}
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                            <span>
                                Posted <ReactTimeAgo date={idea.createdAt} locale="en-US" />
                            </span>
                        </div>
                        <p className='pt-8'>
                            {idea.description}
                        </p>
                    </Fragment>
                )
            }
            <h2 className="text-2xl leading-7 text-gray-400 sm:truncate sm:tracking-tight pt-10">
                Gigs
            </h2>

            {
                isGigsLoading ? (
                    <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100 pt-4 gap-3 flex flex-col px-2">
                        <li key="create" className="btn btn-ghost flex justify-center items-center gap-x-6 p-3" onClick={() => {
                            setShowCreateGigModal(true);
                        }}>
                            <Plus weight="bold"></Plus>
                            <span>Create Gig</span>
                        </li>
                        {gigs.map((gig) => (
                            <li key={gig.id} className="flex justify-between gap-x-6 p-5 shadow-sm rounded-sm" onClick={() => {
                                navigate(`/gigs/${gig.id}`);
                            }}>
                                <div className="flex gap-x-4 flex-col">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{gig.title}</p>
                                    <p className="mt-1 text-xs leading-5 text-gray-500 max-w-4xl">{gig.description}</p>
                                </div>
                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900 capitalize">{gig.applications.length} applicants</p>
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Posted <ReactTimeAgo date={gig.createdAt} locale="en-US" />
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )
            }

            <Transition.Root show={showCreateGigModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setShowCreateGigModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-50"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-50"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="relative w-screen max-w-md pointer-events-auto">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute top-0 left-0 flex pt-4 pr-2 -ml-8 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="text-gray-500 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setShowCreateGigModal(false)}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XCircle className="w-6 h-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                    Create Gig
                                                </Dialog.Title>
                                            </div>
                                            <div className="relative flex-1 px-4 mt-6 sm:px-6">
                                                <CreateGigForm onCreated={onGigCreated} ideaId={ideaId} />
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
};