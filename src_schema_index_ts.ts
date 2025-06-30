import { z } from 'zod';

// ===== CORE MCP PROTOCOL SCHEMA =====

// Base enums and types
const ScoreScale = z.union([
  z.literal(0), z.literal(1), z.literal(2), 
  z.literal(3), z.literal(4), z.literal(5)
]);

const SettingType = z.enum([
  'home', 'ward', 'rehab', 'hospice', 'community', 'residential', 'acute_care'
]);

const ActorRole = z.enum([
  'nurse', 'mdt', 'carer', 'family', 'patient', 'doctor', 'therapist', 
  'social_worker', 'administrator', 'nursing_associate'
]);

const EventType = z.enum([
  'shift_note', 'incident', 'care_plan', 'observation', 'assessment', 
  'handover', 'medication_admin', 'vital_signs'
]);

const UrgencyLevel = z.enum(['low', 'moderate', 'high', 'critical', 'immediate']);
const ComplexityLevel = z.enum(['minimal', 'mild', 'moderate', 'high', 'complex']);
const PriorityLevel = z.enum(['routine', 'standard', 'urgent', 'critical']);

// ===== MATRON DOMAIN SCHEMAS =====

// Biological Domain
const BiologicalSubDomain = z.object({
  medicalHistory: z.object({
    weight: z.number().default(1.05),
    score: ScoreScale,
    description: z.string().optional(),
    conditions: z.array(z.string()).default([])
  }),
  currentHealthStatus: z.object({
    weight: z.number().default(1.1),
    score: ScoreScale,
    description: z.string().optional(),
    monitoring_frequency: z.enum(['stable', 'occasional', 'regular', 'frequent', 'intensive', 'critical'])
  }),
  physicalDependencies: z.object({
    weight: z.number().default(1.15),
    score: ScoreScale,
    description: z.string().optional(),
    mobility_level: z.enum(['fully_independent', 'minimal_assistance', 'some_assistance', 'regular_assistance', 'highly_dependent', 'completely_dependent'])
  }),
  chronicIllnessManagement: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    conditions: z.array(z.string()).default([])
  }).optional(),
  acuteMedicalEvents: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    recent_events: z.array(z.string()).default([])
  }).optional(),
  nutritionalNeeds: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    dietary_requirements: z.array(z.string()).default([])
  }).optional(),
  mobilityAndPhysicalFunction: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    assistive_devices: z.array(z.string()).default([])
  }).optional()
});

const BiologicalDomain = z.object({
  weight: z.number().default(0.35),
  subDomains: BiologicalSubDomain,
  totalScore: z.number().optional(),
  weightedScore: z.number().optional()
});

// Psychological Domain
const PsychologicalSubDomain = z.object({
  mentalHealth: z.object({
    weight: z.number().default(1.1),
    score: ScoreScale,
    conditions: z.array(z.string()).default([]),
    management_status: z.enum(['no_issues', 'mild_managed', 'moderate_stable', 'moderate_fluctuating', 'severe_managed', 'severe_unstable'])
  }),
  cognitiveFunction: z.object({
    weight: z.number().default(1.1),
    score: ScoreScale,
    impairment_level: z.enum(['no_impairment', 'mild_forgetfulness', 'moderate_impairment', 'severe_impairment', 'complete_decline'])
  }),
  emotionalNeeds: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    support_level: z.enum(['minimal', 'occasional', 'regular', 'intensive'])
  }),
  moodDisorders: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    stability: z.enum(['stable', 'mild_changes', 'fluctuating', 'unstable', 'highly_unstable'])
  }).optional(),
  behaviouralNeeds: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    interventions_required: z.boolean().default(false)
  }).optional()
});

const PsychologicalDomain = z.object({
  weight: z.number().default(0.25),
  subDomains: PsychologicalSubDomain,
  totalScore: z.number().optional(),
  weightedScore: z.number().optional()
});

