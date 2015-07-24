/**
 * Created by akhnos on 2/3/15.
 */
Captcha.prototype = new System();
function Captcha()
{
    this.defaults = {
        captcha_input_id: "",
        captcha_container_id: "",
        captcha_image: "",
        captcha_image_width: "",
        captcha_image_height: "",
        captcha_image_column: "",
        captcha_image_row: "",
        container_div_id: "",
        captchas: new Array()
    };
    current = {
        x: 0,
        y: 0
    };
    var my = this;

    var setDefaults = function(options){
        for(var x in options)
            my.defaults[x] = options[x];
        my.defaults.captcha_image_width = my.defaults.captcha_image_width / my.defaults.captcha_image_column;
        my.defaults.captcha_image_height = my.defaults.captcha_image_height / my.defaults.captcha_image_row;
        current.x = Math.floor(Math.random() * my.defaults.captcha_image_column);
        current.y = Math.floor(Math.random() * my.defaults.captcha_image_row);
    };

    var innerHtml = function(){
        var html = "<div style='width: 100%;' >" +
            "<div id='" + my.defaults.captcha_container_id + "' style='width: " + my.defaults.captcha_image_width + "px;height: " + my.defaults.captcha_image_height + "px;'></div>" +
            "<div>" +
            "<input type='text' placeholder='captcha' id='" + my.defaults.captcha_input_id + "'>" +
            "</div>" +
            "</div>";
        return html;
    };

    var appendHtml = function(){
        $("#" + my.defaults.container_div_id).append(innerHtml());
    };

    var setCaptchaCss = function(){
        $("#" + my.defaults.captcha_container_id).css({
            "background-image": "url(" + my.defaults.captcha_image + ")",
            "background-position": (-1 * current.y * my.defaults.captcha_image_width) + "px " + (-1 * current.x * my.defaults.captcha_image_height) + "px"
        });
    };

    this.init = function(options){
        setDefaults(options);
        appendHtml();
        setCaptchaCss();
    };

    this.control = function(){
        console.log(current.x,current.y);
        var control = $("#" + my.defaults.captcha_input_id).val();
        if(control == my.defaults.captchas[current.x][current.y]){
            return true;
        }
        return false;
    }
}