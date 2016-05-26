/**
 * Created by akhnos on 6/18/15.
 */
Framework_Yawning.prototype = new Framework_Components();
function Framework_Yawning()
{
    this.init = function(initializedElement){
        $(initializedElement + " .yawning-menu").each(function(){
            var nodeCount = $(this).children(".yawning-node").size();
            nodeCount = nodeCount + 1;
            var widthSize = Math.round(24/nodeCount);
            var openedNodeWidthSize = 24 - (widthSize * (nodeCount - 2));
            $(this).children(".yawning-node").each(function(index){
                $(this).removeClass (function (index, css) {
                    return (css.match (/(^|\s)dw-\S+/g) || []).join(' ');
                });
                $(this).addClass("dw-" + widthSize);
                if(index == 0)
                {
                    $(this).addClass("active dw-" + openedNodeWidthSize);
                    $(this).removeClass("dw-" + widthSize);
                }
                $(this).mouseover(function(){
                    $(this).siblings('.yawning-node').removeClass('active dw-' + openedNodeWidthSize).addClass('dw-' + widthSize);
                    $(this).removeClass("dw-" + widthSize).addClass("active dw-" + openedNodeWidthSize);
                });
            });
        });
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["yawning"] = function(initElem){my.init(initElem)};
}
new Framework_Yawning();