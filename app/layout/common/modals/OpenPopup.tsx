import {useRouter} from "next/router";
import {useEffect} from "react";
import showPopupStore from "../../../show/popup/ShowPopupStore";
import {showStore, unFormatURL} from "../../../show/ShowFacade";

const OpenPopup = () => {
    const router = useRouter()
    const showName = router.query.show

    useEffect(() => {
        if (showName != undefined) {
            showPopupStore.open(showStore.getShow(unFormatURL(showName)))
        }
    }, [])

    return (<div/>)
}

export default OpenPopup