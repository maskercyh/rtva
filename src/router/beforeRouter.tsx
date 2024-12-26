import { FC, ReactNode, useEffect, memo } from "react";
import {
  setThemeValue,
  THEME_KEY,
  LAYOUT_KEY,
  setLayout,
} from "@/stores/public";
import type { ThemeType, LayoutType } from "#/public";
import { AppDispatch } from "@/stores";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";

interface BeforeRouterProps {
  children: ReactNode;
}
const BeforeRouter: FC<BeforeRouterProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const layout = (localStorage.getItem(LAYOUT_KEY) || "side") as LayoutType;
  useEffect(() => {
    localStorage.setItem(LAYOUT_KEY, layout);
    dispatch(setLayout(layout));
  }, [layout, dispatch]);

  const themeCache = (localStorage.getItem(THEME_KEY) || "light") as ThemeType;
  useEffect(() => {
    if (themeCache === "dark") {
      document.body.className = "dark";
    } else {
      document.body.className = "light";
    }
    dispatch(setThemeValue(themeCache));
  }, [themeCache, dispatch]);

  const handleIsPhone = useRef(
    debounce(() => {
      const isPhone = window.innerWidth <= 768;
      dispatch(toggleCollapsed(isPhone));
      dispatch(togglePhone(isPhone));
    }, 500)
  ).current;

  useEffect(() => {
    handleIsPhone();
    window.addEventListener("resize", handleIsPhone);
    return () => {
      window.removeEventListener("resize", handleIsPhone);
    };
  }, []);
  return <>{children}</>;
};

export default BeforeRouter;
