<template>
  <div v-if="showCard" class="card">
    <h2>Register New Wallet</h2>
    <form @submit.prevent="submitForm">
      <div>
        <input type="text" v-model="name" placeholder="Name" required />
      </div>
      <div>
        <input
          type="number"
          v-model="initialBalance"
          min="0"
          placeholder="Intial Balance"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
  <div v-else>
    <OtherCards />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import OtherCards from "./OtherCard.vue";

const showCard = ref(true);
const name = ref("");
const initialBalance = ref(0);

const checkRegistrationStatus = () => {
  const wallet = localStorage.getItem("wallet");
  if (wallet) {
    showCard.value = false;
  }
};

onMounted(() => {
  checkRegistrationStatus();
});

const submitForm = () => {
  const wallet = {
    name: name.value,
    initialBalance: initialBalance.value,
  };
  localStorage.setItem("wallet", JSON.stringify(wallet));
  showCard.value = false;
};
</script>

<style scoped>
.card {
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

input {
  display: block;
  margin: 10px 0 10px;
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
  background-color: lightgray;
  color: black;
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
