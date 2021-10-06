const pageButtons = document.querySelectorAll(".page-changer");
const border = document.querySelector(".border");
const forms = document.querySelectorAll(".page");

const pageIds = Array.from(forms).map(form => {
    return form.id;
});

const removeAllClass = (className, target = null) => {
    if(target) {
        target.forEach(el => {
            el.classList.remove(className);
        })
    }
    document.querySelectorAll(className).forEach(element => {
        element.classList.remove(className);
    });
} 

const changepage = (event) => {
    const currentActivePageId = document.querySelector(".page.active").id;
    const newPageId = event.dataset.page;
    removeAllClass("active", forms);
    removeAllClass("out-down");
    removeAllClass("out-top");
    
    const currentActivePageIndex = pageIds.findIndex(i => i === currentActivePageId);
    const newPageIndex = pageIds.findIndex(i => i === newPageId);

    if(currentActivePageIndex < newPageIndex) {
        document.getElementById(currentActivePageId).classList.add("out-down");
    } else if(currentActivePageIndex > newPageIndex) {
        document.getElementById(currentActivePageId).classList.add("out-top");
    }
    document.getElementById(newPageId).classList.add("active");
}

const pageChanged = (event) => {
    const targetPageId = event.currentTarget.dataset.page;
    changeBorder(false, targetPageId);
    changepage(event.currentTarget, targetPageId);
}

const changeBorder = (isInitializeMode, targetPageId = null) => {
    if (!isInitializeMode) {
        removeAllClass("active", document.querySelectorAll(".btn-page-changer"))
        document.querySelector(`.btn-page-changer[data-page='${targetPageId}']`).classList.add("active");
    }
    const activeBtn = document.querySelector(".btn-page-changer.active");
    border.style.height = `${activeBtn.clientHeight}px`;
    border.style.transform = `translateY(${activeBtn.offsetTop}px)`;
}

pageButtons.forEach(pageButton => {
    pageButton.addEventListener("click", pageChanged);
});

document.addEventListener("DOMContentLoaded", () => {
    new Slider(".slides");
    changeBorder(true, null);
    forms[0].classList.add('active')
});

const succes = () => {
    const left = document.querySelector(".left");
    const center = document.querySelector(".center");
    const right = document.querySelector(".right");
    
    const lw = left.clientWidth;
    const cw = center.clientWidth;
    const rw = right.clientWidth;

    let ss = (rw - lw) / 2;

    left.classList.add("done");
    right.classList.add("done");
    center.classList.add("done");
    
    setTimeout(() => {
        left.style['z-index'] = "-1";
        right.style['z-index'] = "-1";


        center.style.transition = `transform .4s ease`;
        center.style.transform = `translateX(${ss}px)`;
        center.style.width = `translateX(${cw}px)`;
    }, 1800);
}

document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const btn = form.querySelector("button");
        btn.setAttribute("disabled", "disable");

        btn.querySelector(".default").classList.add("deactive");
        setTimeout(() => {
            btn.querySelector(".loader").classList.add("active");
        }, 600);
        setTimeout(() => {
            succes()
        }, 500);
    });
});

