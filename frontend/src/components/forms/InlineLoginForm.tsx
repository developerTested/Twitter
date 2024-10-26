import * as React from 'react'
import { toast } from 'react-toastify';
import Input from './Input';
import Button from './Button';
import { useAuth } from '@/contexts/AuthProvider';

export default function InlineLoginForm() {

    const { setLoggedIn } = useAuth();
    const [loading, setLoading] = React.useState(false);

    const emailRef = React.useRef<HTMLInputElement>(null);

    const passwordRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.promise(
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true);
                }, 3000);
            }),
            {
                pending: {
                    render() {
                        setLoading(true);
                        return 'Promise is pending'
                    }
                },
                success: {
                    render() {
                        setLoading(false);
                        setLoggedIn(true);
                        return 'Promise resolved 👌'
                    }
                },
                error: 'Promise rejected 🤯'
            }
        );

        setLoading(false);

    }

    return (
        <div className='relative block group'>
            <form onSubmit={handleSubmit} className='w-full flex items-center rounded-full shadow group-focus-within:shadow-lg'>
                <Input ref={emailRef} type="email" name="email" id='email' placeholder='Email' className='w-full px-4 py-2 outline-none border' />
                <Input ref={passwordRef} type="password" name="password" id='password' placeholder='Password' className='w-full px-4 py-2 outline-none border' />
    
                <Button type='submit' disabled={loading} className='disabled:cursor-not-allowed rounded-md flex items-center justify-center uppercase bg-pink-600 hover:bg-pink-700 text-white px-4 py-2'>
                    Login
                </Button>
            </form>
        </div>
    )
}
