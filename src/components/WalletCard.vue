<template>
  <div v-if="!walletId" class="card">
    <h2>Register New Wallet</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="initialBalance">Initial Balance:</label>
        <input
          type="number"
          id="initialBalance"
          v-model.number="initialBalance"
          step="0.0001"
          min="0"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
  <div v-else>
    <wallet-details :wallet-id="walletId" />
    <amount-card :wallet-id="walletId" @transaction-made="fetchWalletDetails" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import WalletDetails from "./WalletDetails.vue";
import AmountCard from "./AmountCard.vue";

const name = ref("");
const initialBalance = ref(0); // initialBalance is initialized
const walletId = ref(localStorage.getItem("walletId"));

const submitForm = async () => {
  try {
    console.log("ib", initialBalance.value);
    const response = await axios.post("/api/setup", {
      name: name.value,
      balance: initialBalance.value,
    });
    walletId.value = response.data.data.id;
    localStorage.setItem("walletId", walletId.value);
  } catch (error) {
    console.error("Error registering wallet:", error);
  }
};
</script>

<style scoped>
.card {
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

label {
  flex: 1;
  margin-right: 10px;
}

input {
  flex: 2;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #555;
  color: #fff;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
