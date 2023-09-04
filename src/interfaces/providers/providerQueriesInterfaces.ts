export interface PropsGetProviderQuery {
    limit: string;
    page: string;
    rfcFilter: string;
    nameFilter: string;
    clabeFilter: string;
}

export interface PropsGetTotalProvierQuery {
    rfcFilter: string;
    nameFilter: string;
    clabeFilter: string;    
}

export interface PropsUpdateProviderQuery {
    clabe: string;
    id_provider: number;
}

export interface PropsCreateProviderQuery {
    rfc: string;
    nombre: string;
    domicilio?: string | null;
    noexterior?: string | null;
    nointerior?: string | null;
    colonia?: string | null;
    ciudad?: string | null;
    estado?: string | null;
    pais?: string | null;
    cp?: string | null;
    localidad?: string | null;
    condpago?: string | null;
    telefono?: string | null;
    cuentad?: string | null;
    cuentah?: string | null;
    ivad?: string | null;
    ivah?: string | null;
    estatus?: string | null;
    curp?: string | null;
    clabe?: string | null;
}