import React, { useState, useEffect } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import type { TabsProps } from "antd";
import { CSS } from "@dnd-kit/utilities";
import { Tabs } from "antd";
import styles from "../index.module.less";
import { useDispatch, useSelector } from "react-redux";
import { useCommonStore } from "@/stores";
import type { TabsData } from "@/stores/tabs";
import { ReloadOutlined } from "@ant-design/icons";
import {
  setActiveKey,
  addTabs,
  closeTabs,
  setNav,
  toggleLock,
  setRefresh,
} from "@/stores/tabs";
import { Dropdown } from "antd";
import type { AppDispatch, RootState } from "@/stores";
import { useAliveController } from "react-activation";
import { RouteType } from "#/menu";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-node-key": string;
}

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props["data-node-key"],
    });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "move",
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  });
};

export default function TabsTop() {
  const { drop, clear } = useAliveController();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const navigate = useNavigate();
  const { refresh } = useAliveController();
  const { pathname, search } = useLocation();
  const { tabs, menuList, routeList, activeKey, isLock } = useCommonStore();
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<null | NodeJS.Timeout>(null);
  const [refreshTime, setRefreshTime] = useState<null | NodeJS.Timeout>(null);
  const url = pathname + search;
  const dispatch: AppDispatch = useDispatch();
  const [tabData, setTabData] = useState<any>([]);
  useEffect(() => {
    setTabData(
      tabs.map((item) => {
        const { labelEn, ...tempItem } = item;
        if (currentLanguage === "en") {
          tempItem.label = labelEn;
        }
        return tempItem;
      })
    );
  }, [currentLanguage, tabs]);
  useEffect(() => {
    const route = routeList.find((item) => item.path === pathname) as RouteType;
    if (route) {
      dispatch(
        addTabs({
          key: route.path,
          path: route.path,
          label: route.label,
          labelEn: route.labelEn,
        })
      );
      dispatch(setActiveKey(route.path));
    }
  }, [pathname]);

  const remove = (targetKey: string) => {
    drop(targetKey);
    clear();
    dispatch(closeTabs(targetKey));
  };

  useEffect(() => {
    if (activeKey !== url) {
      const key = isLock ? activeKey : url;
      if (isLock) {
        navigate(key);
        dispatch(toggleLock(false));
      }
    }
  }, [activeKey, url, dispatch, navigate, isLock]);

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "remove") {
      remove(targetKey as string);
    }
  };
  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const oldIndex = tabs.findIndex((tab) => tab.key === active.id);
      const newIndex = tabs.findIndex((tab) => tab.key === over?.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedTabs = arrayMove(tabs, oldIndex, newIndex);
        dispatch(setNav(updatedTabs));
      }
    }
  };

  const onChange = (key: string) => {
    const tab = tabs.find((tab) => tab.key === key) as TabsData;
    dispatch(setActiveKey(tab.key));
    navigate(tab.key);
  };

  const onClickRefresh = () => {
    if (loading) return;
    setLoading(true);
    dispatch(setRefresh(true));

    setTime(
      setTimeout(() => {
        refresh(activeKey);
        setLoading(false);
        dispatch(setRefresh(false));
      }, 200)
    );
  };
  useEffect(() => {
    return () => {
      if (time) {
        clearTimeout(time);
      }
      if (refreshTime) {
        clearTimeout(refreshTime);
      }
    };
  }, [time, refreshTime]);

  const items = [
    { key: "refresh", label: <span>刷新</span> },
    { key: "close", label: <span>关闭</span> },
  ];

  const onMenuClick = (e: any) => {
    if (e.key === "refresh") {
      onClickRefresh();
    } else if (e.key === "close") {
      remove(e.key);
    }
  };

  // const renderTabBar: TabsProps["renderTabBar"] = (
  //   tabBarProps,
  //   DefaultTabBar
  // ) => (
  //   <>
  //     <DndContext
  //       sensors={[sensor]}
  //       onDragEnd={onDragEnd}
  //       collisionDetection={closestCenter}
  //     >
  //       <SortableContext
  //         items={tabs.map((i) => i.key)}
  //         strategy={horizontalListSortingStrategy}
  //       >
  //         <DefaultTabBar {...tabBarProps}>
  //           {(node) => (
  //             <Dropdown
  //               key={node.key}
  //               menu={{
  //                 items,
  //                 onClick: (e) => {
  //                   console.log(e);
  //                 },
  //               }}
  //               trigger={["contextMenu"]}
  //             >
  //               <DraggableTabNode {...node.props} key={node.key}>
  //                 {React.cloneElement(node, {
  //                   children: (
  //                     <>
  //                       {node.props.children[0]}
  //                       <button
  //                         className="ant-tabs-tab-remove"
  //                         key="reload-button"
  //                       >
  //                         <ReloadOutlined spin={true} />
  //                       </button>
  //                       {node.props.children[1] && node.props.children[1]}
  //                     </>
  //                   ),
  //                 })}
  //               </DraggableTabNode>
  //             </Dropdown>
  //           )}
  //         </DefaultTabBar>
  //       </SortableContext>
  //     </DndContext>
  //   </>
  // );
  const renderTabBar: TabsProps["renderTabBar"] = (
    tabBarProps,
    DefaultTabBar
  ) => (
    <DefaultTabBar {...tabBarProps}>
      {(node) => (
        <Dropdown
          key={node.key}
          menu={{
            items,
            onClick: onMenuClick,
          }}
          trigger={["contextMenu"]}
        >
          {React.cloneElement(node, {
            children: (
              <>
                {node.props.children[0]}
                {node.key === activeKey && (
                  <button
                    onClick={onClickRefresh}
                    className="ant-tabs-tab-remove"
                    key="reload-button"
                  >
                    <ReloadOutlined spin={loading} />
                  </button>
                )}
                {node.props.children[1] && node.props.children[1]}
              </>
            ),
          })}
        </Dropdown>
      )}
    </DefaultTabBar>
  );

  return (
    <div className={styles["tab-top-container"]}>
      <Tabs
        hideAdd
        onEdit={onEdit}
        onChange={onChange}
        activeKey={activeKey}
        items={tabData}
        type="editable-card"
        className={styles["tab-top-nav-list"]}
        tabBarGutter={5}
        renderTabBar={renderTabBar}
        className={styles["tab-top-nav-list"]}
        tabBarGutter={5}
        renderTabBar={renderTabBar}
      />
    </div>
  );
}
