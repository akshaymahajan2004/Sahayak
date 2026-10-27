export type UserProfile = {
    age: number;
    annualIncome: number;
    occupation: string;
    category: string;
    state: string;
};

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