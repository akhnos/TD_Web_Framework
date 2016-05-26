function System()
{
    this.config = {
        rootFolder: "http://localhost/TDWebFramework/tdem"
    };

    var my = this;
    this.logger = new Log();
    this.logger.set.debug(true);
    this.extend = function(parent,child)
    {
        result = $.extend({},child,parent);
        return result;
    };
}

function Log()
{
    var my = this;

    this.get = {
        text: function(){return text},
        color: function(){return color},
        background: function(){return background},
        debug: function(){return debugFlag},
        codeLine: function(){return codeLine},
        fileName: function(){return fileName}
    };

    this.set = {
        text: function(value){return text = value},
        color: function(value){return color = value},
        background: function(value){return background = value},
        debug: function(value){return debugFlag = value},
        codeLine: function(value){return codeLine = value},
        fileName: function(value){return fileName = value},
        beforeLog: function(value){return beforeLog = function(){value();}},
        afterLog: function(value){return beforeLog = function(){value();}}
    };

    this.add = {
        text: function(value){return text = text + "\n" + value}
    };

    var text, fileName, debugFlag = false, color = "#bada55", background = "#222", codeLine = null;
    var beforeLog = function(){}, afterLog = function(){};

    this.clearDefaults = function()
    {
        this.set.fileName(null);
        this.set.codeLine(null);
        this.set.text(null);
    };

    this.console = function () {

        if (debugFlag && text)
        {
            beforeLog();
            switch (typeof text)
            {
                case "string":
                    if(codeLine)
                        text = text + "\n\n {code line: " + codeLine + " \n file: " + fileName + "}";
                    console.log("%c" + text, 'background: ' + background + '; color: ' + color + ';');
                    break;
                case "undefined":
                    console.log("%c Console text is null", 'background: ' + background + '; color: ' + color + ';');
                    break;
                case "object":
                case "array":
                    console.log(text);
                    break;
            }
            afterLog();
        }
        this.clearDefaults();
    };

    this.die = function()
    {
        throw new Error("Fatal error");
    };
}

Html.prototype = new System();
function Html()
{
    var my = this;

    this.get = this.extend({
        htmlObject: function(){return htmlObject}
    },this.get);

    this.set = {
        htmlObject: function(value){return htmlObject = $("#" + value)}
    };

    this.elementControl = new ElementControl();
    this.elementControl.set.throwErrorFlag(true);

    var htmlObject;
}

ElementControl.prototype = new Html();
function ElementControl(){

    this.set = {
        throwErrorFlag: function(value){return throwErrorFlag = value;}
    };

    var throwErrorFlag = false;
    var my = this;
    this.typeIs = function(object,objectType)
    {
        if(object.is(objectType))
            return true;
        else
        {
            if(throwErrorFlag)
            {
                my.logger.set.text("Element is not " + objectType);
                my.logger.add.text("Element is " + object.prop("tagName"));
                my.logger.add.text("Element Id is: " + object.attr("id"));
                my.logger.console();
            }
            return false;
        }
    };
}

Form.prototype = new Html();
function Form()
{
    var my = this;

    this.get = this.extend({
        interaction: function(){return interaction},
        inputObject: function(){return my.get.htmlObject();}
    },this.get);

    this.set = this.extend({
        interaction: function(value){return interaction = value;},
        inputObject: function(value)
        {
            object = my.set.htmlObject(value);
            if(my.elementControl.typeIs(object,"input") || my.elementControl.typeIs(object,"select") || my.elementControl.typeIs(object,"textarea"))
                return object;
            else my.logger.die();
            return false;
        }
    },this.set);

    var interaction = function(){},inputObject;

    this.interaction = function(interactionFunc)
    {
        if(interactionFunc != null)
            interactionFunc();
        else
            my.get.interaction()();
    };

    this.required = function(callBack)
    {
        value = my.getValueOfInput();
        if(typeof value == "undefined" || value == "")
        {
            if(callBack != null)
            {
                callBack();
            }
            return false;
        }
        return true;
    };

    this.getValueOfInput = function()
    {
        return my.get.htmlObject().val();
    };
}

Ajax.prototype = new System();
function Ajax(){

    var my = this;
    this.get = this.extend({
        url: function(){return url},
        div: function(){return div},
        inputData: function(){return inputData},
        dataType: function(){return dataType;},
        successCallback: function(){return successCallback;},
        templateUrl: function(){return templateUrl;}
    },this.get);

    this.set = {
        url: function(value){return url = value},
        div: function(value){return div = value},
        inputData: function(value){return inputData = value},
        dataType: function(value){return dataType = value;},
        successCallback: function(value){return (value == null) ? function(){} : successCallback = value;},
        templateUrl: function(value){return templateUrl = value;}
    };

    this.ctrlKeyDown = "";
    var url = null,div = null,dataType = "html",successCallback = function(){},templateUrl = "",inputData = null;

    this.clearURLDiv = function()
    {
        this.set.url(null);
        this.set.div(null);
        this.set.successCallback(function(){});
        this.set.inputData(null);
    };

    this.callEvent = function(url,div,callBack)
    {
        this.set.url(url);
        this.set.div(div);
        this.set.successCallback(callBack);
        this.call();
        this.clearURLDiv();
    };

    this.call = function()
    {
        my.logger.set.text("Ajax Called");
        my.logger.add.text("File: " + this.config.rootFolder + my.get.url());
        my.logger.add.text("Div Id: " + my.get.div());
        my.logger.console();
        if(url == null || div == null || dataType == null)
        {
            my.logger.set.text("Undefined data \n"
                + "url: " + my.get.url() + "\n"
                + "div: " + my.get.div() + "\n"
                + "dataType: " + my.get.dataType());
            my.logger.console();
            my.logger.die();
        }
        var divId = my.get.div();
        var successCallback = my.get.successCallback();
        $("#" + divId).load(this.config.rootFolder + my.get.url(), inputData, function(){
                successCallback();
            }
        );
    };

    this.changePage = function(url,div,historyUrl)
    {
        history.pushState("","",my.config.rootFolder + my.get.templateUrl() + historyUrl);
        my.callEvent(url,div);
    };
}

