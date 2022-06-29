import React from 'react';
import { SiCodeship } from 'react-icons/si';
import {ImCross} from 'react-icons/im'
import {FaGlobeAsia} from 'react-icons/fa'
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h1>Explore Asia</h1>
      </div>
      <ul className="links">
        <li ><a href="https://github.com/harisankar01/Location_Prediction_Website"><h3>Github</h3></a></li>
        <li ><a href="https://www.linkedin.com/in/hari-hara-sankar-a25b9822b/"><h3>LinkedIn</h3></a></li>
        <li ><a href="https://hariii.hashnode.dev/linode-native-location-prediction-webiste"><h3>Hashnode</h3></a></li>
        <li ><a href="https://www.linode.com/"><h3>Linode</h3></a></li>
      </ul>
      <div className="end">
        <a href="/" ><FaGlobeAsia/></a>
      </div>
      <div className="mobile">
        <SiCodeship color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="mobile_overlay flex__center slide-bottom">
            <ImCross fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="mobile_links">
              <li><a href="https://github.com/harisankar01/Location_Prediction_Website" onClick={() => setToggleMenu(false)}><h5>Github</h5></a></li>
              <li><a href="https://www.linkedin.com/in/hari-hara-sankar-a25b9822b/" onClick={() => setToggleMenu(false)}><h5>LinkedIn</h5></a></li>
              <li><a href="https://www.linode.com/" onClick={() => setToggleMenu(false)}><h5>Linode</h5></a></li>
              <li><a href="https://hariii.hashnode.dev/linode-native-location-prediction-webiste/" onClick={() => setToggleMenu(false)}><h5>Hashnode</h5></a></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;