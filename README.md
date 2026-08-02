# MedTwin AI — AI Clinical Safety & Medication Intelligence Assistant

> **Track**: Domain Agents (Healthcare)  
> **Tagline**: *"Making every prescription understandable, safer, and accessible in every Indian language."*

---

## 📌 Problem Statement

Millions of patients:
- Cannot understand handwritten or complex prescriptions.
- Take medicines incorrectly or at wrong timings.
- Miss critical doses.
- Combine medicines that interact dangerously.
- Face severe language barriers when communicating with healthcare providers.
- Elderly patients struggle to keep track of multiple pill regimens.

Medication errors contribute significantly to preventable health problems worldwide.

---

## 💡 Solution Overview

**MedTwin AI** is a multimodal AI healthcare assistant that empowers patients and caregivers to understand, organize, and safely consume prescribed medications.

### Key Capabilities:
- 📄 **Prescription OCR Agent**: Scans handwritten & printed prescriptions, extracting medicine names, dosages, timings, duration, and instructions.
- 💊 **Medicine Intelligence Agent**: Converts medical terms into plain language, explaining purpose, generic names, common side effects, and food/dietary interactions (e.g., Grapefruit with Statins, Milk with Tetracycline).
- ⚡ **Drug Interaction Agent**: Multi-drug safety radar categorizing contraindication risks (High Risk, Moderate Risk, Safe) with clinical mechanisms and doctor callouts.
- ⏰ **Dosage Schedule Agent**: Automated personalized daily schedule with intake guidance (Before/After food), mark-as-taken confetti celebrations, and Missed Dose Protocol advice.
- 🌐 **Translation Agent**: Full dynamic support across **8 Indian languages**: English, Telugu (తెలుగు), Hindi (हिंदी), Tamil (தமிழ்), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Marathi (मराठी), and Bengali (বাংলা).
- 🎙️ **Voice Assistant Agent**: Web Speech API audio synthesis engine with an animated sound waveform interface and natural speech interaction.
- 📷 **Pill Strip Scanner**: Visual tablet recognition engine identifying tablet shape, color, imprint codes, and safety precautions.
- 👨‍👩‍👧 **Family Caregiver Dashboard**: Remote monitoring panel allowing children to track parents' medication compliance and missed dose alerts.
- 🚨 **Emergency Health Wallet**: Paramedic digital card storing Blood Group, Known Drug Allergies, Emergency Contacts, and Active Rx list with a live scannable SVG QR Code.
- 📊 **Medicine Timeline**: Visual patient care journey mapping diagnostics → doctor visits → prescription upload → active course → completion.
- 🏪 **Pharmacy Stock Locator**: Verified 24x7 Indian pharmacy finder (Hyderabad, Bengaluru, Delhi NCR) with real-time prescription stock indicators.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite 8, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas Confetti
- **Voice Synthesis**: Web Speech API (SpeechSynthesisUtterance)
- **Design**: Modern Glassmorphic Dark UI System, Google Fonts (*Plus Jakarta Sans*)

---

## 🚀 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/tejupriyakukkala-creator/codex.git

# Navigate to project directory
cd codex

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## ⚖️ Clinical Safety Disclaimer

*MedTwin AI provides educational medication guidance and AI clinical intelligence. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult your doctor or qualified healthcare provider regarding medical conditions.*
