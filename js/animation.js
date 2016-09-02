$(function() {
    var cPin = new ScrollMagic.Controller();
    new ScrollMagic.Scene({triggerElement: "#pin-header"})
                    .setPin("#header")
                    .setTween("#header", 0, {width: "100%"})
                    //.addIndicators({name: "pinHeader (duration: 0)"}) // debug
                    .addTo(cPin);
    new ScrollMagic.Scene({triggerElement: "#tween-header"})
                    .setTween("#header", 0.4, {height: "50px", padding: "10px", backgroundColor: "rgba(0, 0, 0, 0.85)", borderBottomWidth: "2px", borderBottomStyle: "solid", borderBottomColor: "#ffa500"})
                    //.addIndicators({name: "tweenHeader (duration: 0)"}) // debug
                    .addTo(cPin);

    var cParallax = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});
    new ScrollMagic.Scene({triggerElement: "#parallax1"})
					.setTween("#parallax1 > div", {y: "80%", ease: Linear.easeNone})
					//.addIndicators()
					.addTo(cParallax);
    new ScrollMagic.Scene({triggerElement: "#parallax2"})
                    .setTween("#parallax2 > div", {y: "80%", ease: Linear.easeNone})
                    //.addIndicators()
                    .addTo(cParallax);
    new ScrollMagic.Scene({triggerElement: "#parallax3"})
                    .setTween("#parallax3 > div", {y: "80%", ease: Linear.easeNone})
                    //.addIndicators()
                    .addTo(cParallax);
    new ScrollMagic.Scene({triggerElement: "#parallax4"})
                    .setTween("#parallax4 > div", {y: "80%", ease: Linear.easeNone})
                    //.addIndicators()
                    .addTo(cParallax);
    new ScrollMagic.Scene({triggerElement: "#parallax5"})
                    .setTween("#parallax5 > div", {y: "80%", ease: Linear.easeNone})
                    //.addIndicators()
                    .addTo(cParallax);
});
