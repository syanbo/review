/**
 * Author   : Syan
 * Date     : 2018/10/16
 * Project [ review ] Coded on WebStorm.
 */

import { Link } from '@reach/router';
import React from 'react';

const NavLink = ({ partial = true, ...props }) => (
  <Link
    {...props}
    getProps={({ isCurrent, isPartiallyCurrent }) => {
      const isActive = partial ? isPartiallyCurrent : isCurrent;
      return {
        style: {
          color: isActive ? 'red' : 'blue',
        },
      };
    }}
  />
);

export default NavLink;
