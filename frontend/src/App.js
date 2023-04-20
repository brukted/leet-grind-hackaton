import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./pages/SignInPage/SignInPage";
import { SignUp } from "./pages/SignUpPage/SignUpPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import ApplicationApply from "./pages/ApplicationApplyForm.js/ApplicationApplyForm";
import ApplicationDetailPage from "./pages/ApplicationDetailPage/ApplicationDetailPage";
import { GigDetailPage } from "./pages/GigDetailPage/GigDetailPage";
import { ApplicantInfoPage } from "./pages/ApplicantInfoPage/ApplicantInfoPage";
import { RecoilRoot } from "recoil";
import { IdeaDetailPage } from "./pages/IdeaDetailPage/IdeaDetailPage";

const isAuthenticated = () => {
  console.log("is logged in: ", localStorage.getItem("authToken") !== null);
  return localStorage.getItem("authToken") !== null;
};

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/ideas/:ideaId"
            element={
              isAuthenticated() ? (
                <IdeaDetailPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/apply/:id"
            element={
              isAuthenticated() ? (
                <ApplicationApply />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/applications/:id"
            element={
              isAuthenticated() ? (
                <ApplicationDetailPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/applicantInfo/:applicationId"
            element={
              isAuthenticated() ? (
                <ApplicantInfoPage />
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/gigs/:id"
            element={
              isAuthenticated() ? (
                <GigDetailPage />
              ) : (
                <Navigate to="/sign-in" replace={true} />
              )
            }
          />

          <Route
            path="/home"
            element={isAuthenticated() ? <HomePage /> : <Navigate to="/sign-in" />}
          />

          <Route
            path="*"
            element={isAuthenticated() ? <HomePage /> : <Navigate to="/sign-in" />}
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
