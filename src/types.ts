export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'problem-solving' | 'hardware';
  proficiency: number; // 0 to 100
  iconName: string; // Used to select Lucide icon dynamically
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  level: string; // 'Level 3' | 'Level 4' | 'Level 5'
  institution: string;
  year: string;
  description: string;
  skillsValidated: string[];
}

export interface Language {
  name: string;
  code: string;
  level: 'Native' | 'Fluent' | 'Intermediate' | 'Conversational';
  percentage: number;
}

export interface AlgorithmicChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  sampleInput: string;
  inputPlaceholder: string;
  codeSnippet: string;
  execute: (input: string) => { success: boolean; result: string; consoleLogs: string[] };
}

export interface ICTIssue {
  id: string;
  device: 'pc' | 'phone';
  symptom: string;
  commonCauses: string[];
  diagnosticSteps: string[];
  resolutionTime: string;
  estimatedCostRange: string;
  iconName: string;
}

export interface MessagePayload {
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  type: 'email' | 'sms';
  subject: string;
  message: string;
  verified: boolean;
  timestamp: string;
}
