export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: boolean;
  year: number;
  coverUrl?: string;
}

export type Role = 'student' | 'employee' | 'admin';
