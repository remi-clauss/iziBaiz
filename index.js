
function lerp(a, b, n) {
    return a * (1 - n) + b * n;
}

function RClamp(t, s, r){
    return Math.min(Math.max(t, s), r)
}

function iLerp(t, s, r){
    return RClamp((r - t) / (s - t), 0, 1)
}
const RRemap = (t, s, e, i, r) => lerp(e, i, iLerp(t, s, r))
const REase = {
    linear: t => t,
    i1: t => 1 - Math.cos(t * (.5 * Math.PI)),
    o1: t => Math.sin(t * (.5 * Math.PI)),
    io1: t => -.5 * (Math.cos(Math.PI * t) - 1),
    i2: t => t * t,
    o2: t => t * (2 - t),
    io2: t => t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1,
    i3: t => t * t * t,
    o3: t => --t * t * t + 1,
    io3: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    i4: t => t * t * t * t,
    o4: t => 1 - --t * t * t * t,
    io4: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    i5: t => t * t * t * t * t,
    o5: t => 1 + --t * t * t * t * t,
    io5: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
    sio5: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
    i6: t => 0 === t ? 0 : 2 ** (10 * (t - 1)),
    o6: t => 1 === t ? 1 : 1 - 2 ** (-10 * t),
    so6: t => 1 === t ? 1 : 1 - 2 ** (-15 * t),
    io6: t => 0 === t || 1 === t ? t : (t /= .5) < 1 ? .5 * 2 ** (15 * (t - 1)) : .5 * (2 - 2 ** (-15 * --t)),
    sio6: t => 0 === t || 1 === t ? t : (t /= .25) < 1 ? .5 * 2 ** (15 * (t - 1)) : .5 * (2 - 2 ** (-15 * --t))
}

class IziBaiz {
    constructor(el, props, duration, ease, delay) {
        this.bind()

        this.elmnt = el

        this.props = props

        this.start = {
            GLx: el.x,
            GLy: el.y,
            GLz: el.z,
            value: el.value
            // x: el.getBoundingClientRect().x,
            // y: el.getBoundingClientRect().y,
            // height: el.getBoundingClientRect().height,
            // width: el.getBoundingClientRect().width,
            // opacity: 1
        }
        this.target = {}

        this.ease = ease || REase.o6,
        this.duration = duration || 1.5,
        this.delay = delay || 0,

        this.startTime
        this.init()
    }
    bind() {
        ['init', 'render'].forEach((fn) => this[fn] = this[fn].bind(this))
    }
    init(){
        for(var prop in this.props) {
            this.target[prop] = this.props[prop]
		}
        setTimeout(() => {
            this.startTime = new Date()
            this.render()
        }, this.delay * 1000);
    }
    render() {
        let time = new Date() - this.startTime
        if(time * 0.001 < this.duration) {
            for(var prop in this.props) {
                this.props[prop] = RRemap(0,0.999,this.start[prop], this.target[prop], this.ease(time * 0.001/this.duration))
                if(prop === 'x' || prop === 'y'){
                    this.elmnt.style.transform = `translate3D(${this.props['x']}px, ${this.props['y']}px, 0px)`
                }else if(prop === 'height'){
                    this.elmnt.style.height = this.props[prop] + 'px'
                }else if(prop === 'width'){
                    this.elmnt.style.width = this.props[prop] + 'px'
                }else if(prop === 'opacity'){
                    this.elmnt.style.opacity = this.props[prop]
                }else if(prop === 'GLx'){
                    this.elmnt.x = this.props[prop]
                }else if(prop === 'GLy'){
                    this.elmnt.y = this.props[prop]
                }else if(prop === 'GLz'){
                    this.elmnt.z = this.props[prop]
                }else if(prop === 'value'){
                    this.elmnt.value = this.props[prop]
                }else{
                    prop = this.props[prop]
                }
            }
            requestAnimationFrame(this.render.bind(this));
        }else{
            time = this.duration;
            for(var prop in this.props) {
                this.start[prop] = this.props[prop]
            }
        }
    }
}

export {
    lerp,
    RClamp,
    iLerp,
    RRemap,
    REase,
    IziBaiz
}
