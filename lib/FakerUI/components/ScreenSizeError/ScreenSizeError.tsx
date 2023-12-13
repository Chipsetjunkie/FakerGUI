import React from 'react'
import Toast from '../Toast'
import { MINIMUM_SCREEN_THRESHOLD } from '../../utils/constants'
import styles from "./ScreenSizerError.module.scss"

export default function ScreenSizeError() {
    return window.innerWidth < MINIMUM_SCREEN_THRESHOLD ? <div className={styles.screen_error_element}>
        <Toast text={"Not optimised for mobile/tab screen"} type="error" />
    </div> : null
}




