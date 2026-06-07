import { createBrowserRouter } from "react-router";
import Login from "./Features/auth/pages/Login";
import Register from "./Features/auth/pages/Register";
import Protected from "./Features/auth/components/Protected";
import ProtectedLayout from "./Components/ProtectedLayout";
import Home from "./Features/interview/pages/Home";
import Interview from "./Features/interview/pages/interview";

export const router=createBrowserRouter([
    {
        //when the path is /login, render the Login component
        path: "/login",
        element:<Login/>
    },
    //when the path is /register, render the Register component
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/",
        element:<ProtectedLayout><Protected><Home/></Protected></ProtectedLayout>
    },
    {
        path:"/interview",
        element:<ProtectedLayout><Protected><Interview/></Protected></ProtectedLayout>
    },
    {
        path:"/interview/:interviewId",
        element:<ProtectedLayout><Protected><Interview/></Protected></ProtectedLayout>
    }

])