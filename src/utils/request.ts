import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
// import { AxiosLoading } from './loading'
import { STORAGE_AUTHORIZE_KEY, LANG } from '@/stores/public'
import { setLocalInfo, getLocalInfo, removeLocalInfo } from '@/utils/local';
import { ContentTypeEnum, RequestEnum } from '~#/http-enum'
// import { useSelector } from 'react-redux';
// import { RootState } from '@/stores';
import { logout } from '@/stores/user';
import { notification as notificationInfo } from 'antd'
import { useDispatch } from 'react-redux';
// const token = useSelector((state: RootState) => state.auth.token);
// import router from '~/router'

export interface ResponseBody<T = any> {
  code: number
  data?: T
  msg: string
}

export interface RequestConfigExtra {
  token?: boolean
  customDev?: boolean
  loading?: boolean
}
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API ?? '/',
  timeout: 60000,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
})
// const axiosLoading = new AxiosLoading()
async function requestHandler(config: InternalAxiosRequestConfig & RequestConfigExtra): Promise<InternalAxiosRequestConfig> {
  // 处理请求前的url
  if (
    import.meta.env.DEV
    && import.meta.env.VITE_APP_BASE_API_DEV
    && import.meta.env.VITE_APP_BASE_URL_DEV
    && config.customDev
  ) {
    //  替换url的请求前缀baseUrl
    config.baseURL = import.meta.env.VITE_APP_BASE_API_DEV
  }
  const token = getLocalInfo(STORAGE_AUTHORIZE_KEY)
  if (token && config.token !== false)
    config.headers.set(STORAGE_AUTHORIZE_KEY, token)

  // 增加多语言的配置
  const locale = localStorage.getItem(LANG);
  if (locale)
    config.headers.set('Accept-Language', locale ?? 'zh')
  return config
}

function responseHandler(response: any): ResponseBody<any> | AxiosResponse<any> | Promise<any> | any {
  return response.data
}

async function errorHandler(error: AxiosError): Promise<any> {
  if (error.response) {
    // const navigate = useNavigate();
    // const dispatch = useDispatch()
    const { data, status, statusText } = error.response as AxiosResponse<ResponseBody>
    if (status === 401) {
      notification?.info({
        message: '401',
        description: data?.msg || statusText,
        duration: 3,
      })
      localStorage.setItem(STORAGE_AUTHORIZE_KEY, "");
      // console.log(123123)
      // await dispatch(logout());
      // console.log(123123)
      // navigate('/login')
      /**
       * 这里处理清空用户信息和token的逻辑，后续扩展
       */
      // token.value = null
      // router
      //   .push({
      //     path: '/login',
      //     query: {
      //       redirect: router.currentRoute.value.fullPath,
      //     },
      //   })
      //   .then(() => {})
    }
    else if (status === 403) {
      notification?.info({
        message: '403',
        description: data?.msg || statusText,
        duration: 3,
      })
    }
    else if (status === 500) {
      notification?.info({
        message: '500',
        description: data?.msg || statusText,
        duration: 3,
      })
    }
    else {
      notification?.info({
        message: '服务错误',
        description: data?.msg || statusText,
        duration: 3,
      })
    }
  }
  return Promise.reject(error)
}
interface AxiosOptions<T> {
  url: string
  params?: T
  data?: T
}
instance.interceptors.request.use(requestHandler)

instance.interceptors.response.use(responseHandler, errorHandler)

export default instance
function instancePromise<R = any, T = any>(options: AxiosOptions<T> & RequestConfigExtra): Promise<ResponseBody<R>> {
  // const { loading } = options
  return new Promise((resolve, reject) => {
    instance.request(options).then((res) => {
      resolve(res as any)
    }).catch((e: Error | AxiosError) => {
      reject(e)
    }).finally(() => {
      // if (loading)
      // axiosLoading.closeLoading()
    })

  })
}
export function useGet<R = any, T = any>(url: string, params?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    params,
    method: RequestEnum.GET,
    ...config,
  }
  return instancePromise<R, T>(options)
}

export function usePost<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    data,
    method: RequestEnum.POST,
    ...config,
  }
  return instancePromise<R, T>(options)
}

export function usePut<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    data,
    method: RequestEnum.PUT,
    ...config,
  }
  return instancePromise<R, T>(options)
}

export function useDelete<R = any, T = any>(url: string, data?: T, config?: AxiosRequestConfig & RequestConfigExtra): Promise<ResponseBody<R>> {
  const options = {
    url,
    data,
    method: RequestEnum.DELETE,
    ...config,
  }
  return instancePromise<R, T>(options)
}
