
import { info, log } from "@randajan/simple-lib/node";
import Fio from "../../dist/index.js";


// Create an instance of Fio for the bank account with the given token
const fio = Fio.create("Your-account-ID", "Your-Fio-api-token");

// Get the latest transactions on the account
fio.paysLast((fio, pay) => {
    console.log("Transaction no.", index + 1);
    console.log("Date:", pay("Datum"));
    console.log("Amount:", pay("Objem"));
    console.log("Account number:", pay("Protiúčet"));
    // ... other transaction details ...
});

// Get transactions in a specific period
const fromDate = "2023-01-01";
const toDate = "2023-07-25";
fio.paysByPeriod(fromDate, toDate, (fio, pay) => {
    console.log("Transaction no.", index + 1);
    console.log("Date:", pay("Datum"));
    console.log("Amount:", pay("Objem"));
    console.log("Account number:", pay("Protiúčet"));
    // ... other transaction details ...
});