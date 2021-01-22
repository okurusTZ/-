const headerEl = document.querySelector("header");
const scorllToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
    // 获取占屏幕空间的矩形区域
    let height = headerEl.getBoundingClientRect().height;
    // 向下滑动的距离减去本身的高度超过800px，就显示
    if(window.pageYOffset-height > 800){
        if(!headerEl.classList.contains("sticky")){
            headerEl.classList.add("sticky");
        }
    }else{
        headerEl.classList.remove("sticky");
    }

    if(window.pageYOffset > 2000){
        scorllToTop.style.display = "block";
    }else {
        scorllToTop.style.display = "none";
    }
});




const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");

glide.on(["mount.after","run.after"], () => {
    const caption = captionsEl[glide.index];
    anime({
        targets: caption.children,
        opacity: [0,1],
        duration: 400,
        easing: "linear",
        delay: anime.stagger(400, {start: 300}),
        translateY: [anime.stagger([40, 10]), 0]
    });
});

glide.on("run.before", () => {
    document.querySelectorAll(".slide-cation > *").forEach(el => {
        el.style.opacity = 0;
    });
});

glide.mount();

const isotope = new Isotope(".cases", {
    layoutMode: "fitRows",
    itemSelector: ".case-item"
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", e => {
    let {target} = e;
    const filterOption = target.getAttribute("data-filter");
    if(filterOption){
        document.querySelectorAll(".filter-btn.active").forEach(btn => btn.classList.remove("active"));
        target.classList.add("active");

        isotope.arrange({filter: filterOption});
    }
});

const staggeringOption = {
    dalay:300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
};

ScrollReveal().reveal(".feature", {...staggeringOption, interval: 350});
ScrollReveal().reveal(".service-item", {...staggeringOption, interval: 350});

const dataSectionEl = document.querySelector(".data-section");
ScrollReveal().reveal(".data-section", {
    beforeReveal: () => {
        anime({
            targets: ".data-piece .num",
            //返回开始标签到结束标签之间的html
            innerHTML: el => {
                return [0, el.innerHTML];
            },
            duration:2000,
            round:1,
            easing: "easeInExpo"
        });
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom/5}px)`;
    }
});


window.addEventListener("scroll", () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;

    if(bottom >= 0 && top <= window.innerHeight){
        //注意用``
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom/5}px)`;
    }
});

//nav下的a中的href属性，以#开头的全部选择出来
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
    header: "header",
    offset:80
});

//当点击完后，窗口滑动，取消掉open状态
document.addEventListener("scrollStart", ()=>{
    if(headerEl.classList.contains("open")){
        headerEl.classList.remove("open");
    } 
})

const exploreBtnEls = document.querySelectorAll(".explore-btn");

exploreBtnEls.forEach(exploreBtnEl =>{
    exploreBtnEl.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#about-us"));
    });
});

const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () =>{
    headerEl.classList.toggle("open");
})