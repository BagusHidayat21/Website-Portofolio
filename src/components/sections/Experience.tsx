import { experienceData } from "@/data/static-db";
import { ExperienceClient } from "./ExperienceClient";

export function Experience() {
    const items = experienceData
        .filter((e) => e.isVisible)
        .sort((a, b) => a.order - b.order)
        .slice(0, 5)
        .map(({ id, title, company, year, description, skills, category }) => ({
            id,
            title,
            company,
            year,
            description,
            skills,
            category: category ?? 'Work',
        }));

    if (items.length === 0) {
        return null;
    }

    return <ExperienceClient items={items} />;
}
