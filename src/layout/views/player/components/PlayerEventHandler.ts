import { userStore } from "../../../../app/auth/AuthFacade"
import { playerStore } from "../../../../app/player/PlayerFacade"
import timeStampUtil from "../../../../app/utils/TimeStampUtil"

const PlayerEventHandler = (player) => {

    const show = playerStore.show

    if (userStore.isLoggedIn) {
        /* Check if Player loaded */
        player.on("loadeddata", () => {
            if (!playerStore.loaded) {
                playerStore.setLoaded(true)
            }

            player.volume(playerStore.getVolume())

            if (playerStore.playingNextEpisode) {
                playerStore.playingNextEpisode = false
            }

            userStore.setCurrentEpisode(show.name, playerStore.currentSeasonIndex, playerStore.currentEpisodeIndex, () => {
            })

            if (playerStore.watchSession === 0) {
                player.currentTime(userStore.getCurrentTimeInEpisode(show.name, playerStore.currentSeasonIndex, playerStore.currentEpisodeIndex))
            }
        })

        // Update Saved Player Time when Skipping forward or back
        player.on("seeking", () => {
            if (player.currentTime() > 2) {
                userStore.setWatchedEpisode(show.name, playerStore.currentSeasonIndex, playerStore.currentEpisodeIndex, Math.round(player.currentTime()), () => {
                })
            }
        })

        // Check if Player is at the end
        // And start the next episode timer
        player.on("timeupdate", () => {
            if (player.currentTime() > 2) {
                let modularTime = Math.round(player.currentTime() % 5);
                if (modularTime === 0) {
                    if (timeStampUtil.isAvailable("playerTimeUpdate")) {
                        userStore.setWatchedEpisode(show.name, playerStore.currentSeasonIndex, playerStore.currentEpisodeIndex, Math.round(player.currentTime()), () => {
                        })
                        timeStampUtil.setTimeStamp("playerTimeUpdate", 1000 * 2)
                    }
                }
            }
        })
    } else {
        player.on("loadeddata", () => {
            if (!playerStore.loaded) {
                playerStore.setLoaded(true)
                player.volume(playerStore.getVolume())
            }
        })
    }

    player.on("volumechange", () => {
        playerStore.setVolume(player.volume())
    })

    /* Event Listeners */
    document.querySelectorAll('#skipIntro').forEach(function (element) {
        element.addEventListener("click", () => player.currentTime(playerStore.getCurrentEpisode().introStart + playerStore.getCurrentEpisode().introLength))
    });

    document.querySelectorAll('#nextEpisode').forEach(function (element) {
        element.addEventListener("click", () => playerStore.playNextEpisode())
    });
}

export default PlayerEventHandler