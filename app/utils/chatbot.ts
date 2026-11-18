import {
  hospitalServices,
  hospitalInfo,
  hospitalHmos,
  doctorsForService,
  scheduleLines,
} from './hospitalData'

export interface BotOption {
  label: string
  command: string // an internal "cmd:..." string that getBotReply understands
}

export interface BotReply {
  text: string
  options?: BotOption[]
}

// Change to true in Commit 8, when the online booking form exists.
const BOOKING_OPEN = false

const SCHEDULE_NOTE =
  'Clinic schedules may change because of emergencies or sudden cancellations. The hospital will contact patients with scheduled appointments.'

// Words that map a typed message to a service. Only keywords, no AI.
const serviceMatchers: Record<string, RegExp> = {
  pediatrics: /\bpedia/,
  'ob-gyne': /\bob\b|\bob-?gyn|\bgyne|maternity|prenatal|pregnan|obstetric/,
  surgery: /\bsurg/,
  cardiology: /\bcardio|\bheart/,
  urology: /\burolog/,
  'general-medicine': /general medicine|\bgp\b/,
  'family-medicine': /family medicine|family doctor/,
  'internal-medicine': /\binternal/,
  ophthalmology: /\bophthal|\beye\b/,
  oncology: /\boncolog|\bcancer/,
  orthopedics: /\borthop|\bbone/,
  pulmonology: /\bpulmo|\blung/,
  pharmacy: /\bpharmac|\bdrugstore/,
  laboratory: /\blab\b|\blaborator/,
  xray: /x-?ray/,
  ecg: /\becg\b|\bekg\b/,
  ultrasound: /ultrasound|\butz\b/,
  echo: /\b2d-?echo|\becho/,
}

const MENU: BotOption[] = [
  { label: '📅 Book an Appointment', command: 'cmd:book' },
  { label: '🩺 Learn About Services', command: 'cmd:services' },
]

const clinics = () => hospitalServices.filter((s) => s.type === 'clinic')
const supportServices = () => hospitalServices.filter((s) => s.type === 'support')
const findById = (id: string) => hospitalServices.find((s) => s.id === id)

function findService(text: string): string | undefined {
  return Object.keys(serviceMatchers).find((id) => serviceMatchers[id].test(text))
}

function doctorList(serviceId: string): string {
  const docs = doctorsForService(serviceId)
  if (!docs.length) return 'The clinic schedule for this service is still to be announced.'
  return docs
    .map(
      (d) =>
        `• ${d.name}${d.byAppointment ? ' (by appointment)' : ''}\n   ${scheduleLines(d).join('; ')}`,
    )
    .join('\n')
}

// ---------- replies ----------

function menuReply(): BotReply {
  return { text: 'Hello! 👋 How can I assist you? You can:', options: MENU }
}

function servicesOverview(): BotReply {
  const clinicNames = clinics().map((s) => `• ${s.name}`).join('\n')
  const supportNames = supportServices().map((s) => `• ${s.name}`).join('\n')
  return {
    text:
      `We offer the following services:\n\nSpecialty clinics:\n${clinicNames}\n\n` +
      `Diagnostic & support services:\n${supportNames}\n\n` +
      'Ask me about any of them, or choose below.',
    options: [
      { label: '👶 Services for children', command: 'cmd:children' },
      { label: '👩‍⚕️ Doctors & schedules', command: 'cmd:doctors' },
      { label: '📅 Book an Appointment', command: 'cmd:book' },
    ],
  }
}

function childrenReply(): BotReply {
  const list = hospitalServices.filter((s) => s.forChildren)
  if (!list.length) return servicesOverview()
  const body = list
    .map((s) => `${s.icon} ${s.name}: ${s.description}\n\n${doctorList(s.id)}`)
    .join('\n\n')
  return {
    text: `Here are our services for children:\n\n${body}\n\n${SCHEDULE_NOTE}`,
    options: [
      { label: `📅 Book ${list[0].name}`, command: `cmd:book:${list[0].id}` },
      { label: 'See all services', command: 'cmd:services' },
    ],
  }
}

function serviceReply(id: string): BotReply {
  const s = findById(id)
  if (!s) return servicesOverview()
  if (s.type === 'clinic') {
    return {
      text: `${s.icon} ${s.name}\n${s.description}\n\nDoctors and clinic schedules:\n${doctorList(id)}\n\n${SCHEDULE_NOTE}`,
      options: [
        { label: `📅 Book ${s.name}`, command: `cmd:book:${id}` },
        { label: 'See all services', command: 'cmd:services' },
      ],
    }
  }
  return {
    text: `${s.icon} ${s.name}\n${s.description}\n\nFor details, please visit the hospital or call ${hospitalInfo.phones[0]}.`,
    options: [{ label: 'See all services', command: 'cmd:services' }],
  }
}

function doctorsPrompt(): BotReply {
  return {
    text: 'Which clinic would you like to see the doctors and schedules for?',
    options: clinics().map((s) => ({ label: s.name, command: `cmd:service:${s.id}` })),
  }
}

