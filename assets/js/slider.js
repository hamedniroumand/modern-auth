
class Slider {

    activeIndex = 0;
    sliders = null;

    constructor(selector) {
        this.selector = selector;
        this.run();
        this.showWithTimer();
    }

    run() {
        const slides = document.querySelectorAll(`${this.selector} .slide`);
        this.sliders = Array.from(slides);
        this.sliders[0].classList.add("active")
    }

    showWithTimer() {
        setInterval(() => {
            this.hideAllElement();
            if(this.sliders[this.activeIndex+1]) {
                this.sliders[this.activeIndex+1].classList.add('active');
                this.activeIndex += 1;
            } else {
                this.sliders[0].classList.add('active');
                this.activeIndex = 0;
            }
        }, 6000)
    }

    hideAllElement() {
        this.sliders.forEach(slide => {
            slide.classList.remove("active");
        })
    }
    

}
