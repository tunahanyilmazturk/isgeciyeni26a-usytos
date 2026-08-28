import { nanoid } from '@/lib/utils'
import { addTraining, readTrainings, saveTrainings, type ContentItem, type Question, type Slide, type Training, type TrainingModule, type TrainingRisk } from './trainings'

const trainingVisualById: Record<string, string> = {
  'temel-is-guvenligi': '/assets/training-temel-isg-v2.png',
  'yangin-egitimi-ve-tatbikati': '/assets/training-yangin-v2.png',
  'yuksekte-calisma': '/assets/training-yuksekte-calisma-v2.png',
  'kimyasal-maddelerle-calisma': '/assets/training-kimyasal-v2.png',
  'is-ekipmanlarinin-guvenli-kullanimi': '/assets/training-is-ekipmani-v2.png',
  'temel-ilk-yardim-egitimi': '/assets/training-ilk-yardim-v2.png',
  'hijyen-egitimi': '/assets/training-hijyen-v2.png',
  'ise-giris-oryantasyon': '/assets/training-oryantasyon-v2.png',
}

function coreLessonDetail(title: string): string {
  const normalizedTitle = title.toLocaleLowerCase('tr-TR')
  if (normalizedTitle.includes('mevzuat') || normalizedTitle.includes('yasal') || normalizedTitle.includes('sorumluluk')) {
    return 'Çalışan; görevine ilişkin riskleri, işyeri talimatlarını, temsilci ve kurul mekanizmalarını bilmelidir. Ciddi ve yakın tehlikede işi durdurma, durumu bildirme ve güvenli bölgeye geçme adımlarını öğrenmelidir.'
  }
  if (normalizedTitle.includes('hastalık') || normalizedTitle.includes('sağlık') || normalizedTitle.includes('biyolojik') || normalizedTitle.includes('tütün')) {
    return 'Maruziyetin kaynağı, süresi ve vücuda giriş yolu birlikte değerlendirilir. Belirtiler erken bildirilir; sağlık gözetimi, hijyen, havalandırma ve uygun koruyucu önlemler birlikte uygulanır.'
  }
  if (normalizedTitle.includes('ilk yardım')) {
    return 'Önce olay yeri güvenliği sağlanır, bilinç ve solunum değerlendirilir, 112 aranır. Çalışan yalnızca aldığı eğitim kapsamındaki uygulamaları yapmalı; yaralıya gelişigüzel ilaç, yiyecek veya içecek vermemelidir.'
  }
  if (normalizedTitle.includes('yangın') || normalizedTitle.includes('tahliye') || normalizedTitle.includes('parlama')) {
    return 'Alarm, iki alternatif kaçış yolu, uygun söndürücü ve toplanma alanı işe başlamadan bilinmelidir. Yangın büyümüşse müdahale yerine alarm verme, kapıları kapatma ve güvenli tahliye önceliklidir.'
  }
  if (normalizedTitle.includes('yükse') || normalizedTitle.includes('düşme') || normalizedTitle.includes('kapalı ortam')) {
    return 'Çalışma izni, erişim sistemi, ortam ölçümü, ankraj veya korkuluk ve kurtarma planı birlikte kontrol edilir. Tek başına çalışma ve yalnızca KKD’ye güvenme yaklaşımı yeterli kabul edilmez.'
  }
  if (normalizedTitle.includes('ekipman') || normalizedTitle.includes('elektrik') || normalizedTitle.includes('kaldırma')) {
    return 'Kullanım öncesi koruyucular, enerji bağlantıları, acil durdurma ve çalışma çevresi kontrol edilir. Arıza, sıkışma veya bakım ihtiyacında ekipman durdurulur, enerji izole edilir ve yetkili kişiye bildirilir.'
  }
  if (normalizedTitle.includes('kimyasal') || normalizedTitle.includes('kişisel koruyucu') || normalizedTitle.includes('işaret')) {
    return 'Etiket, Güvenlik Bilgi Formu, maruziyet yolu ve koruma hiyerarşisi birlikte değerlendirilir. KKD doğru seçilmeli, kullanım öncesi kontrol edilmeli ve tehlike işaretleri çalışma boyunca görünür tutulmalıdır.'
  }
  return 'İşe başlamadan önce alan, ekipman, çevredeki kişiler ve acil durum düzeni kontrol edilir. Uygunsuzluk görüldüğünde çalışma güvenli biçimde durdurulur, kayıt altına alınır ve sorumlu kişiye bildirilir.'
}

function seedSlide(title: string, content: string, mediaOverride?: string): Slide {
  const normalizedTitle = title.toLocaleLowerCase('tr-TR')
  const mediaUrl = normalizedTitle.includes('mevzuat') || normalizedTitle.includes('yasal') || normalizedTitle.includes('sorumluluk') || normalizedTitle.includes('hak')
    ? '/assets/isg-mevzuat-haklar.png'
    : normalizedTitle.includes('yangın') || normalizedTitle.includes('tahliye') || normalizedTitle.includes('söndürme')
    ? '/assets/isg-yangin-tahliye.png'
    : normalizedTitle.includes('yükse') || normalizedTitle.includes('düşme') || normalizedTitle.includes('iskele') || normalizedTitle.includes('merdiven') || normalizedTitle.includes('kurtarma')
      ? '/assets/isg-yuksekte-calisma.png'
      : normalizedTitle.includes('sağlık') || normalizedTitle.includes('hastalık') || normalizedTitle.includes('ilk yardım') || normalizedTitle.includes('biyolojik') || normalizedTitle.includes('tütün') || normalizedTitle.includes('hijyen')
        ? '/assets/isg-saglik-ilkyardim.png'
        : normalizedTitle.includes('ergonomi') || normalizedTitle.includes('kaldırma') || normalizedTitle.includes('taşıma') || normalizedTitle.includes('ekranlı')
          ? '/assets/isg-ergonomi-tasima.png'
          : normalizedTitle.includes('kişisel koruyucu') || normalizedTitle.includes('kkd') || normalizedTitle.includes('işaret')
            ? '/assets/isg-kkd-isaretler.png'
      : '/assets/isg-guvenli-calisma.png'
  const hasApplicationNote = content.includes('Çalışan için pratik uygulama') || content.includes('Uygulama notu')
  const enrichedContent = hasApplicationNote
    ? content
    : `${content}\n\nTemel kontrol noktaları\n${coreLessonDetail(title)}\n\nUygulama notu\nBu bilgiyi günlük işinizde uygularken işe başlamadan önce tehlikeyi fark edin, talimatı kontrol edin ve tereddüt ettiğiniz noktayı sorumlu kişiye bildirin. Güvenli çalışma; işi durdurabilme, doğru soruyu sorabilme ve uygunsuzluğu zamanında paylaşabilme alışkanlığıdır.`
  return {
    id: nanoid(),
    title,
    content: enrichedContent,
    mediaUrl: mediaOverride ?? mediaUrl,
  }
}

function seedQuestion(text: string, options: string[], correctIndex: number): Question {
  return { id: nanoid(), text, options, correctIndex }
}

function mergeSeedQuestions(existing: Question[], seeded: Question[], migrateAnswers: boolean): Question[] {
  const seededByText = new Map(seeded.map((question) => [question.text, question]))
  const merged = existing.map((question) => {
    const seed = seededByText.get(question.text)
    return migrateAnswers && seed ? { ...question, options: seed.options, correctIndex: seed.correctIndex } : question
  })
  const existingTexts = new Set(existing.map((question) => question.text))
  return [...merged, ...seeded.filter((question) => !existingTexts.has(question.text))]
}

function seedModule(title: string, slides: Slide[], questions: Question[], videoUrl?: string, videoSlides?: Slide[], mediaOverride?: string): TrainingModule {
  const themedSlides = mediaOverride ? slides.map((slide) => ({ ...slide, mediaUrl: mediaOverride })) : slides
  const themedVideoSlides = mediaOverride ? videoSlides?.map((slide) => ({ ...slide, mediaUrl: mediaOverride })) : videoSlides
  const items: ContentItem[] = videoUrl
    ? [{ id: nanoid(), title: 'Konu anlatımı videosu', type: 'video', videoUrl, slides: themedVideoSlides }]
    : []
  if (themedSlides.length > 0) {
    items.push({ id: nanoid(), title: `${title} slaytları`, type: 'slide', slides: themedSlides })
  }
  return {
    id: nanoid(),
    title,
    items,
    quiz: { id: nanoid(), title: `${title} testi`, questions },
  }
}

const generalSlides: Slide[] = [
  seedSlide('Çalışma mevzuatı ile ilgili bilgiler', `İş sağlığı ve güvenliği mevzuatı; 6331 sayılı İş Sağlığı ve Güvenliği Kanunu, ilgili yönetmelikler ve çalışanların yasal haklarını kapsar. Temel amaç; iş kazalarını ve meslek hastalıklarını önlemek, çalışanları korumaktır.`),
  seedSlide('Çalışanların yasal hak ve sorumlulukları', `Çalışanlar; güvenli bir çalışma ortamı talep etme, eğitim alma, KKD kullanma hakkına sahiptir. Sorumlulukları; işverenin talimatlarına uymak, eğitimlere katılmak, kişisel koruyucu donanımları kullanmak ve iş kazalarını bildirmektir.`),
  seedSlide('İşyeri temizliği ve düzeni', `Düzenli ve temiz bir işyeri; kaza risklerini azaltır, yangın ve sağlık risklerini önler. Çalışma alanlarında engellerin kaldırılması, malzemelerin düzenli saklanması ve acil çıkışların açık tutulması zorunludur.`),
  seedSlide('İş kazası ve meslek hastalığından doğan hukuki sonuçlar', `İş kazası; işverenin sorumluluğunda, iş yerinde veya işin yürütümü sırasında meydana gelen olaydır. Meslek hastalığı; çalışma şartlarına bağlı ortaya çıkan hastalıktır. Her ikisinde de sigorta, tazminat ve cezai yaptırımlar söz konusu olabilir.`),
]

