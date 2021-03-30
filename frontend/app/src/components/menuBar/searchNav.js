import React from 'react';
import {BsSearch as I_search} from 'react-icons/bs';

export default function searchNav() {
  return(
    <div className={"d-flex search-container"}>
      <span className={"position-absolute mx-2"}><I_search/></span>
      <input className={"search-input"} type="text" maxLength={"80"} placeholder={"Artist, songs or albums"}/>
    </div>
  );
}
