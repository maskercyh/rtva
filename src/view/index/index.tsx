import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import { logout } from "~@/stores/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "@/stores";
function App() {
  const { t } = useTranslation();
  const { RangePicker } = DatePicker;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [count, setCount] = useState(0);
  async function handelLogout() {
    await dispatch(logout());
    navigate("/login");
  }
  function toDdashboard() {
    navigate("/dashboard");
  }
  return (
    <>
      <h1>{t("content.clipboard")}：</h1>
      <RangePicker />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          className="mt-25px margin-auto"
          onClick={handelLogout}
          type="primary"
        >
          退出登录
        </Button>
        <Button
          className="mt-25px margin-auto"
          onClick={toDdashboard}
          type="primary"
        >
          toDdashboard
        </Button>

        <Button onClick={() => setCount((count) => count + 1)} type="primary">
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
