/**
 * Created by akhnos on 6/18/15.
 */

Framework_Popup.prototype = new Framework_Components();
function Framework_Popup()
{
    this.init = function(initializedElement){
        $(initializedElement + " .popup-element-header").click(function(){
            var popupElementHeader = $(this);
            var popupElementContent = popupElementHeader.closest(".popup-element-content");
            popupElementContent.toggleClass("popup-active");
        });
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["popup"] = function(initElem){my.init(initElem)};
}
new Framework_Popup();