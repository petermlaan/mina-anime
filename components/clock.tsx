import styles from "./clock.module.css";

export default function Clock() {
    return (
        <div className={styles.bigcircle}>
            <div className={styles.midcircle}></div>
            <div className={styles.seconds}></div>
            <div className={styles.minutes}></div>
            <div className={styles.hours}></div>
            <div className={styles.numbers}>
                <div className={styles.n1}>1</div>
                <div className={styles.n2}>2</div>
                <div className={styles.n3}>3</div>
                <div className={styles.n4}>4</div>
                <div className={styles.n5}>5</div>
                <div className={styles.n6}>6</div>
                <div className={styles.n7}>7</div>
                <div className={styles.n8}>8</div>
                <div className={styles.n9}>9</div>
                <div className={styles.n10}>10</div>
                <div className={styles.n11}>11</div>
                <div className={styles.n12}>12</div>
            </div>
            <div className={styles.ticks}>
                <div className={styles.tick1}></div>
                <div className={styles.tick2}></div>
                <div className={styles.tick3}></div>
                <div className={styles.tick4}></div>
                <div className={styles.tick5}></div>
                <div className={styles.tick6}></div>
                <div className={styles.tick7}></div>
                <div className={styles.tick8}></div>
                <div className={styles.tick9}></div>
                <div className={styles.tick10}></div>
                <div className={styles.tick11}></div>
                <div className={styles.tick12}></div>
            </div>
        </div>
    );
}
