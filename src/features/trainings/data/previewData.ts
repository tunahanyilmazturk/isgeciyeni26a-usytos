export interface QuizQuestion {
  id: string
  text: string
  options: string[]
  correctIndex: number
}

export interface TopicQuiz {
  topicId: string
  title: string
  duration: string
  questions: QuizQuestion[]
}

export interface PreviewStep {
  id: string
  label: string
  videoTitle: string
  videoDuration: string
  quiz?: TopicQuiz
}

export interface PreviewChapter {
  id: string
  title: string
  steps: PreviewStep[]
}

export interface TrainingPreview {
  trainingId: string
  preTest: {
    title: string
    description: string
    questions: QuizQuestion[]
  }
  chapters: PreviewChapter[]
}

/** Ön test — eğitime başlamadan önce bilgi düzeyini ölçer */
const preTestQuestions: QuizQuestion[] = [
  {
    id: 'pre-1',
    text: '6331 sayılı İş Sağlığı ve Güvenliği Kanunu\'na göre, "Genç çalışan" ifadesi hangi yaş aralığını tanımlar?',
    options: [
      '14 yaşını bitirmiş ancak 18 yaşını doldurmamış çalışan',
      '15 yaşını bitirmiş ancak 18 yaşını doldurmamış çalışan',
      '16 yaşını bitirmiş ancak 18 yaşını doldurmamış çalışan',
      '15 yaşını bitirmiş ancak 17 yaşını doldurmamış çalışan',
    ],
    correctIndex: 0,
  },
  {
    id: 'pre-2',
    text: 'Meslek hastalığı ile iş kazası arasındaki temel fark nedir?',
    options: [
      'Meslek hastalıkları aniden, iş kazaları ise yıllar içinde gelişir.',
      'Meslek hastalıkları çalışma ortamındaki risklerin etkisiyle zaman içinde gelişirken, iş kazaları ani ve beklenmedik bir olaydır.',
      'Meslek hastalıkları sadece yaşlılarda görülür.',
      'İkisi arasında hiçbir fark yoktur.',
    ],
    correctIndex: 1,
  },
  {
    id: 'pre-3',
    text: 'Bir çalışanın kolu kırıldığında ve kolda bariz bir şekil bozukluğu görüldüğünde ilk yardım olarak aşağıdakilerden hangisi kesinlikle yapılmamalıdır?',
    options: [
      '112 acil yardım numarası aranmalıdır.',
      'Kırık olan bölge sabitleninceye kadar hareket ettirilmemelidir.',
      'Kırık kemik, şekil bozukluğunu gidermek için düzeltilmeye çalışılmalıdır.',
      'Kırık bölgesi bir atel (sabitleyici) ile hareketsiz hale getirilmelidir.',
    ],
    correctIndex: 2,
  },
  {
    id: 'pre-4',
    text: 'Kimyasal maddelerin insan vücuduna başlıca giriş yolları aşağıdakilerden hangisidir?',
    options: [
      'Sadece çıplak elle dokunarak',
      'Solunum, sindirim ve deri/gözlerden emilim yoluyla',
      'Sadece kan yoluyla',
      'Sadece yemek yiyerek',
    ],
    correctIndex: 1,
  },
  {
    id: 'pre-5',
    text: 'Yerden bir koli kaldırılırken sırt/bel incinmelerini önlemek için doğru duruş pozisyonu nasıl olmalıdır?',
    options: [
      'Dizleri düz ve gergin tutup sadece belden öne doğru eğilmek',
      'Yükü vücuttan uzak tutarak kollar gergin pozisyonda yürümek',
      'Eğilirken dizleri büküp sırtı dik tutmak ve dönüşleri beli kıvırmadan ayaklarla yapmak',
      'Ayakları sabit tutarak yükle birlikte sağa veya sola doğru ani bel dönüşleri yapmak',
    ],
    correctIndex: 2,
  },
]

/** Alıştırma testleri — her konu için 5 soru */
function makeTopicQuiz(topicId: string, title: string, duration: string, questions: QuizQuestion[]): TopicQuiz {
  return { topicId, title, duration, questions }
}

