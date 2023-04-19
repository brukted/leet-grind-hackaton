import axios from "axios";

/**
 * Application Model
 * {
            "_id": "6440017d0699593ddb26650e",
            "gig": "6440007a1090af81f53fe8b9",
            "applicant": "644000681090af81f53fe8b1",
            "note": "More normally, interviewers will isolate key competencies that they believe suitable employees should possess, and tailor questions to focus on those skills.",
            "status": "pending",
            "createdAt": "2023-04-19T14:58:05.053Z",
            "updatedAt": "2023-04-19T14:58:05.053Z",
            "__v": 0,
            "applicantModel": {
                "_id": "644000681090af81f53fe8b1",
                "name": "John",
                "lastname": "Doe",
                "email": "johndoe@example.com",
                "password": "$2b$10$5cj84TLO5tqWCQoWbNjoBu7J40XNEvW8ppx7o9nrGOwBkMxDpRR4i",
                "telegram": "https://t.me/johndoe",
                "gigs": [],
                "applications": [],
                "createdAt": "2023-04-19T14:53:28.278Z",
                "updatedAt": "2023-04-19T14:53:28.278Z",
                "__v": 0
            },
            "id": "6440017d0699593ddb26650e"
        }
 */

// Returns the list of applications for the current user
export const getMyApplications = async () => {
  return axios.get("/me/applications").then((response) => {
    return response.data.data;
  });
};

// Returns a list of all applications
export const getAllApplications = async () => {
  return axios.get("/applications").then((response) => {
    return response.data.data;
  });
};

// Return the application model
export const getApplication = async (applicationId) => {
  return axios.get("/applications/applicationId").then((response) => {
    return response.data.data;
  });
};

// Returns the deleted application model
export const deleteApplication = async (applicationId) => {
  return axios.delete("/applications/applicationId").then((response) => {
    return response.data.data;
  });
};

// Returns the updated application model
export const updateApplication = async (applicationId, note, status) => {
  return axios
    .put("/applications/applicationId", { note, status })
    .then((response) => {
      return response.data.data;
    });
};

// Return the application model
export const createApplication = async (gigId, note) => {
  console.log("note: ", note);
  return axios
    .post("/applications", { gig: gigId, note: note })
    .then((response) => {
      return response.data.data;
    });
};

// Returns a list of applications for this gig
export const getGigApplications = async (gigId) => {
  return axios.get(`/gigs/${gigId}/applications`).then((response) => {
    return response.data.data;
  });
};
