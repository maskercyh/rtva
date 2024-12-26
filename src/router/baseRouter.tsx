import type { RouteObject } from "react-router-dom";
import Login from "@/view/user/login";
import BeforeRouter from "./beforeRouter";
import NotFound from "~@/view/404";
import Layout from "@/layout";
// 基础路由配置
const baseRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <BeforeRouter>
        <Layout />
      </BeforeRouter>
    ),
    children: [],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: (
      <BeforeRouter>
        <NotFound />
      </BeforeRouter>
    ),
  },
];
export default baseRoutes;
