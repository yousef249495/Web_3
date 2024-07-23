let mainColor = localStorage.getItem("main-color")
let backgroundCondition = localStorage.getItem("background-condition")
const colorsOptions = document.querySelectorAll(".colors-list li")
const landing = document.querySelector(".landing-page")
const randomBackrgoundSpans = document.querySelectorAll(".random-background-condition span")
let changeBackground = true
let backgroundInterval


// coloring li in options box in setting menu with setting attribute
let colors = ["#d8315b", "#FF9800", "#009688", "#03A9F4", "#4CAF50"]
for (let i = 0; i < colors.length; i++) {
    colorsOptions[i].style.backgroundColor = colors[i]
    colorsOptions[i].setAttribute("data-color", colors[i])
}

if (mainColor !== null) {
    // removing active class from all colors options
    colorsOptions.forEach(color => color.classList.remove("active"))
    document.documentElement.style.setProperty('--main-cl', mainColor)
}

colorsOptions.forEach(li => {
    // Focusing on active color div
    if (li.dataset.color === mainColor) li.classList.add("active")

    li.addEventListener("click", e => {
        // Changing main color and save it to localstorage
        document.documentElement.style.setProperty('--main-cl', e.target.dataset.color)
        localStorage.setItem("main-color", e.target.dataset.color)

        // removing active class from all colors options
        colorsOptions.forEach(color => color.classList.remove("active"))

        // Adding active class to selected options
        e.target.classList.add("active")
    })
})



if (backgroundCondition !== null) {
    randomBackrgoundSpans.forEach(span => span.classList.remove("active"))

    if (backgroundCondition === 'true') {
        changeBackground = true
        document.querySelector(".random-background-condition .yes").classList.add("active")
    } else {
        changeBackground = false
        document.querySelector(".random-background-condition .no").classList.add("active")
    }
}

randomBackrgoundSpans.forEach(span => {

    span.addEventListener("click", e => {
        e.target.parentElement.querySelectorAll(".active").forEach(element => element.classList.remove("active"))

        e.target.classList.add("active")

        if (e.target.dataset.background === "yes") {
            changeBackground = true
            randomizeImgs()
            localStorage.setItem("background-condition", true)
        } else {
            changeBackground = false
            clearInterval(backgroundInterval)
            localStorage.setItem("background-condition", false)
        }
    })
})

function randomizeImgs() {
    if (changeBackground === true) {
        backgroundInterval = setInterval(() => {
            let imgs = ["img_1.jpg", "img_2.jpg", "img_3.jpg", "img_4.jpg", "img_5.jpg", "img_6.jpg",]
            let randomBackground = imgs[Math.floor(Math.random() * imgs.length)]
            landing.style.backgroundImage = `url("../imgs/${randomBackground}")`
        }, 10000)
    }
}

randomizeImgs()



// Opening setting menu
const settingBox = document.querySelector(".setting-box")
const settingIconDiv = document.querySelector(".setting-icon")
const gearIcon = document.querySelector(".setting-box .setting-icon img")
settingIconDiv.addEventListener("click", function () {
    settingBox.classList.toggle("active")
    gearIcon.classList.toggle("active")
})


