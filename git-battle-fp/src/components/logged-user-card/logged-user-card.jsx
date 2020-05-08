import React from 'react';

import { useSelector } from 'react-redux';

export default function LoggedUserCard() {

  const user = useSelector(state => state.user);
  console.log(user);
  return(
    <div>
    </div>
  )
}