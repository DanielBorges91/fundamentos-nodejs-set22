export function buildRoutePath(path) {
    const routeParametrsRegex = /:([a-zA-Z]+)/g
    const pathWithParamss = path.replaceAll(routeParametrsRegex, '(?<$1>[a-z0-9\-_]+)')

    // console.log(Array.from(path.matchAll(routeParametrsRegex)))
    // console.log(path)

    const pathRegex = new RegExp(`^${pathWithParamss}(?<query>\\?(.*))?$`)

    return pathRegex
}