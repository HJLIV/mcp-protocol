# API Documentation

## Core Classes

### MCPRulesEngine

The rules engine evaluates assessments against defined triggers and generates clinical recommendations.

#### Constructor
```typescript
new MCPRulesEngine(rules?: TriggerRuleType[])
```

#### Methods

**`evaluateAssessment(assessment: MATRONAssessmentType)`**
- Evaluates an assessment against all active rules
- Returns: `{ triggeredRules, recommendedActions, alerts }`

**`calculateOverallScore(assessment: MATRONAssessmentType): number`**
- Calculates weighted overall MATRON score (0-5 scale)
- Considers domain weights and weighted scores

**`calculateCareHours(assessment: MATRONAssessmentType): number`**
- Calculates recommended weekly care hours
- Factors in age, triggers, and complexity

**`addRule(rule: TriggerRuleType): void`**
- Adds a new clinical rule to the engine

**`removeRule(ruleId: string): void`**
- Removes a rule by ID

### MATRONCalculator

Utility class for assessment calculations and care planning.

#### Static Methods

**`calculateDomainScore(domain: any): number`**
- Calculates weighted score for a single domain
- Returns normalized score (0-5)

**`generateCarePlan(assessment, engine)`**
- Generates comprehensive care plan
- Returns: `{ careHours, recommendations, alerts, riskLevel }`

## Schema Types

### MATRONAssessmentType

Main assessment interface containing all clinical domains.

**Required Fields:**
- `clientId: string`
- `assessmentId: string`
- `assessmentDate: string`
- `assessorId: string`
- `assessorRole: ActorRole`
- `setting: SettingType`
- `eventType: EventType`
- `biological: BiologicalDomain`
- `psychological: PsychologicalDomain`
- `social: SocialDomain`
- `clinical: ClinicalDomain`
- `safetyResource: SafetyResourceDomain`
- `triggers: ClinicalTriggers`
- `lastUpdated: string`

### Domain Structures

1. **BiologicalDomain** (35% weight)
   - Medical History (1.05 weight)
   - Current Health Status (1.1 weight)
   - Physical Dependencies (1.15 weight)

2. **PsychologicalDomain** (25% weight)
   - Mental Health (1.1 weight)
   - Cognitive Function (1.1 weight)
   - Emotional Needs (1.0 weight)

3. **SocialDomain** (20% weight)
   - Living Conditions (1.05 weight)
   - Family Support (1.0 weight)
   - Social Networks (1.0 weight)
   - Engagement in Care (1.05 weight)

4. **ClinicalDomain** (15% weight)
   - Nursing and Clinical Interventions (1.15 weight)
   - Wound Care (1.0 weight) - optional
   - Medication Management (1.0 weight) - optional

5. **SafetyResourceDomain** (5% weight)
   - Environment (1.0 weight)
   - Falls Risk (1.0 weight)
   - Pressure Risk (1.0 weight) - optional
   - Resource Availability (1.0 weight) - optional

### Scoring Scale

All assessments use a consistent 0-5 scale:
- **0:** No issues / Fully independent
- **1:** Minimal issues / Slight assistance needed
- **2:** Mild issues / Some assistance needed
- **3:** Moderate issues / Regular assistance needed
- **4:** High issues / Highly dependent
- **5:** Critical issues / Completely dependent

## Usage Examples

### Basic Assessment
```typescript
import { MATRONAssessment, MCPRulesEngine } from '@livaware/mcp-protocol';

const assessment = MATRONAssessment.parse({
  clientId: 'CLIENT_001',
  assessmentDate: '2025-06-30',
  assessorRole: 'nurse',
  setting: 'home',
  // ... full assessment data
});
```

### Rules Engine
```typescript
import { MCPRulesEngine, CORE_MATRON_RULES } from '@livaware/mcp-protocol';

const engine = new MCPRulesEngine(CORE_MATRON_RULES);
const results = engine.evaluateAssessment(assessment);

console.log(`Triggered rules: ${results.triggeredRules.length}`);
console.log(`Care hours: ${engine.calculateCareHours(assessment)}`);
```

### Care Planning
```typescript
import { MATRONCalculator } from '@livaware/mcp-protocol';

const carePlan = MATRONCalculator.generateCarePlan(assessment, engine);
console.log(`Risk level: ${carePlan.riskLevel}`);
console.log(`Recommendations: ${carePlan.recommendations.length}`);
```