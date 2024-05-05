import "react";
import { createBrowserRouter, Params, RouterProvider } from "react-router-dom";

import AllCollections from "Collections/All";
import Details from "Details";
import List from "Collections/List";
import Root from "Root";
import client from "client";
import { collectionKeys } from "constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <AllCollections /> },
      ...collectionKeys.flatMap((key) => [
        {
          path: "/" + key,
          element: <List />,
          loader: () => client[key].list(),
        },
        {
          path: "/" + key + "/:id",
          element: <Details />,
          loader: ({ params }: { params: Params<string> }) =>
            client[key].fetch(params.id!),
        },
      ]),
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
