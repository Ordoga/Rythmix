import { useState, useEffect, useRef } from "react"
import { utilService } from "../../../services/util.service"
import { ReactSVG } from "react-svg"
import { OptionsModal } from "../../OptionsModal"
import Play from '../../../assets/imgs/play.svg'
import dots from '../../../assets/imgs/dots.svg'
import { useSelector } from "react-redux"
import { toggleLikedSong } from "../../../store/actions/user.action"
import { ToggleLikedSongButton } from "../../ToggleLikedSongButton"
import { UserService } from "../../../services/user.service"
import { SongAndStationModal } from "../../modal/SongAndStationModal"

export function PlaylistSongPreview({ index, song, station, setStation, isActiveSongId, handleSongClick }) {

  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLikedSong, setIsLikedSong] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const buttonRef = useRef(null)

  const playingStationId = useSelector((storeState) => storeState.playerModule.playingStationId)
  const playingSongId = useSelector((storeState) => storeState.playerModule.song.id)

  const userLibary = useSelector((storeState) => storeState.userModule.stations)
  const createdByUser = userLibary?.filter((station) => station.createdBy._id === loggedInUser._id)

  useEffect(() => {
    loadIsSongLiked()
    const handleCloseModalMenu = () => setIsModalOpen(false)
    document.addEventListener('click', handleCloseModalMenu)

    return () => {
      document.removeEventListener('click', handleCloseModalMenu)
    }
  }, [])


  function loadIsSongLiked() {
    if (!loggedInUser) return
    setIsLikedSong(() => UserService.isSongLiked(loggedInUser, song))
  }


  function handleOptionsClick(event) {
    event.stopPropagation()
    setIsModalOpen(true)
  }

  function onClose() {
    setIsModalOpen(false)
  }


  // For hovering effect only
  function handleHover() {
    setIsHover(() => true)
  }
  function handleHoverEnded() {
    setIsHover(() => false)
  }

  function handleToggleLikedSongs() {
    toggleLikedSong(loggedInUser, song)
    setIsLikedSong((prevState) => !prevState)
  }

  function isSongPlaying(station, song) {
    // Only allow when it is not in search
    if (!station) return
    return station._id === playingStationId && song.id === playingSongId
  }

  return (
    <div className={`song-preview ${station ? 'playlist-columns' : ''}  ${isActiveSongId ? 'song-preview-active' : ''}`} onMouseEnter={handleHover} onMouseLeave={handleHoverEnded}>
      {station &&
        <div className={`song-index ${isSongPlaying(station, song) ? "playing" : ""}`}>
          {isHover ? <div className="preview-play-svg-container"><ReactSVG src={Play} /></div> : index + 1}
        </div>}

      <div className="song-details">
        {/* Renders Image only if not in a station -- Search Result */}

        <div className="img-container">
          <img className="song-thumbnail" src={song.imgURL} ></img>
        </div>

        <div className="title-and-artist">
          <div className={`song-title ${isSongPlaying(station, song) ? "playing" : ""}`}>{song.title}</div>
          <div className={`song-artist  ${isHover ? '' : 'secondary'}`}>{song.artist}</div>
        </div>
      </div>
      {/* Renders Album and Date Added only if in a station */}
      {station && (
        <>
          <div className={`song-album ${isHover ? '' : 'secondary'}`}>{song.album}</div>
          <div className="date-added secondary">{utilService.formatDate(song.addedAt)}</div>
        </>
      )}

      <div className="song-length secondary">
        {isHover && loggedInUser ?
          <ToggleLikedSongButton isLikedSong={isLikedSong} handleToggleLikedSongs={handleToggleLikedSongs} />
          : ''}

        <div className="song-duration-text">
          {utilService.formatSongLength(song.lengthInSeconds)}
          {isModalOpen && (
            <SongAndStationModal
              modalType={'song'}
              onClose={onClose}
              createdByUser={createdByUser}
              song={song}
              station={station}
              setStation={setStation}
              isLikedSong={isLikedSong}
              setIsLikedSong={setIsLikedSong}
              handleSongClick={handleSongClick}
            />
          )}
        </div>

        {isHover && loggedInUser &&
          <button className="song-options" ref={buttonRef} onClick={handleOptionsClick}>
            <ReactSVG src={dots} />
          </button>
        }
      </div>
    </div>
  )
}
