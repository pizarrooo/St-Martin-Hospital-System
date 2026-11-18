<script setup lang="ts">
interface Message {
  from: 'bot' | 'user'
  text: string
}

const open = ref(false)
const input = ref('')
const listEl = ref<HTMLElement | null>(null)
const messages = ref<Message[]>([])

function scrollDown() {
  nextTick(() => {
    if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
  })
}

// Temporary: replaced by the rule-based assistant in Commit 5
function send(text: string) {
  const clean = text.trim()
  if (!clean) return
  messages.value.push({ from: 'user', text: clean })
  messages.value.push({
    from: 'bot',
    text: 'Thanks! My answers are still being set up and will be available soon.',
  })
  input.value = ''
  scrollDown()
}
</script>

<template>
  <div>
    <!-- Chat panel -->
    <div
      v-show="open"
      class="fixed bottom-24 left-4 z-50 flex max-h-[70vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-2xl"
    >
      <div class="flex items-center justify-between bg-primary px-4 py-3 text-primary-content">
        <div>
          <p class="font-semibold">Hospital Assistant</p>
          <p class="text-xs opacity-80">How can I help you today?</p>
        </div>
        <button class="btn btn-ghost btn-sm btn-circle" aria-label="Close chat" @click="open = false">✕</button>
      </div>

      <div ref="listEl" class="flex-1 space-y-3 overflow-y-auto bg-base-200 p-4">
        <!-- Welcome message with the two choices -->
        <div class="max-w-[85%] rounded-box rounded-tl-none bg-base-100 p-3 text-sm shadow-sm">
          <p>Hello! 👋 How can I assist you? You can:</p>
          <div class="mt-3 flex flex-col gap-2">
            <button class="btn btn-outline btn-primary btn-sm justify-start" @click="send('Book an Appointment')">
              📅 Book an Appointment
            </button>
            <button class="btn btn-outline btn-primary btn-sm justify-start" @click="send('Learn About Services')">
              🩺 Learn About Services
            </button>
          </div>
          <p class="mt-3 text-[11px] text-base-content/60">
            I'm an automated assistant. I can't give medical advice or diagnose. Transactions are
            completed at the hospital.
          </p>
        </div>

        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="flex"
          :class="msg.from === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="max-w-[85%] rounded-box p-3 text-sm"
            :class="
              msg.from === 'user'
                ? 'rounded-tr-none bg-primary text-primary-content'
                : 'rounded-tl-none bg-base-100 shadow-sm'
            "
          >
            {{ msg.text }}
          </div>
        </div>
      </div>

      <div class="flex gap-2 border-t border-base-300 bg-base-100 p-3">
        <input
          v-model="input"
          type="text"
          placeholder="Type a message..."
          class="input input-bordered input-sm flex-1"
          @keyup.enter="send(input)"
        />
        <button class="btn btn-primary btn-sm text-white" aria-label="Send" @click="send(input)">➤</button>
      </div>
    </div>

    <!-- Floating icon (bottom-left) -->
    <button
      class="btn btn-primary btn-circle btn-lg fixed bottom-4 left-4 z-50 text-2xl shadow-lg"
      :aria-label="open ? 'Close assistant' : 'Open assistant'"
      @click="open = !open"
    >
      {{ open ? '✕' : '🤖' }}
    </button>
  </div>
</template>