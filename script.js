class Piano {
  static WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
  static BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];

  static checkFilterKeys = (keys, filterClass) =>
    Array.from(keys).filter(key => key.classList.contains(filterClass));

  constructor(keys = []) {
    this.keys = keys;
    this.whiteKeys = Piano.checkFilterKeys(keys, 'white');
    this.blackKeys = Piano.checkFilterKeys(keys, 'black');

    this.setEventListenerOnKeys();
    this.setEventKeyDown();
  }

  playNote(key) {
    const noteAudio = document.getElementById(key.dataset.note);
  
    if (noteAudio) {
      noteAudio.currentTime = 0;
      noteAudio.play();
      key.classList.add('active');
      noteAudio.addEventListener('ended', () => {
        key.classList.remove('active');
      });

      return;
    }
    
    console.error('Cannot find audio with key:', key.dataset.note);
  }

  setEventListenerOnKeys() {
    this.keys.forEach(key => {
      key.addEventListener('click', () => this.playNote(key))
    });
  }

  setEventKeyDown() {
    document.addEventListener('keydown', e => {
      if (e.repeat) return;

      const key = e.key
      const whiteKeyIndex = Piano.WHITE_KEYS.indexOf(key)
      const blackKeyIndex = Piano.BLACK_KEYS.indexOf(key)
    
      if (whiteKeyIndex > -1) this.playNote(whiteKeys[whiteKeyIndex])
      if (blackKeyIndex > -1) this.playNote(blackKeys[blackKeyIndex])
    })
  }
}
