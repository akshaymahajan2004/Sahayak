# Sahayak (सहायक) 🏛️
> **A Lightweight Public Service Scheme Eligibility Engine & Welfare Navigation Platform**

Sahayak eliminates bureaucratic jargon and complex eligibility matrices, empowering citizens to discover government welfare schemes, subsidies, and public entitlement grants they qualify for in under 2 minutes.

---

## 🌟 Key Features

* **Instant Questionnaire Wizard:** Guided multi-step profile builder (Age, Income, Occupation, Category, Region).
* **Deterministic Matching Engine:** High-performance rule-matching algorithm evaluating complex eligibility criteria against user profiles without complex overhead.
* **Personalized Document Checklists:** Automatically generates a verification document checklist (Aadhaar, Income Certificates, Land Records) for each matching scheme before applying.
* **Category Filtering:** Interactive filtering across Education, Agriculture, Healthcare, and Business schemes.
* **Privacy First & Zero Jargon:** Requires no sensitive identifiers (no Aadhaar/PAN input required), ensuring zero user tracking or data collection.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 16+ (App Router, Server & Client Components)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **Deployment:** Vercel

---

## 🏗️ System Architecture & Data Model

Sahayak uses a structured JSON rule-matching architecture for fast, scalable scheme evaluations.

### Scheme Data Model Structure (`types.ts`)
```typescript
export type SchemeRule = {
  min_age?: number;
  max_age?: number;
  max_annual_income?: number;
  allowed_occupations?: string[];
  allowed_categories?: string[];
  allowed_states?: string[];
};

export type Scheme = {
  id: string;
  title: string;
  category: 'Education' | 'Agriculture' | 'Healthcare' | 'Business' | 'Housing';
  description: string;
  official_link: string;
  eligibility_rules: SchemeRule;
  required_documents: string[];
};