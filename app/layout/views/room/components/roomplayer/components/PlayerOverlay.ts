import 'videojs-overlay/dist/videojs-overlay'
import {roomStore} from "../../../../../../room/RoomFacade"

const PlayerOverlay = (player) => {

    /* Generate Show Data */
    let showName: string = roomStore.getShowInfo().displayName
    let seasonNumber: number = roomStore.getCurrentSeason().seasonNumber
    let episodeNumber: number = roomStore.room.roomShow.episodeIndex + 1
    let episodeTitle: string = roomStore.getCurrentEpisode().name
    let showInfoText: string = '<h1>' + showName + '</h1><h2>S' + seasonNumber + ':E' + episodeNumber + ' "' + episodeTitle + '"</h2>'
    let overlayBackButton: string = '<div class="backButton"><a id="closeButton"><span>Back to home</span> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="white" height="4rem" width="4rem" xmlns="http://www.w3.org/2000/svg" style="color: white;"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg></a></div>'

    // Check if the Show is a movie
    if (roomStore.getCurrentSeason().name === "Movie") {
        showInfoText = '<h1>' + showName + '</h1>'
    }

    // Generate Overlays
    let showInfo = '<div class="showInfo">' + showInfoText + '</div>' + overlayBackButton

    return (
        player.overlay({
            overlays: [{
                content: showInfo,
                class: "video-overlay video-bg-overlay",
                showBackground: false,
                start: 0,
                end: 'ended',
                align: 'bottom-left',
                attachToControlBar: 'true',
            }]
        })
    )
}

export default PlayerOverlay