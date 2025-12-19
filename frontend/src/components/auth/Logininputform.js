import React from 'react';
import { Link } from 'react-router-dom';

const Logininputform = ({
    errMsg,
    handleSubmit,
    setUser,
    user,
    setPwd,
    pwd,
    success,
    setErrMsg
}) => {
    return (
        <>
            {success ? (
                <section className="flex flex-col justify-center items-center min-h-screen">
                    <h1 className="text-3xl font-bold mb-4">Success!</h1>
                    <p>
                        <Link to="/" className="text-blue-500">HOME</Link>
                    </p>
                </section>
            ) : (
                <section className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
                    <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                        <p className={errMsg ? "bg-red-200 text-red-800 font-bold p-2 mb-4 rounded" : "hidden"} aria-live="assertive">{errMsg}</p>
                        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    type="text"
                                    id="username"
                                    autoComplete="on"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder="Password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-dark text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 disabled:opacity-50"
                            >
                                Sign In
                            </button>
                        </form>
                        <p className="text-sm text-gray-600 mt-4">
                            Need an account? <Link to="/register" className="text-blue-500">Register</Link>
                        </p>
                    </div>
                </section>
            )}
        </>
    );
};

export default Logininputform;
