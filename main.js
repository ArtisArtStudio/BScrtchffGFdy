/**
 * This file controls the page logic
 *
 * depends on jQuery>=1.7
 */
// Original background image dimensions
const PORTRAIT_IMAGE_HEIGHT = 1080;
const PORTRAIT_IMAGE_WIDTH = 1920;
const LANDSCAPE_IMAGE_HEIGHT = 1080;
const LANDSCAPE_IMAGE_WIDTH = 2500;
// Your point on the original image
const PORTRAIT_SCRATCHER_X = 670;
const PORTRAIT_SCRATCHER_Y = 515;
const LANDSCAPE_SCRATCHER_X = 697;
const LANDSCAPE_SCRATCHER_Y = 157;
let targetX;
let targetY;
let originalWidth;
let originalHeight;

let scratcher, canvasOriginalHeight, canvasOriginalWidth;
var scratchers = [];
var pct=0;
(function() {
    /**
     * Returns true if this browser supports canvas
     *
     * From http://diveintohtml5.info/
     */

    var color1 = '#ff95c8';
    var color2 = '#5194f8';
    var color3 ='#969696';
    var colortxt1 = '#ff0b9a';
    var colortxt2= '#7FB1ED';
    var colortxt3= '#000000';
    //Select the background color
    var color =color1;
    //Select the text color
    var colortxt = colortxt1;
    var gendertext1 = "It is a Girl!";
    var gendertext2 = "It is a Boy!";
    var gendertext3= "It is a Demo!";
    //Select the gender text
    var gendertext = gendertext1;
    var surname;
    var soundHandle = new Audio();
    var triggered=false;
    var nosound=true;
    var params = new URLSearchParams(window.location.search.slice(1));

    function supportsCanvas() {
        return !!document.createElement('canvas').getContext;
    };
    
    
    /**
     * Handle scratch event on a scratcher
     */
    function checkpct() {
        var p = 15;


        if (!triggered) {
            if (pct>0)  {
                if (pct<p)  {
                //document.getElementById("scratcher3Pct").innerHTML="Scratch MORE!";
                if (!CrispyToast.clearall()){
                    CrispyToast.success('Scratch MORE!',{ position: 'top-center' },{timeout: 3000});
                    }
                } 
            }
           
            if (pct>p) {
                $('#tboy').show();
                $('#tboy').text(gendertext);
                $('#tboy').css('color',colortxt);
                $('#boy').hide();
                $('.images').hide();
                $('#or').hide();
                $('#girl').hide();
                //document.getElementsByTagName("body")[0].style.backgroundColor = color;
                //document.getElementsByTagName("body")[0].style.backgroundImage = 'none';
                //document.getElementById("H3").insertAdjacentHTML('afterend', "<h4 id='testtext' style='white-space:normal'> Depending on the product you buy, here it will say either <br> 'It is a Girl!' or 'It is a Boy! with pink or blue background.</h4>");

                $('#H3').hide();
                $('#H4').hide();
                //$('#scratcher3Pct').hide();
                scratchers[0].clear();
                confetti_effect();
            }
        }
    };
    function scratcher1Changed(ev) {
        pct = (this.fullAmount(40) * 100)|0;
        checkpct();
    };
   
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    };
    function randomInRangeint(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    function confetti_effect() {
        //defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        
        
        if(triggered==true) {
            return;
        }
        if (!nosound) {
            soundHandle.volume=0.5;
            soundHandle.play();
        }
        triggered=true;
       for (let i = 1; i < 4; i++) {
            let scratcherCanvas = document.getElementById('scratcher'); // scratchers[2] corresponds to 'scratcher3'
            let rect = scratcherCanvas.getBoundingClientRect();
            let centerX = (rect.left + rect.right) / 2 / window.innerWidth;
            let centerY = (rect.top + rect.bottom) / 2 / window.innerHeight;
                confetti({
                    particleCount: 50,
                    spread: 360,
                    startVelocity:10,
                    gravity:0,
                    origin: {x: centerX, y: centerY },
                    colors: [colortxt],
                    scalar:1.2,
                });
        }
            var duration = 10 * 1000;
             var end = Date.now() + duration;
             var defaults = { startVelocity: 10, spread: 360, ticks: 70, zIndex: 0 };
             var particleCount = 5 ;
             (function frame() {
             // launch a few confetti from the left edge
             confetti({...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: [colortxt]}
             );
             // and launch a few from the right edge
             confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },colors: [colortxt] }
             );
          
             // keep going until we are out of time
             if (Date.now() < end) {
                 requestAnimationFrame(frame);
                 
                 return;
             }
            }());
          
        setTimeout(function(){
            $("#resetbutton").show();
        }, 10000);
              
     };
    
    /**
     * Reset all scratchers
     */
    function onResetClicked(scratchers) {
        var i;
        pct = 0;
        //$("#scratcher3Pct").hide();
        $("#resetbutton").hide();
        for (i = 0; i < scratchers.length; i++) {
            scratchers[i].reset();
        }
        
        $('#tboy').hide();
        $('#boy').show();
        $('#or').show();
        $('#girl').show();
        $('.images').show();

        //document.getElementsByTagName("body")[0].style.backgroundColor = "#ffffff";
        //document.getElementsByTagName("body")[0].style.backgroundImage = 'url(images/background.jpg)';
        // document.getElementById('testtext').remove();

        $('#H3').show();
        $('#H4').show();
        triggered = false;
        soundHandle.pause();
        soundHandle.currentTime = 0;    
        return false;
    };
    
    /**
     * Assuming canvas works here, do all initial page setup
     */
    // function handleOrientationChange(mql) {
    //     if (mql.matches) {
    //         /* The viewport is currently in portrait orientation */
    //         if(window.innerHeight>900) {
    //             size=130}
    //         else {
    //             size=100;
    //         }
 
    //       } else {
    //         /* The viewport is not currently in portrait orientation, therefore landscape */
    //         console.log(window.innerHeight + " " + window.innerWidth);
    //         size=100;
    //         if (window.innerWidth>900 && window.innerWidth>window.innerHeight*1.2){
    //             console.log("yes");
    //             size = 130;
    //         }
    //       }
          
    //       $('#scratcher1').width(size);
    //       $('#scratcher1').css('width',size);

    
    //   }
    function positionCanvas() {
        // Use media query to match CSS orientation logic
    const isLandscape = window.matchMedia('(orientation: landscape) and (max-width: 1023px)').matches;
    let factor=1;
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    //console.log("screen " + screenHeight + " " + screenWidth);
    let scaledImageHeight, scaledImageWidth, imageLeftOffset, imageTopOffset,canvasX, canvasY;
    let scale;
    if (isLandscape) {
        originalWidth = LANDSCAPE_IMAGE_WIDTH;
        originalHeight = LANDSCAPE_IMAGE_HEIGHT;
        targetX = LANDSCAPE_SCRATCHER_X;
        targetY = LANDSCAPE_SCRATCHER_Y;
        factor=1.5;
        scale = screenWidth / originalWidth;
        scaledImageWidth = screenWidth;
        scaledImageHeight = originalHeight * scale;
        imageLeftOffset = 0;
        imageTopOffset = (screenHeight - scaledImageHeight) / 2;
        canvasX = imageLeftOffset + targetX * scale;
        canvasY = imageTopOffset + targetY * scale;
    } else {
        originalWidth = PORTRAIT_IMAGE_WIDTH;
        originalHeight = PORTRAIT_IMAGE_HEIGHT;
        targetX = PORTRAIT_SCRATCHER_X;
        targetY = PORTRAIT_SCRATCHER_Y;
        factor=1.17;
        scale = screenHeight / originalHeight;
        scaledImageWidth = originalWidth * scale;
        scaledImageHeight = screenHeight;
        imageLeftOffset = (screenWidth - scaledImageWidth) / 2;
        imageTopOffset = 0;
        canvasX = imageLeftOffset + targetX * scale;
        canvasY = imageTopOffset + targetY * scale;
    }
       

        
        scratcher.style.left = `${canvasX}px`;
        scratcher.style.top = `${canvasY}px`;
        //alert();
        //alert("screen " + screenHeight);
        // Optionally scale canvas size too
             // Always use the original canvas size for scaling
        scratcher.width = canvasOriginalWidth * scale * factor;
        scratcher.height = canvasOriginalHeight * scale * factor;

        // For iOS safe area
        scratcher.style.height = `calc(${scratcher.height}px - constant(safe-area-inset-bottom))`;
        scratcher.style.height = `calc(${scratcher.height}px - env(safe-area-inset-bottom))`; 
        
        if(scratchers[0]){ 
            if (triggered) {
            scratchers[0].resetnoclear(true);
        } else {
            scratchers[0].resetnoclear(false);
        }   
        }
      }
      
     
    function initPage() {
        var scratcherLoadedCount = 0;
        var i, i1;    
        // if (window.confirm('This scratch off contains sound when the gender is revealed. Do you want to continue with sound? (Ok:with sound, Cancel:without sound')) {
        //     nosound=false;
        //   } else {
        //     nosound=true;
        // }

        surname = params.get('surname');
        if (surname !=null && surname.replace(/\s/g, '').length) {
            $("#baby").text('Baby ' + surname);
        } else {
            $("#baby").text('the Baby');
            document.getElementById('surname').style.fontWeight="normal";
            $('#baby').css('font-weight', 'normal');

        }
        
        //document.getElementById('intro').innerHTML= "This is a gender reveal scratch off for <strong>" + surname + "</strong> family. It contains sound when the gender is revealed. Do you want to continue with sound?";
        document.getElementById('surname').innerHTML= surname;

        //document.getElementById('id01').style.display='block';
        
        $('.nosoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display='none';
            nosound=true;
        });
        $('.withsoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display='none';
            nosound=false;
            if (soundHandle.currentTime!=0) {return;}
                soundHandle = document.getElementById('soundHandle');  
                soundHandle.autoplay = true;
                soundHandle.muted=false;
                soundHandle.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
                soundHandle.src = 'audio/celebrate.mp3';
                soundHandle.play();
                soundHandle.pause();
        });
        document.addEventListener(
            "visibilitychange",
             function(evt) {
              if (document.visibilityState != "visible") {
                soundHandle.pause();
                soundHandle.currentTime=0;              }
            },
            false,
          );
        // const mediaQueryList = window.matchMedia("(orientation: portrait)");
        // mediaQueryList.addEventListener("change", handleOrientationChange);
        // handleOrientationChange(mediaQueryList);
        
           
       
        document.getElementById("resetbutton").style.backgroundColor = colortxt;

        // called each time a scratcher loads
        function onScratcherLoaded(ev) {
            
            scratcherLoadedCount++;
            $("table1").width($(window).width());
            if (scratcherLoadedCount == scratchers.length) {
                // all scratchers loaded!
    
                // bind the reset button to reset all scratchers
                $('#resetbutton').on('click', function() {
                        onResetClicked(scratchers);
                    });
                positionCanvas();
                // hide loading text, show instructions text
                //$('#loading-text').hide();
                //$('#inst-text').show();
            }
        };
        scratcher = document.getElementById('scratcher');
        canvasOriginalHeight=scratcher.height;
        canvasOriginalWidth=scratcher.width;
        scratcher.style.zIndex = '0';
        /* scratcher = document.createElement('canvas');
        scratcher.id = 'scratcher';
        canvas.style.zIndex = '0';

        scratcher.width = 200;  // or any width you want
        scratcher.height = 200; // or any height you want

        // Style the canvas
        scratcher.style.position = 'absolute'; */
        scratchers = new Array(1);
        scratchers[0] = new Scratcher('scratcher');
        scratchers[0].setShape('heart'); 
        // set up this listener before calling setImages():
        scratchers[0].addEventListener('imagesloaded', onScratcherLoaded);
        scratchers[0].setImages('images/s1bg.jpg','images/foreground.jpg');
  
         // get notifications of this scratcher changing
         // (These aren't "real" event listeners; they're implemented on top
         // of Scratcher.)
         //scratchers[3].addEventListener('reset', scratchersChanged);
         scratchers[0].addEventListener('scratchesended', scratcher1Changed);
         
         $( window ).on({
            orientationchange: function(e) {
                positionCanvas();
            },resize: function(e) {
                positionCanvas();
            }
        });        
         
         // var canvas = document.getElementById('scratcher1');
         // canvas.onmousemove = null;
 
         // Or if you didn't want to do it every scratch (to save CPU), you
         // can just do it on 'scratchesended' instead of 'scratch':
         //scratchers[2].addEventListener('scratchesended', scratcher3Changed);
     };
    
    $(function() {
        if (supportsCanvas()) {
            initPage();
        } else {
            $('#scratcher-box').hide();
            $('#lamebrowser').show();
        }
    });
    
    })();
