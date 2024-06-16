import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { StationDetailsHeader } from "../cmps/station/stationDetails/StationDetailsHeader"
import { StationDetailsActions } from "../cmps/station/stationDetails/StationDetialsActions"
import { PlaylistSongList } from "../cmps/station/stationDetails/PlaylistSongList"
import { stationService } from "../services/station.service"
import { playStation } from "../store/actions/player.action"
import { useSelector } from "react-redux"
import { store } from "../store/store"

export function StationDetails() {

  const userStations = useSelector((storeState) => storeState.userModule.stations)

  const [station, setStation] = useState(null)
  const [isActiveSongId, setIsActiveSongId] = useState(null)
  const [bgColor, setBgColor] = useState("#333333")
  const [mainSectionColor, setMainSectionColor] = useState("#333333")
  const [darkerColor, setDarkerColor] = useState()

  const params = useParams()

  useEffect(() => {
    loadStation()
  }, [params, userStations])

  async function loadStation() {
    try {
      const station = await stationService.getById(params.stationId)
      setStation(station)
    } catch (err) {
      console.log(err)
    }
  }

  function onPlayStation(songIdx = 0) {
    playStation(station, songIdx)
    setIsActiveSongId(station.songs[songIdx].id)
  }

  function handleSongClick(songId) {
    setIsActiveSongId((prevState) => songId)
  }

  if (!station) return
  return (
    <section className="station-details page">
      <StationDetailsHeader station={station} bgColor={bgColor} setBgColor={setBgColor} darkerColor={darkerColor} setDarkerColor={setDarkerColor} setMainSectionColor={setMainSectionColor} />
      <div className='main-station-details' style={{ background: `linear-gradient(${mainSectionColor}1) 0%, rgba(18,18,18,1) 100%)` }}>
        <StationDetailsActions station={station} onPlayStation={onPlayStation} />
        <div className="song-list-container">
          <PlaylistSongList station={station} setStation={setStation} handleSongClick={handleSongClick} onPlayStation={onPlayStation} isActiveSongId={isActiveSongId} />
        </div>
      </div>
    </section>
  )
}
