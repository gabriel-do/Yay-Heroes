import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css';
import AppLayout from './components/layout/layout';
const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      < AppLayout />
    </QueryClientProvider>
  )
};

export default App;