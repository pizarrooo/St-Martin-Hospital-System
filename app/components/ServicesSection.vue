<script setup lang="ts">
// hospitalServices is auto-imported from app/utils/hospitalData.ts
</script>

<template>
  <section id="services" class="bg-base-100">
    <div class="mx-auto max-w-7xl px-4 py-16">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-primary">Our Services</h2>
        <p class="mt-2 text-base-content/70">
          Comprehensive medical care for you and your family.
        </p>
      </div>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="service in hospitalServices"
          :key="service.id"
          href="#book"
          class="card border border-base-300 bg-base-100 transition hover:border-primary hover:shadow-md"
        >
          <div class="card-body items-center text-center">
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-base-200 text-3xl">
              {{ service.icon }}
            </div>
            <h3 class="card-title text-base text-primary">{{ service.name }}</h3>
            <p class="text-sm text-base-content/70">{{ service.description }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>