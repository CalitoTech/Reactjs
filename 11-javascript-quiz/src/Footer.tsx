import { Button } from '@mui/material';
import { useQuestionsData } from './hooks/useQuestionsData';
import { useQuestionsStore } from './store/questions';

export const Footer = () => {
    const { correctAnswers, incorrectAnswers, notAnswered } = useQuestionsData()
    const reset = useQuestionsStore((state) => state.reset)

    return (
        <footer style={{marginTop: '16px'}}>
            <strong>{` ✅ ${correctAnswers} correctas | ❌ ${incorrectAnswers} incorrectas | ❓ ${notAnswered} sin responder`}</strong>
            <div style={{marginTop: '20px'}}>
                <Button onClick={() => reset()}>
                    Reiniciar Quiz
                </Button>
            </div>
        </footer>
    )
}