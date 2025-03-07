import { PlanRequest, PlanResponse, ActionStep } from '../types';

/**
 * Service responsible for creating and managing plans
 */
export class PlanService {
  // In-memory storage for plans (would be a database in production)
  private plans: Map<string, PlanResponse> = new Map();
  private nextPlanId: number = 1;
  
  /**
   * Creates a new plan based on the provided request
   * 
   * @param request - The plan request containing objective and optional constraints
   * @returns A structured plan with actionable steps
   */
  public createPlan(request: PlanRequest): PlanResponse {
    try {
      const { objective, constraints, context } = request;
      
      // Validate request
      if (!objective || objective.trim() === '') {
        throw new Error('Objective is required');
      }
      
      // Generate steps based on the objective and constraints
      const steps: ActionStep[] = this.generateSteps(objective, constraints);
      
      // Create the plan response
      const planResponse: PlanResponse = {
        title: `Plan for: ${objective}`,
        steps,
        notes: context ? `Context: ${context}` : undefined
      };
      
      // Store the plan
      const planId = `plan-${this.nextPlanId++}`;
      this.plans.set(planId, planResponse);
      
      return planResponse;
    } catch (error) {
      console.error('Error in createPlan:', error);
      throw error;
    }
  }
  
  /**
   * Retrieves a plan by its ID
   * 
   * @param planId - The unique identifier for the plan
   * @returns The plan if found
   */
  public getPlan(planId: string): PlanResponse | undefined {
    return this.plans.get(planId);
  }
  
  /**
   * Updates an existing plan
   * 
   * @param planId - The unique identifier for the plan
   * @param updates - The updated plan data
   * @returns The updated plan
   */
  public updatePlan(planId: string, updates: Partial<PlanResponse>): PlanResponse {
    const existingPlan = this.plans.get(planId);
    
    if (!existingPlan) {
      throw new Error(`Plan with ID ${planId} not found`);
    }
    
    const updatedPlan: PlanResponse = {
      ...existingPlan,
      ...updates,
      // Ensure steps are properly merged if provided
      steps: updates.steps || existingPlan.steps
    };
    
    this.plans.set(planId, updatedPlan);
    return updatedPlan;
  }
  
  /**
   * Helper method to generate steps based on objective and constraints
   * 
   * @param objective - The main goal of the plan
   * @param constraints - Optional limitations or requirements
   * @returns An array of action steps
   */
  private generateSteps(objective: string, constraints?: string[]): ActionStep[] {
    // In a real implementation, this might use AI or predefined templates
    // This is a simplified implementation for demonstration
    
    const steps: ActionStep[] = [
      {
        stepNumber: 1,
        description: `Research ${objective}`,
        duration: '2 days'
      },
      {
        stepNumber: 2,
        description: 'Analyze findings',
        duration: '1 day',
        dependencies: [1]
      },
      {
        stepNumber: 3,
        description: 'Create implementation strategy',
        duration: '3 days',
        dependencies: [2]
      }
    ];
    
    // Add a step for each constraint if any
    if (constraints && constraints.length > 0) {
      constraints.forEach((constraint, index) => {
        steps.push({
          stepNumber: steps.length + 1,
          description: `Address constraint: ${constraint}`,
          duration: '1 day',
          dependencies: [3]
        });
      });
    }
    
    return steps;
  }
}
