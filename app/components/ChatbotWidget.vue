<script setup lang="ts">
import type { BotOption } from '~/utils/chatbot'

interface Message {
  from: 'bot' | 'user'
  text: string
  options?: BotOption[]
}

const open = ref(false)
const input = ref('')
const listEl = ref<HTMLElement | null>(null)
const messages = ref<Message[]>([{ from: 'bot', ...getBotReply('cmd:menu') }])

function scrollDown() {
  nextTick(() => {
    if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
  })
}

// label = what the patient sees, query = what the assistant reads
function ask(label: string, query: string) {
  messages.value.push({ from: 'user', text: label })
  messages.value.push({ from: 'bot', ...getBotReply(query) })
  scrollDown()
}

function sendTyped() {
  const text = input.value.trim()
  if (!text) return
  input.value = ''
  ask(text, text)
}
</script>

<template>
  <div>
    <!-- Chat panel -->
    <div
      v-show="open"
      class="fixed bottom-24 left-4 z-50 flex max-h-[75vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-2xl"
    >
      <div class="flex items-center justify-between bg-primary px-4 py-3 text-primary-content">
        <div>
          <p class="font-semibold">Hospital Assistant</p>
          <p class="text-xs opacity-80">How can I help you today?</p>
        </div>
        <button class="btn btn-ghost btn-sm btn-circle" aria-label="Close chat" @click="open = false">✕</button>
      </div>

      <div ref="listEl" class="flex-1 space-y-3 overflow-y-auto bg-base-200 p-4">
        <template v-for="(msg, i) in messages" :key="i">
          <div class="flex" :class="msg.from === 'user' ? 'justify-end' : 'justify-start'">
            <div
              class="max-w-[90%] whitespace-pre-line rounded-box p-3 text-sm"
              :class="
                msg.from === 'user'
                  ? 'rounded-tr-none bg-primary text-primary-content'
                  : 'rounded-tl-none bg-base-100 shadow-sm'
              "
            >
              {{ msg.text }}
            </div>
          </div>

          <!-- Quick replies, only under the latest bot message -->
          <div
            v-if="msg.options && i === messages.length - 1"
            class="flex flex-wrap gap-2"
          >
            <button
              v-for="opt in msg.options"
              :key="opt.command"
              class="btn btn-outline btn-primary btn-sm h-auto min-h-8 whitespace-normal py-1 text-left"
              @click="ask(opt.label, opt.command)"
            >
              {{ opt.label }}
            </button>
          </div>
        </template>
      </div>

      <div class="border-t border-base-300 bg-base-100 p-3">
        <div class="flex gap-2">
          <input
            v-model="input"
            type="text"
            placeholder="Type a message..."
            class="input input-bordered input-sm flex-1"
            @keyup.enter="sendTyped"
          />
          <button class="btn btn-primary btn-sm text-white" aria-label="Send" @click="sendTyped">➤</button>
        </div>
        <p class="mt-2 text-[11px] text-base-content/60">
          Automated assistant. It does not give medical advice or diagnose.
        </p>
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