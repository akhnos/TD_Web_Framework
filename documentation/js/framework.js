ComponentBuilder.prototype = new System();
function ComponentBuilder()
{
    /* Configurations */
    this.defaults = {
        rootFolder: "http://localhost/TDWebFramework/tdem/",
        assetFolder: "",
        imageFolder: "images/",
        currentPage: "",
        imageRepeat: "repeat"
    };
    if(window.location.toString().indexOf("http://www") == 0)
        this.defaults.rootFolder = "http://localhost/TDWebFramework/tdem";
    /* Configurations */
    var my = this;
    var defaults = my.defaults;

    var my = this;
    this.assets = {};
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
    this.addCssClasses = function()
    {
        for(var x in my.assets)
        {
            backgroundX = my.assets[x]["xDimensions"];
            backgroundY = my.assets[x]["yDimensions"];
            my.assets[x].leftSize = leftSize = backgroundX[0];
            my.assets[x].rightSize = rightSize = (backgroundX[1] < 0) ? Math.abs(backgroundX[1]) : my.assets[x]["width"] - backgroundX[1];
            my.assets[x].topSize = topSize = backgroundY[0];
            my.assets[x].bottomSize = bottomSize = (backgroundY[1] < 0) ? Math.abs(backgroundY[1]) : my.assets[x]["height"] - backgroundY[1];
            menuTextureStrech = my.assets[x]["repeat"];
            $("<style type='text/css'> ." + x + " {"
                + "-moz-border-image: url('" + my.defaults.assetFolder + my.defaults.imageFolder + my.assets[x]["image"] + "') " + topSize + " " + rightSize + " " + bottomSize + " " + leftSize + " fill" + menuTextureStrech + ";"
                + "-webkit-border-image: url('" + my.defaults.assetFolder + my.defaults.imageFolder + my.assets[x]["image"] + "') " + topSize + " " + rightSize + " " + bottomSize + " " + leftSize + " fill " + menuTextureStrech + ";"
                + "-o-border-image: url('" + my.defaults.assetFolder + my.defaults.imageFolder + my.assets[x]["image"] + "') " + topSize + " " + rightSize + " " + bottomSize + " " + leftSize + " fill " + menuTextureStrech + ";"
                + "border-image: url('" + my.defaults.assetFolder + my.defaults.imageFolder + my.assets[x]["image"] + "') " + topSize + " " + rightSize + " " + bottomSize + " " + leftSize + " fill " + menuTextureStrech + ";"
                + "border-width: " + topSize + "px " + rightSize + "px " + bottomSize + "px " + leftSize + "px;\""
                + "} </style>").appendTo("head");
        }
    };

    this.getElByClass = function(className)
    {
        return my.defaults.currentPage.getElementsByClassName(className);
    };

    this.getPlaceHolders = function()
    {
        var placeholders = my.getElByClass("textbox-placeholder");
        for(var x = 0; x < placeholders.length; x++)
        {
            placeholder = $(placeholders[x]);
            placeholder.siblings("input").attr("placeholder",placeholder.html());
            placeholder.hide();
        }
    };

    this.getOriginalText = function()
    {
        var originalTexts = my.getElByClass("default-text-original");
        my.components["tmpTexts"] = {};
        for(var x = 0; x < originalTexts.length; x++)
        {
            originalText = $(originalTexts[x]);
            if(my.components["tmpTexts"][originalText.attr("id")])
                my.helper.debugWarnings("Duplicated original text id \n"
                    + "Text Id:" + originalText.attr("id"));
            my.components["tmpTexts"][originalText.attr("id")] = originalText.html();
        }
    };

    this.getTexts = function()
    {
        var texts = my.getElByClass("default-text");
        $(texts).each(function(i){
            var textNode = $(this);
            var dataVars = textNode.attr("data-vars");
            var innerText = textNode.html();
            if($("#" + innerText).length > 0)
            {
                var originalText = $("#" + innerText);
                var innerHtml = originalText.html();
                if(typeof dataVars != "undefined")
                {
                    dataVars = JSON.parse(dataVars);
                    for(var y in dataVars)
                    {
                        innerHtml = innerHtml.replace("%s", dataVars[y]);
                    }
                }
                textNode.html(innerHtml);
                textNode.removeClass("default-text");
                delete(my.components["tmpTexts"][innerText]);
            }else{
                my.helper.debugWarnings("Missing default-text-original classname  \n"
                    + "Warning On: default-text \n"
                    + "Selector Id: " + textNode.attr("id") + "\n"
                    + "Closest Id: " + textNode.closest('[id]').attr("id") + "\n"
                    + "Inner Text: " + innerText);
            }
        });

        if(Object.keys(my.components["tmpTexts"]).length > 0)
            my.helper.debugWarnings("Not used texts", my.components["tmpTexts"]);
    };

    this.collector = function()
    {
        my.getOriginalText();
        my.getTexts();
        my.getPlaceHolders();
    };

    this.init = function(initializedElement)
    {
        my.defaults.currentPage = document.getElementById(initializedElement);
        my.collector();
        $("#" + initializedElement + " a").each(function(){
            if($(this).attr("href").indexOf("http://") < 0)
                this.href = my.defaults.rootFolder + $(this).attr("href");
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
}
var FRAMEWORK_COMPONENTS_OBJ = new Framework_Components();