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

    static create(accountId, token, apiUrl="https://fioapi.fio.cz/v1/rest/") { return new Fio(accountId, token, apiUrl); }

    constructor(accountId, token, apiUrl="https://fioapi.fio.cz/v1/rest/") {
        Object.defineProperties(this, {
            apiUrl: { enumerable, value: apiUrl },
            token: { enumerable, value: token },
            accountId: { enumerable, value: accountId },
            account: { enumerable, get: _ => accountId + "/2010" }
        });
    }

    msg(msg) {
        return "FIO api for '" + this.account + "' failed: " + msg;
    }

    async fetch(path, method="GET") {
        const url = this.apiUrl + (Array.isArray(path) ? path.join("/") : String(path));
        const msg = method + " " + url;

        const resp = await fetch(url, { method });
        const body = await resp.text();

        if (resp.status != 200) { throw Error(this.msg(`response status ${resp.status}\n` + msg + "\n" + body)); }
        
        let data;
        if (!body) { throw Error(this.msg("blank response\n" + msg)); }
        try { data = JSON.parse(body); } catch(err) { throw Error(this.msg("json malformated\n" + msg + "\n" + body)); }

        const state = data?.accountStatement;
        const accountId = state?.info?.accountId;
        const transactions = state?.transactionList?.transaction;

        if (!accountId || !transactions) { throw Error(this.msg("unable to fetch response body\n" + msg)); }

        if (accountId !== this.accountId) { throw Error(this.msg("wrong accountId '" + accountId + "'\n" + msg)); }

        return transactions;
    }

    async map(path, onPay, ...a) {
        const pays = await this.fetch(path);
        return Promise.all(pays.map(pay => onPay(this, payInterfaceFactory(pay), ...a)));
    }

    async setLastId(payId) {
        return this.fetch(["set-last-id", this.token, payId]);
    }

    async setLastDate(date) {
        return this.fetch(["set-last-date", this.token, toDateString(date)]);
    }

    async paysLast(onPay, ...a) {
        return this.map(["last", this.token, "transactions.json"], onPay, ...a);
    }

    async paysByPeriod(fromDate, toDate, onPay, ...a) {
        return this.map(["periods", this.token, toDateString(fromDate), toDateString(toDate), "transactions.json"], onPay, ...a);
    }

}