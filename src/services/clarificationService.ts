import { ClarificationRequest, ClarificationResponse, ActionStep, PlanResponse } from '../types';
import { PlanService } from './planService';

/**
 * Service responsible for providing clarity and next steps for plans
 */
export class ClarificationService {
  constructor(private planService: PlanService) {}
  
  /**
   * Clarifies a plan and identifies immediate next steps
   * 
   * @param request - The clarification request containing planId and detail level
   * @returns A clarification response with summary and next steps
   */
  public clarifyPlan(request: ClarificationRequest): ClarificationResponse {
    try {
      const { planId, detailLevel = 'medium' } = request;
      
      // Retrieve the plan
      const plan = this.planService.getPlan(planId);
      
      if (!plan) {
        throw new Error(`Plan with ID ${planId} not found`);
      }
      
      // Generate the clarification response
      return {
        planSummary: this.generateSummary(plan, detailLevel),
        nextSteps: this.identifyNextSteps(plan),
        highlightedRisks: this.identifyRisks(plan)
      };
    } catch (error) {
      console.error('Error in clarifyPlan:', error);
      throw error;
    }
  }
  
  /**
   * Generates a summary of the plan based on the requested detail level
   * 
   * @param plan - The plan to summarize
   * @param detailLevel - The level of detail to include
   * @returns A summary string
   */
  private generateSummary(plan: PlanResponse, detailLevel: 'high' | 'medium' | 'low'): string {
    const { title, steps, notes } = plan;
    
    switch (detailLevel) {
      case 'high':
        return `${title}\n\nDetailed Steps:\n${steps.map(step => 
          `${step.stepNumber}. ${step.description} (${step.duration || 'No duration specified'})${
            step.dependencies ? ` - Depends on steps: ${step.dependencies.join(', ')}` : ''
          }`
        ).join('\n')}\n\n${notes ? `Notes: ${notes}` : ''}`;
        
      case 'medium':
        return `${title}\n\nKey Steps:\n${steps.map(step => 
          `${step.stepNumber}. ${step.description}`
        ).join('\n')}\n\n${notes ? `Notes: ${notes}` : ''}`;
        
      case 'low':
        return `${title}\n\nSummary: This plan contains ${steps.length} steps to achieve the objective.`;
        
      default:
        return `${title}\n\nSteps: ${steps.length}`;
    }
  }
  
  /**
   * Identifies the immediate next steps from the plan
   * 
   * @param plan - The plan to analyze
   * @returns An array of the next actionable steps
   */
  private identifyNextSteps(plan: PlanResponse): ActionStep[] {
    // In a real implementation, this would consider dependencies, completion status, etc.
    // This is a simplified implementation that returns the first 2 steps
    
    return plan.steps.slice(0, 2);
  }
  
  /**
   * Identifies potential risks in the plan
   * 
   * @param plan - The plan to analyze
   * @returns An array of risk descriptions
   */
  private identifyRisks(plan: PlanResponse): string[] {
    // In a real implementation, this would analyze the plan for potential issues
    // This is a simplified implementation
    
    const risks: string[] = [];
    
    // Check for steps with multiple dependencies
    plan.steps.forEach(step => {
      if (step.dependencies && step.dependencies.length > 1) {
        risks.push(`Step ${step.stepNumber} has multiple dependencies`);
      }
    });
    
    // Add a generic risk
    risks.push('Timeline may be affected by external factors.');
    
    return risks;
  }
}
