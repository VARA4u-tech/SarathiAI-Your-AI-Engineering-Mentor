import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styles.css'
import { Nav } from '@/components/site/Nav'
import { Hero } from '@/components/site/Hero'
import { Marquee } from '@/components/site/Marquee'
import { Services } from '@/components/site/Services'
import { Work } from '@/components/site/Work'
import { Process } from '@/components/site/Process'
import { FaqSection } from '@/components/site/FaqSection'
import { Footer } from '@/components/site/Contact'
import { SmoothScroll } from '@/components/site/SmoothScroll'
import { ScrollProgress } from '@/components/site/ScrollProgress'
import { Toaster } from 'sonner'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black">
      <SmoothScroll>
        <ScrollProgress />
        <Nav />
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Process />
        <FaqSection />
        <Footer />
        <Toaster />
      </SmoothScroll>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