const healthSlides: Slide[] = [
  seedSlide('Meslek hastalıklarının sebepleri', `Meslek hastalıkları; kimyasal, fiziksel, biyolojik ve ergonomik risk etmenlerine uzun süreli maruziyet sonucu ortaya çıkar. Erken teşhis, koruyucu önlemler ve düzenli sağlık kontrolleri önemlidir.`),
  seedSlide('Hastalıktan korunma prensipleri ve korunma tekniklerinin uygulanması', `Korunmada hiyerarşi: tehlikenin ortadan kaldırılması, yerine güvenli alternatif, teknik kontroller, idari kontroller ve son çare olarak kişisel koruyucu donanım (KKD) kullanımı.`),
  seedSlide('Biyolojik ve psikososyal risk etmenleri', `Biyolojik riskler; bakteri, virüs, mantar gibi canlı organizmalardır. Psikososyal riskler; stres, şiddet, mobbing, aşırı iş yükü ve monoton çalışmadır. Her ikisi de sağlığı doğrudan etkiler.`),
  seedSlide('İlk yardım', `İlk yardım; kaza veya ani hastalık durumlarında hayat kurtarıcı müdahaleler bütünüdür. Temel yaşam desteği, kanama kontrolü, şok pozisyonu ve acil servis aranması bilgisi her çalışan için önemlidir.`),
  seedSlide('Tütün ürünlerinin zararları ve pasif etkilenim', `Tütün kullanımı; solunum yolu, kalp-damar ve kanser risklerini artırır. Pasif etkilenim; sigara dumanına maruz kalan bireylerde benzer sağlık sorunlarına yol açar. İşyerlerinde tütün kullanımı yasaktır.`),
]

const technicalSlides: Slide[] = [
  seedSlide('Kimyasal, fiziksel ve ergonomik risk etmenleri', `Kimyasal riskler; solunum yolu ve deri yoluyla zarar veren maddelerdir. Fiziksel riskler; gürültü, titreşim, ışın, sıcaklık ve basınçtır. Ergonomik riskler; ağır kaldırma, tekrarlayan hareketler ve kötü duruştur.`),
  seedSlide('Elle kaldırma ve taşıma', `Doğru kaldırma tekniği; ayaklar omuz genişliğinde, sırt düz, dizlerden kalkarak, yük vücuda yakın tutularak yapılır. Ağır yüklerde mekanik araçlar kullanılmalıdır.`),
  seedSlide('Parlama, patlama, yangın ve yangından korunma', `Parlama; kıvılcım, alev veya yüksek ısı ile patlayıcı ortamın tutuşmasıdır. Yangından korunmada; yangın söndürücüleri, acil çıkışlar, duman dedektörleri ve yangın tatbikatları etkilidir.`),
  seedSlide('İş ekipmanlarının güvenli kullanımı', `İş ekipmanları; periyodik kontrolden geçirilmeli, kullanma kılavuzlarına uygun kullanılmalı ve arızalı ekipmanlar kullanımdan çıkarılmalıdır. Güvenlik tertibatları asla devre dışı bırakılmamalıdır.`),
  seedSlide('Ekranlı araçlarla çalışma', `Uzun süreli ekran kullanımı; göz yorgunluğu, boyun-omuz ağrısı ve stres yaratabilir. Ekran göz hizasında, 50-70 cm uzaklıkta, düzenli aralar ve ergonomik sandalye kullanılmalıdır.`),
  seedSlide('Elektrik, tehlikeleri, riskleri ve önlemleri', `Elektrik çarpması; ciddi yaralanmalara ve ölüme yol açabilir. Korunma yolları: yalıtkan eldiven, topraklama, sigorta/kaçak akım rölesi, arızalı kabloların değiştirilmesi ve yetkisiz müdahaleden kaçınılmasıdır.`),
  seedSlide('İş kazalarının sebepleri ve korunma prensipleri ile tekniklerinin uygulanması', `Kazaların temel sebepleri; dikkatsizlik, eğitim eksikliği, güvensiz ekipman ve kötü çalışma ortamıdır. Risk değerlendirmesi, güvenli çalışma talimatları ve denetimler korunma için gereklidir.`),
  seedSlide('Güvenlik ve sağlık işaretleri', `İş güvenliği işaretleri; yasak, zorunluluk, uyarı, kurtarma ve yangın güvenliği işaretleri olarak sınıflandırılır. Renk ve şekilleri uluslararası standartlara uygundur ve işyerinde net görülebilir olmalıdır.`),
  seedSlide('Kişisel koruyucu donanım kullanımı', `KKD; baş, göz, kulak, solunum, el, ayak ve vücut koruması için kullanılır. Doğru seçim, kullanım, bakım ve saklama şarttır. KKD son çare önlemdir, riski ortadan kaldırmaz.`),
  seedSlide('İş sağlığı ve güvenliği genel kuralları ve güvenlik kültürü', `Güvenlik kültürü; çalışanların güvenliği öncelikli tuttuğu, riskleri raporladığı ve sürekli iyileştirme yapılan ortamdır. "Önce güvenlik" anlayışı her faaliyetin temelinde olmalıdır.`),
  seedSlide('Tahliye ve kurtarma', `Acil durumlarda sakin kalınmalı, acil çıkışlar ve toplanma alanları bilinmeli, asansörler kullanılmamalıdır. Yaralıları güvenli bölgeye taşıma ve 112'yi arama temel kurtarma adımlarıdır.`),
]

const specificSlides: Slide[] = [
  seedSlide('İşe ve işyerine özgü diğer konular', `Tehlikeli ve çok tehlikeli sınıftaki işyerleri için; risk değerlendirmesi, acil durum planı, patlamadan korunma dokümanı ve işe özgü riskler ele alınır. Az tehlikeli işyerleri için genel tehlike ve riskler yeterlidir.`),
  seedSlide('Yüksekte çalışma ve düşme riskleri', `Yüksekte çalışma; 1,85 m ve üzerindeki yüksekliklerde emniyet kemeri, korkuluklar ve iskele kullanımını gerektirir. Düşmeler; iş kazalarının önemli bir bölümünü oluşturur.`),
  seedSlide('Kapalı ortamda çalışma', `Kapalı ortamlar; oksijen eksikliği, zehirli gaz birikimi ve sıkışma riskleri taşır. Giriş öncesi havalandırma, gaz ölçümü, gözetim ve acil müdahale planı zorunludur.`),
  seedSlide('Yangın ve özel risk taşıyan ekipmanlar', `Yangın riski yüksek alanlarda; yangın söndürücüleri, yangın duvarları, sprinkler ve alarm sistemleri bulunmalıdır. Forklift, vinç gibi ekipmanlar sertifikalı operatörlerce kullanılmalıdır.`),
]

const introVideoSlides: Slide[] = [
  seedSlide('Güvenli çalışmaya hoş geldiniz', 'Bu kısa başlangıç videosunda iş sağlığı ve güvenliğinin temel amacını, eğitim akışını ve çalışma sırasında dikkat etmeniz gereken noktaları öğreneceksiniz.'),
  seedSlide('Eğitim nasıl ilerleyecek?', 'Her modülde konu anlatımları ve bölüm testi bulunur. İçerikleri sırayla tamamladıkça sistem sizi otomatik olarak bir sonraki aşamaya taşır.'),
  seedSlide('Hazırsanız başlayalım', 'Soruları dikkatle okuyun, anlamadığınız noktaları tekrar inceleyin ve güvenli çalışma kültürünü günlük işinizin bir parçası haline getirin.'),
]

