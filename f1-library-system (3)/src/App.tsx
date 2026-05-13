import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Book as BookIcon, User, Shield, Briefcase, Zap, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import StudentPortal from './pages/StudentPortal';
import EmployeePortal from './pages/EmployeePortal';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#15151e] text-white font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-10"
          alt="Library background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#15151e] via-transparent to-[#15151e]" />
      </div>

      <nav className="border-b border-white/10 bg-[#15151e]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-[#eeff00] p-2 rounded-sm transform group-hover:skew-x-[-12deg] transition-transform">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase italic">
                Racing <span className="text-[#eeff00]">Library</span>
              </span>
            </Link>
            
            <div className="flex space-x-1 sm:space-x-4">
              <NavLink to="/student" icon={<User className="w-4 h-4" />} label="Student" active={location.pathname === '/student'} />
              <NavLink to="/employee" icon={<Briefcase className="w-4 h-4" />} label="Employee" active={location.pathname === '/employee'} />
              <NavLink to="/blogs" icon={<Newspaper className="w-4 h-4" />} label="Blog" active={location.pathname === '/blogs'} />
              <NavLink to="/admin" icon={<Shield className="w-4 h-4" />} label="Admin" active={location.pathname === '/admin'} />
            </div>

            <div className="flex items-center space-x-4 border-l border-white/10 pl-6 h-10">
              <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#eeff00] transition-colors">Login</Link>
              <Link to="/register" className="group">
                <div className="bg-[#eeff00] text-black px-4 py-1.5 text-[10px] font-black uppercase tracking-widest skew-x-[-15deg] group-hover:bg-white transition-colors">
                  <div className="skew-x-[15deg]">Join Grid</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-1 bg-[#eeff00] w-full" />
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/student" element={<StudentPortal />} />
              <Route path="/employee" element={<EmployeePortal />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={
                <div className="flex flex-col items-center justify-center py-20 text-center">
                   <Shield className="w-20 h-20 text-[#eeff00] mb-6" />
                   <h1 className="text-4xl font-black italic uppercase mb-4">Admin Dashboard</h1>
                   <p className="text-gray-400 max-w-md">System wide configuration and user management coming soon in Phase 2.</p>
                   <Link to="/employee" className="mt-8 bg-[#eeff00] text-black px-8 py-3 rounded-md font-bold uppercase tracking-wider hover:bg-yellow-400 transition-colors">
                     Manage Books Instead
                   </Link>
                </div>
              } />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      
      <footer className="relative z-10 border-t border-white/10 mt-20 py-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm tracking-widest uppercase">
            © 2026 F1 Library System • Built for Speed and Knowledge
          </p>
        </div>
      </footer>
      
      <Toaster theme="dark" position="top-right" />
    </div>
  );
}

function NavLink({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className="relative group block no-underline"
    >
      <div className={`
        relative flex items-center space-x-3 px-6 py-3 
        font-black uppercase italic tracking-[0.15em] text-[10px] sm:text-xs
        transition-all duration-500 transform skew-x-[-15deg]
        border-l-4 border-r-2 border-y-2
        ${active 
          ? 'bg-[#eeff00] border-[#eeff00] text-black shadow-[6px_6px_0px_0px_white]' 
          : 'bg-black/40 border-white/10 text-gray-400 hover:text-white hover:border-[#eeff00]/50 hover:bg-black/60 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]'
        }
      `}>
        {/* Pattern Background for Active */}
        {active && (
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
        )}

        <div className="skew-x-[15deg] flex items-center space-x-3 relative z-10">
          <div className={`p-1.5 rounded-none border ${active ? 'border-black bg-black/10' : 'border-white/10 bg-white/5'}`}>
            {icon}
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] opacity-60 leading-none mb-1 tracking-[0.3em]">Sector 0{to === '/' ? '0' : to === '/student' ? '1' : to === '/employee' ? '2' : '3'}</span>
            <span className="leading-none">{label}</span>
          </div>
        </div>

        {/* Sector Indicator Square */}
        <div className={`
          absolute -top-1 -right-1 w-2 h-2 
          ${active ? 'bg-black animate-pulse' : 'bg-white/20'}
          transition-colors
        `} />
      </div>

      {active && (
        <>
          <motion.div 
            layoutId="nav-glow"
            className="absolute -inset-2 bg-[#eeff00]/15 blur-2xl -z-10 skew-x-[-15deg] pointer-events-none"
          />
          <div className="absolute -bottom-2 right-0 w-1/2 h-0.5 bg-[#eeff00] skew-x-[-15deg]" />
        </>
      )}
    </Link>
  );
}
