import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ideasState } from "../../recoil_state";
import { useParams } from "react-router-dom";

const ApplicationApply = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ideas, setIdeas] = useRecoilState(ideasState);
  const [idea, setIdea] = useState({});
  
  useEffect(() => {
    const result = ideas.filter((val) => {
      return val.id == id;
    });
    setIdea((result && result[0]) || []);
    console.log(idea);
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: send form data to server
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 class="text-2xl font-bold">Apply for "{idea.description}"</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Message:</label>
        <textarea value={message} onChange={handleMessageChange} />
      </div>
      <button type="submit">Apply</button>
    </form>
  );
};

export default ApplicationApply;
