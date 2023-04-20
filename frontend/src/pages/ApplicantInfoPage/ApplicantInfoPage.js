import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApplication, updateApplication } from '../../services/applicationService';

export const ApplicantInfoPage = () => {
    const { applicationId } = useParams();

    const [application, setApplication] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [updateInProgress, setUpdateInProgress] = useState(false);

    useEffect(() => {
        getApplication(applicationId).then((application) => {
            setIsLoading(true);
            setApplication(application);
            setIsLoading(false);
        });
    }, []);

    const updateStatus = (status) => {
        setUpdateInProgress(true);
        updateApplication(application._id, application.note, status).then((application) => {
            setApplication(application);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setUpdateInProgress(false);
        });
    };

    return (
        <div className="mt-10 mx-20 min-h-screen">
            {
                isLoading ? (
                    <div className='flex justify-center items-center h-full'>
                        <div role="status">
                            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                )
                    : (
                        <Fragment>

                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {application.applicantModel.name + " " + application.applicantModel.lastname}  </dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <a href={"mailto:" + application.applicantModel.email} className="text-indigo-600 hover:text-indigo-900"> {application.applicantModel.email} </a>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Telegram</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {
                                                application.applicantModel.telegram ? (
                                                    <a href={application.applicantModel.telegram} className="text-indigo-600 hover:text-indigo-900"> {application.applicantModel.telegram} </a>
                                                ) : (
                                                    <span className="text-gray-700">N/A</span>
                                                )
                                            }
                                        </dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Github</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {
                                                application.applicantModel.github ? (
                                                    <a href={application.applicantModel.github} className="text-indigo-600 hover:text-indigo-900"> {application.applicantModel.github} </a>
                                                ) : (
                                                    <span className="text-gray-700">N/A</span>
                                                )
                                            }
                                        </dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Resume</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {
                                                application.applicantModel.resume ? (
                                                    <a href={application.applicantModel.resume} className="text-indigo-600 hover:text-indigo-900"> Resume Link </a>
                                                ) : (
                                                    <span className="text-gray-700">N/A</span>
                                                )
                                            }
                                        </dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Note</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {application.note || "N/A"}
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                                                {application.status}
                                            </span>
                                        </dd>
                                    </div>

                                    <div className='flex items-end justify-end pt-14 gap-10'>
                                        <button className={"btn btn-success" + (application.status === "accepted" || updateInProgress ? " disabled" : "")}
                                            onClick={() => updateStatus("accepted")}
                                        >Accept</button>
                                        <button className={"btn btn-error" + (application.status === "rejected" || updateInProgress ? " disabled" : "")}
                                            onClick={() => updateStatus("rejected")}
                                        >Reject</button>
                                    </div>
                                </dl>
                            </div>
                        </Fragment>)
            }
        </div>
    )
}
