import { useEffect, useState } from "react"
import { StationList } from "../cmps/StationList"
import { stationService } from "../services/station.service"
import { StationIndexHeader } from "../cmps/header/StationIndexHeader"

export function StationIndex() {

  const [stations, setStations] = useState(stationService.getIndexStations())

  useEffect(() => {
    loadStations()
  }, [])

  function loadStations() {
    const indexStations = stationService.getIndexStations()
    console.log(indexStations)
    setStations(() => indexStations)
  }

  return (
    <section className="station-index page">
      <div className="station-header">
        <StationIndexHeader />
      </div>
      {stations &&
        <>
          <StationList stations={stations.moodsList} listTitle={'Moods'} />
          <StationList stations={stations.eleconicList} listTitle={'Electronic Music'} />
          <StationList stations={stations.recommendedList} listTitle={'Recommended For You'} />
          <StationList stations={stations.israelList} listTitle={'Hot In Israel'} />
        </>
      }
    </section>

  )
}
