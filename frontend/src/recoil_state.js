import { atom } from "recoil";

export const loggedInUser = atom({
  key: "signedInUser", // unique ID (with respect to other atoms/selectors)
  default: JSON.parse(localStorage.getItem("loggedInUser")), // default value (aka initial value)
});

export const myGigsState = atom({
  key: "myGigsState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const ideasState = atom({
  key: "ideasState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
