# SEA Catering - Frontend

Aplikasi website SEA Catering menyediakan layanan pemesanan katering sehat dengan pengiriman ke seluruh Indonesia.

## Deskripsi Proyek

SEA Catering adalah aplikasi web untuk layanan katering makanan sehat dengan fitur:

- Sistem keanggotaan (auth)
- Langganan paket makan
- Dashboard admin
- Dashboard pengguna
- Profil pengguna
- Katalog menu

## Teknologi yang Digunakan

- **Vue.js 3** - Framework JavaScript untuk UI
- **Vite** - Build tool
- **Pinia** - State management
- **Vue Router** - Navigasi
- **Tailwind CSS** - Styling
- **DaisyUI** - Komponen UI
- **Supabase** - Backend as a Service (auth, database)
- **Chart.js** - Visualisasi data
- **ESLint & Prettier** - Linting dan formatting

## Struktur Proyek

```
frontend/
├── public/             # Aset statis
├── src/
│   ├── assets/         # Aset aplikasi (gambar, CSS)
│   ├── components/     # Komponen Vue
│   │   ├── admin/      # Komponen untuk admin
│   │   ├── auth/       # Komponen autentikasi
│   │   ├── layout/     # Komponen layout
│   │   └── sections/   # Bagian-bagian halaman
│   ├── middleware/     # Middleware (auth, validation)
│   ├── router/         # Konfigurasi routing
│   ├── services/       # Layanan API
│   ├── stores/         # Pinia stores
│   ├── supabase/       # Konfigurasi Supabase
│   ├── utils/          # Fungsi-fungsi utilitas
│   ├── views/          # Halaman
│   ├── App.vue         # Komponen root
│   └── main.js         # Entry point
├── .eslintrc.js        # Konfigurasi ESLint
├── package.json        # Dependensi npm
├── tailwind.config.js  # Konfigurasi Tailwind
└── vite.config.js      # Konfigurasi Vite
```

## Instalasi dan Penggunaan

### Prasyarat

- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Pengaturan Proyek

```sh
# Install dependensi
npm install

# Kompilasi dan hot-reload untuk development
npm run dev

# Kompilasi dan minify untuk production
npm run build

# Lint dan fix files
npm run lint

# Format kode
npm run format
```

### Konfigurasi Lingkungan

Buat file `.env` di root proyek dengan konfigurasi berikut:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Fitur

1. **Autentikasi**

   - Login/Register dengan email dan password
   - Login dengan Google
   - Proteksi rute dengan middleware auth

2. **User Dashboard**

   - Informasi langganan
   - Histori pesanan
   - Update profil

3. **Admin Dashboard**

   - Ringkasan data pelanggan
   - Manajemen pesanan
   - Statistik langganan

4. **Katalog Menu**

   - Daftar menu
   - Detail menu

5. **Langganan**
   - Pilih paket
   - Kelola langganan

## Best Practices

1. **Clean Code**

   - Penamaan yang konsisten dan deskriptif
   - Komponen yang reusable
   - Pemisahan concerns

2. **Responsive Design**

   - Mobile-first approach
   - Penggunaan Tailwind breakpoints

3. **Performance**
   - Lazy loading komponen
   - Optimasi aset
