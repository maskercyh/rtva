import { FC, useState, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCommonStore } from "@/stores";
import { getLocalInfo } from "@/utils/local";
import { getUserInfo } from "@/api/user";
import { STORAGE_AUTHORIZE_KEY } from "@/stores/public";
import { toRoute, toMenu } from "@/utils/menu";
import baseRoutes from "./baseRouter";
import Loading from "~@/components/Loading";
import { AliveScope } from "react-activation";
import { Suspense } from "react";

const GenRoute: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { routeList } = useCommonStore();
  const token = getLocalInfo(STORAGE_AUTHORIZE_KEY);
  const [routes, setRoutes] = useState<any>([...baseRoutes]);
  const [loading, setLoading] = useState(true);

  // 处理异步加载用户信息和权限
  useEffect(() => {
    if (!token) {
      setLoading(false);
      navigate("/login");
      return;
    }
    setLoading(true);
    const fetchData = async () => {
      try {
        const { code, data } = await getUserInfo();
        if (Number(code) === 200) {
          const { user, permissions, menuList } = data as any;
          dispatch(setUserInfo(user));
          dispatch(setRouteList(toRoute(menuList) || []));
          dispatch(setMenuList(toMenu(menuList) || []));
          dispatch(setPermissions(permissions));
        }
      } catch (error) {
        console.error("服务故障", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (routeList.length) {
      setRoutes([
        {
          ...baseRoutes[0],
          children: routeList,
        },
        ...baseRoutes.slice(1),
      ]);
    }
  }, [routeList]);
  const element = useRoutes(routes);
  if (loading) {
    return <Loading />;
  }
  return (
    <AliveScope>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </AliveScope>
  );
};

export default GenRoute;
