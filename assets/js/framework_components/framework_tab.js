/**
 * Created by akhnos on 6/18/15.
 */

Framework_Tab.prototype = new Framework_Components();
function Framework_Tab()
{
    this.init = function(initializedElement){
        $(initializedElement + " .tab .tab-link").click(function(){
            var selectedTabLink = $(this);
            if(!selectedTabLink.hasClass("unselectable") && !selectedTabLink.hasClass("tab-link-selected"))
            {
                var parentTab = selectedTabLink.closest(".tab");
                parentTab.find(".tab-link").removeClass("tab-link-selected");
                selectedTabLink.addClass("tab-link-selected");
            }
        });
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["tab"] = function(initElem){my.init(initElem)};
}
new Framework_Tab();