import debounce from './debounce';

const globalKey = 'ff_editor_';
const fileType = '.ffc';

function getRelevantStores() {
  const totalKeys = localStorage.length;
  const returnStores = {};
  let startIdx = 0;
  while (startIdx < totalKeys) {
    const thisKey = localStorage.key(startIdx);
    startIdx += 1;
    if (thisKey.startsWith(globalKey)) {
      const strippedStorageKey = thisKey.split(globalKey)[1];
      returnStores[strippedStorageKey] = localStorage.getItem(thisKey);
    }
  }
  return returnStores;
}
function download(data, filename, type) {
  const file = new Blob([data], { type });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    // Others
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
function downloadWork() {
  const currentStores = getRelevantStores();
  /* eslint-disable-next-line */
  const fileName = prompt('Please provide a file name');
  if (!fileName) return;
  download(JSON.stringify(currentStores), `${fileName}${fileType}`, fileType);
}

function uploadWork() {
  const uploadPromise = new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.style.visibility = 'hidden';
    input.type = 'file';
    input.accept = fileType;
    input.onchange = function processFile() {
      const file = this.files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContents = event.target.result;
        resolve(JSON.parse(fileContents));
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsText(file);
      document.body.removeChild(input);
    };
    document.body.append(input);
    input.click();
  });
  return uploadPromise;
}

function privateStoreData(key, data) {
  localStorage.setItem(globalKey + key, JSON.stringify(data));
}

const storeData = debounce(privateStoreData, 500);
const loadData = privateStoreData;

function getData(key) {
  return JSON.parse(localStorage.getItem(globalKey + key));
}

function clearData() {
  localStorage.clear();
}

export default {
  storeData,
  loadData,
  getData,
  clearData,
  downloadWork,
  uploadWork,
};
