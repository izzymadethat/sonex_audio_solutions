import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../components/Landing";
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <LandingPage />
      }
    ]
  }
]);

export default router;
