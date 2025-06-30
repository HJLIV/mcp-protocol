# MCP Protocol

> **M**odel **C**ontext **P**rotocol - Foundational schema and logic layer for Livaware clinical tools

[![npm version](https://badge.fury.io/js/%40livaware%2Fmcp-protocol.svg)](https://badge.fury.io/js/%40livaware%2Fmcp-protocol)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## Overview

MCP Protocol provides a comprehensive, machine-readable schema for understanding and reacting to clinical scenarios using the MATRON (Multidimensional Analysis Tool for Resource-Oriented Needs) framework.

### Key Features

- 🏥 **Clinical Assessment Framework** - Complete MATRON implementation
- 🔧 **Rules Engine** - Automated clinical logic and triggers  
- 🤖 **AI Integration** - GPT prompt templates for clinical assistants
- 📊 **Care Planning** - Automated care hour calculations and recommendations
- 🔒 **Type Safety** - Full TypeScript support with Zod validation
- 🧪 **Testing** - Comprehensive test suite with clinical scenarios

## Quick Start

### Installation

```bash
npm install @livaware/mcp-protocol
```

### Basic Usage

```typescript
import { MATRONAssessment, MCPRulesEngine } from '@livaware/mcp-protocol';

// Create assessment
const assessment = MATRONAssessment.parse({
  clientId: 'CLIENT_001',
  assessmentDate: '2025-06-30',
  assessorRole: 'nurse',
  setting: 'home',
  // ... assessment data
});

// Initialize rules engine
const engine = new MCPRulesEngine();
const results = engine.evaluateAssessment(assessment);

console.log('Care recommendations:', results.recommendedActions);
```

## MATRON Framework

The protocol implements the complete MATRON framework:

| Domain | Weight | Sub-Domains |
|--------|--------|-------------|
| **Biological** | 35% | Medical History, Current Health, Physical Dependencies |
| **Psychological** | 25% | Mental Health, Cognitive Function, Emotional Needs |
| **Social** | 20% | Living Conditions, Family Support, Social Networks |
| **Clinical** | 15% | Nursing Interventions, Wound Care, Medication Management |
| **Safety/Resource** | 5% | Environment Safety, Falls Risk, Resource Availability |

## Documentation

- [API Documentation](./docs/api.md)
- [Schema Reference](./docs/schema.md)
- [Rules Engine Guide](./docs/rules-engine.md)
- [Integration Examples](./examples/)

## Development

```bash
# Clone repository
git clone https://github.com/HJLIV/mcp-protocol.git
cd mcp-protocol

# Install dependencies
npm install

# Run tests
npm test

# Build project
npm run build

# Start development
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
