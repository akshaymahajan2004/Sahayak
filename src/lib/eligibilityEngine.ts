import { UserProfile, Scheme } from "./types";
import schemesData from "@/data/schemes.json";

export function evaluateEligibility(user: UserProfile): Scheme[] {
    const schemes = schemesData as Scheme[];

    return schemes.filter((scheme) => {
        const rules = scheme.eligibility_rules;

        // 1. Check Age Limits
        if (rules.min_age !== undefined && user.age < rules.min_age) {
            return false;
        }
        if (rules.max_age !== undefined && user.age > rules.max_age) {
            return false;
        }

        // 2. Check Annual Income Ceiling
        if (rules.max_annual_income !== undefined && user.annualIncome > rules.max_annual_income) {
            return false;
        }

        // 3. Check Occupation Match
        if (
            rules.allowed_occupations &&
            !rules.allowed_occupations.includes("All") &&
            !rules.allowed_occupations.includes(user.occupation)
        ) {
            return false;
        }

        // 4. Check Social Category Match
        if (
            rules.allowed_categories &&
            !rules.allowed_categories.includes("All") &&
            !rules.allowed_categories.includes(user.category)
        ) {
            return false;
        }

        return true; // Passed all filter criteria!
    });
}