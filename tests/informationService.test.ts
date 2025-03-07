import { describe, it, expect } from 'vitest';
import { InformationService } from '../src/services/informationService';
import { InformationRequest } from '../src/types';

describe('InformationService', () => {
  const service = new InformationService();

  it('should return information for a valid topic', async () => {
    const request: InformationRequest = {
      topic: 'TypeScript'
    };

    const response = await service.getInformation(request);

    expect(response).toBeDefined();
    expect(response.summary).toContain('TypeScript');
    expect(response.detailedExplanation).toContain('TypeScript');
    expect(response.references).toHaveLength(2);
  });

  it('should include subtopics in the response when provided', async () => {
    const request: InformationRequest = {
      topic: 'JavaScript',
      subTopics: ['ES6', 'Promises']
    };

    const response = await service.getInformation(request);

    expect(response.detailedExplanation).toContain('JavaScript');
    expect(response.detailedExplanation).toContain('ES6');
    expect(response.detailedExplanation).toContain('Promises');
  });

  it('should throw an error for empty topic', async () => {
    const request: InformationRequest = {
      topic: ''
    };

    await expect(service.getInformation(request)).rejects.toThrow('Topic is required');
  });
});
