

const mv = [
    {
        thumnail: './images/mv-image/mv1.jpg',
        artistImage: './images/mv-image/artist-images/artist1.jpg',
        name: 'Một Bước Yêu Vạn Dặm Đau',
        artists: 'Mr. Siro',
        time: '11:54'   
    },
    {
        thumnail: './images/mv-image/mv2.jpg',
        artistImage: './images/mv-image/artist-images/artist2.jpg',
        name: 'Simple Love',
        artists: 'Obito, Seachan, Davis',
        time:'03:54'
        
    },
    {
        thumnail: './images/mv-image/mv3.jpg',
        artistImage: './images/mv-image/artist-images/artist3.jpg',
        name: 'Lời yêu ngây dại',
        artists: 'Kha',
        time:'04:33'
    },
    {
        thumnail: './images/mv-image/mv4.jpg',
        artistImage: './images/mv-image/artist-images/artist4.jpg',
        name: '24H',
        artists: 'LyLy, Magazine',
        time:'04:18'
    },
    {
        thumnail: './images/mv-image/mv5.jpg',
        artistImage: './images/mv-image/artist-images/artist5.jpg',
        name: 'Nước mắt em lau bằng tình yêu mới',
        artists: 'Da Lab, Tóc Tiên',
        time:'05:45'
    },
    {
        thumnail: './images/mv-image/mv6.jpg',
        artistImage: './images/mv-image/artist-images/artist6.jpg',
        name: 'Yêu đơn phương',
        artists: 'OnlyC, Karik',
        time:'05:02'
    },
    {
        thumnail: './images/mv-image/mv7.jpg',
        artistImage: './images/mv-image/artist-images/artist7.jpg',
        name: 'Phía sau em',
        artists: 'Kay Trần, Binz',
        time:'04:06'
    },
    {
        thumnail: './images/mv-image/mv8.jpg',
        artistImage: './images/mv-image/artist-images/artist8.jpg',
        name: 'Mình yêu nhau đi',
        artists: 'Bích Phương',
        time:'03:52'
    },
    {
        thumnail: './images/mv-image/mv9.jpg',
        artistImage: './images/mv-image/artist-images/artist9.jpg',
        name: 'Đừng về trễ (Acoustic Version)',
        artists: 'Sơn Tùng MT-P',
        time:'04:41'
    }
]

const overviewMvWrapper = $('.js-mv-wrapper')

const overviewMvRender = mv.map(item => {
    return `
        <li class="user_overview_content_post swiper-slide col col-15 l-4 m-6 c-12">
            <div class="user_overview_post_image_wrapper">
                <img src=${item.thumnail} alt="" class="user_overview_post_image">
                <div class="user_post_icon_wrapper">
                    <i class="bi bi-x-lg mv-x-icon"></i>
                    <div class="user_post_play_fill_icon_circle">
                        <i class="bi bi-play-fill user_post_play_fill_icon"></i>  
                    </div>
                    <p class="user_mv_time">${item.time}</p>
                </div>
            </div>
            <div class="user_overview_post_mv_info">
                <div class="mv_info_des_wrapper">
                    <p class="user_overview_post_mv_des">
                        <span class="limit-text-2-line">${item.name}</span> 
                    </p>
                    <p class="user_overview_post_artist">
                        <span>${item.artists}</span>
                    </p>
                </div>
            </div>
        </li>
    `
})

overviewMvWrapper.innerHTML = overviewMvRender.join('')

const mvWrapper = $('.user_mv_content_posts')

const mvRender = mv.map(item => {
    return `
        <li class="user_overview_content_post margin-bot-20 col col-15 l-4 m-6 c-12">
            <div class="user_overview_post_image_wrapper">
                <img src=${item.thumnail} alt="" class="user_overview_post_image">
                <div class="user_post_icon_wrapper">
                    <i class="bi bi-x-lg mv-x-icon"></i>
                    <div class="user_post_play_fill_icon_circle">
                        <i class="bi bi-play-fill user_post_play_fill_icon"></i>  
                    </div>
                    <p class="user_mv_time">${item.time}</p>
                </div>
            </div>
            <div class="user_overview_post_mv_info">
                <div class="mv_info_des_wrapper">
                    <p class="user_overview_post_mv_des">
                        <span class="limit-text-2-line">${item.name}</span> 
                    </p>
                    <p class="user_overview_post_artist">
                        <span>${item.artists}</span>
                    </p>
                </div>
            </div>
        </li>
    `
})

mvWrapper.innerHTML = mvRender.join('')