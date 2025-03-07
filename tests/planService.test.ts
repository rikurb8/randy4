import { describe, it, expect } from 'vitest';
import { PlanService } from '../src/services/planService';
import { PlanRequest } from '../src/types';

describe('PlanService', () => {
  const service = new PlanService();

  it('should create a plan with valid objective', () => {
    const request: PlanRequest = {
      objective: 'Build a mobile app'
    };

    const plan = service.createPlan(request);

    expect(plan).toBeDefined();
    expect(plan.title).toContain('Build a mobile app');
    expect(plan.steps).toHaveLength(3); // Default steps
    expect(plan.notes).toBeUndefined();
  });

  it('should include context in notes when provided', () => {
    const request: PlanRequest = {
      objective: 'Launch marketing campaign',
      context: 'For Q4 product release'
    };

    const plan = service.createPlan(request);

    expect(plan.notes).toContain('For Q4 product release');
  });

  it('should add steps for constraints when provided', () => {
    const request: PlanRequest = {
      objective: 'Develop website',
      constraints: ['Budget limit of $5000', 'Must launch by December']
    };

    const plan = service.createPlan(request);

    expect(plan.steps.length).toBeGreaterThan(3); // Default steps + constraint steps
    expect(plan.steps[3].description).toContain('Budget limit');
    expect(plan.steps[4].description).toContain('Must launch by December');
  });

  it('should throw an error for empty objective', () => {
    const request: PlanRequest = {
      objective: ''
    };

    expect(() => service.createPlan(request)).toThrow('Objective is required');
  });

  it('should retrieve a plan by ID', () => {
    const request: PlanRequest = {
      objective: 'Learn TypeScript'
    };

    const createdPlan = service.createPlan(request);
    
    // Since we can't directly access the planId, we'll update all plans and check
    // This is a limitation of our test setup
    const allPlans = Array.from(service['plans'].entries());
    const planEntry = allPlans.find(([_, plan]) => 
      plan.title === createdPlan.title && 
      plan.steps[0].description === createdPlan.steps[0].description
    );
    
    if (!planEntry) {
      throw new Error('Created plan not found');
    }
    
    const [planId] = planEntry;
    const retrievedPlan = service.getPlan(planId);
    
    expect(retrievedPlan).toEqual(createdPlan);
  });

  it('should update an existing plan', () => {
    const request: PlanRequest = {
      objective: 'Write documentation'
    };

    const createdPlan = service.createPlan(request);
    
    // Find the plan ID
    const allPlans = Array.from(service['plans'].entries());
    const planEntry = allPlans.find(([_, plan]) => 
      plan.title === createdPlan.title && 
      plan.steps[0].description === createdPlan.steps[0].description
    );
    
    if (!planEntry) {
      throw new Error('Created plan not found');
    }
    
    const [planId] = planEntry;
    
    // Update the plan
    const updatedPlan = service.updatePlan(planId, {
      title: 'Updated: Write documentation',
      notes: 'Priority task'
    });
    
    expect(updatedPlan.title).toBe('Updated: Write documentation');
    expect(updatedPlan.notes).toBe('Priority task');
    expect(updatedPlan.steps).toEqual(createdPlan.steps); // Steps should remain unchanged
  });
});
