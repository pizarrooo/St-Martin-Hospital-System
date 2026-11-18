<template>
  <section id="home" class="bg-gradient-to-b from-base-200 to-base-100">
    <div class="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
      <!-- Text -->
      <div>
        <span class="badge badge-outline badge-primary mb-4">
          OPD open 6:00 AM – 5:00 PM · Hospital open 24/7
        </span>
        <h1 class="text-4xl font-bold leading-tight text-primary md:text-5xl">
          Your Health,<br />Our Priority
        </h1>
        <p class="mt-4 max-w-md text-base-content/70">
          Quality care, compassionate service, and a healthier tomorrow for mothers,
          babies, and children in Noveleta, Cavite.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a href="#book" class="btn btn-primary text-white">Book Appointment</a>
          <a href="#services" class="btn btn-outline btn-primary">Learn More</a>
        </div>
      </div>

      <!-- Placeholder illustration -->
      <div class="flex justify-center">
        <svg viewBox="0 0 400 300" class="w-full max-w-md" role="img" aria-label="Hospital building">
          <rect x="0" y="260" width="400" height="40" fill="#dfe7f5" />
          <rect x="110" y="60" width="180" height="200" rx="6" fill="#2f4f93" />
          <rect x="40" y="130" width="80" height="130" rx="4" fill="#5b7fc7" />
          <rect x="280" y="130" width="80" height="130" rx="4" fill="#5b7fc7" />
          <path d="M190 75h20v20h20v20h-20v20h-20v-20h-20v-20h20z" fill="#fff" />
          <g fill="#dfe7f5">
            <rect x="130" y="150" width="24" height="24" rx="2" />
            <rect x="188" y="150" width="24" height="24" rx="2" />
            <rect x="246" y="150" width="24" height="24" rx="2" />
            <rect x="130" y="195" width="24" height="24" rx="2" />
            <rect x="246" y="195" width="24" height="24" rx="2" />
            <rect x="60" y="160" width="20" height="20" rx="2" />
            <rect x="320" y="160" width="20" height="20" rx="2" />
          </g>
          <rect x="182" y="215" width="36" height="45" rx="3" fill="#fff" />
        </svg>
      </div>
    </div>
  </section>
</template>