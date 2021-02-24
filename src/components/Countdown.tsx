import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../Contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css'


let countdownTimeout: NodeJS.Timeout;


export function Countdown() {
    //Criando os estados
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const { startNewChallenge } = useContext(ChallengesContext);


    // Criando os minutos e segundos
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;


    // Separando os minutos e segundos em direita e esquerda
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    // Iniciando o Contador
    function startCountdown() {
        setIsActive(true);
    }

    // Resetar o Contador
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    }

    // Funcionalidade do contador
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])


    // HTML do contador 
    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}
            >
                Clico encerrado
            </button>
            ) : (
                <>
                    { isActive ? (
                <button
                    type="button"
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                >
                    Abandonar ciclo
                </button>
                ) : (
                    <button
                        type="button"
                        className={styles.countdownButton}
                        onClick={startCountdown}
                    >
                        Iniciar um ciclo
                    </button>
            ) }
                </>
            )}

            
        </div>
    );
}