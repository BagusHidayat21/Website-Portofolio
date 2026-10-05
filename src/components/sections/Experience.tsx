import { experienceData } from "@/data/static-db";
import { ExperienceClient } from "./ExperienceClient";

export function Experience() {
    const items = experienceData
        .filter((e) => e.isVisible)
        .sort((a, b) => a.order - b.order)
        .slice(0, 5)
        .map(({ id, title, company, year, description, skills, category, url }) => ({
            id,
            title,
            company,
            year,
            description,
            skills,
            category: category ?? 'Work',
            url,
        }));

    if (items.length === 0) {
        return null;
    }

    return <ExperienceClient items={items} />;
}
