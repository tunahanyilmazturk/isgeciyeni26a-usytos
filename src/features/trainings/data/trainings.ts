export type TrainingPackage = 'Temel Paket' | 'Sektör Paketi'
export type TrainingRisk = 'Az Tehlikeli' | 'Tehlikeli' | 'Çok Tehlikeli'

export interface TrainingChapter {
  id: string
  title: string
  topics: string[]
}

export interface Training {
  id: string
  name: string
  package: TrainingPackage
  risk: TrainingRisk
  description: string
  chapters: TrainingChapter[]
}

// Temel paket — 3 ana bölüm (Genel, Sağlık, Teknik)
const baseChapters: TrainingChapter[] = [
  {
    id: 'general',
    title: '1. Genel Konular',
    topics: [
      'a) Çalışma mevzuatı ile ilgili bilgiler',
      'b) Çalışanların yasal hak ve sorumlulukları',
      'c) İşyeri temizliği ve düzeni',
      'ç) İş kazası ve meslek hastalığından doğan hukuki sonuçlar',
    ],
  },
  {
    id: 'health',
    title: '2. Sağlık Konuları',
    topics: [
      'a) Meslek hastalıklarının sebepleri',
      'b) Hastalıktan korunma prensipleri ve korunma tekniklerinin uygulanması',
      'c) Biyolojik ve psikososyal risk etmenleri',
      'ç) İlk yardım',
      'd) Bağımlılık yapıcı maddelerin zararları ve teknoloji bağımlılığı',
    ],
  },
  {
    id: 'technical',
    title: '3. Teknik Konular',
    topics: [
      'a) Kimyasal, fiziksel ve ergonomik risk etmenleri',
      'b) Elle kaldırma ve taşıma',
      'c) Parlama, patlama',
      'ç) Yangın ve yangından korunma',
      'd) İş ekipmanlarının güvenli kullanımı',
      'e) Ekranlı araçlarla çalışma',
      'f) Elektrik, tehlikeleri, riskleri ve önlemleri',
      'g) İş kazalarının sebepleri ve korunma prensipleri ile tekniklerinin uygulanması',
      'ğ) Sağlık ve güvenlik işaretleri',
      'h) Kişisel koruyucu donanım kullanımı',
      'ı) İş sağlığı ve güvenliği genel kuralları ve güvenlik kültürü',
      'i) Acil durumlar, tahliye ve kurtarma',
    ],
  },
]

const baseTemplates: Array<{ id: string; name: string; risk: TrainingRisk; description: string }> = [
  { id: 'base-low', name: 'Az Tehlikeli', risk: 'Az Tehlikeli', description: 'Az tehlikeli işyerlerinde çalışanlar için temel iş sağlığı ve güvenliği eğitimi.' },
  { id: 'base-high', name: 'Çok Tehlikeli', risk: 'Çok Tehlikeli', description: 'Yüksek riskli işyerlerinde güvenli çalışma kültürünü güçlendiren temel eğitim.' },
  { id: 'base-medium', name: 'Tehlikeli', risk: 'Tehlikeli', description: 'Tehlikeli sınıftaki işyerleri için kapsamlı temel İSG eğitimi.' },
  { id: 'repeat-low', name: 'Az Tehlikeli Tekrar Eğitimi', risk: 'Az Tehlikeli', description: 'Az tehlikeli işyerleri için yenileme ve farkındalık eğitimi.' },
  { id: 'repeat-medium', name: 'Tehlikeli Tekrar Eğitimi', risk: 'Tehlikeli', description: 'Tehlikeli sınıftaki çalışanların bilgilerini tazeleyen tekrar eğitimi.' },
  { id: 'repeat-high', name: 'Çok Tehlikeli Tekrar Eğitimi', risk: 'Çok Tehlikeli', description: 'Çok tehlikeli işyerlerinde kritik güvenlik bilgilerini yenileyen eğitim.' },
  { id: 'orientation', name: 'İşe Başlangıç İSG Eğitimi', risk: 'Az Tehlikeli', description: 'Yeni başlayan çalışanların ilk gün güvenlik ihtiyaçlarını karşılayan kısa program.' },
  { id: 'emergency', name: 'Acil Durum ve Tahliye Eğitimi', risk: 'Tehlikeli', description: 'Acil durum, tahliye ve toplanma süreçlerine hazırlık eğitimi.' },
  { id: 'safety-culture', name: 'Güvenlik Kültürü Farkındalık Eğitimi', risk: 'Çok Tehlikeli', description: 'Güvenli davranışları ve çalışan katılımını kalıcı hale getiren farkındalık eğitimi.' },
]

