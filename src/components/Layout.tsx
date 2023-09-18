import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import { useState } from "react";
import Header from "./Header";

function Layout() {
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
    return (
        <div className="w-screen h-screen">
            <div className="flex w-full">
                <div className={`w-0 ${!sideBarOpen ? "w-16" : "md:w-1/5"} pt-4 `}>
                    <Sidebar sideBarOpen={sideBarOpen} />
                </div>
                <div
                    className={`bg-bg-primary px-4 py-8 h-full w-full ${sideBarOpen ? "md:w-4/5" : "md:w-5/5"
                        }`}>
                    <Header
                        sideBarOpen={sideBarOpen}
                        setSideBarOpen={() => {
                            setSideBarOpen(!sideBarOpen);
                        }}
                    />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Layout;
