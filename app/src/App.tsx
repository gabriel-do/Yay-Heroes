import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css';
import AppLayout from './components/layout/layout';
const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        < AppLayout />
      </QueryClientProvider>
    </div>
  )
};

export default App;