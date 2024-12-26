import LogoImg from "@/assets/react.svg";
import styles from "../index.module.less";
import { useCommonStore } from "@/stores";
export default function Logo() {
  const { configSetting, isCollapsed } = useCommonStore();
  return (
    <div
      className={`
    ${styles["logo-space"]}
  `}
    >
      <a>
        <img src={LogoImg} alt="" />
        {!isCollapsed && <span>{configSetting.title}</span>}
      </a>
    </div>
  );
}
