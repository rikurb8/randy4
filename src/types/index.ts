/**
 * Types for Information Exploration feature
 */
export interface InformationRequest {
  topic: string;
  subTopics?: string[];
}

export interface InformationResponse {
  summary: string;
  detailedExplanation: string;
  references?: string[];
}

/**
 * Types for Plan Management feature
 */
export interface PlanRequest {
  objective: string;
  constraints?: string[];
  context?: string;
}

export interface ActionStep {
  stepNumber: number;
  description: string;
  duration?: string;
  dependencies?: number[];
}

export interface PlanResponse {
  title: string;
  steps: ActionStep[];
  notes?: string;
}

/**
 * Types for Clarity and Next Steps feature
 */
export interface ClarificationRequest {
  planId: string;
  detailLevel?: 'high' | 'medium' | 'low';
}

export interface ClarificationResponse {
  planSummary: string;
  nextSteps: ActionStep[];
  highlightedRisks?: string[];
}
