import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Newspaper, Zap, Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getBooks } from '@/src/services/api';
import { Book } from '@/src/types';

export default function Blogs() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4); // Start with 4 blogs

  useEffect(() => {
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
    loadBooks();
  }, []);

  // Generate blog-like metadata for each book
  const bookBlogs = books.map(book => ({
    id: book.id,
    title: `Exploring the Grid: ${book.title}`,
    description: `A deep dive into the ${book.category} sector focusing on the principles established by ${book.author}. Technical analysis and practical application.`,
    url: `https://medium.com/search?q=${encodeURIComponent(book.title)}`,
    author: book.author,
    date: `May ${10 + (parseInt(book.id.slice(-1), 16) % 20)}, 2026`, // Mock deterministic date
    image: book.coverUrl || "https://images.unsplash.com/photo-1543003923-43503822f2db?auto=format&fit=crop&q=80&w=400"
  }));

  const displayedBlogs = bookBlogs.slice(0, visibleCount);

  const featuredBlogs = [
    {
      id: "feat-1",
      title: "The Future of Hybrid Power Units",
      description: "Analyzing the shift towards 100% sustainable fuels and increased electrical output in the upcoming regulations.",
      url: "https://medium.com/search?q=f1+hybrid+power",
      author: "Tech Division",
      date: "May 12, 2026",
      image: "https://images.unsplash.com/photo-1543003923-43503822f2db?auto=format&fit=crop&q=80&w=401"
    },
    {
      id: "feat-2",
      title: "Mental Strength in High Velocity Environments",
      description: "How pilots maintain focus and composure while navigating the edge of physical possibility.",
      url: "https://medium.com/search?q=f1+mental+performance",
      author: "Performance Lab",
      date: "May 11, 2026",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=402"
    }
  ];

  return (
    <div className="space-y-16">
      <header className="relative pt-12 pb-24 border-b-4 border-white overflow-hidden group">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-1000">
          <Newspaper className="w-[600px] h-[600px] -rotate-12 text-[#eeff00]" />
        </div>
        
        <div className="relative z-10 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4 text-[#eeff00]"
          >
            <div className="h-[2px] w-12 bg-[#eeff00]" />
            <span className="uppercase tracking-[0.5em] text-[10px] font-black italic">Archival Data // Intelligence Feed</span>
          </motion.div>

          <h1 className="text-5xl md:text-[7rem] font-black italic uppercase leading-[0.9] tracking-tighter transform -skew-x-12 select-none">
            TODAY'S <span className="text-[#eeff00] drop-shadow-[5px_5px_0px_rgba(255,255,255,0.1)]">READER</span> <br />
            TOMORROW'S <span className="text-[#eeff00] drop-shadow-[5px_5px_0px_rgba(255,255,255,0.1)]">LEADER</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8">
            <p className="text-gray-400 max-w-xl text-xl md:text-2xl font-medium italic border-l-2 border-[#eeff00] pl-6 py-2">
              Deep-cycle telemetry and expert analysis from the core of the engineering sector. Professional briefings for high-performance entities.
            </p>
            <div className="flex flex-col items-end text-right font-mono text-[10px] uppercase text-gray-500 tracking-widest">
              <span>Updated: 2026.05.13 // 05:39:02</span>
              <span>Network Status: Synchronized</span>
              <span className="text-[#eeff00]">Access Level: Unrestricted</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 grid grid-cols-1 gap-12">
          {/* Featured Content Segment */}
          {!loading && (
            <div className="space-y-12">
              <div className="flex items-center space-x-4">
                <Zap className="w-5 h-5 text-[#eeff00]" />
                <h2 className="text-xl font-black italic uppercase tracking-widest border-b border-[#eeff00] pb-1">Featured Briefings</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredBlogs.map((post) => (
                  <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer" className="group">
                    <div className="bg-[#1a1a24] border border-white/5 p-6 hover:border-[#eeff00]/30 transition-all flex flex-col h-full relative">
                       <div className="absolute top-0 left-0 w-1 h-0 bg-[#eeff00] group-hover:h-full transition-all duration-300" />
                       <h4 className="text-lg font-black italic uppercase italic mb-3 group-hover:text-[#eeff00] transition-colors">{post.title}</h4>
                       <p className="text-xs text-gray-400 mb-4 line-clamp-2 italic">{post.description}</p>
                       <div className="mt-auto flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-[#eeff00]/40">
                          <span>{post.author}</span>
                          <ExternalLink className="w-3 h-3" />
                       </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="flex items-center space-x-4 pt-8">
                <Newspaper className="w-5 h-5 text-[#eeff00]" />
                <h2 className="text-xl font-black italic uppercase tracking-widest border-b border-[#eeff00] pb-1">Library Archive Feed</h2>
              </div>
            </div>
          )}

          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 bg-white/5 animate-pulse" />
            ))
          ) : displayedBlogs.length > 0 ? (
            displayedBlogs.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <a href={post.url} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-[320px] aspect-[4/3] bg-black overflow-hidden relative border-2 border-white/5 group-hover:border-[#eeff00] transition-colors duration-500">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-white/10 px-3 py-1 text-[8px] font-black uppercase tracking-[0.3em] text-[#eeff00]">
                        Briefing 0{index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-[#eeff00] text-black rounded-none skew-x-[-12deg] tracking-widest py-0.5">INTEL</Badge>
                        <span className="text-gray-600 font-mono text-[10px]">/ {post.date}</span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-black italic uppercase leading-none tracking-tighter group-hover:text-[#eeff00] transition-colors duration-300">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 font-medium italic border-b border-white/5 pb-4">
                        {post.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2 text-gray-500 text-[10px] uppercase font-black tracking-widest">
                            <User className="w-3 h-3 text-[#eeff00]" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-500 text-[10px] uppercase font-black tracking-widest">
                            <Clock className="w-3 h-3 text-[#eeff00]" />
                            <span>6 Min Read</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:bg-[#eeff00] group-hover:text-black transition-all transform group-hover:rotate-45">
                          <ExternalLink className="w-4 h-4 transform group-hover:-rotate-45" />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-white/10">
              <p className="text-gray-500 uppercase tracking-widest font-black italic">No Intel Available In Current Sector</p>
            </div>
          )}

          {!loading && visibleCount < bookBlogs.length && (
            <div className="flex justify-center pt-8">
              <Button 
                onClick={() => setVisibleCount(prev => prev + 4)}
                variant="outline"
                className="w-full md:w-auto px-12 h-14 bg-transparent border-2 border-white text-white font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all rounded-none"
              >
                Decrypt More Briefings
              </Button>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-12">
          <div className="bg-white text-black p-8 skew-x-[-2deg] relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-black italic uppercase leading-none tracking-tighter">Synchronize Your Terminal</h2>
              <p className="font-bold italic">Join the elite network of developers and engineers pushing the limits of the grid.</p>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="TERMINAL_ID@SECTOR.COM"
                  className="w-full bg-black/5 border-2 border-black/10 px-4 py-3 font-mono text-xs focus:outline-none focus:border-black transition-colors"
                />
                <Button className="w-full bg-black text-white rounded-none font-black uppercase italic tracking-widest h-12 hover:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                  Subscribe to Feed
                </Button>
              </div>
            </div>
            <Zap className="absolute -right-8 -bottom-8 w-48 h-48 opacity-[0.05] -rotate-12" />
          </div>

          <div className="border-t-2 border-white/10 pt-8 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Trending Briefings</h4>
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer flex items-start gap-4">
                <span className="text-2xl font-black italic text-white/20 group-hover:text-[#eeff00] transition-colors leading-none">0{i}</span>
                <div className="space-y-1">
                  <h5 className="font-black italic uppercase text-sm group-hover:underline">Aerodynamic Efficiency in 2026 Regulations</h5>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">3.2k Readers // May 2026</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-20 p-12 bg-black/40 border-l-8 border-[#eeff00] relative overflow-hidden group">
        <div className="absolute inset-0 bg-[#eeff00]/5 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
        <div className="relative z-10 space-y-4">
          <h2 className="text-4xl font-black italic uppercase italic tracking-tighter">Missing a Briefing?</h2>
          <p className="text-gray-400 max-w-lg italic text-lg transition-colors group-hover:text-gray-200">
            Our archives are updated daily with terminal data from the global engineering network. Stay synchronized with the latest breakthroughs.
          </p>
          <a 
            href="https://medium.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-[#eeff00] font-black uppercase italic tracking-widest hover:translate-x-4 transition-all"
          >
            <span className="border-b-2 border-[#eeff00]">Explore Entire Archive</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        <Newspaper className="absolute right-0 bottom-0 w-64 h-64 text-white/5 -rotate-12 translate-x-1/4 translate-y-1/4 group-hover:text-[#eeff00]/10 transition-colors" />
      </div>
    </div>
  );
}
