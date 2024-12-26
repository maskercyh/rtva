import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { toggleCollapsed, togglePhone } from "@/stores/menu";
import { useLocation } from "react-router-dom";
import { useCommonStore } from "@/stores";
import type { AppDispatch } from "@/stores";
import SettingDrawer from "./components/settingDrawer";
import SideMenu from "./components/menu/SideMenu";
import Header from "./components/Header";
import TabsTop from "./components/TabsTop";
import { KeepAlive, useAliveController } from "react-activation";
import styles from "./index.module.less";
import { AnimatePresence, motion } from "framer-motion";
import { Watermark, message } from "antd";
import classNames from "classnames";

const Layout: React.FC = () => {
  const {
    menuList,
    isMaximize,
    isCollapsed,
    isPhone,
    isRefresh,
    configSetting,
    spiltMenu,
  } = useCommonStore();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { pathname } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const { i18n } = useTranslation();
  const { clear, refreshScope, getCachingNodes } = useAliveController();
  const currentLanguage = i18n.language;

  const refreshAllKeepalive = () => {
    const cacheNodes = getCachingNodes();
    for (let i = 0; i < cacheNodes?.length; i++) {
      const { name } = cacheNodes[i];
      if (name) refreshScope(name);
    }
  };

  useEffect(() => {
    refreshAllKeepalive();
  }, [currentLanguage]);

  useEffect(() => {
    if (pathname === "/") {
      navigate(menuList[0].path);
    }
  }, [pathname, currentLanguage]);
  const shouldRenderSideMenu = useMemo(() => {
    return (
      (configSetting.layout === "side" ||
        (configSetting.layout === "mix" && spiltMenu.length != 0)) &&
      !isPhone
    );
  }, [configSetting.layout, spiltMenu.length, isPhone]);
  return (
    <Watermark
      className="h-full flex flex-col flex-1"
      content={configSetting.watermark ? configSetting.title ?? "no title" : ""}
    >
      <div className={classNames(styles["app-layout"])}>
        <section className={classNames(styles["app-container-wrap"])}>
          {shouldRenderSideMenu && <SideMenu />}

          <section
            className={classNames(styles["app-main-wrap"], {
              [styles["app-main-side-menu"]]:
                configSetting.layout === "side" && !isPhone,
              [styles["is-collapse-main"]]: isCollapsed && !isPhone,
            })}
          >
            <Header />
            <TabsTop />

            <main className={styles["app-main"]}>
              <div className={styles["app-main-flex"]}>
                {/* <KeepAlive id={pathname} name={pathname} enabled={false}> */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Outlet />
                  </motion.div>
                </AnimatePresence>
                {/* </KeepAlive> */}
              </div>
            </main>
          </section>
        </section>

        {configSetting.drawerSetting && <SettingDrawer />}
      </div>
    </Watermark>
  );
};

export default Layout;
