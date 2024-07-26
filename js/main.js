let mainColorLocalStorage = localStorage.getItem("main-color")
let backgroundLocalStorage = localStorage.getItem("background-condition")
const colorsOptions = document.querySelectorAll(".colors-list li")
const landing = document.querySelector(".landing-page")
const randomBackrgoundSpans = document.querySelectorAll(".random-background-condition span")
const goTopBtn = document.querySelector('.go-top');
let changeBackground = true
let backgroundInterval


// coloring li in options box in setting menu with setting attribute
let colors = ["#03A9F4", "#FF9800", "#20cde5", "#d8315b", "#df5bf4"]
for (let i = 0; i < colors.length; i++) {
    colorsOptions[i].style.backgroundColor = colors[i]
    colorsOptions[i].setAttribute("data-color", colors[i])
}

if (mainColorLocalStorage !== null) {
    // removing active class from all colors options
    colorsOptions.forEach(color => color.classList.remove("active"))
    document.documentElement.style.setProperty('--main-cl', mainColorLocalStorage)
}

colorsOptions.forEach(li => {
    // Focusing on active color div
    if (li.dataset.color === mainColorLocalStorage) li.classList.add("active")

    li.addEventListener("click", e => {
        // Changing main color and save it to localstorage
        document.documentElement.style.setProperty('--main-cl', e.target.dataset.color)
        localStorage.setItem("main-color", e.target.dataset.color)

        // Handle Active status
        handleActive(e)

    })
})


if (backgroundLocalStorage !== null) {
    randomBackrgoundSpans.forEach(span => span.classList.remove("active"))

    if (backgroundLocalStorage === 'true') {
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


// Start Go Top Button
goTopBtn.onclick = _ => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })

// Start Skills Page 
let skills = document.querySelectorAll(".skill-progress span")

window.onscroll = function () {
    let ourSkills = document.querySelector(".skills")

    let skillOfsetTop = ourSkills.offsetTop
    let skillOuterHeight = ourSkills.scrollHeight
    let windowHeight = this.innerHeight
    let windowScrollTop = this.scrollY

    // if (windowScrollTop > (skillOfsetTop + skillOuterHeight - windowHeight)) {}
    if (windowScrollTop > windowHeight) {
        // navBullets.style.right = '0'

        skills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    }

    if (windowScrollTop === 0) {

        // navBullets.style.right = '-40px'

        skills.forEach(skill => {
            skill.style.width = "0"

        })
    }

    // go top button part
    if (window.scrollY > windowHeight) {
        goTopBtn.style.display = 'block'
    } else {
        goTopBtn.style.display = 'none'
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

        document.querySelector('.popup-overlay').addEventListener('click', _ => {
            popupBox.remove()

            document.querySelector('.popup-overlay').remove()
        })
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

function removePopupOverlay() {
    document.querySelector('.popup-overlay').addEventListener('click', _ => {
        popupBox.remove()

        document.querySelector('.popup-overlay').remove()
    })
}

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


// Showing bullets or not
const bulletsOptionSpans = document.querySelectorAll(".option-box .bullets-option span")
const navBullets = document.querySelector(".nav-bullets")
let bulletsLocalStorage = localStorage.getItem('bullets-display')

if (bulletsLocalStorage !== null) {
    bulletsOptionSpans.forEach(span => {

        span.classList.remove("active")

        if (span.dataset.show === "yes" && bulletsLocalStorage === "block") {
            span.classList.add("active")
            navBullets.style.display = bulletsLocalStorage
        } else if (span.dataset.show === "no" && bulletsLocalStorage === "none") {
            span.classList.add("active")
            navBullets.style.display = bulletsLocalStorage
        }

    })
}

bulletsOptionSpans.forEach(span => {

    span.addEventListener('click', e => {

        handleActive(e)

        if (e.target.dataset.show === 'yes') {
            navBullets.style.display = 'block'
            localStorage.setItem("bullets-display", 'block')
        } else {
            navBullets.style.display = 'none'
            localStorage.setItem("bullets-display", 'none')
        }
    })
})


// Reset All Options 
document.querySelector('.reset-options').onclick = function () {
    localStorage.clear()
    window.location.reload()
}


const menuBar = document.querySelector(".toggle-menu");
const linkSection = document.querySelector(".links");

// Toggle menu open/close on menuBar click
menuBar.addEventListener('click', () => {
    linkSection.classList.toggle('open');
    menuBar.classList.toggle('open');
});

// Function to close the menu
function closeMenu() {
    linkSection.classList.remove('open');
    menuBar.classList.remove('open');
}

// Close the menu if clicking outside of it
window.addEventListener('click', (e) => {
    if (!linkSection.contains(e.target) && !menuBar.contains(e.target)) {
        closeMenu();
    }
});

