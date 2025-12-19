import { registerHandler} from "../../actions/userAction";
const USER_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const registerAction = async ({ e, user, pwd, matchPwd, setErrMsg, setSuccess, setUser, setPwd, setMatchPwd, errRef,name,dispatch }) => {
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || pwd !== matchPwd) {
        setErrMsg("Invalid Entry");
        return;
    }
    try {
        await dispatch(registerHandler(name,user,pwd))
        setSuccess(true);
        setUser('');
        setPwd('');
        setMatchPwd('');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Username Taken');
        } else {
            setErrMsg('Registration Failed');
        }
        errRef.current.focus();
    }
}

export default registerAction;
