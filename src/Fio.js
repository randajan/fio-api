import fetch from "node-fetch";
import { toDateString } from "./date";
import { mapPays } from "./pays";

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
        const data = await fetch(url).then(resp=>resp.json());
        const state = data?.accountStatement;
        if (!state) { throw Error(this.msg("unable to fetch response body")); }

        const accountId = state.info.accountId;
        if (accountId !== this.accountId) { throw Error(this.msg("wrong accountId '" + accountId + "'")); }

        return state.transactionList.transaction;
    }

    async map(path, callback, ...a) {
        return mapPays(await this.fetch(path), callback, ...a);
    }

    async paysLast(callback, ...a) {
        return this.map(["last", this.token, "transactions.json"], callback, ...a);
    }

    async paysByPeriod(fromDate, toDate, callback, ...a) {
        return this.map(["periods", this.token, toDateString(fromDate), toDateString(toDate), "transactions.json"], callback, ...a);
    }

}