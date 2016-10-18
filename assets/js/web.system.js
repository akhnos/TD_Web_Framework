function System()
{
    this.config = {
        rootFolder: "http://localhost/TDWebFramework/teknodev/index/"
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

    var htmlObject;
}

Form.prototype = new Html();
function Form()
{
    var my = this;

    this.get = this.extend({
        requiredElements: function(){return requiredArray;}
    },this.get);

    this.set = this.extend({
        interaction: function(value){return interaction = value;},
        requiredElements: function(req,check){
            result = true;
            if(typeof check == "undefined")
                check = [""];
            if(Array.isArray(req)){
                requiredArray = req;
                for(var x in req){
                    req[x] = $("#" + req[x]);
                    for(var y in check){
                        if(req[x].val() == check[y]){
                            result = false;
                            interaction(req[x]);
                        }
                    }
                }
            }
            return result;
        }
    },this.set);

    var interaction = function(){},requiredArray = [];

    this.getInput = function(inputId){
        var result;
        if(Array.isArray(inputId)){
            for(var x in inputId){
                result[x] = $("#" + inputId[x]).val();
            }
        }
        else{
            result = $("#" + inputId).val();
        }
        return result;
    };

    this.getForm = function(formId){
        var result = {};
        $("#" + formId).find("input,select,textarea").each(function(){
            var el = $(this);
            result[el.attr("id")] = el.val();
        });
        return result;
    };
}
Ajax.prototype = new System();
function Ajax(){

    var my = this;
    this.history = [];
    this.get = this.extend({
        url: function(){return url},
        div: function(){return div},
        inputData: function(){return inputData},
        dataType: function(){return dataType;},
        successCallback: function(){return successCallback;}
    },this.get);

    this.set = {
        url: function(value){return url = value},
        div: function(value){return div = value},
        inputData: function(value){return inputData = value},
        dataType: function(value){return dataType = value;},
        successCallback: function(value){return (value == null) ? function(){} : successCallback = value;}
    };

    var url = null,div = null,dataType = "html",successCallback = function(){},inputData = null;

    this.clear = function()
    {
        my.set.url(null);
        my.set.div(null);
        my.set.successCallback(function(){});
        my.set.inputData(null);
    };

    this.callEvent = function(url,div,input,cb)
    {
        my.set.url(url);
        my.set.div(div);
        if(typeof input != "undefined")
            my.set.inputData(input);
        if(typeof cb != "undefined")
            my.set.successCallback(cb);
        my.call();
        my.clear();
    };

    this.call = function()
    {
        my.logger.set.text("Ajax Called");
        my.logger.add.text("File: " + my.config.rootFolder + my.get.url());
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
        $("#" + divId).load(my.config.rootFolder + my.get.url(), inputData, function(res){
                successCallback(res);
            }
        );

        my.history.push({
            url: my.get.url(),
            div: my.get.div(),
            inputData: my.get.inputData(),
            successCallback: my.get.successCallback()
        });
    };

    this.changePage = function(url,div,historyUrl)
    {
        history.pushState("","",my.config.rootFolder + historyUrl);
        my.callEvent(url,div);
        var historyLength = my.history.length;
        my.history[historyLength - 1]["historyURL"] = my.config.rootFolder + historyUrl;
    };

    this.back = function(){
        var historyLength = my.history.length;
        var backPage = my.history[historyLength-2];
        if(typeof backPage != "undefined"){
            my.set.inputData(backPage.inputData);
            my.set.successCallback(function(res){
                backPage.successCallback(res);
            });
            my.callEvent(backPage.url,backPage.div);
            my.history.splice((historyLength - 2),2);
        }
    };

    this.getHistory = function(historyIndex){
        var historyLength = my.history.length;
        return my.history[(historyLength - historyIndex)];
    };

    this.activateWindowPop = function(){
        var popped = ('state' in window.history), initialURL = location.href;
        $(window).bind("popstate",function()
        {
            var initialPop = !popped && location.href == initialURL
            popped = true
            if ( !initialPop ){
                var historyLength = my.history.length;
                var backPage = my.history[historyLength - 2];
                if(typeof backPage != "undefined"){
                    my.back();
                    my.history[historyLength - 1]["historyURL"] = backPage["historyURL"];
                    history.pushState("","",backPage["historyURL"]);
                }
            }
            return;

        });
    };
}