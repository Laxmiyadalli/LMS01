import { Book } from "@/src/types";

export async function getBooks(): Promise<Book[]> {
  const res = await fetch('/api/books');
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}

export async function addBook(book: Omit<Book, 'id' | 'available'>): Promise<Book> {
  const res = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error('Failed to add book');
  return res.json();
}

export async function updateBook(id: string, book: Partial<Book>): Promise<Book> {
  const res = await fetch(`/api/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error('Failed to update book');
  return res.json();
}

export async function deleteBook(id: string): Promise<void> {
  const res = await fetch(`/api/books/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete book');
}
