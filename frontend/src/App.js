import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  RecoilRoot,
} from 'recoil';
import { SignIn } from './pages/SignInPage/SignInPage';

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />,
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