const sectorTemplates: Array<{ id: string; name: string; risk: TrainingRisk; topics: string[] }> = [
  {
    id: 'office',
    name: 'Ofis - İşe ve işyerine özgü',
    risk: 'Az Tehlikeli',
    topics: [
      'a) Elle Taşıma, Yük Kaldırma ve Yüksekte Çalışma',
      'b) Ofis Araç ve Gereçlerinin Güvenli Kullanımı',
      'c) Ofisteki Kimyasal Riskler ve Alerjik Hastalıklar',
      'ç) Aydınlatma, Gürültü ve Termal Konfor (Çevresel Faktörler)',
      'd) İşyeri Dışında Yürütülen Çalışmalar ve Trafik Güvenliği',
      'e) Ofislerde Yangın Güvenliği',
      'f) Ofis Ergonomisi',
      'g) Ekran Sağlığı',
      'ğ) Ofis Acil Durum Rehberi',
      'h) Mola Yönetimi ve Verimlilik',
      'ı) Klima, Havalandırma ve Kapalı Ortam Sağlığı',
      'i) Mobbing ve İş Yerinde Saygılı Davranış',
      'j) Gizli Tehlikeler',
      'k) Ofiste İSG Genel Tekrar',
    ],
  },
  {
    id: 'retail',
    name: 'Perakende ve Mağaza - İşe ve işyerine özgü',
    risk: 'Az Tehlikeli',
    topics: [
      'a) Raf ve İstifleme Güvenliği',
      'b) Reyon Düzenleme Sırasında Güvenli Çalışma',
      'c) Mağazada Güvenli Çalışma Rehberi',
      'ç) Taşınabilir Merdiven Güvenliği',
      'd) Alışverişte Güvenlik',
      'e) Kayma, Takılma ve Düşmeler',
      'f) Elle Taşıma Güvenli Teknikler',
      'g) Kesici ve Delici Aletlerle Güvenli Çalışma (Maket Bıçağı Kullanımı)',
      'ğ) Yürüyen Merdiven Güvenliği',
      'h) Ekranlı Araçlarla Çalışma ve Kasa Ergonomisi',
      'ı) Depo İçi Trafik, Forklift ve Transpalet Güvenliği',
      'j) Ayakta Çalışma - Sağlık Rehberi',
      'k) Perakendede Yangın Güvenliği',
    ],
  },
  {
    id: 'hotel',
    name: 'Otel - İşe ve işyerine özgü',
    risk: 'Az Tehlikeli',
    topics: [
      'a) Otel Çalışanları İçin İSG',
      'b) Kat Hizmetlerinde İş Güvenliği',
      'c) Misafir Alanlarında Güvenlik ve Hizmet Riskleri',
      'ç) Elle Yük Kaldırma ve Bagaj Taşıma Eğitimi',
      'd) Kayma, Takılma ve Düşme Riskleri',
      'e) Elektrik Güvenliği ve Priz Kullanımı',
      'f) Yangın ve Tahliye Eğitimi',
      'g) Acil Durum Yönetimi Eğitimi',
      'ğ) Kimyasal Temizlik Maddelerinin Güvenli Kullanımı',
      'h) Havuz ve Islak Alan Güvenliği',
      'ı) Mutfak ve Restoran Alanlarında Güvenlik',
      'i) Psikososyal Riskler ve Yoğun Sezon Stresi',
      'j) Resepsiyon ve Ön Büro Güvenliği',
      'k) Güvenlik Kültürü ve Farkındalık',
      'l) İlk Yardım ve Yaralanmalarda İlk Müdahale',
      'm) Biyolojik Riskler ve Lejyoner Hastalığı',
      'n) Çamaşırhane ve Kuru Temizleme Güvenliği',
      'o) Yüksekte Çalışma Güvenliği',
      'ö) Fiziksel Risk Etmenleri ve Ofis Ergonomisi',
      'p) Otel Teknik Alanlar İsg Kuralları',
    ],
  },
  {
    id: 'call-center',
    name: 'Çağrı Merkezi - İşe ve işyerine özgü',
    risk: 'Az Tehlikeli',
    topics: [
      'a) Çağrı Merkezlerinde İş Sağlığı ve Güvenliği',
      'b) Ekranlı Araçlarla Çalışma ve Ergonomi',
      'c) Uzun Süre Oturarak Çalışma Riskleri',
      'ç) Elektrik Güvenliği ve Priz Kullanımı',
      'd) Göz Yorgunluğunu Önleme (Ekran Başında Sağlıklı Görüş Eğitimi)',
      'e) Klima Kullanımı ve Ortam Hava Kalitesi',
      'f) Mola Yönetimi ve Verimli Çalışma',
      'g) Yangın ve Tahliye',
      'ğ) İş Yükü Kaynaklı Stres',
      'h) Psikososyal Riskler ve Firma Tacizi',
      'ı) Uzaktan (Evden) Çalışmada İş Sağlığı ve Güvenliği',
      'i) Biyolojik Riskler, Ofis Hijyeni ve Hasta Bina Sendromu',
      'j) Akustik Şok ve İleri İşitme Sorunları',
      'k) Elektromanyetik Alan (EMA) Maruziyeti',
    ],
  },
  {
    id: 'restaurant',
    name: 'Restoran ve Lokanta - İşe ve işyerine özgü',
    risk: 'Az Tehlikeli',
    topics: [
      'a) Mutfakta İş Sağlığı ve Güvenliği',
      'b) Mutfakta Bıçak Güvenliği',
      'c) Sıcak Ekipman Güvenliği',
      'ç) Mutfaklarda Kaza Önleme',
      'd) Mutfakta Elektrik Güvenliği',
      'e) Kaygan Zemin',
      'f) Çapraz Bulaşmayı Önleme',
      'g) Soğuk Hava Deposu Güvenliği',
      'ğ) Ticari Mutfaklar Yangın ve Tahliye',
      'h) Temizlik Kimyasalları Rehberi',
      'ı) Stres ve Psikososyal Riskler',
      'i) Acil Durum',
      'j) Güvenli Servis Eğitimi',
      'k) Endüstriyel Mutfak Güvenliği',
      'l) Ergonomi ve Güvenli Taşıma',
      'm) Yüksekte Güvenli Çalışma',
      'n) Yemek Kuryesi Riskleri',
      'o) Bulaşıkhane İş Güvenliği',
      'ö) Gürültü ve Termal Konfor',
    ],
  },
  {
    id: 'cargo',
    name: 'Kargo Aktarma Merkezi - İşe ve işyerine özgü',
    risk: 'Az Tehlikeli',
    topics: [
      '1. Vardiyalı Çalışma, Gece Çalışması ve Yorgunluk Yönetimi',
      '2. Konveyör Bant ve Otomatik Ayırma Sistemlerinde Güvenlik',
      '3. Elle Yük Kaldırma ve Kargo Taşıma Teknikleri',
      '4. Forklift, Transpalet ve İstif Ekipmanları Güvenliği',
      '5. Kayma, Takılma ve Düşme Riskleri',
      '6. Psikososyal Riskler, İş Stresi ve Yoğun Dönem Yönetimi',
      '7. Yükleme-Boşaltma Alanlarında Güvenli Çalışma',
      '8. Elektrik Güvenliği ve Endüstriyel Ekipman Kullanımı',
      '9. Yangın, Acil Durum ve Tahliye Uygulamaları',
      '10. Kargo Aktarma Merkezlerinde İSG Genel Kuralları',
    ],
  },
  {
    id: 'manufacturing',
    name: 'Üretim Tesisi - İşe ve işyerine özgü',
    risk: 'Tehlikeli',
    topics: [
      'a) Makine ve ekipman güvenliği',
      'b) Üretimde kimyasal risklerin yönetimi',
      'c) Kesme, sıkışma ve ezilme riskleri',
      'ç) Bakım çalışmalarında kilitleme-etiketleme',
      'd) Üretim alanlarında acil durum',
    ],
  },
  {
    id: 'logistics',
    name: 'Lojistik ve Depo - İşe ve işyerine özgü',
    risk: 'Tehlikeli',
    topics: [
      'a) Depo içi trafik güvenliği',
      'b) Yükleme ve boşaltma operasyonları',
      'c) Raf sistemleri ve istifleme',
      'ç) Elle taşıma ve ergonomik riskler',
      'd) Sevkiyat alanlarında yangın güvenliği',
    ],
  },
  {
    id: 'healthcare',
    name: 'Sağlık Hizmetleri - İşe ve işyerine özgü',
    risk: 'Çok Tehlikeli',
    topics: [
      'a) Biyolojik riskler ve enfeksiyon kontrolü',
      'b) Kesici-delici tıbbi ekipman güvenliği',
      'c) Hasta taşıma ve ergonomi',
      'ç) Kimyasal maddeler ve ilaç güvenliği',
      'd) Acil durum ve tahliye uygulamaları',
    ],
  },
]

export const trainingCatalog: readonly Training[] = [
  ...baseTemplates.map((template) => ({ ...template, package: 'Temel Paket' as const, chapters: baseChapters.map((chapter) => ({ ...chapter, topics: [...chapter.topics] })) })),
  ...sectorTemplates.map((template) => ({ id: template.id, name: template.name, package: 'Sektör Paketi' as const, risk: template.risk, description: `${template.name} çalışanları için işe ve işyerine özgü riskleri kapsayan uygulamalı eğitim.`, chapters: [{ id: `${template.id}-chapter`, title: template.name, topics: [...template.topics] }] })),
]
