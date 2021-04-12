import 'videojs-overlay/dist/videojs-overlay'
import {roomStore} from "../../../../../../room/RoomFacade"
import {userStore} from "../../../../../../auth/AuthFacade";

const PlayerOverlay = (player) => {

    /* Generate Show Data */
    let showName: string = roomStore.getShowInfo().displayName
    let seasonNumber: number = roomStore.getCurrentSeason().seasonNumber
    let episodeNumber: number = roomStore.room.roomShow.episodeIndex + 1
    let episodeTitle: string = roomStore.getCurrentEpisode().name
    let showInfoText: string = '<h1>' + showName + '</h1><h2>S' + seasonNumber + ':E' + episodeNumber + ' "' + episodeTitle + '"</h2>'
    let overlayBackButton: string = '<div class="backButton"><a id="closeButton"><span>Back to home</span> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" color="white" height="4rem" width="4rem" xmlns="http://www.w3.org/2000/svg" style="color: white;"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg></a></div>'

    /* Generate Next Episode Data */
    let nextEpisodeOverlay: string;

    const nextEpisode = roomStore.getNextEpisode()

    console.log(nextEpisode)
    if (nextEpisode) {
        let nextEpisodePreview: string = '<div style="height: 16.6rem" class="relative w-full"> <img class="rounded-lg shadow" src="' + nextEpisode.thumbnail + '" alt=""/> <div class="font-poppins absolute bottom-0 h-full w-full"> <div class="bg-gradient-to-b from-transparent to-black opacity-100 rounded-lg h-full w-full bottom-0"/> <div class="absolute bottom-4 left-4"> <h2 class="text-3xl text-white font-semibold">' + showName + '</h2> <h3 class="text-xl text-gray-300">' + nextEpisode.name + '</h3> </div></div></div>'
        nextEpisodeOverlay = '<div class="flex text-left items-end flex-col max-w-lg relative pr-10 mb-28 z-10"> ' + nextEpisodePreview + ' <div class="flex-row mt-7 text-right"><a class="cursor-pointer text-2xl bg-gray-500 hover:bg-gray-400 py-3 px-7 shadow-2xl rounded-lg font-poppins">Watch Credits</a><a id="nextEpisode" class="cursor-pointer text-2xl py-3 px-7 shadow-2xl rounded-lg font-poppins ml-3 bg-red-500">Next Episode</a></div></div>'
    } else {
        nextEpisodeOverlay = '<div class="relative mb-16 pr-10 z-10"><a id="closeButton" class="cursor-pointer text-2xl bg-gray-500 hover:bg-gray-400 py-3 px-7 shadow-2xl rounded-lg font-poppins">Back to home</a></div>'
    }

    // Check if the Show is a movie
    if (roomStore.getCurrentSeason().name === "Movie") {
        showInfoText = '<h1>' + showName + '</h1>'
    }

    // Generate Overlays
    let showInfo = '<div class="showInfo">' + showInfoText + '</div>' + overlayBackButton
    let skipIntro = '<div class="relative mb-16 pr-10 z-10"><a id="skipIntro" class="cursor-pointer text-2xl bg-gray-500 hover:bg-gray-400 py-3 px-7 shadow-2xl rounded-lg font-poppins">Skip Intro</a></div>'

    if (userStore.user.name === roomStore.getOwner().name) {
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
                    start: roomStore.getCurrentEpisode().introStart,
                    end: roomStore.getCurrentEpisode().introStart + roomStore.getCurrentEpisode().introLength,
                    align: 'bottom-right',
                }, {
                    content: nextEpisodeOverlay,
                    showBackground: false,
                    start: roomStore.getCurrentEpisode().outroStart,
                    end: roomStore.getCurrentEpisode().outroStart + 1200,
                    align: 'bottom-right',
                }]
            })
        )
    }


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