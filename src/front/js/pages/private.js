import React, {useContext, useEffect} from 'react'
import { Context } from '../store/appContext'

export const Private = () => {
    const {store, actions} = useContext(Context);

    useEffect(()=>{
        //Call authentication of user here onMount
    },[])

    return (
        <div>
            Hello Private!
        </div>
    )
}