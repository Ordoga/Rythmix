import {SidebarLibaryHeader} from './SidebarLibaryHeader.jsx'
import { useSelector } from 'react-redux'
import { StationPreview } from './StationPreview.jsx'
import { OptionsModal } from '../OptionsModal.jsx'

export function SidebarLibary(){

    const stations = useSelector((storeState) => storeState.stationModule.stations)

    return (
        <>
            <div className="sidebar-libary">
                <SidebarLibaryHeader/>
                
                <div className="libary-station-list">
                    {stations.map((station) => (
                        <div className="preview-item">
                            <StationPreview key={station.id} station={station}/>
                            <OptionsModal modalType={'station'} entity={station} />
                        </div>  
                    ))}
                </div>
            </div>
        </>
    )
}