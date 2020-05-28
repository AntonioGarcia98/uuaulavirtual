export class S2ButtonModel{
    /**
     * @param _text texto o llave de traduccion del texto que se mostrara en el boton
     * @example 
     * _text:"Guardar" 
     * _text:"pages.button.text"
     * @typedef string
     */
    _text:string;
    /**
     * @param _validToSend Forzar a que el formulario sea correcto para habilitar el boton de envio
     * @typedef boolean
     */
    _validToSend:boolean;
    /**
     * @param _validToSend Reinicial el formulario en caso de que se indique un exito
     * @typedef boolean
     */
    _resetOnSuccess:boolean;
    /**
     * @param _validToSend Elige un color del bton
     * @typedef string
     */
    _color:string;
}