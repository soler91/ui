'use strict'

const HOST = '127.0.0.69'

const Express = require('express')

let serverPort = 0,
	activeRouter = null

async function getServer(router) {
	activeRouter = router

	if(!serverPort) // Lazy-load
		serverPort = await new Promise((resolve, reject) => {
			const app = Express()
			.set('env', 'production')
			.enable('case sensitive routing')
			.disable('x-powered-by')
			.use((req, res, next) => { activeRouter(req, res, next) })
			.use((req, res) => { res.status(404).end() })
			.use((err, req, res, next) => {
				console.error(err)
				res.status(500).end()
			})
			.listen(0, HOST, () => { resolve(app.address().port) })
			.on('error', reject)
		})

	return `${HOST}:${serverPort}`
}

function UI(dispatch, options) {
	return UI.Router(dispatch, options)
}

Object.assign(UI, Express, {
	Router(dispatch, options) {
		const router = Express.Router(options)
		Object.setPrototypeOf(router, UI.Router.prototype)
		router.dispatch = dispatch
		return router
	}
})

UI.Router.prototype = Object.assign({}, Express.Router, {
	async open(path = '') {
		if(!path.startsWith('/')) path = '/' + path

		this.dispatch.toClient('S_OPEN_AWESOMIUM_WEB_URL', 1, {url: await getServer(this) + path})
	}
})

module.exports = UI