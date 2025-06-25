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
- **DOMPurify** - Input sanitization untuk keamanan

## Keamanan Aplikasi

Aplikasi ini menerapkan berbagai teknik keamanan untuk melindungi data pengguna:

### Input Validation & Sanitization

- **XSS Prevention**:

  - Sanitasi semua input pengguna menggunakan DOMPurify
  - Escape karakter khusus HTML sebelum dirender ke halaman
  - Pengujian dilakukan dengan memasukkan `<script>alert("XSS Attack!")</script>` di setiap form

- **SQL Injection Prevention**:

  - Menggunakan parameterized queries melalui Supabase client
  - Tidak ada SQL query yang dibuat secara langsung dari input pengguna
  - Pengujian dilakukan dengan memasukkan `'; DROP TABLE users; --` di field input

- **CSRF Protection**:

  - Token CSRF untuk semua form yang memodifikasi data
  - Token disimpan dalam cookie SameSite=Strict
  - Validasi token saat pemrosesan request

- **Validasi Form**:
  - Verifikasi format email, password, dan nomor telepon dengan regex
  - Validasi client-side dan server-side
  - Penolakan input kosong atau invalid sebelum disimpan ke database

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

- Node.js
- npm atau yarn
- Akun Supabase

### Pengaturan Proyek

1. **Clone repositori**

```sh
git clone https://github.com/your-username/sea-catering.git
cd sea-catering
```

2. **Install dependensi**

```sh
npm install
```

3. **Konfigurasi database**

- Buat project baru di [Supabase](https://supabase.com)
- Buat tabel yang diperlukan seperti yang dijelaskan di bagian "Struktur Database"
- Jalankan skrip migrasi yang tersedia di folder `migration`

4. **Konfigurasi lingkungan**

Buat file `.env` di root proyek dan isi dengan variabel berikut:

```
# Supabase API credentials
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **Jalankan aplikasi**

```sh
# Mode pengembangan dengan hot-reload
npm run dev

# Atau build untuk produksi
npm run build

# Jalankan linting dan perbaikan kode
npm run lint

# Format kode dengan Prettier
npm run format
```

### Mengakses Aplikasi

- Frontend aplikasi akan berjalan di `http://localhost:3000` (atau port yang dikonfigurasi)
- Panel admin dapat diakses di `/admin` setelah login sebagai admin

### Mengatur Akun Admin

Untuk membuat akun admin, Anda dapat menggunakan salah satu metode berikut:

#### Menggunakan SQL di Supabase

1. Buat akun pengguna reguler melalui aplikasi
2. Jalankan query SQL berikut di panel SQL Supabase:

```sql
-- Set the user with the id
UPDATE profiles
SET is_admin = TRUE
WHERE id = 'your_id';
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

### Struktur Database

Aplikasi ini membutuhkan beberapa tabel di database Supabase:

#### Tabel Utama

1. **profiles** - Data profil pengguna

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar_url TEXT,
  user_role TEXT DEFAULT 'user',
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

2. **meal_plans** - Data paket makan

```sql
CREATE TABLE meal_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration_days INTEGER NOT NULL,
  meals_per_day INTEGER NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

3. **subscriptions** - Data langganan pengguna

```sql
CREATE TABLE subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  meal_plan_id UUID REFERENCES meal_plans(id) NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'active',
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

4. **testimonials** - Ulasan dari pengguna

```sql
CREATE TABLE testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  review TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Menggunakan Skrip Migrasi

Folder `/migration` berisi semua skrip SQL untuk membuat struktur database. Anda dapat menjalankannya dari interface SQL di dashboard Supabase Anda.

Urutan eksekusi:

1. `create_profiles_table.sql`
2. `create_meal_plans_tables.sql`
3. `add_user_id_column.sql`
4. `create_testimonials_table.sql`
5. `add_subscription_status_columns.sql`

### Konfigurasi Keamanan Database

Pastikan untuk mengatur kebijakan keamanan Row Level Security (RLS) di Supabase untuk melindungi data Anda:

```sql
-- Contoh kebijakan untuk tabel profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile."
ON profiles FOR UPDATE USING (auth.uid() = id);

-- Kebijakan admin untuk melihat semua profil
CREATE POLICY "Admin can view all profiles"
ON profiles FOR SELECT
USING (auth.jwt() ->> 'email' = (SELECT current_setting('app.admin_email', true)));
```
