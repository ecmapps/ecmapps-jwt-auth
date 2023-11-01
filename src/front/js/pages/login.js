import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate()
    useEffect(()=>{
        let token = sessionStorage.getItem("access_token");
        if(token!==null){
            navigate("/private");
        }
    },[])

    async function handleSubmit (e) {
        e.preventDefault();
        if(e.target.password.value.length < 8){
            alert("The password is at least 8 characters long");
            return;
        }
        const response = await actions.logIn(e.target.email.value, e.target.password.value);
        if (response.code == 200){
            navigate("/private");
        }
        else{
            alert(response.data.msg);
        }
    }
    return (
        <div className="mt-2 container">
            <form onSubmit={(event)=>handleSubmit(event)} className="d-flex flex-column flex-nowrap align-items-center">
                <legend className="my-3 text-center">Log In</legend>
                <div className="mb-3 col-12 col-md-6 col-lg-4">
                    <label htmlFor="emailInput" className="form-label">Email Address</label>
                    <input type="email" name="email" className="form-control" id="emailInput" aria-describedby="emailHelp"required></input>
                    <div id="emailHelp" className="form-text">example@domain.com</div>
                </div>
                <div className="mb-3 col-12 col-md-6 col-lg-4">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="passwordInput" required></input>
                </div>
                <div className="mb-3 col-12 col-md-6 col-lg-4">
                    <button type="submit" className="btn btn-outline-warning btn-lg">Enter</button>
                </div>
            </form>
        </div>
    )
}