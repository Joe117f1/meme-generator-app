'use strict';

let gCanvas;
let gCtx;
let gFontSize = 80;
let gIsBottomLine = false;
let gCurrImgId;
let gIsSearch = false;
let gKeyword;
let gIsBurgerMenu;

const burgerMenu = document.querySelector('.btn-menu-burger');
const searchInput = document.querySelector('.search');
const getEditorElement = () => document.querySelector('.meme-editor');
const getControlPanelElement = () => document.querySelector('.control-panel');
const getCanvasContainerElement = () => document.querySelector('.canvas-container');
const getGalleryGridElement = () => document.querySelector('.gallery-grid');
const getMemeGridElement = () => document.querySelector('.meme-grid');
const hideElement = elemnt => { elemnt.classList.add('hidden') };
const hideElements = elemets => { elemets.forEach(elemnt => hideElement(elemnt)) };
const showElement = elemnt => { elemnt.classList.remove('hidden') };
const showElements = elemets => { elemets.forEach(elemnt => showElement(elemnt)) };
const getImgElement = num => { document.querySelector(`.meme-image:nth-child(${num + 1})`); }

const onInit = () => {
  setCanvas();
  renderGallery();
  setDefaultFontColor();
  onAbout();
  removeScreenCover();
  closeWellcomeModal();
  burgerMenu.classList.remove('.active');
};

const setMenuType = () => {
  gIsBurgerMenu = burgerMenu.classList.contains('active');
};

const setCanvas = () => {
  gCanvas = document.querySelector('.meme-canvas');
  gCtx = gCanvas.getContext('2d');
};

/****************************** RENDERING & FUNCTIONALITY ***********************
 */

const renderGallery = () => {
  const galleryElement = getGalleryGridElement();
  let strHTML = ``;
  const imgs = !gIsSearch ? getImgs() : searchImage(gKeyword);
  for (let i = 0; i < imgs.length; i++) {
    strHTML += `<img class="img gallery-image" src="${imgs[i].url}" onclick="onRenderCanvas(${imgs[i].id})">`
  }
  galleryElement.innerHTML = strHTML;
};

const renderMemes = loadedMemes => {
  const memeElement = getMemeGridElement();
  let strHTML = ``;
  console.log(loadedMemes)
  for (let i = 0; i < loadedMemes.length; i++) {
    console.log(loadedMemes[i])
    strHTML += `<img class="img gallery-image" onclick="onSetMeme(${i})" src="${(loadedMemes[i].href)}"/>`
  }
  memeElement.innerHTML = strHTML;
};

const closeWellcomeModal = () => {
  setTimeout(() => { onCloseAboutModal() }, 6000);
};

const onHideWellcome = () => {
  hideElement(document.querySelector('.wellcome-screen'));
};

const onToggleMenu = () => {
  document.body.classList.toggle('menu-open');
};

const removeScreenCover = () => {
  const screenElement = document.querySelector('.screen-cover');
  screenElement.classList.remove('.screen-cover');
};

const hideControlPanel = () => {
  hideElements([
    getEditorElement(),
    getControlPanelElement(),
    getCanvasContainerElement()
  ]
  );
};

const showControlPanel = () => {
  showElements([
    getEditorElement(),
    getControlPanelElement(),
    getCanvasContainerElement()
  ]
  );
};

const hideGalleries = () => {
  hideElements([
    getGalleryGridElement(),
    getMemeGridElement()
  ]
  );
};

const showGallery = () => {
  showElement(getGalleryGridElement());
  removeScreenCover();
};

const showMemesGallery = () => {
  showElement(getMemeGridElement());
  removeScreenCover();
};

