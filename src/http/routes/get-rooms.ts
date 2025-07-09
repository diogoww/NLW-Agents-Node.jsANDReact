import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
    app.get('/rooms', () => {
        return 'hello world'
    })
}