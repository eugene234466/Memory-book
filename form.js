let photosList = [];
let captionsList = [];

const photoInput = document.getElementById('photo');
const previewContainer = document.getElementById('previewContainer');
const previewBtn = document.getElementById('previewBtn');
const generatePDFBtn = document.getElementById('generatePDF');

photoInput.addEventListener('change', (e) => {
    photosList = Array.from(e.target.files);
    captionsList = new Array(photosList.length).fill('');
    renderPreview();
});

function renderPreview() {
    previewContainer.innerHTML = '';
    photosList.forEach((photo, index) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('photo-wrapper');

        const img = document.createElement('img');
        img.src = URL.createObjectURL(photo);
        img.classList.add('preview-image');

        const caption = document.createElement('textarea');
        caption.classList.add('caption-input');
        caption.placeholder = 'Write your memory caption (emojis supported! 💕✨)...';
        caption.value = captionsList[index];
        caption.addEventListener('input', (e) => {
            captionsList[index] = e.target.value;
        });

        wrapper.appendChild(img);
        wrapper.appendChild(caption);
        previewContainer.appendChild(wrapper);
    });
}

previewBtn.addEventListener('click', () => {
    if (!photosList.length) {
        alert("Please upload at least one photo to preview.");
        return;
    }
    renderPreview();
    previewContainer.scrollIntoView({ behavior: 'smooth' });
});

// Helper: Render text/emojis to a Canvas to maintain quality in PDF
async function renderTextWithEmojis(text, fontSize, maxWidth) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const scale = 2; // High resolution
    
    ctx.font = `${fontSize * scale}px Arial, "Segoe UI Emoji", sans-serif`;
    
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0] || '';
    
    for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        if (ctx.measureText(testLine).width > maxWidth * scale) {
            lines.push(currentLine);
            currentLine = words[i];
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);
    
    const lineHeight = fontSize * 1.5;
    canvas.width = (maxWidth + 40) * scale;
    canvas.height = (lines.length * lineHeight + 20) * scale;
    
    ctx.scale(scale, scale);
    ctx.font = `${fontSize}px Arial, "Segoe UI Emoji", sans-serif`;
    ctx.fillStyle = '#3c3c3c';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / (2 * scale), index * lineHeight + 10);
    });
    
    return canvas.toDataURL('image/png');
}

// Helper: Get image dimensions asynchronously
function getImageDimensions(file) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.src = URL.createObjectURL(file);
    });
}

generatePDFBtn.addEventListener('click', async () => {
    if (!photosList.length) {
        alert("Please upload at least one photo.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const isMobile = window.innerWidth <= 768;
    const margin = isMobile ? 30 : 40;

    // --- COVER PAGE (Simplified for logic maintenance) ---
    doc.setFillColor(255, 240, 245);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    doc.setFillColor(220, 20, 60);
    doc.rect(0, 0, pageWidth, 120, 'F');
    
    const title = document.getElementById('albumTitle')?.value || 'Our Memory Book';
    const titleImg = await renderTextWithEmojis(title, 32, pageWidth - 80);
    doc.addImage(titleImg, 'PNG', 40, 160, pageWidth - 80, 60);

    // --- PHOTO PAGES ---
    for (let i = 0; i < photosList.length; i++) {
        doc.addPage();
        doc.setFillColor(255, 252, 252);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');

        const imgData = await toDataURL(photosList[i]);
        const dims = await getImageDimensions(photosList[i]);
        
        // LOGIC FIX: Dynamic Aspect Ratio
        const aspectRatio = dims.width / dims.height;
        const frameWidth = pageWidth - (margin * 2);
        const availableHeight = pageHeight - (isMobile ? 250 : 300); // Leave room for caption
        
        let drawWidth = frameWidth;
        let drawHeight = frameWidth / aspectRatio;

        // Ensure photo doesn't overflow vertically
        if (drawHeight > availableHeight) {
            drawHeight = availableHeight;
            drawWidth = drawHeight * aspectRatio;
        }

        const xPos = (pageWidth - drawWidth) / 2;
        const yPos = 60;

        // White Photo Frame/Border
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(xPos - 10, yPos - 10, drawWidth + 20, drawHeight + 20, 5, 5, 'F');
        doc.setDrawColor(220, 20, 60);
        doc.setLineWidth(1.5);
        doc.roundedRect(xPos - 10, yPos - 10, drawWidth + 20, drawHeight + 20, 5, 5, 'S');

        // Add Image (No more stretching!)
        doc.addImage(imgData, 'JPEG', xPos, yPos, drawWidth, drawHeight);

        // Caption Logic
        const caption = captionsList[i] || '';
        if (caption) {
            const captionBoxY = yPos + drawHeight + 30;
            const captionImg = await renderTextWithEmojis(caption, 16, frameWidth - 40);
            doc.addImage(captionImg, 'PNG', margin, captionBoxY, frameWidth, 80);
        }

        // Page Number
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(`${i + 1}`, pageWidth / 2, pageHeight - 30, { align: 'center' });
    }

    doc.save('Our_Memory_Book.pdf');
});

function toDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = err => reject(err);
        reader.readAsDataURL(file);
    });
}
