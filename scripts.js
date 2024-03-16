const buttons = document.querySelectorAll('.buttons button');
const display = document.querySelector('.display');
const swipeableButtons = document.querySelectorAll('.operator:not(:last-child)');

let currentValue = '';
let previousValue = '';
let operation = null;
let result = null;

constupdateDisplay = () => {
    display.value = currentValue;
};

const handleNumberClick = (event) => {
    const value = event.target.value;
    currentValue += value;
    updateDisplay();
};

const handleOperatorClick = (event) => {
    const value = event.target.value;
    if (operation !== null || result !== null) {
        previousValue = currentValue;
        currentValue = '';
        operation = value;
    } else {
        previousValue = '';
        currentValue = '';
        operation = value;
    }
    updateDisplay();
};

const handleEqualClick = () => {
    if (operation === null || currentValue === '') return;
    try {
        result = eval(previousValue + operation + currentValue);
        currentValue = result.toString();
        operation = null;
        result = null;
    } catch (error) {
        currentValue = 'Error';
        operation = null;
        result = null;
    }
    updateDisplay();
};

const handleSwipe = (event, button) => {
    const swipeThreshold = 50;
    const { clientX, target } = event;
    const initialX = clientX;
    const initialLeft = target.style.left || '0px';
    let swiping = true;

    const swipeHandler = (event) => {
        const { clientX } = event;
        const diffX = initialX - clientX;

        if (diffX > swipeThreshold && swiping) {
            swiping = false;
            target.style.left = initialLeft;
            showFunctionSuggestions(button);
        }
    };

    const upHandler = () => {
        document.removeEventListener('mousemove', swipeHandler);
        document.removeEventListener('mouseup', upHandler);
    };

    document.addEventListener('mousemove', swipeHandler);
    document.addEventListener('mouseup', upHandler);
};

const showFunctionSuggestions = (button) => {
    const suggestions = document.createElement('div');
    suggestions.classList.add('suggestions');

    const sin= document.createElement('button');
    sin.value = 'sin';
    sin.innerText = 'sin';
    suggestions.appendChild(sin);

    const sinInv = document.createElement('button');
    sinInv.value = 'sin⁻¹';
    sinInv.innerText = 'sin⁻¹';
    suggestions.appendChild(sinInv);

    const sinh = document.createElement('button');
    sinh.value = 'sinh';
    sinh.innerText = 'sinh';
    suggestions.appendChild(sinh);

    const cos = document.createElement('button');
    cos.value = 'cos';
    cos.innerText = 'cos';
    suggestions.appendChild(cos);

    const cosInv = document.createElement('button');
    cosInv.value = 'cos⁻¹';
    cosInv.innerText = 'cos⁻¹';
    suggestions.appendChild(cosInv);

    const cosh = document.createElement('button');
    cosh.value = 'cosh';
    cosh.innerText = 'cosh';
    suggestions.appendChild(cosh);

    const tan = document.createElement('button');
    tan.value = 'tan';
    tan.innerText = 'tan';
    suggestions.appendChild(tan);

    const tanInv = document.createElement('button');
    tanInv.value = 'tan⁻¹';
    tanInv.innerText = 'tan⁻¹';
    suggestions.appendChild(tanInv);

    const tanh = document.createElement('button');
    tanh.value = 'tanh';
    tanh.innerText = 'tanh';
    suggestions.appendChild(tanh);

    const xSquare = document.createElement('button');
    xSquare.value = 'x²';
    xSquare.innerText = 'x²';
    suggestions.appendChild(xSquare);

    const xCube = document.createElement('button');
    xCube.value = 'x³';
    xCube.innerText = 'x³';
    suggestions.appendChild(xCube);

    const squareRoot = document.createElement('button');
   squareRoot.value = '√x';
    squareRoot.innerText = '√x';
    suggestions.appendChild(squareRoot);

    const cubeRoot = document.createElement('button');
    cubeRoot.value = '3√x';
    cubeRoot.innerText = '3√x';
    suggestions.appendChild(cubeRoot);

    const ythRoot = document.createElement('button');
    ythRoot.value = 'ʸ√x';
    ythRoot.innerText = 'ʸ√x';
    suggestions.appendChild(ythRoot);

    const ln = document.createElement('button');
    ln.value = 'ln';
    ln.innerText = 'ln';
    suggestions.appendChild(ln);

    const log = document.createElement('button');
    log.value = 'logy';
    log.innerText = 'logy';
    suggestions.appendChild(log);

    button.parentNode.insertBefore(suggestions, button.nextSibling);

    suggestions.addEventListener('click', (event) => {
        if (event.target.tagName.toLowerCase() === 'button') {
            currentValue = event.target.value;
            updateDisplay();
            suggestions.remove();
        }
    });
};

buttons.forEach((button) => {
    if (button.matches('.number')) {
        button.addEventListener('click', handleNumberClick);
    } else if (button.matches('.operator')) {
        button.addEventListener('click', handleOperatorClick);
    } else if (button.matches('.equals')) {
        button.addEventListener('click', handleEqualClick);
    }

    if (button.matches('.operator:not(:last-child)')) {
        button.addEventListener('mousedown', (event) => {
            handleSwipe(event, button);
        });
    }
});