import {useRouter} from "next/router";
import {useEffect} from "react";
import showPopupStore from "../../../stores/shows/ShowPopupStore";
import {showState, unFormatURL} from "../../../stores/shows/ShowStore";

const OpenPopup = () => {
    const router = useRouter()
    const showName = router.query.show

    useEffect(() => {
        if (showName != undefined) {
            showPopupStore.open(showState.getShow(unFormatURL(showName)))
        }
    }, [])

    return (<div/>)
}

export default OpenPopup