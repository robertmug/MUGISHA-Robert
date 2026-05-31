import { Skill, Certificate, Language, AlgorithmicChallenge, ICTIssue } from './types';

export const PERSONAL_BIO = {
  name: 'MUGISHA ROBERT',
  title: 'Level 5 Fullstack Software Developer',
  tagline: 'Leveraging algorithmic logic and robust technical skills to engineer scalable web solutions and solve complex hardware/software challenges.',
  location: 'Nyamagabe, Rwanda',
  education: 'GSNDP CYANIKA in Nyamagabe District',
  level: 'Level 5 Software Development',
  email: 'robertmugisha908@gmail.com',
  phone: '0734311902',
  whatsappUrl: 'https://wa.me/250734311902',
  instagram: 'm__robert12',
  instagramUrl: 'https://instagram.com/m__robert12',
  facebook: 'Ro Bert',
  facebookUrl: 'https://www.facebook.com/search/top?q=Ro%20Bert',
  linkedin: 'MUGISHA Robert',
  linkedinUrl: 'https://www.linkedin.com/search/results/all/?keywords=MUGISHA%20Robert',
  about: 'I am a highly driven Fullstack Software Developer from Nyamagabe, Rwanda, trained at GSNDP CYANIKA. Certified up to Level 5 Software Development, I possess a rigorous foundation in frontend and backend environments. Beyond typical engineering, I harbor a deep passion for general modules like Mathematics and Physics, and I thrive in algorithmic problem-solving. Whether it is tuning complex database queries in PostgreSQL/MongoDB or repairing/troubleshooting intricate software/hardware bugs in PCs or mobile devices, I commit myself to delivering pristine results.',
};

export const PORTFOLIO_LANGUAGES: Language[] = [
  { name: 'Kinyarwanda', code: 'RW', level: 'Native', percentage: 100 },
  { name: 'English', code: 'EN', level: 'Fluent', percentage: 90 },
  { name: 'Français', code: 'FR', level: 'Fluent', percentage: 80 },
  { name: 'Kiswahili', code: 'SW', level: 'Conversational', percentage: 70 },
];

export const PORTFOLIO_SKILLS: Skill[] = [
  // Frontend
  {
    id: 'fe-1',
    name: 'React.js',
    category: 'frontend',
    proficiency: 95,
    iconName: 'Atom',
    description: 'Expertise in virtual DOM management, compound components, reusable hooks, and state management.',
  },
  {
    id: 'fe-2',
    name: 'Next.js',
    category: 'frontend',
    proficiency: 90,
    iconName: 'Layers',
    description: 'Proficient in Server Components (RSC), server actions, dynamic routing, and Static Site Generation (SSG).',
  },
  {
    id: 'fe-3',
    name: 'Tailwind CSS',
    category: 'frontend',
    proficiency: 98,
    iconName: 'Palette',
    description: 'Crafting responsive Web UI with atomic classes, theme extensibility, and custom micro-interactions.',
  },
  {
    id: 'fe-4',
    name: 'Vite',
    category: 'frontend',
    proficiency: 92,
    iconName: 'Zap',
    description: 'Accelerating development cycle using Vite bundling, path aliases, and optimized bundle sizes.',
  },
  // Backend & Databases
  {
    id: 'be-1',
    name: 'PostgreSQL',
    category: 'database',
    proficiency: 88,
    iconName: 'Database',
    description: 'Relational design, indexing optimization, CTEs, complex joins, and transactional consistency constraints.',
  },
  {
    id: 'be-2',
    name: 'MongoDB',
    category: 'database',
    proficiency: 85,
    iconName: 'Server',
    description: 'Document schema design, aggregation pipelines, performance indexing, and horizontal clustering concepts.',
  },
  {
    id: 'be-3',
    name: 'MySQL',
    category: 'database',
    proficiency: 90,
    iconName: 'Cpu',
    description: 'Database normalization, stored procedures, strict trigger-based integrity, and database administration.',
  },
  // Mathematics, Physics & Problem Solving
  {
    id: 'algo-1',
    name: 'Algorithmic Logic',
    category: 'problem-solving',
    proficiency: 95,
    iconName: 'Binary',
    description: 'Expertise in asymptotic analysis (Big O), tree traversal, recursion models, search and sort optimization.',
  },
  {
    id: 'algo-2',
    name: 'Mathematical Modeling',
    category: 'problem-solving',
    proficiency: 92,
    iconName: 'Variable',
    description: 'Translating physics & math functions (calculus, linear equation matrices, kinematics) into functional code.',
  },
  // Hardware & ICT Support
  {
    id: 'hw-1',
    name: 'PC Hardware & Software Support',
    category: 'hardware',
    proficiency: 94,
    iconName: 'Laptop',
    description: 'Full servicing of computer systems: motherboard checks, RAM/SSD upgrades, bios flashing, and OS setups.',
  },
  {
    id: 'hw-2',
    name: 'Smartphone Diagnostics',
    category: 'hardware',
    proficiency: 90,
    iconName: 'Smartphone',
    description: 'Repairs for mobile phones: board debugging, screen replacements, sensor recalibration, and flashing.',
  },
];

