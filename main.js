const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER';

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('audio');
const cdWidth = $('.cd').offsetWidth;
const playBtn = $('.btn.btn-toggle-play');
const nextBtn = $('.btn.btn-next');
const prevBtn = $('.btn.btn-prev');
const randomBtn = $('.btn.btn-random');
const repeatBtn = $('.btn.btn-repeat');
const player = $('.player');
const progress = $('#progress');
const playlist = $('.playlist');


const app = {
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    currentIndex : 0,
    lastIndex : -1,
    config : JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig : function(key, value) {
        this.config[key] =  value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    songs: [
        {
            name: 'Girls Like You',
            singer: 'Maroon 5 ft.Cardi B (Hiderway Remix)',
            url: 'https://cf-media.sndcdn.com/UxdJpGerYrQJ.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vVXhkSnBHZXJZclFKLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxNDQ0NzQwfX19XX0_&Signature=Dog6FDEpokeqjyUdqbK4w4R2sp2LUJ-9CWGBLIduitdQX-jXx9kiNVAfU1Zn5wpLTkILF3GMGK~0mBX2T65EIdhGtFj2TrpeB7FpqA4kBwaEBoeCiZxOfFIaPGLxu3pwIF67pFXeSOGtKNFoWZkSPU5s2gsY0AOMolJjUwwtipYI1kWhsYNohuLi~qefCw9kPb7SJ~2k29SGncURTnXwBO8yYL~307lzel5nrozT8GKX3Epw88IUB6IHIxwXCSZKoxg1iN~asr6KdWNRn6Al8vRt~yuo2qvIz4CrfKuB4wtX9u1fDwaufoxbRaM53vupva490DYsVc0K~5DQ8uDmAQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-000474374193-745f2w-t500x500.jpg',
        },
        {
            name: 'Love Me Like You Do',
            singer: 'Ellie Goulding (cover)',
            url : 'https://cf-media.sndcdn.com/gcMHTCs2Gryq.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vZ2NNSFRDczJHcnlxLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxNDQ0NjM5fX19XX0_&Signature=feWem26MTTQKieXjuewkBQ~n0DDDA~d3axZ7MsuMZvk5Tnq3EHlFOif-6YOdfbrye~FsoA-r6w~ewPZwnbSC5n3xsbjQ9ktCTgp6BOMVNVIi7ih72a5osIYepZqAPn~2AFmUTgHMG1R27UPuabgF-N3zBpxdQWD~bwbU0WQnKQtQ9CO8~9gmDKffcREc~0aIcM29Lf1txCk6y-Y47QwL5LwoCV-iKMlxsoNQo~aXygGm9MlImQM~FnZmjP3vwmCVsVKEFUVui4a2~FkijvAk~LA-070uDf6nGi37jlv22115tu7vU7N06vXa9UfNlfIeUsrUWTDizGoUBYEz2C9r4g__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-000106288137-p8gm48-t500x500.jpg'
        },
        {
            name: 'Shape Of You',
            singer: 'Ed Sheeran',
            url: 'https://cf-media.sndcdn.com/afL96KeQO4Du.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vYWZMOTZLZVFPNER1LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxMjI0NDE1fX19XX0_&Signature=NcKR~3N~cxuVj3LwL3gm0I~WdnRV1pyu9wGj9xQnA3IvqV3Qu1V~dtZn32d8pN9beSQ5C~lOdB9vVAorm6cj~-ZKGylcKINrcQpLo8BteaDLiAcjg3f2p1WMLmq85fEH0~ya5P1Ug9x3tp0e9PRzBbj42XGYZtDs-HVswd-LT3BzRVyfjw~hzg3z8qUR9bCzOTOjK8QDyIvtL0gs5BpHk49qzk~SmEXoc~Y8tNw0Abtw-ohv4msixwVheyqVpDHxzRtEcEG-Y8XFiATtQESKcrkaLFWacnGdiGrURvnfcgnd4L-vuKH13UKC9tJTnl-wWP5cwl~E95VSaC2tbAjLOQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-000216517058-54f04s-t500x500.jpg'
        },
        {
            name: 'Sugar',
            singer: 'Maroon 5',
            url: 'https://cf-media.sndcdn.com/6A9S74UMVeOw.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vNkE5Uzc0VU1WZU93LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxMjI0NjcxfX19XX0_&Signature=R1fSKQtXSK5BNv2sRzYjgrP1YlpmjpXo~0O0RIRFGHpEjCT0Ab0s4cK4TR~rzyiQW~aJa9KCdEwwsnIvmnMvqtewP0TiMBu53XPe4thIXW2X3qeV6CizYug-PHyk-AuKfOuj8POvlLAUYlc~2quHJfpmmAPpgr~Xw~pPAcFkEZhRQk-QH~saZkClmd1ajSdiNH0mCyij3Wd4eOUY~0QNcRTXcsXM8S~k4e2QY3EXgn3RR7BFmLPjC5DCUmg2C88jO~dFAst67XWOs5HoTI~2d8~hgWBf1uJrHb3CD4nRJ1WvuazFZ56iMVQx0l-c2fhj-I6zJTwcKTqjSdFgaYTZog__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image : 'https://i1.sndcdn.com/artworks-000104792214-yqs9wl-t500x500.jpg'
        },
        {
            name: 'Memories',
            singer: "Maroon 5",
            url: 'https://cf-media.sndcdn.com/7x8N7TksL7ub.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vN3g4TjdUa3NMN3ViLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxMjI0Njg3fX19XX0_&Signature=b3LCM7RvR4uSYxdAqrEpv5VBpmzoyKSpkarEaUUvf9KaaMbLf2gLFoANBrS6Vj7e00OzNWNYD4Sacou3CjDrIESsENYNJAsYox06RcMrkuw~DaJfewvfVG3JV47qRzL429zWPf3a6i~SVRDY6Phzh-RG671gUlW5IFtIgbyZhNXKw149qDKLM9agBg87f4RHkSUE9jGHZI5xtFsTTUM5Nzh~peu09lr1ucnAxlRISl0cvJz4nLStdkWAxdZwz6ipAyH93EgAEZf~LBjN4nKkekEkbHwElun9uxNWrHC0nLHryj55fks95~AC2Jf-oYRDelye8qBQyGU3sjgL5-hEkw__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-000611868784-usldr7-t500x500.jpg'
        },
    ],

    loadConfig : function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat =  this.config.isRepeat;
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get : function() {
                return this.songs[this.currentIndex];
            }
        });
    },

    render: function () {
        const html = this.songs.map((song, index) => {
            return `<div class="song" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>`
        }).join('\n');

        playlist.innerHTML = html;
    },

    activeSong: function() {
        const listSong = $$('.song');
        listSong[this.currentIndex].classList.add('active');
        if (listSong[this.lastIndex])
        {
            listSong[this.lastIndex].classList.remove('active');
        }
            
    },

    handelEvent: function () {
        const _this = this;

        // quay cd 
        const cdThumbAnimate = cdThumb.animate(
            [{transform: `rotate(360deg)`}],
            {
                duration: 10000, // 10s
                iterations: Infinity
            }
        )
        cdThumbAnimate.pause();

        // Thu nhỏ cd
        document.onscroll = function () {
            const scrollTop = document.scrollY || document.documentElement.scrollTop;
            const cdNewWidth = cdWidth - scrollTop;          
            $('.cd').style.width = cdNewWidth < 0 ? 0 : cdNewWidth + 'px';
            $('.cd').style.opacity = cdNewWidth / cdWidth;
        }

        // play music
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            }
            else {
                audio.play();
            }
        }
        
        // audio playing
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }
        
        // audio paused
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // thay đổi giá trị progress khi đang phát bài hát
        audio.ontimeupdate = function() {
            const progressPercent = audio.currentTime / audio.duration * 100; 

            if (audio.duration) {
                progress.value = progressPercent;
            }
            else {
                progress.value = 0;
            }
        }

        // tua
        progress.onchange = function() {
            audio.currentTime = progress.value / 100 * audio.duration;
        }

        // chuyển bài
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            }
            else {
                _this.nextSong();
            }
            audio.play();
            _this.activeSong();
        }

        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            }
            else {
                _this.prevSong();
            }
            audio.play();
            _this.activeSong();
        }

        // random
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        // chuyển bài khi kết thúc
        audio.onended = function() {
            if (_this.isRepeat) {
            }
            else {
                if (_this.isRandom) {
                    _this.playRandomSong();
                }
                else {
                    _this.nextSong();
                }
            }
            audio.play();
            _this.activeSong();
        }

        // lặp lại bài hát
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // Khi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                if (songNode) {
                    const index = Number(songNode.dataset.index);
                    _this.lastIndex = _this.currentIndex;
                    _this.currentIndex = index;
                    _this.loadCurrentSong();
                    audio.play();
                    _this.activeSong();
                }
            }
        }

    },

    loadCurrentSong: function () {
        heading.innerText = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.url;
    },

    nextSong: function() {
        this.pastIndex = this.currentIndex;
        this.currentIndex++;
        if (this.currentIndex == this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.pastIndex = this.currentIndex;
        this.currentIndex--;
        if (this.currentIndex == -1) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandomSong : function() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.songs.length)
        }
        while (randomIndex == this.currentIndex || randomIndex == this.pastIndex)
        
        this.pastIndex = this.currentIndex;
        this.currentIndex = randomIndex;
        this.loadCurrentSong();
    },

    start: function () { 
        // Load config
        this.loadConfig();

        // Định nghĩa các thuộc tính của đối tượng
        this.defineProperties();

        // Bắt và xử lý các sự kiện (DOM event)
        this.handelEvent();

        // Load song và render lại playlist
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // Active song
        this.activeSong();

        // Hiển thị trạng thái của nút repeat & random
        repeatBtn.classList.toggle('active', this.isRepeat);
        randomBtn.classList.toggle('active', this.isRandom);
    },
    

};


app.start();