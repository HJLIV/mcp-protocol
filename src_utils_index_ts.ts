import { MATRONAssessmentType } from '../schema';

export class ValidationUtils {
  static validateScore(score: number): boolean {
    return Number.isInteger(score) && score >= 0 && score <= 5;
  }

  static validateAssessment(assessment: any): string[] {
    const errors: string[] = [];
    
    if (!assessment.clientId) {
      errors.push('Client ID is required');
    }
    
    if (!assessment.assessmentDate) {
      errors.push('Assessment date is required');
    }
    
    return errors;
  }
}

export class DateUtils {
  static getCurrentISODate(): string {
    return new Date().toISOString();
  }

  static formatDateForDisplay(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString();
  }
}

export class ScoreUtils {
  static getScoreDescription(score: number): string {
    const descriptions = {
      0: 'No issues / Fully independent',
      1: 'Minimal issues / Slight assistance needed',
      2: 'Mild issues / Some assistance needed',
      3: 'Moderate issues / Regular assistance needed',
      4: 'High issues / Highly dependent',
      5: 'Critical issues / Completely dependent'
    };
    
    return descriptions[score as keyof typeof descriptions] || 'Invalid score';
  }
}

export class CalculationUtils {
  static calculateWeightedScore(items: Array<{score: number, weight: number}>): number {
    const totalWeighted = items.reduce((sum, item) => sum + (item.score * item.weight), 0);
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    return totalWeight > 0 ? totalWeighted / totalWeight : 0;
  }

  static roundToDecimalPlaces(value: number, places: number = 2): number {
    return Math.round(value * Math.pow(10, places)) / Math.pow(10, places);
  }
}