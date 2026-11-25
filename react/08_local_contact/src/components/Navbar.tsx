import {Link} from 'react-router';

const Navbar = () => {
	
	return(
		<nav className="navbar navbar-extend-lg navbar-light bg-light">
			<a className="navbar-brand" style={{"marginLeft":10}}>Contact App</a>
			<ul className="navbar-nav">
				<li className="nav-item" style={{"marginLeft":10}}>
					<Link className="nav-link" to="/">Contact list</Link>
				</li>
				<li className="nav-item" style={{"marginLeft":10}}>
					<Link className="nav-link" to="/form">Add new contact</Link>
				</li>
			</il>
		</nav>
	)
}

export default Navbar;