import React, {useContext} from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import FavoritesDropdown from "./favoritesDropdown.jsx";
import SignupAndLogin from "./signupAndLogin.jsx";

export const Navbar = () => {
	const {store, actions} = useContext(Context)
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">
						<i className="fa-solid fa-jedi fa-2xl"></i>
					</span>
				</Link>
				<div className="d-flex ml-auto">
					{store.loggedIn == false ? <SignupAndLogin /> : <FavoritesDropdown />}
				</div>
			</div>
		</nav>
	);
};
