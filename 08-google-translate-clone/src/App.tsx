import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Form, Stack } from 'react-bootstrap';
import './App.css'
import { useStore } from './hooks/useStore';
import { AUTO_LANGUAGE } from './constants';
import { ArrowsIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';


function App() {
  const { fromLanguage, toLanguage, interchangeLanguages, setFromLanguage, setToLanguage } = useStore()
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
          <Form.Control 
            as="textarea" 
            placeholder="Introducir Texto" 
            autoFocus
            style={{ height: '150px'}}
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
            <Form.Control 
              as="textarea"
              disabled 
              placeholder="Traducción" 
              autoFocus
              style={{ height: '150px'}}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
