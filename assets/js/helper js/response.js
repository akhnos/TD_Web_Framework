/**
 * Created by akhnos on 7/20/15.
 */

function Response(){
    var containerId,clonedConfirmation,params;
    var my = this;

    this.addContainer = function(){
        if(!params.queue){
            containerId = "responseJsContainer"
            $("body").append("<div id='" + containerId + "'></div>");
            $("#" + containerId).css({background: "rgba(0,0,0,0.8)",position:"fixed",width: "100%", height:"100%",zIndex:"9999",display: "table","table-layout": "fixed"});
            $("#" + containerId).append("<div id='responseJsInner' style='display: table-cell;vertical-align: middle;float: none;'></div>");
        }
    };

    this.appendCloned = function(){
        $("#" + containerId + " #responseJsInner").html("");
        clonedConfirmation = $("#" + params.id).clone(true).css({display:"block"});
        $("#" + containerId + " #responseJsInner").append(clonedConfirmation);
    };

    this.removeContainer = function(){
        if(!params.queue)
            $("#" + containerId).remove();
        params.queue = 0;
    };
    this.alert = function(paramsObj){
        params = {
            id: paramsObj.id || "",
            acceptId: paramsObj.acceptId || "",
            onAccept: paramsObj.onAccept || function(){},
            queue: paramsObj.queue || 0
        };

        my.addContainer();
        my.appendCloned();
        clonedConfirmation.find("#" + params.acceptId).click(function(){
            params.onAccept();
            my.removeContainer();
        });
    };

    this.prompt = function(paramsObj){
        params = {
            id: paramsObj.id || "",
            acceptId: paramsObj.acceptId || "",
            rejectId: paramsObj.rejectId || "",
            inputId: paramsObj.inputId || "",
            onAccept: paramsObj.onAccept || function(){},
            onReject: paramsObj.onReject || function(){},
            queue: paramsObj.queue || 0
        };

        my.addContainer();
        my.appendCloned();
        clonedConfirmation.find("#" + params.acceptId).click(function(){
            params.onAccept(clonedConfirmation.find("#" + params.inputId).val());
            my.removeContainer();
        });

        clonedConfirmation.find("#" + params.rejectId).click(function(){
            params.onReject(clonedConfirmation.find("#" + params.inputId).val());
            my.removeContainer();
        });

    };

    this.confirmation = function(paramsObj){
        params = {
            id: paramsObj.id || "",
            acceptId: paramsObj.acceptId || "",
            rejectId: paramsObj.rejectId || "",
            onAccept: paramsObj.onAccept || function(){},
            onReject: paramsObj.onReject || function(){},
            queue: paramsObj.queue || 0
        };
        my.addContainer();
        my.appendCloned();
        clonedConfirmation.find("#" + params.acceptId).click(function(){
            params.onAccept();
            my.removeContainer();
        });
        clonedConfirmation.find("#" + params.rejectId).click(function(){
            params.onReject();
            my.removeContainer();
        });
    };
}