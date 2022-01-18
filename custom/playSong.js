
const diskImage = $('.musicbar_info_disk')
const musicName = $('.musicbar_info_name')
const singer = $('.musicbar_info_singers')
const audio = $('.song_audio')
const disk = $('.musicbar_info_disk_wrapper')
const timeLine = $('.musicbar_custom_time_bar')
const maxTimeSong = $('.musicbar_custom_time_max')
const minTime = $('.musicbar_custom_time_min')
const volume = $('.musicbar_tools_volume_bar')
const volumeBtn = $('.musicbar_tools_icon .volume-btn')

let displayedSongIndexes = []

const zingMp3 = {
    currentIndex: 0,
    isLoop: false,
    isRandom: false,
    isMuted: false,
    volumeValue: volume.value,
    storage: {
        set(data) {
        },
        get() {
            return JSON.parse(localStorage.getItem('zing-mp3'))
        }
    },
    render() {
        const overviewSongWrapper = $('.user_overview_content_songs')
        const songWrapper = $('.user_songs_content_songs')

        const overviewSongRender = songs.map((song, index) => {
            return `
                <li class="user_overview_content_song ${this.currentIndex === index ? 'active' : ''}" data-index='${index}'>
                    <div class="user_overview_song_image_wrapper">
                        <div class="songs_icon_wrapper hide-on-mobile">
                            <i class="bi bi-music-note-beamed songs_icon"></i>
                        </div>
                        <div class="user_overview_song_image_inner">
                            <i class="bi bi-play-fill user_overview_play_icon"></i>
                            <img src="${song.thumnail}" alt="" class="user_overview_song_image">
                            <div class="user_overview_playing_icon_wrapper hide-btn">
                                <img src="./images/song-image/icon-playing.gif" alt="" class="user_overview_playing_icon">
                            </div>
                        </div>   
                        <div class="user_overview_song_info">
                            <p class="user_overview_song_name limit-text">
                                ${song.name}
                            </p>
                            <div class="user_overview_song_singers limit-text">
                                ${song.singers}
                            </div>
                        </div> 
                    </div>
                    <p class="user_overview_song_time hide-on-mobile hide-on-tablet">
                        ${song.time}
                    </p>
                    <div class="user_overview_song_options">
                        <i class="bi bi-mic-fill hide-on-mobile user_overview_song_icon"></i> 
                        <i class="bi bi-heart-fill hide-on-mobile user_overview_song_icon"></i>
                        <i class="bi bi-three-dots user_overview_song_icon hide-on-tablet"></i>
                    </div>
                </li>
            `
        }).join('')

        overviewSongWrapper.innerHTML = overviewSongRender
        songWrapper.innerHTML = overviewSongRender
    },
    handleEvent() {
        const _this = this
        const overviewSongs = $$('.user_overview_content_songs .user_overview_content_song')
        const songLists = $$('.user_songs_content_songs .user_overview_content_song')
        const songSets = [Array.from(overviewSongs), Array.from(songLists)]
        const playBtn = $('.musicbar_custom_play_icon .bi-play-fill')
        const pauseBtn = $('.musicbar_custom_play_icon .bi-pause')
        const nextBtn = $('.musicbar_custom_play_icon .bi-skip-end-fill')
        const prevBtn = $('.musicbar_custom_play_icon .bi-skip-start-fill')
        const randomBtn = $('.musicbar_custom_play_icon .bi-shuffle')
        const loopBtn = $('.musicbar_custom_play_icon .bi-arrow-repeat')
        
        //handle song items
        songSets.forEach(songList => {
            songList.forEach(song => {
                song.onclick = function(e) {
                    if(!this.classList.contains('playing')) {
                        if(!e.target.closest('.user_overview_song_icon')) {
                            _this.currentIndex = Number(this.dataset.index)
                            _this.loadCurrentSong()
                            _this.handlePlaySong()
                        }
                    }
                }
            })
        })

        //handle pause and play btns
        playBtn.onclick = function() {
            this.classList.add('hide-btn')
            pauseBtn.classList.remove('hide-btn')
            audio.play()
        }

        pauseBtn.onclick = function() {
            this.classList.add('hide-btn')
            playBtn.classList.remove('hide-btn')
            audio.pause()
        }

        audio.onplay = function() {
            disk.classList.add('playing')
            playBtn.classList.add('hide-btn')
            pauseBtn.classList.remove('hide-btn')
            Array.from($$('.user_overview_content_song.active')).forEach(song => song.classList.add('playing'))
        }

        audio.onpause = function() {
            disk.classList.remove('playing')
            playBtn.classList.remove('hide-btn')
            pauseBtn.classList.add('hide-btn')
            Array.from($$('.user_overview_content_song.playing')).forEach(song => song.classList.remove('playing'))
        }

        // handle next song btn
        nextBtn.addEventListener('click', () => {
            if(this.isRandom) {
                this.handleRandomSong()
            }else {
                this.handleNextSong()
            }
        })
        prevBtn.addEventListener('click', () => {
            if(this.isRandom) {
                this.handleRandomSong()
            }else {
                this.handlePrevSong()
            }
        })

        // handle timeline song
        audio.ontimeupdate = function() {
            const audioDuration = this.duration || 1    
            const audioCurrentTime = audio.currentTime
            timeLine.value = Math.ceil((audioCurrentTime*100)/audioDuration)
            const minutes = Math.floor(audioCurrentTime/60)
            const timeForSeconds = audioCurrentTime - (minutes * 60)
            const seconds = Math.floor(timeForSeconds)
            const minutesReadable = minutes > 9 ? minutes : `0${minutes}`
            const secondsReadable = seconds > 9 ? seconds : `0${seconds}`
            minTime.innerText = `${minutesReadable}:${secondsReadable}`
        }
        // handle audio ended
        audio.onended = function() {
            if(_this.isLoop) {
                _this.handleLoopSong()
            }else {
                _this.handleNextSong()
            }
        }

        // custom timeline
        timeLine.oninput = function() {
            const timeLineValue = timeLine.value
            const audioDuration = audio.duration    
            audio.currentTime = Math.ceil((audioDuration*timeLineValue)/100)
        }

        // handle random btn
        randomBtn.onclick = function() {
            if(!_this.isRandom) {
                this.classList.add('active')
            }else {
                this.classList.remove('active')
            }
            _this.isRandom = !_this.isRandom
        }

        // handle loop btn
        loopBtn.onclick = function() {
            if(!_this.isLoop) {
                this.classList.add('active')
            }else {
                this.classList.remove('active')
            }
            _this.isLoop = !_this.isLoop
        }

        // handle volume
        volume.oninput = function() {
            audio.volume = _this.volumeValue/100
            _this.volumeValue = this.value
            if(Number(_this.volumeValue) === 0) {
                _this.isMuted = true
            }else {
                _this.isMuted = false
            }
            _this.handleVolume()
        }

        volumeBtn.onclick = function() {
            _this.isMuted = !_this.isMuted
            _this.handleVolume()
        }
        
    },
    handlePlaySong() {
        const overviewSongs = $$('.user_overview_content_songs .user_overview_content_song')
        const songList = $$('.user_songs_content_songs .user_overview_content_song')
        const overviewSongArr = Array.from(overviewSongs)
        const songListArr = Array.from(songList)
        const activeSongs = $$('.user_overview_content_song.active')
        const playingSongs = $$('.user_overview_content_song.playing')

        Array.from(activeSongs).forEach(activeSong => activeSong.classList.remove('active'))
        if(playingSongs.length > 0) {
            Array.from(playingSongs).forEach(playingSong => playingSong.classList.remove('playing'))
        }
        overviewSongArr[this.currentIndex].classList.add('active','playing')
        songListArr[this.currentIndex].classList.add('active','playing')
        audio.play()
    },
    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return songs[this.currentIndex]
            }
        })
    },
    handleNextSong() {
        zingMp3.currentIndex = zingMp3.currentIndex + 1
        if(zingMp3.currentIndex === songs.length) {
            zingMp3.currentIndex = 0
        }
        zingMp3.loadCurrentSong()
        zingMp3.handlePlaySong()
    },
    handlePrevSong() {
        if(zingMp3.currentIndex === 0) {
            zingMp3.currentIndex = songs.length - 1
        }else {
            zingMp3.currentIndex = zingMp3.currentIndex - 1
        }
        zingMp3.loadCurrentSong()
        zingMp3.handlePlaySong()
    },
    handleLoopSong() {
        this.currentIndex = this.currentIndex
        this.handlePlaySong()
    },
    handleRandomSong() {
        if(displayedSongIndexes.length === songs.length) {
            displayedSongIndexes = []
        }
        let randomIndex
        do {
           randomIndex = Math.floor(Math.random() * songs.length)
        }while(displayedSongIndexes.includes(randomIndex))
        displayedSongIndexes.push(randomIndex)
        this.currentIndex = randomIndex
        this.loadCurrentSong()
        this.handlePlaySong()
    },
    handleVolume() {
        if(this.isMuted) {
            volumeBtn.classList.add('bi-volume-mute')
            volumeBtn.classList.remove('bi-volume-up')
            volume.value = 0
            audio.volume = volume.value
        }else {
            volumeBtn.classList.add('bi-volume-up')
            volumeBtn.classList.remove('bi-volume-mute')
            audio.volume = this.volumeValue/100
            volume.value = this.volumeValue
        }
    },
    loadCurrentSong() {
        musicName.innerText = this.currentSong.name
        singer.innerText = this.currentSong.singers
        diskImage.src = this.currentSong.thumnail
        audio.src = this.currentSong.link
        maxTimeSong.innerText = this.currentSong.time
    },
    start() {
        // render
        this.render()
        
        // Định nghĩa các thuộc tính 
        this.defineProperties()

        // Xử lý các sự kiện
        this.handleEvent()

        // Tải nhạc hiện tại
        this.loadCurrentSong()
     
    }
}

zingMp3.start()