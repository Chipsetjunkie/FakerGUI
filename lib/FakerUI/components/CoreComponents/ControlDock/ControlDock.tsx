import styles from "./ControlDock.module.scss";

//assets
import SaveIcon from "@lib/FakerUI/assets/save.svg";
import LoadIcon from "@lib/FakerUI/assets/load.svg";
import GenerateIcon from "@lib/FakerUI/assets/generate.svg";
import ShowIcon from "@lib/FakerUI/assets/show.svg";

import { useState } from "react";

interface ControlDockProps {
    loadData: () => void;
    generateData: () => void;
    saveSchema: () => void;
    // togglePane: () => void;
    // isMobile: boolean;
    count: number;
    updateCount: (p: number) => void;
}

// TODO: Add layout props, move styles to stylesheet

export default function ControlDock({
    generateData,
    saveSchema,
    loadData,
    count,
    updateCount,
}: Readonly<ControlDockProps>) {
    const [show, setShow] = useState(false);


    return (<div className={`${styles.control_dock_root_container} ${show ? styles.control_dock_root_container__expanded : styles.control_dock_root_container__collapsed}`}>
        <div
            className={`${styles.control_dock_container} ${show ? styles.control_dock_container__show : ""
                }`}
        >
            <div>
                <button
                    onClick={generateData}
                    className={`${styles.control_button} ${styles.generate_button}`}
                >
                    <img
                        src={GenerateIcon}
                        className={styles.control_button__icon}
                    />
                </button>
            </div>

            <div className={styles.docker_show_button_container}>
                <button
                    className={`${styles.show_button} ${show ? styles.show_button__active : ""
                        }`}
                    onClick={() => setShow((prev) => !prev)}
                >
                    <img src={ShowIcon} className={`${styles.show_button__icon}`} />{" "}
                </button>
            </div>


            <div className={styles.separator} />

            <div className={styles.right_side_controller}>
                <button className={styles.control_button} onClick={loadData}>
                    <img src={LoadIcon} className={styles.control_button__icon} />
                </button>


                <button className={styles.control_button} onClick={saveSchema}>
                    <img src={SaveIcon} className={styles.control_button__icon} />{" "}
                </button>

                <div className={styles.datapoint_count_input}>
                    <div className={styles.count_input_tag}>
                        <p>count</p>
                    </div>
                    <div style={{ padding: "4px", fontFamily: "monospace", color: "white", fontSize: "16px", background: "transparent", display: "flex", flex: 0.75 }}>
                        <input value={count} onChange={e => updateCount(+e.target.value)} />
                    </div>
                </div>



            </div>

        </div>
    </div>

    );
}
