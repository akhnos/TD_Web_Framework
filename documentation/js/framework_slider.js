/**
 * Created by akhnos on 6/18/15.
 */

Framework_Slider.prototype = new Framework_Components();
function Framework_Slider()
{
    this.init = function(initializedElement){
        var sliders = {};
        $(initializedElement + " .slider-menu").each(function(index){
            var sliderContainer = $(this);
            sliderContainer.attr("id","slider" + index);
            var sliderLeftTrigger = sliderContainer.find(".slider-left-slide");
            var sliderRightTrigger = sliderContainer.find(".slider-right-slide");
            var sliderImages = sliderContainer.find(".slider-images");
            sliderImages.find("li").addClass("slider-next");
            sliderImages.find("li:first-child").removeClass("slider-next").addClass("slider-current");

            sliderLeftTrigger.click(function(){
                var parentDiv = $(this).parent();
                var currentImage = parentDiv.find(".slider-current");
                var nextImage = currentImage.next("li");
                var nextAllImages = currentImage.nextAll("li");
                if(nextImage.size() == 1)
                {
                    currentImage.removeClass("slider-current");
                    nextImage.removeClass("slider-next").addClass("slider-current");
                    nextImage.nextAll("li").addClass("slider-next");
                    nextImage.prevAll("li").addClass("slider-previous");
                }else{
                    sliderRightTrigger.click();
                }

                if(nextAllImages.size() == 1){
                    sliderImages.find("li:first-child").appendTo(sliderImages)
                        .removeClass("slider-previous").addClass("slider-next");
                }
                clearTimeout(sliders["slider" + index + "Timer"]);
                sliders["slider" + index]("slider" + index);
            });

            sliderRightTrigger.click(function(){
                var parentDiv = $(this).parent();
                var currentImage = parentDiv.find(".slider-current");
                var nextImage = currentImage.prev("li");
                var nextAllImages = currentImage.prevAll("li");
                if(nextImage.size() == 1)
                {
                    currentImage.removeClass("slider-current");
                    nextImage.removeClass("slider-previous").addClass("slider-current");
                    nextImage.nextAll("li").addClass("slider-next");
                    nextImage.prevAll("li").addClass("slider-previous");
                }else{
                    sliderLeftTrigger.click();
                }

                if(nextAllImages.size() == 1){
                    sliderImages.find("li:last-child").prependTo(sliderImages)
                        .removeClass("slider-next").addClass("slider-previous");
                }
                clearTimeout(sliders["slider" + index + "Timer"]);
                sliders["slider" + index]("slider" + index);
            });

            sliders["slider" + index] = function(id){
                sliders[id + "Timer"] = setTimeout(function(){
                    var parentDiv = $("#" + id);
                    if(parentDiv.hasClass("slider-activated"))
                    {
                        var currentImage = parentDiv.find(".slider-current");
                        var nextImage = currentImage.next("li");
                        var nextAllImages = currentImage.nextAll("li");
                        if(nextImage.size() == 1)
                        {
                            currentImage.removeClass("slider-current");
                            nextImage.removeClass("slider-next").addClass("slider-current");
                            nextImage.nextAll("li").addClass("slider-next");
                            nextImage.prevAll("li").addClass("slider-previous");
                        }
                        if(nextAllImages.size() == 1){
                            sliderImages.find("li:first-child").appendTo(sliderImages)
                                .removeClass("slider-previous").addClass("slider-next");
                        }
                        sliders["slider" + index](id);
                    }
                },5000);
            };
            setTimeout(function(){$("#slider" + index).addClass("slider-activated")},4990);
            sliders["slider" + index]("slider" + index);
        });
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["slider"] = function(initElem){my.init(initElem)};
}
new Framework_Slider();
