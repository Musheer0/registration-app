import { TRPCReactProvider } from '@/trpc/client';
import React from 'react';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </div>
      <Toaster/>
    </TRPCReactProvider>
  )
};

export default Layout;