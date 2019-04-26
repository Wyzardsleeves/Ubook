import React from 'react';
import {NavLink} from 'react-router-dom';

const SubNavBar = (props) => (
  <div className="sub-nav-bar">
    <div className="container">
      <div className="sec-1 left">
        <NavLink to="/">
          <i className="fas fa-home"></i>
        </NavLink>
      </div>
      <div className="sec-2 right">
        <NavLink to="/book/new/">
          <i className="fas fa-plus"></i>
        </NavLink>
      </div>
    </div>
  </div>
)

export default SubNavBar;
