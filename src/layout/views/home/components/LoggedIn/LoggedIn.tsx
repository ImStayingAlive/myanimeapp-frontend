import React from "react";
import {observer} from "mobx-react-lite";
import ShowRow from "./ShowRow";
import TopSlider from "./topsplider/TopSplider";
import {userStore} from "../../../../../app/auth/AuthFacade";
import {showStore} from "../../../../../app/show/ShowFacade";

const StartPageLoggedIn = observer(() => {

    return (
        <div>
            <TopSlider/>
            <ShowRow title={"Continue watching for " + userStore.user.name} dataSet={showStore.continueWatching}/>
            <ShowRow title={"Recently Added"} dataSet={showStore.recentlyAdded} link="/recently-added"/>
            <ShowRow title={"Your watch list"} dataSet={userStore.watchLater} link="/watch-list"/>
            <ShowRow title={"Recommended for you"} dataSet={showStore.recommended} link="/recommended"/>
            <ShowRow title={"New Seasons"} dataSet={showStore.newSeasons} link="/new-seasons"/>
        </div>
    )
})

export default StartPageLoggedIn