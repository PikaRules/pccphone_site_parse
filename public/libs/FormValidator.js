/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function(namespace, undefined){
    
    var form = {};
    
    /*
     * self.options.selfRegistrationFormValidator = new FormValidator([{
     *          elClass: 'first-name',
     *          verifyMethod: 'isAlphaPlus',
     *          showErrorIn: 'box-errors',
     *          required: true
     *      }],{
     *          invalidElementStyle: '',
     *          invalidElementClass: 'errors'
     *      });
     */
    
   
    
    //==================== CONSTRUCTOR =======================================
    
    var form = function( config, options ){
        if( canRun( config ) ){
            if( options ) {  updateProperties( this, options ); }
            this.config = config;
            if( this.realTimeChecking ){ bindListeners(this); }
        }
    };
    form.prototype.constructor = form;
    
    //====================   PROPERTIES ============================================
    
    form.prototype.errorMessages = {
      isNum:'Only numbers are accepted',
      isPhone: "Only numbers and dashes are accepted",
      isAlpha: "Only characters are accepted, no special characters",
      isAlphaPlus: "Only characters and white spaces are accepted, no special characters",
      isAlphaNum: "Only characters and numbers are accepted",
      isAlphaNumPlus: "Only characters, numbers and whitespaces are accepted",
      isEmail: "The email have to have this format: mario@yahoo.com ",
      isPasswordM: "The password only accepts characters, numbers, these simbols = {*_-.}, and it must have at least one uppercase character ",
      isPasswordMN: "The password only accepts characters, numbers, these simbols = {*_-.}, and it must have at least one uppercase character and one number",
      isNotBlank: "Cannot be empty"
    };
    
    form.prototype.messageStyle = "color:red; font-width: bold;";
    form.prototype.displayErrorMessages = true;
    
    form.prototype.invalidElementClass = "";
    form.prototype.invalidElementStyle = "border: red solid 1px;";
    form.prototype.markInvalidItems = true;
    
    form.prototype.realTimeChecking = true;
    
    form.prototype.config = null;
    form.prototype.displayInline = true;
    
    var errors = [];
    
    
    
    //====================== METHODS ========================================
    
    /**
     * update the properties of this object whit the properties of the passed 
     * options properties that are not null and that exists on the layer object.
     * 
     * @private
     * @param {object} options
     */
    updateProperties = function(self, options) {
        
        for (var property in options) {
            //update only the properties that already exists in this object
            if ( self[property] !== undefined ) {
                self[ property ] = options[ property ];
            }
        }
    };
    
    //check if the neccessary libraries exists
    //return true if the form is ok.
    canRun = function( config ){
        
        var continuar = false;
        if( CustomRegex ){
            if( typeof $ !== 'undefined' ) {             
                if( typeof config !== "undefined" ){
                    if( config.length > 0 ){
                        continuar =  true;
                    }    else {
                        console.error( 'Form validator error: you need to pass a config like this =  [ { elClass: "text1", verifyMethod: "isNum" , showErrorIn: "text1e" }, {},....   ]');
                    }
                } else {
                    console.error( 'Form validator error: the FormValidator( config, options), config property in the construtor cannot be empty');
                }
            }
            else{
                console.error( "FormValidator error: jquery doesn't exists  " );
            }
        }else{
                console.error( "FormValidator error: CustomRegex doesn't exists " );
        }
        return continuar;
    };
    
    form.prototype.clear = function(){
        var size = this.config.length;
        for( var i = 0; i < size; i++ ){
            item = this.config[i];
            $( '.' + item.elClass ).attr('style', '' );
            $( '.' + item.showErrorIn ).hide().html('');
            if( this.invalidElementClass ){
                $( '.' + item.elClass ).removeClass(this.invalidElementClass );
            }
        }
    };
    
    form.prototype.check = function( config ){
        
        errors = [];
        var myConfig = this.config;
        if( config ){
            if( config.length > 0 ){
                myConfig = this.config;
            }
        } 
        var size = 0;
        //var errors = [];
        var resultado = false;
        var tempError = null;
        
            
        this.clear();

        size = myConfig.length;
        var item;
        var value;
        for( var i = 0; i < size; i++ ){
            item = myConfig[i];
            value = $( '.' + item.elClass ).val();
            
            // check special input types
            if( item.type !== undefined  ){
                
               if( item.required ){
                   //input type checkbox
              
                   if( item.type === 'checkbox' ){
                      
                        if(  $( "." + item.elClass + ":checked" ).length <= 0 ) {
                             errors.push({ elClass: item.elClass, showErrorIn: item.showErrorIn, message: this.errorMessages["isNotBlank"] });
                        }
                   }
               }
            }
            // check input types 
            if( item.verifyMethod !== undefined ){
                if( item.verifyMethod !== '' ){
                    if( !CustomRegex[ item.verifyMethod ]( value ) ){
                        //si es falso agregar a los errores
                        if( item.required ){
                            if( CustomRegex.isNotBlank( value ) ){
                                errors.push({ elClass: item.elClass, showErrorIn: item.showErrorIn, message: this.errorMessages[item.verifyMethod] });
                            } else {
                                errors.push({ elClass: item.elClass, showErrorIn: item.showErrorIn, message: this.errorMessages[ 'isNotBlank'] });
                            }
                        } else {
                            if( CustomRegex.isNotBlank( value ) ){
                                errors.push({ elClass: item.elClass, showErrorIn: item.showErrorIn, message: this.errorMessages[item.verifyMethod] });
                            }
                        }

                    }
                }
            }
            
            
            
        }

        if( errors.length > 0 &&  (this.displayErrormessages || this.markInvalidItems )  ){
            size = errors.length;
            for( var i = 0; i < size; i++ ){
                tempError = errors[i];

                if( this.displayErrorMessages ){

                    $( '.' + tempError.showErrorIn ).html( tempError.message );
                    $('.' + tempError.showErrorIn).attr('style', this.messageStyle);

                    if (this.displayInline) {
                        $('.' + tempError.showErrorIn).css('display', 'inherit');
                    } else {
                        $('.' + tempError.showErrorIn).show();
                    }
                }

                if( this.markInvalidItems ){
                    $( '.' + tempError.elClass  ).attr('style', this.invalidElementStyle );
                    if( this.invalidElementClass !== '' ){
                        $( '.' + tempError.elClass  ).addClass( this.invalidElementClass );
                    }
                }

            }
        } else {
            resultado = true;
        }           
        
        
        return resultado;
        
    };
    
    
    bindListeners = function( obj ){
        var size = obj.config.length;
        var el;
        var event = 'keyup';
        for( var i = 0; i < size; i++ ){
            item = obj.config[i];
            el = $( '.' + item.elClass );
            if( el.is('select') ){
                event = 'change';
            } else if( el.is('input') ){
                switch( $(el).attr('type') ){
                    case 'checkbox':
                        event = 'change';
                        break;
                    default:
                        event = 'keyup';
                        break;
                }
            }
            el.on( event, function( event ){             
                if( obj.check( [item]) ){
                    obj.clear(); 
                }
            });
        }
    };

    
    namespace.FormValidator = form;
})(window);

