import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z }  from 'zod/v4'
import { eq } from "drizzle-orm"
import { schema } from "../../db/schema/index.ts"
import { db } from "../../db/connection.ts"
import { generateAnswer } from "../../services/ai.ts"

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
    app.post('/rooms/:roomId/questions', {
        schema: {
            params: z.object({
                    roomId: z.string(),
            }),
            body: z.object({
                question: z.string().min(2),
            })
        }
    },
    
    async (request, reply) => {
            const { roomId } = request.params
            const { question } = request.body

            // Primeiro, salva a pergunta no banco
            const result = await db.insert(schema.questions)
            .values({ question, roomId })
            .returning()

            const insertedQuestion = result[0]

            if (!insertedQuestion) {
                throw new Error('Failed to create new question...')
            }

            // Gera resposta com IA em background (não bloqueia a resposta)
            generateAnswer(question)
                .then(async (answer) => {
                    // Atualiza a pergunta com a resposta gerada
                    await db.update(schema.questions)
                        .set({ answer })
                        .where(eq(schema.questions.id, insertedQuestion.id))
                })
                .catch((error) => {
                    console.error('Erro ao gerar resposta:', error)
                    // Em caso de erro, pode salvar um log ou notificar
                })

            return reply.status(201).send({ 
                questionId: insertedQuestion.id,
                answer: null // Resposta será atualizada em background
            })
        }
    )
}