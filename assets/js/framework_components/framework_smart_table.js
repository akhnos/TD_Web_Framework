/**
 * Created by akhnos on 3/29/16.
 */

Framework_Smart_Table.prototype = new Framework_Components();
function Framework_Smart_Table()
{
    this.init = function(initializedElement){
        $(initializedElement + " .smart-table").each(function(){
            var smartTable = $(this);
            var rowCount = 0;
            var page = 1;
            var pageRowCount = smartTable.attr("data-item-count");

            smartTable.attr("data-page",page);
            smartTable.find(".smart-table-row").each(function(){
                rowCount++;
                $(this).attr("data-item",rowCount);
            });
            var pageCount = Math.ceil(rowCount / pageRowCount);
            for(var x = 1; x <= pageCount;x++){
                var obj = $("<div class='smart-page-link' data-page-link='" + x + "'>" + x + "</div>");
                smartTable.find(".smart-table-pagination").append(obj);
            }
            smartTable.find(".smart-page-link").click(function(){
                var pageLink = $(this).attr("data-page-link");
                var rows = smartTable.find(".smart-table-row").filter(function() {
                    return $(this).attr("data-item") > (pageLink - 1) * pageRowCount && $(this).attr("data-item") <= pageLink * pageRowCount;
                });
                ;
                smartTable.find(".smart-table-row").addClass("display-none");
                rows.removeClass("display-none");
                smartTable.attr("data-page",pageLink);
            });
            smartTable.find(".smart-page-link[data-page-link='1']").click();
        });
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["smart_table"] = function(initElem){my.init(initElem)};
}
new Framework_Smart_Table();