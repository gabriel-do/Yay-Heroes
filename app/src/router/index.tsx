import { Navigate, createHashRouter } from 'react-router-dom';
import Heroes from '../pages/heroes';
import HeroDetails from '../pages/hero-details';
import NewHero from '../pages/new-hero';
import App from '../App';

export const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/heroes" />
  },
  {
    path: "/heroes",
    element: <App />,
    children: [
      {
        path: "",
        element: <Heroes />
      },
      {
        path: "new-hero",
        element: <NewHero />
      },
      {
        path: "hero/:id",
        element: <HeroDetails />
      }
    ]
  }
]);