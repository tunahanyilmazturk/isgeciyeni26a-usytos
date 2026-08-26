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

const baseChapters: TrainingChapter[] = [
  { id: 'general', title: '1. Genel konular', topics: ['Çalışma mevzuatı ile ilgili bilgiler', 'Çalışanların yasal hak ve sorumlulukları', 'İşyeri temizliği ve düzeni', 'İş kazası ve meslek hastalığından doğan hukuki sonuçlar'] },
  { id: 'health', title: '2. Sağlık konuları', topics: ['Meslek hastalıklarının sebepleri', 'Hastalıktan korunma prensipleri ve korunma teknikleri', 'Biyolojik ve psikososyal risk etmenleri', 'İlk yardım'] },
  { id: 'technical', title: '3. Teknik konular', topics: ['Kimyasal, fiziksel ve ergonomik risk etmenleri', 'Elle kaldırma ve taşıma', 'Parlama, patlama, yangın ve yangından korunma', 'İş ekipmanlarının güvenli kullanımı', 'Ekranlı araçlarla çalışma', 'Elektrik tehlikeleri, riskleri ve önlemleri', 'Sağlık ve güvenlik işaretleri', 'Kişisel koruyucu donanım kullanımı', 'İSG genel kuralları ve güvenlik kültürü', 'Acil durumlar, tahliye ve kurtarma'] },
]

const baseTemplates: Array<{ id: string; name: string; risk: TrainingRisk; description: string }> = [
  { id: 'base-low', name: 'Az Tehlikeli İSG Temel Eğitimi', risk: 'Az Tehlikeli', description: 'Az tehlikeli işyerlerinde çalışanlar için temel iş sağlığı ve güvenliği eğitimi.' },
  { id: 'base-medium', name: 'Tehlikeli İSG Temel Eğitimi', risk: 'Tehlikeli', description: 'Tehlikeli sınıftaki işyerleri için kapsamlı temel İSG eğitimi.' },
  { id: 'base-high', name: 'Çok Tehlikeli İSG Temel Eğitimi', risk: 'Çok Tehlikeli', description: 'Yüksek riskli işyerlerinde güvenli çalışma kültürünü güçlendiren temel eğitim.' },
  { id: 'repeat-low', name: 'Az Tehlikeli Tekrar Eğitimi', risk: 'Az Tehlikeli', description: 'Az tehlikeli işyerleri için yenileme ve farkındalık eğitimi.' },
  { id: 'repeat-medium', name: 'Tehlikeli Tekrar Eğitimi', risk: 'Tehlikeli', description: 'Tehlikeli sınıftaki çalışanların bilgilerini tazeleyen tekrar eğitimi.' },
  { id: 'repeat-high', name: 'Çok Tehlikeli Tekrar Eğitimi', risk: 'Çok Tehlikeli', description: 'Çok tehlikeli işyerlerinde kritik güvenlik bilgilerini yenileyen eğitim.' },
  { id: 'orientation', name: 'İşe Başlangıç İSG Eğitimi', risk: 'Az Tehlikeli', description: 'Yeni başlayan çalışanların ilk gün güvenlik ihtiyaçlarını karşılayan kısa program.' },
  { id: 'emergency', name: 'Acil Durum ve Tahliye Eğitimi', risk: 'Tehlikeli', description: 'Acil durum, tahliye ve toplanma süreçlerine hazırlık eğitimi.' },
  { id: 'safety-culture', name: 'Güvenlik Kültürü Farkındalık Eğitimi', risk: 'Çok Tehlikeli', description: 'Güvenli davranışları ve çalışan katılımını kalıcı hale getiren farkındalık eğitimi.' },
]

