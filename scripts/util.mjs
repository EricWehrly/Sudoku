const Util = {
    AssertProperty(collection, property, object) {

        if (!collection[property]) {
            console.error(collection);
            if(object) {
                console.error(`${object.constructor.name} missing ${property}`);
                console.error(object);
            }
            return false;
        }

        return true;
    }
}

export default Util;
