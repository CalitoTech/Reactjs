import { Form } from "react-bootstrap"
import { SectionType } from "../types.d";

interface Props {
    type: SectionType
    loading: boolean
    value: string
    disabled?: boolean
    onChange: (value: string) => void
}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
    
    const getPlaceholder = ({ type, loading }: { type: SectionType, loading: boolean }) => {
        if (type === SectionType.From) return 'Escribe el texto'
        if (loading === true) return 'Cargando...'
        return 'Traducción'
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    }

    return (
        <Form.Control 
            as="textarea" 
            placeholder={getPlaceholder({ type, loading })} 
            autoFocus={type === SectionType.From}
            disabled={type === SectionType.To}
            value={value}
            onChange={handleChange}
            style={{ height: '150px', border:'0px', resize:'none'}}
        />
    )
}