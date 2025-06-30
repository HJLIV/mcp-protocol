// Main MCP Protocol exports
export * from './schema';
export * from './engine';
export * from './types';
export * from './utils';
export * from './prompts';
export { CORE_MATRON_RULES } from './rules/core-rules';

// Version information
export const MCP_VERSION = '0.1.0';
export const MATRON_VERSION = '1.0';

// Quick start example
export { default as exampleAssessment } from './examples/sample-assessment';