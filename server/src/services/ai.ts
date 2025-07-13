import OpenAI from 'openai'
import { env } from '../env.ts'

// Configuração da OpenAI (se disponível)
const openai = env.OPENAI_API_KEY ? new OpenAI({
  apiKey: env.OPENAI_API_KEY,
}) : null

// Função para gerar resposta usando Ollama (gratuito e local)
async function generateAnswerWithOllama(question: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2', // ou 'mistral', 'codellama', etc.
        prompt: `Você é um assistente útil e amigável. Responda de forma clara e objetiva, sempre em português brasileiro.

Pergunta: ${question}

Resposta:`,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`)
    }

    const data = await response.json()
    return data.response || 'Desculpe, não consegui gerar uma resposta.'
  } catch (error) {
    console.error('Erro ao usar Ollama:', error)
    throw new Error('Ollama não está disponível. Instale em: https://ollama.ai')
  }
}

// Função para gerar resposta usando Hugging Face (gratuito)
async function generateAnswerWithHuggingFace(question: string): Promise<string> {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.HUGGING_FACE_TOKEN || 'hf_demo'}`,
        },
        body: JSON.stringify({
          inputs: question,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Hugging Face error: ${response.status}`)
    }

    const data = await response.json()
    return data[0]?.generated_text || 'Desculpe, não consegui gerar uma resposta.'
  } catch (error) {
    console.error('Erro ao usar Hugging Face:', error)
    throw new Error('Erro ao conectar com Hugging Face')
  }
}

// Função principal que tenta diferentes opções
export async function generateAnswer(question: string): Promise<string> {
  // Tenta OpenAI primeiro (se configurada)
  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Você é um assistente útil e amigável. Responda de forma clara e objetiva, sempre em português brasileiro."
          },
          {
            role: "user",
            content: question
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      })

      const answer = completion.choices[0]?.message?.content
      if (answer) return answer
    } catch (error) {
      console.error('Erro com OpenAI, tentando alternativa:', error)
    }
  }

  // Tenta Ollama (gratuito e local)
  try {
    return await generateAnswerWithOllama(question)
  } catch (error) {
    console.error('Ollama não disponível, tentando Hugging Face:', error)
  }

  // Tenta Hugging Face como última opção
  try {
    return await generateAnswerWithHuggingFace(question)
  } catch (error) {
    console.error('Todas as opções de IA falharam:', error)
    return 'Desculpe, não consegui processar sua pergunta no momento. Tente novamente mais tarde.'
  }
} 