import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Users } from "../pages/users";
import { Products } from "../pages/products";
import { Reports } from "../pages/reports";
import NotFound from '../pages/notFound/index';
import { App } from '../components/templates/App';

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Users />
      },
      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/reports",
        element: <Reports />
      },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/users" />
  }
])

export default AppRoutes;
