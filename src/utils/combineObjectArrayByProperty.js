function combineObjectArrayByProperty(array, property) {
    const combinedObject = {};
    
    array.forEach(element => {
        const key = element[property];
        combinedObject[key] = element;
    });

    return combinedObject;
};

export { combineObjectArrayByProperty };