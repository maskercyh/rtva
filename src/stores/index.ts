import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import publicReducer from './public';
import menuReducer from './menu';
import tabsReducer from './tabs';
import userReducer from './user';
export const store = configureStore({
    reducer: {
        public: publicReducer,
        menu: menuReducer,
        tabs: tabsReducer,
        user: userReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

/**
 * 获取常用的状态数据
 */
export const useCommonStore = () => {
    const spiltMenu = useSelector((state: RootState) => state.menu.spiltMenu)
    const isLock = useSelector((state: RootState) => state.tabs.isLock)
    const configSetting = useSelector((state: RootState) => state.public)
    //token
    const token = useSelector((state: RootState) => state.user.token);
    // 权限
    const permissions = useSelector((state: RootState) => state.user.permissions);
    // 用户ID
    const userId = useSelector((state: RootState) => state.user.userInfo.id);
    // 用户名
    const username = useSelector((state: RootState) => state.user.userInfo.username);
    // 是否窗口最大化
    const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize);
    // 导航数据
    const nav = useSelector((state: RootState) => state.tabs.nav);
    // 菜单是否收缩
    const isCollapsed = useSelector((state: RootState) => state.menu.isCollapsed);
    // 是否手机端
    const isPhone = useSelector((state: RootState) => state.menu.isPhone);
    // 是否重新加载
    const isRefresh = useSelector((state: RootState) => state.public.isRefresh);
    // 是否全屏
    const isFullscreen = useSelector((state: RootState) => state.public.isFullscreen);
    // 菜单打开的key
    const openKeys = useSelector((state: RootState) => state.menu.openKeys);
    // 菜单选中的key
    const selectedKeys = useSelector((state: RootState) => state.menu.selectedKeys);
    // 标签栏
    const tabs = useSelector((state: RootState) => state.tabs.tabs);
    // 主题
    const theme = useSelector((state: RootState) => state.public.theme);
    // 菜单数据
    const menuList = useSelector((state: RootState) => state.menu.menuList);
    // 路由
    const routeList = useSelector((state: RootState) => state.user.routeList);

    const activeKey = useSelector((state: RootState) => state.tabs.activeKey);
    return {
        spiltMenu,
        activeKey,
        isLock,
        configSetting,
        routeList,
        token,
        isMaximize,
        isCollapsed,
        isPhone,
        isRefresh,
        isFullscreen,
        nav,
        permissions,
        userId,
        username,
        openKeys,
        selectedKeys,
        tabs,
        theme,
        menuList
    } as const;
};

