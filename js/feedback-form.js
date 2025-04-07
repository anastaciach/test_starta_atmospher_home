class FormsValidation {
    selectors = {
        form: '[data-js-form]',
        fieldErrors: '[data-js-form-field-errors]'
    }

    errorMessages = {
        valueMissing: () => 'Обязательно к заполнению',
        patternMismatch: ({ title }) => title || 'Данные не соответствуют формату',
        tooShort: ({ minLength }) => `Слишком короткое значение, минимум символов — ${minLength}`,
        tooLong: ({ maxLength }) => `Слишком длинное значение, ограничение символов — ${maxLength}`,
        typeMismatch: () => 'Пожалуйста, введите корректный email',
    }

    constructor() {
        this.bindEvents();
    }

    manageErrors(fieldControlElement, errorMessages) {
        const fieldErrorsElement = fieldControlElement.parentElement.querySelector(this.selectors.fieldErrors);

        fieldErrorsElement.innerHTML = errorMessages
            .map((message) => `<span class="field__error">${message}</span>`)
            .join('');
    }

    validateField(fieldControlElement) {
        const errors = fieldControlElement.validity;
        const errorMessages = [];

        Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
            if (errors[errorType]) {
                errorMessages.push(getErrorMessage(fieldControlElement));
            }
        });

        this.manageErrors(fieldControlElement, errorMessages);

        const isValid = errorMessages.length === 0;

        fieldControlElement.ariaInvalid = !isValid;

        return isValid;
    }

    onBlur(event) {
        const { target } = event;
        const isFormField = target.closest(this.selectors.form);
        const isRequired = target.required;

        if (isFormField && isRequired) {
            this.validateField(target);
        }
    }

    onSubmit(event) {
        const isFormElement = event.target.matches(this.selectors.form);
        if (!isFormElement) {
            return;
        }

        const requiredControlElements = [...event.target.elements].filter(({ required }) => required);
        let isFormValid = true;
        let firstInvalidFieldControl = null;

        requiredControlElements.forEach((element) => {
            const isFieldValid = this.validateField(element);

            if (!isFieldValid) {
                isFormValid = false;

                if (!firstInvalidFieldControl) {
                    firstInvalidFieldControl = element;
                }
            }
        });

        if (!isFormValid) {
            event.preventDefault();
            firstInvalidFieldControl.focus();
        }
    }

    bindEvents() {
        document.addEventListener('blur', (event) => {
            this.onBlur(event);
        }, { capture: true });
        document.addEventListener('submit', (event) => this.onSubmit(event));
    }
}

new FormsValidation();
//Очищение введённого значения от нечисловых символов, а затем форматирование его в нужный вид.

document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');

    phoneInput.addEventListener('input', (event) => {
        let value = event.target.value.replace(/\D/g, ''); // удалить все нечисловые символы

        // Если пользователь ввёл меньше 1 символа, добавляем "+7"
        if (value.length < 1) {
            event.target.value = '+7';
            return;
        }

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        if (value.length >= 1 && value[0] !== '7') {
            value = '7' + value.slice(1);
        }

        let formattedValue = '+7';

        if (value.length > 1) {
            formattedValue += ' (' + value.slice(1, 4);
        }
        if (value.length > 4) {
            formattedValue += ') ' + value.slice(4, 7);
        }
        if (value.length > 7) {
            formattedValue += '-' + value.slice(7, 9);
        }
        if (value.length > 9) {
            formattedValue += '-' + value.slice(9, 11);
        }

        event.target.value = formattedValue;
    });

    // При фокусе, если поле пустое, устанавливаем начальное значение "+7"
    phoneInput.addEventListener('focus', (event) => {
        if (!event.target.value) {
            event.target.value = '+7';
        }
    });

    // При потере фокуса, если введено только "+7", очищаем поле
    phoneInput.addEventListener('blur', (event) => {
        if (event.target.value === '+7') {
            event.target.value = '';
        }
    });
});