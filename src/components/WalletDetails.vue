<template>
  <div class="wallet-details-card" v-if="walletDetails.name">
    <h3>Wallet Details</h3>
    <p><strong>Name:</strong> {{ walletDetails.name }}</p>
    <p><strong>Balance:</strong> {{ walletDetails.balance }}</p>
    <p>
      <strong>Date:</strong>
      {{ new Date(walletDetails.date).toLocaleDateString() }}
    </p>
    <p><strong>Wallet ID:</strong> {{ walletDetails.id }}</p>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const props = defineProps({
  walletId: String,
});

const walletDetails = ref({});

const fetchWalletDetails = async () => {
  try {
    const response = await axios.get(`/api/wallet/${props.walletId}`);
    walletDetails.value = response.data.data;
  } catch (error) {
    console.error("Error fetching wallet details:", error);
  }
};

onMounted(fetchWalletDetails);
watch(
  () => props.walletId,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      fetchWalletDetails();
    }
  }
);
</script>

<style scoped>
.wallet-details-card {
  background-color: #444;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
}

.loading {
  color: #fff;
  padding: 20px;
}
</style>
