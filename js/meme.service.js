'use strict';

const KEY = 'memes';
let gMemes = [];
let gCurrMeme;
let gPopularKeywords = [];
let gKeyWords = ['funny', 'cat', 'baby', 'serious', 'awkward'];

const gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['funny', 'serious', 'trump', 'president', 'politics'] },
  { id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog', 'animal', 'puppy'] },
  { id: 3, url: 'img/3.jpg', keywords: ['cute', 'baby', 'animal', 'puppy'] },
  { id: 4, url: 'img/4.jpg', keywords: ['cat', 'cute', 'animal'] },
  { id: 5, url: 'img/5.jpg', keywords: ['funny', 'baby', 'success'] },
  { id: 6, url: 'img/6.jpg', keywords: ['funny', 'awkward', 'crazy'] },
  { id: 7, url: 'img/7.jpg', keywords: ['funny', 'baby', 'cute', 'told you'] },
  { id: 8, url: 'img/8.jpg', keywords: ['funny', 'told you', 'awkward', 'serious'] },
  { id: 9, url: 'img/9.jpg', keywords: ['funny', 'baby'] },
  { id: 10, url: 'img/10.jpg', keywords: ['funny', 'obama', 'president', 'politics'] },
  { id: 11, url: 'img/11.jpg', keywords: ['funny'] },
  { id: 12, url: 'img/12.jpg', keywords: ['funny'] },
  { id: 13, url: 'img/13.jpg', keywords: ['cheers', 'leonardo'] },
  { id: 14, url: 'img/14.jpg', keywords: ['serious', 'matrix', 'morpheus', 'told you'] },
  { id: 15, url: 'img/15.jpg', keywords: ['serious', 'lotr', 'ring', 'mordor'] },
  { id: 16, url: 'img/16.jpg', keywords: ['funny', 'startrek'] },
  { id: 17, url: 'img/17.jpg', keywords: ['serious', 'putin', 'politics', 'president'] },
  { id: 18, url: 'img/18.jpg', keywords: ['funny', 'toy', 'buzz'] },
  { id: 19, url: 'img/19.jpg', keywords: ['funny', 'serious', 'told you', 'why'] },
  { id: 20, url: 'img/20.jpg', keywords: ['duck', 'animal', 'cartoon'] },
  { id: 21, url: 'img/21.jpg', keywords: ['funny', 'serious', 'told you', 'why'] },
  { id: 22, url: 'img/22.jpg', keywords: ['funny', 'weird', 'cat', 'animal'] },
  { id: 23, url: 'img/23.jpg', keywords: ['funny', 'serious', 'raptor', 'dinosaur', 'animal'] },
  { id: 24, url: 'img/24.jpg', keywords: ['funny', 'awkward', 'penguin', 'animal'] },
  { id: 25, url: 'img/25.png', keywords: ['serious', 'obama', 'impress', 'politics'] },
  { id: 26, url: 'img/26.png', keywords: ['funny', 'leonardo'] },
  { id: 27, url: 'img/27.jpg', keywords: ['funny', 'awkward', 'serious'] },
  { id: 28, url: 'img/28.jpg', keywords: ['awkward', 'animal', 'alone'] },
  { id: 29, url: 'img/29.jpg', keywords: ['funny', 'alone', 'forever', 'sad'] },
  { id: 30, url: 'img/30.jpg', keywords: ['old', 'funny', 'serious', 'told you', 'why'] },
  { id: 31, url: 'img/31.jpg', keywords: ['funny', 'awkward', 'serious', 'told you',] },
  { id: 32, url: 'img/32.png', keywords: ['funny', 'awkward'] },
  { id: 33, url: 'img/33.jpg', keywords: ['funny', 'awkward', 'penguin', 'animal'] },
  { id: 34, url: 'img/34.jpg', keywords: ['funny', 'awkward', 'penguin', 'animal'] },
  { id: 35, url: 'img/35.png', keywords: ['funny', 'drugs', 'elmo', 'muppets', 'red'] },
  { id: 36, url: 'img/36.jpg', keywords: ['funny', 'cool', 'drugs', 'told you', 'why'] },
  { id: 37, url: 'img/37.jpg', keywords: ['funny', 'serious', 'please'] },
  { id: 38, url: 'img/38.png', keywords: ['sad', 'cat', 'animal', 'alone', 'cartoon', 'tom'] },
  { id: 39, url: 'img/39.jpg', keywords: ['alone', 'awkward', 'forget'] },
];

const gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'line1',
      size: 50,
      font: 'Impact',
      align: 'center',
      fill: 'white',
      stroke: 'black',
      posX: 250,
      posY: 100,
      isFocused: true
    },
    {
      txt: 'line2',
      size: 50,
      font: 'Impact',
      align: 'center',
      fill: 'white',
      stroke: 'black',
      posX: 250,
      posY: 400,
      isFocused: false
    }
  ]
};

const getImgs = () => gImgs;

const getMemes = () => gMemes;

const getMeme = () => gMeme;

const updateSelectedImg = imgId => {
  gMeme.selectedImgId = imgId;
  gCurrImgId = imgId;
};

const getPopularKeywords = () => gPopularKeywords;

const getgKeyWords = () => gKeyWords;

const saveMeme = (meme) => {
  getMemes().push(meme);
  saveToStorage(KEY, getMemes());
};

const editMemeContent = (key, val) => {
  const line = gMeme.lines[gMeme.selectedLineIdx];
  switch (key) {
    case 'txt':
      line.txt = val;
      break;
    case 'size':
      line.size += val;
      break;
    case 'lineX':
      line.posX += val;
      break;
    case 'lineY':
      line.posY += val;
      break;
    case 'fill':
      line.fill = val;
      break;
    case 'stroke':
      line.stroke = val;
      break;
    case 'font':
      line.font = val;
      break;
    case 'align':
      line.align = val;
      break;
  }
  gCurrMeme = gMeme;
};

const changeCurrLineIdx = () => {
  gMeme.lines[gMeme.selectedLineIdx].isFocused = false;
  gMeme.selectedLineIdx++;
  if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
    gMeme.selectedLineIdx = 0;
  }
  gMeme.lines[gMeme.selectedLineIdx].isFocused = true;

};

const addLine = () => {
  const line = {
    txt: 'line',
    size: 50,
    font: 'Impact',
    align: 'center',
    fill: 'white',
    stroke: 'black',
    posX: 250,
    posY: 250,
    isFocused: false
  }
  gMeme.lines.push(line);
};

const removeLine = () => {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
};

const loadMemesFromStorage = () => {
  const savedMemes = loadFromStorage(KEY);
  savedMemes.map((meme) => {
    const imgSrc = meme.canvas;
    meme.href = imgSrc;
    meme.onload = () => {
      resizeCanvas(meme.width, meme.height);
      gCtx.drawImage(meme, 0, 0, gCanvas.width, gCanvas.height);
    }
  });
  return savedMemes;
};

const searchImage = keyword => {
  const res = gImgs.filter(img => {
    return img.keywords.includes(keyword);
  });
  return res;
};

const getSavedMemes = () => {
  try {
    const loadedMemes = loadMemesFromStorage();
    if (!loadedMemes || loadedMemes.length === 0) {
      return;
    }
    return loadedMemes;
  } catch (error) {
    console.log('something went wrong');
  }
};

const getAboutDescription = () => {
  const aboutMemer = `Hi, wellcome to memer! <br> Play with my app to create some funny memes <br> while I continue updating memer and release new features. <br> have fun!`;
  return aboutMemer;
};
