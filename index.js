const hexToRGB = (hex, alpha) => {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

const getCurrentRotation = (el) => {
    let st = window.getComputedStyle(el, null);
    let tm = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "none";
    if (tm != "none") {
        let values = tm.split('(')[1].split(')')[0].split(',');

        let radians = Math.atan2(values[1], values[0]);
        if ( radians < 0 ) {
            radians += (2 * Math.PI);
        }
        let angle = Math.round( radians * (180/Math.PI));
        return (angle < 0 ? angle + 360 : angle);
    }
    return 0;
}

const R = {
    iLerp: (t,i,s)=>R.Clamp((s - t) / (i - t), 0, 1),
    Lerp: (t,i,s)=>t * (1 - s) + i * s,
    Damp: (t,i,s)=>R.Lerp(t, i, 1 - Math.exp(Math.log(1 - s) * RD)),
    Remap: (t,i,s,e,r)=>R.Lerp(s, e, R.iLerp(t, i, r)),
    Clamp: (t,i,s)=>t < i ? i : s < t ? s : t,
    Clone: t=>JSON.parse(JSON.stringify(t)),
    Def: t=>void 0 !== t,
    Dist: (t,i)=>Math.sqrt(t * t + i * i),
    Ease: {
        linear: t=>t,
        i1: t=>1 - Math.cos(t * (.5 * Math.PI)),
        o1: t=>Math.sin(t * (.5 * Math.PI)),
        io1: t=>-.5 * (Math.cos(Math.PI * t) - 1),
        i2: t=>t * t,
        o2: t=>t * (2 - t),
        io2: t=>t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1,
        i3: t=>t * t * t,
        o3: t=>--t * t * t + 1,
        io3: t=>t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        i4: t=>t * t * t * t,
        o4: t=>1 - --t * t * t * t,
        io4: t=>t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
        i5: t=>t * t * t * t * t,
        o5: t=>1 + --t * t * t * t * t,
        io5: t=>t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
        sio5: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
        i6: t=>0 === t ? 0 : 2 ** (10 * (t - 1)),
        o6: t=>1 === t ? 1 : 1 - 2 ** (-10 * t),
        io6: t=>0 === t || 1 === t ? t : (t /= .5) < 1 ? .5 * 2 ** (10 * (t - 1)) : .5 * (2 - 2 ** (-10 * --t)),
        so6: t => 1 === t ? 1 : 1 - 2 ** (-15 * t),
        sio6: t => 0 === t || 1 === t ? t : (t /= .35) < 1 ? .5 * 2 ** (10 * (t - 1)) : .5 * (2 - 2 ** (-10 * --t))
    },
    r0: (t,i)=>1 - 3 * i + 3 * t,
    r1: (t,i)=>3 * i - 6 * t,
    r2: (t,i,s)=>((R.r0(i, s) * t + R.r1(i, s)) * t + 3 * i) * t,
    r3: (t,i,s)=>3 * R.r0(i, s) * t * t + 2 * R.r1(i, s) * t + 3 * i,
    r4: (t,i,s,e,r)=>{
        let h, a, l = 0;
        for (; a = i + .5 * (s - i),
        0 < (h = R.r2(a, e, r) - t) ? s = a : i = a,
        1e-7 < Math.abs(h) && ++l < 10; )
            ;
        return a
    }
    ,
    r5: (i,s,e,r)=>{
        for (let t = 0; t < 4; ++t) {
            var h = R.r3(s, e, r);
            if (0 === h)
                return s;
            s -= (R.r2(s, e, r) - i) / h
        }
        return s
    },
    Ease4 : t=> {
        const h = t[0]
          , i = t[1]
          , a = t[2]
          , s = t[3];
        let l = new Float32Array(11);
        if (h !== i || a !== s)
            for (let t = 0; t < 11; ++t)
                l[t] = R.r2(.1 * t, h, a);
        return t=>h === i && a === s || (0 === t || 1 === t) ? t : R.r2(function(t) {
            let i = 0;
            for (var s = 1; 10 !== s && l[s] <= t; ++s)
                i += .1;
            --s;
            var e = (t - l[s]) / (l[s + 1] - l[s])
              , e = i + .1 * e
              , r = R.r3(e, h, a);
            return .001 <= r ? R.r5(t, e, h, a) : 0 === r ? e : R.r4(t, r, r + .1, h, a)
        }(t), i, s)
    }
}

class IziBaiz {
    constructor() {
        this.bind()
        this.startTime
    }
    bind() {
        ['init', 'render', 'to', 'fromTo', 'callBack', 'compatibility', 'setVariable', 'setStart'].forEach((fn) => this[fn] = this[fn].bind(this))
    }
    setVariable(E,O){
        this.elmnt = E
        this.target = {}
        this.start = {}
        this.toEL = {}
        this.ease = O.ease || R.Ease.o6
        this.duration = O.duration || 1.5
        this.delay = O.delay || 0
        this.onComplete = O.onComplete || undefined
    }
    setStart(E, A, AF){
        for (var prop in A) {
            if(AF){
                this.start[prop] = A[prop]
            }else{
                if(prop === 'duration' || prop === 'ease' || prop === 'delay') return
                if(E[prop] != undefined){
                    this.start[prop] = E[prop]
                } else if(E.getBoundingClientRect()[prop] != undefined || E.getBoundingClientRect()[prop]){
                    if(prop === 'right' || prop === 'top' || prop === 'left' || prop === 'bottom' || prop === 'inset'){
                        this.start[prop] = parseInt(window.getComputedStyle(E)[prop].replace("px", ""))
                    }else{
                        if(window.getComputedStyle(E)['transform'] != 'none'){
                            console.log(parseInt(window.getComputedStyle(E)['transform'].split(',')[3]));
                            if(prop === 'x')  this.start[prop] = parseInt(window.getComputedStyle(E)['transform'].split(',')[4].replace(")", ""))
                            if(prop === 'y')  this.start[prop] = parseInt(window.getComputedStyle(E)['transform'].split(',')[5].replace(")", ""))
                        }else{
                            this.start[prop] = 0 
                        }
                    }
                }else if(prop === 'rotate'){
                    this.start[prop] = getCurrentRotation(E)
                }else if(prop === 'autoAlpha'){
                    this.start['opacity'] = window.getComputedStyle(E)['opacity']
                    this.start['visibility'] = window.getComputedStyle(E)['visibility']
                }else if(prop != 'autoAlpha' || window.getComputedStyle(E)[prop] != undefined || window.getComputedStyle(E)[prop] != NaN){
                    if(window.getComputedStyle(E)['transform'] != 'none'){
                        if(prop === 'scale')  this.start[prop] = parseInt(window.getComputedStyle(E)['transform'].split(',')[3].replace(")", ""))
                    }else{
                        prop === 'scale' ?  this.start[prop] = 1 : this.start[prop] = window.getComputedStyle(E)[prop]
                    }
                }else{
                    this.start[prop] = E[prop]
                }
            }
        }
    }
    compatibility(A, init){
        for (var prop in A) {
            if(prop === 'duration' || prop === 'ease' || prop === 'delay') return
            if(typeof A[prop] === "string"){
                if(A[prop].includes("vw")){
                    A[prop] = parseInt(A[prop].replace("vw", "")) * window.innerWidth / 100
                }else if(A[prop].includes("vh")){
                    A[prop] = parseInt(A[prop].replace("vh", "")) * window.innerHeight / 100
                }else if(A[prop].includes("%")){
                    if(prop === 'x') A[prop] = parseInt(A[prop].replace("%", "")) * this.elmnt.getBoundingClientRect().width / 100
                    if(prop === 'y') A[prop] = parseInt(A[prop].replace("%", "")) * this.elmnt.getBoundingClientRect().height / 100
                }else if(A[prop].includes("#")){
                    A[prop] = hexToRGB(A[prop])
                }else if(A[prop].includes("px")){
                    A[prop] = parseInt(A[prop].replace("px", ""))
                }
                if(!init) this.target[prop] = A[prop]
                if(!init) this.toEL[prop] = this.target[prop]
            }else{
                if(!init) this.target[prop] = A[prop]
                if(!init && prop === 'autoAlpha'){
                    this.target['opacity'] = A['autoAlpha']
                    this.toEL['opacity'] = this.target['autoAlpha']
                } 
                if(!init) this.toEL[prop] = this.target[prop]
                if(init) A[prop] = A[prop]
            }
        }
    }
    to(el, opts, TL){
        this.setVariable(el, opts)
        this.setStart(el, opts)
        this.compatibility(opts)
        this.init()
        if(!TL) this.callBack(opts.delay ? opts.duration + opts.delay : opts.duration, this.onComplete)
    }
    fromTo(el, optsFrom, optsTo, TL){
        this.setVariable(el, optsTo)
        this.setStart(el, optsFrom, optsFrom)
        this.compatibility(optsTo)
        this.init()
        if(!TL) this.callBack(optsTo.delay ? optsTo.duration + optsTo.delay : optsTo.duration, this.onComplete)
    }
    TL(el, opts){
        let d = 0
        let t = [0]
        let timeCallback = 0
        let onComplete
        opts.forEach((anim,index) =>{
            timeCallback += anim.delay ? anim.duration + anim.delay : anim.duration
            if(anim.onComplete) onComplete = anim.onComplete
            if(index != 0){
                d += opts[index-1].duration * 1000
                t.push(d)
            }
            setTimeout(() => {
                if(index === 0){
                    this.to(el, anim, 'tl')
                }else{
                    this.fromTo(el, opts[index-1], opts[index], 'tl')
                }
            },  t[index]);
        });
        this.callBack(timeCallback, onComplete)
    }
    init() {
        this.paused = false
        this.compatibility(this.start, 'init')
        setTimeout(() => {
            this.startTime = new Date()
            this.render()
        }, this.delay * 1000);
    }
    callBack(duration, callBack){
        setTimeout(() => {if(callBack) callBack()}, duration * 1000);
    }
    render() {
        let time = new Date() - this.startTime
        if (time * 0.001 <= this.duration) {
            for (var prop in this.toEL) {
                if(prop != 'backgroundColor' || prop != 'color'){
                    this.toEL[prop] = R.Remap(0, 0.999, this.start[prop], this.target[prop], this.ease(time * 0.001 / this.duration))
                }
                if (prop === 'x' || prop === 'y' || prop === 'rotate' || prop === 'scale') {
                    if(this.elmnt instanceof window.HTMLElement){
                        this.elmnt.style.transform = `translate3d(${this.toEL['x'] ? this.toEL['x'] : 0}px, ${this.toEL['y'] ? this.toEL['y'] : 0}px, 0px) rotate(${this.toEL['rotate'] ? this.toEL['rotate'] : 0}deg) scale(${this.toEL['scale'] ? this.toEL['scale'] : 1})`
                    }else{
                        if(prop === 'x'){
                            this.elmnt.x = this.toEL[prop]
                        }else if(prop === 'y'){
                            this.elmnt.y = this.toEL[prop]
                        }else if(prop === 'z'){
                            this.elmnt.z = this.toEL[prop]
                        }
                    }
                } else if (prop === 'height') {
                    this.elmnt.style.height = this.toEL[prop] + 'px'
                } else if (prop === 'width') {
                    this.elmnt.style.width = this.toEL[prop] + 'px'
                } else if (prop === 'margin' || prop === 'marginRight' || prop === 'marginLeft' || prop === 'marginTop' || prop === 'marginBottom') {
                    if(prop === 'margin')this.elmnt.style.margin = this.toEL[prop] + 'px'
                    if(prop === 'marginTop')this.elmnt.style.margin = `${this.toEL[prop]}px 0 0 0`
                    if(prop === 'marginRight')this.elmnt.style.margin = `0 ${this.toEL[prop]}px 0 0`
                    if(prop === 'marginBottom')this.elmnt.style.margin = `0 0 ${this.toEL[prop]}px 0`
                    if(prop === 'marginLeft')this.elmnt.style.margin = `0 0 0 ${this.toEL[prop]}px`
                } else if (prop === 'padding' || prop === 'paddingRight' || prop === 'paddingLeft' || prop === 'paddingTop' || prop === 'paddingBottom') {
                    if(prop === 'padding')this.elmnt.style.padding = this.toEL[prop] + 'px'
                    if(prop === 'paddingTop')this.elmnt.style.padding = `${this.toEL[prop]}px 0 0 0`
                    if(prop === 'paddingRight')this.elmnt.style.padding = `0 ${this.toEL[prop]}px 0 0`
                    if(prop === 'paddingBottom')this.elmnt.style.padding = `0 0 ${this.toEL[prop]}px 0`
                    if(prop === 'paddingLeft')this.elmnt.style.padding = `0 0 0 ${this.toEL[prop]}px`
                }else if (prop === 'top' || prop === 'right' || prop === 'bottom' || prop === 'left' || prop === 'inset') {
                    if(prop === 'top')this.elmnt.style.top = this.toEL[prop] + 'px'
                    if(prop === 'right')this.elmnt.style.right = this.toEL[prop] + 'px'
                    if(prop === 'bottom')this.elmnt.style.bottom = this.toEL[prop] + 'px'
                    if(prop === 'left')this.elmnt.style.left = this.toEL[prop] + 'px'
                    if(prop === 'inset')this.elmnt.style.inset = this.toEL[prop] + 'px'
                } else if (prop === 'opacity') {
                    this.elmnt.style.opacity = this.toEL[prop]
                }else if (prop === 'autoAlpha') {
                    this.elmnt.style.opacity = this.toEL[prop]
                    if(this.toEL[prop] > 0){
                        this.elmnt.style.visibility = 'visible'
                    }else if(this.toEL[prop] === 0){
                        this.elmnt.style.visibility = 'hidden'
                    }
                   
                } else if (prop === 'value') {
                    this.elmnt.value = this.toEL[prop]
                } else if (prop === 'volume') {
                    this.elmnt.volume = this.toEL[prop]
                } else if (prop === 'backgroundColor' || prop === 'color') {
                    let r,
                        g,
                        b,
                        rS = parseInt(this.start[prop].slice(4).split(',')[0]),
                        gS = parseInt(this.start[prop].slice(4).split(',')[1]),
                        bS = parseInt(this.start[prop].slice(4).split(',')[2]),
                        rT = parseInt(this.target[prop].slice(4).split(',')[0]),
                        gT = parseInt(this.target[prop].slice(4).split(',')[1]),
                        bT = parseInt(this.target[prop].slice(4).split(',')[2])
                    r = R.Remap(0, 0.999, rS, rT, this.ease(time * 0.001 / this.duration))
                    g = R.Remap(0, 0.999, gS, gT, this.ease(time * 0.001 / this.duration))
                    b = R.Remap(0, 0.999, bS, bT, this.ease(time * 0.001 / this.duration))
                    if(prop === 'backgroundColor'){
                        this.elmnt.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
                    }else{
                        this.elmnt.style.color = `rgb(${r}, ${g}, ${b})`
                    }
                }else if (prop === 'borderRadius') {
                    this.elmnt.style.borderRadius = `${this.toEL[prop]}px`
                }else {
                    prop = this.target[prop]
                }
            }
            requestAnimationFrame(this.render.bind(this));
        } else {
            time = this.duration;
            for (var prop in this.props) {
                this.start[prop] = this.props[prop]
            }
        }
    }
}

module.exports = {
    R,
    IziBaiz,
}