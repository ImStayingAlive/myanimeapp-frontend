import {useRouter} from "next/router";

const Show = () => {
    const router = useRouter()
    const { showName } = router.query

    return (
        <div>
            <h1 className="text-3xl">{showName}</h1>
        </div>
    )
}

export default Show