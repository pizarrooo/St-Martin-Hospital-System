<script setup lang="ts">
const filter = useState<string>('doctorFilter', () => 'all')

const tabs = computed(() => [
  { id: 'all', name: 'All' },
  ...hospitalServices
    .filter((s) => s.type === 'clinic' && doctorsForService(s.id).length > 0)
    .map((s) => ({ id: s.id, name: s.name })),
])

const visibleDoctors = computed(() =>
  filter.value === 'all' ? hospitalDoctors : doctorsForService(filter.value),
)

function initials(name: string) {
  return name
    .replace(/^(Dr\.|Dra\.)\s+/, '')
    .split(' ')
    .filter((word) => /^[A-Za-z]/.test(word))
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
          Meet our experienced and dedicated medical professionals. Clinic schedules may change.
        </p>
      </div>

      <div class="mt-8 flex flex-wrap justify-center gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="btn btn-sm"
          :class="filter === tab.id ? 'btn-primary text-white' : 'btn-outline btn-primary'"
          @click="filter = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>

      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="doctor in visibleDoctors"
          :key="doctor.id"
          class="card border border-base-300 bg-base-100"
        >
          <div class="card-body">
            <div class="flex items-center gap-3">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                {{ initials(doctor.name) }}
              </div>
              <div>
                <h3 class="font-semibold leading-tight">{{ doctor.name }}</h3>
                <p class="text-sm text-base-content/70">
                  {{ doctor.specialties.map(serviceName).join(' · ') }}
                </p>
              </div>
            </div>

            <ul class="mt-3 space-y-1 text-xs text-base-content/80">
              <li v-for="line in scheduleLines(doctor)" :key="line">{{ line }}</li>
            </ul>
            <span v-if="doctor.byAppointment" class="badge badge-warning badge-sm mt-2 text-white">
              By appointment
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>