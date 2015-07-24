/**
 * Created by akhnos on 13.12.2013.
 */
function Interactions()
{
    this.duration;
    this.id;
    this.easing;
    this.animator = new PDAEngine();
    this.logger = new Log();
    this.logger.set.debug(true);
    this.animate = function(animation,object)
    {
        if(typeof object.id == "undefined")
            object.id = this.id;
        if(typeof  object.duration == "undefined")
            object.duration = this.duration;
        if(typeof object.easing == "undefined")
            object.easing = this.easing;
        this.animator.animations[animation](object);
    };


    this.form = new Form();
    this.ajax = new Ajax();
    this.formControl = function(formElements)
    {
        controlFlag = true;
        for(var element in formElements)
        {
            this.form.set.inputObject(formElements[element]);
            formElements[formElements[element]] = new Array();
            formElements[formElements[element]]["value"] = this.form.getValueOfInput();
            formElements[formElements[element]]["flag"] = this.form.required(this.form.interaction);
            if(!formElements[formElements[element]]["flag"])
                controlFlag = false
        }
        return {flag: controlFlag, elements: formElements}
    }
}

var pageInteractionObj;

Index_Page.prototype = new Interactions();
function Index_Page()
{

}