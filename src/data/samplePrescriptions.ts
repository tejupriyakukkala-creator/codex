import type { Prescription } from '../types';
import { MEDICINE_DATABASE, SAMPLE_DRUG_INTERACTIONS } from './medicineDatabase';

export const SAMPLE_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-handwritten-01',
    title: 'Dr. R. K. Sharma (Cardio-Metabolic Clinic, Hyderabad)',
    doctorName: 'Dr. R. K. Sharma, MD, DM (Cardiology)',
    specialty: 'Cardiologist & Diabetologist',
    hospital: 'Apollo Health City, Jubilee Hills, Hyderabad',
    date: '2026-07-28',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    isHandwritten: true,
    rawOCRText: `Dr. R.K. Sharma MD DM Cardiology Reg. No. AP 48920
Patient: Sri Satyanarayana Rao (Age 58/M)  Date: 28/07/2026
Rx:
1. Tab Metformin 500 mg - 1-0-1 (After Food) x 30 days
2. Tab Telmisartan 40 mg - 1-0-0 (Morning after breakfast) x 30 days
3. Tab Atorvastatin 10 mg - 0-0-1 (Night at bedtime) x 30 days
4. Tab Ecosprin 75 mg - 0-1-0 (After lunch) x 30 days
Advise: Low salt diet, 30 min morning walk daily, check HbA1c & lipid profile in 1 month.`,
    ocrBoxes: [
      { id: 'box-1', label: 'Doctor Info', text: 'Dr. R.K. Sharma MD DM Cardiology', x: 5, y: 5, width: 90, height: 12 },
      { id: 'box-2', label: 'Patient Info', text: 'Sri Satyanarayana Rao (Age 58/M)', x: 5, y: 19, width: 90, height: 8 },
      { id: 'box-3', label: 'Medicine 1', text: 'Tab Metformin 500 mg - 1-0-1 AF', x: 8, y: 32, width: 84, height: 12 },
      { id: 'box-4', label: 'Medicine 2', text: 'Tab Telmisartan 40 mg - 1-0-0 BF', x: 8, y: 46, width: 84, height: 12 },
      { id: 'box-5', label: 'Medicine 3', text: 'Tab Atorvastatin 10 mg - 0-0-1 HS', x: 8, y: 60, width: 84, height: 12 },
      { id: 'box-6', label: 'Medicine 4', text: 'Tab Ecosprin 75 mg - 0-1-0 PC', x: 8, y: 74, width: 84, height: 12 },
    ],
    medicines: [
      MEDICINE_DATABASE['metformin'],
      MEDICINE_DATABASE['telmisartan'],
      MEDICINE_DATABASE['atorvastatin'],
      MEDICINE_DATABASE['aspirin'],
    ],
    interactions: [
      SAMPLE_DRUG_INTERACTIONS[2]
    ]
  },
  {
    id: 'rx-printed-02',
    title: 'Narayana Health Sciences - Printed Clinical Summary',
    doctorName: 'Dr. Ananya Roy, MD (General Medicine)',
    specialty: 'Internal Medicine Specialist',
    hospital: 'Narayana Health City, Electronic City, Bengaluru',
    date: '2026-08-01',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    isHandwritten: false,
    rawOCRText: `NARAYANA HEALTH CITY - BENGALURU
Outpatient Consultation Record - Dept of General Medicine
Patient: Smt. Sunitha Reddy (Age 45/F)  UHID: NH-2026-98122
Diagnosis: Acute Gastritis & Fever with Body Ache

PRESCRIPTION ORDERS:
1. PAN 40 (Pantoprazole 40mg) - 1 tab OD 30 mins before breakfast x 14 days
2. DOLO 650 (Paracetamol 650mg) - 1 tab TDS after meals for 5 days
3. AMOXICILLIN 500mg - 1 tab BD after meals for 5 days

Special Instructions:
- Avoid fried, oily, and spicy food. Drink at least 3 litres of water daily.
- Review after 5 days if fever persists.`,
    ocrBoxes: [
      { id: 'box-p1', label: 'Hospital Header', text: 'NARAYANA HEALTH CITY - BENGALURU', x: 5, y: 4, width: 90, height: 10 },
      { id: 'box-p2', label: 'Diagnosis', text: 'Diagnosis: Acute Gastritis & Fever with Body Ache', x: 5, y: 18, width: 90, height: 10 },
      { id: 'box-p3', label: 'Medicine 1', text: 'PAN 40 (Pantoprazole 40mg) - 1 tab OD 30 mins before breakfast', x: 8, y: 34, width: 84, height: 14 },
      { id: 'box-p4', label: 'Medicine 2', text: 'DOLO 650 (Paracetamol 650mg) - 1 tab TDS after meals', x: 8, y: 52, width: 84, height: 14 },
    ],
    medicines: [
      MEDICINE_DATABASE['pantoprazole'],
      MEDICINE_DATABASE['paracetamol'],
    ],
    interactions: []
  },
  {
    id: 'rx-elderly-03',
    title: 'Senior Care Orthopedic & Vascular Prescription',
    doctorName: 'Dr. V. S. N. Murthy, MS (Ortho)',
    specialty: 'Orthopedic & Joint Care Specialist',
    hospital: 'KIMS Hospitals, Secunderabad',
    date: '2026-07-20',
    imageUrl: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1000&q=80',
    isHandwritten: true,
    rawOCRText: `KIMS HOSPITALS SECUNDERABAD
Senior Citizen Healthcare OPD
Patient: Shri Ramachandra Rao (Age 72/M)
Rx:
1. Tab Metformin 500mg - 1-0-1 (AF)
2. Tab Telmisartan 40mg - 1-0-0 (BF)
3. Tab Pan 40 - 1-0-0 (30m before breakfast)
4. Tab Dolo 650 - As needed for knee pain`,
    ocrBoxes: [
      { id: 'box-e1', label: 'Patient Info', text: 'Shri Ramachandra Rao (Age 72/M)', x: 5, y: 15, width: 90, height: 10 },
      { id: 'box-e2', label: 'Diabetes Rx', text: 'Tab Metformin 500mg - 1-0-1 (AF)', x: 8, y: 30, width: 84, height: 12 },
      { id: 'box-e3', label: 'Hypertension Rx', text: 'Tab Telmisartan 40mg - 1-0-0 (BF)', x: 8, y: 46, width: 84, height: 12 },
      { id: 'box-e4', label: 'Gastric Rx', text: 'Tab Pan 40 - 1-0-0 (Before breakfast)', x: 8, y: 62, width: 84, height: 12 },
    ],
    medicines: [
      MEDICINE_DATABASE['metformin'],
      MEDICINE_DATABASE['telmisartan'],
      MEDICINE_DATABASE['pantoprazole'],
      MEDICINE_DATABASE['paracetamol'],
    ],
    interactions: []
  }
];
