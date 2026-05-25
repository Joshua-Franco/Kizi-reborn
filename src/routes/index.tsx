import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import Layout from '../components/Layout'
import HomePage from '../pages/HomePage'

const rootRoute = createRootRoute({
  component: Layout,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const routeTree = rootRoute.addChildren([homeRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
