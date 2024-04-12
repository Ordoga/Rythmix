import { ADD_STATION, LOAD_STATIONS, REMOVE_STATION } from "../reducers/station.reducer";
import { store } from "../store";
import { stationService } from "../../services/station.service";
import { Navigate } from "react-router";



export async function loadStations() {
    try {
      const newStations = await stationService.query();
      store.dispatch({ type: LOAD_STATIONS, newStations });
    } catch (error) {
      console.log("Could not load stations");
      throw error
    }
  }

export async function addStation() {
  try {

    const newStation = await stationService.createNewStation()
    store.dispatch({type: ADD_STATION, newStation })
  } catch (error) {
    console.log(error)
    console.log('Could Not add Station')
  }
}

export async function removeStation(stationId){
  try{
    stationService.removeById(stationId)
    store.dispatch({type: REMOVE_STATION, stationId})
    // TODO check if works:
    Navigate('/')
  }catch(error){
    console.log(error)
    console.log('Could not remove Station')
  }
}