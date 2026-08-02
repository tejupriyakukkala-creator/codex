import type { Medicine, DrugInteraction } from '../types';

export const MEDICINE_DATABASE: Record<string, Medicine> = {
  metformin: {
    id: 'med-metformin-500',
    name: 'Metformin 500mg',
    genericName: 'Metformin Hydrochloride (Glucophage)',
    dosage: '500 mg',
    frequency: 'Twice Daily (1-0-1)',
    timing: 'After Meals',
    duration: '30 Days (Continuous)',
    category: 'Antidiabetic / Biguanides',
    purpose: 'Lowers blood sugar levels in Type 2 Diabetes by reducing liver glucose production and improving insulin sensitivity.',
    mechanism: 'Inhibits hepatic gluconeogenesis and increases peripheral glucose uptake in skeletal muscle.',
    commonSideEffects: ['Mild nausea', 'Abdominal bloating', 'Metallic taste in mouth', 'Soft stool'],
    foodInteractions: [
      'Take with or immediately after meals to reduce stomach upset.',
      'Avoid excessive alcohol consumption as it increases the risk of Lactic Acidosis.'
    ],
    precautions: [
      'Regularly monitor Kidney function (Serum Creatinine/eGFR).',
      'Inform your doctor before undergoing any contrast scan or X-ray procedures.',
      'Check Vitamin B12 levels periodically if on long-term usage.'
    ],
    translations: {
      te: {
        name: 'మెట్‌ఫార్మిన్ 500mg (Metformin 500mg)',
        purpose: 'టైప్ 2 షుగర్ (డయాబెటిస్) ఉన్నవారిలో రక్తంలో చక్కెర స్థాయిలను తగ్గించడానికి ఉపయోగిస్తారు.',
        timing: 'భోజనం తర్వాత',
        sideEffects: ['కడుపులో అసౌకర్యం', 'వికారం', 'నోటిలో లోహపు రుచి'],
        foodInteractions: ['కడుపు మంట నివారించడానికి భోజనం తర్వాత తీసుకోండి', 'మద్యపానానికి దూరంగా ఉండండి']
      },
      hi: {
        name: 'मेटफॉर्मिन 500mg (Metformin 500mg)',
        purpose: 'टाइप 2 मधुमेह (शुगर) रोगियों में रक्त शर्करा के स्तर को नियंत्रित करने के लिए उपयोग किया जाता है।',
        timing: 'खाना खाने के बाद',
        sideEffects: ['पेट में ऐंठन', 'जी मिचलाना', 'मुंह का स्वाद बदलना'],
        foodInteractions: ['पेट की परेशानी से बचने के लिए भोजन के साथ या बाद में लें', 'शराब का सेवन न करें']
      }
    }
  },
  telmisartan: {
    id: 'med-telmisartan-40',
    name: 'Telmisartan 40mg',
    genericName: 'Telmisartan (Micardis)',
    dosage: '40 mg',
    frequency: 'Once Daily (1-0-0)',
    timing: 'Morning After Breakfast',
    duration: '30 Days (Continuous)',
    category: 'Antihypertensive / ARB Blockers',
    purpose: 'Lowers high blood pressure (Hypertension) and reduces the risk of stroke, heart attacks, and kidney damage.',
    mechanism: 'Blocks Angiotensin II receptors, relaxing blood vessels so blood can flow more smoothly.',
    commonSideEffects: ['Dizziness when standing up', 'Sinus congestion', 'Mild fatigue', 'Hyperkalemia (High Potassium)'],
    foodInteractions: [
      'Avoid high-potassium salt substitutes or potassium supplements unless advised by physician.',
      'Can be taken with or without food, but be consistent with your routine.'
    ],
    precautions: [
      'Do not stop taking suddenly even if blood pressure feels normal.',
      'Not recommended during pregnancy or breastfeeding.',
      'Monitor blood pressure and serum potassium levels regularly.'
    ],
    translations: {
      te: {
        name: 'టెల్మిసార్టాన్ 40mg (Telmisartan 40mg)',
        purpose: 'అధిక రక్తపోటు (High BP) నివారించడానికి మరియు గుండెజబ్బులు రాకుండా కాపాడటానికి ఉపయోగిస్తారు.',
        timing: 'ఉదయం అల్పాహారం తర్వాత',
        sideEffects: ['తలతిరగడం', 'అలసట', 'పొడి దగ్గు (అరుదుగా)'],
        foodInteractions: ['పొటాషియం ఎక్కువగా ఉండే ఉప్పు ప్రత్యామ్నాయాలకు దూరంగా ఉండండి']
      },
      hi: {
        name: 'टेल्मीसार्टन 40mg (Telmisartan 40mg)',
        purpose: 'उच्च रक्तचाप (High BP) को नियंत्रित करने और दिल के दौरे के जोखिम को कम करने के लिए उपयोग किया जाता है।',
        timing: 'सुबह नाश्ते के बाद',
        sideEffects: ['चक्कर आना', 'थकान', 'पोटेशियम का स्तर बढ़ना'],
        foodInteractions: ['पोटेशियम युक्त नमक और सप्लीमेंट्स से बचें']
      }
    }
  },
  atorvastatin: {
    id: 'med-atorvastatin-10',
    name: 'Atorvastatin 10mg',
    genericName: 'Atorvastatin Calcium (Lipitor)',
    dosage: '10 mg',
    frequency: 'Once Daily (0-0-1)',
    timing: 'At Bedtime (Night)',
    duration: '30 Days',
    category: 'Cholesterol Lowering / Statin',
    purpose: 'Lowers "bad" LDL cholesterol and triglycerides in blood while boosting "good" HDL cholesterol, protecting blood vessels.',
    mechanism: 'Inhibits HMG-CoA reductase enzyme in the liver responsible for cholesterol production.',
    commonSideEffects: ['Mild muscle weakness/aching', 'Headache', 'Indigestion'],
    foodInteractions: [
      'AVOID Grapefruit and Grapefruit juice as it significantly increases statin blood concentrations and toxicity risk.',
      'Limit alcohol intake to prevent liver strain.'
    ],
    precautions: [
      'Take consistently at night as liver cholesterol synthesis peaks overnight.',
      'Report any unexplained severe muscle pain or dark urine immediately.'
    ],
    translations: {
      te: {
        name: 'అటోర్వాస్టాటిన్ 10mg (Atorvastatin 10mg)',
        purpose: 'రక్తంలో చెడు కొలెస్ట్రాల్ (Bad Cholesterol) తగ్గించి గుండెపోటు ప్రమాదాన్ని నివారిస్తుంది.',
        timing: 'రాత్రి పడుకునే ముందు',
        sideEffects: ['కండరాల నొప్పులు', 'తలనెప్పి', 'అజీర్తి'],
        foodInteractions: ['గ్రేప్‌ఫ్రూట్ (పంపరపనస) పండ్ల రసం అస్సలు తాగకూడదు']
      },
      hi: {
        name: 'एटोरवास्टैटिन 10mg (Atorvastatin 10mg)',
        purpose: 'रक्त में खराब कोलेस्ट्रॉल (LDL) को कम करने और हृदय स्वास्थ्य की रक्षा करने के लिए दी जाती है।',
        timing: 'रात सोने से पहले',
        sideEffects: ['मांसपेशियों में दर्द', 'सिरदर्द'],
        foodInteractions: ['ग्रेपफ्रूट (चकोतरा) रस का सेवन बिल्कुल न करें']
      }
    }
  },
  paracetamol: {
    id: 'med-paracetamol-650',
    name: 'Paracetamol 650mg (Dolo 650)',
    genericName: 'Acetaminophen / Paracetamol',
    dosage: '650 mg',
    frequency: 'As needed / 8 Hourly (Max 3 times/day)',
    timing: 'After Meals with Water',
    duration: '5 Days',
    category: 'Analgesic & Antipyretic',
    purpose: 'Relieves mild to moderate pain (body ache, headache) and reduces high fever.',
    mechanism: 'Inhibits prostaglandin synthesis in the central nervous system to reduce pain signals and body temperature.',
    commonSideEffects: ['Rare nausea', 'Mild sweating'],
    foodInteractions: [
      'Drink plenty of water (at least 250ml) when taking tablet.',
      'Strictly avoid alcohol to prevent severe acute liver damage.'
    ],
    precautions: [
      'Do not exceed 4,000 mg total daily paracetamol limit across all combined medicines.',
      'Consult doctor if fever persists beyond 3 days.'
    ],
    translations: {
      te: {
        name: 'పారాసిటమాల్ 650mg (Dolo 650)',
        purpose: 'జ్వరం తగ్గించడానికి మరియు ఒళ్లు నొప్పులు, తలనొప్పి తగ్గించడానికి వాడతారు.',
        timing: 'భోజనం తర్వాత పుష్కలంగా నీటితో',
        sideEffects: ['అరుదుగా వికారం'],
        foodInteractions: ['మద్యపానంతో తీసుకోవడం వల్ల కాలేయం తీవ్రంగా దెబ్బతింటుంది']
      },
      hi: {
        name: 'पैरासिटामोल 650mg (Dolo 650)',
        purpose: 'बुखार और शरीर के दर्द से राहत दिलाने के लिए दी जाती है।',
        timing: 'भोजन के बाद पानी के साथ',
        sideEffects: ['हल्की मिचली'],
        foodInteractions: ['शराब के साथ न लें, लिवर को नुकसान हो सकता है']
      }
    }
  },
  pantoprazole: {
    id: 'med-pantoprazole-40',
    name: 'Pantoprazole 40mg (Pan 40)',
    genericName: 'Pantoprazole Sodium (Pan 40)',
    dosage: '40 mg',
    frequency: 'Once Daily (1-0-0)',
    timing: '30 Minutes Before Breakfast',
    duration: '14 Days',
    category: 'Gastroprotective / PPI',
    purpose: 'Reduces stomach acid production, treating acid reflux (GERD), heartburn, and peptic ulcers.',
    mechanism: 'Suppresses gastric acid secretion by specific inhibition of the H+/K+-ATPase enzyme system in stomach parietal cells.',
    commonSideEffects: ['Flatulence', 'Headache', 'Mild diarrhea or constipation'],
    foodInteractions: [
      'Must be taken strictly on an empty stomach at least 30 minutes before morning meal with a glass of water.',
      'Avoid spicy, fried, and highly acidic foods.'
    ],
    precautions: [
      'Swallow the tablet whole; do not crush or chew.',
      'Long-term use (>1 year) may reduce Vitamin B12 and Magnesium absorption.'
    ],
    translations: {
      te: {
        name: 'పాంటోప్రజోల్ 40mg (Pan 40)',
        purpose: 'కడుపులో అసిడిటీ, గ్యాస్ మరియు గుండెమంటను నివారించడానికి వాడతారు.',
        timing: 'ఉదయం అల్పాహారానికి 30 నిమిషాల ముందు (పరగడుపున)',
        sideEffects: ['కడుపులో ఉబ్బరం', 'తలనెప్పి'],
        foodInteractions: ['ఖాళీ కడుపుతో మాత్రమే వేసుకోవాలి. కారంగా ఉండే ఆహారం తగ్గించండి.']
      },
      hi: {
        name: 'पेन्टोप्राजोल 40mg (Pan 40)',
        purpose: 'पेट में एसिडिटी, गैस और सीने की जलन को कम करने के लिए ली जाती है।',
        timing: 'सुबह नाश्ते से 30 मिनट पहले खाली पेट',
        sideEffects: ['पेट में गैस होना', 'हल्का सिरदर्द'],
        foodInteractions: ['खाली पेट ही लें, मसालेदार भोजन से बचें']
      }
    }
  },
  aspirin: {
    id: 'med-aspirin-75',
    name: 'Ecosprin 75mg (Aspirin)',
    genericName: 'Acetylsalicylic Acid',
    dosage: '75 mg',
    frequency: 'Once Daily (0-1-0)',
    timing: 'After Lunch with Plenty of Water',
    duration: '30 Days',
    category: 'Antiplatelet Blood Thinner',
    purpose: 'Prevents blood clots from forming, significantly lowering the risk of stroke and heart attack.',
    mechanism: 'Irreversibly inhibits COX-1 enzyme, stopping blood platelets from clumping together.',
    commonSideEffects: ['Stomach irritation', 'Easier bruising', 'Minor bleeding from cuts'],
    foodInteractions: [
      'Take with meals or milk to minimize stomach mucosal irritation.',
      'Avoid high doses of Vitamin E supplements or Ginkgo Biloba which further thin blood.'
    ],
    precautions: [
      'Inform dentist or surgeon that you take blood thinners prior to any procedure.',
      'Watch for unusual dark tarry stools or blood in urine.'
    ],
    translations: {
      te: {
        name: 'ఇకోస్ప్రిన్ 75mg (Ecosprin 75mg)',
        purpose: 'రక్తం గడ్డకట్టకుండా పలుచగా చేసి గుండెపోటు రాకుండా కాపాడుతుంది.',
        timing: 'మధ్యాహ్న భోజనం తర్వాత',
        sideEffects: ['కడుపులో మంట', 'చిన్న దెబ్బలకు రక్తం ఎక్కువగా రావడం'],
        foodInteractions: ['కడుపులో మంట రాకుండా భోజనం లేదా పాలతో తీసుకోండి']
      },
      hi: {
        name: 'इकोस्प्रिन 75mg (Ecosprin 75mg)',
        purpose: 'रक्त के थक्के जमने से रोकती है और हार्ट अटैक के खतरे को कम करती है।',
        timing: 'दोपहर खाने के बाद',
        sideEffects: ['पेट में जलन', 'जल्दी खरोंच लगना'],
        foodInteractions: ['भोजन के साथ लें ताकि पेट में जलन न हो']
      }
    }
  }
};

