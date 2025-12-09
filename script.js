// 1. DATA ARTIKEL FIKTIF (SIMULASI DATABASE)
const articles = [
    {
        id: 1,
        title: "Kebijakan Baru Energi Terbarukan Disahkan, PLN Siap Transisi",
        summary: "Pemerintah resmi merilis regulasi baru untuk mempercepat adopsi energi surya dan angin, menandai babak baru transisi energi nasional...",
        category: "Ekonomi",
        isHeadline: true, // Untuk ditampilkan di Headline
        isPopular: true,
        imageUrl: "https://via.placeholder.com/800x450?text=Energi+Terbarukan" // URL Gambar Fiktif
    },
    {
        id: 2,
        title: "Analisis Mendalam: Kenaikan Suku Bunga Global dan Dampaknya pada Rupiah",
        summary: "Para ekonom memprediksi bahwa kenaikan suku bunga oleh bank sentral AS akan memberikan tekanan serius pada nilai tukar mata uang lokal...",
        category: "Ekonomi",
        isHeadline: false,
        isPopular: true,
        imageUrl: "https://via.placeholder.com/400x200?text=Suku+Bunga"
    },
    {
        id: 3,
        title: "Perang Dingin Teknologi: Chip Semikonduktor Jadi Arena Pertarungan Baru",
        summary: "Ketegangan geopolitik antara dua kekuatan global kini berpusat pada penguasaan rantai pasokan semikonduktor canggih...",
        category: "Teknologi",
        isHeadline: false,
        isPopular: true,
        imageUrl: "https://via.placeholder.com/400x200?text=Semikonduktor"
    },
    {
        id: 4,
        title: "Hasil Liga 1: Drama 90 Menit, Tim Tuan Rumah Berhasil Comeback Dramatis",
        summary: "Pertandingan penuh tensi antara tim Singa dan Elang berakhir dengan skor 3-2 setelah gol penentu di menit terakhir...",
        category: "Olahraga",
        isHeadline: false,
        isPopular: false,
        imageUrl: "https://via.placeholder.com/400x200?text=Liga+1+Sepakbola"
    },
    {
        id: 5,
        title: "RUU Reformasi Administrasi Publik Siap Dibawa ke Paripurna Minggu Depan",
        summary: "Dewan Perwakilan Rakyat (DPR) telah menyepakati draf akhir Rancangan Undang-Undang yang mengatur efisiensi birokrasi...",
        category: "Politik",
        isHeadline: false,
        isPopular: false,
        imageUrl: "https://via.placeholder.com/400x200?text=DPR+Paripurna"
    }
];

// 2. FUNGSI UNTUK MENGHITUNG WAKTU POSTING (SIMULASI)
function timeSincePost(minutesAgo) {
    if (minutesAgo < 60) {
        return `${minutesAgo} menit lalu`;
    } else if (minutesAgo < 1440) { // Kurang dari 24 jam
        const hours = Math.floor(minutesAgo / 60);
        return `${hours} jam lalu`;
    } else {
        const days = Math.floor(minutesAgo / 1440);
        return `${days} hari lalu`;
    }
}

// Angka acak antara 10 hingga 1200 menit lalu
const getRandomMinutes = () => Math.floor(Math.random() * (1200 - 10 + 1) + 10);


// 3. FUNGSI UNTUK MERENDER HEADLINE
function renderHeadline(article) {
    const headlineContainer = document.getElementById('headline-article');
    const minutes = getRandomMinutes(); // Waktu posting fiktif

    const html = `
        <div class="headline-content">
            <img src="${article.imageUrl}" alt="${article.title}">
            <div class="headline-text">
                <span class="article-meta">${article.category} | ${timeSincePost(minutes)}</span>
                <h2><a href="article-${article.id}.html">${article.title}</a></h2>
                <p>${article.summary}</p>
                <a href="article-${article.id}.html" style="color: #ff0000; font-weight: bold;">Baca Selengkapnya</a>
            </div>
        </div>
    `;
    headlineContainer.innerHTML = html;
}

// 4. FUNGSI UNTUK MERENDER DAFTAR ARTIKEL BIASA
function renderArticleList(articleData) {
    const listContainer = document.getElementById('article-list');
    let html = '';

    articleData.forEach(article => {
        if (!article.isHeadline) { // Hanya render yang bukan headline
            const minutes = getRandomMinutes();
            html += `
                <div class="article-card">
                    <img src="${article.imageUrl}" alt="${article.title}">
                    <div class="article-info">
                        <span class="article-meta">${article.category} | ${timeSincePost(minutes)}</span>
                        <h3><a href="article-${article.id}.html">${article.title}</a></h3>
                        <p>${article.summary}</p>
                    </div>
                </div>
            `;
        }
    });

    listContainer.innerHTML = html;
}

// 5. FUNGSI UNTUK MERENDER DAFTAR POPULER DI SIDEBAR
function renderPopularList(articleData) {
    const popularContainer = document.getElementById('popular-list');
    const popularArticles = articleData.filter(article => article.isPopular);
    let html = '';

    popularArticles.forEach(article => {
        html += `
            <li>
                <a href="article-${article.id}.html">${article.title}</a>
            </li>
        `;
    });

    popularContainer.innerHTML = html;
}

// 6. FUNGSI UTAMA YANG DIJALANKAN SAAT HALAMAN DIMUAT
document.addEventListener('DOMContentLoaded', () => {
    // 6a. Tampilkan Headline (Ambil artikel yang isHeadline: true)
    const headlineArticle = articles.find(a => a.isHeadline);
    if (headlineArticle) {
        renderHeadline(headlineArticle);
    }

    // 6b. Tampilkan Daftar Artikel
    renderArticleList(articles);

    // 6c. Tampilkan Berita Populer
    renderPopularList(articles);
});