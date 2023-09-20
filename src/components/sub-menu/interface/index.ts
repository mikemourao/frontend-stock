interface Items {
    key: string,
    title: string,
    icon?: React.ReactNode,
    path?: string,
    items?: Array<Items>
}

export default interface SubMenu {
    title: string,
    icon?: any,
    key?: string,
    items: Array<Items>
}