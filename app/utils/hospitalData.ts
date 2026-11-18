// Sample data. Later this comes from the database (managed by the admin).

export const hospitalServices = [
  {
    id: 'prenatal',
    name: 'Maternity & Prenatal Care',
    description: 'Checkups and guidance for expecting mothers.',
    icon: '🤰',
    forChildren: false,
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    description: 'Consultations for infants, children and adolescents.',
    icon: '👶',
    forChildren: true,
  },
  {
    id: 'vaccination',
    name: 'Vaccination',
    description: 'Scheduled immunizations for children.',
    icon: '💉',
    forChildren: true,
  },
  {
    id: 'well-child',
    name: 'Well-Child Checkup',
    description: 'Regular growth and development checkups.',
    icon: '📋',
    forChildren: true,
  },
  {
    id: 'general',
    name: 'General Medicine',
    description: 'Consultations for common health concerns.',
    icon: '🩺',
    forChildren: false,
  },
  {
    id: 'emergency',
    name: 'Emergency Care',
    description: 'Open 24/7 for urgent cases.',
    icon: '🚑',
    forChildren: false,
  },
]

export const hospitalDoctors = [
  { id: 'd1', name: 'Dr. Maria Reyes', specialty: 'General Physician', days: ['Mon', 'Wed', 'Fri'] },
  { id: 'd2', name: 'Dr. Juan Santos', specialty: 'Pediatrician', days: ['Tue', 'Thu', 'Sat'] },
  { id: 'd3', name: 'Dr. Ana Lopez', specialty: 'Internal Medicine', days: ['Mon', 'Tue', 'Thu'] },
  { id: 'd4', name: 'Dr. Carlos Dela Cruz', specialty: 'Cardiologist', days: ['Wed', 'Fri', 'Sat'] },
]