const onSetMeme = idx => {
  hideGalleries();
  showControlPanel();
  const img = document.querySelector(`.meme-grid img:nth-child(${idx + 1})`);
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

const onRenderCanvas = (imgId = gCurrImgId) => {
  gCurrImgId = imgId;
  hideGalleries();
  updateSelectedImg(imgId);
  showControlPanel();
  renderMemeCanvas();
};

const renderMemeCanvas = () => {
  const meme = getMeme();
  const img = new Image();
  img.src = `img/${meme.selectedImgId}.jpg`;
  img.onload = () => {
    resizeCanvas(img.width, img.height)
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText();
  }
};

const resizeCanvas = (width, height) => {
  gCanvas.width = width;
  gCanvas.height = height;
};

const drawText = () => {
  const lines = getMeme().lines;
  lines.forEach(line => {
    gCtx.txt = line.txt;
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.stroke;
    gCtx.fillStyle = line.fill;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
    gCtx.posY = line.posY;
    gCtx.posX = line.posX;
    gCtx.strokeStyle = line.isFocused ? 'red' : line.strokeStyle;
    gCtx.fillText(line.txt, line.posX, line.posY);
    gCtx.strokeText(line.txt, line.posX, line.posY);
  });
};

const setDefaultFontColor = () => {
  const gradient = gCtx.createLinearGradient(0, 0, gCanvas.width, 0);
  gradient.addColorStop("0", " magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  gCtx.fillStyle;
  gCtx.fillStyle = gradient;
};

/****************************** NAV-BAR BUTTONS *********************************
 */

const onBurgerBtnHandler = () => {
  burgerMenu.classList.add('.active');
  setMenuType();
  onToggleMenu();
};

const onSearchImage = () => {
  gIsSearch = true;
  const searchInputEl = document.querySelector('input[name=search]');
  const keyword = searchInputEl.value;
  gKeyword = keyword.toLowerCase();
  commonSearcedKeywords(keyword);
  renderGallery();
  searchInputEl.value = '';
};

searchInput.addEventListener('keyup', (ev) => {
  if (ev.keyCode === 13) {
    ev.preventDefault();
    onSearchImage();
  }
});

const onDisplayImageGalery = () => {
  if (gIsBurgerMenu) {
    onToggleMenu();
  }
  gIsSearch = false;
  hideControlPanel();
  hideGalleries();
  showGallery();
  renderGallery();
  removeScreenCover();
};

const onLoadMemes = () => {
  if (gIsBurgerMenu) {
    onToggleMenu();
  }
  hideControlPanel();
  hideGalleries();
  showMemesGallery();
  removeScreenCover();
  getSavedMemes();
  const loadedMemes = getSavedMemes();
  renderMemes(loadedMemes);
};

const onAbout = () => {
  const aboutModal = document.querySelector('.about-memer-modal');
  aboutModal.style = 'display:block';
  const strHtml = `
        <img class="img-modal" src="img/modal-image.PNG">
        <p class="about-modal-text">${getAboutDescription()}</p>
        <button class="modal-btn control-btn btn" onclick="onCloseAboutModal()">Close</button>
        <i class="modal-logo logo">memer!</i>
        `;
  aboutModal.innerHTML = strHtml;
};

const onCloseAboutModal = () => {
  document.querySelector('.about-memer-modal').style = 'display:none';
};

/****************************** CONTROL PANEL BUTTONS ***********************
 */

const onEditText = txt => {
  editMemeContent('txt', txt);
  onRenderCanvas();
};

const onIncreaseText = num => {
  editMemeContent('size', num);
  onRenderCanvas();
};

const onDecreaseText = num => {
  editMemeContent('size', num);
  onRenderCanvas();
};

const onMoveLineUp = num => {
  editMemeContent('lineY', num);
  onRenderCanvas();
};

const onMoveLineDown = num => {
  editMemeContent('lineY', num);
  onRenderCanvas();
};

const onChangeFill = color => {
  editMemeContent('fill', color);
  onRenderCanvas();
};

const onChangeStroke = color => {
  editMemeContent('stroke', color);
  onRenderCanvas();
};

const onSwitchLine = () => {
  changeCurrLineIdx();
  onRenderCanvas();
};

const onAddLine = () => {
  addLine();
  changeCurrLineIdx();
  onRenderCanvas();
};

const onRemoveLine = () => {
  removeLine();
  onRenderCanvas();
};

const onSaveMeme = () => {
  const memeId = gCurrImgId;
  const memeToSsve = {
    // canvas: JSON.stringify(gCanvas),
    canvas: gCanvas.toDataURL('image/jpeg'),
    id: memeId,
  };
  saveMeme(memeToSsve);
};

const onDownloadMeme = meme => {
  downloadImg(meme);
};

const onGoBack = () => {
  onDisplayImageGalery();
};

const commonSearcedKeywords = query => {

  if (getgKeyWords().includes(query)) {
    const Idx = getgKeyWords().indexOf(query);
    const elKeyword = document.querySelector(`.kwrd-${Idx}`);

    if (getPopularKeywords().includes(query)) {
      elKeyword.style.fontSize = 'x-large';
    } else {
      elKeyword.style.fontSize = 'larger';
      getPopularKeywords().push(query);
    }
  } else {
    getgKeyWords().push(query);
  }
};