const generalQuestions = [
  seedQuestion('İş sağlığı ve güvenliği temel kanunu hangisidir?', ['4857 sayılı İş Kanunu', '5510 sayılı Sosyal Sigortalar Kanunu', '6098 sayılı Borçlar Kanunu', '6331 sayılı İSG Kanunu'], 3),
  seedQuestion('Çalışanın temel sorumluluğu aşağıdakilerden hangisidir?', ['İşyerini kirletmek', 'Verilen eğitim ve talimatlara uymak', 'İşverenin kararlarını değiştirmek', 'Kaza bildirmemek'], 1),
  seedQuestion('İşyeri temizliği ve düzeni neden önemlidir?', ['Yalnızca estetik içindir', 'Çalışanları yorar', 'Kaza ve yangın risklerini azaltır', 'Üretimi düşürür'], 2),
  seedQuestion('İş kazası hangi durumda gerçekleşmiş sayılır?', ['İşverenin sorumluluğunda, iş yerinde veya işin yürütümü sırasında', 'Evde yapılan işte', 'İş çıkışı ev yolunda', 'Mesai dışı sosyal etkinlikte'], 0),
  seedQuestion('Bir tehlike fark edildiğinde ilk doğru davranış hangisidir?', ['Görmezden gelmek', 'Tehlikeyi güvenli şekilde durdurup sorumlu kişiye bildirmek', 'Çalışmaya devam etmek', 'Sadece arkadaşına söylemek'], 1),
  seedQuestion('Acil çıkışların önüne malzeme konulması neden sakıncalıdır?', ['Görüntüyü bozar', 'Tahliyeyi geciktirip riski artırır', 'Depolama alanını azaltır', 'Sadece yöneticiyi etkiler'], 1),
  seedQuestion('Çalışan, ciddi ve yakın bir tehlike gördüğünde ne yapmalıdır?', ['Tehlikeyi gizlemelidir', 'İşi hızlandırmalıdır', 'Durumu yetkili kişiye bildirip güvenli alana geçmelidir', 'Vardiya sonunu beklemelidir'], 2),
  seedQuestion('Ramak kala olayların bildirilmesi neden önemlidir?', ['Kazaya dönüşmeden önce önlem alınmasını sağlar', 'Sadece istatistik oluşturur', 'Çalışanı cezalandırmak için kullanılır', 'Üretimi yavaşlatmak içindir'], 0),
  seedQuestion('İSG eğitimlerine katılımın temel amacı hangisidir?', ['Yalnızca imza vermek', 'Riskleri tanıyıp güvenli davranış geliştirmek', 'Çalışma süresini azaltmak', 'Sorumluluğu tamamen işverene bırakmak'], 1),
  seedQuestion('Bir iş talimatı anlaşılmadığında en doğru davranış hangisidir?', ['Tahmin ederek işe başlamak', 'Talimatı görmezden gelmek', 'Başka çalışanın hareketini kopyalamak', 'İşe başlamadan sorumlu kişiden açıklama istemek'], 3),
]

const healthQuestions = [
  seedQuestion('Meslek hastalıklarının temel sebebi nedir?', ['Kalıtım', 'Beslenme bozukluğu', 'Çalışma şartlarına bağlı risk etmenlerine maruziyet', 'Yaşlılık'], 2),
  seedQuestion('Hastalıktan korunmada ilk adım hangisidir?', ['Riskin ortadan kaldırılması', 'Kişisel koruyucu donanım', 'İlaç kullanımı', 'Doktor kontrolü'], 0),
  seedQuestion('Biyolojik risk etmeni hangisi olabilir?', ['Gürültü', 'Aydınlatma', 'Ağır yük', 'Virüs'], 3),
  seedQuestion('İlk yardımda temel amaç nedir?', ['Tanı koymak', 'Yaşamsal fonksiyonları sürdürmek ve acil yardım çağırmak', 'Hastayı işe göndermek', 'İlaç reçete etmek'], 1),
  seedQuestion('Pasif tütün etkilenimi hangisidir?', ['Sadece sigara içenleri etkiler', 'Sadece açık havada görülür', 'Sigara dumanına maruz kalanların sağlığını olumsuz etkiler', 'Kanserojen değildir'], 2),
  seedQuestion('Meslek hastalığından korunmada hangi yaklaşım daha etkilidir?', ['Maruziyeti kaynağında azaltmak', 'Belirti ortaya çıkana kadar beklemek', 'Sadece ağrı kesici kullanmak', 'Riski çalışanlardan gizlemek'], 0),
  seedQuestion('İlk yardım uygulamasından önce ne yapılmalıdır?', ['Olay yeri güvenliği sağlanmalı ve 112 aranmalı', 'Yaralıya hemen ilaç verilmeli', 'Yaralı yalnız bırakılmalı', 'Kalabalık oluşturulmalı'], 0),
  seedQuestion('Psikososyal risklerden biri hangisidir?', ['Uygun aydınlatma', 'Düzenli mola', 'Mobbing ve aşırı iş yükü', 'Koruyucu korkuluk'], 2),
  seedQuestion('Sağlık gözetimlerinin temel amacı nedir?', ['Çalışanı işten uzaklaştırmak', 'İşe bağlı sağlık etkilerini erken belirlemek', 'Yalnızca evrak düzenlemek', 'Kişisel bilgileri paylaşmak'], 1),
  seedQuestion('Bulaşıcı hastalık belirtisi olan çalışan nasıl davranmalıdır?', ['Belirtiyi gizlemelidir', 'Ortak ekipmanları kullanmaya devam etmelidir', 'Kendi kendine ilaç dağıtmalıdır', 'Sorumlu kişiye bildirip sağlık yönlendirmesine uymalıdır'], 3),
]

const technicalQuestions = [
  seedQuestion('Doğru kaldırma tekniğinde yük nerede tutulmalıdır?', ['Uzakta', 'Vücuda yakın', 'Baş üzerinde', 'Tek elle'], 1),
  seedQuestion('Parlama nedir?', ['Sessiz patlama', 'Yangın söndürme', 'Elektrik kaçağı', 'Patlayıcı ortamın tutuşması'], 3),
  seedQuestion('Ekranlı araçlarla çalışmada ekran ile göz arası önerilen mesafe nedir?', ['50-70 cm', '10-20 cm', '1,5-2 m', 'Yakın temas'], 0),
  seedQuestion('Elektrik güvenliğinde en etkili önlem hangisidir?', ['Islak eldiven', 'Metal çubuk kullanımı', 'Kaçak akım rölesi ve topraklama', 'Yüksek voltajda çalışma'], 2),
  seedQuestion('KKD ne zaman kullanılmalıdır?', ['İlk önlem olarak', 'Tehlike ortadan kaldırılamadığında son çare', 'Güneşten korunmak için', 'Her zaman yeterli koruma sağlar'], 1),
  seedQuestion('Acil durumda asansör kullanımı nasıl olmalıdır?', ['Hızlı tahliye için kullanılır', 'Yalnızca yöneticiler kullanır', 'Tek kişi biner', 'Kesinlikle kullanılmaz'], 3),
  seedQuestion('Arızalı bir iş ekipmanı görüldüğünde ne yapılmalıdır?', ['Kullanmaya devam etmek', 'Üzerini örtmek', 'Kullanımdan çıkarıp bildirmek', 'Başka çalışana vermek'], 2),
  seedQuestion('Güvenlik işaretlerinin temel amacı nedir?', ['Tehlike ve zorunluluklar hakkında hızlı bilgi vermek', 'Dekorasyon yapmak', 'Çalışma hızını artırmak', 'Sadece ziyaretçileri yönlendirmek'], 0),
  seedQuestion('Makine koruyucusu devre dışı kaldığında ne yapılmalıdır?', ['Üretime devam edilmelidir', 'Makine durdurulup arıza bildirilmelidir', 'Koruyucu tamamen sökülmelidir', 'Sadece vardiya sonunda kontrol edilmelidir'], 1),
  seedQuestion('Elle taşınamayacak kadar ağır bir yük için doğru yaklaşım hangisidir?', ['Yükü tek başına hızla kaldırmak', 'Yükü omuz üzerinde taşımak', 'Mekanik yardımcı veya ekip desteği kullanmak', 'Yükü sürükleyerek ilerlemek'], 2),
]

const specificQuestions = [
  seedQuestion('Yüksekte çalışmada düşme riskine karşı temel koruyucu nedir?', ['Eldiven', 'Baret', 'Emniyet kemeri ve korkuluklar', 'Güneş gözlüğü'], 2),
  seedQuestion('Kapalı ortam çalışmasında öncelikle ne yapılmalıdır?', ['Havalandırma ve gaz ölçümü', 'İlk yardım çantası hazırlamak', 'Işıklandırma yapmak', 'Kapıyı kapatmak'], 0),
  seedQuestion('Tehlikeli işyerlerinde işe özgü eğitim hangi belgeye göre hazırlanır?', ['Sadece iş sözleşmesi', 'Sosyal medya', 'Çalışanların tercihi', 'Risk değerlendirmesi ve acil durum planı'], 3),
  seedQuestion('Forklift gibi ekipmanları kim kullanmalıdır?', ['Her çalışan', 'Sadece sertifikalı ve yetkili operatörler', 'Stajyerler', 'Güvenlik görevlileri'], 1),
  seedQuestion('Yüksekte çalışma başlamadan önce hangi plan hazır olmalıdır?', ['Kurtarma ve acil durum planı', 'Sadece vardiya listesi', 'Sosyal etkinlik planı', 'Yemek listesi'], 0),
  seedQuestion('Kapalı ortamda gözetim görevlisinin önemli görevi nedir?', ['İçerideki kişiyi yalnız bırakmak', 'İletişimi ve acil durumda müdahaleyi takip etmek', 'Kapıyı kilitlemek', 'Gaz ölçümünü iptal etmek'], 1),
  seedQuestion('Yüksekte çalışmada kolektif korunma örneği hangisidir?', ['Korkuluklu çalışma platformu', 'Sadece uyarı etiketi', 'Günlük kıyafet', 'Tek başına çalışma'], 0),
  seedQuestion('Kapalı ortama giriş izni neden gereklidir?', ['Yalnızca çalışan sayısını belirlemek için', 'Çalışma süresini uzatmak için', 'Risk kontrollerinin tamamlandığını doğrulamak için', 'Kapıyı kilitlemek için'], 2),
  seedQuestion('İşe özgü bir risk için mevcut önlem yetersizse ne yapılmalıdır?', ['Risk kabul edilmelidir', 'Çalışma durdurulup ek önlem planlanmalıdır', 'Çalışan tek başına karar vermelidir', 'Kayıtlar silinmelidir'], 1),
  seedQuestion('Özel risk taşıyan ekipmanda güvenli kullanımın şartı hangisidir?', ['Sadece deneyimli görünmek', 'Ekipmanı hızlı kullanmak', 'Koruyucuları kaldırmak', 'Eğitim, yetkilendirme ve kullanım öncesi kontrol'], 3),
]

