import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/redux/slices/actions/auth";
import { FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@/components/forms/Button";

export default function LogoutPage() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loggedIn } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (!loggedIn) {
            navigate('/auth/login');
        }
    }, [loggedIn])

    const handleLogout = async () => {
        try {

            await dispatch(logout()).unwrap()

            toast.success("You've been logout successfully")

            navigate('/')
        } catch (e: any) {
            toast.error(e.message)
        }
    }

    return (
        <div className="flex items-center justify-center w-full h-screen bg-slate-200 dark:bg-midnight dark:text-slate-200">
            <div className="m-auto p-4 w-500 flex flex-col items-center gap-4 text-center bg-white dark:bg-widget border dark:border-black rounded-2xl shadow-lg">
                <FaTwitter className="w-14 h-14 text-blue-500" />
                <h1 className="text-4xl font-bold">Log out of Twitter?</h1>
                <h3 className="font-semibold">
                    You can always log back in at any time.
                </h3>

                <div className="w-full gap-4 flex items-center justify-evenly mt-4">
                    <Link to="/" className="block w-full px-4 py-3 text-center border bg-slate-100 dark:bg-widget rounded-full">
                        Cancel
                    </Link>
                    <Button onClick={handleLogout} size="lg" fullWidth>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}
