import React, { useState, useEffect } from 'react';
import { getBooks, addBook, updateBook, deleteBook } from '@/src/services/api';
import { Book } from '@/src/types';
import { Plus, Edit2, Trash2, LayoutGrid, List as ListIcon, Loader2, Save, Eye, Calendar, Hash, Tag, Info, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export default function EmployeePortal() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [viewingBook, setViewingBook] = useState<Book | null>(null);
  const [viewingImage, setViewingImage] = useState<string | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      isbn: formData.get('isbn') as string,
      category: formData.get('category') as string,
      year: parseInt(formData.get('year') as string),
      coverUrl: formData.get('coverUrl') as string,
    };

    try {
      await addBook(data);
      toast.success('Book added successfully');
      setIsAddOpen(false);
      loadBooks();
    } catch (error) {
      toast.error('Failed to add book');
    }
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingBook) return;
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      author: formData.get('author') as string,
      isbn: formData.get('isbn') as string,
      category: formData.get('category') as string,
      year: parseInt(formData.get('year') as string),
      coverUrl: formData.get('coverUrl') as string,
    };

    try {
      await updateBook(editingBook.id, data);
      toast.success('Book updated successfully');
      setEditingBook(null);
      loadBooks();
    } catch (error) {
      toast.error('Failed to update book');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this book? This action is irreversible.')) return;
    try {
      await deleteBook(id);
      toast.success('Book removed from catalog');
      loadBooks();
    } catch (error) {
      toast.error('Failed to delete book');
    }
  }

  const categoryStyles: Record<string, string> = {
    Engineer: "border-blue-600 text-blue-400 bg-blue-600/10",
    Doctor: "border-emerald-600 text-emerald-400 bg-emerald-600/10",
    Accountant: "border-amber-600 text-amber-400 bg-amber-600/10",
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-[#eeff00]">
            <Plus className="w-5 h-5" />
            <span className="uppercase tracking-[0.3em] text-xs font-bold">Inventory Management</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter">
            Employee <span className="text-[#eeff00]">Terminal</span>
          </h1>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#eeff00] hover:bg-yellow-400 text-black font-black italic uppercase tracking-widest px-8 h-12 rounded-none transition-all transform active:scale-95 shadow-[4px_4px_0px_0px_white]">
              <Plus className="w-5 h-5 mr-2" />
              Add New Book
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#15151e] border-[#eeff00] text-white">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter">Add to <span className="text-[#eeff00]">Inventory</span></DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-6 py-4">
               <BookFormFields />
               <DialogFooter>
                 <Button type="submit" className="w-full bg-[#eeff00] hover:bg-yellow-400 text-black font-bold uppercase italic tracking-widest">Register Book</Button>
               </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-[#1f1f27] border border-white/5 overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-black/40">
            <TableRow className="border-white/5">
              <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Catalog Info</TableHead>
              <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Category</TableHead>
              <TableHead className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
              <TableHead className="text-right text-gray-400 font-bold uppercase tracking-widest text-[10px]">Pit Stop (Actions)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
               <TableRow>
                 <TableCell colSpan={4} className="h-40 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#eeff00]" />
                 </TableCell>
               </TableRow>
            ) : books.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-40 text-center text-gray-500">
                     No books in stock.
                  </TableCell>
                </TableRow>
            ) : (
              books.map((book) => (
                <TableRow key={book.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                  <TableCell>
                    <div className="flex items-center space-x-4">
                       <div 
                         className="w-12 h-16 bg-black rounded overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#eeff00] transition-all transform hover:scale-105"
                         onClick={() => setViewingImage(book.coverUrl || "https://images.unsplash.com/photo-1543003923-43503822f2db?auto=format&fit=crop&q=80&w=400")}
                       >
                          <img src={book.coverUrl || "https://images.unsplash.com/photo-1543003923-43503822f2db?auto=format&fit=crop&q=80&w=100"} className="w-full h-full object-cover" />
                       </div>
                       <div>
                         <div className="font-bold uppercase italic tracking-tight">{book.title}</div>
                         <div className="text-xs text-gray-500 font-medium">By {book.author} • {book.isbn}</div>
                       </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`rounded-none uppercase text-[10px] font-bold ${categoryStyles[book.category] || "border-white/20 text-gray-300 bg-white/5"}`}>
                      {book.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={book.available ? "bg-green-600/20 text-green-400 border border-green-600/30 rounded-none uppercase text-[10px]" : "bg-red-600/20 text-red-400 border border-red-600/30 rounded-none uppercase text-[10px]"}>
                      {book.available ? "Racing" : "Box Box Box"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                       <Button 
                         variant="outline" 
                         size="icon" 
                         className="h-9 w-9 rounded-none border-2 border-black bg-white hover:bg-[#eeff00] text-black transition-all transform hover:scale-110 shadow-[2px_2px_0px_0px_black]"
                         onClick={() => setViewingBook(book)}
                         title="View Specifications"
                        >
                         <Eye className="w-4 h-4" />
                       </Button>
                       <Button 
                         variant="outline" 
                         size="icon" 
                         className="h-9 w-9 rounded-none border-2 border-black bg-[#e10600] hover:bg-black text-white hover:text-[#e10600] transition-all transform hover:scale-110 shadow-[2px_2px_0px_0px_white]"
                         onClick={() => setEditingBook(book)}
                         title="Update Book"
                        >
                         <Edit2 className="w-4 h-4" />
                       </Button>
                       <Button 
                         variant="outline" 
                         size="icon" 
                         className="h-9 w-9 rounded-none border-2 border-black bg-black hover:bg-[#e10600] text-[#e10600] hover:text-white transition-all transform hover:scale-110 shadow-[2px_2px_0px_0px_#e10600]"
                         onClick={() => handleDelete(book.id)}
                         title="Delete Book"
                        >
                         <Trash2 className="w-4 h-4" />
                       </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Dialog */}
      <Dialog open={!!viewingBook} onOpenChange={(open) => !open && setViewingBook(null)}>
        <DialogContent className="bg-[#15151e] border-[#eeff00] text-white max-w-2xl p-0 overflow-hidden rounded-none shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)]">
          {viewingBook && (
            <div className="flex flex-col md:flex-row">
              <div 
                className="w-full md:w-1/2 aspect-[4/5] bg-black relative group cursor-zoom-in"
                onClick={() => setViewingImage(viewingBook.coverUrl || "https://images.unsplash.com/photo-1543003923-43503822f2db?auto=format&fit=crop&q=80&w=400")}
              >
                <img 
                  src={viewingBook.coverUrl || "https://images.unsplash.com/photo-1543003923-43503822f2db?auto=format&fit=crop&q=80&w=400"} 
                  alt={viewingBook.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-[#eeff00] text-black p-3 font-black text-xs uppercase italic tracking-widest flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" /> Expand View
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-8 space-y-6">
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-[#eeff00]/10 border-[#eeff00] text-[#eeff00] uppercase font-black tracking-[0.2em] text-[10px] rounded-none">
                    {viewingBook.category}
                  </Badge>
                  <h2 className="text-3xl font-black italic uppercase leading-none tracking-tighter">
                    {viewingBook.title}
                  </h2>
                  <p className="text-xl text-gray-400 font-bold italic">By {viewingBook.author}</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <div className="flex items-center space-x-3 text-gray-400">
                      <Calendar className="w-4 h-4 text-[#eeff00]" />
                      <span className="text-[10px] uppercase font-black tracking-widest">Year</span>
                    </div>
                    <span className="font-bold text-sm text-white">{viewingBook.year}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <div className="flex items-center space-x-3 text-gray-400">
                      <Hash className="w-4 h-4 text-[#eeff00]" />
                      <span className="text-[10px] uppercase font-black tracking-widest">ISBN</span>
                    </div>
                    <span className="font-bold text-sm text-white">{viewingBook.isbn}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <div className="flex items-center space-x-3 text-gray-400">
                      <Tag className="w-4 h-4 text-[#eeff00]" />
                      <span className="text-[10px] uppercase font-black tracking-widest">Sector</span>
                    </div>
                    <span className="font-bold text-sm text-white">{viewingBook.category}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-[10px] uppercase font-black tracking-widest text-gray-500">Status</span>
                    <Badge className={viewingBook.available ? "bg-green-600" : "bg-red-600"}>
                      {viewingBook.available ? "Active Stock" : "Checked Out"}
                    </Badge>
                  </div>
                </div>

                <Button 
                  onClick={() => setViewingBook(null)}
                  className="w-full mt-6 bg-[#eeff00] text-black font-black uppercase italic py-3 tracking-[0.2em] hover:bg-yellow-400 transition-colors shadow-[4px_4px_0px_0px_white]"
                >
                  Close Terminal
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewingImage} onOpenChange={(open) => !open && setViewingImage(null)}>
        <DialogContent className="bg-black/90 border-none max-w-4xl p-0 overflow-hidden rounded-none flex items-center justify-center">
          {viewingImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img 
                src={viewingImage} 
                className="max-w-full max-h-[90vh] object-contain shadow-[0_0_100px_rgba(238,255,0,0.2)]" 
                alt="Full preview"
              />
              <button 
                onClick={() => setViewingImage(null)}
                className="absolute top-4 right-4 bg-[#eeff00] text-black p-2 hover:bg-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingBook} onOpenChange={(open) => !open && setEditingBook(null)}>
        <DialogContent className="bg-[#15151e] border-[#eeff00] text-white">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter">Edit <span className="text-[#eeff00]">Specifications</span></DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-6 py-4">
             <BookFormFields book={editingBook || undefined} />
             <DialogFooter>
               <Button type="submit" className="w-full bg-[#1e1e1e] border border-[#eeff00] text-white hover:bg-black font-bold uppercase italic tracking-widest shadow-[4px_4px_0px_0px_#eeff00]">
                 Save Changes
               </Button>
             </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function BookFormFields({ book }: { book?: Book }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 space-y-2">
        <Label className="uppercase text-[10px] font-bold text-gray-500 tracking-widest">Book Title</Label>
        <Input name="title" defaultValue={book?.title} placeholder="e.g. Aerodynamics of High Performance" className="bg-black/50 border-white/10 rounded-none focus:border-[#eeff00]" required />
      </div>
      <div className="space-y-2">
        <Label className="uppercase text-[10px] font-bold text-gray-500 tracking-widest">Author</Label>
        <Input name="author" defaultValue={book?.author} placeholder="e.g. Adrian Newey" className="bg-black/50 border-white/10 rounded-none focus:border-[#eeff00]" required />
      </div>
      <div className="space-y-2">
        <Label className="uppercase text-[10px] font-bold text-gray-500 tracking-widest">Year</Label>
        <Input name="year" type="number" defaultValue={book?.year} placeholder="2024" className="bg-black/50 border-white/10 rounded-none focus:border-[#eeff00]" required />
      </div>
      <div className="space-y-2">
        <Label className="uppercase text-[10px] font-bold text-gray-500 tracking-widest">Category</Label>
        <Select name="category" defaultValue={book?.category || "Engineer"}>
          <SelectTrigger className="bg-black/50 border-white/10 rounded-none focus:border-[#eeff00]">
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent className="bg-[#15151e] border-[#eeff00] text-white">
            <SelectItem value="Engineer">Engineer</SelectItem>
            <SelectItem value="Doctor">Doctor</SelectItem>
            <SelectItem value="Accountant">Accountant</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="uppercase text-[10px] font-bold text-gray-500 tracking-widest">ISBN</Label>
        <Input name="isbn" defaultValue={book?.isbn} placeholder="978-..." className="bg-black/50 border-white/10 rounded-none focus:border-[#eeff00]" required />
      </div>
      <div className="col-span-2 space-y-2">
        <Label className="uppercase text-[10px] font-bold text-gray-500 tracking-widest">Cover Image URL</Label>
        <Input name="coverUrl" defaultValue={book?.coverUrl} placeholder="https://..." className="bg-black/50 border-white/10 rounded-none focus:border-[#eeff00]" />
      </div>
    </div>
  );
}
