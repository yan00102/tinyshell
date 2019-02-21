"use strict";function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}class tinyshell{constructor(elem){_defineProperty(this,"addEventListener",function(ev,callback){this.Events[ev].detail.callback=callback,this.Params.listeners.has(this.Events[ev])||this.element.addEventListener(ev,callback),this.Params.listeners.add(this.Events[ev]),console.log("added",ev,"to",this.element),this.Params.pageWidth=document.body.clientWidth,this.Params.twenty=.2*document.body.clientWidth,this.Params.maxDrag=.8*this.Params.pageWidth,this.Params.minDrag=.2*this.Params.maxDrag,1===this.Params.listeners.size&&(console.log("adding the touchevents"),this.element.addEventListener("touchstart",this),this.element.addEventListener("touchend",this),this.element.addEventListener("touchmove",this),this.element.addEventListener("touchcancel",this))}),_defineProperty(this,"removeEventListener",function(ev,callback){this.Params.listeners.forEach(listen=>{console.log(listen)}),this.Params.listeners.delete(this.Events[ev]),0===this.Params.listeners.size&&(this.element.removeEventListener("touchstart",this),this.element.removeEventListener("touchend",this),this.element.removeEventListener("touchmove",this),this.element.removeEventListener("touchcancel",this))}),_defineProperty(this,"handleEvent",function(ev){switch(console.log("handling",ev.type),ev.type){case"swipeleft":case"swiperight":case"revealleft":case"revealright":case"tap":1==ev.detail.touches?console.log("SWIPE REVEAL OR TAP HANLDED"):console.log("Wrong number of touch points",ev.detail.touches);break;case"touchstart":this.start(ev);break;case"touchmove":this.move(ev);break;case"touchend":this.end(ev);break;case"touchcancel":this.cancel(ev)}}),_defineProperty(this,"cancel",function(ev){console.log("cancel",ev.type)}),_defineProperty(this,"move",function(ev){if(this.Events.revealleft.detail.callback||this.Events.revealright.detail.callback){let touches=ev.changedTouches;if(1==touches.length){performance.mark("move"),performance.measure("moving","start","move");performance.getEntriesByName("moving","measure")[0].duration;let deltaX=Math.max(this.Params.startX,touches[0].pageX)-Math.min(this.Params.startX,touches[0].pageX),dir=(Math.max(touches[0].pageY,this.Params.startY),Math.min(touches[0].pageY,this.Params.startY),"");if(dir=Math.max(this.Params.startX,touches[0].pageX)==this.Params.startX?"left":"right",this.Events.revealleft.detail.callback&&"left"===dir||this.Events.revealright.detail.callback&&"right"===dir){let move=0;move="right"===dir&&(this.element.classList.contains("has-reveal-left")||this.element.classList.contains("has-reveal-both"))?Math.min(deltaX+-1*this.Params.twenty,0):0,("left"===dir&&this.element.classList.contains("has-reveal-right")||this.element.classList.contains("has-reveal-both"))&&(move=this.element.classList.contains("has-reveal-left")||this.element.classList.contains("has-reveal-both")?-1*Math.min(this.Params.twenty,deltaX)-this.Params.twenty:-1*Math.max(deltaX,this.Params.twenty)),this.element.style.transform=`translateX(${move}px)`}performance.clearMarks("move")}}}),_defineProperty(this,"start",function(ev){console.log("start",ev.type);let touches=ev.changedTouches;this.Params.startX=touches[0].pageX,this.Params.startY=touches[0].pageY,performance.mark("start")}),_defineProperty(this,"end",function(ev){console.log("end",ev.type);let touches=ev.changedTouches;if(1==touches.length){performance.mark("end"),performance.measure("touching","start","end");let duration=performance.getEntriesByName("touching","measure")[0].duration,deltaX=Math.max(this.Params.startX,touches[0].pageX)-Math.min(this.Params.startX,touches[0].pageX),deltaY=Math.max(touches[0].pageY,this.Params.startY)-Math.min(touches[0].pageY,this.Params.startY),dir="";if(dir=Math.max(this.Params.startX,touches[0].pageX)==this.Params.startX?"left":"right",null!==this.Events.tap.detail.callback&&"function"==typeof this.Events.tap.detail.callback&&deltaX<this.Params.maxDistance&&deltaY<this.Params.maxDistance)return ev.currentTarget.dispatchEvent(this.Events.tap),performance.clearMarks("start"),performance.clearMarks("move"),void performance.clearMarks("end");if("left"==dir&&null!==this.Events.swipeleft.detail.callback&&"function"==typeof this.Events.swipeleft.detail.callback)return deltaX>this.Params.minDistance&&duration<this.Params.maxSwipeTime&&deltaX>deltaY?(console.log("Successful swipeleft"),ev.currentTarget.dispatchEvent(this.Events.swipeleft)):console.log("Invalid swipeleft",deltaX,duration),performance.clearMarks("start"),performance.clearMarks("move"),void performance.clearMarks("end");if("right"==dir&&null!==this.Events.swiperight.detail.callback&&"function"==typeof this.Events.swiperight.detail.callback)return deltaX>this.Params.minDistance&&duration<this.Params.maxSwipeTime&&deltaX>deltaY?(console.log("Successful swiperight"),ev.currentTarget.dispatchEvent(this.Events.swiperight)):console.log("Invalid swiperight",deltaX,duration),performance.clearMarks("start"),performance.clearMarks("move"),void performance.clearMarks("end");this.Events.revealleft.detail.callback&&"left"==dir&&(Math.abs(deltaX)<this.Params.minDrag?(console.log("dragged between min and max",this.Params.minDrag,this.Params.maxDrag),this.element.classList.contains("has-reveal-left")||this.element.classList.contains("has-reveal-both")?this.element.style.transform=`translateX(${-1*this.Params.twenty}px)`:this.element.style.transform="translateX(0px)"):Math.abs(deltaX)>this.Params.maxDrag&&(this.element.classList.contains("has-reveal-left")||this.element.classList.contains("has-reveal-both")?this.element.style.transform=`translateX(${-2*this.Params.twenty}px)`:this.element.style.transform=`translateX(${-1*this.Params.twenty}px)`),performance.clearMarks("start"),performance.clearMarks("move"),performance.clearMarks("end")),this.Events.revealright.detail.callback&&"right"==dir&&(Math.abs(deltaX)<=this.Params.minDrag?this.element.classList.contains("has-reveal-left")||this.element.classList.contains("has-reveal-both")?this.element.style.transform=`translateX(${-1*this.Params.twenty}px)`:this.element.style.transform="translateX(0px)":Math.abs(deltaX)>this.Params.maxDrag&&(this.element.classList.contains("has-reveal-left")||this.element.classList.contains("has-reveal-both"),this.element.style.transform="translateX(0px)"),performance.clearMarks("start"),performance.clearMarks("move"),performance.clearMarks("end")),deltaX<this.Params.minDrag&&(this.Events.revealright.detail.callback||this.Events.revealleft.detail.callback)&&(this.element.classList.contains("has-reveal-left")||this.element.classList.contains("has-reveal-both")?this.element.style.transform=`translateX(${-1*this.Params.twenty}px)`:this.element.style.transform="translateX(0px)")}}),this.element=elem,this.Params={startX:0,startY:0,moved:!1,duration:0,maxSwipeTime:400,minDistance:25,maxDistance:20,maxDrag:0,minDrag:10,listeners:new Set,pageWidth:0,twenty:0},this.EventTypes={SWIPELEFT:"swipeleft",SWIPERIGHT:"swiperight",REVEALLEFT:"revealleft",REVEALRIGHT:"revealright",TAP:"tap"},this.Events={swipeleft:new CustomEvent("swipeleft",{detail:{dir:"left",callback:null}}),revealleft:new CustomEvent("revealleft",{detail:{dir:"left",callback:null}}),swiperight:new CustomEvent("swiperight",{detail:{dir:"right",callback:null}}),revealright:new CustomEvent("revealright",{detail:{dir:"right",callback:null}}),tap:new CustomEvent("tap",{detail:{callback:null}})}}}