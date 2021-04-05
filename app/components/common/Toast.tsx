import {ToastContainer} from "react-toastify";

const Toast = () => {

    return (
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            limit={4}
        />
    )
}

export default Toast