export const PORTFOLIO_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Certificate of Competency - Level 3',
    level: 'Level 3',
    institution: 'GSNDP CYANIKA / Workforce Development Authority',
    year: '2023',
    description: 'Fundamental certificate focusing on base-level hardware systems, network cabling, responsive HTML/CSS syntax, and basic algorithmic functions in internship situations.',
    skillsValidated: ['Network Cabling', 'Operating System Installations', 'Command Line Basics', 'Database Queries'],
  },
  {
    id: 'cert-2',
    title: 'Certificate of Training - Level 4',
    level: 'Level 4',
    institution: 'GSNDP CYANIKA / National Examination and School Inspection Authority',
    year: '2024',
    description: 'Intermediate certificate validating OOP design, structured database models (MySQL, PostgreSQL), and frontend styling frameworks (React.js, Tailwind CSS) implemented during software team internships.',
    skillsValidated: ['Object-Oriented Programming (OOP)', 'Relational Database Schema Design', 'Dynamic API Development', 'Asynchronous Operations'],
  },
  {
    id: 'cert-3',
    title: 'Advanced Certificate of Mastery - Level 5',
    level: 'Level 5',
    institution: 'GSNDP CYANIKA / National Examination, Inspection and School Assessment',
    year: '2025',
    description: 'Highest active qualification certifying advanced fullstack development, systems analysis, sophisticated database routing, next-gen frontend optimization (React, Next.js, Vite), and hardware terminal repairs.',
    skillsValidated: ['Fullstack System Engineering (React + Next.js + DBs)', 'Algorithmic Optimization & Complexity Analysis', 'Computer & Electronics Troubleshooting', 'Development Project Management'],
  },
];

