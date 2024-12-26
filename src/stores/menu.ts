import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MenuType } from "#/menu"
interface MenuState {
  isPhone: boolean;
  isCollapsed: boolean;
  selectedKeys: string;
  openKeys: string[];
  menuList: MenuType[];
  spiltMenu: MenuType[];
}

const initialState: MenuState = {
  isPhone: false,
  isCollapsed: false,
  selectedKeys: 'dashboard',
  openKeys: ['Dashboard'],
  menuList: [],
  spiltMenu: []
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuList: (state, action) => {
      state.menuList = action.payload;
    },
    setSpiltMenu: (state, action) => {
      state.spiltMenu = action.payload;
    },
    toggleCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload;
    },
    togglePhone: (state, action: PayloadAction<boolean>) => {
      state.isPhone = action.payload;
    },
    setSelectedKeys: (state, action: PayloadAction<string>) => {
      state.selectedKeys = action.payload;
    },
    setOpenKeys: (state, action: PayloadAction<string[]>) => {
      state.openKeys = action.payload;
    },

  },
});

export const { toggleCollapsed, togglePhone, setSelectedKeys, setOpenKeys, setMenuList, setSpiltMenu } = menuSlice.actions;

export default menuSlice.reducer;
