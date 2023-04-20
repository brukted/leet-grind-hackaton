import axios from "axios";

/**
 * Gig models looks like this:
 * {
            "_id": "6440094696cd5ac7f648624a",
            "title": "Full Stack Developer",
            "description": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, ",
            "tags": [
                "ios",
                "uikit",
                "combine"
            ],
            "idea": "6440092096cd5ac7f648623e",
            "applications": [],
            "createdAt": "2023-04-19T15:31:18.260Z",
            "updatedAt": "2023-04-19T15:31:18.260Z",
            "__v": 0,
            "ideaModel": {
                "_id": "6440092096cd5ac7f648623e",
                "author": "644000681090af81f53fe8b1",
                "title": "Atrons - A resource sharing platform",
                "tags": [
                    "backend"
                ],
                "description": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, ",
                "github": "https://github.com/brukted/leeth-grin-hackaton",
                "gigs": [],
                "attachments": [],
                "createdAt": "2023-04-19T15:30:40.837Z",
                "updatedAt": "2023-04-19T15:30:40.837Z",
                "__v": 0,
                "id": "6440092096cd5ac7f648623e"
            },
            "id": "6440094696cd5ac7f648624a",
            "hasUserApplied": false
        }
 */

/**
 *
 * @returns a list of gigs
 */

export const getGigs = async () => {
  return axios.get("/gigs").then((response) => {
    return response.data.data;
  });
};

export const getGig = async (gigId) => {
  return axios.get(`/gigs/${gigId}`).then((response) => {
    return response.data.data;
  });
};

export const getMyGigs = async () => {
  return axios.get("/me/gigs").then((response) => {
    return response.data.data;
  });
};

// Return a list of gigs for this idea
export const getIdeaGigs = async (ideaId) => {
  return axios.get(`/ideas/${ideaId}/gigs`).then((response) => {
    return response.data.data;
  });
};

// Returns a single gig
export const createGig = async (title, description, tags, ideaId) => {
  return axios
    .post(`/ideas/${ideaId}/gigs`, { title: title, description: description, tags: tags, idea: ideaId })
    .then((response) => {
      return response.data.data;
    });
};

// Returns a single gig
export const updateGig = async (gigId, ideaId, title, description, tags) => {
  return axios
    .put(`/ideas/${ideaId}/gigs/${gigId}`, { title, description, tags })
    .then((response) => {
      return response.data.data;
    });
};

// Returns a single gig
export const deleteGig = async (gigId, ideaId) => {
  return axios.delete(`/ideas/${ideaId}/gigs/${gigId}`).then((response) => {
    return response.data.data;
  });
};
