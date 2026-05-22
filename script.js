let display = document.getElementById('display');

function appendNumber(num) {
    if (display.value === '0') {
        display.value = num;
    } else {
        display.value += num;
    }
}

function appendOperator(operator) {
    // Prevent multiple operators in a row
    if (display.value === '') return;
    
    const lastChar = display.value[display.value.length - 1];
    if (['+', '-', '×', '/'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

function appendDecimal(dot) {
    // Get the current number (after the last operator)
    const lastOperatorIndex = Math.max(
        display.value.lastIndexOf('+'),
        display.value.lastIndexOf('-'),
        display.value.lastIndexOf('×'),
        display.value.lastIndexOf('/')
    );
    
    const currentNumber = display.value.substring(lastOperatorIndex + 1);
    
    // Only add decimal if there isn't one already in the current number
    if (!currentNumber.includes('.')) {
        if (currentNumber === '') {
            display.value += '0.';
        } else {
            display.value += dot;
        }
    }
}

function deleteLastChar() {
    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    try {
        let expression = display.value;
        
        // Replace × and − with * and - for JavaScript evaluation
        expression = expression.replace(/×/g, '*').replace(/−/g, '-');
        
        // Prevent empty expression
        if (expression === '') return;
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Display the result
        display.value = result;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

// Allow keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        if (key === '*') {
            appendOperator('×');
        } else if (key === '-') {
            appendOperator('−');
        } else {
            appendOperator(key);
        }
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLastChar();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
