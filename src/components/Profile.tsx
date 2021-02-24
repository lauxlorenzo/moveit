import { useContext } from 'react';
import { ChallengesContext } from '../Contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    // Pegando os Contexts
    const { level } = useContext(ChallengesContext)

    // HTML do Profile
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/lauxlorenzo.png" alt="" />
            <div>
                <strong>Lorenzo Laux</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}