# 🚩 Maratha Yojna Margdarshak - Enhanced Version

## ✨ Features Implemented

### 🎨 UI/UX Enhancements
- **Smooth Animations**: Beautiful fade-in, slide-up, and card animations
- **Loading Spinner**: Professional loading indicator during scheme rendering
- **Gradient Backgrounds**: Modern gradient designs for header and footer
- **Enhanced Card Hover Effects**: Shimmer effect and dynamic shadows
- **Responsive Design**: Optimized for all screen sizes (mobile, tablet, desktop)

### 🌙 Dark Mode
- **Toggle Button**: Switch between light and dark themes
- **LocalStorage Persistence**: Your preference is saved
- **Smooth Transitions**: Elegant color transitions

### ⭐ Favorites System
- **Bookmark Schemes**: Click the heart icon to save favorite schemes
- **LocalStorage**: Favorites persist across sessions
- **Filter View**: Toggle to show only favorited schemes
- **Heart Animation**: Delightful animation when adding favorites

### 📤 Share Functionality
- **WhatsApp Share**: Share schemes directly via WhatsApp
- **Pre-formatted Messages**: Includes scheme name, description, and link

### 📊 Statistics Dashboard
- **Real-time Counter**: Animated statistics showing total schemes
- **Favorites Count**: Track your saved schemes
- **Category Count**: Display available categories

### 🔍 Advanced Filtering & Sorting
- **Sort Options**: 
  - Default order
  - Name (A-Z / Z-A)
  - By Category
- **Category Filter**: Filter by education, financial, health, agriculture, women, housing
- **Search**: Real-time search by name or description
- **Favorites Filter**: Show only bookmarked schemes

### ⬆️ Back to Top Button
- **Smooth Scroll**: Appears after scrolling 300px
- **Animated Entry**: Fades in smoothly
- **Hover Effect**: Scale animation on hover

### ♿ Accessibility Features
- **ARIA Labels**: All interactive elements have proper labels
- **Keyboard Navigation**: 
  - `Ctrl/Cmd + K`: Focus search bar
  - `Escape`: Close modal
- **Screen Reader Support**: Proper semantic HTML and ARIA attributes
- **Focus States**: Clear focus indicators for keyboard users

### 📱 Progressive Web App (PWA)
- **Installable**: Add to home screen on mobile/desktop
- **Offline Support**: Service worker caches files for offline access
- **App-like Experience**: Standalone display mode
- **Manifest**: Proper PWA configuration with icons

### 🎯 Additional Enhancements
- **Modal Improvements**: Better animations, overlay click to close
- **YouTube Help Links**: Direct video search for scheme applications
- **Government Links**: Official application links embedded
- **Print Styles**: Optimized for printing scheme information
- **Error Handling**: Graceful "no results" messages

## 🚀 How to Use

### Basic Usage
1. **Search**: Type in the search bar to find schemes
2. **Filter**: Use category dropdown to filter by type
3. **Sort**: Choose sorting option from dropdown
4. **Favorite**: Click ❤️ on any scheme card to bookmark it
5. **Share**: Click 📤 Share button to send via WhatsApp
6. **Read More**: Click "Read More" for detailed information
7. **Apply**: Click "Apply" to visit official government portal

### Advanced Features
- **Dark Mode**: Click sun/moon icon in top-right corner
- **Favorites View**: Click "❤️ Favorites" button to see only saved schemes
- **Back to Top**: Click ↑ button when scrolling down
- **Keyboard Shortcuts**: 
  - `Ctrl + K` or `Cmd + K`: Quick search
  - `Escape`: Close modal

### Install as App
- **Desktop**: Click "📱 Install App" button in footer (when available)
- **Mobile**: 
  - Chrome: Menu → "Add to Home Screen"
  - Safari: Share → "Add to Home Screen"

## 📂 File Structure
```
MarathaYojnaWebsite/
├── index.html           # Main HTML file with enhanced structure
├── style.css            # Enhanced CSS with animations and dark mode
├── script.js            # Enhanced JavaScript with all features
├── manifest.json        # PWA manifest configuration
├── service-worker.js    # Service worker for offline support
├── README.md            # This file
└── images/              # Header images (create this folder)
    ├── aai_jijau.jpg
    ├── shivaji.jpg
    ├── sambhaji.jpg
    └── manoj_patil.jpg
```

## 📝 Setup Instructions

### 1. Create Images Folder
Create an `images` folder and add the header images:
- `aai_jijau.jpg`
- `shivaji.jpg`
- `sambhaji.jpg`
- `manoj_patil.jpg`

### 2. Create PWA Icons
For full PWA functionality, create app icons:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

You can use online tools like:
- [Favicon Generator](https://www.favicon-generator.org/)
- [App Icon Generator](https://appicon.co/)

### 3. Run Locally
Simply open `index.html` in a modern web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Then open http://localhost:8000
```

### 4. Deploy
Upload all files to your web hosting service. PWA features work best with HTTPS.

## 🛠️ Technologies Used
- **HTML5**: Semantic markup, accessibility features
- **CSS3**: Animations, flexbox, grid, media queries
- **JavaScript ES6+**: Modern syntax, async/await
- **Service Workers**: Offline functionality
- **LocalStorage**: Data persistence
- **PWA**: Installable web app

## 🎨 Color Scheme
- **Primary Orange**: `#e65100` / `#ff6f00`
- **Light Background**: `#fdf6f0`
- **Dark Background**: `#1a1a1a`
- **Accent Yellow**: `#fff176`

## 🔥 Performance Optimizations
- **Lazy Loading**: Schemes load with staggered animations
- **Debounced Search**: Efficient search rendering
- **Optimized CSS**: Minimal reflows and repaints
- **Service Worker Caching**: Fast repeat visits

## 📱 Browser Support
- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing
Feel free to enhance the website further by:
- Adding more government schemes
- Improving translations
- Adding more features
- Optimizing performance

## 👨‍💻 Developer
**Parth Ashokrao Hoke Patil**

## 📄 License
This project is created for educational and social welfare purposes.

## 🙏 Acknowledgments
जय भवानी जय शिवाजी 🚩

---

**Note**: For production deployment, ensure you have proper SSL certificate (HTTPS) for PWA features to work correctly.
