function Validator (options) {
    var selectorRules = {};         
    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;
        var rules = selectorRules[rule.selector];
        var a = 0;
        for (var i = 0; i < rules.length; ++i){
            errorMessage = rules[i](inputElement.value);
            if (errorMessage){
                a++;
                break;
            }
        }
        if (a == 0 ) {
            $(document).ready(function() {
                $("form").submit(function() {
                  $(".message").removeClass('hidden');
                  setTimeout(function() {
                    $(".message").addClass('hidden');
                    document.getElementById("contact").reset();
                  }, 4000);
                });
              });
        }      
        if(errorMessage) {
            errorElement.innerText = errorMessage;  
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
        return !errorMessage;
    }
    var formElement = document.querySelector(options.form);
    if(formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault();
            var isFormValid = true;
            options.rules.forEach(function (rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule); 
                if(!isValid){
                    isFormValid = false;
                }
            });
            if (isFormValid){
                if (typeof options.onSubmit === 'function' ) {
                    var EnableInputs = formElement.querySelectorAll('[name]:not([disable])');
                    var formValues = Array.from(EnableInputs).reduce(function(values, input) {
                    return (values[input.name] = input.value) && values;
                    },{});         
                    options.onSubmit(formValues)
                }
                else {
                    formElement.submit();                 
                }
            }
        }
        options.rules.forEach(function (rule) {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);                 
                }
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });             
        console.log(selectorRules);
    }    
}
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Xin quý khách nhập họ tên'
        }
    };
}
Validator.isPhoneNumber = function(selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
            return regex.test(value) ? undefined : 'Số điện thoại không hợp lệ, hãy nhập lại';
        }
    };
}
Validator.isDate = function(selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Xin quý khách chọn ngày nhận phòng';
        }
    };
}
