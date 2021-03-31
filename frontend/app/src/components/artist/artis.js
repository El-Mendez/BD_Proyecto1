import React from 'react';
import Albums from './albums';
import Songs from './songs';

export default function Artist(){
  return(
    <div>
        <h1 className="m-4 text-secondary">
          ARTIST NAME
        </h1>
      <div className={"home-container"}>
        <Songs/>
        <Albums/>
      </div>
    </div>
  );

}
