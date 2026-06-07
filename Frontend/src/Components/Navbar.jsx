import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Features/auth/hooks/useAuth";
import "./navbar.scss";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, handleLogout } = useAuth();

    const onLogout = async () => {
        try {
            await handleLogout();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <h1>Interview Pro</h1>
                </div>
                <div className="navbar-right">
                    {user && <span className="user-name">Welcome, {user.username || user.email}</span>}
                    <button 
                        onClick={onLogout} 
                        className="logout-button"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
