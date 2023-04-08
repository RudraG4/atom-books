import { RiBookLine } from "react-icons/ri";
import { BsWindow } from "react-icons/bs";
import { Route } from "react-router-dom";
import { nanoid } from "nanoid";
import NotFound from "features/NotFound";
import ComingSoon from "features/ComingSoon";
import BookSearch from "features/books/BookSearch";

export const appRoutes = [
  {
    path: "/",
    index: true,
    element: <BookSearch />,
  },
  {
    path: "/cms",
    element: <ComingSoon />,
    label: "CONTENT MANAGEMENT",
    icon: <BsWindow size={20} />,
    children: [
      {
        path: "/cms/home",
        element: <ComingSoon />,
        label: "SubMenu1",
        icon: <BsWindow size={20} />,
      },
      {
        path: "/cms/home",
        element: <ComingSoon />,
        label: "SubMenu2",
        icon: <BsWindow size={20} />,
      },
    ],
  },
  {
    path: "/courses",
    element: <ComingSoon />,
    label: "COURSES",
    icon: <RiBookLine size={20} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const generateRoutes = (routes) =>
  routes.map((route) => {
    const key = nanoid();
    return route.index ? (
      <Route index path={route.path} element={route.element} key={key} />
    ) : (
      <Route path={route.path} element={route.element} key={key}>
        {route.children && generateRoutes(route.children)}
      </Route>
    );
  });

export default generateRoutes(appRoutes);
