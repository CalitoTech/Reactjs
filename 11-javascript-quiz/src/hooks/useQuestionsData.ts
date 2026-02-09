import { useQuestionsStore } from "../store/questions"

export const useQuestionsData = () => {
    const questions = useQuestionsStore((state) => state.questions)

    let correctAnswers = 0
    let incorrectAnswers = 0
    let notAnswered = 0

    questions.forEach(q => {
        const { isCorrectUserAnswer, userSelectedAnswer } = q

        if (userSelectedAnswer === undefined) {
            notAnswered++
        } else if (isCorrectUserAnswer) {
            correctAnswers++
        } else {
            incorrectAnswers++
        }
    })
    return { correctAnswers, incorrectAnswers, notAnswered }
} 