import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext"

const Header = () => {
  const { authUser, actions } = useContext(UserContext);

  return (
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo"><Link to="/">Courses</Link></h1>
            <nav>
            {authUser === null ?
                <ul className="header--signedout">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                </ul>
              :
                <ul className="header--signedin">
                    <li>Welcome, {authUser.firstName}!</li>
                    <li><Link to="/" onClick={actions.signOut}>Sign Out</Link></li>
                </ul>
            }
            </nav>
        </div>
    </header>
  )
}

export default Header