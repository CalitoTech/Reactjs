import { useReducer } from 'react';
import type { Action, FromLaguage, Language, State } from '../types.d';
import { AUTO_LANGUAGE } from '../constants';

export const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
}

export function reducer (state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {

    if (state.fromLanguage === AUTO_LANGUAGE) return state

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      fromText: state.result,
      result: state.fromText,
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload,
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload,
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      fromText: action.payload,
      loading: true,
      result: '',
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      result: action.payload,
      loading: false,
    }
  }

  if (type === 'SET_LOADING') {
    return {
      ...state,
      loading: true,
    }
  }

  return state
}

export function useStore() {
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
    }, dispatch] = useReducer(reducer, initialState)

    const interchangeLanguages = () => {
        dispatch({ type: 'INTERCHANGE_LANGUAGES' })
    }

    const setFromLanguage = (payload: FromLaguage) => {
        dispatch({ type: 'SET_FROM_LANGUAGE', payload })
    }

    const setToLanguage = (payload: Language) => {
        dispatch({ type: 'SET_TO_LANGUAGE', payload })
    }
    const setFromText = (payload: string) => {
        dispatch({ type: 'SET_FROM_TEXT', payload })
    }

    const setResult = (payload: string) => {
        dispatch({ type: 'SET_RESULT', payload })
    }

    const setLoading = () => {
        dispatch({ type: 'SET_LOADING' })
    }

    return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult,
        setLoading,
    }
}