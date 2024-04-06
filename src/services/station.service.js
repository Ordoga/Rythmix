import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'stations'

export const stationService = {
    query,
    getById,
    removeById,
    createStations
}

async function query() {
    let stations = await storageService.query(STORAGE_KEY)
    return stations
}

async function getById(id) {
    try {
        var station = await storageService.get(STORAGE_KEY,id)
        return station
    } catch (err) {
        console.log(`error: ${err}`)
    }
}

async function removeById(id) {
    try {
        var idx = await storageService.remove(STORAGE_KEY, id)
        return idx
    } catch (err) {
        console.log(`error: ${err}`)
    }
}






// Two regular Albums, one Single and one user generated Playlist (differs by CreatedBy)
function createStations(){
    let stations = utilService.loadFromStorage(STORAGE_KEY)
    if(!stations){
        stations = [
            {
                id: "0BFzNaeaNv4mahOzwZFGHK",
                name: "Royal Blood",
                albumCoverUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b0/Royal_Blood_-_Royal_Blood_%28Artwork%29.jpg',
                type: 'album',
                createdBy: null,
                addedAt: 162521762362,
                artist: 'Royal Blood',
                songs: [
                    {
                        id: "s1003",
                        title: "Out Of The Black",
                        artist: "Royal Blood",
                        url: "youtube/song.mp4",
                        tags: ["Rock"]
                    },
                    {
                        id: "s1004",
                        title: "Little Monster",
                        artist: "Royal Blood",
                        url: "youtube/song.mp4",
                        tags: ["Bass", "Rock"],
                    },
                    {
                        id: "s1005",
                        title: "Come On Over",
                        artist: "Royal Blood",
                        url: "youtube/song.mp4",
                        tags: ["Bass", "Rock"],
                    }
                ]   
            },
            {
                id: "03mX4WEpvZPkHmEsd2ZoV8",
                name: "Spring Girl",
                albumCoverUrl: 'https://upload.wikimedia.org/wikipedia/en/1/17/AreyouexpUK.jpg',
                type: 'single',
                createdBy: null,
                addedAt: 162521763928,
                artist: 'Adam Ten',
                songs: [
                    {
                        id: "s1007",
                        title: "Spring Girl",
                        artist: "Adam Ten",
                        url: "youtube/song.mp4",
                        tags: ["Electronic", "House"]
                    }
                ]   
            },
            {
                id: "03mX3928vZPkHmEsd2ZoV8",
                name: "Or's Finest",
                albumCoverUrl: 'https://upload.wikimedia.org/wikipedia/en/1/17/AreyouexpUK.jpg',
                type: 'playlist',
                createdBy: {
                    id: 'ak491k',
                    username: 'Or Doga',
                    imgUrl: 'http://some-photo/"'
                },
                addedAt: 162521763962,
                songs: [
                    {
                        id: "s1007",
                        title: "Spring Girl",
                        Artist: 'Adam Ten',
                        url: "youtube/song.mp4",
                        tags: ["Electronic", "House"]
                    }
                ]   
            },
        ]
        utilService.saveToStorage(STORAGE_KEY,stations)
    }
}

