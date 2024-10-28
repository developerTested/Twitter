import * as React from 'react'
import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import Spinner from '@/components/Spinner';
import Alert from '@/components/Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaTwitter } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginType } from '@/types';
import { login } from '@/redux/slices/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginBody, LoginSchema } from '@/schema/authSchema';

export default function LoginPage() {
    const [passwordShow, setPasswordShow] = React.useState(false);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const { handleSubmit, register, formState: { errors } } = useForm<loginBody>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<loginType> = async (data) => {

        setLoading(true);

        try {
            setError('');
            const response = await dispatch(login(data)).unwrap();
            toast.success(response ? response.message : 'Welcome Back!');
            navigate('/');
        } catch (error: any) {
            const errorMessage = Array.isArray(error?.errors) && error?.errors?.length ? error.errors : error.message;
            setLoading(false);
            setError(errorMessage);
            toast.error(errorMessage);
        }

    }

    return (
        <div className='relative flex items-center justify-center w-full h-screen'>

            <div className="m-auto relative w-full px-4 lg:px-0 lg:max-w-lg">
                <Link to="/" className='flex items-center justify-center mx-auto my-4'>
                    <FaTwitter className='w-14 h-14 text-blue-500' />
                </Link>

                {error ? <Alert message={error} variant="danger" /> : ''}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative p-4 rounded-lg">
                    <div className="block space-y-2">
                        <label htmlFor="email">Email</label>
                        <Input disabled={loading} register={register} type="email" name="email" id='email' placeholder='Email' className={`${errors.email ? 'border-red-600' : ''} w-full px-4 py-2 outline-none border`} />
                        {errors.email ? <p className='text-red-600 text-xs my-1'>
                            {errors.email.message}
                        </p> : ''}
                    </div>
                    <div className="block space-y-2">
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <Input disabled={loading} register={register} type={passwordShow ? 'text' : 'password'} name="password" id='password' placeholder='Password' className={`${errors.password ? 'border-red-600' : ''} w-full px-4 py-2 outline-none border`} />

                            <div onClick={() => setPasswordShow(!passwordShow)} className="cursor-pointer absolute top-0 bottom-0 right-2 flex items-center justify-center">
                                {passwordShow ? <FaEye className='w-6 h-6' /> : <FaEyeSlash className='w-6 h-6' />}
                            </div>
                        </div>
                        {errors.password ? <p className='text-red-600 text-xs my-1'>
                            {errors.password.message}
                        </p> : ''}
                    </div>

                    <div className="w-full flex items-center justify-between">

                        <label htmlFor="remember" className="">
                            <input type="checkbox" name="remember" id="remember" className='mx-2' />
                            Remember me
                        </label>

                        <div className="block">
                            <Link to="/resetPassword">
                                Forgot password?
                            </Link>
                        </div>

                    </div>
                    <Button size="lg" disabled={loading} fullWidth>
                        {loading ? <Spinner /> : 'Login'}
                    </Button>
                </form>

                <p className='text-center my-4'>
                    Don't have an account?
                    <Link to="/auth/register" className='mx-2'>
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
