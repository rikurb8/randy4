import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ClarificationService } from '../src/services/clarificationService';
import { PlanService } from '../src/services/planService';
import { PlanResponse } from '../src/types';

describe('ClarificationService', () => {
  let planService: PlanService;
  let clarificationService: ClarificationService;
  let mockPlan: PlanResponse;
  const mockPlanId = 'plan-123';

  beforeEach(() => {
    // Create a mock plan
    mockPlan = {
      title: 'Test Plan',
      steps: [
        {
          stepNumber: 1,
          description: 'First step',
          duration: '1 day'
        },
        {
          stepNumber: 2,
          description: 'Second step',
          duration: '2 days',
          dependencies: [1]
        },
        {
          stepNumber: 3,
          description: 'Third step',
          duration: '3 days',
          dependencies: [1, 2]
        }
      ],
      notes: 'Test notes'
    };

    // Create a mock plan service
    planService = new PlanService();
    
    // Mock the getPlan method
    planService.getPlan = vi.fn().mockImplementation((planId: string) => {
      if (planId === mockPlanId) {
        return mockPlan;
      }
      return undefined;
    });

    clarificationService = new ClarificationService(planService);
  });

  it('should clarify a plan with default detail level', () => {
    const clarification = clarificationService.clarifyPlan({
      planId: mockPlanId
    });

    expect(clarification).toBeDefined();
    expect(clarification.planSummary).toContain('Test Plan');
    expect(clarification.nextSteps).toHaveLength(2);
    expect(clarification.highlightedRisks).toBeDefined();
  });

  it('should generate high detail summary', () => {
    const clarification = clarificationService.clarifyPlan({
      planId: mockPlanId,
      detailLevel: 'high'
    });

    expect(clarification.planSummary).toContain('Detailed Steps');
    expect(clarification.planSummary).toContain('1 day');
    expect(clarification.planSummary).toContain('Depends on steps');
  });

  it('should generate low detail summary', () => {
    const clarification = clarificationService.clarifyPlan({
      planId: mockPlanId,
      detailLevel: 'low'
    });

    expect(clarification.planSummary).toContain('Summary');
    expect(clarification.planSummary).toContain('3 steps');
    expect(clarification.planSummary).not.toContain('Detailed Steps');
  });

  it('should identify risks in the plan', () => {
    const clarification = clarificationService.clarifyPlan({
      planId: mockPlanId
    });

    expect(clarification.highlightedRisks).toContain('Step 3 has multiple dependencies');
    expect(clarification.highlightedRisks).toContain('Timeline may be affected');
  });

  it('should throw an error for non-existent plan', () => {
    expect(() => clarificationService.clarifyPlan({
      planId: 'non-existent-plan'
    })).toThrow('Plan with ID non-existent-plan not found');
  });
});
