import React from 'react';
import test from '../../assets/badLiar.jpg'
import DropdownMenu from './dropdownMenu';


export default function SongsEditItem(props){
  const songData = props;
  const [expanded, setExpanded] = React.useState({
    menu: false,
  });

  const handleClick = () =>{
      setExpanded({
        menu: !expanded.menu
      });
    console.log(expanded);
  }

  return(
    <div className="row-title-grid pSong-grid text-secondary mt-2">
      {/* INDEX */}
      <div className={"pR_title justify-self-end"}>
        <small>{songData.song_index}</small>
      </div>
      {/* SONG INFO */}
      <div className={"pR_title text-secondary"}>
        <img src={test} alt="Test" width={"45px"} className={"mr-3"}/>
        <div>
          <p className="m-0 p-0">{songData.song_t}</p>
          <p className={"p-0"} id="song-artist">{songData.song_a}</p>
        </div>
      </div>
      {/* SONG ALBUM */}
      <div className={"pR_title justify-self-star"}>
        <small>{songData.song_album}</small>
      </div>
      {/* DROPDOWN MENU */}
      <div className={"pR_title justify-self-end cursor"}>
          <button
            onClick={handleClick}
            className="nav-link d-flex button"
            name="menu"
            aria-expanded={expanded.menu}
            type="button"
          >
            <span>
               {songData.I_options}
            </span>
          </button>
        {/* Dropdown items */}
        <div
          aria-expanded={expanded.menu}
          aria-labelledby="menu"
        >
          <DropdownMenu />
        </div>
      </div>
    </div>
  );
}
