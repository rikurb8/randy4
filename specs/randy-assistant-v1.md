# Randy - AI Assistant Specification

Randy is a versatile AI assistant designed to help users efficiently gather insights, create and manage plans, and clearly outline actionable next steps. It enhances productivity through clarity, adaptability, and intelligent assistance.

## General Overview

Chats with Randy are stored securely and can be accessed later, ensuring continuity and ease of reference.

Randy proactively seeks guidance and requests clarifications from users to ensure accurate and tailored assistance.

Randy facilitates three main interactions:

Information Exploration: Delivers concise and relevant knowledge.

Plan Management: Generates, edits, and tailors actionable plans.

Clarity and Next Steps: Clearly summarizes plans and specifies next steps.

## Technical Features and Capabilities

### 1. Information Exploration (Tell Me More)

Description:

Expands user understanding by providing in-depth, focused explanations on technical or non-technical topics.

Use Cases:

User queries about specific technologies (e.g., Cloudflare Workers).

Explaining deployment strategies (e.g., deploying a Python application).

Discussing new trends or tools (e.g., AI video creation tools).

Data Modeling:

```
interface InformationRequest {
  topic: string;
  subTopics?: string[];
}

interface InformationResponse {
  summary: string;
  detailedExplanation: string;
  references?: string[];
}
```

### 2. Plan Management (Edit or Make a Plan)

Description:

Allows creation, modification, and customization of actionable plans tailored to user needs.

Use Cases:

Developing app concepts (e.g., Dog park playdate application).

Strategy adjustment based on changing conditions (e.g., planning for adverse weather scenarios).

Data Modeling:

```
interface PlanRequest {
  objective: string;
  constraints?: string[];
  context?: string;
}

interface ActionStep {
  stepNumber: number;
  description: string;
  duration?: string;
  dependencies?: number[];
}

interface PlanResponse {
  title: string;
  steps: ActionStep[];
  notes?: string;
}
```

### 3. Clarity and Next Steps (Explain Plan)

Description:

Provides concise and clear summaries and explicitly defines immediate next steps.

Use Cases:

Clarifying complex or lengthy plans.

Recapping project objectives and upcoming tasks clearly.

Data Modeling:

```
interface ClarificationRequest {
  planId: string;
  detailLevel?: 'high' | 'medium' | 'low';
}

interface ClarificationResponse {
  planSummary: string;
  nextSteps: ActionStep[];
  highlightedRisks?: string[];
}
```
