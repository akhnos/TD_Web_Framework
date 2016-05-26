/**
 * Created by akhnos on 8/24/15.
 */

/*
    var filterObj = new Filter({
        className: "xxx", // Filter elements which have this class
        refreshCounter: true || false // If there is cell counting
        counterClass: "xxx" // If refreshCounter is true
    });
    filterObj.keyboardFilter({
        inputId: "xxx", // Filtering Input Id
    });

    filterObj.attrFilter({
        dataAttribute: "xxx", // Filtered attribute
    });
*/

function Filter(paramsObj){

    var my = this;
    var dataAttribute;
    var enabledClass = paramsObj["className"];
    var counterClass = paramsObj["counterClass"] || "";
    var refreshCounter = paramsObj["refreshCounter"] || false;
    $("." + enabledClass).addClass("keyboardFilterDisplayedRow attrFilterDisplayedRow");
    this.refreshCounter = function(){
        if(refreshCounter){
            var elem = $("." + enabledClass + ".keyboardFilterDisplayedRow.attrFilterDisplayedRow");
            var counterElem = "." + counterClass;
            elem.each(function(index){
                $(this).find(counterElem).html(index + 1);
            });
        }
    };

    this.keyboardFilter = function(params){
        var inputId = params["inputId"];
        $("." + enabledClass).addClass("keyboardFilterDisplayedRow");
        $("#" + inputId).keyup(function(){
            var inputVal = $(this).val().toLowerCase();
            $("." + enabledClass + ".keyboardFilterDisplayedRow").addClass("keyboardFilterHiddenRow").removeClass("keyboardFilterDisplayedRow");
            $("." + enabledClass + ".keyboardFilterHiddenRow").filter(function() {
                return $(this).attr('data-filter-keyboard').toLowerCase().indexOf(inputVal) > -1;
            }).removeClass("keyboardFilterHiddenRow").addClass("keyboardFilterDisplayedRow");
            if(inputVal == "")
                $("." + enabledClass).addClass("keyboardFilterDisplayedRow").removeClass("keyboardFilterHiddenRow");
            my.refreshCounter();
        });
    };

    this.attrFilter = function(params){
        dataAttribute = params["dataAttribute"] || "";
        $("." + enabledClass).addClass("attrFilterDisplayedRow");
        $("." + enabledClass + ".attrFilterDisplayedRow[" + dataAttribute + " = false]").addClass("attrFilterHiddenRow").removeClass("attrFilterDisplayedRow");
        $("." + enabledClass + ".attrFilterDisplayedRow[" + dataAttribute + " = true]").removeClass("attrFilterHiddenRow").addClass("attrFilterDisplayedRow");
        my.refreshCounter();
    };
}
