import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './features/auth/context/auth.context.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SocketProvider } from './hooks/useSocket.jsx'
import { AuthInitializer } from './app/providers/AuthInitializer.jsx'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AuthInitializer>
            <SocketProvider>
                <App />
            </SocketProvider>
          </AuthInitializer>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
