import roomStore from "../../../../../../app/room/store/RoomStore";
import 'videojs-hotkeys/videojs.hotkeys'

const PlayerMediaSession = (player) => {

    player.hotkeys({
        volumeStep: 0.1,
        seekStep: 5,
        enableModifiersForNumbers: false
    })

    /* Media Session Config */
    if ("mediaSession" in navigator) {
        // @ts-ignore
        navigator.mediaSession.metadata = new MediaMetadata({
            title: roomStore.getShowInfo().displayName,
            artist: 'S' + roomStore.getCurrentSeason().seasonNumber + ':E' + (roomStore.room.roomShow.episodeIndex + 1) + ' "' + roomStore.getCurrentEpisode().name + '"',
            artwork: [
                {src: roomStore.getCurrentEpisode().thumbnail, sizes: '512x512', type: 'image/png'},
            ]
        });
    }
}
export default PlayerMediaSession