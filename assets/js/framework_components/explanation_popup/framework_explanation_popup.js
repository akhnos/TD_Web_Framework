/**
 * Created by akhnos on 7/16/15.
 */
Framework_Explanation_Popup.prototype = new Framework_Components();
function Framework_Explanation_Popup()
{
    var win,expPopup,popupLeft,popupTop;
    this.init = function(initializedElement){
        $(initializedElement + " .explanation-external").mouseenter(function(){
            var popupId = $(this).attr("data-explanation-popup");
            var popupExplanation = $("#" + popupId).html();
            $("body").append("<div id='framework_component_explanation_popup' class='explanation-popup'></div>");
            $("#framework_component_explanation_popup").html(popupExplanation);
            win = $( window );
            expPopup = $("#framework_component_explanation_popup");
        });
        $(initializedElement + " .explanation-external").on( "mousemove", function( event ) {
            if(win.width() < expPopup.width() + event.pageX + 15)
                popupLeft = win.width() - expPopup.width() - 15;
            else
                popupLeft = (event.pageX + 10);

            if(win.height() < expPopup.height() + event.pageY + 15)
                popupTop = win.height() - expPopup.height() - 15;
            else
                popupTop = (event.pageY + 10);
            $("#framework_component_explanation_popup").css({"left":popupLeft + "px", "top": popupTop + "px"});
        });

        $(initializedElement + " .explanation-external").mouseleave(function(){
            $("#framework_component_explanation_popup").remove();
        });
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["explanation_popup"] = function(initElem){my.init(initElem)};
}
new Framework_Explanation_Popup();