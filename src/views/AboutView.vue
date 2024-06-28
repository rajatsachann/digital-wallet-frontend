<script setup>
import TransactionTable from "../components/TransactionTable.vue";
</script>
<template>
  <main>
    <TransactionTable />
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
