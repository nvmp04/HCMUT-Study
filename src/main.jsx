import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './features/auth/context/auth.context.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthInitializer } from './app/init/AuthInitializer.jsx'
import { SocketProvider } from './features/websocket/context/websocket.context.jsx'
import { SocketInitializer } from './app/init/SocketInitializer.jsx'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SocketProvider>
            <AuthInitializer/>
            <SocketInitializer/>
              <App />
          </SocketProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
