

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// handle history input
const inputSearch = $('.header_search_input')
const historyTable = $('.header_search_history')
const headerOptions = $('.header_options')

inputSearch.onfocus = function() {
    historyTable.style.display = 'block'
    headerOptions.classList.add('hide-on-mobile')
}

inputSearch.onblur = function() {
    historyTable.style.display = 'none'
    headerOptions.classList.remove('hide-on-mobile')
}

//header

const header = $('.header')

window.onscroll = () => {
    if(window.scrollY === 0) {
        header.classList.remove('header-fixed')
    }
    else {
        header.classList.add('header-fixed')
    }
}


// expand side bar
const sidebar = $('.side_bar')
const expandBtn = $('.sidebar_expand_btn_wrapper')
const shrinkBtn = $('.sidebar_shrink_btn_wrapper')

expandBtn.onclick = function() {
    sidebar.classList.add('expand_sidebar')
}
shrinkBtn.onclick = function() {
    sidebar.classList.remove('expand_sidebar')
}

// handle user content

const userOptions = $$('.user_nav_item')
const userContents = $$('.user_display')

Array.from(userOptions).forEach((userOption, index) => {
    userOption.onclick = function() {
        $('.user_nav_item.active').classList.remove('active')
        $('.user_display.active').classList.remove('active')
        this.classList.add('active')

        Array.from(userContents).forEach((userContent, id) => {
            if(index === id) {
                userContent.classList.add('active')
            }
        })
    }
})

// image slide

const imageWrapers = $$('.user_overview_slides_wrapper_image')

setInterval(() => {
    let thirdNextIndex = Array.from(imageWrapers).indexOf($('.slide-third')) + 1
    if(thirdNextIndex ===  imageWrapers.length) {
        thirdNextIndex = 0
    }
    $('.slide-first').classList.remove('slide-first')
    $('.slide-second').classList.add('slide-first')
    $('.slide-second').classList.remove('slide-second')
    $('.slide-third').classList.add('slide-second')
    $('.slide-third').classList.remove('slide-third')
    imageWrapers[thirdNextIndex].classList.add('slide-third')
}, 2200)

