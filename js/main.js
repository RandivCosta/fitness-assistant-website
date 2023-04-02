const ready = () => {
    console.log('DOMContentLoaded');
};
// Code to execute after the DOM content has loaded
document.addEventListener('DOMContentLoaded', ready());


/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
        console.log('sidebar opened')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
        console.log('sidebar closed')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When user clicks each nav links sidebar will be closed
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('bg-header')
        : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)



/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1500,
    delay: 300,
})

sr.reveal(`.home__data, .footer__container, .footer__group`)
sr.reveal(`.home__img`, { delay: 700, origin: 'bottom' })
sr.reveal(`.logos__img, .program__card`, { interval: 100 })
sr.reveal(`.choose__img, .details-description`, { origin: 'left' })
sr.reveal(`.choose__content, .details-container, .start_btn`, { origin: 'right' })



/*=============== EMAIL JS ===============*/

/*=============== DETAILS PAGE FORM VALIDATIONS ===============*/
class FormValidator {
    constructor(form, fields) {
        this.form = form
        this.fields = fields
    }

    initialize() {
        this.validateOnEntry()
        this.validateOnSubmit()
    }

    validateOnSubmit() {
        let self = this

        this.form.addEventListener('submit', e => {
            e.preventDefault()
            self.fields.forEach(field => {
                const input = document.querySelector(`#${field}`)
                self.validateFields(input)
            })
        })
    }

    validateOnEntry() {
        let self = this
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`)

            input.addEventListener('input', event => {
                self.validateFields(input)
            })
        })
    }

    validateFields(field) {

        // Check presence of values
        if (field.value.trim() === "") {
            this.setStatus(field, `${field.previousElementSibling.innerText} cannot be blank`, "error")
        } else {
            this.setStatus(field, null, "success")
        }

        // check for a valid email address
        if (field.type === "email") {
            const re = /\S+@\S+\.\S+/
            if (re.test(field.value)) {
                this.setStatus(field, null, "success")
            } else {
                this.setStatus(field, "Please enter valid email address", "error")
            }
        }

        // Password confirmation edge case
        /*if (field.id === "password_confirmation") {
            const passwordField = this.form.querySelector('#password')

            if (field.value.trim() == "") {
                this.setStatus(field, "Password confirmation required", "error")
            } else if (field.value != passwordField.value) {
                this.setStatus(field, "Password does not match", "error")
            } else {
                this.setStatus(field, null, "success")
            }
        }*/

        //check for gender validation
        /*if (field.type === "radio") {
            const genderRadios = document.querySelectorAll('input[name="gender"]');
            let selectedGender;
            console.log("wedhede")
            for (const radio of genderRadios) {
                if (radio.checked) {
                    selectedGender = radio.value;
                    break;
                }
            }
            if (selectedGender) {
                // Validation succeeded, do something with the selected gender
                this.setStatus(field, null, "success")
                console.log(`Selected gender: ${selectedGender}`);
            } else {
                // Validation failed, show an error message
                this.setStatus(field, "Please select a gender", "error")
            }
        }*/
    }

    setStatus(field, message, status) {
        const successIcon = field.parentElement.querySelector('.icon-success')
        const errorIcon = field.parentElement.querySelector('.icon-error')
        const errorMessage = field.parentElement.querySelector('.error-message')

        if (status === "success") {
            if (errorIcon) { errorIcon.classList.add('hidden') }
            if (errorMessage) { errorMessage.innerText = "" }
            successIcon.classList.remove('hidden')
            field.classList.remove('input-error')
        }

        if (status === "error") {
            if (successIcon) { successIcon.classList.add('hidden') }
            field.parentElement.querySelector('.error-message').innerText = message
            errorIcon.classList.remove('hidden')
            field.classList.add('input-error')
        }
    }
}

//define the fields
const form = document.querySelector('.form')
const fields = ["username", "email", "occupation", "age"];
//initialize the form validator
const validator = new FormValidator(form, fields)
validator.initialize()