// Social Domain
const SocialSubDomain = z.object({
  livingConditions: z.object({
    weight: z.number().default(1.05),
    score: ScoreScale,
    housing_type: z.string().optional(),
    safety_concerns: z.array(z.string()).default([])
  }),
  familySupport: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    support_level: z.enum(['strong', 'moderate', 'limited', 'dysfunctional', 'none'])
  }),
  socialNetworks: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    isolation_risk: z.enum(['high_engagement', 'some_connections', 'limited_engagement', 'little_contact', 'isolated'])
  }),
  engagementInCare: z.object({
    weight: z.number().default(1.05),
    score: ScoreScale,
    engagement_level: z.enum(['fully_engaged', 'mostly_engaged', 'selective_engagement', 'resistant', 'non_engaged'])
  }),
  communityEngagement: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    participation_level: z.enum(['active', 'some', 'infrequent', 'rarely', 'none'])
  }).optional(),
  accessToSocialServices: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    services_utilised: z.array(z.string()).default([])
  }).optional()
});

const SocialDomain = z.object({
  weight: z.number().default(0.2),
  subDomains: SocialSubDomain,
  totalScore: z.number().optional(),
  weightedScore: z.number().optional()
});

// Clinical Care Needs Domain
const ClinicalSubDomain = z.object({
  nursingAndClinicalInterventions: z.object({
    weight: z.number().default(1.15),
    score: ScoreScale,
    intervention_frequency: z.enum(['minimal', 'occasional', 'regular', 'frequent', 'intensive'])
  }),
  woundCare: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    wound_types: z.array(z.string()).default([]),
    care_frequency: z.enum(['occasional', 'regular', 'ongoing', 'frequent', 'constant'])
  }).optional(),
  medicationManagement: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    regimen_complexity: z.enum(['simple', 'few_medications', 'moderate', 'complex', 'highly_complex']),
    adherence_issues: z.boolean().default(false)
  }).optional()
});

const ClinicalDomain = z.object({
  weight: z.number().default(0.15),
  subDomains: ClinicalSubDomain,
  totalScore: z.number().optional(),
  weightedScore: z.number().optional()
});

// Safety and Resource Domain
const SafetyResourceSubDomain = z.object({
  environment: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    safety_hazards: z.array(z.string()).default([]),
    modifications_needed: z.array(z.string()).default([])
  }),
  fallsRisk: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    risk_level: z.enum(['low', 'moderate', 'high']),
    prevention_measures: z.array(z.string()).default([])
  }),
  pressureRisk: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    braden_score: z.number().optional(),
    prevention_measures: z.array(z.string()).default([])
  }).optional(),
  resourceAvailability: z.object({
    weight: z.number().default(1.0),
    score: ScoreScale,
    available_resources: z.array(z.string()).default([]),
    unmet_needs: z.array(z.string()).default([])
  }).optional()
});

const SafetyResourceDomain = z.object({
  weight: z.number().default(0.05),
  subDomains: SafetyResourceSubDomain,
  totalScore: z.number().optional(),
  weightedScore: z.number().optional()
});

// ===== TRIGGERS AND ALERTS =====

const TriggerCondition = z.object({
  domain: z.enum(['biological', 'psychological', 'social', 'clinical', 'safety_resource']),
  field: z.string(),
  operator: z.enum(['equals', 'greater_than', 'less_than', 'contains']),
  value: z.union([z.string(), z.number(), z.boolean()]),
  description: z.string().optional()
});

const ActionRecommendation = z.object({
  type: z.enum(['recommendation', 'task', 'referral', 'medication', 'observation', 'escalation']),
  role: ActorRole.optional(),
  text: z.string(),
  priority: PriorityLevel,
  due_date: z.string().optional(),
  frequency: z.string().optional()
});

const TriggerRule = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  trigger: TriggerCondition,
  actions: z.array(ActionRecommendation),
  escalation: UrgencyLevel.optional(),
  enabled: z.boolean().default(true)
});

const ClinicalTriggers = z.object({
  clinicallyComplex: z.boolean().default(false),
  wanderingRisk: z.boolean().default(false),
  highADLDependency: z.boolean().default(false),
  endOfLifePlanning: z.boolean().default(false),
  fallsRisk: z.boolean().default(false),
  pressureUlcerRisk: z.boolean().default(false),
  nutritionalRisk: z.boolean().default(false),
  medicationComplexity: z.boolean().default(false),
  socialIsolation: z.boolean().default(false),
  cognitiveDecline: z.boolean().default(false)
});

// ===== ENHANCED CARE TOOL (EnhCT) =====

const EnhCTScoring = z.object({
  severity: z.object({
    score: ScoreScale,
    weight: z.number().default(0.6),
    description: z.string().optional()
  }),
  complexity: z.object({
    score: ScoreScale,
    weight: z.number().default(0.4),
    description: z.string().optional()
  }),
  compositeScore: z.number().optional()
});

