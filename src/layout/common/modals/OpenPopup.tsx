import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {ShowModel, showPopupStore, showStore, unFormatURL} from "../../../app/show/ShowFacade";
import Head from "next/head";

const OpenPopup = () => {
    const router = useRouter()
    const showName = router.query.show

    useEffect(() => {
        if (showName != undefined) {
            showPopupStore.open(showStore.getShow(unFormatURL(showName)))
        }
    }, [])

    if (showPopupStore.show === undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Head>
            <title>{showPopupStore.show.displayName}</title>
            <meta property="og:title" content="MyAnimeApp: Watch Anime online!" />
            <meta property="og:description" content={showPopupStore.show.description} />
            <meta property="og:image" content={showPopupStore.show.background} />
            <meta property="og:url" content="https://anime.necrocloud.eu" />
        </Head>
    )
}

export default OpenPopup