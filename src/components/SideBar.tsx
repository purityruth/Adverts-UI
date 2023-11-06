import React, { ReactNode, useState } from 'react';
import { FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import TunycLogo from '../assets/tunyce_logo.png';
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import './Sidebar.css'

interface SidebarRoute {
    path: string;
    name: string;
    icon: React.ReactNode;
}

interface SideBarProps {
    children: ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    // const inputAnimation = {
    //     hidden: {
    //         width: 0,
    //         padding: 0,
    //         transition: {
    //             duration: 0.2,
    //         },
    //     },
    //     show: {
    //         width: "140px",
    //         padding: "5px 15px",
    //         transition: {
    //             duration: 0.2,
    //         },
    //     },
    // };

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            opacity: 1,
            width: "auto",
            transition: {
                duration: 0.5,
            },
        },
    };

    const routes: SidebarRoute[] = [
        {
            path: "/admin-dashboard",
            name: "Dashboard",
            icon: <MdDashboard />,
        },
        {
            path: "/advert-report",
            name: "Advert Report",
            icon: <MdDashboard />,
        },
        {
            path: "/advert-dashboard",
            name: "Adverts",
            icon: <MdDashboard />,
        },
    ];

    console.log('routes', routes)
    return (
        <>
            <div className="main-container">
                <motion.div
                    animate={{
                        width: isOpen ? "200px" : "45px",
                        transition: {
                            duration: 0.5,
                            type: "spring",
                            damping: 10,
                        },
                    }}
                    className={`sidebar `}
                >
                    <div className="top_section">
                        <AnimatePresence>
                            {isOpen && (
                                <motion.h1
                                    variants={showAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="logo"
                                >
                                    <div className='logo w-20'>
                                        <img src={TunycLogo} alt="" className='w-10' />
                                    </div>

                                </motion.h1>
                            )}
                        </AnimatePresence>

                        <div className="bars">
                            <FaBars onClick={toggle} />
                        </div>
                    </div>
                    <section className="routes">
                        {routes.map((route, index) => (
                            <SidebarMenu
                                setIsOpen={setIsOpen}
                                showAnimation={showAnimation}
                                isOpen={isOpen}
                                key={index} 
                                route={route}
                                />
                        ))}
                    </section>
                </motion.div>
                <div className="sidebar-card">
                    <main className='main'>{children}</main>
                </div>
            </div>
        </>
    );
};

export default SideBar;
