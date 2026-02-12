// Global variables
let photosList = [];
let captionsList = [];

// DOM elements
const memoryForm = document.getElementById('memoryForm');
const photoInput = document.getElementById('photo');
const previewContainer = document.getElementById('previewContainer');
const previewBtn = document.getElementById('previewBtn');
const generatePDFBtn = document.getElementById('generatePDF');

// Handle photo selection
photoInput.addEventListener('change', (e) => {
    photosList = Array.from(e.target.files);
    captionsList = new Array(photosList.length).fill('');
    renderPreview();
});

// Render preview images and captions
function renderPreview() {
    previewContainer.innerHTML = ''; // Clear previous content

    photosList.forEach((photo, index) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('photo-wrapper');

        const img = document.createElement('img');
        img.src = URL.createObjectURL(photo);
        img.alt = `Photo ${index + 1}`;
        img.classList.add('preview-image');

        const captionInput = document.createElement('input');
        captionInput.type = 'text';
        captionInput.placeholder = 'Enter caption for this photo';
        captionInput.classList.add('caption-input');
        captionInput.addEventListener('input', (e) => {
            captionsList[index] = e.target.value;
        });

        wrapper.appendChild(img);
        wrapper.appendChild(captionInput);
        previewContainer.appendChild(wrapper);
    });
}

// Preview button click
previewBtn.addEventListener('click',  () => {
    if (!photosList.length) {
        alert("Please upload at least one photo to preview.");
        return;
    }
    renderPreview();
    previewContainer.scrollIntoView({ behavior: 'smooth' });
});

generatePDFBtn.addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const albumTitle = document.getElementById('albumTitle').value;
    const yourName = document.getElementById('name').value;
    const partnerName = document.getElementById('partnerName').value;
    
    // Cover Page with decorative elements
    // Background gradient effect with rectangles
    doc.setFillColor(255, 240, 245);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Decorative header bar
    doc.setFillColor(220, 20, 60);
    doc.rect(0, 0, pageWidth, 120, 'F');
    
    // Heart decorations on cover
    doc.setFillColor(255, 105, 180);
    doc.circle(80, 60, 15, 'F');
    doc.circle(pageWidth - 80, 60, 15, 'F');
    
    // Title with shadow effect
    doc.setFontSize(32);
    doc.setTextColor(100, 100, 100);
    doc.text(albumTitle, pageWidth / 2, 252, { align: 'center' });
    doc.setTextColor(220, 20, 60);
    doc.text(albumTitle, pageWidth / 2, 250, { align: 'center' });
    
    // Decorative line
    doc.setDrawColor(220, 20, 60);
    doc.setLineWidth(2);
    doc.line(pageWidth / 2 - 150, 280, pageWidth / 2 + 150, 280);
    
    // From/To section with box
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(pageWidth / 2 - 180, 320, 360, 120, 10, 10, 'F');
    doc.setDrawColor(220, 20, 60);
    doc.setLineWidth(1);
    doc.roundedRect(pageWidth / 2 - 180, 320, 360, 120, 10, 10, 'S');
    
    doc.setFontSize(20);
    doc.setTextColor(60, 60, 60);
    doc.text(`From: ${yourName}`, pageWidth / 2, 370, { align: 'center' });
    doc.text(`To: ${partnerName}`, pageWidth / 2, 410, { align: 'center' });
    
    // Footer hearts
    doc.setFillColor(255, 182, 193);
    doc.circle(pageWidth / 2 - 30, pageHeight - 50, 8, 'F');
    doc.setFillColor(220, 20, 60);
    doc.circle(pageWidth / 2, pageHeight - 50, 8, 'F');
    doc.setFillColor(255, 182, 193);
    doc.circle(pageWidth / 2 + 30, pageHeight - 50, 8, 'F');
    
    // Photo pages with enhanced layout
    for (let i = 0; i < photosList.length; i++) {
        if (i > 0 || photosList.length > 1) doc.addPage();
        
        // Page background
        doc.setFillColor(255, 250, 250);
        doc.rect(0, 0, pageWidth, pageHeight, 'F');
        
        // Decorative top border
        doc.setFillColor(220, 20, 60);
        doc.rect(0, 0, pageWidth, 8, 'F');
        
        // Photo frame with shadow
        const imgX = 56;
        const imgY = 80;
        const imgWidth = 480;
        const imgHeight = 360;
        
        // Shadow
        doc.setFillColor(200, 200, 200);
        doc.roundedRect(imgX + 4, imgY + 4, imgWidth, imgHeight, 5, 5, 'F');
        
        // White frame
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(imgX - 8, imgY - 8, imgWidth + 16, imgHeight + 16, 5, 5, 'F');
        
        const img = photosList[i];
        const imgData = await toDataURL(img);
        doc.addImage(imgData, 'JPEG', imgX, imgY, imgWidth, imgHeight);
        
        // Frame border
        doc.setDrawColor(220, 20, 60);
        doc.setLineWidth(2);
        doc.roundedRect(imgX - 8, imgY - 8, imgWidth + 16, imgHeight + 16, 5, 5, 'S');
        
        // Caption box
        const captionY = imgY + imgHeight + 40;
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(40, captionY, pageWidth - 80, 80, 8, 8, 'F');
        doc.setDrawColor(255, 182, 193);
        doc.setLineWidth(1);
        doc.roundedRect(40, captionY, pageWidth - 80, 80, 8, 8, 'S');
        
        // Caption text
        doc.setFontSize(16);
        doc.setTextColor(60, 60, 60);
        const caption = captionsList[i] || '';
        const splitCaption = doc.splitTextToSize(caption, pageWidth - 120);
        doc.text(splitCaption, pageWidth / 2, captionY + 30, { align: 'center', maxWidth: pageWidth - 120 });
        
        // Page number
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(`${i + 1}`, pageWidth / 2, pageHeight - 30, { align: 'center' });
        
        // Small heart decoration
        doc.setFillColor(255, 182, 193);
        doc.circle(pageWidth / 2, pageHeight - 45, 4, 'F');
    }
    
    doc.save('Valentine_Memory_Book.pdf');
});

// Helper: Convert File to Data URL
function toDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
    });
}