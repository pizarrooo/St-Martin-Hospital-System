<script setup lang="ts">
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospitalInfo.address)}`
const telHref = (phone: string) => 'tel:' + phone.replace(/[^\d+]/g, '')
</script>

<template>
  <section id="contact" class="bg-base-200">
    <div class="mx-auto max-w-7xl px-4 py-16">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-primary">Contact Us</h2>
        <p class="mt-2 text-base-content/70">We're here to help. Reach us any time.</p>
      </div>

      <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div class="card border border-base-300 bg-base-100">
          <div class="card-body">
            <h3 class="card-title text-base text-primary">📍 Address</h3>
            <p class="text-sm">{{ hospitalInfo.address }}</p>
            <a :href="mapsUrl" target="_blank" rel="noopener" class="link link-primary text-sm">
              Open in Google Maps
            </a>
          </div>
        </div>

        <div class="card border border-base-300 bg-base-100">
          <div class="card-body">
            <h3 class="card-title text-base text-primary">📞 Phone</h3>
            <ul class="space-y-1 text-sm">
              <li v-for="phone in hospitalInfo.phones" :key="phone">
                <a :href="telHref(phone)" class="link link-hover">{{ phone }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="card border border-base-300 bg-base-100">
          <div class="card-body">
            <h3 class="card-title text-base text-primary">💳 HMO Desk</h3>
            <ul class="space-y-1 text-sm">
              <li v-for="phone in hospitalInfo.hmoPhones" :key="phone">
                <a :href="telHref(phone)" class="link link-hover">{{ phone }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="card border border-base-300 bg-base-100">
          <div class="card-body">
            <h3 class="card-title text-base text-primary">🕒 Hours</h3>
            <p class="text-sm">
              <span class="font-medium">Out-Patient Department:</span><br />
              {{ hospitalInfo.opdHours }}
            </p>
            <p class="text-sm">
              <span class="font-medium">Hospital:</span><br />
              {{ hospitalInfo.hospitalHours }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6 rounded-box border border-error/30 bg-error/10 p-4 text-center text-sm">
        <span class="font-semibold text-error">Emergency?</span>
        Emergency cases are attended to at the Emergency Room (ER), which is open 24/7.
      </div>
    </div>
  </section>
</template>