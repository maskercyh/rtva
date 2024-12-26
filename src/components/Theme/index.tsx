import type { AppDispatch } from "@/stores";
import { setThemeValue, THEME_KEY } from "@/stores/public";
import type { ThemeType } from "#/public";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useAliveController } from "react-activation";
import "./index.less";
function Theme() {
  const { t } = useTranslation();
  const { clear, refresh, getCachingNodes } = useAliveController();
  const dispatch: AppDispatch = useDispatch();
  const themeCache = (localStorage.getItem(THEME_KEY) || "theme") as ThemeType;
  const [theme, setTheme] = useState<ThemeType>(themeCache);

  useEffect(() => {
    if (!themeCache) {
      localStorage.setItem(THEME_KEY, "light");
    }
    setTheme(themeCache === "dark" ? "dark" : "light");
  }, [themeCache]);

  /** 刷新全部keepalive */
  const refreshAllKeepalive = () => {
    const cacheNodes = getCachingNodes();
    for (let i = 0; i < cacheNodes?.length; i++) {
      const { name } = cacheNodes[i];
      if (name) refresh(name);
    }
  };

  /**
   * 处理更新
   * @param type - 主题类型
   */
  const onChange = (type: ThemeType) => {
    localStorage.setItem(THEME_KEY, type);
    dispatch(setThemeValue(type));
    setTheme(type);
    clear();
    refreshAllKeepalive();
    switch (type) {
      case "dark":
        document.documentElement.className = "dark";
        break;
      default:
        document.documentElement.className = "light";
        break;
    }
  };

  return (
    <div className="flex items-center justify-center text-lg mr-4 cursor-pointer">
      <Tooltip title={t("public.themes.light")}>
        <div
          className="light-theme theme-item"
          onClick={() => onChange("light")}
        >
          {theme == "light" && (
            <div className="item-check">
              <CheckOutlined />
            </div>
          )}
        </div>
      </Tooltip>
      <Tooltip title={t("public.themes.dark")}>
        <div className="dark-theme theme-item" onClick={() => onChange("dark")}>
          {theme == "dark" && (
            <div className="item-check">
              <CheckOutlined />
            </div>
          )}
        </div>
      </Tooltip>
    </div>
  );
}

export default Theme;
