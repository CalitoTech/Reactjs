import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import './App.css'
import { useStore } from './hooks/useStore';
import { AUTO_LANGUAGE } from './constants';
import { ArrowsIcon, CopyIcon, VoiceIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';
import { useEffect } from 'react';
import { translateText } from './services/translate';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const { fromLanguage, toLanguage, fromText, result, interchangeLanguages, setFromLanguage, 
    setToLanguage, setFromText, setResult, loading } = useStore()

  const debouncedFromText = useDebounce(fromText, 500);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = toLanguage
    speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    if (debouncedFromText === '') return

    translateText({ fromLanguage,toLanguage,text: debouncedFromText })

    .then(result => {
      if (result == null) return
      setResult(result)
    })

    .catch(err => {
      console.error(err)
      setResult('Error al traducir el texto')
    })
  }, [debouncedFromText, fromLanguage, toLanguage, setResult]);
  
  return (
    <Container fluid>
      <h2>Google Translate</h2>

      <Row>
        <Col>
        <Stack gap={2}>
          <LanguageSelector 
            onChange={setFromLanguage} 
            type={SectionType.From}
            value={fromLanguage}
          />
          <TextArea 
            type={SectionType.From}
            loading={loading}
            value={fromText}
            onChange={setFromText}
          />
        </Stack>
        </Col>
        <Col xs="auto">
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector 
              onChange={setToLanguage} 
              type={SectionType.To}
              value={toLanguage}
            />
            <div style={{position: 'relative'}}>
              <TextArea
                type={SectionType.To}
                loading={loading}
                value={result}
                onChange={setResult}
              />
              <div style={{ position: 'absolute', bottom: '0px', left: '0px' }}>
                <Button
                  variant='link'
                  onClick={handleCopy}>
                  <CopyIcon />
                </Button>
                <Button
                  variant='link'
                  onClick={handleSpeak}>
                  <VoiceIcon/>
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
