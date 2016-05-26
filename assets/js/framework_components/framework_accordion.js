/**
 * Created by akhnos on 6/18/15.
 */

Framework_Accordion.prototype = new Framework_Components();
function Framework_Accordion()
{
    this.init = function(initializedElement){
        $(initializedElement + " .accordion-node-click .accordion-menu-header").click(function(){
            var accordionNodeHeader = $(this);
            var parentAccordionNode = accordionNodeHeader.closest(".accordion-node-click");
            var parentAccordionMenu = parentAccordionNode.closest(".accordion-menu");
            if(parentAccordionMenu.hasClass("accordion-menu-single")){
                parentAccordionMenu.find(".accordion-node-click").removeClass("active");
            }
            parentAccordionNode.toggleClass("active");
        });
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["accordion"] = function(initElem){my.init(initElem)};
}
new Framework_Accordion();