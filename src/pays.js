import { getColumn } from "./columns";

export const payInterfaceFactory = pay=>columnIdOrAlias=>{
    const { id, trait } = getColumn(columnIdOrAlias);
    const pc = pay["column"+id];
    return trait(pc ? pc.value : null);
}

export const mapPays = async (pays, callback, ...a)=>{
    return pays.map(pay => callback(this, payInterfaceFactory(pay), ...a));
}