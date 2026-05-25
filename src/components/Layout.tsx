import { Outlet } from '@tanstack/react-router'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div id="content" className="text-center">
      <Header />
      <Sidebar />
      <main
        id="thumbs_place_holder"
        className="relative float-right min-h-screen"
        style={{ marginTop: '50px' }}
      >
        <Outlet />
      </main>
    </div>
  )
}
