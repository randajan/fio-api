import fetch from "node-fetch";
import { toDateString } from "./date";
import { getColumn } from "./columns";


export const payInterfaceFactory = pay=>columnIdOrAlias=>{
    const { id, trait } = getColumn(columnIdOrAlias);
    const pc = pay["column"+id];
    return trait(pc ? pc.value : null);
}

const enumerable = true;
export class Fio {

    static create(accountId, token) { return new Fio(accountId, token); }

    constructor(accountId, token) {
        Object.defineProperties(this, {
            apiUrl: { enumerable, value: "https://www.fio.cz/ib_api/rest/" },
            token: { enumerable, value: token },
            accountId: { enumerable, value: accountId },
            account: { enumerable, get: _ => accountId + "/2010" }
        });
    }

    msg(msg) {
        return "FIO api for '" + this.account + "' failed: " + msg;
    }

    async fetch(path) {
        const url = this.apiUrl + (Array.isArray(path) ? path.join("/") : String(path));
        const resp = await fetch(url);
        const json = await resp.text();

        let data;
        try { data = JSON.parse(json); } catch(err) { throw Error(this.msg("json malformated: " + json)); }

        const state = data?.accountStatement;
        const accountId = state?.info?.accountId;
        const transactions = state?.transactionList?.transaction;

        if (!accountId || !transactions) { throw Error(this.msg("unable to fetch response body")); }

        if (accountId !== this.accountId) { throw Error(this.msg("wrong accountId '" + accountId + "'")); }

        return transactions;
    }

    async map(path, callback, ...a) {
        const pays = await this.fetch(path);
        return Promise.all(pays.map(pay => callback(this, payInterfaceFactory(pay), ...a)));
    }

    async paysLast(callback, ...a) {
        return this.map(["last", this.token, "transactions.json"], callback, ...a);
    }

    async paysByPeriod(fromDate, toDate, callback, ...a) {
        return this.map(["periods", this.token, toDateString(fromDate), toDateString(toDate), "transactions.json"], callback, ...a);
    }

}