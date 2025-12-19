import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logininputform from "./Logininputform";
import { loginHandler } from "../../actions/userAction";
import Spinner from "../reusable_components/Spinner";
const Login = () => {
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    
    const dispatch = useDispatch();
    const { success,loading, error } = useSelector(state => state.login);

    useEffect(() => {
        if (error) {
            setErrMsg(error);
        }
    }, [error]);

    useEffect(() => {
        const userInputElement = document.getElementById("username");
        if (userInputElement) {
            userInputElement.focus();
        }
    }, []);

    useEffect(() => {
        if (!success) {
            setErrMsg('');
        }
    }, [user, pwd, success]);

    useEffect(() => {
        if (success) {
            setUser('');
            setPwd('');
        }
    }, [success]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginHandler({ user, pwd }));
    };
    if(loading)
        {
            return <Spinner/>;
        }
    return (
        <Logininputform
            errMsg={errMsg}
            handleSubmit={handleSubmit}
            setUser={setUser}
            user={user}
            setPwd={setPwd}
            pwd={pwd}
            success={success}
            setErrMsg={setErrMsg}
        />
    );
};

export default Login;
