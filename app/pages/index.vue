<script setup lang="ts">
const placeholders = [
  { id: 'about', label: 'About the Hospital' },
  { id: 'contact', label: 'Contact Us' },
]
</script>

<template>
  <div>
    <AppNavbar />
    <HeroSection />
    <ServicesSection />
    <DoctorsSection />

    <!-- Temporary placeholders (replaced in Commit 4) -->
    <section
      v-for="s in placeholders"
      :id="s.id"
      :key="s.id"
      class="flex min-h-[40vh] items-center justify-center border-t border-base-300"
    >
      <h2 class="text-2xl font-semibold text-primary/60">{{ s.label }} (coming soon)</h2>
    </section>
  </div>
</template>