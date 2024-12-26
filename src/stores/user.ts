import { createSlice } from '@reduxjs/toolkit';
import { setLocalInfo, getLocalInfo, removeLocalInfo } from '@/utils/local';
import { STORAGE_AUTHORIZE_KEY } from '@/stores/public';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userLogout } from "@/api/user";
import { RouteType } from '#/menu'
import { setNav } from './tabs'

interface UserData {
  token: string;
  permissions: string[];
  userInfo: any
  routeList: RouteType[];
}

// 初始化状态
const initialState: UserData = {
  permissions: [],
  token: '',
  userInfo: {
    id: "",
    username: '',
    email: '',
    phone: ''
  },
  routeList: [],
};

// 创建切片
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRouteList: (state, action) => {
      state.routeList = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload;
      setLocalInfo(STORAGE_AUTHORIZE_KEY, action.payload);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    clearInfo: (state) => {
      removeLocalInfo(STORAGE_AUTHORIZE_KEY);
      state.routeList = [];
      state.userInfo = {
        id: "",
        username: '',
        email: '',
        phone: ''
      };
    },
  },
});

// 异步的登出操作
export const logout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    try {
      await userLogout(); // 调用 API
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // 移除本地存储的授权信息
      removeLocalInfo(STORAGE_AUTHORIZE_KEY);
      // 清除用户信息
      dispatch(userSlice.actions.clearInfo());
      dispatch(closeAllTab())
    }
  }
);

export const {
  setUserInfo,
  setPermissions,
  clearInfo,
  setRouteList,
  setToken,
} = userSlice.actions;

export default userSlice.reducer;
