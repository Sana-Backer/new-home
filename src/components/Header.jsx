import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/state'

const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [dropdownmenu, setDropdownmenu] = useState(false);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setMenuOpened(!menuOpened);
    };
    const handleLogout = () => { dispatch(setLogout()); };

    return (
        <header className='max-padd-container flexBetween rounded-xl py-4 '>
            {/* logo */}
            <Link to={'/'} className='bold-24'>
                <div>
                    Lease<span className='text-secondary'>lodge</span>
                </div>
            </Link>
            {/* searchbar */}
            <div className='bg-white ring-1 ring-slate-900/5 rounded-full p-2 px-4 w-44 sm:w-96 flexBetween gap-x-2 relative'>
                <input type="text" placeholder='Search here' className='outline-none border-none w-full bg-white' />
                <button className='absolute right-0 h-full w-10 rounded-full bg-secondary text-white flexCenter cursor-pointer'>
                    <FaSearch />
                </button>
            </div>
            {/* dropdown */}
            <div className='flexBetween gap-x-10'>
                <div onClick={()=> setDropdownmenu(!dropdownmenu)} className='cursor-pointer relative'>
                <div>
    {(!user || !user.profileImgPath) ? (
        <FaUser />
    ) : (
        <img
            src={`http://localhost:3000/${user.profileImgPath.replace(/^uploads\//, '')}`}
            alt="User Profile"
            height={47}
            width={47}
            className="rounded-full aspect-square object-cover"
        />
    )}
</div>

                    {dropdownmenu && !user && (
                        <div className='absolute top-16 right-0 w-40 p-4 rounded-3xl bg-white text-gray-30 medium-14 flex flex-col gap-y-2 shadow-sm z-50 '>
                            <Link to={'/login'}>Login</Link>
                            <Link to={'/register'}>Sign Up</Link>
                        </div>
                    )}
                    {dropdownmenu && user && (
                        <div  className='absolute top-16 right-0 w-40 p-4 rounded-3xl bg-white text-gray-30 medium-14 flex flex-col gap-y-2 shadow-sm z-50 '>
                            <Link to={"/create-listing"}>Add a Property</Link>
                            <Link to={`${user._id}/trips`}>Trip List</Link>
                            <Link to={`${user._id}/wishlist`}>Wish List</Link>
                            <Link to={`${user._id}/listing`}>Property List</Link>
                            <Link to={`${user._id}/reservation`}>Reservation List</Link>
                            <Link to={'/login'} onClick={handleLogout}>LogOut</Link>
                        </div>
                    )}
               </div>
                </div>
            
        
        </header>
    );
};

export default Header;
