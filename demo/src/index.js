import Fio from "../../dist/esm/index.mjs";

import credentials from "./credentials.json";

// Create an instance of Fio for the bank account with the given token
const fio = Fio.create(credentials.accountId, credentials.apiToken);

// Get the latest transactions on the account
// fio.paysLast((fio, pay) => {
//     console.log("Transaction no.", index + 1);
//     console.log("Date:", pay("Datum"));
//     console.log("Amount:", pay("Objem"));
//     console.log("Account number:", pay("Protiúčet"));
//     // ... other transaction details ...
// });

// Get transactions in a specific period
const fromDate = "2025-05-01";
const toDate = "2025-06-30";
fio.paysByPeriod(fromDate, toDate, (fio, pay, index) => {
    console.log("Transaction no.", pay("id_task"));
    console.log("Date:", pay("Datum"));
    console.log("Amount:", pay("Objem"));
    console.log("Account number:", pay("Protiúčet"));
    console.log("Currency: ", pay("Měna"));
    // ... other transaction details ...
});