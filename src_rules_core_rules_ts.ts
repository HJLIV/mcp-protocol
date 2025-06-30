import { TriggerRuleType } from '../schema';

export const CORE_MATRON_RULES: TriggerRuleType[] = [
  {
    id: 'high-falls-risk',
    name: 'High Falls Risk Alert',
    description: 'Triggers when falls risk assessment indicates high risk',
    trigger: {
      domain: 'safety_resource',
      field: 'subDomains.fallsRisk.risk_level',
      operator: 'equals',
      value: 'high'
    },
    actions: [
      {
        type: 'recommendation',
        text: 'Initiate falls prevention care plan',
        priority: 'urgent',
        role: 'nurse'
      },
      {
        type: 'task',
        text: 'Conduct environment safety assessment',
        priority: 'urgent',
        role: 'nurse',
        frequency: 'immediate'
      },
      {
        type: 'observation',
        text: 'Monitor mobility and document Q4H',
        priority: 'standard',
        role: 'nurse',
        frequency: 'every_4_hours'
      }
    ],
    escalation: 'high',
    enabled: true
  },
  {
    id: 'cognitive-decline-alert',
    name: 'Cognitive Decline Monitoring',
    description: 'Triggers when cognitive function score indicates moderate to severe impairment',
    trigger: {
      domain: 'psychological',
      field: 'subDomains.cognitiveFunction.score',
      operator: 'greater_than',
      value: 2
    },
    actions: [
      {
        type: 'referral',
        text: 'Refer to memory clinic for assessment',
        priority: 'standard',
        role: 'doctor'
      },
      {
        type: 'recommendation',
        text: 'Implement cognitive support strategies',
        priority: 'standard',
        role: 'nurse'
      },
      {
        type: 'task',
        text: 'Review medication for cognitive effects',
        priority: 'standard',
        role: 'doctor'
      }
    ],
    escalation: 'moderate',
    enabled: true
  },
  {
    id: 'complex-medication-regime',
    name: 'Complex Medication Management',
    description: 'Triggers when medication management score indicates complexity',
    trigger: {
      domain: 'clinical',
      field: 'subDomains.medicationManagement.score',
      operator: 'greater_than',
      value: 3
    },
    actions: [
      {
        type: 'task',
        text: 'Pharmacist medication review',
        priority: 'standard',
        role: 'nurse'
      },
      {
        type: 'recommendation',
        text: 'Consider medication administration support',
        priority: 'standard',
        role: 'nurse'
      }
    ],
    escalation: 'moderate',
    enabled: true
  },
  {
    id: 'social-isolation-risk',
    name: 'Social Isolation Intervention',
    description: 'Triggers when social isolation risk is identified',
    trigger: {
      domain: 'social',
      field: 'subDomains.socialNetworks.isolation_risk',
      operator: 'equals',
      value: 'isolated'
    },
    actions: [
      {
        type: 'referral',
        text: 'Refer to social services for community engagement programs',
        priority: 'standard',
        role: 'social_worker'
      },
      {
        type: 'recommendation',
        text: 'Explore befriending services',
        priority: 'standard',
        role: 'nurse'
      }
    ],
    escalation: 'moderate',
    enabled: true
  },
  {
    id: 'end-of-life-planning',
    name: 'End of Life Care Planning',
    description: 'Triggers comprehensive end of life planning when multiple high scores present',
    trigger: {
      domain: 'biological',
      field: 'weightedScore',
      operator: 'greater_than',
      value: 4.5
    },
    actions: [
      {
        type: 'referral',
        text: 'Initiate advance care planning discussion',
        priority: 'urgent',
        role: 'doctor'
      },
      {
        type: 'task',
        text: 'Contact palliative care team',
        priority: 'urgent',
        role: 'nurse'
      },
      {
        type: 'recommendation',
        text: 'Discuss preferred place of care with family',
        priority: 'urgent',
        role: 'nurse'
      }
    ],
    escalation: 'high',
    enabled: true
  }
];