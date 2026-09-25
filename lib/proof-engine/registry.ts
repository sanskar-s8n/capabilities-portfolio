import { archetypes } from "@/lib/constants";
import type { ProofFeature } from "./types";

export function getProofFeatures(archetypeId: string): ProofFeature[] {
  const archetype = archetypes.find((item) => item.id === archetypeId);

  if (!archetype) {
    return [];
  }

  const features: ProofFeature[] = [];

  for (const [category, items] of Object.entries(archetype.skills)) {
    for (const item of items) {
      features.push({
        id: `${archetypeId}-${category}-${item.feature
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")}`,
        name: item.feature,
        description: item.description,
        category: category as ProofFeature["category"],
        testType:
          category === "frontend"
            ? "interaction"
            : category === "backend"
              ? "api"
              : category === "database"
                ? "data"
                : "security",
      });
    }
  }

  return features;
}