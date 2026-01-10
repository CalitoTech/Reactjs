import type { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants"

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLaguage = Language | AutoLanguage

export interface State {
  fromLanguage: FromLaguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type Action =
    | { type: 'INTERCHANGE_LANGUAGES' }
    | { type: 'SET_FROM_LANGUAGE'; payload: FromLaguage }
    | { type: 'SET_TO_LANGUAGE'; payload: Language }
    | { type: 'SET_FROM_TEXT'; payload: string }
    | { type: 'SET_RESULT'; payload: string }
    | { type: 'SET_LOADING' }

export enum SectionType {
    From = 'from',
    To = 'to',
}