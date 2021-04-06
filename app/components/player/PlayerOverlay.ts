import playerStore from "../../stores/player/PlayerStore";
import 'videojs-overlay/dist/videojs-overlay'

const PlayerOverlay = (player) => {

    /* Generate Show Data */
    let showName: string = playerStore.show.displayName
    let seasonNumber: number = playerStore.getCurrentSeason().seasonNumber
    let episodeNumber: number = playerStore.currentEpisodeIndex + 1
    let episodeTitle: string = playerStore.getCurrentEpisode().name
    let showInfoText: string = '<h1>' + showName + '</h1><h2>S' + seasonNumber + ':E' + episodeNumber + ' "' + episodeTitle + '"</h2>'
    let overlayBackButton: string = '<div class="backButton"><a id="closeButton"><span>Back to home</span> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="white" height="4rem" width="4rem" xmlns="http://www.w3.org/2000/svg" style="color: white;"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg></a></div>'

    /* Generate Next Episode Data */
    let nextEpisodeOverlay: string;

    const nextEpisode = playerStore.getNextEpisode()

    if (nextEpisode) {
        nextEpisodeOverlay = '<div class="relative mb-16 pr-10 z-10"><a class="cursor-pointer text-2xl bg-gray-500 hover:bg-gray-400 py-3 px-7 shadow-2xl rounded-lg font-poppins">Watch Credits</a><a class="cursor-pointer text-2xl py-3 px-7 shadow-2xl rounded-lg font-poppins ml-3 animation-next-episode">Next Episode</a></div>'
    } else {
        nextEpisodeOverlay = '<div class="relative mb-16 pr-10 z-10"><a id="closeButton" class="cursor-pointer text-2xl bg-gray-500 hover:bg-gray-400 py-3 px-7 shadow-2xl rounded-lg font-poppins">Back to home</a></div>'
    }

    // Check if the Show is a movie
    if (playerStore.getCurrentSeason().name === "Movie") {
        showInfoText = '<h1>' + showName + '</h1>'
    }

    // Generate Overlays
    let showInfo = '<div class="showInfo">' + showInfoText + '</div>' + overlayBackButton
    let skipIntro = '<div class="relative mb-16 pr-10 z-10"><a id="skipIntro" class="cursor-pointer text-2xl bg-red-500 hover:bg-red-400 py-3 px-7 shadow-2xl rounded-lg font-poppins">Skip Intro</a></div>'

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
            }, {
                content: skipIntro,
                showBackground: false,
                start: playerStore.getCurrentEpisode().introStart,
                end: playerStore.getCurrentEpisode().introStart + playerStore.getCurrentEpisode().introLength,
                align: 'bottom-right',
            }, {
                content: nextEpisodeOverlay,
                showBackground: false,
                start: playerStore.getCurrentEpisode().outroStart,
                end: playerStore.getCurrentEpisode().outroStart + 1200,
                align: 'bottom-right',
            }]
        })
    )
}

export default PlayerOverlay