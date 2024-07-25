let mainColor = localStorage.getItem("main-color")
let backgroundCondition = localStorage.getItem("background-condition")
const colorsOptions = document.querySelectorAll(".colors-list li")
const landing = document.querySelector(".landing-page")
const randomBackrgoundSpans = document.querySelectorAll(".random-background-condition span")
let changeBackground = true
let backgroundInterval


// coloring li in options box in setting menu with setting attribute
let colors = ["#d8315b", "#FF9800", "#20cde5", "#03A9F4", "#df5bf4"]
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

        // Handle Active status
        handleActive(e)

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

        // Handle Active status
        handleActive(e)

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


// Start Skills Page 

let skills = document.querySelectorAll(".skill-progress span")

window.onscroll = function () {
    let ourSkills = document.querySelector(".skills")

    let skillOfsetTop = ourSkills.offsetTop
    let skillOuterHeight = ourSkills.scrollHeight
    let windowHeight = this.innerHeight
    let windowScrollTop = this.scrollY

    if (windowScrollTop > (skillOfsetTop + skillOuterHeight - windowHeight)) {

        document.querySelector('.nav-bullets').style.display = 'block'

        skills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    }

    if (windowScrollTop === 0) {

        document.querySelector('.nav-bullets').style.display = 'none'

        skills.forEach(skill => {
            skill.style.width = "0"

        })
    }
}
// End Skills Page 
// Start products
let ourProducts = document.querySelectorAll(".products .product-box img")

ourProducts.forEach(product => {
    product.addEventListener("click", e => {

        // Create overlay element
        let overlay = document.createElement("div")
        overlay.className = 'popup-overlay'

        document.body.appendChild(overlay)

        // Create popup box 
        let popupBox = document.createElement("div")
        popupBox.className = 'popup-box'

        // Adding heading to the img 
        if (product.alt !== null) {
            let imgHeading = document.createElement("h3")
            imgHeading.innerHTML = product.alt
            popupBox.appendChild(imgHeading)
        }

        let popupImage = document.createElement("img")
        popupImage.src = product.src
        popupImage.alt = product.alt

        popupBox.appendChild(popupImage)

        // Create Close Button 
        let closeBtn = document.createElement("img")
        closeBtn.src = '/svgs/close.svg'
        closeBtn.className = 'close-button'
        popupBox.appendChild(closeBtn)

        document.body.appendChild(popupBox)

    })
})

// Close popup img
document.addEventListener("click", e => {
    if (e.target.className === 'close-button') {

        // Remove the image that on overlay
        e.target.parentElement.remove()
        // document.querySelector(".popup-box").remove()

        // Remove Overlay
        document.querySelector('.popup-overlay').remove()
    }
})

// End products
// Start bullets and Links 
let bullets = document.querySelectorAll(".nav-bullets .bullet")
let links = document.querySelectorAll(".links a")

scrollToWantSection(bullets)
scrollToWantSection(links)

function scrollToWantSection(elemets) {
    elemets.forEach(element => {

        element.addEventListener("click", e => {

            e.preventDefault()

            let targetSection = document.querySelector(`.${e.target.dataset.section}`);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            } else {
                console.error("Target section not found for selector:", e.target.dataset.section);
            }

        })

    })

}
// End bullets and Links 

// Handle Active status
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => element.classList.remove("active"))

    ev.target.classList.add("active")

}
