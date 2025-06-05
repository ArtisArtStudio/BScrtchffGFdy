/**
 * This file controls the page logic
 *
 * depends on jQuery>=1.7
 */
var canvas;
var scratchers = [];
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
    var triggered = false;
    var nosound = true;
    var params = new URLSearchParams(window.location.search.slice(1));

    function supportsCanvas() {
        return !!document.createElement('canvas').getContext;
    };
    
    
    /**
     * Handle scratch event on a scratcher
     */
    function checkpct() {
        var p = 16;


        if (!triggered) {
            if (pct > 10 && pct < p) {
                //document.getElementById("scratcher3Pct").innerHTML="Scratch MORE!";
                if (CrispyToast.toasts.length===0) {
                    CrispyToast.success('Scratch MORE!', { position: 'top-center', timeout: 2000});
                } 
            }
            if (pct>p) {
                if(CrispyToast.toasts.length!=0){
                    CrispyToast.clearall();
                }
                $('#tboy').show();
                $('#tboy').text(gendertext);
                $('#tboy').css('color',colortxt);
                $('#boy').hide();
                $('.images').hide();
                $('#or').hide();
                $('#girl').hide();
                document.getElementsByTagName("body")[0].style.backgroundColor = color;
                document.getElementsByTagName("body")[0].style.backgroundImage = 'none';
                //document.getElementById("H3").insertAdjacentHTML('afterend', "<h4 id='testtext' style='white-space:normal'> Depending on the product you buy, here it will say either <br> 'It is a Girl!' or 'It is a Boy! with pink or blue background.</h4>");
                $('#this').hide();
                $('#H3').hide();
                $('#H4').hide();
                scratchers[0].clear();
                confetti_effect();
            }
        }
    };
    function scratcher1Changed(ev) {
        pct = (this.fullAmount(30) * 100) | 0;
        checkpct();
    };
   
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    };
    function confetti_effect() {
        if (triggered == true) {
            return;
        }
        if (!nosound) {
            soundHandle.volume = 0.5;
            soundHandle.play();
        }
        triggered = true;
       for (let i = 1; i < 4; i++) {
            let scratcherCanvas = document.getElementById('scratcher1'); // scratchers[2] corresponds to 'scratcher3'
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
        CrispyToast.toasts=[];
        $("#resetbutton").hide();
        for (i = 0; i < scratchers.length; i++) {
            scratchers[i].reset();
        }
        
        $('#tboy').hide();
        $('#boy').show();
        $('#or').show();
        $('#girl').show();
        $('.images').show();

        document.getElementsByTagName("body")[0].style.backgroundColor = "#ffffff";
        document.getElementsByTagName("body")[0].style.backgroundImage = 'url(images/background.jpg)';
        // document.getElementById('testtext').remove();
        $('#this').show();
        $('#H3').show();
        $('#H4').show();
        triggered = false;
        soundHandle.pause();
        soundHandle.currentTime = 0;    
        return false;
    };
    function fitCanvastoDiv() {
        var ttd = $(canvas).parent();
        // var ttd = document.getElementById('scratcher-box');
        canvas.width = ttd.width();
        canvas.height = canvas.width;
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
        canvas = document.getElementById("scratcher1");
        var i, i1;    

        // document.addEventListener('mousedown', setMousePos, false);
        // function setMousePos(event) {
        //     cursor_x = event.pageX;
        //     cursor_y = event.pageY;
        //     }
        $( window ).on({
            orientationchange: function(e) {
                fitCanvastoDiv();
            },resize: function(e) {
                fitCanvastoDiv();
            }
        });        

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

        document.getElementById('id01').style.display = 'block';
        $('.nosoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display = 'none';
            nosound = true;
        });
        $('.withsoundbtn').on("click", function (e) {
            document.getElementById('id01').style.display = 'none';
            nosound = false;
            if (soundHandle.currentTime != 0) { return; }
                soundHandle = document.getElementById('soundHandle');  
                soundHandle.autoplay = true;
            soundHandle.muted = false;
                soundHandle.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
                soundHandle.src = 'audio/celebrate.mp3';
                soundHandle.play();
                soundHandle.pause();
        });
        document.addEventListener(
            "visibilitychange",
            function (evt) {
              if (document.visibilityState != "visible") {
                soundHandle.pause();
                    soundHandle.currentTime = 0;
                }
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
                $('#resetbutton').on('click', function () {
                        onResetClicked(scratchers);
                    });
                fitCanvastoDiv();

                // hide loading text, show instructions text
                //$('#loading-text').hide();
                //$('#inst-text').show();
            }
        };

        // create new scratchers
        scratchers = new Array(1);
        scratchers[0] = new Scratcher('scratcher1');
        scratchers[0].setShape('heart'); 
        // set up this listener before calling setImages():
        scratchers[0].addEventListener('imagesloaded', onScratcherLoaded);
        scratchers[0].setImages('images/s1bg.png','images/foreground.jpg');
  
         // get notifications of this scratcher changing
         // (These aren't "real" event listeners; they're implemented on top
         // of Scratcher.)
         //scratchers[3].addEventListener('reset', scratchersChanged);
         scratchers[0].addEventListener('scratchesended', scratcher1Changed);
         
         // var canvas = document.getElementById('scratcher1');
         // canvas.onmousemove = null;
 
         // Or if you didn't want to do it every scratch (to save CPU), you
         // can just do it on 'scratchesended' instead of 'scratch':
         //scratchers[2].addEventListener('scratchesended', scratcher3Changed);
     };
    
    /**
     * Handle page load
     */
    $(function () {
        if (supportsCanvas()) {
            initPage();
        } else {
            $('#scratcher-box').hide();
            $('#lamebrowser').show();
        }
    });
    
    })();
