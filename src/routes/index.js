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
        path: "/cms/courses1",
        element: <ComingSoon />,
        label: "COURSES1",
        icon: <RiBookLine size={20} />,
      },
      {
        element: <ComingSoon />,
        label: "COURSES2",
        icon: <RiBookLine size={20} />,
        children: [
          {
            path: "/cms/courses1/courses3",
            element: <ComingSoon />,
            label: "COURSES3",
            icon: <RiBookLine size={20} />,
          },
          {
            path: "/cms/courses1/courses4",
            element: <ComingSoon />,
            label: "COURSES4",
            icon: "",
          },
        ],
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
