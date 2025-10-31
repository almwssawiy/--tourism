// ========== متغيرات عامة ==========
let allPlaces = touristPlaces;
let filteredPlaces = allPlaces;

// ========== عناصر DOM ==========
const placesGrid = document.getElementById('placesGrid');
const placesCount = document.getElementById('placesCount');
const noResults = document.getElementById('noResults');
const citySearch = document.getElementById('citySearch');
const categorySearch = document.getElementById('categorySearch');
const resetBtn = document.getElementById('resetBtn');

// ========== دالة إنشاء بطاقة مكان ==========
function createPlaceCard(place) {
    const card = document.createElement('div');
    card.className = 'place-card';
    card.setAttribute('data-category', place.category);
    
    card.innerHTML = `
        <div class="place-image-container">
            <img src="${place.imageUrl}" alt="${place.name}" class="place-image" loading="lazy">
        </div>
        <div class="place-content">
            <h2 class="place-title">${place.name}</h2>
            <span class="place-city">📍 ${place.city}</span>
            <p class="place-description">${place.description}</p>
            <span class="place-category">${place.category}</span>
        </div>
    `;
    
    return card;
}

// ========== دالة عرض الأماكن ==========
function displayPlaces(places) {
    // مسح المحتوى السابق
    placesGrid.innerHTML = '';
    
    // التحقق من وجود نتائج
    if (places.length === 0) {
        noResults.style.display = 'block';
        placesCount.style.display = 'none';
        return;
    }
    
    noResults.style.display = 'none';
    placesCount.style.display = 'block';
    
    // تحديث عداد الأماكن
    placesCount.textContent = `✨ تم العثور على ${places.length} مكان سياحي`;
    
    // إضافة البطاقات
    places.forEach(place => {
        const card = createPlaceCard(place);
        placesGrid.appendChild(card);
    });
    
    // إضافة animation للبطاقات
    const cards = document.querySelectorAll('.place-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ========== دالة البحث والفلترة ========== 
let debounceTimeout;
function filterPlaces() {
    const cityValue = citySearch.value.trim().toLowerCase();
    const categoryValue = categorySearch.value;
    filteredPlaces = allPlaces.filter(place => {
        const matchCity = cityValue === '' || 
                         place.city.toLowerCase().includes(cityValue) ||
                         place.name.toLowerCase().includes(cityValue);
        const matchCategory = categoryValue === '' || 
                             place.category === categoryValue;
        return matchCity && matchCategory;
    });
    displayPlaces(filteredPlaces);
}

// ========== دالة إعادة التعيين ==========
function resetFilters() {
    citySearch.value = '';
    categorySearch.value = '';
    filteredPlaces = allPlaces;
    displayPlaces(filteredPlaces);
}

// ========== دالة البحث حسب المدينة ==========
function searchByCity() {
    filterPlaces();
}

// ========== دالة البحث حسب الفئة ==========
function searchByCategory() {
    filterPlaces();
}

// ========== Event Listeners ==========
// البحث الفوري عند الكتابة
citySearch.addEventListener('input', function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(filterPlaces, 250);
});

// البحث عند تغيير الفئة
categorySearch.addEventListener('change', filterPlaces);

// زر إعادة التعيين
resetBtn.addEventListener('click', function() {
    clearTimeout(debounceTimeout);
    resetFilters();
});

// ========== تحميل الصفحة ==========
document.addEventListener('DOMContentLoaded', () => {
    // عرض جميع الأماكن عند تحميل الصفحة
    displayPlaces(allPlaces);
    
    // إضافة تأثير smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // رسالة ترحيب في console
    console.log('%c🇩🇪 أهلاً أبو العباس في رحلاتك - تحياتي يونس', 
                'color: #FFCE00; font-size: 20px; font-weight: bold; background: #000; padding: 10px;');
    console.log('%cموقع الأماكن السياحية في ألمانيا', 
                'color: #DD0000; font-size: 16px;');
    
    // تحديث تلقائي للروابط في الإنتاج (GitHub Pages)
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        const ogUrl = document.querySelector('meta[property="og:url"]');
        const currentUrl = window.location.href;
        if (canonicalLink) canonicalLink.href = currentUrl;
        if (ogUrl) ogUrl.content = currentUrl;
    }
});