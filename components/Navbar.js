import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Navbar = () => {
    const { data: session } = useSession()
    return (
        <div className='w-full h-12 bg-gray-400 grid grid-cols-3'>
            <div className='mx-auto mt-3'>
                <Link href="/">
                    Logo
                </Link>
            </div>
            <div className='mx-auto mt-3'>
                Banner
            </div>
            <div className=' font-sm mx-auto mt-3 flex gap-3'>
                <Link href="/">
                    <p className='text-black hover:text-blue-700 cursor-pointer'>Home</p>
                </Link>
                {/* WIP - change login button upon signed in */}
                <Link href="/login">
                    <p className='text-black hover:text-blue-700 cursor-pointer'>{
                        session ? <>{session.user.name}</> : <>login</>
                    }</p>
                </Link>
                <Link href="/input">
                    <p className='text-black hover:text-blue-700 cursor-pointer'>Input</p>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;