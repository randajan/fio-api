# @randajan/fio-api

[![NPM](https://img.shields.io/npm/v/@randajan/fio-api.svg)](https://www.npmjs.com/package/@randajan/fio-api) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


This package provides a simple interface for collecting transactions from a bank account using the Fio API. It can work with data in the "YYYY-MM-DD" format or Date instances. It also allows you to add custom columns and map their values using functions.

## Installation
To install the package, use the following command:

```bash
yarn add @randajan/fio-api
```

## Usage
```javascript
import Fio from "@randajan/fio-api";

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
```

## Documentation

### Function Fio.create(accountId, token)
Creates an instance of Fio for the bank account with the specified accountId and Fio API token.

### Method Fio.fetch(path)
Fetches data from the Fio API server for the given path. Returns a list of transactions on the account.

### Method Fio.map(path, callback, ...a)
Fetches data from the Fio API server for the given path and performs data mapping using the callback function.

### Method Fio.paysLast(callback, ...a)
Gets the latest transactions on the account and performs data mapping using the callback function.

### Method Fio.paysByPeriod(fromDate, toDate, callback, ...a)
Gets transactions in a specific period and performs data mapping using the callback function.

### Function toDateString(date)
Converts the given date to the "YYYY-MM-DD" format. It can also accept Date instances.

### Function addColumnAlias(idOrAlias, ...aliases)
Adds aliases for the column with the given ID or alias.

### Function addTrait(idOrAlias, trait)
Adds a custom getter (trait) for mapping the values of the column with the given ID or alias.

### Function addUserAlias(user, alias)
Adds an alias for the user. By default it's used at trait

### Function getUserAlias(user)
Get an alias for the user.

## License
MIT

By using this package, you agree to the licensing terms.