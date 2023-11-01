import React, {useContext, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext'

export const Private = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();
    useEffect(()=>{
        let token = sessionStorage.getItem("access_token");
        if(token===null){
            navigate('/login');
            return;
        }
        validateCredentials();
    },[])
    async function validateCredentials(){
        console.log("Calling validate")
        const response = await actions.checkToken()
        if(!response.data.claims.jti){
            navigate('/login')
        }
    }
    async function logOut() {
        const response = await actions.logOut();
        navigate("/");
    }

    return (
        <div className="mt-2 container text-center">
            <legend className="my-3 text-center">Hello {store.current_user.name || "user"}!</legend>
            <div className="mb-3 col-12 col-md-6 col-lg-4">
                <Link to="/">
                    <button type="button" className="btn btn-outline-warning btn-lg">Home</button>
                </Link>
            </div>
            <div className="mb-3 col-12 col-md-6 col-lg-4">
                <button type="button" className="btn btn-outline-warning btn-lg" onClick={logOut}>Log Out</button>
            </div>
        </div>
    )
}