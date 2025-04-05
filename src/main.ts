import * as readlineSync from "readline-sync";
import {
  InformationRequest,
  PlanRequest,
  ClarificationRequest,
  InformationResponse,
  PlanResponse,
  ClarificationResponse,
} from "./types";
import { InformationService } from "./services/informationService";
import { PlanService } from "./services/planService";
import { ClarificationService } from "./services/clarificationService";

/**
 * Initialize all services and start the application
 */
async function main() {
  // Initialize services
  const infoService = new InformationService();
  const planService = new PlanService();
  const clarificationService = new ClarificationService(planService);

  // Display welcome message and help text
  console.log("\n🤖 Welcome to Randy - Your Helpful Assistant!\n");
  console.log("Randy can help you with:");
  console.log(
    "  1. Information Exploration - Get detailed information on topics"
  );
  console.log(
    "  2. Plan Management - Create actionable plans for your objectives"
  );
  console.log(
    "  3. Clarity and Next Steps - Break down complex plans into clear steps\n"
  );
  console.log('Type "exit" or "quit" to end the session.\n');

  let running = true;

  while (running) {
    const userInput = readlineSync.question("What can I help you with today? ");

    // Check if user wants to exit
    if (
      userInput.toLowerCase() === "exit" ||
      userInput.toLowerCase() === "quit"
    ) {
      console.log("Thank you for using Randy! Goodbye! 👋");
      running = false;
      continue;
    }

    try {
      // Process the user input and determine what service to use
      if (
        userInput.toLowerCase().includes("information") ||
        userInput.toLowerCase().includes("about")
      ) {
        // Handle information request
        const topic = readlineSync.question(
          "What topic would you like information about? "
        );
        const infoRequest: InformationRequest = { topic };

        console.log("\nFetching information...\n");
        const response: InformationResponse = await infoService.getInformation(
          infoRequest
        );

        console.log(`📚 ${response.summary}\n`);
        console.log(response.detailedExplanation);
        if (response.references && response.references.length > 0) {
          console.log("\nReferences:");
          response.references.forEach((ref: string) => console.log(`- ${ref}`));
        }
      } else if (
        userInput.toLowerCase().includes("plan") ||
        userInput.toLowerCase().includes("objective")
      ) {
        // Handle plan request
        const objective = readlineSync.question("What is your objective? ");
        const planRequest: PlanRequest = { objective };

        console.log("\nCreating plan...\n");
        const response: PlanResponse = planService.createPlan(planRequest);

        console.log(`📝 Plan: ${response.title}\n`);
        console.log("Steps:");
        response.steps.forEach((step) => {
          console.log(`${step.stepNumber}. ${step.description}`);
          if (step.duration) console.log(`   Duration: ${step.duration}`);
          if (step.dependencies && step.dependencies.length > 0) {
            console.log(
              `   Dependencies: Steps ${step.dependencies.join(", ")}`
            );
          }
        });

        if (response.notes) {
          console.log(`\nNotes: ${response.notes}`);
        }
      } else if (
        userInput.toLowerCase().includes("clarify") ||
        userInput.toLowerCase().includes("next steps")
      ) {
        // Handle clarification request
        const planId = readlineSync.question(
          "Which plan would you like clarification on? (Enter plan ID): "
        );
        const clarifyRequest: ClarificationRequest = { planId };

        console.log("\nGetting clarification...\n");
        const response: ClarificationResponse =
          clarificationService.clarifyPlan(clarifyRequest);

        console.log(`🔍 Plan Summary: ${response.planSummary}\n`);
        console.log("Next Steps:");
        response.nextSteps.forEach((step) => {
          console.log(`${step.stepNumber}. ${step.description}`);
        });

        if (response.highlightedRisks && response.highlightedRisks.length > 0) {
          console.log("\nPotential Risks:");
          response.highlightedRisks.forEach((risk: string) =>
            console.log(`⚠️ ${risk}`)
          );
        }
      } else {
        // Generic response for unrecognized input
        console.log("I'm not sure how to help with that. You can ask me for:");
        console.log("- Information about a topic");
        console.log("- Creating a plan for an objective");
        console.log("- Clarification on next steps for a plan");
      }
    } catch (error: unknown) {
      console.error(
        "Sorry, I encountered an error:",
        error instanceof Error ? error.message : String(error)
      );
    }

    console.log("\n---\n");
  }
}

// Execute the main function
main().catch((error: unknown) => {
  console.error(
    "Unhandled error:",
    error instanceof Error ? error.message : String(error)
  );
  process.exit(1);
});
