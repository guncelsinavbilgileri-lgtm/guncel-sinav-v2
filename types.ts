
// Added React import to resolve the 'React' namespace for React.ReactNode
import React from 'react';

export interface NewsItem {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  content: React.ReactNode;
}

export interface ExamInfo {
  id: string;
  title: string;
  subtitle: string;
  bgImageUrl: string;
}

export interface LogoCard {
  id: string;
  name: string;
  logoUrl: string;
  date: string;
  description: string;
}

export enum Tab {
  Home = 'Ana Sayfa',
  Form = 'Form',
  Contact = 'Bize Ulaşın',
  Info = 'Bilgi'
}
