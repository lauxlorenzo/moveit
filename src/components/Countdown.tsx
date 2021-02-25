import { useContext } from 'react';
import { CountdownContext } from '../Contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'


let countdownTimeout: NodeJS.Timeout;


export function Countdown() {
    const { 
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountdown, 
        resetCountdown 
    } = useContext(CountdownContext)
   
    // Separando os minutos e segundos em direita e esquerda
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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