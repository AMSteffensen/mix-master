import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  NewsPage,
  SinglePageError,
} from "./pages";

import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsletterAction } from "./pages/NewsPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cocktail/:id",
        element: <Cocktail />,
        loader: singleCocktailLoader,
      },
      {
        path: "/error",
        element: <Error />,
      },
      {
        path: "/landing",
        element: <Landing />,
      },
      {
        path: "/news",
        element: <NewsPage />,
        action: newsletterAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
