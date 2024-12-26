import { useCommonStore } from "@/stores";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/stores";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Menu from "@/layout/components/menu/Menu";
import Logo from "@/layout/components/Logo";
import styles from "@/layout/index.module.less";
import LogoImg from "@/assets/react.svg";
import classNames from "classnames";
const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { configSetting, isCollapsed, isPhone } = useCommonStore();

  return (
    <>
      <aside
        className={classNames(styles["side-bar"], {
          [styles["side-bar-collapsed"]]: isCollapsed,
        })}
      ></aside>
      <aside
        className={classNames(styles["side-bar"], styles["side-bar-fixed"], {
          [styles["side-bar-collapsed"]]: isCollapsed,
        })}
      >
        {configSetting.layout === "side" && (
          <div
            className={`
          p-10px
          ${styles["logo-space"]}
        `}
          >
            <a>
              <img src={LogoImg} alt="" />
              {(!isCollapsed || isPhone) && <span>{configSetting.title}</span>}
            </a>
          </div>
        )}
        <div
          className={classNames(
            "flex-1 of-x-hidden of-y-auto scrollbar",
            styles["side-bar-menu"],
            { ["pt-[48px]"]: configSetting.layout === "mix" }
          )}
        >
          <Menu />
        </div>
        {!isPhone && (
          <div
            className={`
          ${styles["side-bar-collapsed-box"]}
        `}
            onClick={() => dispatch(toggleCollapsed(!isCollapsed))}
          >
            <div
              className={`
            ${styles["side-bar-collapsed-button"]}
          `}
            >
              {isCollapsed && <MenuUnfoldOutlined />}
              {!isCollapsed && <MenuFoldOutlined />}
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default App;
