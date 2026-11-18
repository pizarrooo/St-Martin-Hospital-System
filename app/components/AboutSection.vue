<template>
  <section id="about" class="bg-base-100">
    <div class="mx-auto max-w-7xl px-4 py-16">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-primary">About the Hospital</h2>
        <p class="mt-2 text-base-content/70">
          {{ hospitalInfo.name }} · Noveleta, Cavite
        </p>
      </div>

      <div class="mt-10 grid gap-4 lg:grid-cols-3">
        <div class="card border border-base-300 bg-base-100">
          <div class="card-body">
            <h3 class="card-title text-primary">Our Vision</h3>
            <p class="text-sm text-base-content/80">{{ hospitalAbout.vision }}</p>
          </div>
        </div>

        <div class="card border border-base-300 bg-base-100">
          <div class="card-body">
            <h3 class="card-title text-primary">Our Mission</h3>
            <ul class="list-disc space-y-2 pl-5 text-sm text-base-content/80">
              <li v-for="item in hospitalAbout.mission" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <div class="card border border-base-300 bg-base-100">
          <div class="card-body">
            <h3 class="card-title text-primary">Our Goals</h3>
            <ul class="list-disc space-y-2 pl-5 text-sm text-base-content/80">
              <li v-for="item in hospitalAbout.goals" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-10 text-center">
        <h3 class="text-lg font-semibold text-base-content/80">Accredited HMOs</h3>
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <span v-for="hmo in hospitalHmos" :key="hmo" class="rounded-full border border-primary/40 px-3 py-1 text-sm text-primary">
            {{ hmo }}
          </span>
        </div>
        <p class="mt-3 text-xs text-base-content/60">
          PhilHealth is accepted for inpatients and eligible emergency cases.
        </p>
      </div>
    </div>
  </section>
</template>