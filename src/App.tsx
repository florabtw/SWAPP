import "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AllCollections from "Collections/All";
import Details from "Details";
import List, { Films } from "Collections/List";
import Root from "Root";
import client from "client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <AllCollections /> },
      { path: "/films", element: <Films />, loader: () => client.films.list() },
      {
        path: "/people",
        element: <List />,
        loader: () => client.people.list(),
      },
      {
        path: "/planets",
        element: <List />,
        loader: () => client.planets.list(),
      },
      {
        path: "/species",
        element: <List />,
        loader: () => client.species.list(),
      },
      {
        path: "/starships",
        element: <List />,
        loader: () => client.starships.list(),
      },
      {
        path: "/vehicles",
        element: <List />,
        loader: () => client.vehicles.list(),
      },
      { path: "/:resource/:id/", element: <Details /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
