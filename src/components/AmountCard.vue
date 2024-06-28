<template>
  <div class="amount-card">
    <h3>Transaction</h3>
    <form @submit.prevent="submitTransaction">
      <div class="form-group">
        <label for="amount">Amount:</label>
        <input type="number" id="amount" v-model="amount" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="description" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const props = defineProps({
  walletId: String,
});

const amount = ref(0);
const description = ref("");

const emit = defineEmits(["transaction-made"]);

const submitTransaction = async () => {
  try {
    await axios.post(`/api/transact/${props.walletId}`, {
      amount: amount.value,
      description: description.value,
    });
    emit("transaction-made");
    amount.value = 0;
    description.value = "";
  } catch (error) {
    console.error("Error making transaction:", error);
  }
};
</script>

<style scoped>
.amount-card {
  background-color: #444;
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
