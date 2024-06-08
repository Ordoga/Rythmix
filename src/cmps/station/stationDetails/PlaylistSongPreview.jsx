import { useState, useEffect, useRef } from "react"
import { utilService } from "../../../services/util.service"
import { ReactSVG } from "react-svg"
import { OptionsModal } from "../../OptionsModal"
import Play from '../../../assets/imgs/play.svg'
import { useSelector } from "react-redux"
import { toggleLikedSong } from "../../../store/actions/user.action"
import { ToggleLikedSongButton } from "../../ToggleLikedSongButton"
import { UserService } from "../../../services/user.service"

export function PlaylistSongPreview({ index, song, station, isActiveSongId }) {

  const loggedInUser = useSelector((storeState) => storeState.userModule.user)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 })
  const [isLikedSong, setIsLikedSong] = useState(UserService.isSongLiked(loggedInUser, song))
  const [isHover, setIsHover] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    function updateButtonPosition() {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      setButtonPosition({
        top: buttonRect.top + buttonRect.height,
        left: buttonRect.left
      })
    }
    updateButtonPosition() // Initial position
    window.addEventListener('resize', updateButtonPosition)

    return () => {
      window.removeEventListener('resize', updateButtonPosition)
    }
  }, [])

  function handleOptionsClick(event) {
    setIsModalOpen(true)
  }

  function handleHover() {
    setIsHover(() => true)
  }
  function handleHoverEnded() {
    setIsHover(() => false)
  }
  function displayPlayButton() {
    return (
      isHover ?
        <div className="preview-play-svg-container"><ReactSVG src={Play} /></div> : index + 1
    )
  }

  function handleToggleLikedSongs() {
    toggleLikedSong(loggedInUser, song)
    setIsLikedSong((prevState) => !prevState)
  }

  function displayAddToLikedButton() {
    return (
      isHover ?
        <ToggleLikedSongButton isLikedSong={isLikedSong} handleToggleLikedSongs={handleToggleLikedSongs} />
        : ''
    )
  }

  function onClose() {
    setIsModalOpen((prevState) => false)
  }

  return (
    <>
      <div className={`song-preview ${station ? 'playlist-columns' : ''}  ${isActiveSongId ? 'song-preview-active' : ''}`} onMouseEnter={handleHover} onMouseLeave={handleHoverEnded}>
        {station && <div className="song-index">{displayPlayButton()}</div>}

        <div className="song-details">
          {/* Renders Image only if not in a station -- Search Result */}

          <div className="img-container">
            <img className="song-thumbnail" src={song.imgURL} ></img>
          </div>

          <div className="title-and-artist">
            <div className="song-title">{song.title}</div>
            <div className={`song-artist  ${isHover ? '' : 'secondary'}`}>{song.artist}</div>
          </div>
        </div>
        {/* Renders Album and Date Added only if in a station */}
        {station && (
          <>
            <div className={`song-album ${isHover ? '' : 'secondary'}`}>{song.album}</div>
            <div className="date-added secondary">Nov 11</div>
          </>
        )}

        <div className="song-length secondary">
          {displayAddToLikedButton()}
          {utilService.formatSongLength(song.lengthInSeconds)}
          <button className="song-options" ref={buttonRef} onClick={handleOptionsClick}>•••</button>
          {isModalOpen && (
            <OptionsModal modalType={'song'} song={song} station={station} isOpen={isModalOpen} onClose={onClose} buttonPosition={buttonPosition} handleToggleLikedSongs={handleToggleLikedSongs} />
          )}
        </div>

      </div>
    </>
  )
}
