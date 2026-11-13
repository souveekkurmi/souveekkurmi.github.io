const projects = [
  {
    id: 'power-sector',
    category: 'enterprise',
    label: 'PWC INDIA · POWER SECTOR',
    title: 'Enterprise software for the power sector',
    summary: 'Led development and delivery of enterprise Java applications for the power sector, from requirements through production support.',
    metric: 'Power sector',
    color: 'lime',
    highlights: [
      'Coordinated requirements and delivery with client and engineering teams.',
      'Contributed to solution architecture, system design and technical documentation.',
      'Supported releases and mentored developers through code reviews.'
    ],
    tags: ['Java', 'Spring Boot', 'Solution design'],
    flow: {
      title: 'Explore my role across delivery',
      stages: [
        ['Requirements', 'Work with stakeholders to clarify requirements and agree on what to deliver.'],
        ['Design & build', 'Translate requirements into technical designs and review implementation with the engineering team.'],
        ['Release & support', 'Coordinate release readiness and help resolve issues after launch.']
      ]
    }
  },
  {
    id: 'java-platform',
    category: 'enterprise',
    label: 'INFOSYS · HEALTH INSURANCE',
    title: 'Building and scaling enterprise Java applications',
    summary: 'Led an offshore Java team through feature development, releases, and production support for a health insurance client.',
    metric: 'Java at scale',
    color: 'purple',
    highlights: [
      'Translated business requirements into Java features and service changes, then led their implementation and deployment.',
      'Served as subject matter expert for Java applications, REST and SOAP services, and batch jobs.',
      'Optimized services to handle increased production load.',
      'Coordinated incident response with cloud, DevOps, network and database teams.'
    ],
    tags: ['Java', 'REST', 'SOAP', 'IBM DB2', 'WebSphere', 'Azure', 'Red Hat Linux'],
    flow: {
      title: 'Explore the development cycle',
      stages: [
        ['Design', 'Discuss requirements with client teams and identify the changes needed across applications and services.'],
        ['Develop', 'Implement Java features and service changes, and optimize services for higher production load.'],
        ['Release & support', 'Oversee deployment, investigate production issues, and coordinate fixes with infrastructure teams.']
      ]
    }
  },
  {
    id: 'dental-clinic',
    category: 'personal',
    label: 'PERSONAL PROJECT · FULL STACK',
    title: 'Dental Clinic Management System',
    summary: 'A Spring Boot application with role-based access, automated emails, an embedded map and WhatsApp chat.',
    metric: 'Full stack',
    color: 'amber',
    highlights: [
      'Built the application with Spring Boot, Thymeleaf and Oracle Database.',
      'Added automated emails and embedded Google Maps and a WhatsApp chat widget.'
    ],
    tags: ['Java', 'Spring Boot', 'Thymeleaf', 'Oracle Database']
  },
  {
    id: 'local-jarvis',
    category: 'personal',
    label: 'PERSONAL PROJECT · LOCAL AI',
    title: 'Local Jarvis',
    summary: 'A local AI assistant built with Spring AI and Ollama.',
    metric: 'Local AI',
    color: 'blue',
    highlights: [
      'Uses Spring AI to send prompts to a language model running locally through Ollama.'
    ],
    tags: ['Spring AI', 'Ollama', 'Local LLMs']
  }
];

const skills = [
  {
    title: 'Backend development',
    tags: ['Java', 'Spring Boot', 'Spring AI', 'Spring MVC', 'Spring Security', 'JPA / Hibernate', 'JDBC', 'REST', 'SOAP'],
    description: 'Java web applications, backend services, local AI integrations, REST APIs, and batch workflows.'
  },
  {
    title: 'Data & performance',
    tags: ['Oracle Database', 'PL/SQL', 'IBM DB2', 'MySQL', 'Ehcache'],
    description: 'Stored procedures, database troubleshooting, and application caching for high-frequency requests.'
  },
  {
    title: 'Delivery & operations',
    tags: ['Azure DevOps', 'Jenkins', 'Git', 'Splunk', 'OpenShift', 'Linux', 'Postman'],
    description: 'Release validation, incident diagnosis, CI/CD tooling, and production support.'
  },
  {
    title: 'Web applications',
    tags: ['Thymeleaf', 'JSP', 'Servlets', 'HTML', 'CSS', 'JavaScript'],
    description: 'Server-rendered enterprise applications and the interface for my dental clinic project.'
  }
];

