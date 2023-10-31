import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>JWT Authentication with Flask and ReactJS</h1>
			<p>BACKEND_URL</p>
			<div className="alert alert-info">
				{process.env.BACKEND_URL || "No backend url in env"}
			</div>
		</div>
	);
};
