export interface PropsGetOrderQuery {
    limit: string;
    page: string;
    groupFilter: number;
    typeFilter: string;
    numberFilter: string;
}

export interface PropsGetTotalOrdersQuery {
    groupFilter: number;
    typeFilter: string;
    numberFilter: string;
}

export interface PropsCreateOrderQuery {
    numero: string;
    tipo: string;
    id_grupo: number;
}

export interface PropsUpdateOrderQuery {
    numero: string;
    tipo: string;
    id_grupo: number;
    order_id: number; 
}