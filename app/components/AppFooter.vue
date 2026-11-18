<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-primary text-primary-content">
    <div class="mx-auto max-w-7xl px-4 py-10 text-center">
      <p class="text-lg font-semibold">{{ hospitalInfo.name }}</p>
      <p class="mt-1 text-sm opacity-80">{{ hospitalInfo.address }}</p>
      <p class="mt-4 text-xs opacity-70">
        This website is for appointments and service information only. It does not provide
        medical advice or online consultation. All transactions are completed at the hospital.
      </p>
      <p class="mt-4 text-xs opacity-70">© {{ year }} {{ hospitalInfo.name }}. All rights reserved.</p>
    </div>
  </footer>
</template>