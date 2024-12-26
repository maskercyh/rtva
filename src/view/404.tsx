import type { AppDispatch } from "@/stores";
import { useNavigate } from "react-router-dom";
import { logout } from "~@/stores/user";
import { useDispatch } from "react-redux";
import { useCommonStore } from "@/hooks/useCommonStore";

function NotFound() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  /** 跳转首页 */
  const goIndex = () => {
    navigate("/");
  };
  async function handelLogout() {
    await dispatch(logout());
    navigate("login");
  }

  return (
    <div className="absolute left-50% top-50% -translate-x-1/2 bg-red -translate-y-1/2 text-center">
      <h1 className={`w-full text-6rem font-bold`}>404</h1>
      <p className="w-full text-20px font-bold mt-15px text-dark-700">
        当前页面无法访问，可能没权限或已删除
      </p>
      <button className="mt-25px margin-auto" onClick={handelLogout}>
        退出登录
      </button>
      <button className="mt-25px margin-auto" onClick={goIndex}>
        返回首页
      </button>
    </div>
  );
}

export default NotFound;