type CatalogModuleSpec = {
  title: string
  lessons: Array<[string, string]>
  questions: Array<[string, string[], number]>
}

function supplementaryCatalogQuestions(spec: CatalogModuleSpec): Array<[string, string[], number]> {
  return spec.lessons.slice(0, 2).map(([lessonTitle, content], lessonIndex) => {
    const correctStatement = content.split(/(?<=[.!?])\s/)[0]
    const distractors = [
      'Kontroller yapılmadan işe devam etmek kabul edilebilir.',
      'Bu konu yalnızca yöneticileri ilgilendirir; çalışanın sorumluluğu yoktur.',
      'Risk ortaya çıktığında bildirim veya kayıt yapılmasına gerek yoktur.',
    ]
    const correctIndex = (lessonIndex + spec.title.length) % 4
    const options = [...distractors]
    options.splice(correctIndex, 0, correctStatement)
    return [`${lessonTitle} konusunda doğru bilgi hangisidir?`, options, correctIndex]
  })
}

function expandCatalogLesson(title: string, content: string): string {
  const normalizedTitle = title.toLocaleLowerCase('tr-TR')
  let practicalNote = 'İşe başlamadan önce tehlikeyi fark edin, kurum talimatını kontrol edin ve tereddüt ettiğiniz noktayı sorumlu kişiye bildirin.'

  if (normalizedTitle.includes('yangın') || normalizedTitle.includes('söndürme') || normalizedTitle.includes('tahliye') || normalizedTitle.includes('tatbikat')) {
    practicalNote = 'Uygulamada alarmın yerini, en yakın iki kaçış yolunu, yangın söndürücünün konumunu ve toplanma alanını önceden öğrenin. Yangın büyümüşse müdahale etmeyin; alarm verip güvenli şekilde tahliye olun.'
  } else if (normalizedTitle.includes('yükse') || normalizedTitle.includes('düşüş') || normalizedTitle.includes('iskele') || normalizedTitle.includes('merdiven') || normalizedTitle.includes('kurtarma')) {
    practicalNote = 'Çalışma öncesi zemin ve erişim ekipmanını kontrol edin, düşme riskini ortadan kaldıracak korkuluk veya platformu kurun. Kişisel düşüş durdurma ekipmanı kullanılıyorsa ankrajı ve kurtarma yöntemini ekipçe teyit edin.'
  } else if (normalizedTitle.includes('kimyasal') || normalizedTitle.includes('maruziyet') || normalizedTitle.includes('dökülme') || normalizedTitle.includes('etiket')) {
    practicalNote = 'Bir ürünü kullanmadan önce etiketini ve Güvenlik Bilgi Formunu okuyun. Kokuya veya renge güvenmeyin; uygun havalandırma, eldiven ve göz koruması olmadan çalışmayın. Dökülmeyi gizlemek yerine alanı izole edip bildirin.'
  } else if (normalizedTitle.includes('ekipman') || normalizedTitle.includes('makine') || normalizedTitle.includes('koruyucu') || normalizedTitle.includes('arıza') || normalizedTitle.includes('enerji')) {
    practicalNote = 'Çalıştırmadan önce koruyucuları, acil durdurmayı ve enerji bağlantılarını kontrol edin. Sıkışma, temizlik veya bakım gerekiyorsa ekipmanı durdurun, enerjiyi izole edin ve yalnızca yetkili kişiden destek alın.'
  } else if (normalizedTitle.includes('yardım') || normalizedTitle.includes('kanama') || normalizedTitle.includes('yaralanma') || normalizedTitle.includes('solunum') || normalizedTitle.includes('tıkanıklık')) {
    practicalNote = 'İlk yardımda önce olay yeri güvenliğini sağlayın ve 112’yi arayın. Eğitim kapsamınızın dışındaki müdahaleleri yapmayın; yaralıya yiyecek, içecek veya ilaç vermeyin ve profesyonel yardım gelene kadar sakin biçimde destek olun.'
  } else if (normalizedTitle.includes('hijyen') || normalizedTitle.includes('bulaşma') || normalizedTitle.includes('atık') || normalizedTitle.includes('gıda')) {
    practicalNote = 'Temiz ve kirli işleri birbirinden ayırın, ortak yüzeyleri planlı şekilde temizleyin ve ellerinizi kritik temaslardan önce/sonra yıkayın. Uygunsuzlukları, hastalık belirtilerini ve atık taşmalarını sorumlu kişiye bildirin.'
  } else if (normalizedTitle.includes('oryantasyon') || normalizedTitle.includes('işyeri') || normalizedTitle.includes('görev') || normalizedTitle.includes('kültür')) {
    practicalNote = 'Yeni bir işe başlamadan önce görev sınırlarınızı, riskleri, acil durum planını ve kime bildirim yapacağınızı öğrenin. Emin olmadığınız işi durdurup destek istemek güvenli çalışmanın bir parçasıdır.'
  }

  return `${content}\n\nÇalışan için pratik uygulama\n${practicalNote}\n\nKontrol sorusu\nBu konuyu işyerinizde uygularken ekipman, alan, talimat ve bildirim adımlarının tamamını kontrol edin. Bir adım eksikse çalışmaya başlamadan önce amirinize veya İSG sorumlusuna danışın.`
}

function createCatalogModule(spec: CatalogModuleSpec, introVideo?: string, mediaOverride?: string): TrainingModule {
  const slides = spec.lessons.map(([title, content]) => seedSlide(title, expandCatalogLesson(title, content)))
  const expandedQuestions = [...spec.questions, ...supplementaryCatalogQuestions(spec)]
  const questions = expandedQuestions.map(([text, options, correctIndex], questionIndex) => {
    const answer = options[correctIndex]
    const targetIndex = (questionIndex + spec.title.length) % options.length
    const reorderedOptions = options.filter((_, index) => index !== correctIndex)
    reorderedOptions.splice(targetIndex, 0, answer)
    return seedQuestion(text, reorderedOptions, targetIndex)
  })
  return seedModule(spec.title, slides, questions, introVideo, introVideo ? introVideoSlides : undefined, mediaOverride)
}

function createCatalogTraining(config: {
  id: string
  name: string
  risk: TrainingRisk
  description: string
  modules: CatalogModuleSpec[]
}): Training {
  return {
    id: config.id,
    name: config.name,
    package: 'Sektör Paketi',
    risk: config.risk,
    description: config.description,
    passingScore: 70,
    modules: config.modules.map((module, index) => createCatalogModule(module, index === 0 ? `internal://${config.id}-intro` : undefined, trainingVisualById[config.id])),
    contentVersion: 7,
  }
}

