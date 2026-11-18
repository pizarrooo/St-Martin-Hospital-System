<script setup lang="ts">
function initials(name: string) {
  return name
    .replace('Dr. ', '')
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
}
</script>

<template>
  <section id="doctors" class="bg-base-200">
    <div class="mx-auto max-w-7xl px-4 py-16">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-primary">Our Doctors</h2>
        <p class="mt-2 text-base-content/70">
          Meet our experienced and dedicated medical professionals.
        </p>
      </div>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="doctor in hospitalDoctors"
          :key="doctor.id"
          class="card border border-base-300 bg-base-100"
        >
          <div class="card-body items-center text-center">
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
              {{ initials(doctor.name) }}
            </div>
            <h3 class="card-title text-base">{{ doctor.name }}</h3>
            <p class="text-sm text-base-content/70">{{ doctor.specialty }}</p>
            <p class="mt-1 text-xs text-primary">{{ doctor.days.join(' · ') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>