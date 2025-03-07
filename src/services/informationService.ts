import { InformationRequest, InformationResponse } from '../types';

/**
 * Service responsible for handling information exploration requests
 */
export class InformationService {
  /**
   * Processes a request for detailed information on a topic
   * 
   * @param request - The information request containing topic and optional subtopics
   * @returns A detailed response with summary and explanation
   */
  public async getInformation(request: InformationRequest): Promise<InformationResponse> {
    try {
      // In a real implementation, this might call an external API or database
      // This is a simplified implementation for demonstration
      
      const { topic, subTopics } = request;
      
      // Validate request
      if (!topic || topic.trim() === '') {
        throw new Error('Topic is required');
      }
      
      // Process the request and generate a response
      const response: InformationResponse = {
        summary: `Summary about ${topic}`,
        detailedExplanation: `Detailed explanation about ${topic}${
          subTopics ? ` including subtopics: ${subTopics.join(', ')}` : ''
        }`,
        references: ['https://example.com/reference1', 'https://example.com/reference2']
      };
      
      return response;
    } catch (error) {
      console.error('Error in getInformation:', error);
      throw error;
    }
  }
}
