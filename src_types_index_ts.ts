// Re-export all types from schema
export type {
  MATRONAssessmentType,
  MCPContextType,
  TriggerRuleType,
  ActionRecommendationType
} from '../schema';

// Additional utility types
export interface AssessmentSummary {
  clientId: string;
  totalScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  primaryConcerns: string[];
  careHours: number;
}

export interface CarePlanGeneration {
  assessment: MATRONAssessmentType;
  recommendations: ActionRecommendationType[];
  estimatedCost: number;
  reviewDate: string;
}

export interface DomainAnalysis {
  domain: string;
  score: number;
  weight: number;
  weightedScore: number;
  riskFactors: string[];
  recommendations: string[];
}

export interface CareTeamMember {
  role: string;
  name?: string;
  contact?: string;
  responsibilities: string[];
}

export interface IncidentReport {
  incidentId: string;
  type: string;
  description: string;
  timestamp: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  witnesses: string[];
  actions_taken: string[];
  prevention_measures: string[];
}

// MCP Integration Types
export interface MCPResponse {
  success: boolean;
  data?: any;
  errors?: string[];
  warnings?: string[];
}

export interface MCPQuery {
  type: 'assessment' | 'rules' | 'care_plan' | 'handover';
  parameters: Record<string, any>;
  context?: any;
}