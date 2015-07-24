/**
 * Created by akhnos on 6/23/15.
 */

PreLoad.prototype = new System();
function PreLoad(preLoadImagesObj){
    this.onComplete = preLoadImagesObj.onComplete || function(){};
    this.onProgressChange = preLoadImagesObj.onProgressChange ||function(progressRatio){};
    this.assets = preLoadImagesObj.images || {};
    this.async = (typeof preLoadImagesObj.async == "undefined") ? true : preLoadImagesObj.async;
    var my = this;
    var counter = 0;
    var assetsLength = Object.keys(my.assets).length;
    this.assetLoad = function(x){
        assets = new Array();
        assets[x] = my.assets[x];
        my.assets[x] = {};
        my.assets[x]["image"] = assets[x].src;
        my.assets[x]["element"] = $('<img id="dynamic">');
        my.assets[x]["element"].attr('src',my.assets[x]["image"]).load();
        counter++;
        if((counter + 1) == assetsLength)
        {
            my.assets[x]["element"].load(function() {
                my.onProgressChange(Math.round(100 * (counter  / assetsLength)));
                my.onComplete();
            });
        }else{
            my.assets[x]["element"].load(function() {
                my.onProgressChange(Math.round(100 * (counter  / assetsLength)));
                if(!my.async){
                    my.assetLoad(x + 1);
                }
            });
        }
    };

    this.init = function(){
        if(my.async)
        {
            for(var x in my.assets)
            {
                my.assetLoad(x);
            }
        }
        else{
            my.assetLoad(0);
        }
        if(assetsLength == 0)
            my.onComplete();
    };
}