export const ALGORITHMIC_CHALLENGES: AlgorithmicChallenge[] = [
  {
    id: 'algo-prime',
    title: 'Mathematical Prime Factorization',
    description: 'Decomposes any positive integer into its structural prime factors. Highly critical for cryptographic calculations.',
    difficulty: 'Easy',
    category: 'Mathematics & Number Theory',
    sampleInput: '360',
    inputPlaceholder: 'Enter any number, e.g., 360',
    codeSnippet: `function primeFactors(n: number) {
  const factors: number[] = [];
  // Divide out the factors of 2
  while (n % 2 === 0) {
    factors.push(2);
    n = n / 2;
  }
  // Search through odd factors up to sqrt(n)
  for (let i = 3; i * i <= n; i += 2) {
    while (n % i === 0) {
      factors.push(i);
      n = n / i;
    }
  }
  // If anything remains, it is a prime factor
  if (n > 2) {
    factors.push(n);
  }
  return factors;
}`,
    execute: (input: string) => {
      const consoleLogs: string[] = [];
      const num = parseInt(input.trim(), 10);
      if (isNaN(num) || num <= 1) {
        return { success: false, result: 'Please enter an integer greater than 1.', consoleLogs: ['Error: Invalid input'] };
      }
      if (num > 1000000000) {
        return { success: false, result: 'Please choose a number under 1,000,000,000 to prevent timeout.', consoleLogs: ['Shield: High input range'] };
      }

      consoleLogs.push(`Starting factoring decomposition of ${num}...`);
      let n = num;
      const factors: number[] = [];
      
      let stepCount = 0;
      while (n % 2 === 0) {
        factors.push(2);
        n /= 2;
        stepCount++;
        consoleLogs.push(`Step ${stepCount}: Found factor [2]. Remaining quotient is ${n}`);
      }

      for (let i = 3; i * i <= n; i += 2) {
        while (n % i === 0) {
          factors.push(i);
          n /= i;
          stepCount++;
          consoleLogs.push(`Step ${stepCount}: Found factor [${i}]. Remaining quotient is ${n}`);
        }
      }

      if (n > 2) {
        factors.push(n);
        stepCount++;
        consoleLogs.push(`Step ${stepCount}: Found remaining prime factor [${n}]`);
      }

      consoleLogs.push(`Completed! Composite prime grid: ${factors.join(' × ')} = ${num}`);
      return {
        success: true,
        result: `${num} = ${factors.join(' × ')}`,
        consoleLogs
      };
    }
  },
  {
    id: 'algo-bracket',
    title: 'Syntax Bracket Validator',
    description: 'Utilizes a stack-based algorithm to check if code parenthesis, braces, and brackets are perfectly balanced.',
    difficulty: 'Medium',
    category: 'Algorithmic Structures',
    sampleInput: '{[const x = (y + 1); if (x === 2) { return true; }]}',
    inputPlaceholder: 'Paste code snippets or brackets, e.g., {[()]}',
    codeSnippet: `function isBalanced(text: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ')': '(', '}': '{', ']': '['
  };
  for (const char of text) {
    if (['(', '{', '['].includes(char)) {
      stack.push(char);
    } else if ([')', '}', ']'].includes(char)) {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
    execute: (input: string) => {
      const consoleLogs: string[] = [];
      if (!input) {
        return { success: false, result: 'Please provide a non-empty string.', consoleLogs: ['Error: Empty expression'] };
      }

      consoleLogs.push('Initializing bracket tracking stack...');
      const stack: { char: string, pos: number }[] = [];
      const openBrackets = ['(', '{', '['];
      const closeBrackets = [')', '}', ']'];
      const bracketPairs: Record<string, string> = {
        ')': '(',
        '}': '{',
        ']': '['
      };

      for (let i = 0; i < input.length; i++) {
        const char = input[i];
        if (openBrackets.includes(char)) {
          stack.push({ char, pos: i });
          consoleLogs.push(`Character '${char}' at index ${i}: Pushed to stack. Active stack: [ ${stack.map(s => s.char).join(' ')} ]`);
        } else if (closeBrackets.includes(char)) {
          const expected = bracketPairs[char];
          if (stack.length === 0) {
            consoleLogs.push(`Syntax violation: Closing symbol '${char}' at position ${i} has no matching open symbol.`);
            return {
              success: true,
              result: `Unbalanced. Found orphan '${char}' at index ${i}.`,
              consoleLogs
            };
          }
          const top = stack.pop()!;
          if (top.char !== expected) {
            consoleLogs.push(`Syntax violation: Closing symbol '${char}' at index ${i} incorrectly matches opening '${top.char}' from index ${top.pos}.`);
            return {
              success: true,
              result: `Unbalanced. '${char}' at index ${i} closed rather than '${top.char}'.`,
              consoleLogs
            };
          }
          consoleLogs.push(`Character '${char}' at index ${i}: Matched and popped '${top.char}'. Active stack: [ ${stack.map(s => s.char).join(' ')} ]`);
        }
      }

      if (stack.length > 0) {
        consoleLogs.push(`Underflow violation: Leftover open symbol '${stack[0].char}' at position ${stack[0].pos} remains unclosed.`);
        return {
          success: true,
          result: `Unbalanced. Unclosed open tag '${stack[0].char}' at index ${stack[0].pos}.`,
          consoleLogs
        };
      }

      consoleLogs.push('Verification scan complete. The bracket balance quotient is secure and balanced.');
      return {
        success: true,
        result: 'Syntactically Balanced! All code structural symbols matched.',
        consoleLogs
      };
    }
  },
  {
    id: 'algo-fibonacci',
    title: 'Fast Fibonacci Sequencer',
    description: 'Generates terms of the Fibonacci sequence, illustrating linear algorithmic loops and recurrence relationships.',
    difficulty: 'Easy',
    category: 'Recurrence Mathematics',
    sampleInput: '15',
    inputPlaceholder: 'Enter sequence limit N (1 - 50)',
    codeSnippet: `function fibonacci(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}`,
    execute: (input: string) => {
      const consoleLogs: string[] = [];
      const n = parseInt(input.trim(), 10);
      if (isNaN(n) || n <= 0) {
        return { success: false, result: 'Please enter a positive limit N (1 or above).', consoleLogs: ['Error: Invalid N parameter'] };
      }
      if (n > 50) {
        return { success: false, result: 'Keep N <= 50 to prevent container system viewport overload.', consoleLogs: ['Warning: Terminating range constraint'] };
      }

      consoleLogs.push(`Computing the first ${n} sequences...`);
      if (n === 1) {
        consoleLogs.push('Term 1: [0]');
        return { success: true, result: 'F₁ = [0]', consoleLogs };
      }

      const sequence = [0n, 1n];
      consoleLogs.push('Term 1: 0 (seed)');
      consoleLogs.push('Term 2: 1 (seed)');

      for (let i = 2; i < n; i++) {
        const nextVal = sequence[i - 1] + sequence[i - 2];
        sequence.push(nextVal);
        consoleLogs.push(`Term ${i + 1}: ${nextVal.toString()} (from ${sequence[i - 1].toString()} + ${sequence[i - 2].toString()})`);
      }

      consoleLogs.push('Sequence compiled successfully.');
      return {
        success: true,
        result: `[ ${sequence.map(v => v.toString()).join(', ')} ]`,
        consoleLogs
      };
    }
  }
];

export const ICT_DIAGNOSTICS_DB: ICTIssue[] = [
  // PC
  {
    id: 'pc-1',
    device: 'pc',
    symptom: 'Continuous Beeps and No Display on boot-up',
    commonCauses: ['Oxidized or loose RAM sticks', 'Internal motherboard power fault', 'Dead BIOS battery', 'CPU overheating / dry thermal paste'],
    diagnosticSteps: [
      'Unplug power cable, extract safety battery, and discharge motherboard capacitors by holding power button for 15s.',
      'Carefully remove the RAM sticks, clean internal gold copper pins using a precision rubber eraser, and clean slots with dry air.',
      'Swap RAM stick positions across channels to isolate memory channel failure.',
      'Diagnose coin-cell CMOS CR2032 state; replace battery if system clock constantly lags.'
    ],
    resolutionTime: '15 - 30 minutes',
    estimatedCostRange: 'Free/Low cost diagnostic',
    iconName: 'ShieldAlert'
  },
  {
    id: 'pc-2',
    device: 'pc',
    symptom: 'Operating System crashing constantly (Blue Screen of Death)',
    commonCauses: ['Corrupt sector on Hard Drive/SSD', 'Conflicting device drivers', 'Malicious system software infections', 'Insufficient paging file resources'],
    diagnosticSteps: [
      'Boot in Recovery Command Prompt and initiate full sector analysis via `chkdsk /f /r`.',
      'Deploy System File Checker scans: execute `sfc /scannow` combined with `DISM.exe /Online /Cleanup-image /Restorehealth` repair structures.',
      'Check driver logs in Windows Event Viewer for specific system crash indicators (DUMP file validation).',
      'Assess thermal load spikes under stress using hardware monitors; apply deep dust removal and fresh arctic thermal paste if above 85°C.'
    ],
    resolutionTime: '1 - 2 hours',
    estimatedCostRange: 'Software Fix',
    iconName: 'Terminal'
  },
  // Phones
  {
    id: 'phone-1',
    device: 'phone',
    symptom: 'Phone touch screen completely unresponsive or displaying colors bleeding',
    commonCauses: ['Fractured digitizer layer from fall', 'Internal flex terminal oxidation/humidity', 'IC controller logic fatigue'],
    diagnosticSteps: [
      'Carefully apply low hot heat gun air (80°C) onto mobile case edges to soften structural waterless glue seal.',
      'Use ultra-thin metal suction cups and guitar picks to open phone body casing safely.',
      'Examine display logic ribbon pin connector under magnification glass for corrosion. Clean with 99% isopropyl alcohol.',
      'Validate if replacement LCD assembly corrects register touch functions immediately prior to gluing the shell panels.'
    ],
    resolutionTime: '30 - 45 minutes',
    estimatedCostRange: 'Hardware replacement standard diagnostic steps',
    iconName: 'Smartphone'
  },
  {
    id: 'phone-2',
    device: 'phone',
    symptom: 'Battery drains rapidly or gets extremely hot during standby',
    commonCauses: ['Background process runaway loop', 'Li-ion battery cell inflation', 'Defective power charging controller chip'],
    diagnosticSteps: [
      'Verify battery capacity thresholds using Android log dumps or iOS Health metrics (threshold below 80% warrants swift replacement).',
      'Use a USB Multimeter to measure amperage intake while connected to charging. Standard power ingestion should be stable.',
      'Check system thermal heat spots on motherboard under charging load. A shorted capacitor adjacent to PMIC chip produces extreme localized heat.',
      'If physical battery cell expands, safely remove to prevent dangerous puncture gas release and clean bracket.'
    ],
    resolutionTime: '20 - 40 minutes',
    estimatedCostRange: 'Safe battery deployment procedure',
    iconName: 'Flame'
  }
];