const articles = [
  {
    id: 'spring-ai',
    category: 'engineering',
    label: 'ENGINEERING',
    art: 'terminal',
    title: 'Running Spring AI with Ollama',
    summary: 'A local setup for exploring prompts and model integrations with Spring Boot.',
    body: 'Spring AI can connect a Spring Boot application to a model running locally through Ollama. It gives you a way to experiment with prompts and integrations on your own machine. Model size and available memory affect how quickly the application responds.',
    demo: 'pipeline',
    url: 'https://www.linkedin.com/posts/souveek-kurmi_springai-springboot-java-activity-7502825483244466176-Okrf'
  },
  {
    id: 'dsm',
    category: 'management',
    label: 'ENERGY & ECONOMICS',
    art: 'chart',
    title: 'How deviation charges shape behaviour',
    summary: 'An elasticity lens on the power sector’s Deviation Settlement Mechanism.',
    body: 'Deviation settlement attaches a financial cost to differences between scheduled and actual electricity flows. The article asks how participants might change their decisions over time as that cost becomes more visible.',
    demo: 'elasticity',
    url: 'https://www.linkedin.com/pulse/understanding-dsm-through-behavioural-responsiveness-elasticity-gy2cc'
  },
  {
    id: 'managerial-grid',
    category: 'management',
    label: 'LEADERSHIP',
    art: 'grid',
    title: 'Exploring the Managerial Grid',
    summary: 'A two-axis view of leadership, from concern for people to concern for production.',
    body: 'Blake and Mouton’s Managerial Grid describes leadership through two dimensions. The same leader can show different degrees of concern for people and for production. Explore the grid to see how the emphasis changes the style.',
    demo: 'leadership',
    url: 'https://www.linkedin.com/posts/souveek-kurmi_organizationalbehaviour-leadership-managerialgrid-activity-7491334637277876226-nGVb'
  }
];

const journey = [
  {
    org: 'PwC India',
    logo: 'logos/pwc.svg',
    label: 'Oct 2023 – Present',
    title: 'Senior Associate · Senior Java Developer',
    summary: 'I lead development and delivery for enterprise applications in the power sector.',
    responsibilities: [
      {
        title: 'Client coordination and delivery',
        description: 'Lead requirement discussions, coordinate with client and delivery teams, and help resolve issues from development through rollout. Mentor developers through weekly code reviews.'
      },
      {
        title: 'Solution architecture and system design',
        description: 'Design enterprise Java systems and API integrations for the electric power sector, and prepare technical documentation for client proposals and solution submissions.'
      }
    ],
    highlights: ['Above and Beyond Team Award · 2024', 'New Assistant Manager Program'],
    tags: ['Java', 'Spring Boot', 'Backend development']
  },
  {
    org: 'Infosys',
    logo: 'logos/infosys.svg',
    label: 'Nov 2019 – Oct 2023',
    title: 'Technology Analyst',
    summary: 'Led an offshore Java team for a US health insurance client, from gathering requirements through implementation and deployment. Supported Java applications, services, and batch jobs.',
    highlights: ['RISE Unit Excellence Award · 2022', 'Multiple Infosys Insta Awards', 'Infosys Java SE8 and Spring Boot certifications'],
    tags: ['Java', 'Application support', 'Linux']
  },
  {
    org: 'IIM Kozhikode',
    logo: 'logos/iim-kozhikode.png',
    label: '2026 – 2028',
    title: 'Executive Post Graduate Programme',
    summary: 'I’m pursuing the EPGP at the Kochi campus to broaden my understanding of business, management, and leadership alongside my work in technology.',
    highlights: ['EPGP 13 · Kochi campus']
  },
  {
    org: 'AMC Engineering College',
    logo: 'logos/amc.png',
    label: 'Graduated 2019',
    title: 'Bachelor of Engineering',
    summary: 'Completed my undergraduate engineering degree in Bangalore before joining Infosys.',
    highlights: ['Bangalore, India · 2019'],
    tags: ['Engineering']
  },
  {
    org: 'Oracle',
    logo: 'logos/oracle.svg',
    label: 'Certification',
    title: 'Oracle Certified Associate',
    summary: 'Java SE 8 Programmer certification, covering the fundamentals of the language used throughout my enterprise development work.',
    highlights: ['Java SE 8 Programmer · 1Z0-808'],
    tags: ['Java SE 8']
  }
];
