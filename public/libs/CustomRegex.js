

(function(namespace, undefined){

	var CustomRegex = {};

	/**
	* verifica si el val es un número telefónico válido
	*@param val {string} valor a verificar 
	*/
	CustomRegex.isPhone = function(val) {
        var phoneTest = /^[0-9]{1,}$/i;       
        return phoneTest.test(val);
    };

    /**
    *verifica si val esta formado únicamente por números
	*@param val {string} valor a verificar 
	*/
	CustomRegex.isNum = function(val) {
        var numTest = /^[0-9]{1,}$/i;      
        return numTest.test(val);
    };

    /**
    *verifica si val esta formado únicamente por caracteres 
	*@param val {string} valor a verificar 
	*/
	CustomRegex.isAlpha = function(val) {
        var alphatest = /^[A-Za-záíúéóÁÍÚÉÓñÑ]{1,}$/i;      
        return alphatest.test(val);
    };


    /**
    *verifica si val esta formado únicamente por caracteres o espacios en blanco
	*@param val {string} valor a verificar 
	*/
	CustomRegex.isAlphaPlus = function(val) {
        var alphaplusTest = /^[A-Za-záíúéóÁÍÚÉÓñÑ ]{1,}$/i;      
        return alphaplusTest.test(val);
    };

    /**
    *verifica si val esta formado únicamente por caracteres  o números
	*@param val {string} valor a verificar 
	*/
	CustomRegex.isAlphaNum = function(val) {
        var alphanumplusTest = /^[A-Za-záíúéóÁÍÚÉÓñÑ0-9]{1,}$/i;      
        return alphanumplusTest.test(val);
    };

    /**
    *verifica si val esta formado únicamente por caracteres  , números o espacios en blanco
	*@param val {string} valor a verificar 
	*/
	CustomRegex.isAlphaNumPlus = function(val) {
        var alphanumplusTest = /^[A-Za-záíúéóÁÍÚÉÓñÑ0-9 ]{1,}$/i;      
        return alphanumplusTest.test(val);
    };

    /**
    *verifica si val es un email válido
	*@param val {string} valor a verificar 
	*/
	CustomRegex.isEmail = function(val) {
        var email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;      
        return email.test(val);
    };


    /**
    *verifica si val es un password válido
    * acepta caracteres, numeros, simbolos: {*_-.} , fuerza a que haya por lo menos una letra mayuscula 
	*@param val {string} valor a verificar 
	*/
	CustomRegex.isPasswordM = function(val) {
        var password = /^[a-zA-ZáíúéóÁÍÚÉÓñÑ0-9\._\-\*@]{8,20}$/;   
        var unaMayuscula = /[A-ZÁÍÚÉÓÑ]{1,}/;   
        if ( password.test(val) ){
        	return unaMayuscula.test(val);
        }
        return false;
    };

    /**
    *verifica si val es un password válido
    * acepta caracteres, numeros, simbolos: {*_-.} , fuerza a que haya por lo menos una letra mayuscula y un numero
	*@param val {string} valor a verificar 
	*/
	CustomRegex.isPasswordMN = function(val) {
        var password = /^[a-zA-ZáíúéóÁÍÚÉÓñÑ0-9\._\-\*@]{8,20}$/;   
        var unaMayuscula = /[A-ZÁÍÚÉÓÑ]{1,}/;     
        var numero = /[0-9]{1,}/;
        if ( password.test(val) ){
        	if( unaMayuscula.test(val) ) {
        		return numero.test(val);
        	}
        }
        return false;
    };
    
    /**
    *verifica si esta en blanco
	*@param val {string} valor a verificar 
	*/
	CustomRegex.isNotBlank = function(val) {
        var blanktest = /^\s*$/i;      
        return !blanktest.test(val);
    };
    



    

    namespace.CustomRegex = CustomRegex;
})(window);
