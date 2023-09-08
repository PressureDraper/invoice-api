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

export interface PropsCreateOrderDetailQuery {
    importe: number;
    id_clave: number;
    id_pedido: number;
}

export interface PropsUpdateOrderQuery {
    numero: string;
    tipo: string;
    id_grupo: number;
    order_id: number; 
}

export interface PropsUpdateOrderDetailQuery {
    importe: number;
    id_clave: number;
    id_pedido: number;
    detail_id: number;
}