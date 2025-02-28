import styles from "./genres.module.css";

export function Genres({ genres }: { genres: string[] }) {
    return (
        <div className={styles.genres}>
            {genres.map((g, i) => (
                <div key={i} className={styles.genre}>{g}</div>
            ))}
        </div>
    );
}
