let inputValue = 0;
const invalidInputMessage = "Invalid value entered! Please enter numbers only.";
const defaultMessage = "Please enter a value above.";
const numbersOnlyRegex = /^[0-9]+$/;

// Imperial to metric conversion ratios
const FEET_TO_METER = 0.3048;
const GALLON_TO_LITER = 3.78541;
const POUND_TO_KILOGRAM = 0.453592;

const inputElement = document.getElementById("input-el");

const lengthEl = document.getElementById("length-el");
const volumeEl = document.getElementById("volume-el");
const massEl = document.getElementById("mass-el");

const resultElements = document.getElementsByClassName("result");

const convertValues = () => {
    inputValue = inputElement.value;

    if (inputValue) {
        if(inputValue.match(numbersOnlyRegex)) {
            lengthEl.textContent = createResultString("feet", "meter", FEET_TO_METER, inputValue);
            volumeEl.textContent = createResultString("gallon", "liter", GALLON_TO_LITER, inputValue);
            massEl.textContent = createResultString("pound", "kilogram", POUND_TO_KILOGRAM, inputValue);
        } else {
            setAllResultsTo(invalidInputMessage);
        }
    } else {
        setAllResultsTo(defaultMessage);
    }
}

const createResultString = (imperialUnitName, metricUnitName, conversionRatio, inputValue) => {
    const imperialResult = pluralize((inputValue / conversionRatio).toFixed(3), imperialUnitName);
    const metricResult = pluralize((inputValue * conversionRatio).toFixed(3), metricUnitName);

    return `${pluralize(inputValue, metricUnitName)} = ${imperialResult} | ${pluralize(inputValue, imperialUnitName)} = ${metricResult}`;
}

// TODO: refactor this in the future to make adding additional units easier
const pluralize = (value, unitName) => {
    if (value == 1 && unitName == "feet") {
        unitName = "foot";
    } else if(value != 1 && unitName != "feet") {
        unitName += "s";
    }

    return `${value} ${unitName}`;
}

const setAllResultsTo = (str) => {
    [...resultElements].forEach(element => {
        element.textContent = str;
    });
}

inputElement.focus();