
const diskImages = $$('.musicbar_info_disk')
const musicNames = $$('.musicbar_info_name')
const singers = $$('.musicbar_info_singers')
const audio = $('.song_audio')
const disks = $$('.musicbar_info_disk_wrapper')
const maxTimeSongs = $$('.musicbar_custom_time_max')
const minTimes = $$('.musicbar_custom_time_min')
const volumes = $$('.musicbar_tools_volume_bar')
const volumeBtns = $$('.musicbar_tools_icon .volume-btn')
const musicbar = $('.music_bar')
const popup = $('.popup')
const popupDisk = $('.popup_middle_song_disk_image')
const popupSongName = $('.popup_middle_song_name')
const popupArtists = $('.popup_middle_song_artists')
const popupDownBtn = $('.popup_down_btn')
let displayedSongIndexes = []

const zingMp3 = {
    currentIndex: 0,
    isLoop: false,
    isRandom: false,
    isMuted: false,
    volumeValue: 100,
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
                        <div class="user_overview_song_icon hide-on-mobile">
                            <i class="bi bi-mic-fill"></i> 
                        </div>
                        <div class="user_overview_song_icon hide-on-mobile">
                            <i class="bi bi-heart-fill"></i>
                        </div>
                        <div class="user_overview_song_icon">
                            <i class="bi bi-three-dots"></i>
                        </div>
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
        const playBtns = $$('.musicbar_custom_play_icon .bi-play-fill')
        const pauseBtns = $$('.musicbar_custom_play_icon .bi-pause')
        const nextBtns = $$('.musicbar_custom_play_icon .bi-skip-end-fill')
        const prevBtns = $$('.musicbar_custom_play_icon .bi-skip-start-fill')
        const randomBtns = $$('.musicbar_custom_play_icon .bi-shuffle')
        const loopBtns = $$('.musicbar_custom_play_icon .bi-arrow-repeat')
        const timeLines = $$('.musicbar_custom_time_bar')
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

        // handle popup
        musicbar.onclick = function() {
            popup.classList.add('up')
            popup.classList.remove('down')
            musicbar.classList.add('has-popup')
            sidebar.classList.add('has-popup')
        }

        popupDownBtn.onclick = function() {
            popup.classList.add('down')
            popup.classList.remove('up')
            musicbar.classList.remove('has-popup')
            sidebar.classList.remove('has-popup')
        }

        //handle pause and play btns
        Array.from(playBtns).forEach((playBtn, index) => {
            playBtn.onclick = function(e) {
                e.stopPropagation()
                this.classList.add('hide-btn')
                pauseBtns[index].classList.remove('hide-btn')
                audio.play()
            }
        })

        Array.from(pauseBtns).forEach((pauseBtn, index) => {
            pauseBtn.onclick = function(e) {
                e.stopPropagation()
                this.classList.add('hide-btn')
                playBtns[index].classList.remove('hide-btn')
                audio.pause()
            }
        })

        audio.onplay = function() {
            popupDisk.classList.add('playing')
            Array.from(disks).forEach(disk => disk.classList.add('playing'))
            Array.from($$('.user_overview_content_song.active')).forEach(song => song.classList.add('playing'))
            Array.from(playBtns).forEach((playBtn, index) => {
                playBtn.classList.add('hide-btn')
                pauseBtns[index].classList.remove('hide-btn')
            })
        }

        audio.onpause = function() {
            popupDisk.classList.remove('playing')
            Array.from(disks).forEach(disk => disk.classList.remove('playing'))
            Array.from($$('.user_overview_content_song.playing')).forEach(song => song.classList.remove('playing'))
            Array.from(pauseBtns).forEach((pauseBtn, index) => {
                pauseBtn.classList.add('hide-btn')
                playBtns[index].classList.remove('hide-btn')
            })
        }

        // handle next song btn
        Array.from(nextBtns).forEach(nextBtn => {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation()
                if(this.isRandom) {
                    this.handleRandomSong()
                }else {
                    this.handleNextSong()
                }
            })  
        })

        Array.from(prevBtns).forEach(prevBtn => {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation()
                if(this.isRandom) {
                    this.handleRandomSong()
                }else {
                    this.handlePrevSong()
                }
            })
        })

        // handle timeline song
        audio.ontimeupdate = function() {
            const audioDuration = this.duration || 1    
            const audioCurrentTime = audio.currentTime
            const minutes = Math.floor(audioCurrentTime/60)
            const timeForSeconds = audioCurrentTime - (minutes * 60)
            const seconds = Math.floor(timeForSeconds)
            const minutesReadable = minutes > 9 ? minutes : `0${minutes}`
            const secondsReadable = seconds > 9 ? seconds : `0${seconds}`
            Array.from(minTimes).forEach((minTime, index) => {
                minTime.innerText = `${minutesReadable}:${secondsReadable}`
                timeLines[index].value = Math.ceil((audioCurrentTime*100)/audioDuration)
            })
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
        Array.from(timeLines).forEach(timeLine => {
            timeLine.oninput = function() {
                const timeLineValue = timeLine.value
                const audioDuration = audio.duration    
                audio.currentTime = Math.ceil((audioDuration*timeLineValue)/100)
            }
        })

        // handle random btn
        for(const randomBtn of Array.from(randomBtns)) {
            randomBtn.onclick = function(e) {
                e.stopPropagation()
                Array.from(randomBtns).forEach((item, index) => {
                    if(!_this.isRandom) {
                        randomBtns[index].classList.add('active')
                    }else {
                        randomBtns[index].classList.remove('active')
                    }
                })
                _this.isRandom = !_this.isRandom
            }
        }

        // handle loop btn

        for(const loopBtn of Array.from(loopBtns)) {
            loopBtn.onclick = function(e) {
                e.stopPropagation()
                Array.from(loopBtns).forEach((item, index) => {
                    if(!_this.isLoop) {
                        loopBtns[index].classList.add('active')
                    }else {
                        loopBtns[index].classList.remove('active')
                    }
                })
                _this.isLoop = !_this.isLoop
            }
        }

        // handle volume
        Array.from(volumes).forEach(volume => {
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
        })

        Array.from(volumeBtns).forEach(volumeBtn => {
            volumeBtn.onclick = function(e) {
                e.stopPropagation()
                _this.isMuted = !_this.isMuted
                _this.handleVolume()
            }
        })
        
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
        Array.from(volumeBtns).forEach((volumeBtn, index) => {
            if(this.isMuted) {
                volumeBtn.classList.add('bi-volume-mute')
                volumeBtn.classList.remove('bi-volume-up')
                audio.volume = volumes[index].value = 0
            }else {
                volumeBtn.classList.add('bi-volume-up')
                volumeBtn.classList.remove('bi-volume-mute')
                audio.volume = this.volumeValue/100
                volumes[index].value = this.volumeValue
            }
        })
    },
    loadCurrentSong() {
        audio.src = this.currentSong.link
        popupDisk.style.background = `url('${this.currentSong.thumnail}') center center / cover no-repeat`
        popupSongName.innerText = this.currentSong.name
        popupArtists.innerText = this.currentSong.singers
        Array.from(musicNames).forEach(musicName => {
            musicName.innerText = this.currentSong.name
        })
        Array.from(singers).forEach(singer => {
           singer.innerText = this.currentSong.singers
        })
        Array.from(diskImages).forEach(diskImage => {
            diskImage.src = this.currentSong.thumnail
        })
        Array.from(maxTimeSongs).forEach(maxTimeSong => {
           maxTimeSong.innerText = this.currentSong.time
        })
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