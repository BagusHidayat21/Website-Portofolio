
import { techStackData } from "@/data/static-db";
import { TechStackClient } from "./TechStackClient";

export function TechStackSection() {
    const techStack = techStackData;

    if (!techStack || techStack.length === 0) {
        return null;
    }

    return (
        <TechStackClient techStack={techStack} />
    );
}
