import axios from "axios";

/**
 * Sample response:
{
            "_id": "644000701090af81f53fe8b5",
            "author": "644000681090af81f53fe8b1",
            "title": "Atrons - A resource sharing platform",
            "tags": [
                "backend"
            ],
            "description": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, ",
            "github": "https://github.com/brukted/leet-grind-hackaton",
            "gigs": [],
            "attachments": [],
            "createdAt": "2023-04-19T14:53:36.101Z",
            "updatedAt": "2023-04-19T14:53:36.101Z",
            "__v": 0,
            "authorModel": {
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
            "id": "644000701090af81f53fe8b5"
        },
 */


// Returns a list of all ideas
export const getAllIdeas = async () => {
    return axios.get("/ideas").then((response) => {
        return response.data.data;
    });
}

// Returns the created idea
export const createIdea = async (title, description, tags, github) => {
    return axios.post("/ideas", { title, description, tags, github }).then((response) => {
        return response.data.data;
    });
}


// Returns a list of the user's ideas
export const getMyIdeas = async () => {
    return axios.get("/me/ideas").then((response) => {
        return response.data.data;
    });
}

// Returns a single idea
export const getIdea = async (ideaId) => {
    return axios.get(`/ideas/${ideaId}`).then((response) => {
        return response.data.data;
    });
};

// Returns a single idea
export const updateIdea = async (ideaId, title, description, tags, github) => {
    return axios.patch(`/ideas/${ideaId}`, { title, description, tags, github }).then((response) => {
        return response.data.data;
    })
};

// Returns a single idea
export const deleteIdea = async (ideaId) => {
    return axios.delete(`/ideas/${ideaId}`).then((response) => {
        return response.data.data;
    });
};