export const SAMPLE_DRUG_INTERACTIONS: DrugInteraction[] = [
  {
    id: 'int-aspirin-clopidogrel',
    drug1: 'Ecosprin 75mg (Aspirin)',
    drug2: 'Clopidogrel 75mg',
    severity: 'high',
    title: 'Dual Antiplatelet Bleeding Warning',
    description: 'Combining Aspirin with another blood thinner substantially increases the risk of severe gastrointestinal bleeding and internal hemorrhaging.',
    recommendation: 'Only combine under strict cardiologist supervision. Report any stomach pain, dark tarry stools, or unusual bleeding immediately.'
  },
  {
    id: 'int-telmisartan-spironolactone',
    drug1: 'Telmisartan 40mg',
    drug2: 'Spironolactone / Potassium Supplement',
    severity: 'moderate',
    title: 'Hyperkalemia (High Potassium Risk)',
    description: 'Telmisartan reduces potassium excretion. Taking it with potassium-sparing diuretics or supplements can lead to dangerously elevated blood potassium levels, risking heart arrhythmia.',
    recommendation: 'Monitor serum potassium levels every 3-6 months. Avoid salt substitutes rich in potassium.'
  },
  {
    id: 'int-atorvastatin-grapefruit',
    drug1: 'Atorvastatin 10mg',
    drug2: 'Dietary Grapefruit / Pampa Panasa',
    severity: 'high',
    title: 'CYP3A4 Enzyme Inhibition Toxicity',
    description: 'Grapefruit furanocoumarins block liver enzymes that breakdown Atorvastatin, causing drug levels to spike up to 300%, raising severe muscle damage (Rhabdomyolysis) risk.',
    recommendation: 'Eliminate grapefruit juice and fresh grapefruit entirely from your diet while prescribed statins.'
  }
];
