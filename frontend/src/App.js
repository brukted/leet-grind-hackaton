import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SignIn } from "./pages/SignInPage/SignInPage";
import { SignUp } from "./pages/SignUpPage/SignUpPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import ApplicationApply from "./pages/ApplicationApplyForm.js/ApplicationApplyForm";
import ApplicationDetailPage from "./pages/ApplicationDetailPage/ApplicationDetailPage";
import { GigDetailPage } from "./pages/GigDetailPage/GigDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/apply/:id",
    element: <ApplicationApply />,
  },
  {
    path: "/applications/:id",
    element: <ApplicationDetailPage />,
  },
  {
    path: "/gigs/:id",
    element: <GigDetailPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
