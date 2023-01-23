var swiper = new Swiper(".book-slider-prev", {
   effect: "coverflow",
   grabCursor: true,
   centeredSlides: true,
   slidesPerView: "auto",
   coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 900,
      modifier: 1,
      slideShadows: false,
   },
   pagination: {
      el: ".swiper-pagination",
      type: "fraction"
   },
   navigation: {
      nextEl: ".swiper-button-next-unique",
      prevEl: ".swiper-button-prev-unique",
   }
});

// custom pagination swiper js
const currentPage = document.querySelector('.swiper-pagination-current')
currentPage.nextSibling.remove()

const totalPages = document.querySelector('.swiper-pagination-total')

const span1 = document.createElement('span')
const teks1 = document.createTextNode('Halaman ')
span1.appendChild(teks1)

const span2 = document.createElement('span')
const teks2 = document.createTextNode(' dari ')
span2.appendChild(teks2)

const pagination = document.querySelector('.swiper-pagination')
pagination.insertBefore(span1, currentPage)
pagination.insertBefore(span2, totalPages)


var swiper = new Swiper(".testimonial-slider", {
   slidesPerView: "auto",
   spaceBetween: 30,
   pagination: {
      el: ".swiper-pagination",
      clickable: true
   },
   navigation: {
      nextEl: ".testimonial-btn-next",
      prevEl: ".testimonial-btn-prev",
   }
});

// set year in footer
const yearElement = document.querySelector('.year')
yearElement.textContent = new Date().getFullYear()

// sidebar toggle on mobile
const openSidebarElement = document.querySelector('.open-sidebar')
const closeElement = document.querySelector('.close')

openSidebarElement.addEventListener('click', () => {
   toggleSidebar()
})
closeElement.addEventListener('click', () => {
   toggleSidebar()
})

function toggleSidebar() {   
   const navItems = document.querySelector('.nav-items')
   navItems.classList.toggle('active')
}

// fixed header on scroll

function setActiveLink() {   
   let scrollY = window.scrollY
   const sections = document.querySelectorAll('section')
   const header = document.querySelector('.header')
   const links = document.querySelectorAll('.nav-item a')

   if (scrollY == 0) {
      links[0].classList.add('active')
   } 

   sections.forEach((section) => {
      if (!section.getAttribute('id')) {
         return
      }

      const offsetTop =section.offsetTop
      const height =section.offsetHeight
      const sectionId = section.getAttribute('id')

      if (scrollY > (section.offsetTop-800) && scrollY < (offsetTop + height)) {
         links.forEach((link) => {
            linkHref = link.getAttribute('href')
            linkHref = linkHref.replace('#', '')
            
            if (linkHref === sectionId) {
               removeLastActiveLink()
               link.classList.add('active')
            }
         })
      }

      if (scrollY > (header.offsetTop) && scrollY < (header.offsetTop + (header.offsetHeight-400))) {
         removeLastActiveLink()
         links[0].classList.add('active')
      }
   })   
}
setActiveLink()

window.addEventListener('scroll', () => {
   setActiveLink()
   stickyNavbar()   
})

function stickyNavbar() {   
   const navBarElement = document.querySelector('nav')
   const navbar = navBarElement.getBoundingClientRect();

   if (window.scrollY > navbar.height) {
      navBarElement.classList.remove('to-top')
      return navBarElement.classList.add('sticky-navbar')
   }
   navBarElement.classList.remove('sticky-navbar')
}

// cek scroll stop
const onStopScrolling = callback => {
   let isScrolling
   window.addEventListener('scroll', () => {
      clearTimeout(isScrolling)
      isScrolling = setTimeout(() => {
         callback()
      }, 3000);
   })
}
onStopScrolling(() => {   
   const navBarElement = document.querySelector('nav')
   if (navBarElement.classList.contains('sticky-navbar')) {
      navBarElement.classList.add('to-top')
   }
})

// set active link
function navMenuOnclick() {
   const links = document.querySelectorAll('.nav-item a')
   links.forEach((link) => {
      link.addEventListener('click', () => {
         removeLastActiveLink()
         setActiveLink()
         toggleSidebar()
      })
   })   
}
navMenuOnclick()


function removeLastActiveLink() {
   const links = document.querySelectorAll('.nav-item a')
   links.forEach((link) => {
      link.classList.remove('active')
   })
}

