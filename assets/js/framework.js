ComponentBuilder.prototype = new System();
function ComponentBuilder()
{
    /* Configurations */
    this.defaults = {
        assetFolder: "",
        imageFolder: "images/",
        currentPage: "",
        imageRepeat: "repeat"
    };

    /* Configurations */
    var my = this;
    var defaults = my.defaults;

    var my = this;
    this.components = {};
    this.helper = {

        debugWarnings: function(warning, param1, param2)
        {
            my.logger.set.text("Warning: " + warning);
            my.logger.console();

            if(typeof param1 != "undefined"){
                my.logger.set.text(param1);
                my.logger.console();
            }

            if(typeof param2 != "undefined"){
                my.logger.set.text(param2);
                my.logger.console();
            }
        },

        displayDynamicContentToTemplate: function(parentId,templateId,variable){

            for(var x in variable)
            {
                var clonedTemplate = $("#" + templateId).clone(true);
                for(var field in variable[x])
                {
                    var elem = clonedTemplate.find("#" + field)
                    if(elem.prop("tagName") == "IMG")
                        elem.attr("src",variable[x][field]).attr("id","");
                    else if(elem.prop("tagName") == "INPUT")
                        elem.val(variable[x][field]).attr("id","");
                    else
                        elem.html(variable[x][field]).attr("id","");
                }
                clonedTemplate.appendTo("#" + parentId);
            }
            $("#" + templateId).remove();
        }
    };

    this.init = function(initializedElement)
    {
        var ajax = new Ajax();
        my.defaults.currentPage = document.getElementById(initializedElement);
        $("#" + initializedElement + " a").each(function(){
            if($(this).attr("href").indexOf("http://") < 0)
                this.href = my.config.rootFolder + $(this).attr("href");
        });
        $( "a" ).click(function( event ) {
            if(!event.ctrlKey)
            {
                event.preventDefault();
            }
        });
        FRAMEWORK_COMPONENTS_OBJ.init("#" + initializedElement);
    };
}

function Framework_Components()
{

    var my = this;
    this.activatedComponents = {};
    this.init = function(initializedElement){
        for(var x in my.activatedComponents){
            my.activatedComponents[x](initializedElement);
        }
    };

    this.createUniqueId = function(){
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var string_length = 20;
        var uniqueId = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            uniqueId += chars.substring(rnum,rnum+1);
        }
        if(!$("#" + uniqueId))
            return uniqueId;
        else
            return my.createUniqueId();
    };
}
var FRAMEWORK_COMPONENTS_OBJ = new Framework_Components();