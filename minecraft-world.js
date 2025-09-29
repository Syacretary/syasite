document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.querySelector('.download-button');
    const fileNameSpan = document.getElementById('file-name');
    const fileSizeSpan = document.getElementById('file-size');
    const fileFormatSpan = document.getElementById('file-format');

    if (downloadButton) {
        const filePath = downloadButton.getAttribute('href');
        
        // Extract file name
        const fileName = filePath.split('/').pop();
        fileNameSpan.textContent = fileName;

        // Extract file format
        const fileFormat = fileName.split('.').pop();
        fileFormatSpan.textContent = `.${fileFormat}`;

        // Fetch file metadata to get size
        fetch(filePath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    const fileSize = response.headers.get('Content-Length');
                    if (fileSize) {
                        fileSizeSpan.textContent = formatBytes(parseInt(fileSize));
                    } else {
                        fileSizeSpan.textContent = 'Unknown';
                    }
                } else {
                    fileSizeSpan.textContent = 'N/A';
                }
            })
            .catch(error => {
                console.error('Error fetching file metadata:', error);
                fileSizeSpan.textContent = 'Error';
            });
    }
});

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