const sectorTemplates: Array<{ id: string; name: string; risk: TrainingRisk; topics: string[] }> = [
  { id: 'office', name: 'Ofis — İşe ve işyerine özgü', risk: 'Az Tehlikeli', topics: ['Elle taşıma, yük kaldırma ve yüksekte çalışma', 'Ofis araç ve gereçlerinin güvenli kullanımı', 'Aydınlatma, gürültü ve termal konfor', 'Ekranlı araçlarla çalışma ve ofis ergonomisi', 'Ofis acil durum rehberi'] },
  { id: 'retail', name: 'Perakende ve Mağaza — İşe ve işyerine özgü', risk: 'Az Tehlikeli', topics: ['Raf ve istifleme güvenliği', 'Reyon düzenleme sırasında güvenli çalışma', 'Kayma, takılma ve düşmeler', 'Kesici ve delici aletlerle güvenli çalışma', 'Perakendede yangın güvenliği'] },
  { id: 'hotel', name: 'Otel — İşe ve işyerine özgü', risk: 'Az Tehlikeli', topics: ['Kat hizmetlerinde iş güvenliği', 'Misafir alanlarında güvenlik ve hizmet riskleri', 'Kimyasal temizlik maddelerinin güvenli kullanımı', 'Mutfak ve restoran alanlarında güvenlik', 'Biyolojik riskler ve hijyen'] },
  { id: 'call-center', name: 'Çağrı Merkezi — İşe ve işyerine özgü', risk: 'Az Tehlikeli', topics: ['Ekranlı araçlarla çalışma ve ergonomi', 'Uzun süre oturarak çalışma riskleri', 'Akustik şok ve işitme sağlığı', 'Psikososyal riskler ve müşteri tacizi', 'Mola yönetimi ve verimli çalışma'] },
  { id: 'restaurant', name: 'Restoran ve Lokanta — İşe ve işyerine özgü', risk: 'Az Tehlikeli', topics: ['Mutfakta iş sağlığı ve güvenliği', 'Mutfakta bıçak ve sıcak ekipman güvenliği', 'Kaygan zemin ve düşme riskleri', 'Temizlik kimyasalları rehberi', 'Ticari mutfaklarda yangın ve tahliye'] },
  { id: 'cargo', name: 'Kargo Aktarma Merkezi — İşe ve işyerine özgü', risk: 'Az Tehlikeli', topics: ['Vardiyalı çalışma ve yorgunluk yönetimi', 'Konveyör bant ve otomatik ayırma sistemleri', 'Forklift, transpalet ve istif ekipmanları', 'Yükleme-boşaltma alanlarında güvenli çalışma', 'Kargo aktarma merkezlerinde acil durum'] },
  { id: 'manufacturing', name: 'Üretim Tesisi — İşe ve işyerine özgü', risk: 'Tehlikeli', topics: ['Makine ve ekipman güvenliği', 'Üretimde kimyasal risklerin yönetimi', 'Kesme, sıkışma ve ezilme riskleri', 'Bakım çalışmalarında kilitleme-etiketleme', 'Üretim alanlarında acil durum'] },
  { id: 'logistics', name: 'Lojistik ve Depo — İşe ve işyerine özgü', risk: 'Tehlikeli', topics: ['Depo içi trafik güvenliği', 'Yükleme ve boşaltma operasyonları', 'Raf sistemleri ve istifleme', 'Elle taşıma ve ergonomik riskler', 'Sevkiyat alanlarında yangın güvenliği'] },
  { id: 'healthcare', name: 'Sağlık Hizmetleri — İşe ve işyerine özgü', risk: 'Çok Tehlikeli', topics: ['Biyolojik riskler ve enfeksiyon kontrolü', 'Kesici-delici tıbbi ekipman güvenliği', 'Hasta taşıma ve ergonomi', 'Kimyasal maddeler ve ilaç güvenliği', 'Acil durum ve tahliye uygulamaları'] },
]

export const trainingCatalog: readonly Training[] = [
  ...baseTemplates.map((template) => ({ ...template, package: 'Temel Paket' as const, chapters: baseChapters.map((chapter) => ({ ...chapter, topics: [...chapter.topics] })) })),
  ...sectorTemplates.map((template) => ({ id: template.id, name: template.name, package: 'Sektör Paketi' as const, risk: template.risk, description: `${template.name} çalışanları için işe ve işyerine özgü riskleri kapsayan uygulamalı eğitim.`, chapters: [{ id: `${template.id}-chapter`, title: template.name, topics: [...template.topics] }] })),
]
