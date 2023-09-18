import React from "react";
import TunyceLogo from "../assets/tunyce_logo.svg";
import { GoHomeFill } from "react-icons/go";
import { FaCompass } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { TbHeadphonesFilled } from "react-icons/tb";
import { MdFavorite } from "react-icons/md";
import { FaShareAlt, FaDeezer } from "react-icons/fa";
import { ImFolderDownload } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { BsPeopleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { AiFillWallet } from "react-icons/ai";

type NavElProps = {
    name: string;
    children: React.ReactNode;
    path?: string;
};
function NavElement({ name, path, children }: NavElProps) {
    return (
        <NavLink
            to={path ?? "/musif"}
            style={({ isActive }) => {
                return {
                    backgroundColor: isActive ? "#F0F0F5" : "white",
                    borderRightColor: isActive ? "#FB5857" : "white",
                    borderRightWidth: isActive ? 4 : 0,
                };
            }}
            className="flex  py-2 px-3  flex-row items-center w-full mt-2"
        >
            {children}
            <div className="w-6" />
            <p className="text-lg">{name}</p>
        </NavLink>
    );
}
function SmallNavElement({ name, children }: NavElProps) {
    return (
        <div className="flex flex-col justify-center items-center mt-3">
            {children}
            <p className="text-xs">{name}</p>
        </div>
    );
}
function Sidebar({ sideBarOpen }: { sideBarOpen: boolean }) {
    return (
        <div className="w-full">
            {sideBarOpen ? (
                <div className="flex flex-col w-full justify-center items-center ">
                    <img alt="tunyce logo" className="w-32 h-auto" src={TunyceLogo} />
                    <div className="w-full">
                        <h2 className="text-lg font-medium ml-3 mt-3">MENU</h2>
                        <ul className="w-full">
                            <NavElement path="/" name="Discover">
                                <GoHomeFill className="text-xl" />
                            </NavElement>
                            <NavElement path="/creators" name="Creators">
                                <BsPeopleFill className="text-xl" />
                            </NavElement>
                            <NavElement path="explore" name="Explorer">
                                <FaCompass className="text-xl" />
                            </NavElement>
                            <NavElement path="/search" name="Search">
                                <FiSearch className="text-xl" />
                            </NavElement>
                        </ul>
                        <h2 className="text-lg font-medium ml-3 mt-3">LIBRARY</h2>
                        <ul>
                            <NavElement path="music" name="Music">
                                <BsMusicNoteBeamed className="text-xl" />
                            </NavElement>
                            <NavElement path="mixes" name="Mixes">
                                <FaDeezer className="text-xl" />
                            </NavElement>
                            <NavElement name="Artists">
                                <BsFillPersonFill className="text-xl" />
                            </NavElement>
                        </ul>
                        <h2 className="text-lg font-medium ml-3 mt-3">PLAYLISTS</h2>
                        <ul>
                            <NavElement name="Cover">
                                <TbHeadphonesFilled className="text-xl" />
                            </NavElement>
                            <NavElement name="Favorites">
                                <MdFavorite className="text-xl" />
                            </NavElement>
                            <NavElement name="Shared">
                                <FaShareAlt className="text-xl" />
                            </NavElement>
                            <NavElement name="Downloads">
                                <ImFolderDownload className="text-xl" />
                            </NavElement>
                        </ul>
                        <h2 className="text-lg font-medium ml-3 mt-3">OTHER</h2>
                        <ul>
                            <NavElement path="user-wallet" name="Wallet">
                                <AiFillWallet className="text-xl" />
                            </NavElement>
                            <NavElement name="Settings">
                                <IoSettingsSharp className="text-xl" />
                            </NavElement>
                            <NavElement name="Logout">
                                <TbLogout className="text-xl" />
                            </NavElement>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <ul>
                        <SmallNavElement name="Discover">
                            <GoHomeFill className="text-3xl" />
                        </SmallNavElement>
                        <SmallNavElement name="Explorer">
                            <FaCompass className="text-3xl" />
                        </SmallNavElement>
                        <SmallNavElement name="Search">
                            <FiSearch className="text-3xl" />
                        </SmallNavElement>
                        <SmallNavElement name="Music">
                            <BsMusicNoteBeamed className="text-3xl" />
                        </SmallNavElement>
                        <SmallNavElement name="Artists">
                            <BsFillPersonFill className="text-3xl" />
                        </SmallNavElement>
                        <SmallNavElement name="Favorites">
                            <MdFavorite className="text-3xl" />
                        </SmallNavElement>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
