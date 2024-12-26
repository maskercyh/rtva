import type { MenuProps } from "antd";
import { useCommonStore } from "@/stores";
import styles from "@/layout/index.module.less";
import { menuLang } from "@/utils/menu";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";
import { setSpiltMenu } from "@/stores/menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const { menuList, configSetting, isPhone, theme } = useCommonStore();
  const { pathname } = useLocation();

  const [selectKey, setSelectKey] = useState<string>("");
  const [splitMenu, setSplitMenu] = useState<any[]>([]);
  useEffect(() => {
    setSplitMenu(
      menuLang(
        currentLanguage,
        menuList.map((item) => {
          const { children, ...tempItem } = item;
          return tempItem;
        })
      )
    );
  }, [currentLanguage]);
  useEffect(() => {
    let current = menuList.findIndex((item) => {
      if (item.path !== "/") {
        return pathname.startsWith(item.path);
      }
      return false;
    });

    if (current !== -1 && menuList[current]) {
      if (pathname === "/") {
        current = 0;
      }
      const mentData = menuList[current];
      const { key } = mentData;
      setSelectKey(key);
      dispatch(setSpiltMenu(mentData.children ?? []));
    }
  }, []);
  const onClick: MenuProps["onClick"] = (e) => {
    const current = menuList.findIndex((menu) => menu.key === e.key);
    if (current === -1) return;
    setSelectKey(splitMenu[current].key);
    dispatch(setSpiltMenu(menuList[current].children ?? []));
    if (!menuList[current].children) navigate(menuList[current].path);
  };

  return (
    <Menu
      theme={theme}
      className={classNames(styles["side-bar-menu-list"], {
        [styles["side-bar-menu-list-horizontal"]]:
          configSetting.layout !== "side",
        [styles["global-menu-list"]]: isPhone,
      })}
      selectedKeys={[selectKey]}
      onClick={onClick}
      mode="horizontal"
      items={splitMenu} // 使用计算后的 splitMenu
    />
  );
};

export default App;
