import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Users } from "../pages/users";
import { Products } from "../pages/products";
import { Reports } from "../pages/reports";
import NotFound from '../pages/notFound/index';
import { App } from '../components/templates/App';
import { Login } from '../pages/login';

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
    children: [
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
