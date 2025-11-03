import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.collections': 'Collections',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.faq': 'FAQ',
    'nav.consultation': 'Consultation',
    'nav.contact': 'Contact',
    'hero.text': "Our furniture is more than wood and craft; it's a space where memories grow, beauty endures, and your vision comes to life.",
    'collections.title': 'Curated Collections',
    'collections.subtitle': 'Discover our handpicked selections, each piece a testament to timeless design and exceptional craftsmanship',
    'collections.view': 'View Collection',
    'products.title': 'Your Next Spectacular Piece Awaits',
    'products.subtitle': 'Indulge in timeless grace.',
    'products.all': 'All',
    'products.viewDetails': 'View Details',
    'products.addToCart': 'Add to Cart',
    'products.buyNow': 'Buy Now',
    'products.added': 'Added!',
    'products.pieces': 'pieces',
    'products.piece': 'piece',
    'products.relatedProducts': 'Related Products',
    'products.imageComingSoon': 'Image coming soon',
    'products.noImage': 'No image',
    'products.productDetails': 'Product Details',
    'about.title': 'The Art of Fine Living',
    'about.subtitle': 'We specialize in creating timeless furniture pieces that blend traditional craftsmanship with modern design sensibilities',
    'about.craftsmanship.title': 'Expert Craftsmanship',
    'about.craftsmanship.desc': 'Each piece is handcrafted by skilled artisans using traditional techniques passed down through generations in Jepara',
    'about.materials.title': 'Premium Materials',
    'about.materials.desc': 'We use only the finest Perhutani teak wood, known for its durability, beauty, and resistance to the elements',
    'about.custom.title': 'Custom Designs',
    'about.custom.desc': 'Every project is unique. We offer full customization of model, size, and finishing to match your vision perfectly',
    'about.philosophy.title': 'Our Design Philosophy',
    'about.minimalism.title': 'Modern Minimalism',
    'about.minimalism.desc': 'Clean lines and functional designs that complement contemporary living spaces',
    'about.vintage.title': 'Vintage Charm',
    'about.vintage.desc': 'Classic pieces that evoke nostalgia while remaining timeless in appeal',
    'about.japanese.title': 'Japanese Influence',
    'about.japanese.desc': 'Minimalist aesthetics inspired by Japanese design principles',
    'about.indoor.title': 'Indoor & Outdoor',
    'about.indoor.desc': 'Versatile furniture suitable for both interior and exterior spaces',
    'faq.title': 'Questions & Answers',
    'faq.subtitle': 'Everything you need to know about our furniture and services',
    'faq.q1': 'What materials do you use?',
    'faq.a1': 'We exclusively use premium Perhutani teak wood, known for its exceptional durability, natural beauty, and weather resistance. Some pieces also incorporate high-quality rattan for added texture and visual interest.',
    'faq.q2': 'How long does production take?',
    'faq.a2': 'Production typically takes 15-30 days, depending on the complexity of the design and our current order queue. Custom pieces may require additional time for consultation and approval of design specifications.',
    'faq.q3': 'Can I customize the furniture?',
    'faq.a3': 'Absolutely! We welcome custom orders. You can specify your preferred model, dimensions, finishing color, and fabric choices. Our team will work closely with you to bring your vision to life.',
    'faq.q4': 'Do you ship internationally?',
    'faq.a4': 'We currently ship throughout Indonesia via truck or pick-up service for larger items, and JNE for smaller pieces. For international shipping inquiries, please contact our admin team to discuss options and costs.',
    'faq.q5': 'What about shipping costs?',
    'faq.a5': 'Shipping costs are calculated separately based on your location and the size of your order. Please contact our admin team for accurate delivery fee quotes. We use trusted logistics partners to ensure safe delivery.',
    'faq.q6': 'Is there a warranty on the furniture?',
    'faq.a6': 'Yes, all our pieces come with a quality guarantee. We stand behind our craftsmanship and will address any manufacturing defects. Please discuss warranty details with us when placing your order.',
    'consultation.title': 'Craft Your Dream Piece',
    'consultation.subtitle': 'Share your vision with us. Our artisans are ready to bring your ideas to life.',
    'consultation.firstName': 'First Name',
    'consultation.lastName': 'Last Name',
    'consultation.email': 'Email',
    'consultation.phone': 'Phone Number',
    'consultation.vision': 'Your Vision',
    'consultation.visionPlaceholder': 'Tell us about your dream furniture piece...',
    'consultation.submit': 'Submit Your Vision',
    'consultation.sending': 'Sending Your Vision...',
    'consultation.thankYou': 'Thank You!',
    'consultation.received': 'Your vision has been received — we\'ll craft something extraordinary.',
    'consultation.response': 'We typically respond within 24 hours',
    'consultation.required': '*',
    'footer.tagline': 'Handcrafted teak wood furniture from Jepara, Indonesia. Timeless elegance meets expert craftsmanship.',
    'footer.quickLinks': 'Quick Links',
    'footer.connect': 'Connect With Us',
    'footer.rights': 'All rights reserved.',
    'footer.poweredBy': 'Powered by',
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyDesc': 'Add some beautiful furniture to get started',
    'cart.total': 'Total',
    'cart.complete': 'Complete Order via WhatsApp',
    'cart.contactNote': 'Contact us to finalize your purchase and discuss shipping',
    'cart.loading': 'Loading beautiful furniture...',
    'categories.patio': 'Patio chairs',
    'categories.tv': 'TV console',
    'categories.bed': 'Sleeping cot',
    'categories.guestsofa': 'Sofa for guest',
    'categories.sofa': 'Sofa',
    'categories.dining': 'Dining chairs',
    'categories.cabinet': 'Small table cupboard',
    'categories.cafe': 'Cafe chairs',
  },
  id: {
    'nav.home': 'Beranda',
    'nav.collections': 'Koleksi',
    'nav.products': 'Produk',
    'nav.about': 'Tentang',
    'nav.faq': 'FAQ',
    'nav.consultation': 'Konsultasi',
    'nav.contact': 'Kontak',
    'hero.text': 'Furnitur kami lebih dari sekadar kayu dan kerajinan; ini adalah ruang di mana kenangan tumbuh, keindahan bertahan, dan visi Anda menjadi nyata.',
    'collections.title': 'Koleksi Pilihan',
    'collections.subtitle': 'Temukan pilihan terbaik kami, setiap karya adalah bukti desain abadi dan keahlian yang luar biasa',
    'collections.view': 'Lihat Koleksi',
    'products.title': 'Karya Spektakuler Anda Menanti',
    'products.subtitle': 'Nikmati keanggunan abadi.',
    'products.all': 'Semua',
    'products.viewDetails': 'Lihat Detail',
    'products.addToCart': 'Tambah ke Keranjang',
    'products.buyNow': 'Beli Sekarang',
    'products.added': 'Ditambahkan!',
    'products.pieces': 'karya',
    'products.piece': 'karya',
    'products.relatedProducts': 'Produk Terkait',
    'products.imageComingSoon': 'Gambar segera hadir',
    'products.noImage': 'Tidak ada gambar',
    'products.productDetails': 'Detail Produk',
    'about.title': 'Seni Kehidupan yang Berkualitas',
    'about.subtitle': 'Kami mengkhususkan diri dalam menciptakan furnitur abadi yang memadukan keahlian tradisional dengan sensibilitas desain modern',
    'about.craftsmanship.title': 'Keahlian Ahli',
    'about.craftsmanship.desc': 'Setiap karya dibuat dengan tangan oleh pengrajin terampil menggunakan teknik tradisional yang diturunkan dari generasi ke generasi di Jepara',
    'about.materials.title': 'Material Premium',
    'about.materials.desc': 'Kami hanya menggunakan kayu jati Perhutani terbaik, terkenal karena daya tahan, keindahan, dan ketahanan terhadap cuaca',
    'about.custom.title': 'Desain Khusus',
    'about.custom.desc': 'Setiap proyek adalah unik. Kami menawarkan kustomisasi penuh untuk model, ukuran, dan finishing agar sesuai dengan visi Anda dengan sempurna',
    'about.philosophy.title': 'Filosofi Desain Kami',
    'about.minimalism.title': 'Minimalisme Modern',
    'about.minimalism.desc': 'Garis bersih dan desain fungsional yang melengkapi ruang hidup kontemporer',
    'about.vintage.title': 'Pesona Vintage',
    'about.vintage.desc': 'Karya klasik yang membangkitkan nostalgia sambil tetap abadi dalam daya tariknya',
    'about.japanese.title': 'Pengaruh Jepang',
    'about.japanese.desc': 'Estetika minimalis yang terinspirasi oleh prinsip desain Jepang',
    'about.indoor.title': 'Dalam & Luar Ruangan',
    'about.indoor.desc': 'Furnitur serbaguna yang cocok untuk ruang interior dan eksterior',
    'faq.title': 'Tanya & Jawab',
    'faq.subtitle': 'Semua yang perlu Anda ketahui tentang furnitur dan layanan kami',
    'faq.q1': 'Material apa yang Anda gunakan?',
    'faq.a1': 'Kami secara eksklusif menggunakan kayu jati Perhutani premium, dikenal karena daya tahannya yang luar biasa, keindahan alami, dan ketahanan cuaca. Beberapa karya juga menggabungkan rotan berkualitas tinggi untuk menambah tekstur dan daya tarik visual.',
    'faq.q2': 'Berapa lama waktu produksi?',
    'faq.a2': 'Produksi biasanya memakan waktu 15-30 hari, tergantung pada kompleksitas desain dan antrean pesanan kami saat ini. Karya khusus mungkin memerlukan waktu tambahan untuk konsultasi dan persetujuan spesifikasi desain.',
    'faq.q3': 'Bisakah saya menyesuaikan furnitur?',
    'faq.a3': 'Tentu saja! Kami menerima pesanan khusus. Anda dapat menentukan model, dimensi, warna finishing, dan pilihan kain yang Anda inginkan. Tim kami akan bekerja sama dengan Anda untuk mewujudkan visi Anda.',
    'faq.q4': 'Apakah Anda mengirim ke luar negeri?',
    'faq.a4': 'Saat ini kami mengirim ke seluruh Indonesia melalui layanan truk atau pick-up untuk barang yang lebih besar, dan JNE untuk barang yang lebih kecil. Untuk pertanyaan pengiriman internasional, silakan hubungi tim admin kami untuk membahas opsi dan biaya.',
    'faq.q5': 'Bagaimana dengan biaya pengiriman?',
    'faq.a5': 'Biaya pengiriman dihitung secara terpisah berdasarkan lokasi Anda dan ukuran pesanan Anda. Silakan hubungi tim admin kami untuk kutipan biaya pengiriman yang akurat. Kami menggunakan mitra logistik terpercaya untuk memastikan pengiriman yang aman.',
    'faq.q6': 'Apakah ada garansi untuk furnitur?',
    'faq.a6': 'Ya, semua karya kami dilengkapi dengan jaminan kualitas. Kami menjaga keahlian kami dan akan mengatasi cacat manufaktur apa pun. Silakan diskusikan detail garansi dengan kami saat melakukan pemesanan.',
    'consultation.title': 'Ciptakan Karya Impian Anda',
    'consultation.subtitle': 'Bagikan visi Anda dengan kami. Pengrajin kami siap mewujudkan ide Anda.',
    'consultation.firstName': 'Nama Depan',
    'consultation.lastName': 'Nama Belakang',
    'consultation.email': 'Email',
    'consultation.phone': 'Nomor Telepon',
    'consultation.vision': 'Visi Anda',
    'consultation.visionPlaceholder': 'Ceritakan kepada kami tentang karya furnitur impian Anda...',
    'consultation.submit': 'Kirim Visi Anda',
    'consultation.sending': 'Mengirim Visi Anda...',
    'consultation.thankYou': 'Terima Kasih!',
    'consultation.received': 'Visi Anda telah diterima — kami akan menciptakan sesuatu yang luar biasa.',
    'consultation.response': 'Kami biasanya merespons dalam 24 jam',
    'consultation.required': '*',
    'footer.tagline': 'Furnitur kayu jati buatan tangan dari Jepara, Indonesia. Keanggunan abadi bertemu keahlian ahli.',
    'footer.quickLinks': 'Tautan Cepat',
    'footer.connect': 'Hubungi Kami',
    'footer.rights': 'Semua hak dilindungi.',
    'footer.poweredBy': 'Didukung oleh',
    'cart.title': 'Keranjang Anda',
    'cart.empty': 'Keranjang Anda kosong',
    'cart.emptyDesc': 'Tambahkan furnitur indah untuk memulai',
    'cart.total': 'Total',
    'cart.complete': 'Selesaikan Pesanan via WhatsApp',
    'cart.contactNote': 'Hubungi kami untuk menyelesaikan pembelian dan membahas pengiriman',
    'cart.loading': 'Memuat furnitur indah...',
    'categories.patio': 'Kursi Teras',
    'categories.tv': 'Meja TV',
    'categories.bed': 'Tempat Tidur',
    'categories.guestsofa': 'Sofa Tamu',
    'categories.sofa': 'Sofa',
    'categories.dining': 'Kursi Makan',
    'categories.cabinet': 'Lemari Kecil',
    'categories.cafe': 'Kursi Kafe',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('site-language');
    return (stored === 'id' ? 'id' : 'en') as Language;
  });

  useEffect(() => {
    localStorage.setItem('site-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'id' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
