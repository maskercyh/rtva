//菜单
export interface MenuType {
    id: number
    label: string
    labelEn?: string
    key: string,
    path: string
    hidden: boolean
    index: boolean,
    icon: string
    element: string
    children?: MenuType[]
}
export interface MenuItem {
    key: string
    label: string
    labelEn: string
    path: string
    icon: React.ReactNode
    children?: MenuItem[]
}

export interface RouteType {
    key: string
    path: string
    label: string
    labelEn: string
}

