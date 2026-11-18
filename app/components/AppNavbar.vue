<script setup lang="ts">
const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
    <div class="navbar mx-auto max-w-7xl px-4">
      <!-- Logo + mobile menu -->
      <div class="navbar-start">
        <div class="dropdown lg:hidden">
          <div tabindex="0" role="button" class="btn btn-ghost btn-square" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabindex="0" class="menu dropdown-content z-10 mt-3 w-56 rounded-box bg-base-100 p-2 shadow">
            <li v-for="link in links" :key="link.href">
              <a :href="link.href">{{ link.label }}</a>
            </li>
            <li class="mt-2">
              <a href="#book" class="btn btn-primary btn-sm text-white">Book Appointment</a>
            </li>
          </ul>
        </div>

        <a href="#home" class="flex items-center gap-2">
          <svg viewBox="0 0 24 24" class="h-9 w-9 text-primary" fill="currentColor" aria-hidden="true">
            <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" />
          </svg>
          <span class="leading-tight">
            <span class="block text-sm font-bold text-primary">St. Martin</span>
            <span class="block text-[11px] text-base-content/70">Maternity &amp; Pediatric Hospital</span>
          </span>
        </a>
      </div>

      <!-- Desktop links -->
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal gap-1 px-1 text-sm">
          <li v-for="link in links" :key="link.href">
            <a :href="link.href">{{ link.label }}</a>
          </li>
        </ul>
      </div>

      <div class="navbar-end hidden lg:flex">
        <a href="#book" class="btn btn-primary btn-sm text-white">Book Appointment</a>
      </div>
    </div>
  </header>
</template>