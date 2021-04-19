import {useRouter} from "next/router";
import {useEffect} from "react";
import {showPopupStore, showStore, unFormatURL} from "../../../app/show/ShowFacade";
import { NextSeo } from 'next-seo';

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
        <div>
            <NextSeo
                title={showPopupStore.show.displayName}
                description={showPopupStore.show.description}
                canonical="https://anime.necrocloud.eu"
                openGraph={{
                    type: 'website',
                    url: 'https://anime.necrocloud.eu',
                    title: showPopupStore.show.displayName,
                    description: showPopupStore.show.description,
                    images: [
                        {
                            url: showPopupStore.show.background,
                            alt: 'Show background image',
                        }
                    ],
                    site_name: 'MyAnimeAbb',
                }}
                twitter={{
                    handle: '@' + showPopupStore.show.displayName,
                    site: '@MyAnimeApp',
                    cardType: 'summary_large_image',
                }}
            />
        </div>
    )
}

export default OpenPopup