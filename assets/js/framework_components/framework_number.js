/**
 * Created by akhnos on 7/11/15.
 */



Framework_Number.prototype = new Framework_Components();
function Framework_Number()
{
    var my = this;
    this.init = function(initializedElement){
        $(initializedElement + " .number-changeable").each(function(index){
            $(this).attr("data-number-changeable",parseInt($(this).html()));
        });
        $(initializedElement + " .number-changeable").bind("DOMSubtreeModified",function(){
            var originalElem = $(this);
            var elem =originalElem.clone(true);
            elem.removeClass("number-changeable").addClass("number-changeable-copy").unbind("DOMSubtreeModified");
            if(!originalElem.siblings(".number-changeable-copy")[0]){
                if(parseInt(elem.html()) % 1 === 0){
                    originalElem.addClass("display-none").after(elem);
                    var currentNumber = parseInt(elem.html());
                    var prevNumber = parseInt(elem.attr("data-number-changeable"));
                    var subNum = Math.ceil(Math.abs(currentNumber - prevNumber) / 20);
                    originalElem.attr("data-number-changeable",currentNumber);
                    var resultNum = prevNumber;
                    elem.html(prevNumber);
                    subNum = (prevNumber < currentNumber) ? subNum : subNum * -1;
                    my.changeNumber(originalElem,elem,prevNumber,currentNumber,subNum,resultNum);
                }
            }
        });
    };
    this.changeNumber = function(originalElem,elem,prevNumber,currentNumber,subNum,resultNum){
        setTimeout(function(){
            resultNum = resultNum + subNum;
            if(resultNum >= currentNumber && prevNumber <= currentNumber)
            {
                resultNum = currentNumber;
                elem.remove();
                originalElem.removeClass("display-none");
            }else if(resultNum <= currentNumber && prevNumber >= currentNumber){
                resultNum = currentNumber;
                elem.remove();
                originalElem.removeClass("display-none");

            }else{
                elem.html(resultNum);
                my.changeNumber(originalElem,elem,prevNumber,currentNumber,subNum,resultNum);
            }
        },50);
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["number_changeable"] = function(initElem){my.init(initElem)};
}
new Framework_Number();