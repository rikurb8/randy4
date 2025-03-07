import { PlanService } from './services/planService';
import { ClarificationService } from './services/clarificationService';
import { InformationService } from './services/informationService';

/**
 * Initialize all services and start the application
 */
async function main() {
  try {
    console.log('Initializing services...');
    
    // Initialize services
    const planService = new PlanService();
    const clarificationService = new ClarificationService(planService);
    const informationService = new InformationService();
    
    console.log('Services initialized successfully');
    
    // Example usage
    console.log('Creating example plan...');
    const examplePlan = planService.createPlan({
      objective: 'Build a simple web application',
      constraints: ['Complete within 2 weeks', 'Use TypeScript'],
      context: 'For demonstration purposes'
    });
    
    console.log('Example plan created with title:', examplePlan.title);
    
    // Example clarification
    const planId = 'plan-1'; // This should match the ID of the first created plan
    console.log('Getting clarification for plan...');
    const clarification = clarificationService.clarifyPlan({
      planId,
      detailLevel: 'medium'
    });
    
    console.log('Plan clarification summary:', clarification.planSummary);
    
    // Example information request
    console.log('Getting information...');
    const information = await informationService.getInformation({
      topic: 'TypeScript Development',
      subTopics: ['Best Practices', 'Project Structure']
    });
    
    console.log('Information summary:', information.summary);
    
    console.log('Application started successfully');
    
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

// Execute the main function
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
