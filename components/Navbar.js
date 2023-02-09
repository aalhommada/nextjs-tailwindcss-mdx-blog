import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className='w-full mx-auto bg-gray-100 flex justify-around font-medLarg items-center top-0 h-11'>
            <Link href={'/'} className="text-gray-900  text-lg">Home</Link>
            <Link href={'/blog'} className="text-gray-900  text-lg">Blog</Link>
        </nav>
    )
}