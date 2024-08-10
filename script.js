// Tambahkan event listener untuk tombol "Cek"
document.getElementById('cekButton').addEventListener('click', cekWaifu);

function cekWaifu() {
    const waifuName = document.getElementById('nameInput').value.trim();
    const apiUrl = `https://api.jikan.moe/v4/characters?q=${waifuName}&limit=1`;
    const userName = "nama_user"; // Ganti dengan nama pengguna Anda

    // Tampilkan loading spinner dan sembunyikan hasil pencarian saat memulai pencarian
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    if (waifuName) {
        if (waifuName.toLowerCase() === userName.toLowerCase()) {
            // Jika pengguna memasukkan namanya sendiri, ambil waifu acak
            const randomApiUrl = `https://api.jikan.moe/v4/random/characters`;

            fetch(randomApiUrl)
                .then(response => response.json())
                .then(data => {
                    displayWaifuData(data.data, userName);
                })
                .catch(error => {
                    handleError();
                });
        } else {
            // Jika nama yang dimasukkan bukan nama pengguna, cek waifu sesuai nama yang diinputkan
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.data && data.data.length > 0) {
                        displayWaifuData(data.data[0], userName);
                    } else {
                        document.getElementById('waifuName').innerText = "Waifu tidak ditemukan!";
                        document.querySelector('.waifu-info').innerHTML = '';
                        document.getElementById('result').style.display = 'block'; // Tampilkan hasil
                    }
                })
                .catch(error => {
                    handleError();
                });
        }
    } else {
        document.getElementById('loadingSpinner').style.display = 'none';
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Silakan masukkan nama karakter terlebih dahulu.',
        });
    }
}

function displayWaifuData(waifu, userName) {
    const waifuName = waifu.name;

    document.getElementById('waifuName').innerText = `${userName}, waifumu adalah ${waifuName}`;
    document.querySelector('.waifu-info').innerHTML = `
        <p><strong>Anime:</strong> ${waifu.anime[0]?.name || 'Unknown'}</p>
        <p><strong>Description:</strong> ${waifu.about || 'Tidak ada deskripsi tersedia.'}</p>
        <img src="${waifu.images.jpg.image_url}" alt="${waifu.name}" class="img-fluid">
    `;
    document.querySelector('.waifu-info').style.display = 'block';
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('result').style.display = 'block'; // Tampilkan hasil pencarian
}

function handleError() {
    console.error('Error:', error);
    document.getElementById('loadingSpinner').style.display = 'none';
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Terjadi kesalahan! Silakan coba lagi.',
    });
}
