/**
 * Created by akhnos on 4/6/15.
 *     keyboardObj.enableKeyboard({
        keyCode: 13,
        enabledInputIDs: ["login_username_input","login_password_input"],
        callback: function(){}
    });
 */
function Keyboard(){
    this.keys = {};

    this.enableKeyboard = function(paramObj){
        var enabledInputIDs = paramObj["enabledInputIDs"];
        var callBackFunction = paramObj["callback"];
        var pressedKeyCode = paramObj["keyCode"];
        $(document).keypress(function(e) {
            if(e.which == pressedKeyCode) {
                var focusedElem = $(':focus');
                for(var x in enabledInputIDs){
                    var input = $("#" + enabledInputIDs[x]);
                    if(focusedElem.attr("id") == input.attr("id"))
                    {
                        callBackFunction();
                    }
                }
            }
        });
    };
}
var keyboardObj = new Keyboard();