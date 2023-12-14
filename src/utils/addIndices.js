function addIndices(arrayOfObjects) {
    for (let i = 1; i <= arrayOfObjects.length; i++) {
        arrayOfObjects[i - 1].index = i;
    }
};

export { addIndices };