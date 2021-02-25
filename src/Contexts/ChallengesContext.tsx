import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';


// Cria a interface do Challege
interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

// Cria a interface das funcionalidades dentro do Contexto
interface ChallengesContextData {
    level: number;
    currentExperience: number; 
    challengesCompleted: number; 
    experienceToNextLevel: number; 
    activeChallenge: Challenge; 
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

// Cria o Contexto
export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
    children: ReactNode;
}

// O que há dentro do contexto
export function ChallengesProvider({ children }:ChallengesProviderProps) {
    // Cria os States
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [activeChallenge, setActiveChallege] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    // Função de Level UP
    function levelUp() {
        setLevel(level + 1);
    }

    // Função que pega um novo Challenge
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallege(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    // Função que reseta o Challenge
    function resetChallenge() {
        setActiveChallege(null);
    }

    // Função para Challenges completados
    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallege(null);
        setChallengesCompleted(challengesCompleted + 1);
    }


    // Retorno do contexto 
    return (
        <ChallengesContext.Provider 
            value={{ 
                    level, 
                    currentExperience, 
                    challengesCompleted, 
                    levelUp,
                    startNewChallenge,
                    activeChallenge,
                    resetChallenge,
                    experienceToNextLevel,
                    completeChallenge
                }}
            >
            { children }
        </ChallengesContext.Provider>
    );
}