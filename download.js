// Get the url and launch download
function downloadVSIX() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    if (url.includes('marketplace.visualstudio.com/items?itemName=')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const publisher = urlParams.get('itemName').split('.')[0];
      const extName = urlParams.get('itemName').split('.')[1];
      const version = urlParams.get('itemName').split('@')[1];
      
      // Build the Url for the API
      const apiURL = `https://ms-vscode.gallery.vsassets.io/_apis/public/gallery/publisher/${publisher}/extension/${extName}/${version}latest/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage`;

      
      fetch(apiURL)
        .then(response => response.blob())
        .then(blob => {
          // Create the URL
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `${extName}.vsix`;
          link.click();
          alert('Download done !');
        })
        .catch(error => {
          console.error('Error :', error);
          alert('An error apear.');
        });
    } else {
      alert('It seems you\'re  not on webpage for vscode extensions.');
    }
  });
}

// Target dl btn  onlick event
document.getElementById('downloadBtn').addEventListener('click', downloadVSIX);
