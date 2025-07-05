import { Link, NavLink } from 'react-router'
import logoIcon from '../assets/images/book.png'
import { FaChartBar } from "react-icons/fa6";
import { useState } from 'react';


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    return (
        <nav id='navbar' className='h-[80px] flex items-center border-b'>
            <div className='container mx-auto flex items-center justify-between px-5'>
                {/* logo  */}
                <div className='w-[35%]'>
                    <Link to='/'>
                        <div className='flex items-center gap-1'>
                            <img className='w-7 lg:w-10' src={logoIcon} alt="book logo icon" />
                            <h3 className='font-bold text-2xl lg:w-3xl'>BoiDokan</h3>
                        </div>
                    </Link>
                </div>

                {/* menu */}
                <div id="menu">
                    <ul className='items-center gap-4 font-bold hidden md:flex'>
                    <NavLink to='/'>All Books</NavLink>
                    <NavLink to='/create-book'>Add Book</NavLink>
                    <NavLink to='/borrow-summary'>Borrow Summary</NavLink>
                </ul>
                </div>

                {/* mobile menu  */}
                <div className='relative'>
                    <FaChartBar onClick={() => {
                        setIsMobileMenuOpen(!isMobileMenuOpen)
                    }} className='text-xl cursor-pointer' />
                    <ul className={`flex-col gap-2 bg-secondary border rounded-md absolute top-full right-0 w-[180px] ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
                        <NavLink className='px-3 mt-3' to='/'>All Books</NavLink>
                        <NavLink className='px-3' to='/create-book'>Add Book</NavLink>
                        <NavLink className='px-3 mb-3' to='/borrow-summary'>Borrow Summary</NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
