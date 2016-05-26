
function PDAEngine()
{
    
    this.defaults = 
    {
        currentObject: {},
        callback: function(){}
    };
    

    
    var pda = this;
    
    
    this.__constructor = function (animatedObject)
    {
        pda.options = 
        {
            duration: 1000,
            queue: false,
            easing: 'linear',
            complete: function(){}
        };
        pda.defaults.currentObject = animatedObject;
        pda.properties = {};
        pda.options.duration = pda.setOption(pda.options.duration,pda.defaults.currentObject.duration);
        pda.options.queue = pda.setOption(pda.options.queue,pda.defaults.currentObject.queue);
        pda.options.easing = pda.setOption(pda.options.easing,pda.defaults.currentObject.easing);
        pda.options.complete = pda.setOption(pda.options.complete,pda.defaults.currentObject.complete);
    }
    
    this.setOption = function(option,value)
    {
        if(typeof value != "undefined")
            option = value;
        return option
    }
    this.animations = 
    {

        animate: function()
        {   
            
              $("#" + pda.defaults.currentObject.id).animate(
                    pda.properties,
                    pda.options
                );

            return pda.queueCollector(pda.defaults.currentObject);
        },
        
        moveAnimation : function(animatedObject)
        {
            pda.__constructor(animatedObject);
            pda.properties = 
            {
                left: animatedObject.left,
                top: animatedObject.top
            } 
            return pda.animations.animate();
        },

        marginAnimation: function(animatedObject)
        {
            pda.__constructor(animatedObject);
            pda.properties =
            {
                marginLeft: animatedObject.left,
                marginTop: animatedObject.top
            }
            return pda.animations.animate();
        },
        
        sizeAnimation : function(animatedObject)
        {
            pda.__constructor(animatedObject);
            pda.properties = 
            {
                width: animatedObject.width,
                height: animatedObject.height
            }
            return pda.animations.animate();
        },
        
        fadeAnimation : function(animatedObject)
        {
            pda.__constructor(animatedObject);
            pda.properties = 
            {
                opacity: animatedObject.opacity
            } 
            return pda.animations.animate();
        },
        
        colorAnimation : function(animatedObject)
        {
            pda.__constructor(animatedObject);
            pda.properties = 
            {
                color: animatedObject.color
            } 
            return pda.animations.animate();
            
        },
        
        borderColorAnimation : function(animatedObject)
        {
            pda.__constructor(animatedObject);
            pda.properties = 
            {
                borderColor: animatedObject.borderColor
            } 
            return pda.animations.animate();
            
        },
        
        fontAnimation : function(animatedObject)
        {
            pda.__constructor(animatedObject);
            
            pda.properties = 
            {
                fontSize: animatedObject.size
            } 
            return pda.animations.animate(); 
        },
        
        backgroundAnimation : function(animatedObject)
        {
            pda.__constructor(animatedObject);
            
            pda.properties = 
            {
                backgroundPositionX: animatedObject.backgroundX,
                backgroundPositionY: animatedObject.backgroundY
            } 
            return pda.animations.animate(); 
        },

        particleAnimation : function()
        {
            
        },
        
        dragdropAnimation : function() 
        {
            
            
        },
        
        spriteAnimation : function()
        {
            return{ 
                interval: function(params)
                {
                    params.spriteInterval = setInterval(function(){
                        params.innerHtmlElement.css({left: (params.leftAddition * params.counter * -1) + "px"});
                        params.counter++;
                        if(params.counter == params.count)
                        {
                            params.complete();
                            if(params.loop)
                            {
                                params.innerHtmlElement.css({left: "0px"});
                                params.counter = 0;
                            }
                            else
                                clearInterval(params.spriteInterval);
                        }   
                    },(1000 / params.fps));  
                },
                
                spriteIniter: function(params)
                {
                    spriteIniter = this;
                    spriteIniter.spriteCanvasDivId = params.id;
                    spriteIniter.fps = (params.fps) ? params.fps : 30;
                    spriteIniter.count = (params.count) ? params.count : 32;
                    spriteIniter.loop = (params.loop) ? params.loop : false;
                    spriteIniter.complete = (params.complete) ? params.complete : function(){};
                    spriteIniter.innerCanvasElement = $("#" + spriteIniter.spriteCanvasDivId);
                    spriteIniter.leftAddition =  parseInt(spriteIniter.innerCanvasElement.css("width"));
                    spriteIniter.canvasInnerHtml = spriteIniter.innerCanvasElement.html();
                    spriteIniter.changedHtml = "<div id='" + spriteIniter.spriteCanvasDivId + "_innerCanvas' style='position:absolute;top:0px;left:0px;'>" + spriteIniter.canvasInnerHtml + "</div>";
                    spriteIniter.innerCanvasElement.html(spriteIniter.changedHtml);
                    spriteIniter.innerHtmlElement = $("#" + spriteIniter.spriteCanvasDivId + "_innerCanvas");
                    spriteIniter.counter = 0;                    
                    pda.animations.spriteAnimation().interval(spriteIniter);
                },
                
                init: function(params)
                {
                    new pda.animations.spriteAnimation().spriteIniter(params);
                }
                
            }
        },
        
        rotationAnimation : function() 
        {
            
        },
        
        timer : function() 
        {
            
        },
        
        arrayDisplayAnimation : function(animatedObject)
        {
            pda.__constructor(animatedObject);
            
            lengthOfAnimatedArray = pda.defaults.currentObject.animatedArrayIds.length;
            duration = pda.options.duration;
            intervalTimeAdd = Math.round(duration / lengthOfAnimatedArray);
            
            return{
                hide: function()
                {
                    new pda.animations.arrayDisplayAnimation(animatedObject).animationProcess("hide",pda.defaults.currentObject.animatedArrayIds,lengthOfAnimatedArray);
                    return pda.queueCollector(pda.defaults.currentObject);
                },
                
                show: function()
                {
                    new pda.animations.arrayDisplayAnimation(animatedObject).animationProcess("show",pda.defaults.currentObject.animatedArrayIds,lengthOfAnimatedArray);
                    return pda.queueCollector(pda.defaults.currentObject);
                },
                
                animationProcess: function(mode,animatedArrayIds,lengthOfAnimatedArray,currentIndex)
                {
                    complete = pda.options.complete;
                    currentIndex = 0;
                    this.animatedArrayIds = animatedArrayIds;
                    this.lengthOfAnimatedArray = lengthOfAnimatedArray;
                    this.mode = mode;
                    procVar = this;
                    procVar.time = setInterval(function (){
                        if(currentIndex < lengthOfAnimatedArray)
                        {
                            procVar.nodeElement = animatedArrayIds[currentIndex];
                            if(mode === "show")
                                $('#'+procVar.nodeElement).show();
                            else if(mode === "hide")
                                $('#'+procVar.nodeElement).hide();
                            currentIndex++;
                        }else
                        {
                            clearInterval(procVar.time);
                            complete();
                        }
                    },intervalTimeAdd);
                }
            }
        },
        
        textDisplayAnimation : function(animatedObject)
        {
            pda.__constructor(animatedObject);
            divId = pda.defaults.currentObject.id;

            return{
                hide: function()
                {
                    new pda.animations.textDisplayAnimation(animatedObject).animationProcess("hide",divId);
                    return pda.queueCollector(pda.defaults.currentObject);
                },
                
                show: function()
                {
                    new pda.animations.textDisplayAnimation(animatedObject).animationProcess("show",divId);
                    return pda.queueCollector(pda.defaults.currentObject);
                },
                
                animationProcess: function(mode,divId)
                {
                    complete = pda.options.complete;
                    var text = $("#" + divId).text();
                    var html = $("#" + divId).html();
                    var textIdArray = new Array();
                    var otherText = "";
                    var counter = 0;
                    var display = "none";
                    if(mode === "hide")
                    {
                        dispay = "inline";
                    }
                    for(letter in html)
                    {
                        if(html[letter] === text[counter])
                        {
                            otherText += "<span id="+divId+counter+" style='display:" + display + ";'>" + text[counter] + "</span>";
                            textIdArray[counter] = divId+counter;
                            counter++;
                        }else{
                            otherText += html[letter];
                        }
                    }
                    $("#" + divId).html(otherText);

                    
                    if(mode === "show")
                        pda.animations.arrayDisplayAnimation
                        (
                            {
                                animatedArrayIds: textIdArray,
                                duration: pda.options.duration,
                                complete: complete
                            }
                        ).show();
                    else if(mode === "hide")
                        pda.animations.arrayDisplayAnimation
                        (
                            {
                                animatedArrayIds: textIdArray,
                                duration: pda.options.duration,
                                complete: complete
                            }
                        ).hide();
                }
            }
        }
    }

    

    this.pdaUI = function(animatedObject)
    {
        pda.__constructor(animatedObject);
        options = {};
        return{
            blind:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "blind", options, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "blind", options, pda.options.duration, pda.options.complete );
                } 
            },
            
            bounce:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "bounce", options, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "bounce", options, pda.options.duration, pda.options.complete );
                } 
            },
            
            clip:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "clip", options, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "clip", options, pda.options.duration, pda.options.complete );
                } 
            },
            
            drop:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "drop", options, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "drop", options, pda.options.duration, pda.options.complete );
                } 
            },
            
            explode:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "explode", options, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "explode", options, pda.options.duration, pda.options.complete );
                } 
            },
            
            fold:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "fold", options, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "fold", options, pda.options.duration, pda.options.complete );
                } 
            },
            
            highlight:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "highlight", options, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "highlight", options, pda.options.duration, pda.options.complete );
                } 
            },
            
            pulsate:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "pulsate", options, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "pulsate", options, pda.options.duration, pda.options.complete );
                } 
            },
            
            scale:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "scale", {percent: 0}, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "scale", {percent: 100}, pda.options.duration, pda.options.complete );
                } 
            },
            
            shake:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "shake", options, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "shake", options, pda.options.duration, pda.options.complete );
                } 
            },
            
            size:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "size", {to: {width: 200, height: 60}}, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "size", {to: { width: 200, height: 60}}, pda.options.duration, pda.options.complete );
                } 
            },
            
            slide:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "slide", options, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "slide", options, pda.options.duration, pda.options.complete );
                } 
            },
            
            puff:
            {
                hide : function()
                {
                    $( "#" + pda.defaults.currentObject.id ).hide( "puff", options, pda.options.duration, pda.options.complete );
                },
                                
                show: function()
                {
                    $( "#" + pda.defaults.currentObject.id ).show( "puff", options, pda.options.duration, pda.options.complete );
                }
            }
        };
    };
    

    
    this.queueCollector = function(object)
    {
        
        return {
            sizeAnimation: function(object){return pda.animations.sizeAnimation(object)},
            moveAnimation: function(object){return pda.animations.moveAnimation(object)},
            marginAnimation: function(object){return pda.animations.marginAnimation(object)},
            fadeAnimation: function(object){return pda.animations.fadeAnimation(object)},
            fontAnimation: function(object){return pda.animations.fontAnimation(object)},
            backgroundAnimation: function(object){return pda.animations.backgroundAnimation(object)},
            spriteAnimation: function(object){return pda.animations.spriteAnimation(object)},
            arrayDisplayAnimation: function(object){return pda.animations.arrayDisplayAnimation(object)},
            textDisplayAnimation: function(object){return pda.animations.textDisplayAnimation(object)}
        };
    }
    
    this.easing =
    {
        swing: function(){return "swing"},
        easeInQuad: function(){return "easeInQuad"},
        easeOutQuad: function(){return "easeOutQuad"},
        easeInOutQuad: function(){return "easeInOutQuad"},
        easeInCubic: function(){return "easeInCubic"},
        easeOutCubic: function(){return "easeOutCubic"},
        easeInOutCubic: function(){return "easeInOutCubic"},
        easeInQuint: function(){return "easeInQuint"},
        easeOutQuint: function(){return "easeOutQuint"},
        easeInOutQuint: function(){return "easeInOutQuint"},
        easeInSine: function(){return "easeInSine"},
        easeOutSine: function(){return "easeOutSine"},
        easeInOutSine: function(){return "easeInOutSine"},
        easeInExpo: function(){return "easeInExpo"},
        easeOutExpo: function(){return "easeOutExpo"},
        easeInOutExpo: function(){return "easeInOutExpo"},
        easeInCirc: function(){return "easeInCirc"},
        easeOutCirc: function(){return "easeOutCirc"},
        easeInOutCirc: function(){return "easeInOutCirc"},
        easeInElastic: function(){return "easeInElastic"},
        easeOutElastic: function(){return "easeOutElastic"},
        easeInOutElastic: function(){return "easeInOutElastic"},
        easeInBack: function(){return "easeInBack"},
        easeOutBack: function(){return "easeOutBack"},
        easeInOutBack: function(){return "easeInOutBack"},
        easeInBounce: function(){return "easeInBounce"},
        easeOutBounce: function(){return "easeOutBounce"},
        easeInOutBounce: function(){return "easeInOutBounce"}  
    }
     
}

var pda = new PDAEngine();