import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Drawer, Switch } from "antd";
import styles from "@/layout/index.module.less";
import { useDispatch } from "react-redux";
import Theme from "@/components/Theme";
import Layout from "@/components/Layout";
import {
  setLayout,
  setColorPrimary,
  setWatermark,
  LAYOUT_KEY,
  setCompact,
} from "@/stores/public";
import type { LayoutType } from "#/public";
import type { AppDispatch } from "@/stores";
import { ColorPicker } from "antd";

const SettingDrawer: React.FC = () => {
  const { configSetting } = useCommonStore();
  const dispatch: AppDispatch = useDispatch();
  const PresetColors = [
    {
      label: "推荐配色",
      colors: [
        "rgb(22, 119, 255)",
        "rgb(24, 144, 255)",
        "rgb(245, 34, 45)",
        "rgb(250, 84, 28)",
        "rgb(19, 194, 194)",
        "rgb(82, 196, 26)",
        "rgb(47, 84, 235)",
        "rgb(114, 46, 209)",
      ],
    },
  ];

  const [open, setOpen] = useState<boolean>(false);
  const show = () => {
    setOpen(true);
  };
  const compactChange = (param: boolean) => {
    dispatch(setCompact(param));
  };
  const warterMarkChange = (param: boolean) => {
    dispatch(setWatermark(param));
  };

  const themeColorSet = (color: any) => {
    dispatch(setColorPrimary(color.toHexString()));
  };

  return (
    <div>
      <div
        onClick={show}
        className={`
            ${styles["app-drawer-setting-handle"]}
            `}
        style={{ backgroundColor: configSetting.colorPrimary }}
      >
        <SettingOutlined style={{ fontSize: "20px" }} />
      </div>
      <Drawer
        closable
        destroyOnClose
        title={"主题配置"}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div>
          整体风格设置
          <Theme />
        </div>

        <div className="flex flex-col">
          <div className="flex ">
            <div>配色</div>
            <div>
              <ColorPicker
                presets={PresetColors}
                format="hex"
                disabledAlpha={true}
                disabledFormat={true}
                defaultValue={configSetting.colorPrimary}
                onChangeComplete={themeColorSet}
              />
            </div>
          </div>

          <div>
            <div>导航模式</div>
            <div>
              <Layout />
            </div>
          </div>

          <div>
            <div>紧凑</div>
            <div>
              <Switch value={configSetting.compact} onChange={compactChange} />
            </div>
          </div>
          <div>
            <div>水印</div>
            <div>
              <Switch
                value={configSetting.watermark}
                onChange={warterMarkChange}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SettingDrawer;
