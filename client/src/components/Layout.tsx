import { Outlet } from "react-router";
import Nav from "./Nav";

import "../assets/css/layout.css";

export default function Layout() {
    return (
        <div className="app-root">
            <Nav />

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}