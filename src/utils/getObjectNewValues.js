function getObjectNewValues(oldObj, newObj) {
    const updatedValues = {};
    for (const key in newObj) {
        if (oldObj.hasOwnProperty(key) && oldObj[key] !== newObj[key]) {
            updatedValues[key] = newObj[key];
        }
    }
    return updatedValues;
};

export { getObjectNewValues };