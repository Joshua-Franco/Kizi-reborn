import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import Layout from '../components/Layout/Layout'
import HomePage from '../pages/HomePage/HomePage'
import Play from '../pages/Play/Play'

const rootRoute = createRootRoute({
  component: Layout,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

export const gameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/games/$slug',
  component: Play,
})

const routeTree = rootRoute.addChildren([homeRoute, gameRoute])

export const router = createRouter({ routeTree, basepath: '/Kizi-reborn' })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
