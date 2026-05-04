"use client";

import { useMemo, useState } from "react";

const WA = "https://chat.whatsapp.com/GZ2a2dyWyYKEFleJGocqTg?mode=wwt";
const ADMIN = "https://wa.me/628818116553";

const products = [
  {
    id: "ms365", name: "Microsoft 365", icon: "📊", cat: "produktivitas", type: "Private",
    tiers: [{ label: "1 Bulan", price: "Rp 5.000" }],
    notes: ["Garansi Login", "Pakai akun admin"]
  },
  {
    id: "alightmotion", name: "Alight Motion Pro", icon: "🎬", cat: "desain", type: "Private",
    tiers: [{ label: "1 Tahun", price: "Rp 2.000" }],
    notes: ["Garansi aktif 6 bulan", "Support Android & iOS"]
  },
  {
    id: "applemusic", name: "Apple Music", icon: "🎵", cat: "streaming", type: "Invite / Head",
    tiers: [
      { label: "Invite – 1 Bulan", price: "Rp 4.000" },
      { label: "Head – 1 Bulan", price: "Rp 9.000" }
    ],
    notes: ["Invite: Android/iOS", "Head: khusus Android, bisa invite 5 orang", "Full garansi"]
  },
  {
    id: "bstation", name: "Bstation Premium", icon: "📺", cat: "streaming", type: "Sharing",
    tiers: [
      { label: "1 Bulan", price: "Rp 9.000" },
      { label: "3 Bulan", price: "Rp 15.000" },
      { label: "1 Tahun", price: "Rp 20.000" }
    ],
    notes: ["Garansi login", "Cek berkala jika limit"]
  },
  {
    id: "canva", name: "Canva Pro", icon: "🎨", cat: "desain", type: "Member / Edu / Head",
    tiers: [
      { label: "Member 1 Bulan", price: "Rp 1.000" },
      { label: "Member 6 Bulan", price: "Rp 5.000" },
      { label: "Member 1 Tahun", price: "Rp 9.000" },
      { label: "Edu Lifetime", price: "Rp 12.000" }
    ],
    notes: ["Garansi 3 bulan", "Head bisa invite 100 email", "Stok unlimited"]
  },
  {
    id: "capcut", name: "CapCut Pro", icon: "✂️", cat: "desain", type: "Private",
    tiers: [
      { label: "7 Hari", price: "Rp 2.500" },
      { label: "1 Bulan", price: "Rp 7.000" }
    ],
    notes: ["Akun dari admin", "Member plan", "Full garansi"]
  },
  {
    id: "chatgpt", name: "ChatGPT Plus", icon: "🤖", cat: "ai", type: "Private",
    tiers: [
      { label: "1 Bulan (Garansi)", price: "Rp 20.000" },
      { label: "1 Bulan (No Garansi)", price: "Rp 10.000" }
    ],
    notes: ["Akses GPT-5 Terbaru", "Akun private", "Bisa transfer riwayat obrolan"]
  },
  {
    id: "deepl", name: "DeepL Pro", icon: "🌐", cat: "produktivitas", type: "Invite / Head",
    tiers: [
      { label: "Invite – 1 Bulan", price: "Rp 4.000" },
      { label: "Head – 1 Bulan", price: "Rp 10.000" }
    ],
    notes: ["Garansi full", "Bisa Android & iOS"]
  },
  {
    id: "disney", name: "Disney+ Hotstar", icon: "🏰", cat: "streaming", type: "Sharing",
    tiers: [{ label: "1 Bulan", price: "Rp 23.000" }],
    notes: ["Plan Premium", "Akun dari admin", "OTP hanya 1x — login cepat (janjian)"]
  },
  {
    id: "gemini", name: "Gemini AI Pro + GDrive 5TB", icon: "✨", cat: "ai", type: "Private",
    tiers: [
      { label: "1 Bulan", price: "Rp 12.000" },
      { label: "3 Bulan", price: "Rp 30.000" }
    ],
    notes: ["Include Google Drive 5TB", "Bisa invite 5 orang", "Garansi berlaku jika backfree"]
  },
  {
    id: "gdrive", name: "Google Drive 5TB", icon: "☁️", cat: "produktivitas", type: "Invite Private",
    tiers: [{ label: "3 Bulan", price: "Rp 10.000" }],
    notes: ["Include akses Gemini AI PRO", "Cukup kirim Gmail kamu", "Garansi berlaku jika backfree"]
  },
  {
    id: "gtc", name: "GetContact Premium", icon: "📞", cat: "produktivitas", type: "Langganan",
    tiers: [
      { label: "1 Bulan", price: "Rp 5.000" },
      { label: "2 Bulan", price: "Rp 9.000" }
    ],
    notes: ["300 pencarian/bulan", "40 cek tag nama/bulan", "Garansi 23 hari"]
  },
  {
    id: "hbo", name: "HBO Max", icon: "🎭", cat: "streaming", type: "Sharing",
    tiers: [
      { label: "Sharing 3U – 1 Bulan", price: "Rp 16.000" },
      { label: "Sharing 6U – 1 Bulan", price: "Rp 12.000" }
    ],
    notes: ["Garansi login"]
  },
  {
    id: "iqiyi", name: "iQIYI VIP", icon: "🎞️", cat: "streaming", type: "Sharing",
    tiers: [
      { label: "1 Bulan", price: "Rp 10.000" },
      { label: "1 Tahun", price: "Rp 23.000" }
    ],
    notes: ["Plan Premium", "Garansi login", "Akun dari admin"]
  },
  {
    id: "imei", name: "Jasa Unblock IMEI", icon: "📱", cat: "jasa", type: "Jasa",
    tiers: [{ label: "3 Bulan / 90 Hari", price: "Rp 250.000" }],
    notes: ["Support semua operator", "Full garansi aktif", "Jika gagal 100% refund"]
  },
  {
    id: "lacak", name: "Jasa Lacak & Cek Identitas", icon: "🔍", cat: "jasa", type: "Jasa",
    tiers: [
      { label: "Lacak Lokasi (1 Nomor)", price: "Rp 185.000" },
      { label: "Cek Nama / HP / Rekening / Plat", price: "Rp 185.000" },
      { label: "Cek NIK / KK", price: "Rp 175.000" }
    ],
    notes: ["Proses 1x, hasil langsung dikirim", "Nomor harus aktif bisa ditelfon", "Jika gagal 100% refund"]
  },
  {
    id: "sosmed", name: "Jasa Suntik Sosmed", icon: "📈", cat: "sosmed", type: "Jasa",
    tiers: [{ label: "Harga custom (tanya admin)", price: "Chat Admin" }],
    notes: ["TikTok, IG, FB, YouTube, Shopee, Spotify, Telegram, Twitter (X), LinkedIn & lainnya", "Semua order 1x garansi", "Bisa custom kebutuhan"]
  },
  {
    id: "kahoot", name: "Kahoot Plus", icon: "🧠", cat: "produktivitas", type: "Private",
    tiers: [{ label: "7 Hari", price: "Rp 4.000" }],
    notes: ["Akun dari admin", "Garansi full", "Bisa Android & iPhone"]
  },
  {
    id: "lightroom", name: "Lightroom Premium", icon: "📷", cat: "desain", type: "Private / Sharing",
    tiers: [
      { label: "7 Hari (Private)", price: "Rp 4.000" },
      { label: "1 Tahun (Sharing)", price: "Rp 18.000" }
    ],
    notes: ["Garansi 6 bulan untuk 1 tahun", "Support Android/iOS"]
  },
  {
    id: "windows", name: "Lisensi Windows & Office", icon: "🪟", cat: "produktivitas", type: "Lisensi Original",
    tiers: [
      { label: "Office 2016/2019/2021", price: "Rp 25.000" },
      { label: "Windows 10/11 Pro", price: "Rp 25.000" }
    ],
    notes: ["Kode aktivasi legal & permanen", "Support update selamanya", "No crack", "Garansi 6 bulan"]
  },
  {
    id: "loklok", name: "Loklok Sharing", icon: "📽️", cat: "streaming", type: "Sharing",
    tiers: [
      { label: "Basic – 1 Bulan", price: "Rp 22.000" },
      { label: "Standard – 1 Bulan", price: "Rp 25.000" }
    ],
    notes: ["Standard bisa nonton di TV", "Login max 1 device", "Bergaransi sesuai SnK"]
  },
  {
    id: "masaaktif", name: "Tambah Masa Aktif SIM", icon: "📶", cat: "jasa", type: "Jasa",
    tiers: [
      { label: "Indosat 1 Bulan", price: "Rp 25.000" },
      { label: "Telkomsel 1 Bulan", price: "Rp 25.000" },
      { label: "XL 1 Bulan", price: "Rp 20.000" },
      { label: "Axis 1 Bulan", price: "Rp 12.000" }
    ],
    notes: ["Cukup kirim nomor HP", "Proses tergantung antrian", "Tidak menambah kuota, hanya masa aktif"]
  },
  {
    id: "meitu", name: "Meitu VIP", icon: "🌸", cat: "desain", type: "Private",
    tiers: [{ label: "28 Hari", price: "Rp 10.000" }],
    notes: ["Akun dari admin", "Garansi 20 hari", "Bisa Android & iPhone"]
  },
  {
    id: "melolo", name: "Melolo Premium", icon: "🎶", cat: "streaming", type: "Sharing",
    tiers: [
      { label: "1 Bulan", price: "Rp 8.000" },
      { label: "3 Bulan", price: "Rp 13.000" }
    ],
    notes: ["Full garansi", "Login pakai Google", "Akun dari admin"]
  },
  {
    id: "netflix", name: "Netflix Premium UHD", icon: "🍿", cat: "streaming", type: "Sharing / Private / VIP",
    tiers: [
      { label: "Harian 1 Hari", price: "Rp 4.000" },
      { label: "Harian 7 Hari", price: "Rp 12.000" },
      { label: "Private 1P1U – 1 Bulan", price: "Rp 25.000" },
      { label: "VIP – 1 Bulan", price: "Rp 30.000" }
    ],
    notes: ["Kualitas 4K UHD", "Akun dari admin", "Full garansi sesuai SnK"]
  },
  {
    id: "perplexity", name: "Perplexity Pro", icon: "🔎", cat: "ai", type: "Private",
    tiers: [
      { label: "1 Bulan (Garansi)", price: "Rp 27.000" },
      { label: "1 Bulan (No Garansi)", price: "Rp 16.000" }
    ],
    notes: ["Akun dari admin"]
  },
  {
    id: "picsart", name: "PicsArt Pro", icon: "🖼️", cat: "desain", type: "Private",
    tiers: [{ label: "28 Hari", price: "Rp 10.000" }],
    notes: ["Akun dari admin", "Garansi 20 Hari", "Bisa Android & iPhone"]
  },
  {
    id: "primevideo", name: "Prime Video Premium", icon: "🎥", cat: "streaming", type: "Sharing / Private",
    tiers: [
      { label: "Sharing – 1 Bulan", price: "Rp 8.000" },
      { label: "Private – 1 Bulan", price: "Rp 13.000" }
    ],
    notes: ["Full garansi login", "Tanya stok dulu sebelum order"]
  },
  {
    id: "roblox", name: "Robux via Login", icon: "🎮", cat: "sosmed", type: "Via Login (Vilog)",
    tiers: [
      { label: "40 Robux", price: "Rp 23.000" },
      { label: "160 Robux", price: "Rp 46.000" },
      { label: "400 Robux", price: "Rp 88.000" },
      { label: "1000 Robux", price: "Rp 164.000" }
    ],
    notes: ["Proses 10–30 menit", "Wajib login akun Roblox", "Full garansi gagal = refund 100%"]
  },
  {
    id: "scribd", name: "Scribd Pro", icon: "📚", cat: "produktivitas", type: "Private",
    tiers: [{ label: "1 Bulan", price: "Rp 5.000" }],
    notes: ["Tanya stok dulu sebelum order", "Full garansi"]
  },
  {
    id: "sewabot", name: "Sewa Bot WA", icon: "🤖", cat: "jasa", type: "Sewa / Jadi Bot",
    tiers: [
      { label: "Sewa Bot – 1 Bulan", price: "Rp 5.000" },
      { label: "Jadi Bot (nomor sendiri) – 1 Bulan", price: "Rp 10.000" }
    ],
    notes: ["Antilink, Antispam, Autokick, Tag member", "Bisa bikin katalog produk", "Harga untuk 1 grup"]
  },
  {
    id: "shortmax", name: "Shortmax Premium", icon: "📹", cat: "streaming", type: "Sharing",
    tiers: [
      { label: "1 Bulan", price: "Rp 9.500" },
      { label: "3 Bulan", price: "Rp 15.000" }
    ],
    notes: ["Akun dari admin", "Login pakai Google", "Full garansi"]
  },
  {
    id: "spotify", name: "Spotify Premium", icon: "🎧", cat: "streaming", type: "FamPlan",
    tiers: [
      { label: "1 Bulan", price: "Rp 20.000" },
      { label: "2 Bulan", price: "Rp 28.000" }
    ],
    notes: ["Akun private dari admin", "Bisa transfer playlist", "Full garansi"]
  },
  {
    id: "vidio", name: "Vidio Platinum", icon: "📡", cat: "streaming", type: "Private / Sharing",
    tiers: [
      { label: "Private – 1 Bulan", price: "Rp 29.000" },
      { label: "Sharing – 1 Bulan", price: "Rp 19.000" }
    ],
    notes: ["Full akses: Series, Bein Sports, Liga Champions", "Login di HP & Tablet", "Akun dari Admin"]
  },
  {
    id: "vidiotv", name: "Vidio Platinum TV", icon: "📺", cat: "streaming", type: "Private",
    tiers: [{ label: "1 Tahun", price: "Rp 3.000" }],
    notes: ["Garansi 1 Bulan", "Full akses Bein Sports & Liga Champions", "Akun dari Admin"]
  },
  {
    id: "vision", name: "Vision+ Premium", icon: "👁️", cat: "streaming", type: "Private",
    tiers: [{ label: "1 Bulan", price: "Rp 9.000" }],
    notes: ["Akses channel TV lokal & original series", "Bisa nonton 2 device bareng", "Full garansi"]
  },
  {
    id: "viu", name: "Viu Premium", icon: "🎬", cat: "streaming", type: "Private Anti Limit",
    tiers: [
      { label: "1 Tahun", price: "Rp 2.000" },
      { label: "Lifetime", price: "Rp 3.000" }
    ],
    notes: ["Garansi 6–8 bulan", "Support TV, iPhone, dll", "Akun dari admin"]
  },
  {
    id: "vpn", name: "VPN Premium", icon: "🔒", cat: "produktivitas", type: "Private",
    tiers: [
      { label: "ExpressVPN – 7 Hari", price: "Rp 5.000" },
      { label: "ExpressVPN – 1 Bulan", price: "Rp 10.000" },
      { label: "Surfshark – 7 Hari", price: "Rp 5.000" },
      { label: "HMA – 7 Hari", price: "Rp 5.000" }
    ],
    notes: ["Akun dari seller", "Wajib tanya stok dulu"]
  },
  {
    id: "wattpad", name: "Wattpad Premium", icon: "📖", cat: "streaming", type: "Private",
    tiers: [{ label: "7 Hari", price: "Rp 4.000" }],
    notes: ["Akun dari admin", "Garansi full", "Bisa Android & iPhone"]
  },
  {
    id: "wetv", name: "WeTV Premium", icon: "🎞️", cat: "streaming", type: "Sharing",
    tiers: [
      { label: "1 Bulan", price: "Rp 8.500" },
      { label: "3 Bulan", price: "Rp 12.000" }
    ],
    notes: ["Akun dari admin", "Login pakai Google", "Full garansi"]
  },
  {
    id: "wink", name: "Wink VIP", icon: "💫", cat: "desain", type: "Private",
    tiers: [{ label: "7 Hari", price: "Rp 4.000" }],
    notes: ["Akun dari admin", "Garansi full", "Khusus Android"]
  },
  {
    id: "youku", name: "Youku Premium", icon: "🎦", cat: "streaming", type: "Sharing",
    tiers: [
      { label: "1 Bulan", price: "Rp 8.500" },
      { label: "3 Bulan", price: "Rp 12.000" }
    ],
    notes: ["Akun dari admin", "Login pakai Google", "Full garansi"]
  },
  {
    id: "youtube", name: "YouTube Premium", icon: "▶️", cat: "streaming", type: "Individual / Head / Invite",
    tiers: [
      { label: "Individual – 3 Bulan", price: "Rp 23.000" },
      { label: "Head – 1 Bulan", price: "Rp 10.000" },
      { label: "Invite – 1 Bulan", price: "Rp 7.000" }
    ],
    notes: ["Include YouTube Music", "Head bisa invite 5 orang", "Full garansi"]
  },
  {
    id: "zoom", name: "Zoom Premium", icon: "🖥️", cat: "produktivitas", type: "Private",
    tiers: [{ label: "2 Minggu (100 Peserta)", price: "Rp 4.000" }],
    notes: ["Login via email bukan Google", "Gak ada batas durasi", "Garansi login"]
  }
]

function WhatsappIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Home() {
  const [currentCat, setCurrentCat] = useState("all");
  const [currentSearch, setCurrentSearch] = useState("");
  const [selectedTier, setSelectedTier] = useState({});
  const [qrImage, setQrImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = currentCat === "all" || p.cat === currentCat;
      const q = currentSearch.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [currentCat, currentSearch]);

  const categories = [
    ["all", "Semua"],
    ["streaming", "🎬 Streaming"],
    ["ai", "🤖 AI Tools"],
    ["produktivitas", "💼 Produktivitas"],
    ["desain", "🎨 Desain & Edit"],
    ["sosmed", "📱 Sosmed & Game"],
    ["jasa", "🔧 Jasa & Lainnya"],
  ];

  async function orderProduct(product) {
  const tier = selectedTier[product.id];

  if (!tier) {
    alert("Pilih paket dulu!");
    return;
  }

  setLoading(true);

  try {
    const amount = parseInt(tier.price.replace(/[^0-9]/g, ""));

    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product: `${product.name} - ${tier.label}`,
        email: "test@gmail.com",
        amount
      })
    });

    const data = await res.json();
    setQrImage(data.qr_image);
    const [transactionId, setTransactionId] = useState(null);

  } catch (err) {
    console.error(err);
    alert("Gagal generate QRIS");
  }

  setLoading(false);
}

  return (
    <>
      <style jsx global>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Poppins:wght@500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --dark: #0d1117;
    --dark2: #161b24;
    --dark3: #1e2530;
    --blue-deep: #1a3a5c;
    --blue-mid: #2980b9;
    --blue-light: #4db8d4;
    --cyan: #67d5e8;
    --text: #e8edf5;
    --text-muted: #8fa3b8;
    --accent: #4db8d4;
    --card-bg: rgba(26,58,92,0.18);
    --card-border: rgba(77,184,212,0.15);
    --wa-green: #25D366;
    --radius: 16px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--dark);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* BACKGROUND MESH */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 800px 600px at 20% 10%, rgba(41,128,185,0.12) 0%, transparent 70%),
      radial-gradient(ellipse 600px 500px at 80% 80%, rgba(77,184,212,0.08) 0%, transparent 70%),
      radial-gradient(ellipse 400px 400px at 60% 30%, rgba(26,58,92,0.2) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 1; }

  /* ── HEADER ── */
  header {
    position: sticky; top: 0; z-index: 100;
    background: rgba(13,17,23,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(77,184,212,0.12);
    padding: 14px 0;
  }
  .header-inner {
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }
  .logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
  .logo img { height: 40px; object-fit: contain; }
  .logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 1.15rem; font-weight: 800;
    background: linear-gradient(135deg, #4db8d4, #2980b9);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .logo-sub {
    font-size: 0.68rem; color: var(--text-muted); display: block; line-height: 1;
    -webkit-text-fill-color: var(--text-muted);
  }

  .nav-links { display: flex; gap: 6px; align-items: center; }
  .nav-links a {
    color: var(--text-muted); text-decoration: none; font-size: 0.85rem;
    padding: 6px 12px; border-radius: 8px; transition: all .2s;
  }
  .nav-links a:hover { color: var(--cyan); background: rgba(77,184,212,0.08); }

  .btn-wa-nav {
    display: flex; align-items: center; gap: 7px;
    background: var(--wa-green); color: #fff !important;
    padding: 8px 16px !important; border-radius: 10px !important;
    font-weight: 500; font-size: 0.85rem !important;
    -webkit-text-fill-color: #fff !important;
    transition: opacity .2s !important;
  }
  .btn-wa-nav:hover { opacity: 0.88; background: var(--wa-green) !important; }

  /* ── HERO ── */
  .hero {
    padding: 90px 0 70px;
    text-align: center;
    position: relative; z-index: 1;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(77,184,212,0.1); border: 1px solid rgba(77,184,212,0.25);
    color: var(--cyan); padding: 6px 16px; border-radius: 50px;
    font-size: 0.8rem; font-weight: 500; margin-bottom: 28px;
    animation: fadeUp 0.6s ease both;
  }
  .hero-badge span { width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; display: inline-block; animation: pulse 2s infinite; }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.4rem, 6vw, 4.2rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 20px;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero h1 .gradient-text {
    background: linear-gradient(135deg, #67d5e8 0%, #4db8d4 40%, #2980b9 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero p {
    font-size: 1.05rem; color: var(--text-muted); max-width: 560px; margin: 0 auto 36px;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-ctas {
    display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
    animation: fadeUp 0.6s 0.3s ease both;
  }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 9px;
    background: linear-gradient(135deg, #2980b9, #4db8d4);
    color: #fff; text-decoration: none;
    padding: 14px 28px; border-radius: 12px;
    font-weight: 600; font-size: 0.95rem;
    box-shadow: 0 4px 24px rgba(41,128,185,0.4);
    transition: transform .2s, box-shadow .2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(41,128,185,0.5); }

  .btn-wa {
    display: inline-flex; align-items: center; gap: 9px;
    background: rgba(37,211,102,0.12); border: 1.5px solid rgba(37,211,102,0.35);
    color: #25D366; text-decoration: none;
    padding: 14px 28px; border-radius: 12px;
    font-weight: 600; font-size: 0.95rem;
    transition: background .2s, transform .2s;
  }
  .btn-wa:hover { background: rgba(37,211,102,0.2); transform: translateY(-2px); }

  /* STATS */
  .stats {
    display: flex; justify-content: center; gap: 48px; flex-wrap: wrap;
    padding: 40px 0; border-top: 1px solid rgba(77,184,212,0.1);
    border-bottom: 1px solid rgba(77,184,212,0.1);
    margin: 0 0 60px;
    animation: fadeUp 0.6s 0.4s ease both;
    position: relative; z-index: 1;
  }
  .stat { text-align: center; }
  .stat-num {
    font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800;
    background: linear-gradient(135deg, #67d5e8, #2980b9);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .stat-label { font-size: 0.8rem; color: var(--text-muted); }

  /* ── CATEGORIES FILTER ── */
  .section-title {
    font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800;
    margin-bottom: 8px;
  }
  .section-sub { color: var(--text-muted); margin-bottom: 28px; font-size: 0.9rem; }

  .filter-wrap {
    display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px;
  }
  .filter-btn {
    padding: 7px 16px; border-radius: 50px;
    background: var(--dark3); border: 1px solid rgba(77,184,212,0.15);
    color: var(--text-muted); cursor: pointer; font-size: 0.82rem;
    transition: all .2s; font-family: inherit;
  }
  .filter-btn:hover, .filter-btn.active {
    background: rgba(77,184,212,0.15); border-color: var(--cyan); color: var(--cyan);
  }

  /* ── SEARCH ── */
  .search-wrap {
    position: relative; max-width: 440px; margin-bottom: 32px;
  }
  .search-wrap input {
    width: 100%; padding: 12px 16px 12px 44px;
    background: var(--dark3); border: 1px solid rgba(77,184,212,0.15);
    border-radius: 12px; color: var(--text); font-size: 0.9rem; font-family: inherit;
    outline: none; transition: border-color .2s;
  }
  .search-wrap input::placeholder { color: var(--text-muted); }
  .search-wrap input:focus { border-color: var(--cyan); }
  .search-icon {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    color: var(--text-muted); pointer-events: none;
  }

  /* ── CATALOG GRID ── */
  .catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .product-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: var(--radius);
    backdrop-filter: blur(8px);
    overflow: hidden;
    transition: transform .25s, box-shadow .25s, border-color .25s;
    display: flex; flex-direction: column;
    animation: fadeUp 0.5s ease both;
  }
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(41,128,185,0.2);
    border-color: rgba(77,184,212,0.35);
  }

  .card-header {
    padding: 20px 20px 14px;
    border-bottom: 1px solid rgba(77,184,212,0.1);
    display: flex; align-items: flex-start; gap: 14px;
  }
  .card-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; flex-shrink: 0;
    background: linear-gradient(135deg, rgba(41,128,185,0.3), rgba(77,184,212,0.2));
  }
  .card-title-wrap { flex: 1; }
  .card-name {
    font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700;
    margin-bottom: 4px; line-height: 1.2;
  }
  .card-type {
    font-size: 0.72rem; color: var(--cyan);
    background: rgba(77,184,212,0.12); border: 1px solid rgba(77,184,212,0.2);
    padding: 2px 8px; border-radius: 50px; display: inline-block;
  }

  .card-body { padding: 16px 20px; flex: 1; }

  .tier {
    display: flex; justify-content: space-between; align-items: center;
    padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .tier:last-child { border-bottom: none; }
  .tier-label { font-size: 0.82rem; color: var(--text-muted); }
  .tier-price {
    font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.95rem;
    color: var(--cyan);
  }

  .card-notes {
    margin-top: 12px; padding-top: 12px;
    border-top: 1px solid rgba(77,184,212,0.08);
  }
  .note-item {
    font-size: 0.78rem; color: var(--text-muted);
    display: flex; align-items: flex-start; gap: 6px; margin-bottom: 3px;
  }
  .note-item::before { content: '✓'; color: var(--cyan); flex-shrink: 0; }

  .card-footer {
    padding: 14px 20px;
    border-top: 1px solid rgba(77,184,212,0.1);
  }
  .btn-order {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 11px;
    background: rgba(37,211,102,0.1); border: 1.5px solid rgba(37,211,102,0.3);
    border-radius: 10px; color: #25D366;
    text-decoration: none; font-weight: 600; font-size: 0.85rem;
    transition: background .2s, transform .15s;
  }
  .btn-order:hover { background: rgba(37,211,102,0.2); transform: scale(1.01); }

  /* HIDDEN */
  .hidden { display: none !important; }

  /* ── INFO SECTION ── */
  .info-section {
    margin: 80px 0 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  @media (max-width: 768px) { .info-section { grid-template-columns: 1fr; } }

  .info-card {
    background: var(--card-bg); border: 1px solid var(--card-border);
    border-radius: var(--radius); padding: 28px; backdrop-filter: blur(8px);
  }
  .info-card h3 {
    font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700;
    margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .info-step {
    display: flex; gap: 14px; align-items: flex-start; margin-bottom: 14px;
  }
  .step-num {
    width: 28px; height: 28px; border-radius: 8px;
    background: linear-gradient(135deg, #2980b9, #4db8d4);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 0.8rem; font-weight: 800;
    flex-shrink: 0;
  }
  .step-text { font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; padding-top: 3px; }

  .rule-item { display: flex; gap: 8px; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 8px; }
  .rule-item span:first-child { flex-shrink: 0; }

  /* ── HOURS BADGE ── */
  .hours-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(41,128,185,0.15); border: 1px solid rgba(77,184,212,0.2);
    color: var(--cyan); padding: 8px 16px; border-radius: 10px;
    font-size: 0.85rem; margin-top: 8px;
  }

  /* ── FOOTER ── */
  footer {
    border-top: 1px solid rgba(77,184,212,0.12);
    padding: 40px 0 30px;
    text-align: center;
    position: relative; z-index: 1;
  }
  footer .footer-logo {
    font-family: 'Syne', sans-serif; font-size: 1.3rem; font-weight: 800;
    background: linear-gradient(135deg, #4db8d4, #2980b9);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
  }
  footer p { color: var(--text-muted); font-size: 0.82rem; }

  /* ── MOBILE ── */
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .hero { padding: 60px 0 50px; }
    .hero h1 { font-size: 2rem; }
    .catalog-grid { grid-template-columns: 1fr; }
    .stats { gap: 28px; }
    .filter-wrap { gap: 6px; }
    .filter-btn { font-size: 0.78rem; padding: 6px 12px; }
  }

  @media (max-width: 480px) {
    .hero-ctas { flex-direction: column; align-items: center; }
    .btn-primary, .btn-wa { width: 100%; max-width: 300px; justify-content: center; }
  }

  /* Floating WA button */
  .float-wa {
    position: fixed; bottom: 24px; right: 24px; z-index: 200;
    width: 56px; height: 56px; border-radius: 50%;
    background: var(--wa-green);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 20px rgba(37,211,102,0.45);
    text-decoration: none; color: #fff;
    transition: transform .2s, box-shadow .2s;
    animation: floatIn 0.5s 0.8s ease both;
  }
  .float-wa:hover { transform: scale(1.1); box-shadow: 0 8px 28px rgba(37,211,102,0.55); }
  @keyframes floatIn { from{opacity:0;transform:scale(0.5)} to{opacity:1;transform:scale(1)} }

  /* Section spacing */
  section { position: relative; z-index: 1; padding: 60px 0 30px; }
  section:first-of-type { padding-top: 0; }
`}</style>

      <header>
        <div className="container header-inner">
          <a href="#" className="logo">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="0" y="0" width="15" height="15" rx="3" fill="#2980b9" />
                <rect x="17" y="0" width="19" height="15" rx="3" fill="url(#g1)" />
                <rect x="0" y="17" width="19" height="19" rx="3" fill="#1a3a5c" />
                <rect x="21" y="17" width="15" height="15" rx="3" fill="#4db8d4" />
                <defs>
                  <linearGradient id="g1" x1="17" y1="0" x2="36" y2="15" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4db8d4" />
                    <stop offset="100%" stopColor="#2980b9" />
                  </linearGradient>
                </defs>
              </svg>
              <span>
                <span className="logo-text">Digitink</span>
                <span className="logo-sub">Solusi Desain Instan & Digital Tools</span>
              </span>
            </div>
          </a>
          <nav className="nav-links">
            <a href="#catalog">Katalog</a>
            <a href="#cara-order">Cara Order</a>
            <a href="#info">Info</a>
            <a href={WA} target="_blank" className="btn-wa-nav"><WhatsappIcon /> Grup WA</a>
          </nav>
        </div>
      </header>

      <div className="container">
        <div className="hero">
          <div className="hero-badge">Toko Digital #1 Terpercaya</div>
          <h1>Supplier<span className="gradient-text">App Prem</span><br />Harga Termurah</h1>
          <p>Ratusan produk digital premium — streaming, AI, desain, produktivitas — dengan harga mulai seribuan. Full Garansi & fast response.</p>
          <div className="hero-ctas">
            <a href="#catalog" className="btn-primary">Lihat Katalog</a>
            <a href={WA} target="_blank" className="btn-wa"><WhatsappIcon /> Gabung Grup</a>
          </div>
        </div>

        <div className="stats">
          <div className="stat"><div className="stat-num">40+</div><div className="stat-label">Produk Tersedia</div></div>
          <div className="stat"><div className="stat-num">24/7</div><div className="stat-label">Garansi Aktif</div></div>
          <div className="stat"><div className="stat-num">Fast</div><div className="stat-label">Proses Order</div></div>
          <div className="stat"><div className="stat-num">100%</div><div className="stat-label">Refund Jika Gagal</div></div>
        </div>
      </div>

      <section id="catalog">
        <div className="container">
          <h2 className="section-title">Katalog Produk</h2>
          <p className="section-sub">Pilih kategori atau cari produk yang kamu butuhkan</p>

          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Cari produk... (contoh: Netflix, Canva)"
              value={currentSearch}
              onChange={(e) => setCurrentSearch(e.target.value)}
            />
          </div>

          <div className="filter-wrap">
            {categories.map(([cat, label]) => (
              <button
                key={cat}
                className={`filter-btn ${currentCat === cat ? "active" : ""}`}
                onClick={() => setCurrentCat(cat)}
              >
                {label}
              </button>
            ))}
          </div>
            {qrImage && (
              <div style={{
                textAlign: "center",
                marginBottom: 30,
                padding: 20,
                border: "1px solid #4db8d4",
                borderRadius: 12
              }}>
                <h3>Scan QR untuk bayar</h3>
                <img src={qrImage} alt="QRIS" style={{ maxWidth: 250 }} />
              </div>
            )}
          <div className="catalog-grid">
            {filteredProducts.length === 0 ? (
              <div style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--text-muted)", padding: "60px 20px", fontSize: "1rem" }}>
                Produk tidak ditemukan 😅<br /><small>Coba kata kunci lain atau hubungi admin</small>
              </div>
            ) : (
              filteredProducts.map((p, i) => (
                <div className="product-card" style={{ animationDelay: `${i * 0.04}s` }} data-cat={p.cat} key={p.id}>
                  <div className="card-header">
                    <div className="card-icon">{p.icon}</div>
                    <div className="card-title-wrap">
                      <div className="card-name">{p.name}</div>
                      <span className="card-type">{p.type}</span>
                    </div>
                  </div>
                  <div className="card-body">
                    {p.tiers.map((t, i) => {
                      const isSelected = selectedTier[p.id]?.label === t.label;

                      return (
                        <div
                          key={t.label}
                          className="tier"
                          style={{
                            cursor: "pointer",
                            background: isSelected ? "rgba(77,184,212,0.15)" : "transparent",
                            borderRadius: 6,
                            padding: "6px"
                          }}
                          onClick={() =>
                            setSelectedTier({
                              ...selectedTier,
                              [p.id]: t
                            })
                          }
                        >
                          <span className="tier-label">{t.label}</span>
                          <span className="tier-price">{t.price}</span>
                        </div>
                      );
                    })}
                    {p.notes?.length > 0 && (
                      <div className="card-notes">
                        {p.notes.map((n) => <div className="note-item" key={`${p.id}-${n}`}>{n}</div>)}
                      </div>
                    )}
                  </div>
                  <div className="card-footer">
                    <button type="button" className="btn-order" onClick={() => orderProduct(p)}>
                      <WhatsappIcon size={15} /> {loading ? "Loading..." : "Bayar Sekarang"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section id="cara-order">
        <div className="container">
          <div className="info-section" id="info">
            <div className="info-card">
              <h3>📌 Cara Order</h3>
              <div className="info-step"><div className="step-num">1</div><div className="step-text">Pilih produk di katalog.</div></div>
              <div className="info-step"><div className="step-num">2</div><div className="step-text">Klik Order via WA atau nanti bisa disambungkan ke QRIS otomatis.</div></div>
              <div className="info-step"><div className="step-num">3</div><div className="step-text">Selesaikan pembayaran dan tunggu produk dikirim.</div></div>
              <div className="hours-badge">⏰ Jam Operasional: 08.00–23.00 WIB</div>
              <br />
              <a href={ADMIN} target="_blank" className="btn-order" style={{ marginTop: 4 }}><WhatsappIcon /> Chat Admin Langsung</a>
            </div>

            <div className="info-card">
              <h3>⚠️ Rules Grup</h3>
              <div className="rule-item"><span>🚫</span><span>Dilarang komplain di grup — langsung WA admin</span></div>
              <div className="rule-item"><span>🚫</span><span>Dilarang share konten SARA / 18+</span></div>
              <div className="rule-item"><span>🚫</span><span>Dilarang promosi / sebut grup di Story</span></div>
              <div className="rule-item"><span>🚫</span><span>Dilarang jualan pribadi / PC member</span></div>
              <div className="rule-item"><span>🚫</span><span>Refund hanya jika kesalahan dari kami</span></div>
              <div className="rule-item"><span>⚠️</span><span>Keluar grup / melanggar aturan = garansi hangus</span></div>
              <br />
              <a href={WA} target="_blank" className="btn-order"><WhatsappIcon /> Gabung Grup WA</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-logo">Digitink Store</div>
          <p>Solusi Desain Instan & Digital Tools</p>
          <p style={{ marginTop: 6 }}>© 2026 Digitink · <a href={ADMIN} style={{ color: "var(--cyan)", textDecoration: "none" }}>wa.me/628818116553</a></p>
        </div>
      </footer>

      <a href={WA} target="_blank" className="float-wa" title="Gabung Grup WA"><WhatsappIcon size={26} /></a>
    </>
  );
}