const catalogTrainingSeeds: Training[] = [
  createCatalogTraining({
    id: 'yangin-egitimi-ve-tatbikati',
    name: 'Yangın Eğitimi ve Tatbikatı',
    risk: 'Tehlikeli',
    description: 'Yangının önlenmesi, doğru söndürücü seçimi, tahliye organizasyonu ve tatbikat sonrası iyileştirme adımlarını kapsar.',
    modules: [
      {
        title: 'Yangın bilgisi ve önleme',
        lessons: [
          ['Yangının temel unsurları', 'Yangın; ısı, oksijen ve yanıcı maddenin uygun koşullarda bir araya gelmesiyle oluşur. Bu unsurlardan birini kontrol etmek yangını önlemenin temelidir.'],
          ['İşyeri yangın riskleri', 'Elektrik panoları, sıcak çalışmalar, yanıcı sıvılar, düzensiz depolama ve kapatılmayan ekipmanlar yaygın risk kaynaklarıdır. Riskler işyerine özel değerlendirilmelidir.'],
          ['Önleyici kontroller', 'Acil çıkışları açık tutun, yangın kapılarını takozlamayın, elektrikli ekipmanları kontrol edin ve yanıcı maddeleri uygun alanlarda, etiketli şekilde saklayın.'],
        ],
        questions: [
          ['Yangının oluşması için hangi üç unsur birlikte gerekir?', ['Su, köpük, basınç', 'Isı, oksijen ve yanıcı madde', 'Duman, kül, ışık', 'Elektrik, kablo, sigorta'], 1],
          ['Acil çıkışlarla ilgili doğru uygulama hangisidir?', ['Depolama için kullanmak', 'Kilitli tutmak', 'Sürekli açık ve erişilebilir tutmak', 'Önüne malzeme koymak'], 2],
          ['Sıcak çalışma öncesinde ne yapılmalıdır?', ['Risk değerlendirmesi ve yangın önlemleri planlanmalıdır', 'Sadece pencere açılmalıdır', 'Çalışma alanı terk edilmelidir', 'Söndürücüler kaldırılmalıdır'], 0],
        ],
      },
      {
        title: 'Söndürme ve tahliye',
        lessons: [
          ['Yangına ilk müdahale', 'Yangını fark eden kişi alarm vermeli, çevreyi uyarmalı ve güvenliyse uygun söndürücüyle müdahale etmelidir. Kişisel güvenlik her zaman önceliklidir.'],
          ['Söndürücü seçimi', 'Elektrik yangınlarında su kullanılmaz. Söndürücü etiketi, yangın sınıfı ve kullanım talimatı kontrol edilmeden müdahale edilmemelidir.'],
          ['Tahliye ve toplanma', 'Sakin ilerleyin, asansör kullanmayın, dumanlı alanlarda alçaktan hareket edin ve toplanma alanında yoklama için görevliye bilgi verin.'],
        ],
        questions: [
          ['Elektrik kaynaklı yangında hangi müdahale yanlıştır?', ['Enerjiyi kesmek', 'Alarm vermek', 'Uygun söndürücü kullanmak', 'Su dökmek'], 3],
          ['Tahliye sırasında hangisi yapılmamalıdır?', ['Asansör kullanmak', 'Sakin ilerlemek', 'Çıkış levhalarını takip etmek', 'Toplanma alanına gitmek'], 0],
          ['Yangına müdahalede ilk öncelik nedir?', ['Eşyaları kurtarmak', 'Kişisel güvenliği sağlamak', 'Videoya almak', 'Kapıları kilitlemek'], 1],
        ],
      },
      {
        title: 'Tatbikat ve acil durum organizasyonu',
        lessons: [
          ['Görevli ekipler', 'Söndürme, kurtarma, koruma ve ilk yardım ekiplerinin görevleri önceden belirlenmeli; iletişim listeleri ve toplanma alanı güncel tutulmalıdır.'],
          ['Tatbikatın yürütülmesi', 'Tatbikat öncesi senaryo, sorumlular ve güvenlik sınırları açıklanır. Gerçek tehlike oluşturacak uygulamalardan kaçınılır.'],
          ['Tatbikat sonrası değerlendirme', 'Tahliye süresi, katılım, iletişim ve aksayan noktalar kayıt altına alınır. Düzeltici faaliyetler sorumlu ve tarih belirlenerek takip edilir.'],
        ],
        questions: [
          ['Tatbikat sonrasında hangi çalışma yapılmalıdır?', ['Hiç kayıt tutulmamalı', 'Sadece fotoğraf çekilmeli', 'Aksaklıklar değerlendirilip iyileştirme planlanmalı', 'Ekipler dağıtılmalı'], 2],
          ['Yangın ekiplerinin görevi nasıl belirlenmelidir?', ['Olay anında rastgele', 'Önceden görev ve sorumluluklarla', 'Sadece yöneticilerce sözlü', 'Hiç belirlenmeden'], 1],
          ['Toplanma alanında temel işlem nedir?', ['Yoklama ve eksik kişilerin bildirilmesi', 'Araçlara binmek', 'Binaya geri dönmek', 'Ekipmanı saklamak'], 0],
        ],
      },
    ],
  }),
  createCatalogTraining({
    id: 'yuksekte-calisma',
    name: 'Yüksekte Çalışma Eğitimi',
    risk: 'Çok Tehlikeli',
    description: 'Düşme risklerinin belirlenmesi, güvenli erişim, iskele/merdiven kullanımı ve düşüş durdurma sistemlerini öğretir.',
    modules: [
      {
        title: 'Düşme riskini tanıma',
        lessons: [
          ['Yüksekte çalışma alanı', 'Seviye farkı bulunan ve düşme sonucu yaralanma ihtimali olan işler yüksekte çalışma olarak değerlendirilir. Eşik değer yerine riskin niteliği esas alınır.'],
          ['Risk değerlendirmesi', 'Çalışma platformu, kenar açıklıkları, zemin, hava koşulları, düşen cisimler ve kurtarma planı işe başlamadan önce değerlendirilir.'],
          ['Kolektif korunma', 'Korkuluk, platform, kapatma ve güvenlik ağları mümkünse kişisel sistemlerden önce tercih edilir. Açıklıklar dayanıklı şekilde kapatılır.'],
        ],
        questions: [
          ['Yüksekte çalışmada ilk tercih edilen korunma yaklaşımı hangisidir?', ['Kolektif korunma', 'Rastgele ip kullanmak', 'Sadece uyarı levhası', 'Kişisel önlemi kaldırmak'], 0],
          ['Çalışma öncesi hangisi değerlendirilmelidir?', ['Sadece işin süresi', 'Düşme ve kurtarma riskleri', 'Çalışanın kıyafeti', 'Telefon markası'], 1],
          ['Kenar açıklıkları nasıl bırakılmalıdır?', ['Açık', 'Malzemeyle gelişigüzel kapalı', 'Dayanıklı ve güvenli şekilde kapalı', 'Sadece bantla çevrili'], 2],
        ],
      },
      {
        title: 'Erişim ekipmanları',
        lessons: [
          ['Merdiven güvenliği', 'Merdiven sağlam zemine kurulmalı, kaymaya karşı sabitlenmeli ve üç nokta temas korunmalıdır. Merdiven çalışma platformu yerine geçiyorsa işin niteliği ayrıca değerlendirilir.'],
          ['İskele ve platformlar', 'İskeleler yetkin kişilerce kurulmalı, platformlar korkuluk ve topuk levhasına sahip olmalı, kullanım öncesi kontrol edilmelidir.'],
          ['Kaldırma platformları', 'Platform kapasitesi aşılmamalı, yetkisiz kullanım önlenmeli ve üretici talimatlarına uyulmalıdır. Kurtarma prosedürü bilinmeden çalışma başlatılmaz.'],
        ],
        questions: [
          ['Merdiven kullanımında temel güvenlik kuralı hangisidir?', ['Tek ayakla durmak', 'Üç nokta teması korumak', 'Üst basamakta zıplamak', 'Merdiveni hareket halinde kullanmak'], 1],
          ['İskele ne zaman kontrol edilmelidir?', ['Sadece yıl sonunda', 'Kullanım öncesi ve gerekli durumlarda', 'Hiçbir zaman', 'Sadece kaza sonrası'], 1],
          ['Kaldırma platformunda hangisi zorunludur?', ['Kapasiteyi aşmak', 'Yetkisiz kullanım', 'Üretici talimatlarına uymak', 'Korkuluğu sökmek'], 2],
        ],
      },
      {
        title: 'Kişisel koruma ve kurtarma',
        lessons: [
          ['Düşüş durdurma sistemleri', 'Emniyet kemeri, bağlantı elemanı ve yaşam hattı birlikte ve uyumlu seçilir. Ankraj noktası, düşüş mesafesi ve sarkaç etkisi hesaba katılır.'],
          ['KKD kontrolü', 'Kemer ve bağlantılar her kullanım öncesi kesik, deformasyon, etiket ve bağlantı noktaları açısından kontrol edilir. Hasarlı ekipman kullanılmaz.'],
          ['Kurtarma planı', 'Düşüş sonrası askıda kalma süresi azaltılmalı; ekip, iletişim, erişim yolu ve ilk yardım adımlarını içeren gerçekçi bir plan bulunmalıdır.'],
        ],
        questions: [
          ['Düşüş durdurma sistemi seçerken hangisi hesaba katılır?', ['Düşüş mesafesi ve sarkaç etkisi', 'Sadece renk', 'Çalışanın kıdemi', 'Havanın aydınlık olması'], 0],
          ['Hasarlı emniyet kemeri için doğru uygulama nedir?', ['Kullanmak', 'Onaysız tamir etmek', 'Kullanımdan çıkarmak ve bildirmek', 'Başkasına vermek'], 2],
          ['Kurtarma planının amacı nedir?', ['Tatbikatı iptal etmek', 'Düşüş sonrası hızlı ve güvenli müdahale sağlamak', 'Ekipmanı depolamak', 'Çalışmayı uzatmak'], 1],
        ],
      },
    ],
  }),
  createCatalogTraining({
    id: 'kimyasal-maddelerle-calisma',
    name: 'Kimyasal Maddelerle Çalışma',
    risk: 'Çok Tehlikeli',
    description: 'Kimyasal risklerin sınıflandırılması, güvenlik bilgi formları, depolama, maruziyet kontrolü ve acil durum uygulamalarını kapsar.',
    modules: [
      {
        title: 'Kimyasal riskleri tanıma',
        lessons: [
          ['Maruziyet yolları', 'Kimyasallar solunum, deri teması, göz teması veya yutma yoluyla vücuda girebilir. Maruziyet yolu bilinmeden kontrol önlemi seçilmez.'],
          ['Etiket ve piktogramlar', 'Ürün etiketi; tehlike piktogramları, uyarı kelimesi, risk ifadeleri ve önlem ifadeleriyle birlikte okunmalıdır. Etiketsiz kap kullanılmaz.'],
          ['Güvenlik bilgi formu', 'Güvenlik bilgi formu ilk yardım, yangınla mücadele, dökülme, depolama ve kişisel korunma bilgilerini içerir; güncel ve erişilebilir tutulur.'],
        ],
        questions: [
          ['Kimyasalın vücuda giriş yollarından biri hangisidir?', ['Solunum', 'Sadece işitme', 'Sadece titreşim', 'Sadece ışık'], 0],
          ['Etiketsiz bir kap için doğru uygulama hangisidir?', ['Kullanmak', 'İçeriğini tahmin etmek', 'Kullanımdan ayırıp bildirmek', 'Başka kaba boşaltmak'], 2],
          ['Güvenlik bilgi formunda hangisi bulunur?', ['Dökülme ve ilk yardım bilgileri', 'Çalışan maaşı', 'Vardiya listesi', 'Ürün satış fiyatı'], 0],
        ],
      },
      {
        title: 'Güvenli kullanım ve depolama',
        lessons: [
          ['İkame ve teknik kontrol', 'Tehlikeli maddeyi daha az tehlikeli alternatifle değiştirmek, kapalı sistem ve lokal emiş gibi teknik kontroller KKD’den önce değerlendirilir.'],
          ['Uyumsuz maddeler', 'Asit-baz, oksitleyici-yanıcı ve suyla tepkimeye giren maddeler uyumluluklarına göre ayrı depolanır. Depolama alanı havalandırılır ve ikincil sızdırmazlık sağlanır.'],
          ['Transfer ve etiketleme', 'Transfer kapları uygun malzemeden seçilir, hemen etiketlenir ve dökülmeyi önleyen ekipman kullanılır. Kimyasallar yiyecek kaplarına konulmaz.'],
        ],
        questions: [
          ['Kimyasal risk kontrolünde ilk değerlendirilecek seçenek hangisidir?', ['Tehlikeli maddeyi ikame etmek', 'KKD’yi kaldırmak', 'Etiketi sökmek', 'Havalandırmayı kapatmak'], 0],
          ['Uyumsuz kimyasallar nasıl depolanmalıdır?', ['Aynı rafta', 'Uyumluluklarına göre ayrı', 'Etiketsiz', 'Açık kapta'], 1],
          ['Transfer kabında ne bulunmalıdır?', ['Etiket ve uygun kap özelliği', 'Sadece renk', 'Çalışan adı', 'Hiçbir bilgi'], 0],
        ],
      },
      {
        title: 'Maruziyet ve acil durum',
        lessons: [
          ['Kişisel koruyucu donanım', 'Eldiven, gözlük, yüz siperi ve solunum koruyucu; kimyasalın özelliğine ve güvenlik bilgi formuna göre seçilir. Her eldiven her kimyasala uygun değildir.'],
          ['Dökülme ve sıçrama', 'Alan izole edilir, uygun dökülme kiti kullanılır ve güvenlik bilgi formundaki talimatlara göre hareket edilir. Yetkinlik yoksa müdahale edilmez.'],
          ['İlk yardım ve bildirim', 'Göz veya cilt temasında ürün talimatına göre uzun süreli yıkama yapılır, tıbbi yardım istenir ve olay kayıt altına alınır.'],
        ],
        questions: [
          ['Kimyasal eldiven seçimi neye göre yapılmalıdır?', ['Kimyasalın özelliği ve üretici bilgisine göre', 'Sadece bedene göre', 'Rengine göre', 'En ucuz ürüne göre'], 0],
          ['Dökülmede ilk adım hangisidir?', ['Alanı izole etmek ve bildirmek', 'Döküntüyü çıplak elle toplamak', 'Suya karıştırmak', 'Kimyasalı başka kaba aktarmak'], 0],
          ['Göz temasında temel ilk işlem nedir?', ['Ürün talimatına uygun yıkama ve tıbbi yardım', 'Gözü kapatıp beklemek', 'Bezle ovalamak', 'Çalışmaya devam etmek'], 0],
        ],
      },
    ],
  }),
  createCatalogTraining({
    id: 'is-ekipmanlarinin-guvenli-kullanimi',
    name: 'İş Ekipmanlarının Güvenli Kullanımı',
    risk: 'Tehlikeli',
    description: 'Makine ve ekipmanlarda yetkilendirme, koruyucular, periyodik kontroller, bakım ve güvenli çalışma adımlarını öğretir.',
    modules: [
      {
        title: 'Ekipmanı tanıma ve yetkilendirme',
        lessons: [
          ['Kullanım amacı ve talimatlar', 'Ekipman yalnızca tasarlandığı iş için, üretici talimatlarına ve işyeri prosedürlerine uygun kullanılmalıdır. Talimatlar erişilebilir olmalıdır.'],
          ['Yetkin kullanıcı', 'Eğitim almamış veya yetkilendirilmemiş çalışan ekipmanı çalıştıramaz. Yetkilendirme, ekipmanın riskine ve görevin gerektirdiği beceriye göre yapılır.'],
          ['Çalışma alanı kontrolü', 'Başlamadan önce zemin, enerji kaynakları, hareketli parçalar, çevredeki kişiler ve acil durdurma noktaları kontrol edilir.'],
        ],
        questions: [
          ['Ekipman nasıl kullanılmalıdır?', ['Üretici talimatlarına uygun', 'Deneme yanılmayla', 'Koruyucuları sökerek', 'Yetkisiz şekilde'], 0],
          ['Ekipmanı kim kullanabilir?', ['Eğitimli ve yetkilendirilmiş kullanıcı', 'Her ziyaretçi', 'Tesadüfen seçilen kişi', 'Sadece en yeni çalışan'], 0],
          ['Çalışma öncesi ne kontrol edilmelidir?', ['Ekipman, alan ve acil durdurma noktaları', 'Sadece masa', 'Sadece aydınlatma rengi', 'Çalışanın telefonu'], 0],
        ],
      },
      {
        title: 'Koruyucular ve güvenli çalışma',
        lessons: [
          ['Hareketli parçalar', 'Dönen, kesen, ezen ve sıkıştıran parçalar uygun koruyucularla çevrilir. Koruyucu veya sensör devre dışı bırakılarak üretime devam edilmez.'],
          ['Enerji izolasyonu', 'Bakım ve temizlikte elektrik, pnömatik, hidrolik ve diğer enerji kaynakları kesilir; kilitleme-etiketleme ile yeniden çalıştırma önlenir.'],
          ['Sıkışma ve kesilme riskleri', 'Eller tehlike bölgesine sokulmaz, itici aparat kullanılır ve ekipman durmadan ayar/besleme yapılmaz.'],
        ],
        questions: [
          ['Koruyucu devre dışı kalırsa ne yapılmalıdır?', ['Ekipmanı durdurup bildirmek', 'Daha hızlı çalışmak', 'Koruyucuyu sökmek', 'Kâğıtla kapatmak'], 0],
          ['Bakım öncesi enerji izolasyonunun amacı nedir?', ['Beklenmedik çalışmayı önlemek', 'Üretimi artırmak', 'Gürültüyü artırmak', 'Ekipmanı hızlandırmak'], 0],
          ['Tehlike bölgesine elle müdahale ne zaman yapılır?', ['Ekipman tamamen durdurulup güvenli hale getirildiğinde', 'Ekipman çalışırken', 'Sadece acele varsa', 'Hiçbir kontrolden sonra'], 0],
        ],
      },
      {
        title: 'Kontrol, bakım ve arıza',
        lessons: [
          ['Günlük kullanıcı kontrolü', 'Kullanıcı; kablo, hortum, koruyucu, acil durdurma ve anormal ses/titreşimleri kontrol eder. Şüpheli durumda ekipman kullanılmaz.'],
          ['Periyodik kontrol', 'Mevzuat ve ekipman türüne göre periyodik kontroller yetkili kişilerce yapılır; raporlar, uygunsuzluklar ve düzeltici faaliyetler izlenir.'],
          ['Arıza bildirimi', 'Arızalı ekipman etiketlenir, enerjisi kesilir ve yetkili bakım ekibine bildirilir. Yetkisiz onarım veya köprüleme yapılmaz.'],
        ],
        questions: [
          ['Anormal ses fark edildiğinde ne yapılmalıdır?', ['Ekipmanı durdurup bildirmek', 'Sesi bastırmak', 'Hızı artırmak', 'Koruyucuyu çıkarmak'], 0],
          ['Periyodik kontroller kimlerce yapılmalıdır?', ['Yetkili kişilerce', 'Her çalışan tarafından', 'Ziyaretçilerce', 'Kayıt tutulmadan'], 0],
          ['Arızalı ekipman için doğru işlem hangisidir?', ['Etiketlemek, enerjisini kesmek ve bildirmek', 'Kullanmaya devam etmek', 'Başka çalışana vermek', 'Arızayı gizlemek'], 0],
        ],
      },
    ],
  }),
  createCatalogTraining({
    id: 'temel-ilk-yardim-egitimi',
    name: 'Temel İlk Yardım Eğitimi',
    risk: 'Tehlikeli',
    description: 'Olay yeri güvenliği, temel yaşam desteği, kanamalar, yaralanmalar ve acil yardım çağrısı için temel farkındalık sağlar.',
    modules: [
      {
        title: 'İlk yardımın temelleri',
        lessons: [
          ['İlk yardım ve acil yardım', 'İlk yardım, olay yerinde mevcut imkânlarla yapılan ilaçsız uygulamalardır. Amaç yaşamı korumak, kötüleşmeyi önlemek ve profesyonel yardıma kadar destek olmaktır.'],
          ['Olay yeri güvenliği', 'Önce kendi güvenliğinizi ve çevrenin güvenliğini sağlayın. Elektrik, trafik, yangın veya kimyasal tehlike devam ediyorsa yaklaşmayın.'],
          ['112 araması', 'Konum, olayın türü, yaralı sayısı ve bilinen durum açıkça aktarılır. Ekipler yönlendirme yapana kadar telefon açık tutulur.'],
        ],
        questions: [
          ['İlk yardımın temel amacı nedir?', ['Yaşamı korumak ve kötüleşmeyi önlemek', 'Tanı koymak', 'İlaç yazmak', 'Hastayı yalnız bırakmak'], 0],
          ['Olay yerinde ilk öncelik nedir?', ['Güvenliği sağlamak', 'Yaralıyı hemen taşımak', 'Fotoğraf çekmek', 'Kalabalık toplamak'], 0],
          ['112 aramasında hangisi verilmelidir?', ['Konum ve olay bilgisi', 'Sadece isim', 'Sadece yaş', 'Hiçbir bilgi'], 0],
        ],
      },
      {
        title: 'Temel yaşam desteği',
        lessons: [
          ['Bilinç ve solunum kontrolü', 'Güvenli yaklaşın, kişiye seslenin ve normal solunumu değerlendirin. Yanıt yoksa yardım çağırın ve 112 yönlendirmesiyle hareket edin.'],
          ['Temel yaşam desteği', 'Eğitimli kişiler, güncel ilk yardım protokollerine göre göğüs basısı ve gerektiğinde kurtarıcı solunumu uygular. Otomatik eksternal defibrilatör varsa talimatları izlenir.'],
          ['Hava yolu tıkanıklığı', 'Kısmi tıkanmada öksürmeye teşvik edilir. Tam tıkanma belirtilerinde eğitimli ilk yardımcı, güncel uygulama adımlarına göre müdahale eder ve 112’yi arar.'],
        ],
        questions: [
          ['Bilinçsiz kişide ilk yapılacaklardan biri hangisidir?', ['Yardım çağırmak ve solunumu değerlendirmek', 'Su içirmek', 'Ayağa kaldırmak', 'İlaç vermek'], 0],
          ['OED kullanılırken ne yapılmalıdır?', ['Cihazın sesli talimatları izlenmelidir', 'Cihaz kapatılmalıdır', 'Islak zeminde kullanılmalıdır', 'Talimatlar yok sayılmalıdır'], 0],
          ['Kısmi hava yolu tıkanmasında kişi nasıl desteklenir?', ['Öksürmeye teşvik edilir', 'Yalnız bırakılır', 'Su zorla içirilir', 'Yatırılıp beklenir'], 0],
        ],
      },
      {
        title: 'Kanama, yaralanma ve taşıma',
        lessons: [
          ['Kanama kontrolü', 'Güvenlik sağlandıktan sonra temiz bir bezle doğrudan bası uygulanır. Kanama kontrol altına alınamıyorsa 112 aranır ve profesyonel yardım beklenir.'],
          ['Kırık ve burkulmalar', 'Yaralı bölge gereksiz hareket ettirilmez, bulunduğu pozisyonda desteklenir. Açık yaraya doğrudan kemik müdahalesi yapılmaz.'],
          ['Gereksiz taşıma riski', 'Omurga yaralanması şüphesinde yaralı taşınmaz; yalnızca yaşamı tehdit eden tehlikeden uzaklaştırmak gerekiyorsa güvenli yöntem kullanılır.'],
        ],
        questions: [
          ['Kanamada ilk temel uygulama hangisidir?', ['Doğrudan bası', 'Yarayı ovalamak', 'Yabancı cismi çekmek', 'Su içirmek'], 0],
          ['Kırık şüphesinde ne yapılmalıdır?', ['Bölgeyi sabitleyip gereksiz hareketten kaçınmak', 'Kemiği düzeltmek', 'Masaj yapmak', 'Koşturmak'], 0],
          ['Omurga yaralanması şüphesinde yaralı nasıl taşınır?', ['Hayati tehlike yoksa taşınmaz', 'Hemen ayağa kaldırılır', 'Tek kişi taşır', 'Sandalyeye oturtulur'], 0],
        ],
      },
    ],
  }),
  createCatalogTraining({
    id: 'hijyen-egitimi',
    name: 'Hijyen Eğitimi',
    risk: 'Az Tehlikeli',
    description: 'El hijyeni, kişisel temizlik, gıda ve ortak alan hijyeni ile bulaşıcı hastalıkların önlenmesine yönelik davranışları kapsar.',
    modules: [
      {
        title: 'Kişisel hijyen',
        lessons: [
          ['El hijyeni', 'Eller işe başlamadan, tuvalet sonrası, kirli işlemden sonra ve yemek öncesi uygun yöntemle temizlenir. Takı ve uzun tırnaklar temizlik etkinliğini azaltabilir.'],
          ['Kişisel temizlik ve kıyafet', 'Temiz iş kıyafeti, saçların uygun şekilde toplanması ve açık yaraların kapatılması hem çalışanı hem çalışma alanını korur.'],
          ['Öksürük ve hapşırık adabı', 'Tek kullanımlık mendil veya dirsek içi kullanılır; eller kirlenirse temizlenir. Hastalık belirtileri sorumluya bildirilir.'],
        ],
        questions: [
          ['Eller ne zaman temizlenmelidir?', ['Kritik temas ve kirlenme sonrasında', 'Sadece vardiya sonunda', 'Hiçbir zaman', 'Sadece görünür kir varsa'], 0],
          ['Açık yara için doğru uygulama nedir?', ['Uygun şekilde kapatmak', 'Açık bırakmak', 'Kimyasalla yıkamak', 'Ekipmana sürmek'], 0],
          ['Hapşırırken doğru davranış hangisidir?', ['Mendil veya dirsek içini kullanmak', 'Avuca hapşırmak', 'Çevreye dönmek', 'Ellerini yıkamamak'], 0],
        ],
      },
      {
        title: 'Çalışma alanı ve ekipman hijyeni',
        lessons: [
          ['Temizlik ve dezenfeksiyon', 'Temizlik kiri uzaklaştırır, dezenfeksiyon mikroorganizma yükünü azaltır. Ürünler etiket talimatına, temas süresine ve uygun yüzeye göre kullanılır.'],
          ['Ortak kullanım alanları', 'Kapı kolları, çalışma yüzeyleri, ekipman tutamakları ve ortak cihazlar düzenli temizlik planına göre kontrol edilir.'],
          ['Atık yönetimi', 'Atıklar türüne uygun kaplarda, kapağı kapalı ve taşma olmayacak şekilde toplanır. Kesici-delici atıklar özel kaplara alınır.'],
        ],
        questions: [
          ['Temizlik ile dezenfeksiyon arasındaki fark nedir?', ['Temizlik kiri, dezenfeksiyon mikroorganizma yükünü azaltır', 'İkisi tamamen aynıdır', 'Dezenfeksiyon sadece kokuyu giderir', 'Temizlik gereksizdir'], 0],
          ['Ortak yüzeyler nasıl yönetilmelidir?', ['Planlı şekilde düzenli temizlenmelidir', 'Sadece kirlendiğinde gizlenmelidir', 'Hiç temizlenmemelidir', 'Çalışanlara bırakılmalıdır'], 0],
          ['Kesici-delici atıklar nereye atılır?', ['Uygun özel atık kabına', 'Normal çöp kutusuna', 'Açık zemine', 'Lavaboya'], 0],
        ],
      },
      {
        title: 'Bulaşma ve gıda güvenliği farkındalığı',
        lessons: [
          ['Çapraz bulaşma', 'Kirli el, ekipman veya yüzeyin temiz ürüne temas etmesi çapraz bulaşmaya yol açar. Temiz-kirli akış ayrımı ve ekipman temizliği önemlidir.'],
          ['Gıda ve su güvenliği', 'Gıdalar uygun sıcaklıkta, kapalı ve etiketli saklanır. Son kullanma tarihi, soğuk zincir ve kişisel hijyen kuralları takip edilir.'],
          ['Hastalık bildirimi', 'Bulaşıcı hastalık belirtisi olan çalışanlar sorumluya bilgi vermeli, işyeri prosedürlerine ve sağlık yönlendirmesine uymalıdır.'],
        ],
        questions: [
          ['Çapraz bulaşma nedir?', ['Kirli kaynakların temiz ürüne mikroorganizma taşıması', 'Sadece su taşması', 'Kıyafet değişimi', 'Havalandırma yapılması'], 0],
          ['Gıdalar nasıl saklanmalıdır?', ['Uygun sıcaklıkta, kapalı ve etiketli', 'Açık ve etiketsiz', 'Güneş altında', 'Temizlik kimyasalının yanında'], 0],
          ['Hastalık belirtisi olan çalışan ne yapmalıdır?', ['Sorumluya bildirip prosedüre uymalı', 'Gizlemeli', 'Herkese yiyecek hazırlamalı', 'Ekipmanı paylaşmalı'], 0],
        ],
      },
    ],
  }),
  createCatalogTraining({
    id: 'ise-giris-oryantasyon',
    name: 'İşe Giriş / Oryantasyon Eğitimi',
    risk: 'Tehlikeli',
    description: 'Yeni çalışanların işyeri kuralları, görev tanımı, acil durumlar, riskler ve güvenli çalışma kültürüne uyumunu sağlar.',
    modules: [
      {
        title: 'İşyeri ve görev tanımı',
        lessons: [
          ['İşe uyum ve sorumluluk', 'Çalışan görev tanımını, bağlı olduğu kişiyi, çalışma alanını ve işiyle ilgili temel riskleri öğrenmeden bağımsız çalışmaya başlamaz.'],
          ['İSG kuralları', 'Talimatlara uymak, uygunsuzlukları bildirmek, eğitimlere katılmak ve gerekli KKD’yi kullanmak güvenli çalışmanın temel sorumluluklarıdır.'],
          ['İletişim ve ramak kala', 'Ramak kala olaylar, kaza oluşmadan önce tehlikeyi fark etmeyi sağlar. Bildirimler suçlama amacıyla değil, önleme kültürü için kullanılır.'],
        ],
        questions: [
          ['Yeni çalışan neyi öğrenmeden bağımsız çalışmamalıdır?', ['Görevini ve ilgili riskleri', 'Sadece mola saatini', 'Sadece kıyafet rengini', 'Sadece otoparkı'], 0],
          ['Güvenli çalışmanın temel sorumluluklarından biri hangisidir?', ['Talimatlara ve KKD kurallarına uymak', 'Riski saklamak', 'Koruyucuyu sökmek', 'Eğitime katılmamak'], 0],
          ['Ramak kala bildiriminin amacı nedir?', ['Kazayı önleyecek tehlikeleri görünür kılmak', 'Çalışanı cezalandırmak', 'Üretimi durdurmak', 'Kayıtları silmek'], 0],
        ],
      },
      {
        title: 'Acil durum ve işyeri kuralları',
        lessons: [
          ['Acil çıkış ve toplanma alanı', 'Çalışan ilk gününde acil çıkışları, alarmı, toplanma alanını ve acil durum ekiplerini öğrenmelidir. Kaçış yolları malzemeyle kapatılmaz.'],
          ['Kaza ve olay bildirimi', 'Yaralanma, hasar, tehlikeli durum ve ramak kala olaylar gecikmeden amire/İSG sorumlusuna bildirilir. Olay yeri gereksiz değiştirilmez.'],
          ['Ziyaretçi ve yüklenici güvenliği', 'İşyeri dışından gelen kişiler riskler, giriş-çıkış kuralları ve refakat gereklilikleri konusunda bilgilendirilir.'],
        ],
        questions: [
          ['İlk gün öğrenilmesi gerekenlerden biri hangisidir?', ['Acil çıkış ve toplanma alanı', 'Sadece yemekhane menüsü', 'Sadece servis güzergâhı', 'Sadece şirket logosu'], 0],
          ['Kaza veya tehlikeli durum ne zaman bildirilmelidir?', ['Gecikmeden', 'Ay sonunda', 'Sadece başkası sorarsa', 'Hiçbir zaman'], 0],
          ['Ziyaretçiler nasıl çalışmalıdır?', ['Riskler ve kurallar hakkında bilgilendirilerek', 'Refakatsiz her alana girerek', 'KKD olmadan', 'Kuralsız şekilde'], 0],
        ],
      },
      {
        title: 'İşe özgü riskler ve güvenlik kültürü',
        lessons: [
          ['Riskleri işe başlamadan görme', 'İşe başlamadan önce “Ne yanlış gidebilir?” sorusu sorulur; enerji, hareket, kimyasal, ergonomi ve çevre riskleri kontrol edilir.'],
          ['KKD ve ekipman kullanımı', 'KKD doğru seçilir, uygun takılır ve her kullanım öncesi kontrol edilir. Ekipman yalnızca eğitim ve yetkilendirme sonrasında kullanılır.'],
          ['Güvenlik kültürü', 'Güvenlik; yalnızca İSG uzmanının değil, herkesin günlük davranışıdır. Tehlikeyi durdurma ve bildirme hakkı desteklenir.'],
        ],
        questions: [
          ['İşe başlamadan önce hangi soru sorulmalıdır?', ['Ne yanlış gidebilir ve nasıl önlerim?', 'Ne kadar hızlı bitiririm?', 'Kuralı nasıl atlarım?', 'Kimse görür mü?'], 0],
          ['Ekipman kullanımı için ne gerekir?', ['Eğitim ve yetkilendirme', 'Sadece merak', 'Sadece kıdem', 'Hiçbir şart'], 0],
          ['Güvenlik kültürünün temel davranışı hangisidir?', ['Tehlikeyi bildirmek ve güvenli duruş sergilemek', 'Tehlikeyi gizlemek', 'Kuralları esnetmek', 'Ramak kalayı silmek'], 0],
        ],
      },
    ],
  }),
]

