function text_anim(){
    let container = document.querySelector('.middle-text-container')
let string = "JNCODES"
let code = ""
for (let i = 0; i<7; i++){
    let cd = `<div class = "txtwrap txtwrap${i+1}">
    <h1 class="top${i+1} txttop">${string[i]}</h1>
    <h1 class="stay${i+1} txtstay">${string[i]}</h1>
    </div>`
    code += cd
}

container.innerHTML += code

let vals = {
    1: {X: 110},
    2: {Y: -110},
    3: {X: -110},
    4: {Y: 110},
    5: {X: 110},
    6: {Y: -110},
    7: {X: -110}
}


for (let key in vals){
    for (let key2 in vals[key]){
        let axis = key2
        let value =  vals[key][key2]
        // console.log(axis, value)
        document.querySelectorAll('.txttop')[key-1].style.transform = `translate${axis}(${value}%)`
    }
    
    
}





let cont_array = document.querySelectorAll('.txtwrap')
cont_array.forEach((e, i)=>{
    e.addEventListener("mousemove",()=>{
        let index = i
        let top = e.querySelector(`.top${i+1}`)
        let bottom = e.querySelector(`.stay${i+1}`)

        let transform = (top.style.transform)
        // let transform = "translateY(100%)"

// Match using RegExp
        let match = transform.match(/translate([XY])\((-?\d+%)\)/)
        let axis,value
        if (match) {
            axis = match[1]   // "Y"
            value = match[2]  // "100%"   
            // console.log(axis, value)
            top.style.transform = `translate(0%,0%)`
            function invertValue(value) {
                if (value.startsWith('-')) {
                    // If it starts with '-', remove it
                    return value.slice(1);
                } else {
                    // If it doesn't start with '-', add '-'
                    return '-' + value;
                }
            }

            bottom.style.transform = `translate${axis}(${invertValue(value)})`
            
        }
        




        // top.style.transform = `translateY(0%)`
        // bottom.style.transform = `translateY(100%)`
    })
cont_array.forEach((e, i)=>{
    e.addEventListener('mouseleave', ()=>{
        let index = i
        let top = e.querySelector(`.top${i+1}`)
        let bottom = e.querySelector(`.stay${i+1}`)



        bottom.style.transform = `translate(0%, 0%)`
        let dict = (vals[i+1])
        let [[axis, value]] = Object.entries(dict);
        
        top.style.transform = `translate${axis}(${value}%)`
        // bottom.style.transform = `translateY(0%)`
    })
})
})
}
text_anim()


function video_trail1(){
    let video = document.querySelector('.video-div')
    let trail1 = document.querySelector('.trail1')
    let trail2 = document.querySelector('.trail2')

    let scroll = window.scroll
    let time = performance.now()

    gsap.to(video, {
        rotation: 0,
        top: "100vh",
        left: 0,
        width: window.innerWidth,
        transform: `translate(0%, 0%)`,
        ease: "expoScale(0.5,7,none)",
        scrollTrigger:{
            scrub: true,
            target: ".page1",
            // markers: true,
            start: "top top",
            end: () => window.innerHeight / 2.5 + "px",
            onUpdate:(self)=>{
                let scrollDir = self.direction === 1 ? "bottom" : "top";
                if (scrollDir === "bottom"){
                    trail1.style.transformOrigin = "bottom left"
                    trail2.style.transformOrigin = "bottom left"
                }
                else{
                    trail1.style.transformOrigin = "top right"
                    trail2.style.transformOrigin = "top right"
                }



                let ntime = performance.now()
                let nscroll = window.scrollY

                let distance = Math.abs(scroll - nscroll)
                let d_time = (ntime - time)

                let velocity = distance/d_time
                let clamp = gsap.utils.clamp(1, 1.5);
                let scale_value = clamp(velocity * 2.7);
                gsap.to('.trail1', {
                    scale: scale_value
                })
                gsap.to('.trail1', {
                    scale: 1
                })
                gsap.to('.trail2', {
                    scale: scale_value/1.1
                })
                gsap.to('.trail2', {
                    scale: 1
                })

                time = performance.now()
                scroll = window.scrollY
            }

            
        }
        
    })
    let para = document.querySelector('.p')
    let string = ``
    std = ''
    para.innerHTML.split('').forEach((e)=>{
        if (e == " "){
           std = `&nbsp`
        }
        else{
            std = `<span class = "para">${e}</span>`
        }
        string+=(std)
    })
    para.innerHTML = string
    gsap.set('.p span',{
        opacity:0
    })
    gsap.to('.p span',{
        opacity: 1,
        stagger: 0.2,
        scrollTrigger:{
            start: () => window.innerHeight / 1.5 +  "px",
            end: `+=${window.innerHeight / 3.5}`,
            scrub: true,
            // markers: true,
        }
    })

    
}
video_trail1()

let holder1 = document.querySelector('#holder1')
const rect = holder1.getBoundingClientRect();
holder1.style.height = `${rect.height}px`
holder1.style.width = `${rect.width}px`

let image1 = document.querySelector('.sp-img1')
let target = document.querySelectorAll('.box')
let parent = document.querySelector('.page3')
let data = image1.getBoundingClientRect()
let parentRect = parent.getBoundingClientRect()

let relativeX = data.left - parentRect.left
let relativeY = data.top - parentRect.top

target.forEach((e)=>{
    e.style.left = `${relativeX}px`
    e.style.top = `${relativeY}px`
})


holder1.addEventListener('mouseenter',()=>{
    target.forEach((e, i)=>{
        gsap.killTweensOf(e);
        let val = ``
        let yshift = 0
        if(i == 0){
            val = `35%`
            yshift = 110
        }
        if (i == 1){
            val = `50%`
        }
        if (i == 2){
            val = `65%`
            yshift= 110
        }
        gsap.to(e, {
            left: val,
            top: `9%`,
            opacity: 1,
            yPercent: yshift,
            duration: 1,
            ease: "elastic.out(1,0.3)",
            scale: 2
        })
    })
})
holder1.addEventListener('mouseleave',()=>{
        target.forEach((e)=>{
            gsap.killTweensOf(e);
            gsap.to(e, {
                left: relativeX,
                top: relativeY,
                yPercent: 0,
                transform: ``,
                duration: 0.3,
                ease: "elastic.out(1,0.3)",
                scale: 1,
                duration: 1
            })
        })
    })