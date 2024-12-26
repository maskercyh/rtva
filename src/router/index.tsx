import { HashRouter, BrowserRouter } from "react-router-dom";
import { App, ConfigProvider, message } from "antd";
import LayoutSetting from "@/config/default-setting";
import { useTranslation } from "react-i18next";
import GenerRoute from "./GenerRoute";
import zhCN from "antd/es/locale/zh_CN";
import enUS from "antd/es/locale/en_US";
import { useCommonStore } from "@/stores";
import { AppDispatch } from "@/stores";
import type { ThemeType } from "#/public";
import { useDispatch } from "react-redux";
const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;

function AppContent() {
  const { configSetting } = useCommonStore();
  const { i18n } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const currentLanguage = i18n.language;
  const themeCache = (localStorage.getItem(THEME_KEY) || "light") as ThemeType;
  const [colorPrimary, setColorPrimary] = useState(configSetting.colorPrimary);
  useEffect(() => {
    if (themeCache === "dark") {
      document.body.className = "dark";
    } else {
      document.body.className = "light";
    }
    dispatch(setThemeValue(themeCache));
  }, [themeCache]);

  useEffect(() => {
    setColorPrimary(configSetting.colorPrimary);
  }, [configSetting.colorPrimary]);

  useEffect(() => {}, [currentLanguage]);

  const algorithm = [themeCache === "dark" ? darkAlgorithm : defaultAlgorithm];
  if (configSetting.compact) algorithm.push(compactAlgorithm);

  return (
    <ConfigProvider
      locale={currentLanguage === "en" ? enUS : zhCN}
      theme={{
        algorithm: algorithm,
        token: {
          colorPrimary: colorPrimary,
        },
      }}
    >
      <App>
        <GenerRoute />
      </App>
    </ConfigProvider>
  );
}

// Main component for handling routing (HashRouter or BrowserRouter)
export default () => {
  return LayoutSetting.routeType === "hash" ? (
    <HashRouter>
      <AppContent />
    </HashRouter>
  ) : (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};
