export interface PropsGetOrderQuery {
    limit: string;
    page: string;
    groupFilter: number;
    typeFilter: string;
    numberFilter: string;
}

export interface PropsGetTotalOrders {
    groupFilter: number;
    typeFilter: string;
    numberFilter: string;
}