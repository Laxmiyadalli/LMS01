import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Zap, BookOpen, Shield, Briefcase, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 text-center relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#eeff00]/5 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-8 max-w-4xl px-4"
      >
        <div className="relative inline-block">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-48 h-48 mx-auto mb-8 rounded-full border-4 border-[#eeff00] p-1 overflow-hidden bg-black shadow-[0_0_50px_rgba(238,255,0,0.2)]"
          >
            <img 
              src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&q=80&w=400" 
              alt="AI Librarian"
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-[#eeff00] text-black px-4 py-1 font-black italic uppercase text-sm skew-x-[-12deg]">
              HI!
            </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-[#eeff00]">
            <Zap className="w-6 h-6 fill-current" />
            <span className="uppercase tracking-[0.4em] font-black italic text-sm">Welcome to the Grid</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black italic uppercase leading-[0.8] tracking-tighter">
            RACING <br />
            <span className="text-[#eeff00]">LIBRARY</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mt-6 font-medium">
            Full-throttle academic performance. Access the most advanced engineering, medical, and financial records in the sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <PortalCard 
            to="/student" 
            title="Student" 
            description="Browse the catalog and borrow resources."
            icon={<BookOpen className="w-8 h-8" />}
            delay={0.5}
          />
          <PortalCard 
            to="/employee" 
            title="Employee" 
            description="Manage inventory and book specifications."
            icon={<Briefcase className="w-8 h-8" />}
            delay={0.6}
          />
          <PortalCard 
            to="/admin" 
            title="Admin" 
            description="System configuration and security."
            icon={<Shield className="w-8 h-8" />}
            delay={0.7}
          />
        </div>
      </motion.div>
    </div>
  );
}

function PortalCard({ to, title, description, icon, delay }: { to: string, title: string, description: string, icon: React.ReactNode, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Link to={to} className="group block h-full">
        <div className="bg-[#1f1f27] border border-white/5 p-8 rounded-none h-full transition-all hover:border-[#eeff00] hover:bg-white/5 flex flex-col text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            {icon}
          </div>
          <div className="text-[#eeff00] mb-4 transform group-hover:scale-110 transition-transform origin-left">
            {icon}
          </div>
          <h3 className="text-2xl font-black italic uppercase mb-2 tracking-tight">{title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
            {description}
          </p>
          <div className="mt-auto flex items-center text-[#eeff00] font-black uppercase italic text-xs tracking-widest gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Enter Portal <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
