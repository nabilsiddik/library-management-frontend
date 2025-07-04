import { Link, NavLink } from 'react-router'
import logoIcon from '../assets/images/book.png'

const Navbar = () => {
    return (
        <nav id='navbar' className='h-[80px] flex items-center border-b'>
            <div className='container mx-auto flex items-center justify-between px-5'>
                {/* logo  */}
                <Link to='/'>
                    <div className='flex items-center gap-1'>
                        <img className='w-10' src={logoIcon} alt="book logo icon" />
                        <h3 className='font-bold text-3xl'>BoiDokan</h3>
                    </div>
                </Link>

                {/* menu */}
                <ul className='flex items-center gap-4 font-bold'>
                    <NavLink to='/'>All Books</NavLink>
                    <NavLink to='/create-book'>Add Book</NavLink>
                    <NavLink to='/borrow-summary'>Borrow Summary</NavLink>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
