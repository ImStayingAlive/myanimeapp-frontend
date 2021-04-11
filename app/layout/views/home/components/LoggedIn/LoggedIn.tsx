import React from "react";
import {observer} from "mobx-react-lite";

import {userStore} from "../../../../../auth/AuthFacade";
import {showStore} from "../../../../../show/ShowFacade";

import ShowRow from "./ShowRow";
import TopSlider from "./topsplider/TopSplider";

const StartPageLoggedIn = observer(() => {

    const watchedShows = userStore.getWatchedShows()

    return (
        <div>
            <TopSlider />
            <div>
                {watchedShows.length > 0 && (
                    <ShowRow title={"Continue watching for " + userStore.user.name} dataSet={watchedShows}/>
                )}
                <ShowRow title="Recommended" dataSet={showStore.shows} link="/recommended"/>
                {userStore.watchLater.length > 0 && (
                    <ShowRow title={userStore.user.name + "'s Watch List"} dataSet={userStore.watchLater} link="/watch-list" />
                )}
            </div>
        </div>
    )
})

export default StartPageLoggedIn