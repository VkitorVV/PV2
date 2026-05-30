export interface Dinamica {
  id: string;
  title: string;
  description: string;
  duration: string;
  materials: string;
  instructions: string[];
  example: string;
  prompts: string[];
  variations: string[];
  emoji: string;
  tags: string[];
}

export interface Review {
  id: number;
  stars: number;
  text: string;
  author: string;
  details: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface Bonus {
  id: string;
  tag: string;
  name: string;
  description: string;
  mockImage: string;
  icon: string;
}

export interface PurchaseState {
  isOpen: boolean;
  step: 'select' | 'payment' | 'processing' | 'success';
  selectedPlan: 'basic' | 'complete';
  paymentMethod: 'pix' | 'card';
  cardDetails: {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
  };
  email: string;
  userName: string;
}
