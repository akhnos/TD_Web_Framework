/**
 * Created by akhnos on 6/18/15.
 */
Framework_Dropdown.prototype = new Framework_Components();
function Framework_Dropdown()
{
    this.init = function(initializedElement){
        activateDropdowns(initializedElement);
        animatedFromTop(initializedElement);

    };

    var activateDropdowns = function(initializedElement){
        $(initializedElement + " .dropdown:not(.dropdown-hover)").each(function(){
            var dropDown = $(this);
            var trigger = dropDown.find(".dropdown-trigger");
            trigger.click(function(){
                if(!dropDown.hasClass("dropdown-active"))
                {
                    dropDown.addClass("dropdown-active");
                }else{
                    dropDown.removeClass("dropdown-active");
                }
                dropDown.trigger('stateChanged');
            });
        });

        $(initializedElement + " .dropdown.dropdown-hover").each(function(){
            var dropDown = $(this);
            var trigger = dropDown.find(".dropdown-trigger");
            trigger.mouseenter(function(){
                dropDown.addClass("dropdown-active");
                dropDown.trigger('stateChanged');
            });
            dropDown.mouseleave(function(){
                dropDown.removeClass("dropdown-active");
                dropDown.trigger('stateChanged');
            });
        });

        $( window ).click(function(e){
            var target = $(e.target);
            if(!target.closest('.dropdown:not(.dropdown-hover)').length)
            {
                target.closest('.dropdown:not(.dropdown-hover)').removeClass("dropdown-active");
                target.closest('.dropdown:not(.dropdown-hover)').trigger('stateChanged');
            }
        });

    };

    var animatedFromTop = function(initializedElement){
        $(initializedElement + " .dropdown.dropdown-animation-from-top").each(function(){
            var elem = $(this);
            elem.find(".dropdown-menu").css("margin-top",-1*$(this).find(".dropdown-menu").height());
        });
        $(initializedElement + " .dropdown.dropdown-animation-from-top").on("stateChanged",function(){
            var elem = $(this);
            if(elem.hasClass("dropdown-active")){
                elem.find(".dropdown-menu").css("margin-top","0px");
            }else{
                elem.find(".dropdown-menu").css("margin-top",-1*$(this).find(".dropdown-menu").height());
            }
        });
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["dropdown"] = function(initElem){
        my.init(initElem);
    };
}
new Framework_Dropdown();

