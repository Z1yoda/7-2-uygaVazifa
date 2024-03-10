import { Outlet, Link } from "react-router-dom";
import moon from '../assets/moon.svg'
import sun from '../assets/sun.svg'
import cartIcon from '../assets/cartIcon.svg'
import "./index.css";

function MainLayout() {
    return (
        <div>
            <header>
                <div className="container">
                    <div className="header-wrapper">
                        <p>Sign in/Guest</p>
                        <p>Create Account</p>
                    </div>
                </div>
            </header>
            <nav>
                <div className="container">
                    <div className="nav-wrapper">
                        <div className="nav-start">C</div>
                        <div className="nav-center">
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about">About</Link>
                                </li>
                                <li>
                                    <Link to="/products">Products</Link>
                                </li>
                                <li>
                                    <Link to="/cart">Cart</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="nav-end">
                            <div className="mode">
                                {/* <img src={moon} alt="" /> */}
                                <img src={sun} alt="" />
                            </div>
                            <div className="cart-numbers">
                                <img src={cartIcon} alt="" />
                                <div className="counter">0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="main container">
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default MainLayout;
