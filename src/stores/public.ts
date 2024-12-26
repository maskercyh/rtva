import { createSlice } from '@reduxjs/toolkit';
import defaultSetting from "@/config/default-setting"
import type { LayoutSetting, ThemeType } from '#/public'
export const STORAGE_AUTHORIZE_KEY = 'Authorization'
export const LAYOUT_KEY = 'layout'
export const THEME_KEY = 'theme'
export const LANG = 'lng'
export const publicSlice = createSlice({
  name: 'public',
  initialState: {
    ...defaultSetting as LayoutSetting,
    theme: 'light' as ThemeType, // 主题
    isFullscreen: false, // 是否全屏
    isRefresh: false, // 重新加载
    isRefreshPage: false // 重新加载页面
  },
  reducers: {
    setWatermark: (state, action) => {
      state.watermark = action.payload;
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
    setCompact: (state, action) => {
      state.compact = action.payload;
    },

    setColorPrimary: (state, action) => {
      state.colorPrimary = action.payload;
    },
    /** 设置主题 */
    setThemeValue: (state, action) => {
      state.theme = action.payload;
    },
    /** 设置全屏 */
    setFullscreen: (state, action) => {
      state.isFullscreen = action.payload;
    },
    // /** 设置重新加载 */
    // setRefresh: (state, action) => {
    //   state.isRefresh = action.payload;
    // },
    // /** 设置重新加载页面 */
    // setRefreshPage: (state, action) => {
    //   state.isRefreshPage = action.payload;
    // }
  }
});

export const {
  setThemeValue,
  setFullscreen,
  setCompact,
  setWatermark,
  // setRefresh,
  // setRefreshPage,
  setLayout,
  setColorPrimary
} = publicSlice.actions;

export default publicSlice.reducer;