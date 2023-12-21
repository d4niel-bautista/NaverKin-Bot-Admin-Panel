function determineRange(arrayOfRanges, number) {
    let validRange = arrayOfRanges[0];
    arrayOfRanges.forEach((range) => {
        const min = range.split("-")[0];
        const max = range.split("-")[1];
        if (min <= number && number <= max) {
            validRange = range;
            return;
        }
    });

    return validRange;
};

export { determineRange };