const chapter1Steps: PreviewStep[] = [
  {
    id: 'step-1a',
    label: 'Adım 1',
    videoTitle: 'a) Çalışma mevzuatı ile ilgili bilgiler',
    videoDuration: '12 dk',
    quiz: makeTopicQuiz('step-1a', 'Çalışma Mevzuatı İle İlgili Bilgiler', '3 dk', [
      {
        id: 'q1a-1',
        text: 'İşveren, iş kazalarını kazadan sonra en geç kaç iş günü içinde Sosyal Güvenlik Kurumuna bildirmekle yükümlüdür?',
        options: ['1 iş günü', '2 iş günü', '3 iş günü', '4 iş günü'],
        correctIndex: 2,
      },
      {
        id: 'q1a-2',
        text: 'İş sağlığı ve güvenliği açısından, çalışma ortamındaki kurallara uymak kimin temel görevidir?',
        options: ['Sadece İşverenin', 'Çalışanın (İşçinin)', 'Sadece Devletin', 'Müşterilerin'],
        correctIndex: 1,
      },
      {
        id: 'q1a-3',
        text: 'İş sağlığı ve güvenliği çalışmalarının en temel amacı aşağıdakilerden hangisidir?',
        options: ['Yalnızca işyerinin karını artırmak', 'Çalışanların maaşlarını belirlemek', 'Sağlıklı ve güvenli bir çalışma ortamı sağlamak', 'Çalışma saatlerini kısaltmak'],
        correctIndex: 2,
      },
      {
        id: 'q1a-4',
        text: 'Çalışana, işyerine veya iş ekipmanına zarar verme potansiyeli taşıdığı halde hiçbir zarara yol açmadan ucuz atlatılan olaylara ne ad verilir?',
        options: ['İş Kazası', 'Ramak Kala Olay', 'Meslek Hastalığı', 'Acil Durum'],
        correctIndex: 1,
      },
    ]),
  },
  {
    id: 'step-1b',
    label: 'Adım 2',
    videoTitle: 'b) Çalışanların yasal hak ve sorumlulukları',
    videoDuration: '10 dk',
    quiz: makeTopicQuiz('step-1b', 'Çalışanların Yasal Hak ve Sorumlulukları', '3 dk', [
      {
        id: 'q1b-1',
        text: '6331 Sayılı Kanun\'a göre "çalışmaktan kaçınma hakkını" kullanan bir çalışanın ücreti için ne geçerlidir?',
        options: ['Çalışmadığı döneme ait ücreti kesilir.', 'Ücreti yarım olarak ödenir.', 'Ücreti ve diğer hakları saklı kalır, kesinti yapılamaz.', 'Ücretinden %25 kesinti yapılarak ödenir.'],
        correctIndex: 2,
      },
      {
        id: 'q1b-2',
        text: '4857 Sayılı İş Kanunu\'na göre, 5-15 yıl kıdemi bulunan bir çalışanın yıllık ücretli izin süresi en az kaç gündür?',
        options: ['14 gün', '20 gün', '40 gün', '60 gün'],
        correctIndex: 1,
      },
      {
        id: 'q1b-3',
        text: 'Günlük çalışma süresi 7,5 saatten fazla olan işlerde asgari ara dinlenmesi süresi ne kadardır?',
        options: ['5 dakika', '15 dakika', '30 dakika', '1 saat'],
        correctIndex: 2,
      },
    ]),
  },
  {
    id: 'step-1c',
    label: 'Adım 3',
    videoTitle: 'c) İşyeri temizliği ve düzeni',
    videoDuration: '8 dk',
    quiz: makeTopicQuiz('step-1c', 'İşyeri Temizliği ve Düzeni', '3 dk', [
      {
        id: 'q1c-1',
        text: 'İşyerinde yere sıvı döküldüğünde kayma ve düşmeleri önlemek için ilk ne yapmalıyız?',
        options: ['Sıvının kendi kendine kurumasını beklemeliyiz.', 'Üzerine basıp dikkatlice geçmeliyiz.', 'Olası kaza riskine karşı döküntüyü hemen temizlemeliyiz.', 'Sadece mesai bitiminde temizlik yapılmasını beklemeliyiz.'],
        correctIndex: 2,
      },
      {
        id: 'q1c-2',
        text: 'İşyerinde gereksiz malzemeleri uzaklaştırmak, aletleri düzenlemek için uygulanan 5 adımlı sistemin adı nedir?',
        options: ['5S Uygulamaları', 'İnsan Kaynakları Yönetimi', 'Acil Durum Planı', 'Yıllık Planlar'],
        correctIndex: 0,
      },
    ]),
  },
  {
    id: 'step-1d',
    label: 'Adım 4',
    videoTitle: 'ç) İş kazası ve meslek hastalığından doğan hukuki sonuçlar',
    videoDuration: '11 dk',
    quiz: makeTopicQuiz('step-1d', 'İş Kazası ve Meslek Hastalığından Doğan Hukuki Sonuçlar', '3 dk', [
      {
        id: 'q1d-1',
        text: 'İş kazası geçiren bir çalışanın tazminat talepleri için başvurması gereken yetkili mahkeme hangisidir?',
        options: ['Aile Mahkemeleri', 'İş Mahkemeleri', 'Tüketici Mahkemeleri', 'İdare Mahkemeleri'],
        correctIndex: 1,
      },
      {
        id: 'q1d-2',
        text: 'SGK tarafından "sürekli iş göremezlik geliri" bağlanabilmesi için meslekte kazanma gücü kayıp oranı en az yüzde kaç olmalıdır?',
        options: ['%5', '%10', '%25', '%50'],
        correctIndex: 1,
      },
    ]),
  },
]

