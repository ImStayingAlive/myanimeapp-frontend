import React from "react";
import ShowRow from "../../components/frontpage/ShowRow";
import { showState } from "../../stores/shows/ShowStore";
import userStore from "../../stores/UserStore";
import {observer} from "mobx-react-lite";
import TopSlider from "../../components/frontpage/topsplider/TopSplider";

const StartPageLoggedIn = observer(() => {

    const watchedShows = userStore.getWatchedShows()

    return (
        <div>
            <TopSlider />
            <div>
                {watchedShows.length > 0 && (
                    <ShowRow title={"Continue watching for " + userStore.user.name} dataSet={watchedShows}/>
                )}
                <ShowRow title="Recommended" dataSet={showState.shows} link="/recommended"/>
                {userStore.watchLater.length > 0 && (
                    <ShowRow title={userStore.user.name + "'s Watch List"} dataSet={userStore.watchLater} link="/watch-list" />
                )}
            </div>
        </div>
    )
})

export default StartPageLoggedIn