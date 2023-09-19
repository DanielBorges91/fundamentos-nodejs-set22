import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'


const server = http.createServer(async (request, response) => {
    const { method, url } = request

    await json(request, response)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    // console.log(route)

    if(route) {
        const routeParms = request.url.match(route.path)
        // console.log(routeParms.groups)

        const params = { ...routeParms.groups }
        request.params = params
        // console.log(params)

        return route.handler(request, response)
    }

    return response.writeHead(404).end()
})

server.listen(3333)