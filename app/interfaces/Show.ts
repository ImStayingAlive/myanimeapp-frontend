interface Show {

    name: string
    displayName: string
    logo: string
    background: string
    animatedBackground: string
    description: string
    producer: string
    genres: Array<string>
    seasons: [
        {
            name: string
            seasonNumber: number
            releaseDat: string
            enabled: boolean
            episodes: [
                {
                    name: string
                    shortDescription: string
                    thumbnail: string
                    videoSource: string
                    length: number
                    introStart: number
                    introLength: number
                    outroStart: number
                }
            ]
        }
    ]
}

export default Show