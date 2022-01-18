

const artists = [
    {
        image: '../images/artists-image/artist1.jpg',
        name: 'Binz',
        care: '265K',
    },
    {
        image: '../images/artists-image/artist2.jpg',
        name: 'Phương Ly',
        care: '77K',
        
    },
    {
        image: '../images/artists-image/artist3.jpg',
        name: 'Amee',
        care: '317K',
    },
    {
        image: '../images/artists-image/artist4.jpg',
        name: 'MCK',
        care: '57K',
    },
    {
        image: '../images/artists-image/artist5.jpg',
        name: 'Sơn Tùng MT-P',
        care: '2.1M',
    },
    {
        image: '../images/artists-image/artist6.jpg',
        name: 'Mr. Siro',
        care: '735K',
    },
    {
        image: '../images/artists-image/artist7.jpg',
        name: 'Han Sara',
        care: '158K',
    },
    {
        image: '../images/artists-image/artist8.jpg',
        name: 'Bích Phương',
        care: '368K',
    },
    {
        image: '../images/artists-image/artist9.jpg',
        name: 'Soobin',
        care: '435K',
    },
    {
        image: '../images/artists-image/artist10.jpg',
        name: 'Chi Dân',
        care: '158K',
    },
]

const overviewArtistWrapper = $('.js-artists-wrapper')

const overviewArtistRender = artists.map(item => {
    return `
        <li class="user_overview_content_post swiper-slide col col-15 l-2-4 m-3 c-6">
            <div class="user_overview_post_image_wrapper user_overview_artist_image_wrapper">
                <img src=${item.image} alt="" class="user_overview_post_image user_overview_artist_image">
                <div class="user_post_icon_wrapper">
                    <div class="user_post_play_fill_icon_circle">
                        <i class="bi bi-play-fill user_post_play_fill_icon"></i>  
                    </div>
                </div>
            </div>
            <div class="user_overview_post_artist_info">
                <div class="artist_info_des_wrapper">
                    <p class="user_overview_artist_name">
                        <span>${item.name}</span> 
                        <i class="bi bi-star-fill artist_star_icon"></i>
                    </p>
                    <p class="user_overview_artist_care">
                        <span>${item.care} quan tâm</span>
                    </p>
                    <p class="user_overview_artist_cared">
                        <i class="bi bi-check2"></i>
                        <span>ĐÃ QUAN TÂM</span>
                    </p>
                </div>
            </div>
        </li>
    `
})

overviewArtistWrapper.innerHTML = overviewArtistRender.join('')

const artistWrapper = $('.user_artists_content_posts')

const artistRender = artists.map(item => {
    return `
        <li class="user_overview_content_post margin-bot-30 col col-15 l-2-4 m-3 c-6">
            <div class="user_overview_post_image_wrapper user_overview_artist_image_wrapper">
                <img src=${item.image} alt="" class="user_overview_post_image user_overview_artist_image">
                <div class="user_post_icon_wrapper">
                    <div class="user_post_play_fill_icon_circle">
                        <i class="bi bi-play-fill user_post_play_fill_icon"></i>  
                    </div>
                </div>
            </div>
            <div class="user_overview_post_artist_info">
                <div class="artist_info_des_wrapper">
                    <p class="user_overview_artist_name">
                        <span>${item.name}</span> 
                        <i class="bi bi-star-fill artist_star_icon"></i>
                    </p>
                    <p class="user_overview_artist_care">
                        <span>${item.care} quan tâm</span>
                    </p>
                    <p class="user_overview_artist_cared">
                        <i class="bi bi-check2"></i>
                        <span>ĐÃ QUAN TÂM</span>
                    </p>
                </div>
            </div>
        </li>
    `
})

artistWrapper.innerHTML = artistRender.join('')