// ===== CARE PLANNING AND OUTCOMES =====

const CareHours = z.object({
  dailyHours: z.number().optional(),
  weeklyHours: z.number().optional(),
  monthlyHours: z.number().optional(),
  recommendedCareProvision: z.string().optional(),
  costEstimate: z.object({
    weekly: z.number().optional(),
    monthly: z.number().optional(),
    annual: z.number().optional()
  }).optional()
});

const CarePlanRecommendation = z.object({
  domain: z.string(),
  subDomain: z.string(),
  score: z.number(),
  recommendation: z.string(),
  priority: PriorityLevel,
  interventions: z.array(z.string()).default([])
});

// ===== MAIN ASSESSMENT SCHEMA =====

const MATRONAssessment = z.object({
  // Client Information
  clientId: z.string(),
  assessmentId: z.string(),
  assessmentDate: z.string(),
  assessorId: z.string(),
  assessorRole: ActorRole,
  
  // Context
  setting: SettingType,
  eventType: EventType,
  urgency: UrgencyLevel.optional(),
  complexity: ComplexityLevel.optional(),
  
  // Client Demographics
  age: z.number().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  
  // Domain Assessments
  biological: BiologicalDomain,
  psychological: PsychologicalDomain,
  social: SocialDomain,
  clinical: ClinicalDomain,
  safetyResource: SafetyResourceDomain,
  
  // Enhanced Care Tool Scoring
  enhCT: EnhCTScoring.optional(),
  
  // Overall Scores
  totalUCBATScore: z.number().optional(),
  domainScores: z.object({
    biological: z.number().optional(),
    psychological: z.number().optional(),
    social: z.number().optional(),
    clinical: z.number().optional(),
    safetyResource: z.number().optional()
  }).optional(),
  
  // Triggers and Alerts
  triggers: ClinicalTriggers,
  activeAlerts: z.array(z.string()).default([]),
  
  // Care Planning
  careHours: CareHours.optional(),
  carePlanRecommendations: z.array(CarePlanRecommendation).default([]),
  
  // Notes and Comments
  assessorNotes: z.string().optional(),
  clientConcerns: z.string().optional(),
  familyFeedback: z.string().optional(),
  
  // Metadata
  version: z.string().default('0.1'),
  lastUpdated: z.string(),
  reviewDate: z.string().optional()
});

// ===== MCP PROTOCOL CONTEXT =====

const MCPContext = z.object({
  // Assessment
  assessment: MATRONAssessment.optional(),
  
  // Rules Engine
  activeRules: z.array(TriggerRule).default([]),
  
  // Event Context
  currentEvent: z.object({
    type: EventType,
    timestamp: z.string(),
    actor: ActorRole,
    location: SettingType,
    description: z.string().optional()
  }).optional(),
  
  // Historical Context
  previousAssessments: z.array(z.object({
    assessmentId: z.string(),
    date: z.string(),
    totalScore: z.number(),
    keyChanges: z.array(z.string()).default([])
  })).default([]),
  
  // Action Tracking
  recommendedActions: z.array(ActionRecommendation).default([]),
  completedActions: z.array(z.object({
    action: ActionRecommendation,
    completedBy: ActorRole,
    completedDate: z.string(),
    outcome: z.string().optional()
  })).default([])
});

// ===== EXPORTS =====

export {
  // Main Schemas
  MATRONAssessment,
  MCPContext,
  
  // Domain Schemas
  BiologicalDomain,
  PsychologicalDomain,
  SocialDomain,
  ClinicalDomain,
  SafetyResourceDomain,
  
  // Utility Schemas
  TriggerRule,
  ActionRecommendation,
  ClinicalTriggers,
  EnhCTScoring,
  CareHours,
  CarePlanRecommendation,
  
  // Enums
  ScoreScale,
  SettingType,
  ActorRole,
  EventType,
  UrgencyLevel,
  ComplexityLevel,
  PriorityLevel
};

// Type exports for TypeScript usage
export type MATRONAssessmentType = z.infer<typeof MATRONAssessment>;
export type MCPContextType = z.infer<typeof MCPContext>;
export type TriggerRuleType = z.infer<typeof TriggerRule>;
export type ActionRecommendationType = z.infer<typeof ActionRecommendation>;