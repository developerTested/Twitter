import React from 'react'
import { toast } from 'react-toastify';
import Input from './Input';
import Button from './Button';
import { FaEye, FaEyeSlash, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { signUp } from '@/redux/slices/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerBody, RegisterSchema } from '@/schema/authSchema';
import Spinner from '../Spinner';

export default function RegisterForm({ showLogo = false }: { showLogo?: boolean }) {

    const [passwordShow, setPasswordShow] = React.useState(false);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { user } = useAppSelector((state) => state.auth)

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    if (user) {
        navigate('/')
    }

    const { handleSubmit, register, formState: { errors } } = useForm<registerBody>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            user_name: "",
            display_name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit: SubmitHandler<registerBody> = async (data) => {

        setLoading(true);

        try {
            setError('');
            const response = await dispatch(signUp(data)).unwrap();
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
        <div className="size-full block">
            {showLogo ?
                <Link to="/" className='flex items-center justify-center mx-auto my-4'>
                    <FaTwitter className='w-14 h-14 text-blue-500' />
                </Link> : ''}

            {error ? <Alert message={error} variant="danger" /> : ''}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-4">
                    <div className="flex-auto flex flex-col gap-2">
                        <label htmlFor="user_name">User name</label>
                        <Input register={register} rules={{ required: true}} type="text" name="user_name" id='user_name' placeholder='User name' className={errors.user_name ? 'border-red-600' : ''} aria-invalid={errors.user_name ? "true" : "false"} />
                        {errors.user_name ? <p className='text-red-600 text-xs my-1'>
                            {errors.user_name.message}
                        </p> : ''}
                    </div>

                    <div className="flex-auto flex flex-col gap-2">
                        <label htmlFor="display_name">Display name</label>
                        <Input register={register} rules={{ required: true}}  type="text" name="display_name" id='display_name' placeholder='Enter display name' className={errors.display_name ? 'border-red-600' : ''} aria-invalid={errors.display_name ? "true" : "false"} />
                        {errors.display_name ? <p className='text-red-600 text-xs my-1'>
                            {errors.display_name.message}
                        </p> : ''}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <Input register={register} rules={{ required: true}}  type="email" name="email" id='email' placeholder='Email' className={errors.email ? 'border-red-600' : ''} aria-invalid={errors.email ? "true" : "false"} />
                    {errors.email ? <p className='text-red-600 text-xs my-1'>
                        {errors.email.message}
                    </p> : ''}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <div className="relative">
                        <Input register={register} rules={{ required: true}}  type={passwordShow ? 'text' : 'password'} name="password" id='password' placeholder='Password' className={errors.password ? 'border-red-600' : ''} aria-invalid={errors.password ? "true" : "false"} />

                        <div onClick={() => setPasswordShow(!passwordShow)} className="cursor-pointer absolute top-0 bottom-0 right-2 flex items-center justify-center">
                            {passwordShow ? <FaEye className='w-6 h-6' /> : <FaEyeSlash className='w-6 h-6' />}
                        </div>
                    </div>
                    {errors.password ? <p className='text-red-600 text-xs my-1'>
                        {errors.password.message}
                    </p> : ''}
                </div>

                <Button size="lg" disabled={loading} fullWidth>
                    {loading ? <Spinner /> : 'Register'}
                </Button>

                <p className='text-center my-4'>
                    Already have an account?
                    <Link to="/auth/login" className='mx-2'>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    )
}
