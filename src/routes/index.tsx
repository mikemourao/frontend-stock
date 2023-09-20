import { createBrowserRouter } from 'react-router-dom';
import { Users } from "../pages/users";
import Reports from "../pages/reports";
import NotFound from '../pages/notFound/index';
import { App } from '../components/templates/App';


const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/reports",
        element: <Reports />
      },
    ]
  }
])

export default AppRoutes;
