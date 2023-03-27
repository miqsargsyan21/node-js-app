class RouteService {
  routes = {}

  pathToRegex = (path) => {
    const regex = path
        .replace(/\/:(\w+)/g, "/(?<$1>[^/]+)")
        .replace(/\/?$/, "/?")
    return new RegExp(`^${regex}$`)
  }

  addRoute(path, handleRoute, method) {
    const regexp = this.pathToRegex(path)

    this.routes[path] = {
        handleRoute,
        method,
        regexp
    }
  }

  get(path, handleRoute) {
    this.addRoute(path, handleRoute, 'GET')
  }

  post(path, handleRoute) {
    this.addRoute(path, handleRoute, 'POST')
  }

  put(path, handleRoute) {
    this.addRoute(path, handleRoute, 'PUT')
  }

  delete(path, handleRoute) {
    this.addRoute(path, handleRoute, 'DELETE')
  }

  patch(path, handleRoute) {
    this.addRoute(path, handleRoute, 'PATCH')
  }

  use(routeService) {
    if (!(routeService instanceof RouteService)) {
      throw new Error('RouteService instance is required')
    }

    this.routes = {
      ...this.routes,
      ...routeService.routes
    }
  }
}

module.exports = RouteService