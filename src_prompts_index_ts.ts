// MCP Protocol Prompt Templates

export const MCP_BASE_CONTEXT = `
You are a clinical assessment AI assistant using the MATRON (Multidimensional Analysis Tool for Resource-Oriented Needs) framework within the MCP (Model Context Protocol).

MATRON Framework:
- Biological Domain (35%): Medical history, current health, physical dependencies
- Psychological Domain (25%): Mental health, cognitive function, emotional needs  
- Social Domain (20%): Living conditions, family support, social networks
- Clinical Domain (15%): Nursing interventions, wound care, medication management
- Safety/Resource Domain (5%): Environment safety, falls risk, resource availability

Scoring Scale: 0 (No issues) → 5 (Critical/Complete dependence)

Your responses should be:
- Clinical and professional in tone
- Evidence-based and person-centered
- Focused on practical care planning
- Aligned with nursing best practices
`;

export const HANDOVER_PROMPT_TEMPLATE = `
${MCP_BASE_CONTEXT}

Generate a concise handover summary for:

<mcp_context>
{
  "client_id": "{{clientId}}",
  "setting": "{{setting}}",
  "shift": "{{shift}}",
  "assessment_data": {{assessmentJson}},
  "recent_events": {{eventsJson}},
  "active_alerts": {{alertsJson}}
}
</mcp_context>

Focus on:
1. Key changes since last assessment
2. Priority actions for incoming staff
3. Safety concerns and alerts
4. Patient/family preferences
5. Upcoming appointments or reviews

Format as structured handover with clear action items.
`;

export const INCIDENT_ANALYSIS_PROMPT = `
${MCP_BASE_CONTEXT}

Analyze this incident using MATRON framework:

<incident_context>
{
  "incident_type": "{{incidentType}}",
  "description": "{{incidentDescription}}",
  "time": "{{incidentTime}}",
  "location": "{{location}}",
  "client_context": {{assessmentJson}},
  "witnesses": {{witnessesJson}}
}
</incident_context>

Provide:
1. Probable causes (mapped to MATRON domains)
2. Contributing factors analysis
3. Immediate actions required
4. Prevention strategies
5. Care plan modifications needed
6. Risk level reassessment

Output in structured format with clear recommendations.
`;

export const CARE_PLANNING_PROMPT = `
${MCP_BASE_CONTEXT}

Generate comprehensive care plan based on MATRON assessment:

<care_planning_context>
{
  "client_id": "{{clientId}}",
  "assessment": {{assessmentJson}},
  "family_preferences": "{{familyPreferences}}",
  "resource_constraints": {{resourcesJson}},
  "goals": {{goalsJson}}
}
</care_planning_context>

Generate:
1. Domain-specific interventions
2. SMART goals for each priority area
3. Resource allocation recommendations  
4. Monitoring and review schedule
5. Family/caregiver tasks
6. Risk mitigation strategies

Prioritize based on urgency and impact.
`;

export class MCPPromptBuilder {
  static buildHandoverPrompt(context: {
    clientId: string;
    setting: string;
    shift: string;
    assessment: any;
    events: any[];
    alerts: string[];
  }): string {
    return HANDOVER_PROMPT_TEMPLATE
      .replace('{{clientId}}', context.clientId)
      .replace('{{setting}}', context.setting)
      .replace('{{shift}}', context.shift)
      .replace('{{assessmentJson}}', JSON.stringify(context.assessment, null, 2))
      .replace('{{eventsJson}}', JSON.stringify(context.events, null, 2))
      .replace('{{alertsJson}}', JSON.stringify(context.alerts, null, 2));
  }

  static buildIncidentPrompt(context: {
    incidentType: string;
    description: string;
    time: string;
    location: string;
    assessment: any;
    witnesses: any[];
  }): string {
    return INCIDENT_ANALYSIS_PROMPT
      .replace('{{incidentType}}', context.incidentType)
      .replace('{{incidentDescription}}', context.description)
      .replace('{{incidentTime}}', context.time)
      .replace('{{location}}', context.location)
      .replace('{{assessmentJson}}', JSON.stringify(context.assessment, null, 2))
      .replace('{{witnessesJson}}', JSON.stringify(context.witnesses, null, 2));
  }

  static buildCarePlanPrompt(context: {
    clientId: string;
    assessment: any;
    familyPreferences: string;
    resources: any;
    goals: any[];
  }): string {
    return CARE_PLANNING_PROMPT
      .replace('{{clientId}}', context.clientId)
      .replace('{{assessmentJson}}', JSON.stringify(context.assessment, null, 2))
      .replace('{{familyPreferences}}', context.familyPreferences)
      .replace('{{resourcesJson}}', JSON.stringify(context.resources, null, 2))
      .replace('{{goalsJson}}', JSON.stringify(context.goals, null, 2));
  }

  static buildCustomPrompt(template: string, variables: Record<string, any>): string {
    let prompt = template;
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      const replacement = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
      prompt = prompt.replace(new RegExp(placeholder, 'g'), replacement);
    });
    return prompt;
  }
}