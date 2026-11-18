<script setup lang="ts">
const doctorFilter = useState<string>('doctorFilter', () => 'all')

const groups = [
  { title: 'Specialty Clinics', items: hospitalServices.filter((s) => s.type === 'clinic') },
  { title: 'Diagnostic & Support Services', items: hospitalServices.filter((s) => s.type === 'support') },
]

function doctorLabel(serviceId: string) {
  const n = doctorsForService(serviceId).length
  if (n === 0) return 'Schedule to be announced'
  return `${n} doctor${n > 1 ? 's' : ''}`
}

function pickService(service: { id: string; type: string }) {
  if (service.type === 'clinic') doctorFilter.value = service.id
}
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

      <div v-for="group in groups" :key="group.title" class="mt-10">
        <h3 class="mb-4 text-lg font-semibold text-base-content/80">{{ group.title }}</h3>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <component
            :is="service.type === 'clinic' ? 'a' : 'div'"
            v-for="service in group.items"
            :key="service.id"
            :href="service.type === 'clinic' ? '#doctors' : undefined"
            class="card border border-base-300 bg-base-100 transition"
            :class="service.type === 'clinic' ? 'hover:border-primary hover:shadow-md' : ''"
            @click="pickService(service)"
          >
            <div class="card-body items-center text-center">
              <div class="flex h-14 w-14 items-center justify-center rounded-full bg-base-200 text-3xl">
                {{ service.icon }}
              </div>
              <h4 class="card-title text-base text-primary">{{ service.name }}</h4>
              <p class="text-sm text-base-content/70">{{ service.description }}</p>
              <p v-if="service.type === 'clinic'" class="text-xs font-medium text-primary">
                {{ doctorLabel(service.id) }}
              </p>
            </div>
          </component>
        </div>
      </div>
    </div>
  </section>
</template>