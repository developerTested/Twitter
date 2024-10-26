import Header from "@/components/Header";
import { useAppSelector } from "@/hooks";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  
  const { loggedIn } = useAppSelector(state => state.auth)

  return (
    <div className="w-full min-h-screen dark:bg-midnight dark:text-slate-200">
      {loggedIn ? <Header /> : ''}
      <main className="block m-auto">
        <Outlet />
      </main>
    </div>
  )
}
