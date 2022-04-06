

export const requestDownloadURL = async (url) => {
    try {
        console.log('MAKING HTTP REQUEST TO', url)
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
        var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

    } catch (error) {
        console.log('cant request file url')
    }
}