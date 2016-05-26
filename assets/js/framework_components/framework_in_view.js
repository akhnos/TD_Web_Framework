/**
 * Created by akhnos on 12/2/15.
 */

Framework_In_View.prototype = new Framework_Components();
function Framework_In_View()
{
    var $window = $(window);
    var my = this;
    this.checkInView = function(initializedElement){
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);
        $(initializedElement + " .scroll-in-view").each(function(){
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
                $element.addClass('viewed-once');
            } else {
                $element.removeClass('in-view');
            }
        });
    };

    this.init = function(initializedElement){
        $window.on('scroll resize', function(){my.checkInView(initializedElement)});
        $window.trigger('scroll');
    };

    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["scroll_in_view"] = function(initElem){my.init(initElem)};
}
new Framework_In_View();
