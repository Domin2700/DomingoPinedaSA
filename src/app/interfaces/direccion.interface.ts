export interface Direccion {
    idDireccion?: number;
    calle?:string;
    sector?:string;
    municipio?: string;
    provincia?:string;
    cliente?:string;
    idProvincia?:number;
    idCliente?:number;
    enable: boolean;
}