import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router, RootRoute, Route, Router as TanstackRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterContext } from './router'
import __root from './routes/__root'
import './styles.css'

const queryClient = new QueryClient()

const rootRoute = new RootRoute({
  component: __root,
})

// Import all route components
import IndexComponent from './routes/index'
import LoginComponent from './routes/login'
import SignupComponent from './routes/signup'
import DashboardComponent from './routes/dashboard'
import ProfileComponent from './routes/profile'
import SettingsComponent from './routes/settings'

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexComponent,
})

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginComponent,
})

const signupRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignupComponent,
})

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardComponent,
})

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfileComponent,
})

const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: SettingsComponent,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  dashboardRoute,
  profileRoute,
  settingsRoute,
])

const router = new TanstackRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterContext.Provider value={router}>
        <router.Provider>
          <router.RootRoute.component />
        </router.Provider>
      </RouterContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
