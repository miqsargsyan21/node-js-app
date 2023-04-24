class RouteService {
  routes = {}

  #pathToRegex = (path) => {
    const regex = path
        .replace(/\/:(\w+)/g, "/(?<$1>[^/]+)")
        .replace(/\/?$/, "/?")
    return new RegExp(`^${regex}$`)
  }

  #addRoute(path, handleRoute, method, middlewareList = []) {
    const regexp = this.#pathToRegex(path)

    this.routes[path] = {
      middlewareList,
      handleRoute,
      method,
      regexp,
    }
  }

  get(path, handleRoute) {
    this.#addRoute(path, handleRoute, 'GET')
  }

  post(path, handleRoute) {
    this.#addRoute(path, handleRoute, 'POST')
  }

  put(path, handleRoute) {
    this.#addRoute(path, handleRoute, 'PUT')
  }

  delete(path, handleRoute) {
    this.#addRoute(path, handleRoute, 'DELETE')
  }

  patch(path, handleRoute) {
    this.#addRoute(path, handleRoute, 'PATCH')
  }

  use(...args) {
    if (args.length < 2) {
      throw new Error('Arguments are required')
    }

    const [path, ...restArgs] = args
    const routeService = restArgs.pop()
    const middlewareList = restArgs

    if (!(routeService instanceof RouteService)) {
      throw new Error('RouteService instance is required')
    }

    Object.keys(routeService.routes).forEach(key => {
      const newKey = `${path}${key === '/' ? '' : key}`
      const {handleRoute, method} = routeService.routes[key]

      this.#addRoute(newKey, handleRoute, method, middlewareList)
    })
  }
}

module.exports = RouteService