export type ProofFeature = {
  id: string;
  name: string;
  description: string;
  category: "frontend" | "backend" | "database" | "security";
  testType: "interaction" | "api" | "data" | "security";
};

export type ProofConfiguration = {
  archetypeId: string;
  selectedFeatures: string[];
  createdAt: string;
};