import React, {useContext} from "react";
import { Context } from "../store/appContext";

export const SignUp = () => {
    const {store, actions} = useContext(Context);

    return (
        <div>
            Hello SignUp!
        </div>
    )
}