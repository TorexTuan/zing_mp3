

const playlist = [
    {   
        image: '../images/playlist-image/playlist1.jpg',
        description: 'V-Pop: The A-List',
        creator: 'Zing MP3'
    },
    {
        image: '../images/playlist-image/playlist2.jpg',
        description: 'Rồi Tới Luôn',
        creator: 'Nal'
    },
    {
        image: '../images/playlist-image/playlist3.jpg',
        description: 'Nhạc Q.Tế',
        creator: 'Lạc Trôi'
    },
    {
        image: '../images/playlist-image/playlist4.jpg',
        description: 'Những bản hit của Rap Việt',
        creator: 'Bigcityboy'
    },
    {
        image: '../images/playlist-image/playlist5.jpg',
        description: 'Top 100 Bài Hát Nhạc Trẻ Hay Nhất',
        creator: 'Zing MP3'
    },
    {
        image: '../images/playlist-image/playlist6.jpg',
        description: 'Những bản nhạc Dance hay nhất',
        creator: 'Đạt Tấn'
    },
    {
        image: '../images/playlist-image/playlist7.jpg',
        description: 'Em hát anh nghe',
        creator: 'Ngọc Trâm'
    },
    {
        image: '../images/playlist-image/playlist8.jpg',
        description: 'Chill cùng Đen Vâu',
        creator: 'Trà My'
    },
    {
        image: '../images/playlist-image/playlist9.jpg',
        description: 'Những bản hay nhất của Sơn Tùng MT-P',
        creator: 'Nguyễn Thành Công'
    }
]

const overviewPlaylistWrapper = $('.js-playlist-wrapper')

const overviewPlaylistRender = playlist.map((item, index) => {
    return `
        ${index === 0 ? `
            <li class="user_overview_content_post swiper-slide col col-15 l-2-4 m-3 c-4">
                <div class="user_overview_newplay_wrapper">
                    <i class="bi bi-plus-lg user_overview_plus_icon"></i>
                    <p class="user_overview_new_playlist">Tạo playlist mới</p>
                </div>
            </li>
        ` : ''}
        <li class="user_overview_content_post swiper-slide col col-15 l-2-4 m-3 c-4 ${index === 8 ? 'hide-on-mobile': ''}">
            <div class="user_overview_post_image_wrapper">
                <img src=${item.image} alt="" class="user_overview_post_image">
                <div class="user_post_icon_wrapper">
                    <i class="bi bi-heart user_post_heart_icon hide-on-tablet hide-on-mobile"></i>
                    <div class="user_post_play_fill_icon_circle">
                        <i class="bi bi-play-fill user_post_play_fill_icon"></i>  
                    </div>
                    <i class="bi bi-three-dots user_post_options_icon hide-on-tablet hide-on-mobile"></i>  
                </div>
            </div>
            <p class="user_overview_post_des limit-text-2-line">
                    ${item.description}
            </p>
            <p class="user_overview_post_creator limit-text">
                   ${item.creator}
            </p>
        </li>
    `
})

overviewPlaylistWrapper.innerHTML = overviewPlaylistRender.join('')

const playlistWrapper = $('.user_playlist_content_posts')

const playlistRender = playlist.map((item, index) => {
    return `
        ${index === 0 ? `
            <li class="user_overview_content_post margin-bot-30 col-15 l-2-4 m-3 c-4">
                <div class="user_overview_newplay_wrapper">
                    <i class="bi bi-plus-lg user_overview_plus_icon"></i>
                    <p class="user_overview_new_playlist">Tạo playlist mới</p>
                </div>
            </li>
        ` : ''}
        <li class="user_overview_content_post margin-bot-30 col col-15 l-2-4 m-3 c-4">
            <div class="user_overview_post_image_wrapper">
                <img src=${item.image} alt="" class="user_overview_post_image">
                <div class="user_post_icon_wrapper">
                    <i class="bi bi-heart user_post_heart_icon hide-on-tablet hide-on-mobile"></i>
                    <div class="user_post_play_fill_icon_circle">
                        <i class="bi bi-play-fill user_post_play_fill_icon"></i>  
                    </div>
                    <i class="bi bi-three-dots user_post_options_icon hide-on-tablet hide-on-mobile"></i>  
                </div>
            </div>
            <p class="user_overview_post_des limit-text-2-line">
                    ${item.description}
            </p>
            <p class="user_overview_post_creator limit-text">
                   ${item.creator}
            </p>
        </li>
    `
})

playlistWrapper.innerHTML = playlistRender.join('')