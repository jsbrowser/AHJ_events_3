const inputFieldUrl = document.querySelector('[data-input=urlInput]');
const submitBtn = document.querySelector('[type=submit]');
const images = document.querySelector('[data-holder=images]');
let idCount = 0;

function addImg() {
  let errCount = 0;
  const imgEl = document.createElement('div');
  imgEl.className = 'image';
  imgEl.id = idCount;

  const img = document.createElement('img');
  img.src = inputFieldUrl.value;
  img.alt = document.getElementById('txtInput').value;

  img.onload = () => {
    inputFieldUrl.value = '';
    document.getElementById('txtInput').value = '';
    imgEl.innerHTML = '<div data-btn="delete" class="delBtn">✗</div>';

    idCount += 1;

    images.appendChild(imgEl);
    imgEl.appendChild(img);

    if (images.querySelector('[data-err=err]').length !== 0) {
      images.querySelector('[data-err=err]').style.display = 'none';
      errCount = 0;
    }
  };

  img.onerror = () => {
    if (errCount === 0) {
      images.querySelector('[data-err=err]').style.display = 'block';
      errCount += 1;
    }
  };

  images.querySelector('[data-err=err]').addEventListener('click', () => {
    images.querySelector('[data-err=err]').style.display = 'none';
  });
}

inputFieldUrl.addEventListener('keypress', (e) => {
  const key = e.which || e.keyCode;
  if (key === 13) {
    e.preventDefault();
    addImg();
  }
});

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  addImg();
});

images.addEventListener('click', (event) => {
  if (event.target.className === 'delBtn') {
    const img = document.getElementById(event.target.parentElement.id);
    img.parentNode.removeChild(img);
  }
});