const chapter2Steps: PreviewStep[] = [
  {
    id: 'step-2a',
    label: 'Adım 5',
    videoTitle: 'a) Meslek hastalıklarının sebepleri',
    videoDuration: '9 dk',
    quiz: makeTopicQuiz('step-2a', 'Meslek Hastalıklarının Sebepleri', '3 dk', [
      {
        id: 'q2a-1',
        text: 'Aşağıdakilerden hangisi çalışma ortamındaki "fiziksel" risk faktörlerinden biridir?',
        options: ['Asitler ve bazlar', 'Bakteriler ve virüsler', 'Gürültü, titreşim ve aşırı sıcaklık', 'Aşırı iş yükü ve stres'],
        correctIndex: 2,
      },
      {
        id: 'q2a-2',
        text: 'Sürekli masa başında çalışan veya ağır yük kaldıran bir çalışanda en çok hangi risk grubuna bağlı sağlık sorunu görülür?',
        options: ['Ergonomik riskler', 'Biyolojik riskler', 'Kimyasal riskler', 'Psikososyal riskler'],
        correctIndex: 0,
      },
    ]),
  },
  {
    id: 'step-2b',
    label: 'Adım 6',
    videoTitle: 'b) Hastalıktan korunma prensipleri ve korunma tekniklerinin uygulanması',
    videoDuration: '10 dk',
    quiz: makeTopicQuiz('step-2b', 'Hastalıktan Korunma Prensipleri', '3 dk', [
      {
        id: 'q2b-1',
        text: 'Tehlikeler tam olarak ortadan kalkmıyorsa, başvurulması gereken "en son" çare aşağıdakilerden hangisidir?',
        options: ['Havalandırma sistemini kapatmak', 'Kişisel Koruyucu Donanım kullanmak', 'İşe giriş muayenesi yapmak', 'İşyerini taşımak'],
        correctIndex: 1,
      },
      {
        id: 'q2b-2',
        text: 'Çalışanların sağlığının etkilenip etkilenmediğini tespit etmek için belirli aralıklarla yapılan sağlık kontrollerine ne ad verilir?',
        options: ['İşe giriş tıbbi kontrolleri', 'Eğitim ve uyarma', 'Periyodik tıbbi kontroller', 'Genel havalandırma'],
        correctIndex: 2,
      },
    ]),
  },
  {
    id: 'step-2c',
    label: 'Adım 7-8',
    videoTitle: 'c) Biyolojik ve psikososyal risk etmenleri',
    videoDuration: '12 dk',
    quiz: makeTopicQuiz('step-2c', 'Biyolojik ve Psikososyal Risk Etmenleri', '3 dk', [
      {
        id: 'q2c-1',
        text: 'Bulaşma riski bulunan alanlarda uyulması gereken en temel kural aşağıdakilerden hangisidir?',
        options: ['Sadece molalarda masada yemek yenilebilir.', 'Bulaşma riski bulunan alanlarda hiçbir şey yenilip içilmemelidir.', 'Sadece kapalı şişeden su içilmesine izin verilir.', 'Yemek yenilebilir ancak içecek içilmez.'],
        correctIndex: 1,
      },
      {
        id: 'q2c-2',
        text: 'Aşağıdakilerden hangisi "biyolojik risk etmenlerinden" biridir?',
        options: ['Yüksek seste çalışan makineler', 'Bakteriler, virüsler ve mantarlar', 'İş makinelerinin yarattığı titreşim', 'Kimyasal temizlik maddeleri'],
        correctIndex: 1,
      },
    ]),
  },
  {
    id: 'step-2d',
    label: 'Adım 9',
    videoTitle: 'ç) İlk yardım',
    videoDuration: '11 dk',
    quiz: makeTopicQuiz('step-2d', 'İlkyardım', '3 dk', [
      {
        id: 'q2d-1',
        text: 'Yemek yerken boğazına cisim kaçan ancak hala konuşabilen ve öksürebilen bir kişiye nasıl müdahale edilmelidir?',
        options: ['Sırta şiddetle vurulur', 'Karın basısı (Heimlich Manevrası) uygulanır', 'Sırtüstü yatırılıp göğüs basısı yapılır', 'Hiçbir müdahale yapılmaz, sadece öksürmeye teşvik edilir'],
        correctIndex: 3,
      },
      {
        id: 'q2d-2',
        text: 'Kalp krizi şüphesi olan bilinci açık bir kişiyi hangi pozisyonda dinlenmeye almalısınız?',
        options: ['Sırt üstü dümdüz yatırmalısınız.', 'Yüz üstü yatırmalısınız.', 'Ayaklarını 30 cm yukarı kaldırarak şok pozisyonuna getirmelisiniz.', 'Yarı oturur (yarı eğimli) pozisyona getirmelisiniz.'],
        correctIndex: 3,
      },
    ]),
  },
  {
    id: 'step-2e',
    label: 'Adım 10',
    videoTitle: 'd) Bağımlılık yapıcı maddelerin zararları ve teknoloji bağımlılığı',
    videoDuration: '9 dk',
    quiz: makeTopicQuiz('step-2e', 'Bağımlılık Yapıcı Maddeler ve Teknoloji Bağımlılığı', '3 dk', [
      {
        id: 'q2e-1',
        text: 'Teknoloji bağımlılığının yol açtığı fiziksel sorunlardan biri aşağıdakilerden hangisidir?',
        options: ['Düzenli ve verimli uyku alışkanlığı', 'Boyun kaslarında ağrı, sertleşme ve gözlerde yanma', 'İştah artışı ve düzenli beslenme', 'İş veya okul başarısında artış'],
        correctIndex: 1,
      },
      {
        id: 'q2e-2',
        text: 'Bağımlılık yapıcı maddelerden korunmanın en iyi yolu aşağıdakilerden hangisidir?',
        options: ['Sadece özel günlerde denemek', 'Arkadaş çevresine uyum için bir kez kullanmak', 'Bağımlılık yapmayan güvenli maddeleri seçmek', 'Hiç başlamamaktır'],
        correctIndex: 3,
      },
    ]),
  },
]

