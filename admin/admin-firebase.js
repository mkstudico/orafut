// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMzQe4_sHxVX2rgbgCF5E9DDWbbp9m7tc",
    authDomain: "orafut-58b5f.firebaseapp.com",
    projectId: "orafut-58b5f",
    storageBucket: "orafut-58b5f.firebasestorage.app",
    messagingSenderId: "500581059835",
    appId: "1:500581059835:web:7be0994b65ff21dae0b45e",
    measurementId: "G-WM3MV94G58"
};

// Global variables
const IMGBB_KEY = "99c6aa298645e8a4742979117fc73be6";
let app, db;

// Initialize Firebase
async function initializeFirebase() {
    try {
        // Import Firebase modules
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js");
        const { getFirestore } = await import("https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js");
        
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        
        console.log('Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        showToast('Failed to initialize Firebase', 'error');
        return false;
    }
}

// Toast notifications
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${icons[type]}"></i>
        </div>
        <div class="toast-content">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Setup file upload
function setupFileUpload(inputId, previewId, uploadAreaId) {
    const input = document.getElementById(inputId);
    const uploadArea = document.getElementById(uploadAreaId);

    if (!input || !uploadArea) return;

    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error');
            return;
        }

        // Validate file size
        const maxSize = inputId === 'adImageInput' ? 5 * 1024 * 1024 : 2 * 1024 * 1024;
        if (file.size > maxSize) {
            showToast(`Image must be less than ${maxSize / 1024 / 1024}MB`, 'error');
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById(previewId);
            if (!preview) return;
            
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            preview.style.display = 'block';
            
            // Update upload area text
            const uploadText = uploadArea.querySelector('.upload-text');
            const uploadIcon = uploadArea.querySelector('.upload-icon');
            if (uploadText) uploadText.textContent = 'Image selected';
            if (uploadIcon) uploadIcon.innerHTML = '<i class="fas fa-check"></i>';
        };
        reader.readAsDataURL(file);
    });
}

// Upload image to ImgBB
async function uploadImageToImgBB(file) {
    try {
        const formData = new FormData();
        formData.append('image', file);
        
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        if (data.success) {
            return data.data.url;
        } else {
            throw new Error('Image upload failed');
        }
    } catch (error) {
        console.error('ImgBB upload error:', error);
        throw error;
    }
}

// Get Firestore FieldValue
function getFieldValue() {
    return {
        serverTimestamp: () => {
            return window.firebase.firestore.FieldValue.serverTimestamp();
        },
        increment: (value) => {
            return window.firebase.firestore.FieldValue.increment(value);
        }
    };
}

// Get Firestore Timestamp
function getTimestamp(date) {
    return window.firebase.firestore.Timestamp.fromDate(date);
}

// Export for use in main.js
window.AdminFirebase = {
    initializeFirebase,
    showToast,
    setupFileUpload,
    uploadImageToImgBB,
    getFieldValue,
    getTimestamp,
    getDb: () => db,
    getIMGBB_KEY: () => IMGBB_KEY
};
