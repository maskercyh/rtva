import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useEffect } from "react";
import { logout } from "~@/stores/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "@/stores";
export type Langs = "zh" | "en";

function UserAvater() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {}, []);

  // 下拉菜单内容
  const items: MenuProps["items"] = [
    {
      key: "person",
      label: <span>个人中心</span>,
    },
    {
      key: "logout",
      label: <span>退出登录</span>,
    },
  ];

  /** 点击菜单更换语言 */
  const onClick: MenuProps["onClick"] = async (e) => {
    switch (e.key) {
      case "person":
        break;
      case "logout":
        await dispatch(logout());
        navigate("/login");
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown placement="bottom" trigger={["click"]} menu={{ items, onClick }}>
      <div onClick={(e) => e.preventDefault()}>管理员</div>
    </Dropdown>
  );
}

export default UserAvater;
