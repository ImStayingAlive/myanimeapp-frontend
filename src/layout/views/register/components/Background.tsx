import styles from "../../../../styles/module/Register.module.css";
import {SplideSlide} from '@splidejs/react-splide';

const Background = (props) => {

    return (
        <SplideSlide>
            <div className="relative min-h-screen min-w-full">
                <div className={styles.topSection}>
                    <img className={"min-h-screen min-w-full z-0 " + styles.backDrop} src={props.link} alt="" />
                </div>
            </div>
        </SplideSlide>
    )
}

export default Background