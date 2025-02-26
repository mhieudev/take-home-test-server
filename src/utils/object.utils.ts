export class ObjectUtils {
  static getIn(obj: any, path: string, def?: any) {
    try {
      /**
       * If the path is a string, convert it to an array
       * @param  {String|Array} path The path
       * @return {Array}             The path array
       */
      var stringToPath = function (path: string) {
        // If the path isn't a string, return it
        if (typeof path !== 'string') return path
        // Create new array
        var output: any = []
        // Split to an array with dot notation
        path.split('.').forEach(function (item, index) {
          // Split to an array with bracket notation
          item.split(/\[([^}]+)\]/g).forEach(function (key) {
            // Push to the new array
            if (key.length > 0) {
              output.push(key)
            }
          })
        })
        return output
      }

      // Get the path as an array
      path = stringToPath(path)
      // Cache the current object
      var current: any = obj
      // For each item in the path, dig into the object
      for (var i = 0; i < path.length; i++) {
        // If the item isn't found, return the default (or null)
        if (typeof current[path[i]] === 'undefined') return def
        // Otherwise, update the current  value
        current = current[path[i]]
      }
      return current
    } catch (error) {
      return
    }
  }

  static cleanObj(obj: any) {
    obj = obj || {}
    return Object.keys(obj).reduce((acc, key) => (obj[key] === undefined || obj[key] === null || obj[key] === '' ? acc : { ...acc, [key]: obj[key] }), {})
  }

  static isEmptyObj(obj: object) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false
    }
    return JSON.stringify(obj) === JSON.stringify({})
  }

  static isHasValue(obj: object) {
    return !this.isEmptyObj(obj)
  }

  static selects(obj: any, keys: string[]) {
    return keys.reduce((acc: any, key) => {
      acc[key] = obj[key]
      return acc
    }, {})
  }

  static getKeyByValue<T>(object: T, value: any): keyof T {
    return Object.keys(object as any).find((key) => (object as any)[key] === value) as any
  }
}
