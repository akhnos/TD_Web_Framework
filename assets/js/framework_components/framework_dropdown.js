/**
 * Created by akhnos on 6/18/15.
 */
Framework_Dropdown.prototype = new Framework_Components();
function Framework_Dropdown()
{
    this.init = function(initializedElement){
        $(initializedElement + " .dropdown").each(function(){
            var dropDown = $(this);
            var trigger = dropDown.find(".dropdown-trigger");
            var dropdownMenu = trigger.siblings('.dropdown-menu');
            trigger.click(function(){
                if(!dropdownMenu.hasClass("dropdown-active"))
                {
                    dropdownMenu.addClass("dropdown-active");
                }else{
                    dropdownMenu.removeClass("dropdown-active");
                }
            });
        });
        $( window ).click(function(e){
            var target = $(e.target);
            if(!target.closest('.dropdown').length)
            {
                $('.dropdown-menu').removeClass("dropdown-active");
            }
        });
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["dropdown"] = function(initElem){my.init(initElem)};
}
new Framework_Dropdown();

