export type Language = 'en' | 'te' | 'hi' | 'ta' | 'kn' | 'ml' | 'mr' | 'bn';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  timing: string;
  duration: string;
  purpose: string;
  mechanism?: string;
  commonSideEffects: string[];
  foodInteractions: string[];
  precautions: string[];
  category: string;
  translations?: {
    [key in Language]?: {
      name?: string;
      purpose?: string;
      timing?: string;
      sideEffects?: string[];
      foodInteractions?: string[];
    };
  };
}

export interface DrugInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: 'high' | 'moderate' | 'low';
  title: string;
  description: string;
  recommendation: string;
}

export interface OCRBoundingBox {
  id: string;
  label: string;
  text: string;
  x: number; // percentage
  y: number; // percentage
  width: number; // percentage
  height: number; // percentage
}

export interface Prescription {
  id: string;
  title: string;
  doctorName: string;
  specialty: string;
  hospital: string;
  date: string;
  imageUrl: string;
  isHandwritten: boolean;
  rawOCRText: string;
  medicines: Medicine[];
  interactions: DrugInteraction[];
  ocrBoxes: OCRBoundingBox[];
}

export interface ScheduleItem {
  id: string;
  time: string;
  timePeriod: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  medicineId: string;
  medicineName: string;
  dosage: string;
  instructions: string;
  duration: string;
  status: 'pending' | 'taken' | 'missed';
  date: string;
}

export interface PillScannerResult {
  pillName: string;
  genericName: string;
  strength: string;
  shape: string;
  color: string;
  imprint: string;
  purpose: string;
  precautions: string[];
  confidence: number;
}

export interface EmergencyWalletData {
  patientName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  activeMedications: string[];
  qrCodeUrl: string;
}

export interface CaregiverAlert {
  id: string;
  timestamp: string;
  patientName: string;
  medicationName: string;
  timeDue: string;
  type: 'missed' | 'completed' | 'acknowledged';
  message: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  distance: string;
  phone: string;
  is24x7: boolean;
  rating: number;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Order Required';
  availableMedicines: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language: Language;
  audioAvailable?: boolean;
}
