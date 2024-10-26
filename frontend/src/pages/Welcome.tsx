
import { FaComment, FaTwitter, FaUsers } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';
import RegisterForm from '@/components/forms/RegisterForm';
import { Link } from 'react-router-dom';

export default function Welcome() {


  return (
    <div className='block w-full h-screen'>
      <div className="grid lg:grid-cols-2 size-full">
        <div className="hidden lg:flex items-center justify-center font-bold bg-blue-500 text-white relative">
          <FaTwitter className="size-full absolute inset-0 z-10 text-blue-600" />

          <div className="w-500 block space-y-8 z-100">
            <div className="flex items-center gap-4">
              <CiSearch className="w-10 h-10" />
              Follow your interests.
            </div>
            <div className="flex items-center gap-4">
              <FaUsers className="w-10 h-10" />
              Hear what people are talking about.
            </div>
            <div className="flex items-center gap-4">
              <FaComment className="w-10 h-10" />
              Join the conversation.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="container">
            <div className="w-full m-auto md:w-500 space-y-8">
              <h1 className="block text-4xl font-semibold">
                See what’s happening in the world right now
              </h1>
              <div className="flex items-center justify-between">

                <h3 className="font-semibold text-lg">
                  Join Twitter today.
                </h3>

                <Link to="/auth/login" className="px-4 py-1.5 text-center rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white">
                  Login
                </Link>
              </div>

              <div className="block">
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
