
import { getTechStack } from "@/actions/tech.actions";
import { TechStackClient } from "./TechStackClient";

export async function TechStackSection() {
    const techStack = await getTechStack();

    if (!techStack || techStack.length === 0) {
        return null;
    }

    return (
        <TechStackClient techStack={techStack} />
    );
}
