import { useRef, useState, useEffect } from "react";
import RegisterInputForm from "./Registerinputform";
import registerAction from "../authservices/Registeraction";
import { useDispatch } from 'react-redux';

const USER_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [name,setName]=useState('');
    

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const dispatch=useDispatch()
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    return (
        <RegisterInputForm
            userRef={userRef}
            errRef={errRef}
            user={user}
            setUser={setUser}
            userFocus={userFocus}
            setUserFocus={setUserFocus}
            validName={validName}
            pwd={pwd}
            setPwd={setPwd}
            pwdFocus={pwdFocus}
            setPwdFocus={setPwdFocus}
            validPwd={validPwd}
            matchPwd={matchPwd}
            setMatchPwd={setMatchPwd}
            matchFocus={matchFocus}
            setMatchFocus={setMatchFocus}
            validMatch={validMatch}
            errMsg={errMsg}
            setErrMsg={setErrMsg}
            success={success}
            setSuccess={setSuccess}
            name={name}
            setName={setName}
            registerAction={registerAction}
            dispatch={dispatch}
        />
    );
}

export default Register;
