import React from "react";
import { useDispatch } from "react-redux";
import { Tooltip } from "antd";
import type { AppDispatch } from "@/stores";
import { CheckOutlined } from "@ant-design/icons";
import type { LayoutType } from "#/public";
import "./index.less";
const Layout: React.FC = () => {
  const { t } = useTranslation();
  const { configSetting } = useCommonStore();
  const dispatch: AppDispatch = useDispatch();

  const layoutSet = (params: LayoutType) => {
    console.log(params);
    localStorage.setItem(LAYOUT_KEY, params);
    dispatch(setLayout(params));
  };

  return (
    <div className="flex items-center justify-center text-lg mr-4 cursor-pointer">
      <Tooltip title={t("public.layout.side")}>
        <div
          className="side-layout layout-item"
          onClick={() => layoutSet("side")}
        >
          {configSetting.layout == "side" && (
            <div className="item-check">
              <CheckOutlined />
            </div>
          )}
        </div>
      </Tooltip>
      <Tooltip title={t("public.layout.top")}>
        <div
          className="top-layout layout-item"
          onClick={() => layoutSet("top")}
        >
          {configSetting.layout == "top" && (
            <div className="item-check">
              <CheckOutlined />
            </div>
          )}
        </div>
      </Tooltip>
      <Tooltip title={t("public.layout.mix")}>
        <div
          className="mix-layout layout-item"
          onClick={() => layoutSet("mix")}
        >
          {configSetting.layout == "mix" && (
            <div className="item-check">
              <CheckOutlined />
            </div>
          )}
        </div>
      </Tooltip>
    </div>
  );
};

export default Layout;
