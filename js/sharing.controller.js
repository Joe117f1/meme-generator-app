'use strict';

const downloadImg = (meme) => {
    const imgContent = gCanvas.toDataURL('image/jpeg');
    meme.href = imgContent;
};

// onsubmit call this function
const uploadImg = (formElement, ev) => {
    ev.preventDefault();
    const imgData = gCanvas.toDataURL("image/jpeg");
    document.getElementById('imgData').value = imgData;

    // A function to be called if POST request succeeds
    const onSuccess = (uploadedImgUrl) => {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        document.querySelector('.share-container').innerHTML = `
        <a class="btn fab fa-facebook-square" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">   
        </a>`
    };
    const inputVal = formElement.querySelector('input').value;
    doUploadImg(formElement, onSuccess, inputVal);
};

const doUploadImg = (formElement, onSuccess) => {
    const formData = new FormData(formElement);
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then((res) => {
            return res.text();
        })
        .then(onSuccess)
        .catch((err) => {
            console.log(err.message);
        });
};
