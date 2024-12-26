import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { LANG } from "@/stores/public";
export type Langs = "zh" | "en";

function I18n() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const lang = localStorage.getItem(LANG);
    // 获取当前语言
    const currentLanguage = i18n.language;

    if (!lang) {
      localStorage.setItem(LANG, "zh");
      i18n.changeLanguage("zh");
    } else if (currentLanguage !== lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  // 下拉菜单内容
  const items: MenuProps["items"] = [
    {
      key: "zh",
      label: <span>中文</span>,
    },
    {
      key: "en",
      label: <span>English</span>,
    },
  ];

  /** 点击菜单更换语言 */
  const onClick: MenuProps["onClick"] = (e) => {
    i18n.changeLanguage(e.key as Langs);
    localStorage.setItem(LANG, e.key);
  };

  return (
    <Dropdown placement="bottom" trigger={["click"]} menu={{ items, onClick }}>
      <div onClick={(e) => e.preventDefault()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M27.85 29H30l-6-15h-2.35l-6 15h2.15l1.6-4h6.85zm-7.65-6l2.62-6.56L25.45 23zM18 7V5h-7V2H9v3H2v2h10.74a14.71 14.71 0 0 1-3.19 6.18A13.5 13.5 0 0 1 7.26 9h-2.1a16.47 16.47 0 0 0 3 5.58A16.84 16.84 0 0 1 3 18l.75 1.86A18.47 18.47 0 0 0 9.53 16a16.92 16.92 0 0 0 5.76 3.84L16 18a14.48 14.48 0 0 1-5.12-3.37A17.64 17.64 0 0 0 14.8 7z"
          />
        </svg>
      </div>
    </Dropdown>
  );
}

export default I18n;
