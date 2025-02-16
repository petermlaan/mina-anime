import styles from "./genres.module.css";
import { JikanResource } from '@tutkli/jikan-ts';

export function Genres({ genres }: { genres: JikanResource[] }) {
    return (
        <div className={styles.genres}>
            {genres.map((g, i) => (
                <div key={i} className={styles.genre}>{g.name}</div>
            ))}
        </div>
    );
}
