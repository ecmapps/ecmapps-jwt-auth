import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-2">
			<h1>JWT Authentication with Flask and ReactJS</h1>
			<p>BACKEND_URL</p>
			<div className="alert alert-info">
				{process.env.BACKEND_URL || "No backend url in env"}
			</div>
			<div className="d-flex flex-column flex-wrap gap-3">
				<Link to='/signup'>
					<span className="btn btn-outline-warning btn-lg" href='#' role="button">
						SignUp
					</span>
				</Link>
				<Link to='/login'>
					<span className="btn btn-outline-warning btn-lg" href='#' role="button">
						Login
					</span>
				</Link>
				<Link to='/private'>
					<span className="btn btn-outline-warning btn-lg" href='#' role="button">
						Private
					</span>
				</Link>
			</div>
		</div>
	);
};
