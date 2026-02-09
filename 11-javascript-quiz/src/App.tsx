import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './Game'

function App() {
  const questions = useQuestionsStore((state) => state.questions)

  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>
        
        {questions.length === 0 && (
          <Stack alignItems="center" mt={4}>
            <Start />
          </Stack>
        )}

        {questions.length > 0 && (
          <>
          <Typography variant="h5" component="h2" textAlign="center" mt={4}>
            Responde las siguientes preguntas:
          </Typography>
          <Game />
          </>
        )}
      </Container>
    </main>
  )
}

export default App
