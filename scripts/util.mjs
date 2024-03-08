// export default {
const Util = {
    AssertProperty(collection, property, object) {

        if (!collection[property]) {
            console.error(`${object.constructor.name} missing ${property}`);
            console.error(collection);
            console.error(object);
            return false;
        }

        return true;
    }
}

export default Util;
