import { MATRONAssessmentType } from '../schema';

const exampleAssessment: MATRONAssessmentType = {
  clientId: 'CLIENT_001',
  assessmentId: 'ASSESS_001',
  assessmentDate: '2025-06-30',
  assessorId: 'NURSE_001',
  assessorRole: 'nurse',
  setting: 'home',
  eventType: 'assessment',
  age: 84,
  gender: 'female',
  
  biological: {
    weight: 0.35,
    subDomains: {
      medicalHistory: {
        weight: 1.05,
        score: 3,
        description: 'Multiple chronic conditions',
        conditions: ['diabetes', 'hypertension', 'arthritis']
      },
      currentHealthStatus: {
        weight: 1.1,
        score: 1,
        description: 'Stable but requires occasional monitoring',
        monitoring_frequency: 'occasional'
      },
      physicalDependencies: {
        weight: 1.15,
        score: 1,
        description: 'Minimal assistance needed',
        mobility_level: 'minimal_assistance'
      }
    },
    weightedScore: 1.75
  },
  
  psychological: {
    weight: 0.25,
    subDomains: {
      mentalHealth: {
        weight: 1.1,
        score: 1,
        conditions: [],
        management_status: 'mild_managed'
      },
      cognitiveFunction: {
        weight: 1.1,
        score: 1,
        impairment_level: 'mild_forgetfulness'
      },
      emotionalNeeds: {
        weight: 1.0,
        score: 2,
        support_level: 'regular'
      }
    },
    weightedScore: 1.33
  },
  
  social: {
    weight: 0.2,
    subDomains: {
      livingConditions: {
        weight: 1.05,
        score: 1,
        housing_type: 'own_home',
        safety_concerns: []
      },
      familySupport: {
        weight: 1.0,
        score: 2,
        support_level: 'limited'
      },
      socialNetworks: {
        weight: 1.0,
        score: 2,
        isolation_risk: 'some_connections'
      },
      engagementInCare: {
        weight: 1.05,
        score: 1,
        engagement_level: 'mostly_engaged'
      }
    },
    weightedScore: 1.5
  },
  
  clinical: {
    weight: 0.15,
    subDomains: {
      nursingAndClinicalInterventions: {
        weight: 1.15,
        score: 1,
        intervention_frequency: 'minimal'
      },
      medicationManagement: {
        weight: 1.0,
        score: 2,
        regimen_complexity: 'moderate',
        adherence_issues: false
      }
    },
    weightedScore: 1.15
  },
  
  safetyResource: {
    weight: 0.05,
    subDomains: {
      environment: {
        weight: 1.0,
        score: 0,
        safety_hazards: [],
        modifications_needed: []
      },
      fallsRisk: {
        weight: 1.0,
        score: 2,
        risk_level: 'moderate',
        prevention_measures: ['grab rails installed', 'good lighting']
      }
    },
    weightedScore: 1.0
  },
  
  triggers: {
    clinicallyComplex: false,
    wanderingRisk: false,
    highADLDependency: false,
    endOfLifePlanning: false,
    fallsRisk: true,
    pressureUlcerRisk: false,
    nutritionalRisk: false,
    medicationComplexity: false,
    socialIsolation: false,
    cognitiveDecline: false
  },
  
  activeAlerts: [],
  
  assessorNotes: 'Client is generally managing well at home with family support. Main concerns are falls risk and medication management.',
  clientConcerns: 'Worried about falling and wants to maintain independence',
  familyFeedback: 'Daughter visits weekly, concerned about medication compliance',
  
  lastUpdated: '2025-06-30T10:00:00Z',
  version: '0.1'
};

export default exampleAssessment;