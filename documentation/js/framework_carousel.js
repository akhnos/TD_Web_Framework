/**
 * Created by akhnos on 6/18/15.
 */

Framework_Carousel.prototype = new Framework_Components();
function Framework_Carousel()
{
    this.init = function(initializedElement){
        var carousels = {};
        $(initializedElement + " .carousel-menu").each(function(index){
            var carouselContent = $(this).children(".carousel-menu-content");
            var carouselWidth = $(this).width();
            var carouselCenterPoint = (carouselWidth / 2);
            carouselContent.css("left",carouselCenterPoint + "px");
            var mouseX;
            var oldSpeed = 1;
            carouselContent.find("li").each(function(){
                var image = $(this).find("img");
                var imageClone = image.clone(true);
                imageClone.addClass("carousel-clone");
                $(this).append(imageClone);
            });
            carouselContent.find("li:first-child").addClass("carousel-current");
            carousels[index] = function(activeCarousel){
                var currentContent = carouselContent.find(".carousel-current");
                if(!carouselContent.hasClass("carousel-speed-1"))
                {
                    if(mouseX > (carouselWidth / 2))
                    {
                        var nextContent = currentContent.next("li");
                        if(nextContent.size() == 1)
                        {
                            var newCarouselContentLeft = carouselCenterPoint;
                            currentContent.prevAll("li").each(function(){
                                newCarouselContentLeft -= $(this).width();
                            });
                            newCarouselContentLeft = newCarouselContentLeft - Math.round(currentContent.width() / 2) - nextContent.width();
                            carouselContent.css("left",newCarouselContentLeft + "px");
                            nextContent.addClass("carousel-current");
                            currentContent.removeClass("carousel-current");
                        }
                    }else if(mouseX < (carouselWidth / 2))
                    {
                        var nextContent = currentContent.prev("li");
                        if(nextContent.size() == 1){

                            var newCarouselContentLeft = carouselCenterPoint;
                            currentContent.prevAll("li").each(function(){
                                newCarouselContentLeft -= $(this).width();
                            });
                            newCarouselContentLeft = newCarouselContentLeft;
                            carouselContent.css("left",newCarouselContentLeft + "px");
                            nextContent.addClass("carousel-current");
                            currentContent.removeClass("carousel-current");
                        }
                    }
                }
                carousels[index + "Timer"] = setTimeout(function(){
                    carousels[activeCarousel](activeCarousel)
                },(800 - (82 * oldSpeed)));
            };

            $(this).mouseenter(function(){
                var offset = $(this).offset();
                $(this).on( "mousemove", function( event ) {
                    mouseX = event.pageX - offset.left;
                    for(var x = 0; x < 9; x++)
                    {
                        if(Math.abs(carouselCenterPoint-mouseX) > x * carouselCenterPoint * 0.1 &&
                            Math.abs(carouselCenterPoint-mouseX) < (x + 1) * (carouselCenterPoint * 0.1))
                        {
                            if(oldSpeed != x+1)
                            {
                                carouselContent.removeClass("carousel-speed-1 " +
                                    "carousel-speed-2 " +
                                    "carousel-speed-3 " +
                                    "carousel-speed-4 " +
                                    "carousel-speed-5 " +
                                    "carousel-speed-6 " +
                                    "carousel-speed-7 " +
                                    "carousel-speed-8 " +
                                    "carousel-speed-9 ").addClass("carousel-speed-" + (x + 1));
                                oldSpeed = x + 1;
                            }
                        }
                    }
                });
                clearTimeout(carousels[index + "Timer"]);
                carousels[index](index);
            });

            $(this).mouseleave(function(){
                mouseX = (carouselWidth / 2);
                clearTimeout(carousels[index + "Timer"]);
            });
        });
    };
    var my = this;
    FRAMEWORK_COMPONENTS_OBJ.activatedComponents["carousel"] = function(initElem){my.init(initElem)};
}
new Framework_Carousel();