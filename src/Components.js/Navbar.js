
import {Link} from "react-router-dom"

const Navbar = () => {
    return (
        <nav className='navbar'>
          <div className='container'>
            <nav  className="navbar_nav">
              <h3 className="nav_brand">
                  <Link to='/'>
                    <img className="logo" src="	https://static.tvmaze.com/images/tvm-header-logo.png"></img>
                </Link>
              </h3>
              <ul  className="links">
                <li className="links_link">
                  <Link to ='/Homepage'>Home</Link>
                </li>
                <li className="links_link">
                  <Link to ='/About'>About</Link>
                </li>
                
              </ul>
            </nav>
          </div>
        </nav>
      )
}

export default Navbar
