import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  RecoilRoot,
} from 'recoil';
import { SignIn } from './pages/SignInPage/SignInPage';
import { SignUp } from './pages/SignUpPage/SignUpPage';
import LandingPage from "./pages/LandingPage/LandingPage";

const router = createBrowserRouter([
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
