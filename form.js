
//Đối tượng
function Validator(options) {

	var  formElement = document.querySelector(options.form);

	if(formElement){

		options.rules.forEach(function (rule)  {

			var inputElement = formElement.querySelector(rule.selector);

			if(inputElement) {
				inputElement.onblur = function () {
					 
                   console.log(rule);
     
				}
			}

		});
		

	}

}

//định nghĩa rules
Validator.isRequired = function (selector) {
    return {
    	selector: selector,
    	test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập'
    	}
    }
}

Validator.isPhonenumber = function (selector) {
    return {
    	selector: selector,
    	test: function () {
    		
    	}
    }
}