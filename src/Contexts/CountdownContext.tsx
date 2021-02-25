import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownProviderProps {
    children: ReactNode;
}

// Define as propriedades das Props
interface CountdownContextData {
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountdown: () => void,
    resetCountdown: () => void
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
     //Cria os estados
     const [time, setTime] = useState(0.1 * 60);
     const [isActive, setIsActive] = useState(false);
     const [hasFinished, setHasFinished] = useState(false);
 
     const { startNewChallenge } = useContext(ChallengesContext);
 
 
     // Cria os minutos e segundos
     const minutes = Math.floor(time / 60);
     const seconds = time % 60;

     // Inicia o Contador
    function startCountdown() {
        setIsActive(true);
    }

    // Reseta o Contador
    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
        setHasFinished(false);
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


    // Retorna as propriedades do Contexto
    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}