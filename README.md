# 💝 HeartFolio - Valentine Memory Book Creator

A beautiful web application to create personalized PDF memory books for your loved ones. Perfect for Valentine's Day, anniversaries, or any special occasion!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)

## ✨ Features

- **Beautiful Landing Page**: Animated floating hearts with glassmorphism design
- **Easy Photo Upload**: Upload multiple photos with preview functionality
- **Custom Captions**: Add personalized captions to each memory
- **Real-time Preview**: See your photos and captions before generating the PDF
- **Professional PDF Generation**: Create beautifully designed PDF memory books with:
  - Decorative cover page with custom title
  - Photo frames with shadows and borders
  - Styled caption boxes with automatic text wrapping
  - Page numbers with heart decorations
  - Valentine's themed color scheme
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **No Backend Required**: Fully client-side application using jsPDF

## 🎨 Design Highlights

### Landing Page
- Animated floating hearts background
- Glassmorphism card design with backdrop blur
- Smooth gradient background (#ff9a8e to #fad0c4)
- Responsive layout for all devices

### Memory Book Creator
- Clean, modern form interface
- Real-time photo preview with thumbnails
- Individual caption inputs for each photo
- Professional PDF output with:
  - Decorative cover page with custom title and names
  - Photo frames with shadows and borders
  - Styled caption boxes with text wrapping
  - Page numbers and heart decorations
  - Consistent Valentine's color scheme

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for jsPDF CDN and Google Fonts)
- No installation or server required!

### Usage

1. Clone this repository:
```bash
git clone https://github.com/eugene234466/heartfolio.git
```

2. Open `index.html` in your web browser

3. Click "Start Creating" to navigate to the form page

4. Fill in the details:
   - Your name
   - Partner's name
   - Album title

5. Upload photos (multiple selection supported)

6. Click "Preview Album" to see your photos

7. Add captions to each photo in the preview section

8. Click "Generate PDF" to download your Valentine Memory Book

## 📁 Project Structure

```
heartfolio/
├── index.html          # Landing page with animated hearts
├── styles.css          # Landing page styling
├── form.html           # Memory book creation form
├── form.css            # Form page styling
├── form.js             # PDF generation logic
├── love.png            # Favicon
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Structure and layout
- **CSS3**: Styling with glassmorphism effects and animations
- **JavaScript (ES6+)**: Application logic and file handling
- **jsPDF 2.5.1**: PDF generation library
- **Google Fonts (Poppins)**: Typography

## 📸 Screenshots

[Add screenshots of your application here]

## 💻 Code Example

```javascript
// Generate beautiful PDFs with custom layouts
generatePDFBtn.addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');
    // Enhanced layout with decorative elements
    // ... PDF generation code
});
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/eugene234466/heartfolio/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Eugene Yarney**

- GitHub: [@eugene234466](https://github.com/eugene234466)
- Email: eugeneyarney5@gmail.com
- Phone: +233 50 679 8129

## 🌟 Show Your Support

Give a ⭐️ if this project helped you create something special for your loved one!

## 📋 Future Enhancements

- [ ] Drag-and-drop photo upload
- [ ] Photo reordering functionality
- [ ] Multiple PDF layout templates
- [ ] Custom color themes
- [ ] Support for video clips
- [ ] Cloud storage integration
- [ ] Sharing options (email, social media)
- [ ] Mobile app version
- [ ] Custom fonts selection
- [ ] Sticker and emoji overlays
- [ ] Print-ready export options

## 💡 How It Works

1. **Landing Page**: Features an eye-catching animated hearts background with a call-to-action button
2. **Form Page**: Users input their details and upload photos
3. **Preview System**: JavaScript creates thumbnail previews with editable caption fields
4. **PDF Generation**: jsPDF library creates a multi-page PDF with:
   - Custom cover page design
   - Individual photo pages with frames
   - Caption text below each photo
   - Decorative elements throughout

## 🙏 Acknowledgments

- jsPDF library for PDF generation
- Inspiration from digital scrapbooking applications
- The open-source community

---

Made with ❤️ for creating beautiful memories
