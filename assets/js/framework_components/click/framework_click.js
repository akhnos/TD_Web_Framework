/**
 * Created by akhnos on 6/19/15.
 */

Framework_Click.prototype = new Framework_Components();
function Framework_Click()
{
    this.init = function(initializedElement){
        $(initializedElement + " .click-hide").click(function(){
            var onclickedItem = $(this);
            onclickedItem.addClass("zero-opacity");
            if(onclickedItem.hasClass("click-remove")){
                var attr = onclickedItem.attr("data-click-remove-duration");
                if(typeof attr !== typeof undefined && attr !== false)
                    setTimeout(function(){onclickedItem.remove();},parseInt(onclickedItem.attr("data-click-remove-duration")));
                else
                    setTimeout(function(){onclickedItem.remove();},10);
            }
        });
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["click"] = function(initElem){my.init(initElem)};
}
new Framework_Click();