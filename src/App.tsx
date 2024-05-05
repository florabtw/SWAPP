import "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "Root";

const router = createBrowserRouter([
  {
    path: "/:collection?/:id?",
    element: <Root />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
