export interface mathTopics {
    id: string;
    title: string;
    description: string;
    icon: string;
    difficulty: 'Basic' | 'Intermediate' | 'Advanced';
    subtopics: string[];
    gradeLevel: number[];
  }
  
  export const mathTopics: mathTopics[] = [
    {
      id: 'algebra',
      title: 'Algebra',
      description: 'Master equations, expressions, and mathematical relationships',
      icon: '📊',
      difficulty: 'Intermediate',
      gradeLevel: [8, 9, 10],
      subtopics: [
        'Linear Equations',
        'Quadratic Equations',
        'Polynomials',
        'Factorization',
        'Algebraic Expressions'
      ]
    },
    {
      id: 'geometry',
      title: 'Geometry',
      description: 'Explore shapes, spaces, and measurements',
      icon: '📐',
      difficulty: 'Advanced',
      gradeLevel: [9, 10, 11],
      subtopics: [
        'Triangles',
        'Circles',
        'Coordinate Geometry',
        'Polygons',
        'Transformations'
      ]
    },
    {
      id: 'trigonometry',
      title: 'Trigonometry',
      description: 'Study relationships between sides and angles of triangles',
      icon: '📏',
      difficulty: 'Advanced',
      gradeLevel: [10, 11],
      subtopics: [
        'Trigonometric Ratios',
        'Heights and Distances',
        'Trigonometric Functions',
        'Identities',
        'Applications'
      ]
    },
    {
      id: 'statistics',
      title: 'Statistics',
      description: 'Analyze and interpret data through mathematical methods',
      icon: '📈',
      difficulty: 'Intermediate',
      gradeLevel: [8, 9, 10],
      subtopics: [
        'Mean, Median, Mode',
        'Probability',
        'Data Representation',
        'Standard Deviation',
        'Statistical Analysis'
      ]
    },
    {
      id: 'calculus',
      title: 'Calculus',
      description: 'Learn about rates of change and accumulation',
      icon: '∫',
      difficulty: 'Advanced',
      gradeLevel: [11, 12],
      subtopics: [
        'Limits',
        'Derivatives',
        'Basic Integration',
        'Applications of Derivatives',
        'Rate of Change'
      ]
    },
    {
      id: 'number-theory',
      title: 'Number Theory',
      description: 'Explore properties and relationships of numbers',
      icon: '🔢',
      difficulty: 'Basic',
      gradeLevel: [8, 9],
      subtopics: [
        'Factors and Multiples',
        'Prime Numbers',
        'GCD and LCM',
        'Number Systems',
        'Divisibility Rules'
      ]
    },
    {
      id: 'mensuration',
      title: 'Mensuration',
      description: 'Calculate areas, volumes, and perimeters of shapes',
      icon: '📏',
      difficulty: 'Intermediate',
      gradeLevel: [8, 9, 10],
      subtopics: [
        'Areas of 2D Shapes',
        'Surface Area',
        'Volume',
        'Perimeter',
        'Practical Applications'
      ]
    },
    {
      id: 'sets-relations',
      title: 'Sets & Relations',
      description: 'Study collections of objects and their relationships',
      icon: '🔗',
      difficulty: 'Intermediate',
      gradeLevel: [9, 10],
      subtopics: [
        'Set Operations',
        'Venn Diagrams',
        'Relations and Functions',
        'Domain and Range',
        'Mappings'
      ]
    }
  ];
  
  export const difficultyColors = {
    Basic: {
      bg: 'bg-green-100',
      text: 'text-green-800'
    },
    Intermediate: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800'
    },
    Advanced: {
      bg: 'bg-red-100',
      text: 'text-red-800'
    }
  };
  
  export const getTopicById = (id: string): mathTopics | undefined => {
    return mathTopics.find(topic => topic.id === id);
  };
  
  export const getTopicsByGrade = (grade: number): mathTopics[] => {
    return mathTopics.filter(topic => topic.gradeLevel.includes(grade));
  };
  
  export const getTopicsByDifficulty = (difficulty: 'Basic' | 'Intermediate' | 'Advanced'): mathTopics[] => {
    return mathTopics.filter(topic => topic.difficulty === difficulty);
  };
  