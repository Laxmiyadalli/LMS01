import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, ChevronRight, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8"
      >
        <Card className="bg-[#15151e] border-2 border-white/5 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)] rounded-none overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#eeff00]" />
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#eeff00]/5 rounded-full blur-3xl" />
          
          <CardHeader className="space-y-1 pt-10 pb-6 px-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-black border border-[#eeff00]/30 transform rotate-45">
                <ShieldCheck className="w-8 h-8 text-[#eeff00] -rotate-45" />
              </div>
            </div>
            <CardTitle className="text-4xl font-black italic uppercase tracking-tighter text-white">
              ACCESS <span className="text-[#eeff00]">TERMINAL</span>
            </CardTitle>
            <CardDescription className="text-gray-400 font-bold italic uppercase tracking-widest text-[10px]">
              Identify yourself to enter the grid
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-10 pb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Email Protocol</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#eeff00] transition-colors" />
                    <Input 
                      type="email" 
                      placeholder="USER@SECTOR.COM" 
                      className="bg-black/40 border-white/10 rounded-none h-12 pl-10 focus:border-[#eeff00] focus:ring-0 text-white font-mono placeholder:text-gray-700"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Encrypted Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#eeff00] transition-colors" />
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-black/40 border-white/10 rounded-none h-12 pl-10 focus:border-[#eeff00] focus:ring-0 text-white font-mono placeholder:text-gray-700"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <button type="button" className="text-[#eeff00] hover:text-white transition-colors italic">Forgot Protocol?</button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#eeff00] text-black hover:bg-white h-12 rounded-none font-black uppercase italic tracking-widest text-sm shadow-[4px_4px_0px_0px_white] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                Establish Connection <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                New Recruit? {' '}
                <Link to="/register" className="text-[#eeff00] hover:underline">Register your sequence</Link>
              </p>
            </div>
          </CardContent>
          
          <div className="bg-black/60 py-3 px-10 flex justify-between items-center border-t border-white/5">
            <div className="flex space-x-1">
              <Zap className="w-3 h-3 text-[#eeff00] fill-current" />
              <span className="text-[8px] font-mono text-gray-500">ENCRYPTION: AES-256</span>
            </div>
            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Sector Active</span>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