export const baseTrainingSeed: Training = {
  id: 'temel-is-guvenligi',
  name: 'Temel İş Sağlığı ve Güvenliği Eğitimi',
  package: 'Temel Paket',
  risk: 'Tehlikeli',
  description: 'Çalışanların iş sağlığı ve güvenliği konusunda temel bilgi ve becerileri kazanmasını sağlayan, yasal mevzuata uygun kapsamlı eğitim.',
  passingScore: 70,
  contentVersion: 7,
  modules: [
    seedModule('1. Genel Konular', generalSlides, generalQuestions, 'internal://temel-isg-intro', introVideoSlides, trainingVisualById['temel-is-guvenligi']),
    seedModule('2. Sağlık Konuları', healthSlides, healthQuestions, undefined, undefined, trainingVisualById['temel-is-guvenligi']),
    seedModule('3. Teknik Konular', technicalSlides, technicalQuestions, undefined, undefined, trainingVisualById['temel-is-guvenligi']),
    seedModule('4. İşe ve İşyerine Özgü Diğer Konular', specificSlides, specificQuestions, 'https://www.youtube.com/embed/placeholder-temel-isg', undefined, trainingVisualById['temel-is-guvenligi']),
  ],
}

export function seedBaseTraining(): void {
  const trainings = readTrainings()
  const existing = trainings.find((t) => t.id === baseTrainingSeed.id)
  if (!existing) {
    addTraining(baseTrainingSeed)
    return
  }

  // Daha önce oluşturulmuş demo eğitimlerinde tüm doğru cevaplar B idi.
  // Sadece bu eski veri yapısını, kullanıcının olası düzenlemelerini ezmeden düzelt.
  const existingQuestions = existing.modules.flatMap((module) => module.quiz?.questions ?? [])
  const shouldMigrateAnswers = existingQuestions.length > 0 && existingQuestions.every((question) => question.correctIndex === 1)
  const introItem = baseTrainingSeed.modules[0]?.items.find((item) => item.videoUrl?.startsWith('internal://'))
  const hasIntroVideo = existing.modules[0]?.items.some((item) => item.videoUrl?.startsWith('internal://')) ?? false
  const needsContentUpgrade = existing.contentVersion !== baseTrainingSeed.contentVersion
  if (!shouldMigrateAnswers && hasIntroVideo && !needsContentUpgrade) return

  const updated = trainings.map((training) => training.id !== baseTrainingSeed.id ? training : {
    ...training,
    contentVersion: baseTrainingSeed.contentVersion,
    modules: training.modules.map((module, moduleIndex) => ({
      ...module,
      items: (moduleIndex === 0 && !hasIntroVideo && introItem ? [introItem, ...module.items] : module.items).map((item) => item.type !== 'slide' ? item : {
        ...item,
        slides: item.slides?.map((slide) => {
          const seedSlideData = baseTrainingSeed.modules[moduleIndex]?.items.find((candidate) => candidate.type === 'slide')?.slides?.find((candidate) => candidate.title === slide.title)
          return seedSlideData ? { ...slide, content: seedSlideData.content, mediaUrl: seedSlideData.mediaUrl } : slide
        }),
      }),
      quiz: module.quiz ? {
        ...module.quiz,
        questions: mergeSeedQuestions(module.quiz.questions, baseTrainingSeed.modules[moduleIndex]?.quiz?.questions ?? [], shouldMigrateAnswers),
      } : module.quiz,
    })),
  })
  saveTrainings(updated)
}

