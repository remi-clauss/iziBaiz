const hexToRGB=(t,i)=>{let e=parseInt(t.slice(1,3),16),s=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16);return i?"rgba("+e+", "+s+", "+o+", "+i+")":"rgb("+e+", "+s+", "+o+")"},getCurrentRotation=t=>{let i=window.getComputedStyle(t,null),e=i.getPropertyValue("-webkit-transform")||i.getPropertyValue("-moz-transform")||i.getPropertyValue("-ms-transform")||i.getPropertyValue("-o-transform")||i.getPropertyValue("transform")||"none";if("none"!=e){let s=e.split("(")[1].split(")")[0].split(","),o=Math.atan2(s[1],s[0]);o<0&&(o+=2*Math.PI);let l=Math.round(o*(180/Math.PI));return l<0?l+360:l}return 0},R={iLerp:(t,i,e)=>R.Clamp((e-t)/(i-t),0,1),Lerp:(t,i,e)=>t*(1-e)+i*e,Damp:(t,i,e)=>R.Lerp(t,i,1-Math.exp(Math.log(1-e)*RD)),Remap:(t,i,e,s,o)=>R.Lerp(e,s,R.iLerp(t,i,o)),Clamp:(t,i,e)=>t<i?i:e<t?e:t,Clone:t=>JSON.parse(JSON.stringify(t)),Def:t=>void 0!==t,Dist:(t,i)=>Math.sqrt(t*t+i*i),Ease:{linear:t=>t,i1:t=>1-Math.cos(t*(.5*Math.PI)),o1:t=>Math.sin(t*(.5*Math.PI)),io1:t=>-.5*(Math.cos(Math.PI*t)-1),i2:t=>t*t,o2:t=>t*(2-t),io2:t=>t<.5?2*t*t:(4-2*t)*t-1,i3:t=>t*t*t,o3:t=>--t*t*t+1,io3:t=>t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1,i4:t=>t*t*t*t,o4:t=>1- --t*t*t*t,io4:t=>t<.5?8*t*t*t*t:1-8*--t*t*t*t,i5:t=>t*t*t*t*t,o5:t=>1+--t*t*t*t*t,io5:t=>t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t,sio5:t=>t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t,i6:t=>0===t?0:2**(10*(t-1)),o6:t=>1===t?1:1-2**(-10*t),io6:t=>0===t||1===t?t:(t/=.5)<1?.5*2**(10*(t-1)):.5*(2-2**(-10*--t)),so6:t=>1===t?1:1-2**(-15*t),sio6:t=>0===t||1===t?t:(t/=.35)<1?.5*2**(10*(t-1)):.5*(2-2**(-10*--t))},r0:(t,i)=>1-3*i+3*t,r1:(t,i)=>3*i-6*t,r2:(t,i,e)=>((R.r0(i,e)*t+R.r1(i,e))*t+3*i)*t,r3:(t,i,e)=>3*R.r0(i,e)*t*t+2*R.r1(i,e)*t+3*i,r4(t,i,e,s,o){let l,r,a=0;for(;r=i+.5*(e-i),0<(l=R.r2(r,s,o)-t)?e=r:i=r,1e-7<Math.abs(l)&&++a<10;);return r},r5(t,i,e,s){for(let o=0;o<4;++o){var l=R.r3(i,e,s);if(0===l)break;i-=(R.r2(i,e,s)-t)/l}return i},Ease4(t){let i=t[0],e=t[1],s=t[2],o=t[3],l=new Float32Array(11);if(i!==e||s!==o)for(let r=0;r<11;++r)l[r]=R.r2(.1*r,i,s);return t=>i===e&&s===o||0===t||1===t?t:R.r2(function(t){let e=0;for(var o=1;10!==o&&l[o]<=t;++o)e+=.1;var r=(t-l[--o])/(l[o+1]-l[o]),r=e+.1*r,a=R.r3(r,i,s);return .001<=a?R.r5(t,r,i,s):0===a?r:R.r4(t,a,a+.1,i,s)}(t),e,o)}};class IziBaiz{constructor(){this.bind(),this.startTime}bind(){["init","render","to","fromTo","compatibility","setVariable","setStart"].forEach(t=>this[t]=this[t].bind(this))}setVariable(t,i){this.elmnt=t,this.target={},this.start={},this.toEL={},this.ease=i.ease||R.Ease.o6,this.duration=i.duration||1.5,this.delay=i.delay||0,this.onComplete=i.onComplete||void 0,this.completed=!1}setStart(t,i,e){for(var s in i)if(e)this.start[s]=i[s];else{if("duration"===s||"ease"===s||"delay"===s)return;void 0!=t[s]?this.start[s]=t[s]:void 0!=t.getBoundingClientRect()[s]||t.getBoundingClientRect()[s]?"right"===s||"top"===s||"left"===s||"bottom"===s||"inset"===s?this.start[s]=parseInt(window.getComputedStyle(t)[s].replace("px","")):"none"!=window.getComputedStyle(t).transform?("x"===s&&(this.start[s]=parseInt(window.getComputedStyle(t).transform.split(",")[4].replace(")",""))),"y"===s&&(this.start[s]=parseInt(window.getComputedStyle(t).transform.split(",")[5].replace(")","")))):this.start[s]=0:"rotate"===s?this.start[s]=getCurrentRotation(t):"autoAlpha"===s?(this.start.opacity=window.getComputedStyle(t).opacity,this.start.visibility=window.getComputedStyle(t).visibility):"autoAlpha"!=s||void 0!=window.getComputedStyle(t)[s]||window.getComputedStyle(t)[s]!=NaN?"none"!=window.getComputedStyle(t).transform?"scale"===s&&(this.start[s]=parseInt(window.getComputedStyle(t).transform.split(",")[3].replace(")",""))):"scale"===s?this.start[s]=1:this.start[s]=window.getComputedStyle(t)[s]:this.start[s]=t[s]}}compatibility(t,i){for(var e in t){if("duration"===e||"ease"===e||"delay"===e)return;"string"==typeof t[e]?(t[e].includes("vw")?t[e]=parseInt(t[e].replace("vw",""))*window.innerWidth/100:t[e].includes("vh")?t[e]=parseInt(t[e].replace("vh",""))*window.innerHeight/100:t[e].includes("%")?("x"===e&&(t[e]=parseInt(t[e].replace("%",""))*this.elmnt.getBoundingClientRect().width/100),"y"===e&&(t[e]=parseInt(t[e].replace("%",""))*this.elmnt.getBoundingClientRect().height/100)):t[e].includes("#")?t[e]=hexToRGB(t[e]):t[e].includes("px")&&(t[e]=parseInt(t[e].replace("px",""))),i||(this.target[e]=t[e]),i||(this.toEL[e]=this.target[e])):(i||(this.target[e]=t[e]),i||"autoAlpha"!==e||(this.target.opacity=t.autoAlpha,this.toEL.opacity=this.target.autoAlpha),i||(this.toEL[e]=this.target[e]),i&&(t[e]=t[e]))}}to(t,i,e){this.setVariable(t,i),this.setStart(t,i),this.compatibility(i),this.init(),this.onComplete=i.onComplete||null}fromTo(t,i,e,s){this.setVariable(t,e),this.setStart(t,i,i),this.compatibility(e),this.init(),this.onComplete=e.onComplete||null}TL(t,i){let e=0,s=[0],o=0,l;i.forEach((r,a)=>{o+=r.delay?r.duration+r.delay:r.duration,r.onComplete&&(l=r.onComplete),0!=a&&(e+=1e3*i[a-1].duration,s.push(e)),setTimeout(()=>{0===a?this.to(t,r,"tl"):this.fromTo(t,i[a-1],i[a],"tl")},s[a])}),this.callBack(o,l)}init(){this.paused=!1,this.compatibility(this.start,"init"),setTimeout(()=>{this.startTime=new Date,this.render()},1e3*this.delay)}render(){let t=new Date-this.startTime;if(.001*t<=this.duration){for(var i in this.toEL)if(("backgroundColor"!=i||"color"!=i||"fill"!=i)&&(this.toEL[i]=R.Remap(0,.999,this.start[i],this.target[i],this.ease(.001*t/this.duration))),"x"===i||"y"===i||"rotate"===i||"scale"===i)this.elmnt instanceof window.HTMLElement?this.elmnt.style.transform=`translate3d(${this.toEL.x?this.toEL.x:0}px, ${this.toEL.y?this.toEL.y:0}px, 0px) rotate(${this.toEL.rotate?this.toEL.rotate:0}deg) scale(${this.toEL.scale?this.toEL.scale:1})`:"x"===i?this.elmnt.x=this.toEL[i]:"y"===i?this.elmnt.y=this.toEL[i]:"z"===i&&(this.elmnt.z=this.toEL[i]);else if("height"===i)this.elmnt.style.height=this.toEL[i]+"px";else if("width"===i)this.elmnt.style.width=this.toEL[i]+"px";else if("margin"===i||"marginRight"===i||"marginLeft"===i||"marginTop"===i||"marginBottom"===i)"margin"===i&&(this.elmnt.style.margin=this.toEL[i]+"px"),"marginTop"===i&&(this.elmnt.style.margin=`${this.toEL[i]}px 0 0 0`),"marginRight"===i&&(this.elmnt.style.margin=`0 ${this.toEL[i]}px 0 0`),"marginBottom"===i&&(this.elmnt.style.margin=`0 0 ${this.toEL[i]}px 0`),"marginLeft"===i&&(this.elmnt.style.margin=`0 0 0 ${this.toEL[i]}px`);else if("padding"===i||"paddingRight"===i||"paddingLeft"===i||"paddingTop"===i||"paddingBottom"===i)"padding"===i&&(this.elmnt.style.padding=this.toEL[i]+"px"),"paddingTop"===i&&(this.elmnt.style.padding=`${this.toEL[i]}px 0 0 0`),"paddingRight"===i&&(this.elmnt.style.padding=`0 ${this.toEL[i]}px 0 0`),"paddingBottom"===i&&(this.elmnt.style.padding=`0 0 ${this.toEL[i]}px 0`),"paddingLeft"===i&&(this.elmnt.style.padding=`0 0 0 ${this.toEL[i]}px`);else if("top"===i||"right"===i||"bottom"===i||"left"===i||"inset"===i)"top"===i&&(this.elmnt.style.top=this.toEL[i]+"px"),"right"===i&&(this.elmnt.style.right=this.toEL[i]+"px"),"bottom"===i&&(this.elmnt.style.bottom=this.toEL[i]+"px"),"left"===i&&(this.elmnt.style.left=this.toEL[i]+"px"),"inset"===i&&(this.elmnt.style.inset=this.toEL[i]+"px");else if("opacity"===i)this.elmnt.style.opacity=this.toEL[i];else if("autoAlpha"===i)this.elmnt.style.opacity=this.toEL[i],this.toEL[i]>0?this.elmnt.style.visibility="visible":0===this.toEL[i]&&(this.elmnt.style.visibility="hidden");else if("value"===i)this.elmnt.value=this.toEL[i];else if("volume"===i)this.elmnt.volume=this.toEL[i];else if("backgroundColor"===i||"color"===i||"fill"===i){let e,s,o,l=parseInt(this.start[i].slice(4).split(",")[0]),r=parseInt(this.start[i].slice(4).split(",")[1]),a=parseInt(this.start[i].slice(4).split(",")[2]),h=parseInt(this.target[i].slice(4).split(",")[0]),n=parseInt(this.target[i].slice(4).split(",")[1]),p=parseInt(this.target[i].slice(4).split(",")[2]);e=R.Remap(0,.999,l,h,this.ease(.001*t/this.duration)),s=R.Remap(0,.999,r,n,this.ease(.001*t/this.duration)),o=R.Remap(0,.999,a,p,this.ease(.001*t/this.duration)),"backgroundColor"===i?this.elmnt.style.backgroundColor=`rgb(${e}, ${s}, ${o})`:"color"===i?this.elmnt.style.color=`rgb(${e}, ${s}, ${o})`:"fill"===i&&(this.elmnt.style.fill=`rgb(${e}, ${s}, ${o})`)}else"borderRadius"===i?this.elmnt.style.borderRadius=`${this.toEL[i]}px`:i=this.target[i];requestAnimationFrame(this.render.bind(this))}else for(var i in t=this.duration,!this.completed&&(this.completed=!0,this.onComplete&&this.onComplete()),this.props)this.start[i]=this.props[i]}}module.exports={R,IziBaiz};