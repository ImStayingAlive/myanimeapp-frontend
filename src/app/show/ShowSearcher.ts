import {showStore, ShowModel} from "./ShowFacade";

const searchShows = (searchTerm: string) => {

    let timeNow = Date.now()
    let results: Array<ShowModel> = []

    if (showStore.shows.length === 0) {
        return results
    }

    const loweredSearchTerm = searchTerm.toLowerCase()

    for (let i = 0; i < showStore.shows.length; i++) {
        let show = showStore.shows[i]
        if (show.name.includes(loweredSearchTerm)) {
            results.push(show)
            continue;
        }

        if (show.producer.toLowerCase().includes(loweredSearchTerm)) {
            results.push(show)
            continue;
        }

        for (let j = 0; j < show.genres.length; j++) {
            let genre = show.genres[i]
            if (genre != undefined) {
                if (genre.includes(loweredSearchTerm)) {
                    results.push(show)
                }
            }
        }
    }

    results.sort(sortShows)

    function sortShows(a: ShowModel, b: ShowModel) {

        if (a.name.includes(loweredSearchTerm)) {
            return -1
        }

        return 1
    }

    console.log(Date.now() - timeNow)

    return results
}


export default searchShows