function bookStart(): BotReply {
  return {
    text:
      'I can help you get ready to book an appointment. 📅\n\n' +
      'You will need to provide:\n' +
      '• Full name\n• Email address\n• Age\n• The service you need\n• Your preferred doctor and schedule\n\n' +
      'Please note: this is for booking only. There is no online consultation, and your visit takes place at the hospital.\n\n' +
      'First, which service do you need?',
    options: clinics().map((s) => ({ label: s.name, command: `cmd:book:${s.id}` })),
  }
}

function bookService(id: string): BotReply {
  const s = findById(id)
  if (!s) return bookStart()
  const next = BOOKING_OPEN
    ? 'Next, choose a doctor and a time slot on the booking page.'
    : `Online booking opens soon. For now, you can call ${hospitalInfo.phones[0]} to have your appointment listed.`
  return {
    text: `Great, ${s.name}. Here are the doctors and clinic schedules:\n\n${doctorList(id)}\n\n${next}\n\n${SCHEDULE_NOTE}`,
    options: [
      { label: 'Choose another service', command: 'cmd:book' },
      { label: 'Back to menu', command: 'cmd:menu' },
    ],
  }
}

function hoursReply(): BotReply {
  return {
    text:
      `🕒 Out-Patient Department: ${hospitalInfo.opdHours}\n` +
      `Hospital: ${hospitalInfo.hospitalHours}\n\n` +
      'Emergency cases are attended to at the Emergency Room (ER).',
    options: MENU,
  }
}

function contactReply(): BotReply {
  return {
    text:
      `📍 ${hospitalInfo.address}\n\n📞 ${hospitalInfo.phones.join('\n📞 ')}\n\n` +
      `HMO desk:\n${hospitalInfo.hmoPhones.join('\n')}`,
    options: MENU,
  }
}

function hmoReply(): BotReply {
  return {
    text:
      `We are accredited with these HMOs:\n${hospitalHmos.map((h) => `• ${h}`).join('\n')}\n\n` +
      'PhilHealth is used for inpatients and eligible emergency cases. The doctor will verify your HMO at the hospital.',
    options: MENU,
  }
}

function emergencyReply(): BotReply {
  return {
    text:
      '🚨 If this is an emergency, please go to the Emergency Room (ER) right away. It is open 24/7.\n\n' +
      `You can also call us at ${hospitalInfo.phones[0]}.`,
    options: MENU,
  }
}

function medicalAdviceReply(): BotReply {
  return {
    text:
      "I'm sorry, I can't give medical advice or diagnose conditions. Please consult a doctor at the hospital.\n\n" +
      'I can help you book an appointment or show our services and clinic schedules. ' +
      'If this is an emergency, please go to the Emergency Room (ER), open 24/7.',
    options: MENU,
  }
}

function fallbackReply(): BotReply {
  return {
    text:
      "Sorry, I didn't quite understand that. I can help with booking guidance and with information about our services, doctors' schedules, hours, contact details and HMOs.",
    options: MENU,
  }
}

// ---------- commands (from the option buttons) ----------

function runCommand(cmd: string): BotReply {
  const [name, arg] = cmd.split(':')
  switch (name) {
    case 'menu': return menuReply()
    case 'book': return arg ? bookService(arg) : bookStart()
    case 'services': return servicesOverview()
    case 'children': return childrenReply()
    case 'doctors': return doctorsPrompt()
    case 'service': return serviceReply(arg)
    default: return menuReply()
  }
}

// ---------- typed messages ----------

export function getBotReply(input: string): BotReply {
  const text = input.trim().toLowerCase()
  if (text.startsWith('cmd:')) return runCommand(text.slice(4))

  const wantsChildren = /\bchild|\bkid|\bbab(y|ies)|\binfant|\btoddler|\bnewborn|\bteen|\badolescent/.test(text)

  // Safety first: never give medical advice
  if (/emergenc|urgent|can'?t breathe|unconscious|accident|\bbleed/.test(text)) return emergencyReply()
  if (/diagnos|symptom|medicine|medication|dosage|\bdose\b|prescri|treatment|\bcure\b|rash|fever|cough|\bpain|vomit|dizz|headache|infection|\bsick\b|\bill\b/.test(text)) {
    return medicalAdviceReply()
  }

  if (/^\s*(hi|hello|hey|good (morning|afternoon|evening))\b/.test(text)) return menuReply()
  if (/thank/.test(text)) {
    return { text: "You're welcome! 😊 Is there anything else I can help you with?", options: MENU }
  }

  const serviceId = findService(text)

  if (/\bbook|appointment|reserve/.test(text)) {
    const id = serviceId ?? (wantsChildren ? hospitalServices.find((s) => s.forChildren)?.id : undefined)
    return id ? bookService(id) : bookStart()
  }

  if (wantsChildren) return childrenReply()
  if (serviceId) return serviceReply(serviceId)
  if (/doctor|schedule|physician|specialist/.test(text)) return doctorsPrompt()
  if (/hmo|insurance|philhealth|health card|accredit/.test(text)) return hmoReply()
  if (/hours|\bopen\b|\bopd\b|\bclose|closing/.test(text)) return hoursReply()
  if (/address|location|where|contact|phone|number|\bcall\b|direction/.test(text)) return contactReply()
  if (/service|offer|available|clinic|department|what do you/.test(text)) return servicesOverview()

  return fallbackReply()
}