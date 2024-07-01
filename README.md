# Wallet Management Application

This is a Vue.js application for managing wallets and transactions. It allows users to register a new wallet, view wallet details, and make transactions (credit and debit). The application stores the wallet information in the browser's local storage.

![image](https://github.com/rajatsachann/digital-wallet-frontend/assets/50901210/bbeb5d76-db83-4186-9a18-154ac61118ca)

## Features
- **Register New Wallet:** Create a new wallet with an initial balance.

- **View Wallet Details:** Display wallet name, balance, creation date, and wallet ID.

- **Make Transactions:** Add credit or debit transactions to the wallet.

- **Persistent Storage:** Wallet ID is stored in local storage to maintain state across sessions.

## Components

### WalletCard.vue
- **Description:** This component handles wallet registration and displays wallet details and the transaction form if a wallet is registered.
- **Props:** None
- **State:name (String):** Name of the wallet.
- **initialBalance (Number):** Initial balance of the wallet.
- **walletId (String):** Wallet ID stored in local storage.
- **Methods:** submitForm(): Registers a new wallet and stores the wallet ID in local storage.


### WalletDetails.vue

- **Description:** This component displays the details of the registered wallet.
- **Props:** walletId (String): Wallet ID passed from WalletCard.
- **State:** walletDetails (Object): Contains wallet details like name, balance, date, and ID.
- **Methods:** fetchWalletDetails(): Fetches wallet details from the API using the wallet ID.

### AmountCard.vue

- **Description:** This component provides a form to make credit or debit transactions.
- **Props: walletId (String):** Wallet ID passed from WalletCard.
- **State: amount (Number):** Amount to be transacted.
- **description (String):** Description of the transaction.
- **transactionType (String):** Type of transaction (CREDIT or DEBIT).


### Lifecycle Hooks:
- **onMounted():** Fetches wallet details when the component is mounted.
- **watch():** Watches for changes in walletId and refetches wallet details.

### Methods:
- **submitTransaction():** Posts a new transaction to the API and emits transaction-made event.
- **resetForm():** Resets the form fields after a successful transaction.

### API Endpoints

- **POST /api/setup:** Registers a new wallet.
- **GET /api/wallet/:walletId:** Fetches wallet details.
- **GET /api/transact/:walletId:** Fetches transaction details. 
- **POST /api/transact/:walletId:** Posts a new transaction to the wallet.

  
### Project Setup

##Prerequisites
- Node.js
- Vue CLI

### Installation
Clone the repository: https://github.com/rajatsachann/digital-wallet-frontend.git

``` bash
git clone https://github.com/rajatsachann/digital-wallet-frontend.git
cd digital-wallet-frontend
```

### Install dependencies:

```bash
npm install
```

### Start the development server:

```bash 
npm run dev
```
