import { OpenAI } from "openai";
import type { FromLaguage, Language } from "../types.d";
import { SUPPORTED_LANGUAGES } from "../constants";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export async function translateText({
    fromLanguage,
    toLanguage,
    text,
}: {
    fromLanguage: FromLaguage;
    toLanguage: Language;
    text: string;
}) {

    if (fromLanguage === toLanguage) return text

    const context = `
        You are an AI translator.

        Examples:
        Hola mundo {{Español}} [[English]] → Hello world
        How are you? {{auto}} [[Deutsch]] → Wie geht es dir?
        Bon dia, com estas? {{auto}} [[Español]] → Buenos días, ¿cómo estás?

        Translate the next input. Only return the translation.
        `;

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  const completion = await openai.responses.create({
    model: "gpt-3.5-turbo",
    input: [
        {
            role: "user",
            content: [
                {
                type: "input_text",
                text: `${context}\n\n${text} {{${fromCode}}} [[${toCode}]]`,
                },
            ],
        },
    ],
  });

    return completion.output_text;
}
