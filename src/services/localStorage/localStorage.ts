export const setToken = (token: string) => {
    localStorage.setItem('@StockB:token', token);
}

export const getToken = () => {
    return localStorage.getItem('@StockB:token');
}

export const setEmployee = (employee: string) => {
    localStorage.setItem('@StockB:employee', employee);
}

export const getEmployee = () => {
    return localStorage.getItem('@StockB:employee');
}

export const clearLocalStorages = () => {
    localStorage.removeItem('@StockB:token');
    localStorage.removeItem('@StockB:employee');
    window.location.reload();
}
