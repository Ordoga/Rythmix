import { ReactSVG } from "react-svg";

import Edit from "../../assets/imgs/edit.svg";
import Delete from "../../assets/imgs/delete.svg";
import Add from "../../assets/imgs/addToPlaylist.svg";
import Arrow from "../../assets/imgs/rightFullArrow.svg";
import AddToLiked from '../../assets/imgs/addToLikes.svg';
import Trash from '../../assets/imgs/trash.svg';

export function SongAndStationModal({ modalType }) {
  return (
    <div className="wrapper-modal">
      <ul className="menu">
        <DymanicModal modalType={modalType} />
      </ul>
    </div>
  );
}

function DymanicModal({ modalType }) {
  switch (modalType) {
    case 'song':
      return <SongModal />;
    case 'station':
      return <StationModal />;
    default:
      return null;
  }
}

function StationModal() {
  return (
    <div className="modal">
      <li className="menu-list edit-item">
        <div className="svg-modal">
          <ReactSVG src={Edit} />
        </div>
        <div className="text-menu">Edit details</div>
      </li>
      <li className="menu-list delete-item">
        <div className="svg-modal">
          <ReactSVG src={Delete} />
        </div>
        <div className="text-menu">Delete</div>
      </li>
    </div>
  );
}

function SongModal() {
  return (
    <div className="modal">
      <li className="menu-list add-playlist-item">
        <div className="svg-modal">
          <ReactSVG src={Add} />
        </div>
        <div className="text-menu">Add to playlist</div>
        <div className="svg-modal">
          {/* <ReactSVG src={Arrow} /> */}
        </div>
      </li>
      <li className="menu-list delete-item">
        <div className="svg-modal">
          <ReactSVG src={Trash} />
        </div>
        <div className="text-menu">Remove from this playlist</div>
      </li>
      <li className="menu-list liked-item">
        <div className="svg-modal">
          <ReactSVG src={AddToLiked} />
        </div>
        <div className="text-menu">Save to your Liked Songs</div>
      </li>
    </div>
  );
}