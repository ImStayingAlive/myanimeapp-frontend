import {useRouter} from "next/router";
import {useEffect} from "react";
import {showPopupStore, showStore, unFormatURL} from "../../../app/show/ShowFacade";

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
            <div />
        )
    }

    return (
        <div />
    )
}

export default OpenPopup