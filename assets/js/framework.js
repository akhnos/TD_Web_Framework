ComponentBuilder.prototype = new System();
function ComponentBuilder()
{
    /* Configurations */
    this.defaults = {
        rootFolder: "http://localhost/framework/",
        assetFolder: "http://localhost/codeigniter/framework/",
        imageFolder: "images/",
        currentPage: "",
        imageRepeat: "repeat"
    };
    if(window.location.toString().indexOf("http://www") == 0)
        this.defaults.rootFolder = "http://localhost/framework/";
    /* Configurations */
    var my = this;
    var defaults = my.defaults;

    var my = this;
    this.assets = {};
    this.components = {};
    this.helper = {
        getAsset: function(assetKey)
        {
            if(typeof my.assets[assetKey] == "undefined" && assetKey != "")
                my.helper.debugWarnings("Missing texture \n"
                    + "Texture Key: " + assetKey);
            result = (my.assets[assetKey]) ? my.assets[assetKey] : {texture: null, leftSize: 0, rightSize: 0, topSize: 0, bottomSize: 0, repeat: "repeat"};
            return result;
        },

        debugWarnings: function(warning, param1, param2)
        {
            my.logger.set.text("Warning: " + warning);
            my.logger.console();

            if(typeof param1 != "undefined"){
                my.logger.set.text(param1);
                my.logger.console();
            }

            if(typeof param2 != "undefined"){
                my.logger.set.text(param2);
                my.logger.console();
            }
        },

        displayDynamicContentToTemplate: function(parentId,templateId,variable){

            for(var x in variable)
            {
                var clonedTemplate = $("#" + templateId).clone(true);
                for(var field in variable[x])
                {
                    var elem = clonedTemplate.find("#" + field)
                    if(elem.prop("tagName") == "IMG")
                        elem.attr("src",variable[x][field]).attr("id","");
                    else if(elem.prop("tagName") == "INPUT")
                        elem.val(variable[x][field]).attr("id","");
                    else
                        elem.html(variable[x][field]).attr("id","");
                }
                clonedTemplate.appendTo("#" + parentId);
            }
            $("#" + templateId).remove();
        }
    };
    this.addCssClasses = function()
    {
        for(var x in my.assets)
        {
            backgroundX = my.assets[x]["xDimensions"];
            backgroundY = my.assets[x]["yDimensions"];
            my.assets[x].leftSize = leftSize = backgroundX[0];
            my.assets[x].rightSize = rightSize = (backgroundX[1] < 0) ? Math.abs(backgroundX[1]) : my.assets[x]["width"] - backgroundX[1];
            my.assets[x].topSize = topSize = backgroundY[0];
            my.assets[x].bottomSize = bottomSize = (backgroundY[1] < 0) ? Math.abs(backgroundY[1]) : my.assets[x]["height"] - backgroundY[1];
            menuTextureStrech = my.assets[x]["repeat"];
            $("<style type='text/css'> ." + x + " {"
                + "-moz-border-image: url('" + my.defaults.assetFolder + my.defaults.imageFolder + my.assets[x]["image"] + "') " + topSize + " " + rightSize + " " + bottomSize + " " + leftSize + " fill" + menuTextureStrech + ";"
                + "-webkit-border-image: url('" + my.defaults.assetFolder + my.defaults.imageFolder + my.assets[x]["image"] + "') " + topSize + " " + rightSize + " " + bottomSize + " " + leftSize + " fill " + menuTextureStrech + ";"
                + "-o-border-image: url('" + my.defaults.assetFolder + my.defaults.imageFolder + my.assets[x]["image"] + "') " + topSize + " " + rightSize + " " + bottomSize + " " + leftSize + " fill " + menuTextureStrech + ";"
                + "border-image: url('" + my.defaults.assetFolder + my.defaults.imageFolder + my.assets[x]["image"] + "') " + topSize + " " + rightSize + " " + bottomSize + " " + leftSize + " fill " + menuTextureStrech + ";"
                + "border-width: " + topSize + "px " + rightSize + "px " + bottomSize + "px " + leftSize + "px;\""
                + "} </style>").appendTo("head");
        }
    };

    this.getElByClass = function(className)
    {
        return my.defaults.currentPage.getElementsByClassName(className);
    };

    this.getPlaceHolders = function()
    {
        var placeholders = my.getElByClass("textbox-placeholder");
        for(var x = 0; x < placeholders.length; x++)
        {
            placeholder = $(placeholders[x]);
            placeholder.siblings("input").attr("placeholder",placeholder.html());
            placeholder.hide();
        }
    };

    this.getOriginalText = function()
    {
        var originalTexts = my.getElByClass("default-text-original");
        my.components["tmpTexts"] = {};
        for(var x = 0; x < originalTexts.length; x++)
        {
            originalText = $(originalTexts[x]);
            if(my.components["tmpTexts"][originalText.attr("id")])
                my.helper.debugWarnings("Duplicated original text id \n"
                    + "Text Id:" + originalText.attr("id"));
            my.components["tmpTexts"][originalText.attr("id")] = originalText.html();
        }
    };

    this.getTexts = function()
    {
        var texts = my.getElByClass("default-text");
        $(texts).each(function(i){
            var textNode = $(this);
            var dataVars = textNode.attr("data-vars");
            var innerText = textNode.html();
            if($("#" + innerText).length > 0)
            {
                var originalText = $("#" + innerText);
                var innerHtml = originalText.html();
                if(typeof dataVars != "undefined")
                {
                    dataVars = JSON.parse(dataVars);
                    for(var y in dataVars)
                    {
                        innerHtml = innerHtml.replace("%s", dataVars[y]);
                    }
                }
                textNode.html(innerHtml);
                textNode.removeClass("default-text");
                delete(my.components["tmpTexts"][innerText]);
            }else{
                my.helper.debugWarnings("Missing default-text-original classname  \n"
                    + "Warning On: default-text \n"
                    + "Selector Id: " + textNode.attr("id") + "\n"
                    + "Closest Id: " + textNode.closest('[id]').attr("id") + "\n"
                    + "Inner Text: " + innerText);
            }
        });

        if(Object.keys(my.components["tmpTexts"]).length > 0)
            my.helper.debugWarnings("Not used texts", my.components["tmpTexts"]);
    };

    this.preLoad = function()
    {
        var assetLoad = function(x){
            assets = new Array();
            assets[x] = my.assets[x];
            my.assets[x] = {};
            my.assets[x]["image"] = assets[x].texture;
            my.assets[x]["repeat"] = (typeof assets[x].repeat == "undefined") ? my.defaults.imageRepeat : assets[x].repeat;
            my.assets[x]["element"] = $('<img id="dynamic">');
            my.assets[x]["element"].attr('src', my.defaults.assetFolder + my.defaults.imageFolder + my.assets[x]["image"]).load(function(){
                my.assets[x]["width"] = this.width;
                my.assets[x]["height"] = this.height;
            });

            if(counter == assetsLength)
            {
                my.assets[x]["element"].load(function() {
                    my.collector();
                });
            }
            my.assets[x]["xDimensions"] = assets[x].x;
            my.assets[x]["yDimensions"] = assets[x].y;
        }

        var counter = 1;
        var assetsLength = Object.keys(my.assets).length;
        for(var x in my.assets)
        {
            assetLoad(x);
            counter++;
        }
        if(assetsLength == 0)
            my.collector();
    };

    this.collector = function()
    {

        my.addCssClasses();
        my.getOriginalText();
        my.getTexts();
        my.getPlaceHolders();
    };

    this.init = function(initializedElement)
    {
        var ajax = new Ajax();
        my.defaults.currentPage = document.getElementById(initializedElement);
        my.preLoad();
        $("#" + initializedElement + " a").each(function(){
            if($(this).attr("href").indexOf("http://") < 0)
                this.href = my.defaults.rootFolder + $(this).attr("href");
        });
        $( "a" ).click(function( event ) {
            if(!event.ctrlKey)
            {
                event.preventDefault();
            }
        });
        new Framework_Components("#" + initializedElement);
    };
}

