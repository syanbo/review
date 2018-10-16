/**
 * Author   : Syan
 * Date     : 2018/10/16
 * Project [ review ] Coded on WebStorm.
 */

import React from 'react';
import { NavLink } from '../../components';

const Dash = props => (
  <div>
    <h2>Dash</h2>
    <ul>
      <li>
        <NavLink partial={false} to="./">
          Dash Home
        </NavLink>
      </li>
      <li>
        <NavLink to="users/123">User</NavLink>
      </li>
      <li>
        <NavLink to="team">Team</NavLink>
      </li>
    </ul>
    <User path="users/:userId" />
  </div>
);

const User = props => <h2>{props.userId}</h2>;

export default Dash;
