import { useAppSelector } from "@/hooks";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function GuestLayout() {

    const { loggedIn } = useAppSelector(state => state.auth)
    const navigate = useNavigate();

    useEffect(() => {

        if (loggedIn) {
            navigate("/")
        }

    }, [loggedIn])

    return (
        <div className="flex items-center justify-center w-full h-screen bg-main dark:bg-midnight dark:text-slate-200">
            <Outlet />
        </div>
    )
}
