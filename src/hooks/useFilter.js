export const useFilter = () => {

    let result = []

    const applyFilter = (data, type, category, location) => {

        let cache = data
        result = data
        console.log(data,type,category,location)
        if (type) {
            result = cache.filter((item) => item.type === type)
            cache = result
        }
        if (category) {
            result = cache.filter((item) => item.category === category)
            cache = result
        }
        if (location) {
            result = cache.filter((item) => item.location === location)
            cache = result
        }
        return result
    }

    return {
        applyFilter,
    }

}