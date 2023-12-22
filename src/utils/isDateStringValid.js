import moment from 'moment';

const parseDate = (dateString, delimiter, dayMonthYearNotation = false) => {
    const dateValues = { "day": "01", "month": "01", "year": "0001" };
    if (dayMonthYearNotation) {
        const extractedValues = dateString.split(delimiter);
        dateValues["day"] = extractedValues[0];
        dateValues["month"] = extractedValues[1];
        dateValues["year"] = extractedValues[2];
    } else {
        const extractedValues = dateString.split(delimiter);
        dateValues["day"] = extractedValues[2];
        dateValues["month"] = extractedValues[1];
        dateValues["year"] = extractedValues[0];
    }

    const extractedDate = `${dateValues["year"]}-${dateValues["month"]}-${dateValues["day"]}`;

    return moment(extractedDate, "YYYY-MM-DD", true).isValid();
};

const dateFormats = [
    {
        "format": /^\d{4}-\d{2}-\d{2}$/,      // YYYY-MM-DD
        "isValid": (dateString, delimiter = "-", dayMonthYearNotation = false) => parseDate(dateString, delimiter, dayMonthYearNotation)
    },
    {
        "format": /^\d{4}\/\d{2}\/\d{2}$/,    // YYYY/MM/DD
        "isValid": (dateString, delimiter = "/", dayMonthYearNotation = false) => parseDate(dateString, delimiter, dayMonthYearNotation)
    },
    {
        "format": /^\d{2}-\d{2}-\d{4}$/,      // DD-MM-YYYY
        "isValid": (dateString, delimiter = "-", dayMonthYearNotation = true) => parseDate(dateString, delimiter, dayMonthYearNotation)
    },
    {
        "format": /^\d{2}\/\d{2}\/\d{4}$/,    // DD/MM/YYYY
        "isValid": (dateString, delimiter = "/", dayMonthYearNotation = true) => parseDate(dateString, delimiter, dayMonthYearNotation)
    },
];

function isDateStringValid(dateString) {
    for (const dateFormat of dateFormats) {
        if (dateString.match(dateFormat.format)) {
            return dateFormat.isValid(dateString);
        };
    }

    return false;
}

export { isDateStringValid };