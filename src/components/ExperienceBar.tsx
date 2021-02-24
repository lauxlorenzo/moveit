import { useContext } from 'react';
import { ChallengesContext } from '../Contexts/ChallengesContext';


import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    // Pegando os Contexts 
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext)

    // Criando o perctentual até o próximo nível 
    const percetToNextLevel = Math.round(currentExperience) * 100 / experienceToNextLevel;

    // HTML da ExperienceBar
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percetToNextLevel}%` }} />

                <span className={styles.currentExperience} style={{ left: `${percetToNextLevel}%` }}>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}