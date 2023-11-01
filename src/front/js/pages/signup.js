import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom"

export const SignUp = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate()

    const handleChange = (e) =>{
        e.preventDefault();
        console.log(e.target.value)
    }
    async function handleSubmit (e) {
        e.preventDefault();
        if(e.target.password.value.length < 8){
            alert("The password needs to be at least 8 characters long");
            return;
        }
        const response = await actions.signUp(e.target.username.value, e.target.email.value, e.target.password.value);
        if (response.code == 201){
            navigate("/login");
        }
        else{
            alert(response.data.msg);
        }
    }

    return (
        <div className="mt-2 container">
            <form onSubmit={(event)=>handleSubmit(event)} className="d-flex flex-column flex-nowrap align-items-center">
                <legend className="my-3 text-center">Sign Up</legend>
                <div className="mb-3 col-12 col-md-6 col-lg-4">
                    <label htmlFor="nameInput" className="form-label">Name</label>
                    <input type="text" name="username" className="form-control" id="nameInput" aria-describedby="nameHelp" required></input>
                    <div id="nameHelp" className="form-text">Enter your name here</div>
                </div>
                <div className="mb-3 col-12 col-md-6 col-lg-4">
                    <label htmlFor="emailInput" className="form-label">Email Address</label>
                    <input type="email" name="email" className="form-control" id="emailInput" aria-describedby="emailHelp"required></input>
                    <div id="emailHelp" className="form-text">example@domain.com</div>
                </div>
                <div className="mb-3 col-12 col-md-6 col-lg-4">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="passwordInput" aria-describedby="passwordHelp" onChange={handleChange} required></input>
                    <div id="passwordHelp" className="form-text">Enter at least 8 characters</div>
                </div>
                <div className="mb-3 col-12 col-md-6 col-lg-4">
                    <button type="submit" className="btn btn-outline-warning btn-lg">Submit</button>
                </div>
            </form>
        </div>
    )
}