export interface KvkkSection {
  id: string
  title: string
  icon: 'info' | 'target' | 'share' | 'storage' | 'rights' | 'shield' | 'scale'
  paragraphs: string[]
  list?: string[]
}

export const KVKK_INTRO = {
  title: 'KVKK Aydınlatma Metni',
  subtitle: 'Kişisel Verilerinizin Korunması',
  summary:
    'Merhaba, İSG Eğitim Portalı\'na hoş geldiniz. Devam etmeden önce kişisel verilerinizin işlenmesine ilişkin 6698 sayılı KVKK kapsamında hazırlanan aydınlatma metnini okumanız ve onaylamanız gerekmektedir.',
}

export const KVKK_SECTIONS: KvkkSection[] = [
  {
    id: 'data-controller',
    title: 'Veri Sorumlusu',
    icon: 'shield',
    paragraphs: [
      'Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında "Veri Sorumlusu" sıfatıyla HANTECH İSG YÖNETİM SİSTEMİ tarafından işlenecektir.',
      'Verileriniz; Anayasamızda ve uluslararası sözleşmelerde güvence altına alınan temel hak ve özgürlüklerinizin korunması ilkesi gözetilerek, hukuka uygun, ölçülü ve meşru amaçlarla işlenecektir.',
    ],
  },
  {
    id: 'collected-data',
    title: 'İşlenen Kişisel Veriler',
    icon: 'info',
    paragraphs: [
      'İSG eğitim ve hizmetlerinden faydalanabilmeniz için aşağıdaki kişisel verileriniz işlenmektedir:',
    ],
    list: [
      'Ad, soyad ve kullanıcı adı',
      'T.C. Kimlik Numarası',
      'E-posta adresi ve telefon numarası',
      'Çalıştığı firma ve departman/ünvan bilgisi',
      'Tehlike sınıfı ve eğitim durumu',
      'Eğitim tamamlama ve ilerleme kayıtları',
      'Sisteme giriş/çıkış logları',
    ],
  },
  {
    id: 'processing-purpose',
    title: 'İşlenme Amaçları',
    icon: 'target',
    paragraphs: [
      'Kişisel verileriniz, aşağıdaki amaçlarla işlenebilecektir:',
    ],
    list: [
      'İSG eğitimlerinin planlanması, atanması ve icrası',
      'Eğitim süreçlerinin takibi ve raporlanması',
      'Sözleşme ve yasal yükümlülüklerin ifası',
      'İş sağlığı ve güvenliği hizmetlerinin sunulması',
      'Kalite takibi ve denetim süreçleri',
      'Bilgi güvenliği süreçlerinin planlanması ve icrası',
      'Hukuki taleplerin takibi ve delillendirme',
      'Kurumsal iletişim ve iş faaliyetlerinin planlanması',
    ],
  },
  {
    id: 'data-transfer',
    title: 'Veri Aktarımı',
    icon: 'share',
    paragraphs: [
      'Kişisel verileriniz; İSG hizmetlerinin sunulması, sözleşme süreçlerinin takibi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla;',
      'Çalıştığınız şirkete, iş ortaklarımıza, tedarikçilerimize ve kanunen yetkili kamu kurumlarına KVKK 8. ve 9. maddeleri çerçevesinde aktarılabilecektir.',
      'Verileriniz bu aydınlatma metninde belirtilen amaçlar dışında işlenmeyecek ve üçüncü kişilere aktarılmayacaktır.',
    ],
  },
  {
    id: 'storage',
    title: 'Saklama ve Silme',
    icon: 'storage',
    paragraphs: [
      'Kişisel verileriniz, ilgili mevzuatta öngörülen süreler boyunca saklanacaktır. Mevzuatta ayrıca süre belirlenmemiş olması halinde, veriler hizmet sunumuyla bağlantılı olarak gerekli olan süre kadar muhafaza edilecektir.',
      'Sürelerin sona ermesinden sonra veriler silinecek, yok edilecek veya anonim hale getirilecektir.',
    ],
  },
  {
    id: 'rights',
    title: 'Haklarınız',
    icon: 'rights',
    paragraphs: [
      'KVKK 11. madde kapsamında aşağıdaki haklara sahipsiniz:',
    ],
    list: [
      'Kişisel verinizin işlenip işlenmediğini öğrenme',
      'İşlenmişse buna ilişkin bilgi talep etme',
      'İşlenme amacını ve amacına uygun kullanılıp kullanıldığını öğrenme',
      'Aktarıldığı üçüncü kişiler hakkında bilgilendirilme',
      'Eksik veya yanlış işlenmiş verilerin düzeltilmesini talep etme',
      'KVKK 7. madde kapsamında verilerin silinmesini veya yok edilmesini isteme',
      'Yapılan işlemlerin üçüncü kişilere bildirilmesini talep etme',
      'Otomatik sistemler vasıtasıyla oluşan aleyhinize sonuçlara itiraz etme',
      'Kanuna aykırı işleme sebebiyle uğradığınız zararın giderilmesini talep etme',
    ],
  },
  {
    id: 'contact',
    title: 'Başvuru ve İletişim',
    icon: 'scale',
    paragraphs: [
      'Haklarınızı kullanmak için kimliğinizi tespit edici bilgiler ve talebinizi içeren yazılı başvurunuzu aşağıdaki kanallardan iletebilirsiniz:',
      'Web sitesi: www.hantech.com.tr',
      'E-posta: kvkk@hantech.com.tr',
      'Başvurularınız en geç 30 gün içinde sonuçlandırılacaktır. Başvurular Türkçe yapılmalıdır.',
    ],
  },
]

export const KVKK_LEGAL_REFERENCE =
  'Bu metin 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında hazırlanmıştır. Reddet seçeneğini seçerseniz oturumunuz kapatılacak ve sisteme giriş yapamazsınız.'
