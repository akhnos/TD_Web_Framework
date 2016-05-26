/**
 * Created by akhnos on 6/18/15.
 */

Framework_Overlay.prototype = new Framework_Components();
function Framework_Overlay()
{

    this.init = function(initializedElement){
        $(initializedElement + " .overlay-menu").each(function(){
            var overlayParent = $(this);
            if(overlayParent.has(".overlay-menu-x") || overlayParent.has(".overlay-menu-y") || overlayParent.has(".overlay-menu-xy"))
            {
                var overlayHeader = overlayParent.find(".overlay-menu-header");
                var overlayX =  overlayParent.children('.overlay-menu-x');
                var overlayY =  overlayParent.children('.overlay-menu-y');
                var overlayXY =  overlayParent.children('.overlay-menu-xy');
                overlayX.addClass("overlay-menu-content");
                overlayY.addClass("overlay-menu-content");
                overlayXY.addClass("overlay-menu-content");
                var animationDuration = {queue:false,duration:100};
                overlayParent.mouseenter(function(e){
                    overlayX.addClass("overlay-active");
                    overlayY.addClass("overlay-active");
                    overlayXY.addClass("overlay-active");
                    if (e.offsetX < overlayParent.width() / 4){
                        overlayX.css("left","-100%");
                        overlayXY.css("left","-100%");
                    } else if(e.offsetX > 3 * overlayParent.width() / 4){
                        overlayX.css("left","100%");
                        overlayXY.css("left","100%");
                    }else{
                        overlayX.css("left","0%");
                        overlayXY.css("left","0%");
                    }

                    if (e.offsetY < overlayParent.height() / 4){
                        overlayY.css("top","-100%");
                        overlayXY.css("top","-100%");
                    } else if (e.offsetY > 3 * overlayParent.height() / 4) {
                        overlayY.css("top","100%");
                        overlayXY.css("top","100%");
                    }else{
                        overlayY.css("top","0%");
                        overlayXY.css("top","0%");
                    }
                    overlayX.animate({left: "0%",top: "0%"}, animationDuration );
                    overlayY.animate({left: "0%",top: "0%"}, animationDuration );
                    overlayXY.animate({left: "0%",top: "0%"}, animationDuration );
                });

                overlayParent.mouseleave(function(e){
                    overlayX.addClass("overlay-active");
                    overlayY.addClass("overlay-active");
                    overlayXY.addClass("overlay-active");
                    if (e.offsetX < overlayParent.width() / 4){
                        overlayX.animate({left: "-100%"}, animationDuration );
                        overlayXY.animate({left: "-100%"}, animationDuration );
                    } else if(e.offsetX > 3 * overlayParent.width() / 4){
                        overlayX.animate({left: "100%"}, animationDuration );
                        overlayXY.animate({left: "100%"}, animationDuration );
                    }

                    if (e.offsetY < overlayParent.height() / 4){
                        overlayY.animate({top: "-100%"}, animationDuration );
                        overlayXY.animate({top: "-100%"}, animationDuration );
                    } else if (e.offsetY > 3 * overlayParent.height() / 4) {
                        overlayY.animate({top: "100%"}, animationDuration );
                        overlayXY.animate({top: "100%"}, animationDuration );
                    }
                });
            }
        });

    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["overlay"] = function(initElem){my.init(initElem)};
}
new Framework_Overlay();
