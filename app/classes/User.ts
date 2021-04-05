class User {

    name: string
    avatar: string
    group: string
    joined: number
    token: string
    mail: string
    watchLater: Array<string>
    watchedShows: [
        {
            name: string
            currentEpisode: {
                episodeIndex: number
                seasonIndex: number
                timestamp: number
            }
            seasons: [
                episodes: [
                    timestamp: number
                ]
            ]
        }
    ]
}

export default User