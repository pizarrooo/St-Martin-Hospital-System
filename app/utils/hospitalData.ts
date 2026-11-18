// Real data from the hospital profile. Later this moves to the database
// and is edited by the admin from the website.

export type Day = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

export interface ScheduleSlot {
  day: Day
  start?: string // 24-hour "13:30". Empty = time by appointment
  end?: string
}

export interface HospitalDoctor {
  id: string
  name: string
  specialties: string[] // service ids
  byAppointment?: boolean
  schedule: ScheduleSlot[]
}

const ALL_DAYS: Day[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// sched('Mon,Wed', '13:00', '16:00')  or  sched('Mon-Fri', '11:00', '13:00')
function sched(days: string, start?: string, end?: string): ScheduleSlot[] {
  let list: Day[]
  if (days.includes('-')) {
    const [from, to] = days.split('-') as Day[]
    list = ALL_DAYS.slice(ALL_DAYS.indexOf(from), ALL_DAYS.indexOf(to) + 1)
  } else {
    list = days.split(',') as Day[]
  }
  return list.map((day) => ({ day, start, end }))
}

export const hospitalInfo = {
  name: 'St. Martin Maternity & Pediatric Hospital',
  address: 'Marseilla St., Salcedo II, Noveleta, Cavite',
  opdHours: '6:00 AM – 5:00 PM',
  hospitalHours: 'Open 24/7',
  phones: ['(046) 438-1112', '(046) 438-5502', '(046) 438-5609', '0976-607-9577', '0917-709-1120'],
  hmoPhones: ['0917-159-4895', '0917-106-2635'],
}

export const hospitalHmos = [
  'Icare', 'Philcare', 'Inlife Benefits', 'Cocolife', 'Medicard', 'Medocare',
  'Kaiser International', 'HMI', 'Intellicare', 'Avega', 'IMS', 'Valucare', 'Etiqa',
]

// type: 'clinic' = has doctors and schedules, 'support' = diagnostic/support service
// Descriptions are short placeholders. Edit them to match the hospital's wording.
export const hospitalServices = [
  { id: 'pediatrics', name: 'Pediatrics', type: 'clinic', icon: '👶', forChildren: true, description: 'Care for infants, children and adolescents.' },
  { id: 'ob-gyne', name: 'OB-GYNE', type: 'clinic', icon: '🤰', forChildren: false, description: "Women's health, pregnancy and maternity care." },
  { id: 'surgery', name: 'General Surgery', type: 'clinic', icon: '🏥', forChildren: false, description: 'Surgical consultations.' },
  { id: 'cardiology', name: 'Cardiology', type: 'clinic', icon: '❤️', forChildren: false, description: 'Heart-related consultations.' },
  { id: 'urology', name: 'Urology', type: 'clinic', icon: '💧', forChildren: false, description: 'Urinary tract and related consultations.' },
  { id: 'general-medicine', name: 'General Medicine', type: 'clinic', icon: '🩺', forChildren: false, description: 'Consultations for common health concerns.' },
  { id: 'family-medicine', name: 'Family Medicine', type: 'clinic', icon: '👨‍👩‍👧', forChildren: false, description: 'Care for patients of all ages.' },
  { id: 'internal-medicine', name: 'Internal Medicine', type: 'clinic', icon: '📋', forChildren: false, description: 'Adult medical consultations.' },
  { id: 'ophthalmology', name: 'Ophthalmology', type: 'clinic', icon: '👁️', forChildren: false, description: 'Eye care consultations.' },
  { id: 'oncology', name: 'Oncology', type: 'clinic', icon: '🎗️', forChildren: false, description: 'Cancer-related consultations.' },
  { id: 'orthopedics', name: 'Orthopedics', type: 'clinic', icon: '🦴', forChildren: false, description: 'Bone and joint consultations.' },
  { id: 'pulmonology', name: 'Pulmonology', type: 'clinic', icon: '🫁', forChildren: false, description: 'Lung and breathing-related consultations.' },

  { id: 'pharmacy', name: '24/7 Pharmacy', type: 'support', icon: '💊', forChildren: false, description: 'Open 24 hours a day.' },
  { id: 'laboratory', name: 'Laboratory', type: 'support', icon: '🧪', forChildren: false, description: 'Laboratory tests.' },
  { id: 'xray', name: 'X-ray', type: 'support', icon: '🩻', forChildren: false, description: 'X-ray imaging.' },
  { id: 'ecg', name: 'ECG', type: 'support', icon: '📈', forChildren: false, description: 'Electrocardiogram.' },
  { id: 'ultrasound', name: 'Ultrasound', type: 'support', icon: '📡', forChildren: false, description: 'Ultrasound imaging.' },
  { id: 'echo', name: '2D-Echo', type: 'support', icon: '💓', forChildren: false, description: 'Heart ultrasound (echocardiogram).' },
]

export const hospitalDoctors: HospitalDoctor[] = [
  // Pediatrics
  {
    id: 'garcia-danielle-nicko', name: 'Dr. Danielle Nicko Garcia', specialties: ['pediatrics'],
    schedule: [...sched('Mon', '13:30', '16:00'), ...sched('Wed,Sat', '12:00', '16:00'), ...sched('Fri', '14:00', '16:00')],
  },
  {
    id: 'zenarosa-arlene', name: 'Dra. Arlene Zenarosa', specialties: ['pediatrics'],
    schedule: [...sched('Mon,Wed,Sat', '08:00', '12:00'), ...sched('Tue,Thu', '08:00', '15:00'), ...sched('Fri', '08:00', '14:00')],
  },
  {
    id: 'delos-reyes-danielle', name: 'Dra. Danielle Delos Reyes', specialties: ['pediatrics'],
    schedule: [...sched('Wed', '12:00', '14:00'), ...sched('Sat', '13:00', '16:00')],
  },
  {
    id: 'adriano-maxine', name: 'Dra. Maxine Adriano', specialties: ['pediatrics'],
    schedule: sched('Mon', '13:00', '16:00'),
  },

  // General Medicine
  {
    id: 'garcia-rodolfo-jr', name: 'Dr. Rodolfo Garcia Jr.', specialties: ['general-medicine'],
    schedule: [...sched('Mon-Fri', '11:00', '13:00'), ...sched('Sat', '13:00', '15:00')],
  },

  // OB-GYN
  {
    id: 'castillo-cynthia', name: 'Cynthia Castillo', specialties: ['ob-gyne'],
    schedule: sched('Tue,Thu,Sat', '09:00', '12:00'),
  },
  {
    id: 'garcia-bernadette', name: 'Bernadette Garcia', specialties: ['ob-gyne'],
    schedule: [...sched('Tue,Thu,Sat', '10:00', '12:00'), ...sched('Fri', '14:00', '16:00')],
  },
  {
    id: 'sosa-cecille', name: 'Cecille Sosa', specialties: ['ob-gyne'],
    schedule: [...sched('Mon', '14:00', '16:00'), ...sched('Wed', '13:00', '15:00')],
  },
  {
    id: 'aningalan-christi-ann-rose', name: 'Christi Ann Rose Aningalan', specialties: ['ob-gyne'],
    schedule: [...sched('Mon,Wed', '09:00', '12:00'), ...sched('Tue,Fri,Sat', '14:00', '16:00')],
  },
  {
    id: 'delos-reyes-gabrielle', name: 'Gabrielle Delos Reyes', specialties: ['ob-gyne'],
    schedule: sched('Fri', '09:00', '12:00'),
  },
  {
    id: 'mendoza-jenalyn-suzette', name: 'Jenalyn Suzette Mendoza', specialties: ['ob-gyne'],
    schedule: sched('Wed', '14:00', '16:00'),
  },
  {
    id: 'cadiang-leslie-alen', name: 'Leslie Alen Cadiang', specialties: ['ob-gyne'],
    schedule: [...sched('Wed', '09:00', '11:00'), ...sched('Fri', '14:00', '16:00')],
  },

  // Ophthalmology
  {
    id: 'zenarosa-adrian', name: 'Adrian Zenarosa', specialties: ['ophthalmology'],
    schedule: sched('Mon-Sat', '09:00', '14:00'),
  },

  // Family Medicine + Surgery
  {
    id: 'zenarosa-arnulfo', name: 'Dr. Arnulfo Zenarosa', specialties: ['family-medicine', 'surgery'],
    schedule: sched('Mon-Sat', '08:00', '12:00'),
  },

  // Urology + Surgery
  {
    id: 'castillo-leonardo', name: 'Leonardo Castillo', specialties: ['urology', 'surgery'],
    schedule: sched('Mon,Tue,Sat', '09:00', '12:00'),
  },
  {
    id: 'castillo-christine-joy', name: 'Christine Joy Castillo', specialties: ['urology', 'surgery'],
    schedule: [...sched('Wed', '12:00', '14:00'), ...sched('Thu', '11:30', '13:30'), ...sched('Fri', '15:30', '17:00')],
  },

  // Internal Medicine (+ Cardiology)
  {
    id: 'ner-zandro', name: 'Zandro Ner', specialties: ['internal-medicine'],
    schedule: [...sched('Mon', '13:00', '15:00'), ...sched('Wed', '14:00', '16:00')],
  },
  {
    id: 'castillo-christel-lynn', name: 'Christel Lynn Castillo', specialties: ['internal-medicine', 'cardiology'],
    byAppointment: true,
    schedule: sched('Mon,Wed,Fri', '09:00', '11:00'),
  },
  {
    id: 'abdel-nabi-majed', name: 'Majed Abdel-Nabi', specialties: ['internal-medicine'],
    schedule: [...sched('Fri', '13:00', '15:00'), ...sched('Sat', '10:00', '12:00')],
  },
  {
    id: 'jawid-millard-fitzgerald', name: 'Millard Fitzgerald Jawid', specialties: ['internal-medicine'],
    schedule: sched('Tue', '09:00', '12:00'),
  },
  {
    id: 'cue-rose-jean', name: 'Rose Jean Cue', specialties: ['internal-medicine', 'cardiology'],
    schedule: sched('Tue', '09:00', '12:00'),
  },
  {
    id: 'soberano-angelita', name: 'Angelita Soberano', specialties: ['internal-medicine'],
    byAppointment: true,
    schedule: sched('Fri'),
  },

  // Pulmonology
  {
    id: 'cairme-gina', name: 'Gina Cairme', specialties: ['pulmonology'],
    byAppointment: true,
    schedule: sched('Fri', '15:00', '17:00'),
  },

  // Orthopedics
  {
    id: 'garcia-rodolfo-iii', name: 'Rodolfo “Third” Garcia III', specialties: ['orthopedics'],
    byAppointment: true,
    schedule: sched('Sat'),
  },
  {
    id: 'cantos-joven', name: 'Joven Cantos', specialties: ['orthopedics'],
    schedule: sched('Fri', '10:00', '12:00'),
  },

  // Surgery (others)
  {
    id: 'sanchez-jessica-mae', name: 'Jessica Mae Sanchez', specialties: ['surgery'],
    schedule: sched('Thu', '13:00', '15:00'),
  },
  {
    id: 'del-rosario-michelle', name: 'Michelle Del Rosario', specialties: ['surgery'],
    schedule: sched('Tue', '14:00', '16:00'),
  },
]

// ---------- helpers (the chatbot and booking will reuse these) ----------

export function doctorsForService(serviceId: string) {
  return hospitalDoctors.filter((d) => d.specialties.includes(serviceId))
}

export function serviceName(serviceId: string) {
  return hospitalServices.find((s) => s.id === serviceId)?.name ?? serviceId
}

function to12h(time: string) {
  const [h, m] = time.split(':').map(Number)
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`
}

function dayLabel(days: Day[]) {
  const idx = days.map((d) => ALL_DAYS.indexOf(d))
  const contiguous = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1)
  return days.length >= 3 && contiguous ? `${days[0]}–${days[days.length - 1]}` : days.join(', ')
}

// e.g. ["Mon, Wed, Sat: 8:00 AM – 12:00 PM", "Fri: 8:00 AM – 2:00 PM"]
export function scheduleLines(doctor: HospitalDoctor): string[] {
  const groups = new Map<string, Day[]>()
  for (const slot of doctor.schedule) {
    const key = slot.start && slot.end ? `${to12h(slot.start)} – ${to12h(slot.end)}` : 'time by appointment'
    groups.set(key, [...(groups.get(key) ?? []), slot.day])
  }
  return [...groups].map(([time, days]) => `${dayLabel(days)}: ${time}`)
}