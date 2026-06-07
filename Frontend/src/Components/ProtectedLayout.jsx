import React from "react";
import Navbar from "./Navbar";

const ProtectedLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default ProtectedLayout;
