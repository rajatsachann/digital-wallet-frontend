<template>
  <v-container>
    <v-data-table
      
      :items="transactions"
      item-key="_id"
      class="elevation-1"
    >
      <template v-slot:item._id="{ item }">
        {{ item._id }}
      </template>
      <template v-slot:item.amount="{ item }">
        {{ item.amount }}
      </template>
      <template v-slot:item.balance="{ item }">
        {{ item.balance }}
      </template>
      <template v-slot:item.description="{ item }">
        {{ item.description }}
      </template>
      <template v-slot:item.type="{ item }">
        {{ item.type }}
      </template>
      <template v-slot:item.date="{ item }">
        {{ new Date(item.date).toLocaleString() }}
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Transactions</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="exportToCSV">Export to CSV</v-btn>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';
import { saveAs } from 'file-saver';

export default {
  data() {
    return {
      headers: [
        { text: 'Transaction ID', value: '_id' },
        { text: 'Amount', value: 'amount' },
        { text: 'Balance', value: 'balance' },
        { text: 'Description', value: 'description' },
        { text: 'Type', value: 'type' },
        { text: 'Date', value: 'date' },
      ],
      transactions: [],
    };
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      try {
        const walletId = localStorage.getItem('walletId'); // get walletId from local storage
        const response = await axios.get(`api/transactions?walletId=${walletId}&skip=0&limit=10`);
        if (response.data.success) {
          this.transactions = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    },
    exportToCSV() {
      const csvContent = [
        this.headers.map(header => header.text), // headers row
        ...this.transactions.map(item => [
          item._id,
          item.amount,
          item.balance,
          item.description,
          item.type,
          new Date(item.date).toLocaleString(),
        ])
      ].map(e => e.join(",")).join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'transactions.csv');
    },
  },
};
</script>

<style scoped>
.v-data-table {
  margin-top: 20px;
}
</style>
