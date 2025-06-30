import { 
  MATRONAssessmentType,
  TriggerRuleType,
  ActionRecommendationType,
  ActionRecommendation
} from '../schema';

// ===== RULES ENGINE =====

export class MCPRulesEngine {
  private rules: TriggerRuleType[] = [];

  constructor(rules: TriggerRuleType[] = []) {
    this.rules = rules;
  }

  addRule(rule: TriggerRuleType): void {
    this.rules.push(rule);
  }

  removeRule(ruleId: string): void {
    this.rules = this.rules.filter(rule => rule.id !== ruleId);
  }

  evaluateAssessment(assessment: MATRONAssessmentType): {
    triggeredRules: TriggerRuleType[];
    recommendedActions: ActionRecommendationType[];
    alerts: string[];
  } {
    const triggeredRules: TriggerRuleType[] = [];
    const recommendedActions: ActionRecommendationType[] = [];
    const alerts: string[] = [];

    for (const rule of this.rules) {
      if (!rule.enabled) continue;

      if (this.evaluateTrigger(rule.trigger, assessment)) {
        triggeredRules.push(rule);
        recommendedActions.push(...rule.actions);
        
        if (rule.escalation === 'high' || rule.escalation === 'critical') {
          alerts.push(`ALERT: ${rule.name} - ${rule.description || 'No description'}`);
        }
      }
    }

    return { triggeredRules, recommendedActions, alerts };
  }

  private evaluateTrigger(trigger: any, assessment: MATRONAssessmentType): boolean {
    const { domain, field, operator, value } = trigger;
    
    let fieldValue: any;
    
    // Navigate to the field value based on domain and field path
    switch (domain) {
      case 'biological':
        fieldValue = this.getNestedValue(assessment.biological, field);
        break;
      case 'psychological':
        fieldValue = this.getNestedValue(assessment.psychological, field);
        break;
      case 'social':
        fieldValue = this.getNestedValue(assessment.social, field);
        break;
      case 'clinical':
        fieldValue = this.getNestedValue(assessment.clinical, field);
        break;
      case 'safety_resource':
        fieldValue = this.getNestedValue(assessment.safetyResource, field);
        break;
      default:
        return false;
    }

    // Evaluate based on operator
    switch (operator) {
      case 'equals':
        return fieldValue === value;
      case 'greater_than':
        return typeof fieldValue === 'number' && fieldValue > value;
      case 'less_than':
        return typeof fieldValue === 'number' && fieldValue < value;
      case 'contains':
        return Array.isArray(fieldValue) && fieldValue.includes(value);
      default:
        return false;
    }
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  calculateOverallScore(assessment: MATRONAssessmentType): number {
    const domains = [
      { name: 'biological', weight: assessment.biological.weight, score: assessment.biological.weightedScore || 0 },
      { name: 'psychological', weight: assessment.psychological.weight, score: assessment.psychological.weightedScore || 0 },
      { name: 'social', weight: assessment.social.weight, score: assessment.social.weightedScore || 0 },
      { name: 'clinical', weight: assessment.clinical.weight, score: assessment.clinical.weightedScore || 0 },
      { name: 'safetyResource', weight: assessment.safetyResource.weight, score: assessment.safetyResource.weightedScore || 0 }
    ];

    const totalWeightedScore = domains.reduce((sum, domain) => sum + (domain.score * domain.weight), 0);
    const totalWeight = domains.reduce((sum, domain) => sum + domain.weight, 0);
    
    return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  }

  calculateCareHours(assessment: MATRONAssessmentType): number {
    const overallScore = this.calculateOverallScore(assessment);
    const ageFactor = assessment.age ? Math.max(1, assessment.age / 75) : 1;
    
    // Base hours calculation (simplified example)
    let baseHours = Math.min(168, overallScore * 8 * ageFactor); // Max 168 hours per week
    
    // Trigger-based adjustments
    if (assessment.triggers.clinicallyComplex) baseHours *= 1.3;
    if (assessment.triggers.wanderingRisk) baseHours *= 1.2;
    if (assessment.triggers.highADLDependency) baseHours *= 1.4;
    if (assessment.triggers.endOfLifePlanning) baseHours *= 1.5;
    
    return Math.round(baseHours * 100) / 100; // Round to 2 decimal places
  }
}

// ===== ASSESSMENT UTILITIES =====

export class MATRONCalculator {
  static calculateDomainScore(domain: any): number {
    if (!domain.subDomains) return 0;
    
    let totalWeightedScore = 0;
    let totalWeight = 0;
    
    Object.values(domain.subDomains).forEach((subDomain: any) => {
      if (subDomain && typeof subDomain.score === 'number' && typeof subDomain.weight === 'number') {
        totalWeightedScore += subDomain.score * subDomain.weight;
        totalWeight += subDomain.weight;
      }
    });
    
    return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  }

  static generateCarePlan(assessment: MATRONAssessmentType, engine: MCPRulesEngine): {
    careHours: number;
    recommendations: ActionRecommendationType[];
    alerts: string[];
    riskLevel: string;
  } {
    const overallScore = engine.calculateOverallScore(assessment);
    const careHours = engine.calculateCareHours(assessment);
    const evaluation = engine.evaluateAssessment(assessment);
    
    let riskLevel = 'Low';
    if (overallScore > 3) riskLevel = 'High';
    else if (overallScore > 2) riskLevel = 'Moderate';
    
    return {
      careHours,
      recommendations: evaluation.recommendedActions,
      alerts: evaluation.alerts,
      riskLevel
    };
  }
}