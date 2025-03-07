import { describe, it, expect } from "vitest";
import { PlanService } from "../src/services/planService";
import { ClarificationService } from "../src/services/clarificationService";
import { InformationService } from "../src/services/informationService";
import { PlanRequest, InformationRequest } from "../src/types";

describe("End-to-end workflow examples", () => {
  const planService = new PlanService();
  const clarificationService = new ClarificationService(planService);
  const informationService = new InformationService();

  it("Complete project planning workflow", async () => {
    // STEP 1: Get information about a topic to prepare for planning
    const infoRequest: InformationRequest = {
      topic: "Agile Project Management",
      subTopics: ["Scrum", "Sprint Planning"],
    };

    const infoResponse = await informationService.getInformation(infoRequest);

    expect(infoResponse.summary).toContain("Agile Project Management");
    expect(infoResponse.detailedExplanation).toContain("Scrum");

    // STEP 2: Create a plan based on the gathered information
    const planRequest: PlanRequest = {
      objective: "Implement Agile methodology for software team",
      constraints: ["Complete within 2 months", "Limited budget of $10,000"],
      context: `Based on research: ${infoResponse.summary}`,
    };

    const plan = planService.createPlan(planRequest);

    expect(plan.title).toContain("Implement Agile methodology");
    expect(plan.steps.length).toBeGreaterThan(3);

    // Find the plan ID (in a real app, this would be returned directly)
    const allPlans = Array.from(planService["plans"].entries());
    const planEntry = allPlans.find(
      ([_, p]) =>
        p.title === plan.title &&
        p.steps[0].description === plan.steps[0].description
    );

    if (!planEntry) {
      throw new Error("Created plan not found");
    }

    const [planId] = planEntry;

    // STEP 3: Get clarification on the plan with high detail
    const clarification = clarificationService.clarifyPlan({
      planId,
      detailLevel: "high",
    });

    expect(clarification.planSummary).toContain("Implement Agile methodology");
    expect(clarification.nextSteps.length).toBeGreaterThan(0);

    // STEP 4: Update the plan based on clarification insights
    const updatedPlan = planService.updatePlan(planId, {
      notes: `Updated after clarification. Risks identified: ${clarification.highlightedRisks?.join(
        ", "
      )}`,
    });

    expect(updatedPlan.notes).toContain("Risks identified");
  });

  it("Research and learning workflow", async () => {
    // STEP 1: Research a primary topic
    const primaryInfoRequest: InformationRequest = {
      topic: "Machine Learning",
    };

    const primaryInfo = await informationService.getInformation(
      primaryInfoRequest
    );
    expect(primaryInfo.summary).toContain("Machine Learning");

    // STEP 2: Dive deeper into specific subtopics
    const detailedInfoRequest: InformationRequest = {
      topic: "Machine Learning",
      subTopics: ["Neural Networks", "Supervised Learning"],
    };

    const detailedInfo = await informationService.getInformation(
      detailedInfoRequest
    );
    expect(detailedInfo.detailedExplanation).toContain("Neural Networks");

    // STEP 3: Create a learning plan
    const learningPlanRequest: PlanRequest = {
      objective: "Learn Machine Learning fundamentals in 3 months",
      constraints: [
        "Study 10 hours per week",
        "Focus on practical applications",
      ],
      context: `Based on research: ${detailedInfo.summary}`,
    };

    const learningPlan = planService.createPlan(learningPlanRequest);
    expect(learningPlan.title).toContain("Learn Machine Learning");

    // Find the plan ID
    const allPlans = Array.from(planService["plans"].entries());
    const planEntry = allPlans.find(
      ([_, p]) =>
        p.title === learningPlan.title &&
        p.steps[0].description === learningPlan.steps[0].description
    );

    if (!planEntry) {
      throw new Error("Created plan not found");
    }

    const [planId] = planEntry;

    // STEP 4: Get a simplified version of the plan
    const simplifiedPlan = clarificationService.clarifyPlan({
      planId,
      detailLevel: "low",
    });

    expect(simplifiedPlan.planSummary).toContain("Summary");
  });
});
