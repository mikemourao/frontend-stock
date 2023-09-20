interface Items {
    key: string,
    title: string,
    icon?: React.ReactNode,
    path?: string,
    items?: Array<Items>
}

export default interface Sidebar {
    items: Array<Items>
}