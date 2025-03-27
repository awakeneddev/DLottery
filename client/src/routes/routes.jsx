import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CreateLottery from "../pages/createLottery/createLottery";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-lottery",
    element: <CreateLottery />,
  },
]);

export default router;
