const groupObjectsByValue = (arrayOfObjects, property) => {
    const groupedByValue = arrayOfObjects.reduce((result, obj) => {
        const value = obj[property];

        result[value] = result[value] || [];
        result[value].push(obj);

        return result;
    }, {});

    return groupedByValue;
};

export { groupObjectsByValue };