/**
 * Demo ortamında kataloğu kullanılabilir eğitimlerle doldurur.
 * Mevcut yöneticinin düzenlediği kayıtlar korunur; yalnızca eksik ID'ler eklenir.
 */
export function seedTrainingCatalog(): void {
  seedBaseTraining()
  const trainings = readTrainings()
  const existingIds = new Set(trainings.map((training) => training.id))
  const missing = catalogTrainingSeeds.filter((training) => !existingIds.has(training.id))
  const catalogById = new Map(catalogTrainingSeeds.map((training) => [training.id, training]))
  const upgraded = trainings.map((training) => {
    const seed = catalogById.get(training.id)
    if (!seed || training.contentVersion === seed.contentVersion) return training

    const seedModulesByTitle = new Map(seed.modules.map((module) => [module.title, module]))
    return {
      ...training,
      contentVersion: seed.contentVersion,
      modules: training.modules.map((module) => {
        const seedModule = seedModulesByTitle.get(module.title)
        if (!seedModule) return module
        const seedSlidesByTitle = new Map((seedModule.items.find((item) => item.type === 'slide')?.slides ?? []).map((slide) => [slide.title, slide]))
        return {
          ...module,
          items: module.items.map((item) => item.type !== 'slide' ? item : {
            ...item,
            slides: item.slides?.map((slide) => {
              const seedSlideData = seedSlidesByTitle.get(slide.title)
              return seedSlideData ? { ...slide, content: seedSlideData.content, mediaUrl: seedSlideData.mediaUrl } : slide
            }),
          }),
          quiz: module.quiz && seedModule.quiz ? {
            ...module.quiz,
            questions: mergeSeedQuestions(module.quiz.questions, seedModule.quiz.questions, false),
          } : module.quiz ?? seedModule.quiz,
        }
      }),
    }
  })
  if (missing.length > 0 || upgraded.some((training, index) => training !== trainings[index])) {
    saveTrainings([...upgraded, ...missing])
  }
}
