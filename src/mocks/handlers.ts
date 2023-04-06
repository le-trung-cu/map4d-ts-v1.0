// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', null),

  // Handles a GET /user request
  rest.get('/user', null),

  rest.get('/data-layers/:id/objects/count', (req, res, ctx) => {
    const id = req.params.id
    if(id === '1' || id === '3') {
      return res(ctx.json({
        count: 10
      }))
    } 
    return res(ctx.json({
      count: 5
    }))
  }),

  rest.get('/data-layers/:id/objects', async (req, res, ctx) => {
    await new Promise((res,rej) => setTimeout(res, 2000))
    const id = req.params.id
    const page = parseInt(req.url.searchParams.get('page') as string)
    return res(ctx.json({
      layerId: id,
      page: page
    }))
  })
]