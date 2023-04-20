import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { Plus, XCircle, X } from "phosphor-react";
import { createIdea, getMyIdeas } from "../../../services/ideaService";
import { useRecoilState } from "recoil";
import { myIdeasState } from "../../../recoil_state";

const MyIdeaCard = ({ idea }) => {


    return (
        <div class="flex flex-col w-full  bg-white rounded-lg shadow-md">
            <div class="flex flex-row justify-between items-center w-full h-12 px-4">
                <span>{idea.title}</span>
            </div>
        </div>
    );
};

const CreateIdeaForm = ({ onCreated }) => {
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
        createIdea(formData.title, formData.description, formData.tags, formData.github).then((res) => {
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
                            placeholder="Atrons: A new way to learn"
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
                        Github
                    </label>
                    <div className="mt-2">
                        <input
                            value={formData.github}
                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                            placeholder="https://www.github.com/yourusername"
                            type="text"
                            name="region"
                            id="region"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-neutral-900">
                        Tags
                    </label>
                    <div className="mt-2 flex gap-2 flex-wrap">
                        {
                            formData.tags.map((tag, index) => (
                                <div key={index} className="inline-flex items-center px-3 py-1 rounded-md text-md font-medium bg-gray-100 text-gray-800">
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
                <div className="sm:col-span-3 flex justify-end pt-4">
                    <button className={"btn btn-primary" + (isLoading ? " loading" : "")}
                        onClick={submitForm}
                    >Create</button>
                </div>

            </div>

        </div>
    );
};


export const MyIdeas = () => {
    const [open, setOpen] = useState(true)
    const [myIdeas, setMyIdeas] = useRecoilState(myIdeasState);
    const [myIdeasLoading, setMyIdeasLoading] = useState(false);

    useEffect(() => {
        setMyIdeasLoading(true);
        getMyIdeas().then((res) => {
            setMyIdeas(res);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setMyIdeasLoading(false);
        });
    }, []);

    const navigateToCreateIdea = () => {
        setOpen(true);
    };

    const onCreated = (newIdea) => {
        setMyIdeas([...myIdeas, newIdea]);
        setOpen(false);
    };

    return (
        <div class="p-4 space-y-4 min-h-screen flex flex-col w-full">
            {
                (myIdeas.length && !myIdeasLoading) ?
                    <button className="btn gap-2 absolute bottom-10 right-10" onClick={() => setOpen(true)}>
                        <Plus size={32} />
                        Add Idea
                    </button> : ""
            }
            <h2 class="text-2xl font-bold text-neutral">My Ideas</h2>

            {(myIdeasLoading ? <div className="flex flex-col flex-grow justify-center items-center">
                <div role="status">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </div> :
                <Fragment>
                    {
                        myIdeas.length ? "" :
                            <div className="flex flex-col flex-grow justify-center items-center">
                                <div class="flex flex-col justify-center items-center w-96 h-56 border-2 border-dashed text-neutral-400 rounded-lg"
                                    role="button"
                                    onClick={() => navigateToCreateIdea()}
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
                                        Add a new idea
                                    </p>
                                </div>
                            </div>
                    }

                    <div class="grid grid-cols-1 gap-4">
                        {myIdeas.map((idea) => (
                            <MyIdeaCard key={idea.id} idea={idea} />
                        ))}
                    </div>
                </Fragment>)}

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-50"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-50"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                                <button
                                                    type="button"
                                                    className="rounded-md text-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XCircle className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                                    Add an idea
                                                </Dialog.Title>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <CreateIdeaForm onCreated={onCreated} />
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