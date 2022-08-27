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
            url: 'https://cf-media.sndcdn.com/61nF2PDdTcN8.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vNjFuRjJQRGRUY044LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxNTY0ODU5fX19XX0_&Signature=Xc9LjQzYtxX5hPxcoWTpAk-LAn~53lnB3JxmpL4GGBfrfxMaJEVifrblgnLcvxX2u94AJ1Ge6hDKBme0r0pEtEKGwRGkZN-4fM1GMI2fnwnfpkG7zh4FeAi3pPQqtJmDoqoAvbo3OfD4abbTm2eFk4KkL0AAnTplssi5q6yhISgAC93HPMIDvjYZfESrMLNEFnLZBzcwXR6ViVPmG0tG6YfwhCZwAW0n92rFCs8iZDJNaZ4uCMIpl2BFbZjMEFPtZX1DD9jNuF5ZFW8wvb5ffm0Qhq0NKbPki4pyuIciYT--wBTLe8jR8nCONcyq3ht9JEKvnkQViezul89Hkhhh6A__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-000474374193-745f2w-t500x500.jpg',
        },
        {
            name: 'Love Me Like You Do',
            singer: 'Ellie Goulding (cover)',
            url : 'https://cf-media.sndcdn.com/gcMHTCs2Gryq.128.?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vZ2NNSFRDczJHcnlxLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxNTA0MTM5fX19XX0_&Signature=SjaHJrkastnQif7lcbPdMt2THd4rTAFda8ILmDDgaC8iwQucDTF14nQprDMkzdtYcgLCdwJMN2pIouXFDyHE6GTBQFygDQA~Ism7yAHzh4kdHDTP8tLwUjZrSRIikIGDRjkrldv3Cv8e2ig~~Sbym6-ww1hiWzIlWFqCFaMAQKhtlAuRzKzH5vVMLrMgy6mUzird6jtLQhvK9QoM8RDHYE0lwJ8oqd65tyLOssGWgKMOryMK4b8nwitfttdDsmxr5qXrISUsyFV-yeRiyDSIggIon6iW7c9wx5IZ9lTxzrE9EN1eyN2QqNjAL8xef9tXbLzBEv7XKc6Xt86AUnYeGA__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-000106288137-p8gm48-t500x500.jpg'
        },
        {
            name: 'Shape Of You',
            singer: 'Ed Sheeran',
            url: 'https://cf-media.sndcdn.com/afL96KeQO4Du.128.?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vYWZMOTZLZVFPNER1LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxNTA0MTgzfX19XX0_&Signature=AEMJGRFq3lcJoGltR7Va3BtqgPDXzEbyp6CBw3oG8ROsCOoDntWIuxvaNVMG8kBgSrOlIWDSDsFXv~NaK92BBeu-A9sfhJBnm0rw-zOOsr6QHz1KqFN~JhRJPOwjg3SXkyoWZ65a8TZqNh96u4JqsSc9--Pf-894aC0BpkSKKjJe9vrq0bkHFPC2iQwSxHZju8grRpbfV0K5QzgTH0OujQ8UPPDlKXIoJJx-S4J2klYlH4tZ8K~L1a6o88r5trmsvcQcLjE0jU6w-abVSmpj0LT8B8JrumMqi5WY03Pv7g38LetwSVgwy1bDzB31zvFCO-beKh1EGiBEWwC0wmjtfw__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image: 'https://i1.sndcdn.com/artworks-000216517058-54f04s-t500x500.jpg'
        },
        {
            name: 'Sugar',
            singer: 'Maroon 5',
            url: 'https://cf-media.sndcdn.com/6A9S74UMVeOw.128.?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vNkE5Uzc0VU1WZU93LjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxNTA0NDE5fX19XX0_&Signature=fPWXijCJTwvEKcNTx8Vl7P6Nc6PP55tLvSKbYOSA0IPMZyUININ5yRZX0H8idEuGOokjKPeOXQq1gXaIVGQf5ApQwai0O3HkNO0~zTzlDTnmcbrgLGnux1nAoKoYAEacmsbUerDXDP~ztvwlHFXC3xLLNt0kzs4BxtYrxTVucpn94AxW9gGHFYeKQ9U3B2CdrCEucqKy---hor6n7rDANdvTxOeHevXWW7AOYtUmwW-3BUh8EWARQxyrXBOJ-J~eDWZV-8ZsGrVN49sGZQP5m-9YKGDmeEx20Wb0s1S1o~BCXni2c6lYkQLX93BBIaFuWzUDTwHQaY7Zbh-S7kwjbQ__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
            image : 'https://i1.sndcdn.com/artworks-000104792214-yqs9wl-t500x500.jpg'
        },
        {
            name: 'Memories',
            singer: "Maroon 5",
            url: 'https://cf-media.sndcdn.com/7x8N7TksL7ub.128.?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vN3g4TjdUa3NMN3ViLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjYxNTA0MTQ4fX19XX0_&Signature=GJNDSCb4LjypSfAC2hh7wmlpNxKuXex9BfLbRwJUhakYGv7aOpXnx8h42yVkt~Xd~22LmY6B~ounCYh0DmPMWFIWAsorUG1aVrPdPM6Bem5qk45gPQ4mVLmEdanxoWPQvqF2SABhd1w58y6lE8E3VjEdhE~9hr965YnyU441vLgjOLtffP~8OQuCY1ZGjBmVygz7-fwoKKDlcrMDEcmwPlVe2T4cYQHN8hiPRmVdb9q6yOBfQfU5bkG-NotfGH7DOphg-ZNePJI~WB-DbYxHdxyue4eadBbX19cng1xionDnilfKmmeURw~dMr5siMluG-fTybgaA~0zh1iHbz7nmw__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ',
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