const chapter3Steps: PreviewStep[] = [
  {
    id: 'step-3a',
    label: 'Adım 11-13',
    videoTitle: 'a) Kimyasal, fiziksel ve ergonomik risk etmenleri',
    videoDuration: '15 dk',
    quiz: makeTopicQuiz('step-3a', 'Kimyasal, Fiziksel ve Ergonomik Risk Etmenleri', '5 dk', [
      {
        id: 'q3a-1',
        text: 'Aşağıdakilerden hangisi "fiziksel risk etmenlerinden" biri değildir?',
        options: ['Gürültü', 'Aydınlatma', 'Kimyasal gazlar', 'Titreşim'],
        correctIndex: 2,
      },
      {
        id: 'q3a-2',
        text: 'Gürültü seviyesi kaç desibel (dB) seviyesine ulaştığında kulak koruyucu donanım kullanılması zorunludur?',
        options: ['60 dB', '70 dB', '85 dB', '90 dB'],
        correctIndex: 2,
      },
      {
        id: 'q3a-3',
        text: 'Çalışma sırasında kas yorgunluğunu önlemek için en doğru mola düzeni nasıl olmalıdır?',
        options: ['4 saat hiç durmadan çalışıp 1 saat dinlenmek', 'Sadece öğle arasında mola vermek', 'Her 1 saatte bir 5-10 dakikalık kısa aralar vermek', 'Mola vermeden işi bitirmek'],
        correctIndex: 2,
      },
    ]),
  },
  {
    id: 'step-3b',
    label: 'Adım 14',
    videoTitle: 'b) Elle kaldırma ve taşıma',
    videoDuration: '8 dk',
    quiz: makeTopicQuiz('step-3b', 'Elle Kaldırma ve Taşıma', '3 dk', [
      {
        id: 'q3b-1',
        text: '"Elle taşıma işi" nasıl tanımlanmaktadır?',
        options: ['Sadece çok ağır kutuların kaldırılmasıdır.', 'Sadece mekanik araçların kullanılamadığı durumlarda yapılan taşımadır.', 'Bir veya daha fazla çalışanın bir yükü kaldırması, indirmesi, itmesi, çekmesi gibi işlerin tamamıdır.', 'Yalnızca inşaat ve depo alanlarında gerçekleştirilen malzeme transferleridir.'],
        correctIndex: 2,
      },
      {
        id: 'q3b-2',
        text: 'Yerden bir koli kaldırılırken doğru duruş pozisyonu nasıl olmalıdır?',
        options: ['Dizleri düz tutup sadece belden eğilmek', 'Yükü vücuttan uzak tutmak', 'Dizleri büküp sırtı dik tutmak ve dönüşleri ayaklarla yapmak', 'Ayakları sabit tutarak ani bel dönüşleri yapmak'],
        correctIndex: 2,
      },
    ]),
  },
  {
    id: 'step-3c',
    label: 'Adım 15',
    videoTitle: 'c) Parlama, patlama',
    videoDuration: '9 dk',
    quiz: makeTopicQuiz('step-3c', 'Parlama ve Patlama', '3 dk', [
      {
        id: 'q3c-1',
        text: '"Yangın Üçgeni"ne göre, bir yangının başlaması için hangi üç unsurun bir arada bulunması gerekir?',
        options: ['Karbondioksit - Su - Yakıt', 'Oksijen - Isı - Yakıt', 'Azot - Isı - Oksijen', 'Basınç - Gaz - Isı'],
        correctIndex: 1,
      },
      {
        id: 'q3c-2',
        text: 'B Sınıfı yangınlar (benzin, tiner) söz konusu olduğunda neden asla su kullanılmamalıdır?',
        options: ['Su, yanan sıvıyı çevreye yayarak yangını büyütür.', 'Su, sıvının donmasına neden olur.', 'Su, sadece katı yangınlarını söndürebilir.', 'Su, oksijen miktarını artırır.'],
        correctIndex: 0,
      },
    ]),
  },
  {
    id: 'step-3d',
    label: 'Adım 16',
    videoTitle: 'ç) Yangın ve yangından korunma',
    videoDuration: '10 dk',
    quiz: makeTopicQuiz('step-3d', 'Yangın ve Yangından Korunma', '3 dk', [
      {
        id: 'q3d-1',
        text: 'Yangın söndürme tüplerinin üzerindeki "A", "B", "C" harfleri neyi ifade eder?',
        options: ['Tüpün basıncını', 'Söndürücü maddenin hangi sınıf yangınlarda etkili olduğunu', 'Tüpün son kullanma tarihini', 'Söndürücü maddenin kimyasal formülünü'],
        correctIndex: 1,
      },
      {
        id: 'q3d-2',
        text: 'Yangın tüpüyle müdahale ederken alevlerin hangi noktası hedef alınmalıdır?',
        options: ['Alevlerin en üst noktasına', 'Dumanın en yoğun olduğu yere', 'Alevlerin tam dibine (yakıtın kaynağına)', 'Yangın alanının uzağındaki boşluklara'],
        correctIndex: 2,
      },
    ]),
  },
  {
    id: 'step-3e',
    label: 'Adım 17',
    videoTitle: 'd) İş ekipmanlarının güvenli kullanımı',
    videoDuration: '9 dk',
    quiz: makeTopicQuiz('step-3e', 'İş Ekipmanlarının Güvenli Kullanımı', '3 dk', [
      {
        id: 'q3e-1',
        text: 'İş Ekipmanları Yönetmeliği\'nin temel amacı aşağıdakilerden hangisidir?',
        options: ['Makinelerin çalışma hızını artırmak', 'Ekipman kullanımıyla ilgili sağlık ve güvenlik şartlarını belirlemek', 'Sadece ithal makineleri kontrol etmek', 'Bakım maliyetlerini düşürmek'],
        correctIndex: 1,
      },
      {
        id: 'q3e-2',
        text: 'Kaldırma araçları (vinç, asansör) periyodik kontrolleri ne sıklıkla yapılır?',
        options: ['Yılda bir', 'İki yılda bir', 'Her ay', 'Altı ayda bir'],
        correctIndex: 0,
      },
    ]),
  },
  {
    id: 'step-3f',
    label: 'Adım 18',
    videoTitle: 'e) Ekranlı araçlarla çalışma',
    videoDuration: '8 dk',
    quiz: makeTopicQuiz('step-3f', 'Ekranlı Araçlarla Çalışma', '3 dk', [
      {
        id: 'q3f-1',
        text: 'Aşağıdakilerden hangisi "ekranlı araç" kapsamına girmez?',
        options: ['Üretimdeki CNC tezgahının monitörü', 'Ofis masasında kullanılan bilgisayar', 'Günlük işlerde kullanılan tablet', 'Üzerinde sadece basılı evrakların bulunduğu çalışma masası'],
        correctIndex: 3,
      },
      {
        id: 'q3f-2',
        text: 'Ergonomik bir çalışma alanı için monitörün üst kenarı nerede olmalıdır?',
        options: ['Ekranın alt kenarı göz hizasında', 'Ekranın üst kenarı tam göz hizasında veya biraz altında', 'Ekranın ortası çene hizasında', 'Ekranın üst kenarı göz hizasının çok üzerinde'],
        correctIndex: 1,
      },
    ]),
  },
  {
    id: 'step-3g',
    label: 'Adım 19',
    videoTitle: 'f) Elektrik, tehlikeleri, riskleri ve önlemleri',
    videoDuration: '10 dk',
    quiz: makeTopicQuiz('step-3g', 'Elektrik Tehlikeleri ve Önlemleri', '3 dk', [
      {
        id: 'q3g-1',
        text: 'Alçak gerilim sistemlerinde "tehlikeli gerilim" sınırı kaç Volt kabul edilir?',
        options: ['12V', '24V', '50V', '220V'],
        correctIndex: 2,
      },
      {
        id: 'q3g-2',
        text: 'Elektrik akımına kapılmış birini gördüğünüzde yapmanız gereken ilk hareket hangisidir?',
        options: ['Hemen kişiyi kolundan tutup çekmek', 'Kişiye dokunmadan önce sigortayı indirip enerjiyi kesmek', 'Kişinin üzerine su dökmek', 'Metal bir çubukla kişiyi itmek'],
        correctIndex: 1,
      },
    ]),
  },
  {
    id: 'step-3h',
    label: 'Adım 20',
    videoTitle: 'g) İş kazalarının sebepleri ve korunma prensipleri',
    videoDuration: '9 dk',
    quiz: makeTopicQuiz('step-3h', 'İş Kazalarının Sebepleri ve Korunma', '3 dk', [
      {
        id: 'q3h-1',
        text: 'İş kazalarının yüzde kaçı tamamen önlenebilir niteliktedir?',
        options: ['%50', '%75', '%90', '%98'],
        correctIndex: 3,
      },
      {
        id: 'q3h-2',
        text: 'Aşağıdakilerden hangisi bir "Güvensiz Durum" (Ortam faktörü) örneğidir?',
        options: ['Koruyucu gözlük takmadan çalışmak', 'İş güvenliği kurallarını ihlal etmek', 'İş yerindeki yetersiz aydınlatma ve kaygan zemin', 'İşi hızlandırmak için acele etmek'],
        correctIndex: 2,
      },
    ]),
  },
  {
    id: 'step-3i',
    label: 'Adım 21',
    videoTitle: 'ğ) Sağlık ve güvenlik işaretleri',
    videoDuration: '7 dk',
    quiz: makeTopicQuiz('step-3i', 'Sağlık ve Güvenlik İşaretleri', '3 dk', [
      {
        id: 'q3i-1',
        text: 'İş yerinde "Acil Çıkış" veya "İlk Yardım" noktalarını belirten işaretlerin temel rengi nedir?',
        options: ['Kırmızı', 'Mavi', 'Sarı', 'Yeşil'],
        correctIndex: 3,
      },
    ]),
  },
  {
    id: 'step-3j',
    label: 'Adım 22',
    videoTitle: 'h) Kişisel koruyucu donanım kullanımı',
    videoDuration: '8 dk',
    quiz: makeTopicQuiz('step-3j', 'Kişisel Koruyucu Donanım Kullanımı', '3 dk', [
      {
        id: 'q3j-1',
        text: 'KKD kullanımında temel prensip aşağıdakilerden hangisidir?',
        options: ['Risk tespit edildiği an ilk olarak KKD kullanılmalıdır.', 'KKD kullanımı, toplu korunma önlemlerinden önce gelir.', 'KKD kullanımı, risklerle mücadelede başvurulacak en son yöntemdir.', 'Çalışan, KKD maliyetinin bir kısmını karşılamak zorundadır.'],
        correctIndex: 2,
      },
    ]),
  },
  {
    id: 'step-3k',
    label: 'Adım 23',
    videoTitle: 'ı) İş sağlığı ve güvenliği genel kuralları ve güvenlik kültürü',
    videoDuration: '9 dk',
    quiz: makeTopicQuiz('step-3k', 'Güvenlik Kültürü', '3 dk', [
      {
        id: 'q3k-1',
        text: 'Güvenlik literatüründe ilk kez "Güvenlik Kültürü" kavramının kullanılmasına neden olan olay hangisidir?',
        options: ['Titanik Faciası', 'Sanayi Devrimi', 'Çernobil Nükleer Felaketi', 'ILO\'nun kuruluşu'],
        correctIndex: 2,
      },
    ]),
  },
  {
    id: 'step-3l',
    label: 'Adım 24',
    videoTitle: 'i) Acil durumlar, tahliye ve kurtarma',
    videoDuration: '10 dk',
    quiz: makeTopicQuiz('step-3l', 'Acil Durumlar ve Tahliye', '3 dk', [
      {
        id: 'q3l-1',
        text: 'Koruma ekibinin acil durum sırasındaki temel görevi nedir?',
        options: ['Yangını söndürmek.', 'Yaralılara tıbbi müdahale yapmak.', 'Tahliye sonrası sayım yapmak ve koordinasyonu sağlamak.', 'İtfaiye gelene kadar trafiği düzenlemek.'],
        correctIndex: 2,
      },
    ]),
  },
]

export const trainingPreviewData: TrainingPreview = {
  trainingId: 'base-low',
  preTest: {
    title: 'Ön test',
    description: 'Eğitime başlamadan önce bilgi düzeyinizi ölçer; gönderdiğinizde videolar açılır. Geçme barajı ve deneme sınırı yoktur; puan rapor için saklanır ve sertifikaya yazılmaz.',
    questions: preTestQuestions,
  },
  chapters: [
    { id: 'general', title: '1. Genel Konular', steps: chapter1Steps },
    { id: 'health', title: '2. Sağlık Konuları', steps: chapter2Steps },
    { id: 'technical', title: '3. Teknik Konular', steps: chapter3Steps },
  ],
}
