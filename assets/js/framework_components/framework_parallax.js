/**
 * Created by akhnos on 6/18/15.
 */
Framework_Parallax.prototype = new Framework_Components();
function Framework_Parallax()
{
    this.init = function(initializedElement){
        $(initializedElement + " .parallax-layers-menu").each(function(index){
            var parallaxContent = $(this).children(".parallax-layers-menu-content");
            var win = $( window );
            var windowHeight = win.height();
            var oldScrollTop = win.scrollTop();
            win.scroll(function() {
                var scrollTop = win.scrollTop();
                var parallaxStartTop = parallaxContent.offset().top;
                var windowTop = windowHeight + scrollTop;
                if(windowTop >= parallaxStartTop)
                {
                    $(parallaxContent).find(".parallax-layers-layer").each(function(index){
                        var changeSpeed = 10 + (index * 5);
                        var newTop = $(this).css('backgroundPosition').split(" ");
                        if(oldScrollTop < scrollTop)
                            newTop = parseInt(newTop[1]) - changeSpeed;
                        else
                            newTop = parseInt(newTop[1]) + changeSpeed;
                        $(this).css("background-position","0% " + newTop + "px");
                    });
                }
                oldScrollTop = scrollTop;
            });
        });
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["parallax"] = function(initElem){my.init(initElem)};
}
new Framework_Parallax();

