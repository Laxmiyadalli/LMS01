import React, { useState, useEffect } from 'react';
import { getBooks } from '@/src/services/api';
import { Book } from '@/src/types';
import { Search, BookOpen, Clock, Filter, HardHat, Stethoscope, Calculator, LayoutGrid, Info, Calendar, Hash, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'motion/react';

export default function StudentPortal() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [visibleCount, setVisibleCount] = useState(7);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const data = await getBooks();
      // Reverse to show recently added first
      setBooks([...data].reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || book.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const displayedBooks = filteredBooks.slice(0, visibleCount);

  const categories = [
    { id: 'all', label: 'All Sectors', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'engineer', label: 'Engineer', icon: <HardHat className="w-4 h-4" /> },
    { id: 'doctor', label: 'Doctor', icon: <Stethoscope className="w-4 h-4" /> },
    { id: 'accountant', label: 'Accountant', icon: <Calculator className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center space-x-2 text-[#eeff00]">
          <BookOpen className="w-5 h-5" />
          <span className="uppercase tracking-[0.3em] text-xs font-bold">Catalog Exploration</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter">
          The <span className="text-[#eeff00]">Knowledge</span> Grid
        </h1>
        <p className="text-gray-400 max-w-2xl text-lg">
          Filter by professional sector to fine-tune your performance.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input 
            placeholder="Search titles or authors..." 
            className="pl-12 h-12 bg-black/40 border-white/10 text-lg focus:border-[#eeff00] focus:ring-0 rounded-none shadow-[2px_2px_0px_0px_#eeff00]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
          <TabsList className="bg-white/5 border border-white/10 p-1 h-12 rounded-none flex flex-wrap h-auto md:h-12">
            {categories.map(cat => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id}
                className="data-[state=active]:bg-[#eeff00] data-[state=active]:text-black rounded-none px-4 py-2 font-bold uppercase text-[10px] tracking-widest flex items-center space-x-2 h-full"
              >
                {cat.icon}
                <span>{cat.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[400px] bg-white/5 animate-pulse rounded-lg" />
            ))
          ) : displayedBooks.length > 0 ? (
            displayedBooks.map((book, idx) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedBook(book)}
                className="cursor-pointer"
              >
                <Card className="bg-[#1f1f27] h-full border-white/5 overflow-hidden group hover:border-[#eeff00]/50 transition-all flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img 
                      src={book.coverUrl || "https://images.unsplash.com/photo-1543003923-43503822f2db?auto=format&fit=crop&q=80&w=400"} 
                      alt={book.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                      <Badge className={book.available ? "bg-green-600" : "bg-red-600"}>
                        {book.available ? "Available" : "Checked Out"}
                      </Badge>
                      <Badge variant="outline" className="bg-black/80 border-[#eeff00] text-white uppercase italic font-black text-[10px]">
                        {book.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-3 flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-[#eeff00] font-black uppercase tracking-widest text-[10px]">
                        Edition {book.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold uppercase italic tracking-tight leading-tight group-hover:text-[#eeff00] transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-400 font-medium mt-auto">By {book.author}</p>
                    <div className="pt-4 flex items-center text-[#eeff00] text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Info className="w-3 h-3 mr-2" />
                      View Full Details
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-xl">
               <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
               <h3 className="text-2xl font-bold italic uppercase">No results in {activeCategory} sector</h3>
               <p className="text-gray-500">The grid is empty for this selection. Try clearing filters.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {!loading && visibleCount < filteredBooks.length && (
        <div className="flex justify-center pt-10">
          <button 
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="group relative px-8 py-4 bg-transparent border-2 border-[#eeff00] text-[#eeff00] font-black uppercase italic tracking-[0.2em] transition-all hover:bg-[#eeff00] hover:text-black overflow-hidden"
          >
            <span className="relative z-10">Load More Resources</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-black opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      )}

      <Dialog open={!!selectedBook} onOpenChange={(open: boolean) => !open && setSelectedBook(null)}>
        <DialogContent className="bg-[#15151e] border-[#eeff00] text-white max-w-2xl p-0 overflow-hidden rounded-none">
          {selectedBook && (
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 aspect-[4/5] bg-black">
                <img 
                  src={selectedBook.coverUrl || "https://images.unsplash.com/photo-1543003923-43503822f2db?auto=format&fit=crop&q=80&w=400"} 
                  alt={selectedBook.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 p-8 space-y-6">
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-[#eeff00]/10 border-[#eeff00] text-[#eeff00] uppercase font-black tracking-[0.2em] text-[10px] rounded-none">
                    {selectedBook.category}
                  </Badge>
                  <h2 className="text-3xl font-black italic uppercase leading-none tracking-tighter">
                    {selectedBook.title}
                  </h2>
                  <p className="text-xl text-gray-400 font-bold italic">By {selectedBook.author}</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <DetailItem icon={<Calendar className="w-4 h-4" />} label="Publication Year" value={selectedBook.year.toString()} />
                  <DetailItem icon={<Hash className="w-4 h-4" />} label="ISBN Number" value={selectedBook.isbn} />
                  <DetailItem icon={<Tag className="w-4 h-4" />} label="Category" value={selectedBook.category} />
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-[10px] uppercase font-black tracking-widest text-gray-500">Stock Status</span>
                    <Badge className={selectedBook.available ? "bg-green-600" : "bg-red-600"}>
                      {selectedBook.available ? "Ready for Checkout" : "Currently Unavailable"}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed italic">
                  * High-performance resource. Academic use only. Return to grid after processing.
                </p>

                <button 
                  onClick={() => setSelectedBook(null)}
                  className="w-full mt-6 bg-[#eeff00] text-black font-black uppercase italic py-3 tracking-[0.2em] hover:bg-yellow-400 transition-colors shadow-[4px_4px_0px_0px_white]"
                >
                  Return to Catalog
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5">
      <div className="flex items-center space-x-3 text-gray-400">
        <div className="text-[#eeff00]">{icon}</div>
        <span className="text-[10px] uppercase font-black tracking-widest">{label}</span>
      </div>
      <span className="font-bold text-sm tracking-tight text-white">{value}</span>
    </div>
  );
}
