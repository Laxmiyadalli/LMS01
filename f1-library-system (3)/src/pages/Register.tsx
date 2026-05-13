import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Lock, UserPlus, ChevronRight, Hash, Briefcase, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    age: '',
    department: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration attempt:', formData);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full space-y-8"
      >
        <Card className="bg-[#15151e] border-2 border-white/5 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)] rounded-none overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#eeff00]" />
          
          <CardHeader className="space-y-1 pt-10 pb-6 px-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-black border border-white/10 transform -skew-x-12">
                <UserPlus className="w-8 h-8 text-[#eeff00] skew-x-12" />
              </div>
            </div>
            <CardTitle className="text-4xl font-black italic uppercase tracking-tighter text-white">
              NEW <span className="text-[#eeff00]">RECRUIT</span>
            </CardTitle>
            <CardDescription className="text-gray-400 font-bold italic uppercase tracking-widest text-[10px]">
              Initialize your profile in the central network
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-10 pb-10">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Terminal Handle</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#eeff00] transition-colors" />
                    <Input 
                      placeholder="USERNAME" 
                      className="bg-black/40 border-white/10 rounded-none h-12 pl-10 focus:border-[#eeff00] focus:ring-0 text-white font-mono placeholder:text-gray-700"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Communication Channel</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#eeff00] transition-colors" />
                    <Input 
                      type="email" 
                      placeholder="EMAIL@NETWORK.COM" 
                      className="bg-black/40 border-white/10 rounded-none h-12 pl-10 focus:border-[#eeff00] focus:ring-0 text-white font-mono placeholder:text-gray-700"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Secure Protocol</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#eeff00] transition-colors" />
                    <Input 
                      type="password" 
                      placeholder="PASSWORD" 
                      className="bg-black/40 border-white/10 rounded-none h-12 pl-10 focus:border-[#eeff00] focus:ring-0 text-white font-mono placeholder:text-gray-700"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Assignment Role</label>
                  <Select onValueChange={(value) => setFormData({...formData, role: value})}>
                    <SelectTrigger className="bg-black/40 border-white/10 rounded-none h-12 focus:border-[#eeff00] focus:ring-0 text-white font-mono">
                      <SelectValue placeholder="SELECT ROLE" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10 text-white">
                      <SelectItem value="student">STUDENT</SelectItem>
                      <SelectItem value="employee">EMPLOYEE</SelectItem>
                      <SelectItem value="admin">ADMIN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Age Cycles</label>
                    <div className="relative group">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#eeff00] transition-colors" />
                      <Input 
                        type="number" 
                        placeholder="24" 
                        className="bg-black/40 border-white/10 rounded-none h-12 pl-10 focus:border-[#eeff00] focus:ring-0 text-white font-mono placeholder:text-gray-700"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Designation</label>
                    <div className="relative group">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#eeff00] transition-colors" />
                      <Input 
                        placeholder="DEPT / COURSE" 
                        className="bg-black/40 border-white/10 rounded-none h-12 pl-10 focus:border-[#eeff00] focus:ring-0 text-white font-mono placeholder:text-gray-700"
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                   <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-[#eeff00]/60">
                      <GraduationCap className="w-3 h-3" />
                      <span>Academic & Professional validation required</span>
                   </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <Button 
                  type="submit" 
                  className="w-full bg-[#eeff00] text-black hover:bg-white h-12 rounded-none font-black uppercase italic tracking-widest text-sm shadow-[4px_4px_0px_0px_white] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  Confirm Registration Sequence <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                Already Authenticated? {' '}
                <Link to="/login" className="text-[#eeff00] hover:underline">Return to login terminal</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