function Framework_Components(initializedElement)
{
    this.tab = function(){
        $(initializedElement + " .tab .tab-link").click(function(){
            var selectedTabLink = $(this);
            if(!selectedTabLink.hasClass("unselectable") && !selectedTabLink.hasClass("tab-link-selected"))
            {
                var parentTab = selectedTabLink.closest(".tab");
                parentTab.find(".tab-link").removeClass("tab-link-selected");
                selectedTabLink.addClass("tab-link-selected");
            }
        });
    };

    this.accordionMenu = function(){
        $(initializedElement + " .accordion-node-click .accordion-menu-header").click(function(){
            var accordionNodeHeader = $(this);
            var parentAccordionNode = accordionNodeHeader.closest(".accordion-node-click");
            parentAccordionNode.toggleClass("active");
        });
    };

    this.imageSlideMenu = function(){
        var sliders = {};
        $(initializedElement + " .slider-menu").each(function(index){
            var sliderContainer = $(this);
            sliderContainer.attr("id","slider" + index);
            var sliderLeftTrigger = sliderContainer.find(".slider-right-slide");
            var sliderRightTrigger = sliderContainer.find(".slider-left-slide");
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

    this.yawningMenu = function(){
        $(initializedElement + " .yawning-menu").each(function(){
            var nodeCount = $(this).children(".yawning-node").size();
            nodeCount = nodeCount + 1;
            var widthSize = Math.round(24/nodeCount);
            var openedNodeWidthSize = 24 - (widthSize * (nodeCount - 2));
            $(this).children(".yawning-node").each(function(index){
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

    this.parallaxLayersMenu = function(){
        $(initializedElement + " .parallax-layers-menu").each(function(index){
            var parallaxContent = $(this).children(".parallax-layers-menu-content");
            var win = $( window );
            var windowHeight = win.height();
            var oldScrollTop = win.scrollTop();
            win.scroll(function() {
                var scrollTop = win.scrollTop();
                var parallaxStartTop = parallaxContent.offset().top;
                var windowTop = windowHeight + scrollTop;
                if(windowTop >= parallaxStartTop)
                {
                    $(parallaxContent).find(".parallax-layers-layer").each(function(index){
                        var changeSpeed = 10 + (index * 5);
                        var newTop = $(this).css('backgroundPosition').split(" ");
                        if(oldScrollTop < scrollTop)
                            newTop = parseInt(newTop[1]) - changeSpeed;
                        else
                            newTop = parseInt(newTop[1]) + changeSpeed;
                        $(this).css("background-position","0% " + newTop + "px");
                    });
                }
                oldScrollTop = scrollTop;
            });
        });
    };

    this.carouselMenu = function(){
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

    this.popupMenu = function(){
        $(initializedElement + " .popup-element-header").click(function(){
            var popupElementHeader = $(this);
            var popupElementContent = popupElementHeader.closest(".popup-element-content");
            popupElementContent.toggleClass("popup-active");
        });
    };

    this.overlayMenu = function(){
        $(initializedElement + " .overlay-menu").each(function(){
            var overlayParent = $(this);
            if(overlayParent.has(".overlay-menu-x") || overlayParent.has(".overlay-menu-y") || overlayParent.has(".overlay-menu-xy"))
            {
                var overlayHeader = overlayParent.find(".overlay-menu-header");
                var overlayX =  overlayParent.children('.overlay-menu-x');
                var overlayY =  overlayParent.children('.overlay-menu-y');
                var overlayXY =  overlayParent.children('.overlay-menu-xy');
                overlayX.addClass("overlay-menu-content");
                overlayY.addClass("overlay-menu-content");
                overlayXY.addClass("overlay-menu-content");
                var animationDuration = {queue:false,duration:100};
                overlayParent.mouseenter(function(e){
                    overlayX.addClass("overlay-active");
                    overlayY.addClass("overlay-active");
                    overlayXY.addClass("overlay-active");
                    if (e.offsetX < overlayParent.width() / 4){
                        overlayX.css("left","-100%");
                        overlayXY.css("left","-100%");
                    } else if(e.offsetX > 3 * overlayParent.width() / 4){
                        overlayX.css("left","100%");
                        overlayXY.css("left","100%");
                    }else{
                        overlayX.css("left","0%");
                        overlayXY.css("left","0%");
                    }

                    if (e.offsetY < overlayParent.height() / 4){
                        overlayY.css("top","-100%");
                        overlayXY.css("top","-100%");
                    } else if (e.offsetY > 3 * overlayParent.height() / 4) {
                        overlayY.css("top","100%");
                        overlayXY.css("top","100%");
                    }else{
                        overlayY.css("top","0%");
                        overlayXY.css("top","0%");
                    }
                    overlayX.animate({left: "0%",top: "0%"}, animationDuration );
                    overlayY.animate({left: "0%",top: "0%"}, animationDuration );
                    overlayXY.animate({left: "0%",top: "0%"}, animationDuration );
                });

                overlayParent.mouseleave(function(e){
                    overlayX.addClass("overlay-active");
                    overlayY.addClass("overlay-active");
                    overlayXY.addClass("overlay-active");
                    if (e.offsetX < overlayParent.width() / 4){
                        overlayX.animate({left: "-100%"}, animationDuration );
                        overlayXY.animate({left: "-100%"}, animationDuration );
                    } else if(e.offsetX > 3 * overlayParent.width() / 4){
                        overlayX.animate({left: "100%"}, animationDuration );
                        overlayXY.animate({left: "100%"}, animationDuration );
                    }

                    if (e.offsetY < overlayParent.height() / 4){
                        overlayY.animate({top: "-100%"}, animationDuration );
                        overlayXY.animate({top: "-100%"}, animationDuration );
                    } else if (e.offsetY > 3 * overlayParent.height() / 4) {
                        overlayY.animate({top: "100%"}, animationDuration );
                        overlayXY.animate({top: "100%"}, animationDuration );
                    }
                });
            }
        });

    };

    this.dropDownMenu = function(){
        $(initializedElement + " .dropdown").each(function(){
            var dropDown = $(this);
            var trigger = dropDown.find(".dropdown-trigger");
            var dropdownMenu = trigger.siblings('.dropdown-menu');
            trigger.click(function(){
                if(!dropdownMenu.hasClass("dropdown-active"))
                {
                    dropdownMenu.addClass("dropdown-active");
                }else{
                    dropdownMenu.removeClass("dropdown-active");
                }
            });
            dropDown.mouseleave(function(){
                dropdownMenu.removeClass("dropdown-active");
            });
        });
    };

    this.dropDownMenu();
    this.overlayMenu();
    this.popupMenu();
    this.carouselMenu();
    this.parallaxLayersMenu();
    this.yawningMenu();
    this.tab();
    this.accordionMenu();
    this.imageSlideMenu();
}