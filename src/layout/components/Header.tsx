import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";
import LangSelect from "~@/components/LangSelect";
import UserAvater from "~@/components/UserAvater";
import styles from "../index.module.less";
import LogoImg from "@/assets/react.svg";
import { MenuFoldOutlined } from "@ant-design/icons";
import Menu from "./menu/Menu";
import SplitMenu from "./menu/SplitMenu";
import SideMenu from "./menu/SideMenu";
import { Drawer } from "antd";
import classNames from "classnames"; // 动态类名优化
import { useState, useEffect } from "react";
import { useCommonStore } from "@/stores"; // 假设你有这个 hook

export default function Header() {
  const dispatch: AppDispatch = useDispatch();
  const { isCollapsed, isMaximize, username, isPhone, configSetting } =
    useCommonStore();
  const [open, setOpen] = useState<boolean>(false);

  const showMenu = () => setOpen(true);

  return (
    <>
      {configSetting.layout === "mix" && !isPhone && (
        <header className={classNames(styles["header-container-wrap"])} />
      )}
      <header
        className={classNames(styles["header-container-wrap"], {
          [styles["header-container-wrap-fixed"]]:
            configSetting.layout === "mix" && !isPhone,
        })}
      >
        <div className={classNames(styles["header-container"])}>
          {(configSetting.layout !== "side" || isPhone) && (
            <div className={classNames(styles["logo-space"], "mr-25px")}>
              <a>
                <img src={LogoImg} alt="Logo" />
                {!isPhone && <span>{configSetting.title}</span>}
              </a>
            </div>
          )}

          {isPhone && (
            <>
              <div
                className={classNames(
                  "phone-menu-button cursor-pointer text-18px"
                )}
                onClick={showMenu}
              >
                <MenuFoldOutlined />
              </div>
              <Drawer
                width={240}
                styles={{ body: { padding: 0 } }}
                closeIcon={false}
                placement="left"
                open={open}
                onClose={() => setOpen(false)}
              >
                <SideMenu />
              </Drawer>
            </>
          )}

          <div className="flex-1">
            {configSetting.layout === "top" && !isPhone && <Menu />}
            {configSetting.layout === "mix" && !isPhone && <SplitMenu />}
          </div>

          <div className={classNames(styles["header-handle-space"])}>
            <LangSelect />
            <UserAvater />
          </div>
        </div>
      </header>
    </>
  );
}
