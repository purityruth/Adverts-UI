import { NavLink, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa6";
import { BsChevronDown } from "react-icons/bs";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import TunycLogo from '../assets/tunyce_logo.png';
import { AiOutlineMenu } from "react-icons/ai";
const ListItem = ({ text, currPath, path }: { text: string, currPath: string, path: string }) => (
    <NavLink style={({ isActive }) => { return { color: isActive ? '#FB5857' : '#4D4D56' } }} to={path} className='mx-[5px] md:mx-2'>
        <p className={``}>{text}</p>
        {path === currPath && (<p className="border-b-4 rounded-lg border-text-primary w-4 mx-auto text-center"></p>)}
    </NavLink>
);
interface IHeaderProp {
    sideBarOpen: boolean
    setSideBarOpen: () => void
}
function Header({ setSideBarOpen, sideBarOpen }: IHeaderProp) {
    const location = useLocation().pathname;
    console.log(location)
    return (
        <header className="w-full  flex items-center justify-between">
            <div className="flex items-center">
                <AiOutlineMenu onClick={setSideBarOpen} className="text-2xl text-black" />
                <img src={TunycLogo} alt="" className={`w-10  h-auto ${sideBarOpen ? 'hidden' : 'block'} mx-2 rounded-full object-contain`} />
            </div>
            <ul className='list-none hidden md:flex items-center'>
                <ListItem text='Music' currPath={location} path="/music" />
                <ListItem text='Podcast' currPath={location} path="/podcasts" />
                <ListItem text='Live' currPath={location} path="/live" />
            </ul>
            <div className="hidden md:flex items-center justify-between rounded-2xl px-2 py-1 w-1/3  bg-gray-200">
                <input type="text" placeholder="Search" className="border-2 bg-inherit rounded-lg px-2 py-0 outline-none" />
                <FiSearch className="text-2xl text-black mx-2" />
            </div>
            <div className="hidden md:flex items-center h-full cursor-pointer justify-between">
                <div className="flex items-center mr-8">
                    <PiShoppingCartSimpleBold className="text-2xl text-text-primary mx-2" />
                    <div className="relative mx-2">
                        <FaRegBell className="text-2xl text-text-primary" />
                        <div className="absolute -top-0 -right-0 w-1 h-1 rounded-full bg-red-500"></div>
                    </div>
                </div>
                <div className="flex h-full mx-2 items-center">
                    <img src="https://picsum.photos/200/300" alt="" className="w-10 h-10 rounded-full object-cover" />
                    <h3 className="text-md mx-2 font-bold">John Doe</h3>
                    <BsChevronDown className="text-xl mx-2 text-black" />
                </div>
            </div>
            <div className="flex items-center md:hidden">
                <FiSearch className="text-xl text-black " />
                <img src="https://picsum.photos/200/300" alt="" className="w-7 ml-3 h-7 rounded-full object-cover" />
            </div>
            <div className="hidden absolute top-14 left-16 items-center justify-between rounded-2xl px-4 py-1 h-8 w-2/3 bg-gray-200">
                <input type="text" placeholder="Search" className="border-2 w-4/5 bg-inherit rounded-lg px-2 h-full outline-none" />
                <FiSearch className="text-xl text-black w-1/5" />
            </div>
        </header>
    )
}

export default Header