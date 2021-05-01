import {playerStore} from "../../../../app/player/PlayerFacade";
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
            title: playerStore.show.displayName,
            artist: 'S' + playerStore.getCurrentSeason().seasonNumber + ':E' + (playerStore.currentEpisodeIndex + 1) + ' "' + playerStore.getCurrentEpisode().name + '"',
            artwork: [
                {src: playerStore.getCurrentEpisode().thumbnail, sizes: '512x512', type: 'image/png'},
            ]
        });
    }

    const actionHandlers = [
        ['previoustrack', () => { playerStore.playPreviousEpisode() }],
        ['nexttrack',     () => { playerStore.playNextEpisode() }],
        ['seekbackward',  () => { player.currentTime(player.currentTime() - 5) }],
        ['seekforward',   () => { player.currentTime(player.currentTime() + 5) }],
    ];

    for (const [action, handler] of actionHandlers) {
        try {
            // @ts-ignore
            navigator.mediaSession.setActionHandler(action, handler);
        } catch (error) {
            console.log(`The media session action "${action}" is not supported yet.`);
        }
    }

}
export default PlayerMediaSession