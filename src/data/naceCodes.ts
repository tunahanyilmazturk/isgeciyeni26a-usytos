// Classification source: TUIK, NACE Rev.2.1-Altili, 2026 [Ulusal Siniflama].
// https://siniflama.tuik.gov.tr/Classifications/ClassificationsSatir?surumId=1676
// Hazard source: Workplace Hazard Classes Communique, Annex 1, Official Gazette 01.04.2026, Issue 33211.
// https://www.resmigazete.gov.tr/eskiler/2026/04/20260401-2.htm
// Baseline hazard list: Official Gazette 13.03.2025, Issue 32840 (with the 2026 amendment applied).
// https://resmigazete.gov.tr/eskiler/2025/03/20250313-4.htm
// Baseline list mirror used for extraction: https://www.turmob.org.tr/arsiv/mbs/pratikBilgiler/IS_TEHLIKE-26.01.2025.pdf

export type NaceHazard = 'Az Tehlikeli' | 'Tehlikeli' | 'Çok Tehlikeli'

export interface NaceCode {
  code: string
  title: string
  hazard?: NaceHazard
}

export const naceCodes: readonly NaceCode[] = [
  {
    "code": "01.11.07",
    "title": "Baklagillerin yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.11.12",
    "title": "Tahıl yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.11.14",
    "title": "Yağlı tohum yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.12.14",
    "title": "Çeltik (kabuklu pirinç) yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.13.17",
    "title": "Şeker pancarı yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.13.18",
    "title": "Yenilebilir kök ve yumruların yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.13.19",
    "title": "Diğer sebze tohumlarının yetiştiriciliği (şeker pancarı tohumu dahil, diğer pancar tohumları hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.13.20",
    "title": "Meyvesi yenen sebzelerin yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.13.21",
    "title": "Mantar ve yer mantarları (domalan) yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.13.22",
    "title": "Kökleri, soğanları, yumruları tüketilen sebzelerin ve diğer benzer sebzelerin yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.13.23",
    "title": "Yapraklı veya saplı sebzelerin yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.14.01",
    "title": "Şeker kamışı yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.15.01",
    "title": "Tütün yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.16.02",
    "title": "Pamuk yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.16.90",
    "title": "Diğer lifli bitkilerin yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.19.01",
    "title": "Hayvan yemi bitkilerinin yetiştirilmesi (şeker pancarı tohumları hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.19.02",
    "title": "Çiçek yetiştirilmesi (lale, kasımpatı, zambak, gül vb. ile bunların tohumları)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.19.99",
    "title": "Başka yerde sınıflandırılmamış tek yıllık diğer bitkisel ürünlerin yetiştirilmesi"
  },
  {
    "code": "01.21.05",
    "title": "Üzüm yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.22.05",
    "title": "Tropikal ve subtropikal meyvelerin yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.23.02",
    "title": "Turunçgillerin yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.24.04",
    "title": "Yumuşak çekirdekli meyvelerin ve sert çekirdekli meyvelerin yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.25.09",
    "title": "Fındık yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.25.90",
    "title": "Diğer ağaç ve çalı (çok yıllık bitkilerin) meyvelerinin ve sert kabuklu meyvelerin yetiştirilmesi"
  },
  {
    "code": "01.26.02",
    "title": "Zeytin yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.26.90",
    "title": "Diğer yağlı meyvelerin yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.27.02",
    "title": "Çay yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.27.90",
    "title": "İçecek üretiminde kullanılan diğer bitkisel ürünlerin yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.28.01",
    "title": "Baharatlık, aromatik (ıtırlı), uyuşturucu nitelikte ve farmasötik (eczacılıkla ilgili) bitkisel ürünlerin yetiştirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.29.01",
    "title": "Diğer çok yıllık (uzun ömürlü) bitkisel ürünlerin yetiştirilmesi (Kauçuk ağacı, yılbaşı ağacı, örgü, dolgu ve tabaklama yapmak için kullanılan bitkisel ürünler vb. uzun ömürlü bitkisel ürünlerin yetiştirilmesi)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.30.03",
    "title": "Dikim için sebze fidesi, meyve fidanı vb. yetiştirilmesi",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "01.30.90",
    "title": "Dikim için çiçek ve diğer bitkilerin yetiştirilmesi (dekoratif amaçlarla bitki ve çim yetiştirilmesi dahil, sebze fidesi, meyve fidanı hariç)"
  },
  {
    "code": "01.41.31",
    "title": "Sütü sağılan büyükbaş hayvan yetiştiriciliği (sütü için inek ve manda yetiştiriciliği)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.42.09",
    "title": "Diğer sığır ve manda yetiştiriciliği (sütü için yetiştirilenler hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.43.01",
    "title": "At ve at benzeri diğer hayvan yetiştiriciliği (eşek, katır veya bardo vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.44.01",
    "title": "Deve ve devegillerin yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.45.01",
    "title": "Koyun ve keçi (davar) yetiştiriciliği (işlenmemiş süt, kıl, tiftik, yapağı, yün vb. üretimi dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.46.01",
    "title": "Domuz yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.47.01",
    "title": "Kümes hayvanlarının yetiştirilmesi (tavuk, hindi, ördek, kaz ve beç tavuğu vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.47.02",
    "title": "Kuluçkahanelerin faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.47.03",
    "title": "Kümes hayvanlarından yumurta üretilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.48.01",
    "title": "Arıcılık, bal ve bal mumu üretilmesi (arı sütü dahil)"
  },
  {
    "code": "01.48.02",
    "title": "İpekböceği yetiştiriciliği ve koza üretimi"
  },
  {
    "code": "01.48.03",
    "title": "Evcil hayvanların yetiştirilmesi ve üretilmesi (balık hariç) (kedi, köpek, kuşlar, hamsterler vb.)"
  },
  {
    "code": "01.48.99",
    "title": "Başka yerde sınıflandırılmamış diğer hayvan yetiştiriciliği"
  },
  {
    "code": "01.50.06",
    "title": "Karma çiftçilik",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.61.01",
    "title": "Bitkisel üretimi destekleyici gübreleme, tarlanın sürülmesi, ekilmesi, çapalama ile meyvecilikle ilgili budama vb. faaliyetler (çiçek yetiştiriciliğini destekleyici faaliyetler ile hava yoluyla yapılan gübreleme hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.61.02",
    "title": "Bitkisel üretimi destekleyici mahsulün hasat ve harmanlanması, biçilmesi, balyalanması, biçerdöver işletilmesi vb. faaliyetler",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.61.03",
    "title": "Bitkisel üretimi destekleyici tarımsal amaçlı sulama faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.61.04",
    "title": "Bitkisel üretimi destekleyici ilaçlama ve zirai mücadele faaliyetleri (zararlı otların imhası dahil, hava yoluyla yapılanlar hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "01.61.05",
    "title": "Çiçek yetiştiriciliğini destekleyici gübreleme, tarlanın sürülmesi, ekilmesi, bakımı, toplama vb. ile ilgili faaliyetler (hava yoluyla yapılan gübreleme hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.61.06",
    "title": "Hava yoluyla yapılan bitkisel üretimi destekleyici gübreleme, ilaçlama ve zirai mücadele faaliyetleri (zararlı otların imhası dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "01.62.01",
    "title": "Hayvan üretimini destekleyici olarak sürülerin güdülmesi, başkalarına ait hayvanların beslenmesi, kümeslerin temizlenmesi, kırkma, sağma, barınak sağlama, nalbantlık vb. faaliyetler",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.62.02",
    "title": "Hayvan üretimini destekleyici olarak sürü testi, kümes hayvanlarının kısırlaştırılması, yapay dölleme, vb. faaliyetler",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.63.01",
    "title": "Hasat sonrası diğer ürünlerin ayıklanması ve temizlenmesi ile ilgili faaliyetler (pamuğun çırçırlanması ve nişastalı kök ürünleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.63.02",
    "title": "Sert kabuklu ürünlerin kabuklarının kırılması ve temizlenmesi ile ilgili faaliyetler",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.63.03",
    "title": "Haşhaş vb. ürünlerin sürtme, ezme ve temizlenmesi ile ilgili faaliyetler",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.63.04",
    "title": "Mısır vb. ürünlerin tanelenmesi ve temizlenmesi ile ilgili faaliyetler",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.63.05",
    "title": "Tütünün sınıflandırılması, balyalanması vb. hizmetler",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "01.63.06",
    "title": "Nişastalı kök ürünlerinin ayıklanması ve temizlenmesi (patates vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.63.07",
    "title": "Çırçırlama faaliyeti",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.63.08",
    "title": "Üretim amaçlı tohum işleme hizmetleri (vernelizasyon işlemleri dahil)"
  },
  {
    "code": "01.63.90",
    "title": "Hasat sonrası bitkisel ürünler ile ilgili diğer faaliyetler",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.70.01",
    "title": "Ticari olmayan av hayvanı ve yabani hayvan avlama ve yakalama faaliyetleri (yenilmesi, kürkleri, derileri, araştırmalarda kullanılmaları vb. amaçlar için) (balıkçılık hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "01.70.02",
    "title": "Ticari olan av hayvanı ve yabani hayvan avlama ve yakalama faaliyetleri (yenilmesi, kürkleri, derileri, araştırmalarda kullanılmaları vb. amaçlar için) (balıkçılık hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "02.10.01",
    "title": "Baltalık olarak işletilen ormanların yetiştirilmesi (kağıtlık ve yakacak odun üretimine yönelik olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "02.10.02",
    "title": "Orman yetiştirmek için fidan ve tohum üretimi",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "02.10.03",
    "title": "Orman ağaçlarının yetiştirilmesi (baltalık ormanların yetiştirilmesi hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "02.20.01",
    "title": "Endüstriyel ve yakacak odun üretimi (geleneksel yöntemlerle odun kömürü üretimi dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "02.30.01",
    "title": "Tabii olarak yetişen odun dışı orman ürünlerinin toplanması",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "02.40.01",
    "title": "Ormanda ağaçların kesilmesi, dallarından temizlenmesi, soyulması vb. destekleyici faaliyetler",
    "hazard": "Tehlikeli"
  },
  {
    "code": "02.40.02",
    "title": "Ormanda kesilmiş ve temizlenmiş ağaçların taşınması, istiflenmesi ve yüklenmesi faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "02.40.03",
    "title": "Ormanda silvikültürel hizmet faaliyetleri (seyreltilmesi, budanması, repikaj vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "02.40.04",
    "title": "Ormanı zararlılara (böcek ve hastalıklar) karşı koruma faaliyetleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "02.40.05",
    "title": "Ormanı yangın ve kaçak kesime (izinsiz kesim) karşı koruma faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "02.40.06",
    "title": "Ormanı koruma ve bakım amaçlı orman yolu yapımı ve bakımı faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "02.40.90",
    "title": "Diğer ormancılık hizmet faaliyetleri"
  },
  {
    "code": "03.11.01",
    "title": "Deniz ve kıyı sularında yapılan balıkçılık (gırgır balıkçılığı, dalyancılık dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "03.11.02",
    "title": "Deniz kabuklularının (midye, ıstakoz vb.), yumuşakçaların, diğer deniz canlıları ve ürünlerinin toplanması (sedef, doğal inci, sünger, mercan, deniz yosunu, vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "03.12.01",
    "title": "Tatlı su balıkçılığı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "03.21.01",
    "title": "Denizde yapılan balık yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "03.21.02",
    "title": "Denizde yapılan diğer su ürünleri yetiştiriciliği",
    "hazard": "Tehlikeli"
  },
  {
    "code": "03.22.01",
    "title": "Tatlı sularda yapılan balık yetiştiriciliği",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "03.22.02",
    "title": "Tatlısu ürünleri yetiştiriciliği (balık hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "03.30.01",
    "title": "Balıkçılık ve su ürünleri yetiştiriciliği için destekleyici faaliyetler"
  },
  {
    "code": "03.30.02",
    "title": "Balık kafeslerinin onarım ve bakım hizmeti faaliyetleri"
  },
  {
    "code": "05.10.00",
    "title": "Taş kömürü madenciliği"
  },
  {
    "code": "05.20.00",
    "title": "Linyit madenciliği"
  },
  {
    "code": "06.10.01",
    "title": "Ham petrol çıkarımı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "06.20.01",
    "title": "Doğal gaz çıkarımı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "07.10.00",
    "title": "Demir cevheri madenciliği (sinterlenmiş demir cevheri üretimi dahil)"
  },
  {
    "code": "07.21.01",
    "title": "Katran ve zift ihtiva eden cevherlerden uranyum metalinin ayrıştırılması",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "07.21.02",
    "title": "Katran ve zift ihtiva eden cevherlerden toryum metalinin ayrıştırılması",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "07.21.03",
    "title": "Uranyum madenciliği",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "07.21.04",
    "title": "Toryum madenciliği",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "07.21.05",
    "title": "Sarı pasta (U3O8) imalatı (uranyum cevherinden elde edilen)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "07.29.01",
    "title": "Altın, gümüş, platin gibi değerli metal madenciliği",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "07.29.02",
    "title": "Alüminyum madenciliği",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "07.29.03",
    "title": "Bakır madenciliği",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "07.29.04",
    "title": "Nikel madenciliği",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "07.29.05",
    "title": "Kurşun, çinko ve kalay madenciliği",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "07.29.06",
    "title": "Krom madenciliği",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "07.29.99",
    "title": "Başka yerde sınıflandırılmamış demir dışı diğer metal cevherleri madenciliği (cıva, manganez, kobalt, molibden, tantal, vanadyum vb.)"
  },
  {
    "code": "08.11.01",
    "title": "Mermer ocakçılığı (traverten dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.11.02",
    "title": "Granit ocakçılığı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.11.03",
    "title": "Yapı taşları ocakçılığı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.11.04",
    "title": "Süsleme ve yapı taşlarının kırılması ve kabaca kesilmesi",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.11.05",
    "title": "Dolomit ve kayağan taşı (arduvaz / kayraktaşı) ocakçılığı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.11.06",
    "title": "Kireçtaşı (kalker) ocakçılığı (kireçtaşının kabaca kırılması ve parçalanması dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.11.07",
    "title": "Tebeşir, alçıtaşı ve anhidrit ocakçılığı (çıkarma, parçalama, pişirme işlemi dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.12.01",
    "title": "Çakıl ve kum ocakçılığı (taşların kırılması ile kil ve kaolin madenciliği hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.12.02",
    "title": "Çakıl taşlarının kırılması ve parçalanması",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.12.03",
    "title": "Kil, refrakter kil ve kaolin madenciliği ile bentonit, andaluzit, siyanit, silimanit, mulit, şamot veya dinas toprakları çıkarımı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.91.01",
    "title": "Kimyasal ve gübreleme amaçlı mineral madenciliği (bor, kükürt madenciliği hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.91.02",
    "title": "Bor mineralleri madenciliği",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.91.03",
    "title": "Kükürt madenciliği (ocakçılığı)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.91.04",
    "title": "Guano madenciliği (kuş gübresi, güherçile dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.91.05",
    "title": "Kehribar, oltu taşı ve lületaşı ocakçılığı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.92.00",
    "title": "Turba çıkarılması ve toplanması"
  },
  {
    "code": "08.93.01",
    "title": "Kaya tuzunun çıkarımı (tuzun elenmesi ve kırılması dahil) (tuzun yemeklik tuza dönüştürülmesi hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.93.02",
    "title": "Deniz, göl ve kaynak tuzu üretimi (tuzun yemeklik tuza dönüştürülmesi hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "08.99.01",
    "title": "Aşındırıcı (törpüleyici) materyaller (zımpara), amyant, silisli fosil artıklar, arsenik cevherleri, sabuntaşı (talk) ve feldispat madenciliği (kuartz, mika, şist, talk, silis, sünger taşı, asbest, doğal korindon vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.99.02",
    "title": "Doğal asfalt, asfaltit, asfaltlı taş (doğal katı zift) ve bitüm madenciliği",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.99.03",
    "title": "Kıymetli ve yarı kıymetli taşların ocakçılığı (kehribar, Oltu taşı, lüle taşı ve elmas hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.99.04",
    "title": "Grafit ocakçılığı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.99.05",
    "title": "Elmas (endüstri elmasları dahil) madenciliği",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "08.99.99",
    "title": "Başka yerde sınıflandırılmamış diğer madencilik ve taş ocakçılığı (manyezit, vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "09.10.01",
    "title": "Doğalgazın sıvılaştırılması ve gaz haline getirilmesi (maden alanında gerçekleştirilenler)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "09.10.02",
    "title": "Petrol ve gaz çıkarımıyla ilgili sondaj hizmetleri (tetkik, araştırma hizmetleri, jeolojik gözlemler, kuyu çalıştırılması ve kapatılması ile test amaçlı sondaj faaliyetleri vb. dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "09.10.03",
    "title": "Petrol ve gaz çıkarımı ile ilgili vinç ve sondaj kulesi kurma, onarım, sökme vb. hizmet faaliyetleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "09.90.01",
    "title": "Madencilik ve taş ocakçılığını destekleyici diğer hizmet faaliyetleri (test amaçlı sondaj faaliyetleri ile petrol ve doğalgaz için yapılanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "09.90.02",
    "title": "Madencilik ve taş ocakçılığını destekleyici test amaçlı sondaj faaliyetleri (petrol ve doğalgaz için yapılanlar hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "10.11.01",
    "title": "Etin işlenmesi ve saklanması (mezbahacılık) (kümes hayvanlarının eti hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.12.01",
    "title": "Kümes hayvanları etlerinin üretimi (taze veya dondurulmuş) (yenilebilir sakatatları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.12.02",
    "title": "Kümes hayvanlarının kesilmesi, temizlenmesi veya paketlenmesi işi ile uğraşan mezbahaların faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.12.03",
    "title": "Kümes hayvanlarının yağlarının sofra yağına çevrilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.12.04",
    "title": "Kuş tüyü ve ince kuş tüyü imalatı (derileri dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.13.01",
    "title": "Et ve kümes hayvanları etlerinden üretilen pişmemiş köfte vb. ürünlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.13.02",
    "title": "Et ve kümes hayvanları etlerinden üretilen sosis, salam, sucuk, pastırma, kavurma et, konserve et, salamura et, jambon vb. tuzlanmış, kurutulmuş veya tütsülenmiş ürünlerin imalatı (yemek olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.13.03",
    "title": "Et ve sakatat unları imalatı (et ve kümes hayvanları etlerinden üretilen)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.13.04",
    "title": "Sığır, koyun, keçi vb. hayvanların sakatat ve yağlarından yenilebilir ürünlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.20.03",
    "title": "Balıkların, kabuklu deniz hayvanlarının ve yumuşakçaların işlenmesi ve saklanması",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.20.04",
    "title": "Balık, kabuklu deniz hayvanı ve yumuşakça ürünlerinin üretimi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.20.05",
    "title": "Balık unları, kaba unları ve peletlerinin üretilmesi (insan tüketimi için)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.20.06",
    "title": "Balığın sadece işlenmesi ve saklanmasıyla ilgili faaliyet gösteren tekne ve gemilerin faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.20.07",
    "title": "Pişirilmemiş balık yemekleri imalatı (mayalanmış balık, balık hamuru, balık köftesi vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.20.08",
    "title": "Balıkların, kabukluların, yumuşakçaların veya diğer su omurgasızlarının unları, kaba unları ve peletlerinin üretimi (insan tüketimine uygun olmayan) ile bunların diğer yenilemeyen ürünlerinin üretimi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.31.01",
    "title": "Patatesin işlenmesi ve saklanması (dondurulmuş, kurutulmuş, suyu çıkartılmış, ezilmiş patates imalatı) (soyulması dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.31.02",
    "title": "Patates cipsi, patates çerezi, patates unu ve kaba unlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.32.01",
    "title": "Katkısız sebze ve meyve suları imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.32.02",
    "title": "Konsantre meyve ve sebze suyu imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.39.01",
    "title": "Sebze ve meyve konservesi imalatı (salça, domates püresi dahil, patatesten olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.39.02",
    "title": "Kavrulmuş, tuzlanmış vb. şekilde işlem görmüş sert kabuklu yemişler ile bu meyvelerin püre ve ezmelerinin imalatı (pişirilerek yapılanlar)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.39.03",
    "title": "Meyve ve sebzelerden jöle, pekmez, marmelat, reçel vb. imalatı (pestil imalatı dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.39.04",
    "title": "Tuzlu su, sirke, sirkeli su, yağ veya diğer koruyucu çözeltilerle korunarak saklanan sebze ve meyvelerin imalatı (turşu, salamura yaprak, sofralık zeytin vb. dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.39.05",
    "title": "Dondurulmuş veya kurutulmuş meyve ve sebzelerin imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.39.06",
    "title": "Leblebi imalatı ile kavrulmuş çekirdek, yerfıstığı vb. üretimi (sert kabuklular hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.39.07",
    "title": "Susamın işlenmesi ve tahin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.39.99",
    "title": "Başka yerde sınıflandırılmamış meyve ve sebzelerin başka yöntemlerle işlenmesi ve saklanması (kesilmiş ve paketlenmiş olanlar dahil)"
  },
  {
    "code": "10.41.01",
    "title": "Ayçiçek yağı imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.41.02",
    "title": "Bitkisel sıvı yağ (yenilebilen) imalatı (soya, susam, haşhaş, pamuk, fındık, kolza, hardal vb. yağlar) (zeytin yağı, ayçiçeği yağı ve mısır yağı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.41.03",
    "title": "Bezir yağı (keten tohumu yağı, keten yağı) imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.41.05",
    "title": "Prina yağı imalatı (diğer küspelerden elde edilen yağlar dahil) (mısır yağı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.41.06",
    "title": "Kakao yağı, badem yağı, kekik yağı, defne yağı, hurma çekirdeği veya babassu yağı, Hint yağı, tung yağı ve diğer benzer yağların imalatı (bezir yağı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.41.07",
    "title": "Zeytinyağı imalatı (saf, sızma, rafine)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.41.10",
    "title": "Balık ve deniz memelilerinden yağ elde edilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.41.11",
    "title": "Domuz don yağı (stearin), domuz sıvı yağı, oleostarin, oleoil ve yenilemeyen sıvı don yağı (tallow oil) ile diğer hayvansal katı ve sıvı yağların imalatı (işlenmemiş)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.42.01",
    "title": "Margarin ve benzeri yenilebilir katı yağların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.51.01",
    "title": "Süt imalatı, işlenmiş (pastörize edilmiş, sterilize edilmiş, homojenleştirilmiş ve/veya yüksek ısıdan geçirilmiş) (katı veya toz halde süt hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.51.02",
    "title": "Peynir, lor ve çökelek imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.51.03",
    "title": "Süt tozu, peynir özü (kazein), süt şekeri (laktoz) ve peynir altı suyu (kesilmiş sütün suyu) imalatı (katı veya toz halde süt, krema dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.51.04",
    "title": "Süt temelli hafif içeceklerin imalatı (kefir, salep vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.51.90",
    "title": "Sütten yapılan diğer ürünlerin imalatı"
  },
  {
    "code": "10.52.01",
    "title": "Dondurma imalatı (sade, sebzeli, meyveli vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.52.02",
    "title": "Şerbetli diğer yenilebilen buzlu gıdaların imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.61.01",
    "title": "Kahvaltılık tahıl ürünleri ile diğer taneli tahıl ürünlerinin imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.61.02",
    "title": "Tahılların öğütülmesi ve un imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.61.05",
    "title": "Pirinç, pirinç ezmesi ve pirinç unu imalatı (çeltik fabrikası ve ürünleri dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.61.06",
    "title": "İrmik imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.61.07",
    "title": "Ön pişirme yapılmış veya başka şekilde hazırlanmış tane halde hububat imalatı (bulgur dahil, mısır hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.61.08",
    "title": "Sebzelerin ve baklagillerin öğütülmesi ve sebze unu ile ezmelerinin imalatı (karışımları ile hazır karıştırılmış sebze unları dahil) (pişirilerek yapılanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.61.09",
    "title": "Fırıncılık ürünlerinin imalatında kullanılan hamur ve un karışımlarının imalatı (sebze un karışımları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.61.90",
    "title": "Dövülmüş diğer tahıl ürünlerinin imalatı (bulgur ve irmik hariç)"
  },
  {
    "code": "10.62.01",
    "title": "Nişasta imalatı (buğday, pirinç, patates, mısır, manyok vb. ürünlerden)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.62.02",
    "title": "Glikoz, glikoz şurubu, fruktoz, maltoz, inulin, vb. imalatı (invert şeker dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.62.04",
    "title": "Yaş mısırın öğütülmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.62.05",
    "title": "Glüten imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.62.06",
    "title": "Mısır yağı imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.71.01",
    "title": "Taze pastane ürünleri imalatı (yaş pasta, kuru pasta, poğaça, kek, börek, pay, turta, waffles vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.71.02",
    "title": "Ekmek imalatı (sade pide dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.71.03",
    "title": "Hamur tatlıları imalatı (tatlandırılmış kadayıf, lokma tatlısı, baklava vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.71.04",
    "title": "Simit imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.72.01",
    "title": "Peksimet, bisküvi, gofret, dondurma külahı, kağıt helva vb. ürünlerin imalatı (çikolata kaplı olanlar dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.72.02",
    "title": "Tatlı veya tuzlu hafif dayanıklı fırın ve pastane ürünlerinin imalatı (kurabiyeler, krakerler, galeta, gevrek halkalar vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.72.03",
    "title": "Tatlandırılmamış dayanıklı hamur tatlıları imalatı (pişirilmiş olsun olmasın tatlandırılmamış kadayıf, baklava vb.) (yufka imalatı dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.73.03",
    "title": "Makarna, şehriye, kuskus ve benzeri mamullerin imalatı (doldurulmuş veya dondurulmuş olanlar dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.81.01",
    "title": "Şeker kamışından, pancardan, palmiyeden, akça ağaçtan şeker (sakkaroz) ve şeker ürünleri imalatı veya bunların rafine edilmesi (sıvı şeker ve melas üretimi dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.81.03",
    "title": "Akçaağaç şurubu imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.82.01",
    "title": "Çikolata ve kakao içeren şekerlemelerin imalatı (beyaz çikolata ve sürülerek yenebilen kakaolu ürünler hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.82.02",
    "title": "Şekerlemelerin ve şeker pastillerinin imalatı (bonbon şekeri vb.) (kakaolu şekerlemeler hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.82.03",
    "title": "Sürülerek yenebilen kakaolu ürünlerin imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.82.04",
    "title": "Lokum, pişmaniye, helva, karamel, koz helva, fondan, beyaz çikolata vb. imalatı (tahin helvası dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.82.05",
    "title": "Ciklet imalatı (sakız)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.82.06",
    "title": "Sert kabuklu yemiş, meyve, meyve kabuğu ve diğer bitki parçalarından şekerleme imalatı (meyan kökü hülasaları dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.82.07",
    "title": "Kakao tozu, kakao ezmesi/hamuru ve kakao yağı imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.83.01",
    "title": "Çay ürünleri imalatı (siyah çay, yeşil çay ve poşet çay ile çay ekstre, esans ve konsantreleri)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.83.02",
    "title": "Kahve ürünleri imalatı (çekilmiş kahve, çözünebilir kahve ile kahve ekstre, esans ve konsantreleri)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.83.03",
    "title": "Bitkisel çayların imalatı (nane, yaban otu, papatya, ıhlamur, kuşburnu vb. çaylar)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.83.04",
    "title": "Kahve içeren ve kahve yerine geçebilecek ürünlerin imalatı (şeker, süt vb. karıştırılmış ürünler dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.84.01",
    "title": "Baharat imalatı (karabiber, kırmızı toz/pul biber, hardal unu, tarçın, yenibahar, damla sakızı, baharat karışımları vb.) (işlenmiş)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.84.02",
    "title": "Sirke ve sirke ikamelerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.84.03",
    "title": "Sos imalatı (soya sosu, ketçap, mayonez, hardal sosu, çemen, mango sosu vb.) (baharat, sirke ve salça hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.84.05",
    "title": "Gıda tuzu imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.85.01",
    "title": "Hazır yemek imalatı (vakumla paketlenmiş veya korunmuş olanlar) (lokanta ve catering hizmetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.86.04",
    "title": "Homojenize gıda müstahzarları ve diyetetik gıdaların imalatı"
  },
  {
    "code": "10.89.01",
    "title": "Hazır çorba (geleneksel ve yöresel olarak imal edilenler dahil) ile hazır et suyu, balık suyu, tavuk suyu ve konsantrelerinin imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.89.02",
    "title": "Maya ve kabartma tozu imalatı (bira mayası dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.89.04",
    "title": "Suni bal, karamela, kabuksuz yumurta, yumurta albümini vb. imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "10.89.05",
    "title": "Bitki özsu ve ekstreleri ile peptik maddeler, müsilaj ve kıvam arttırıcı maddelerin imalatı (kola konsantresi, malt özü, meyan balı dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.89.07",
    "title": "Gıda takviyeleri imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.89.99",
    "title": "Başka yerde sınıflandırılmamış çeşitli gıda ürünleri imalatı (çabuk bozulan hazır gıdalar, peynir fondüleri, renklendirilmiş/tatlandırılmış şeker şurupları vb. dahil)"
  },
  {
    "code": "10.91.01",
    "title": "Çiftlik hayvanları için hazır yem imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "10.92.01",
    "title": "Ev hayvanları için hazır gıda imalatı (kedi ve köpek mamaları, kuş ve balık yemleri vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "11.01.01",
    "title": "Damıtılmış alkollü içeceklerin imalatı (viski, brendi, cin, likör, rakı, votka, kanyak vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "11.01.02",
    "title": "Damıtılmış alkollü içeceklerle karıştırılmış içki imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "11.01.03",
    "title": "Etil alkol üretimi (doğal özellikleri değiştirilmemiş/tağyir edilmemiş, alkol derecesi <%80)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "11.02.01",
    "title": "Üzümden şarap, köpüklü şarap, şampanya vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "11.02.02",
    "title": "Üzüm şırası imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "11.03.01",
    "title": "Elma şarabı ve diğer fermente meyve içeceklerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "11.04.02",
    "title": "Diğer damıtılmamış fermente içeceklerin imalatı (vermut ve benzeri içkiler dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "11.05.01",
    "title": "Bira imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "11.06.01",
    "title": "Malt imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "11.07.01",
    "title": "Doğal veya suni maden sularının üretimi (tatlandırılmış ve aromalandırılmış olanlar dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "11.07.03",
    "title": "İçme suyu üretimi (şişelenmiş, gazsız, tatlandırılmamış ve aromalandırılmamış)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "11.07.04",
    "title": "Boza imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "11.07.90",
    "title": "Diğer alkolsüz içeceklerin imalatı (içme suyu ve maden suları ile boza imalatı hariç)"
  },
  {
    "code": "12.00.04",
    "title": "Tütün ürünleri imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.10.03",
    "title": "Doğal pamuk elyafının imalatı (kardelenmesi, taraklanması vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.10.05",
    "title": "Doğal yün ve tiftik elyafının imalatı (kardelenmesi, taraklanması, yün yağının giderilmesi, karbonize edilmesi ve yapağının boyanması vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.10.06",
    "title": "Doğal jüt, keten ve diğer bitkisel tekstil elyaflarının imalatı (kardelenmesi, taraklanması vb.) (pamuk hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.10.08",
    "title": "İpeğin kozadan ayrılması ve sarılması",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.10.09",
    "title": "Sentetik veya suni devamsız elyafın kardelenmesi ve taraklanması",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.10.10",
    "title": "Doğal ipeğin bükülmesi ve iplik haline getirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.10.12",
    "title": "Pamuk elyafının bükülmesi ve iplik haline getirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.10.13",
    "title": "Yün ve tiftik elyafının bükülmesi ve iplik haline getirilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.10.14",
    "title": "Jüt, keten ve diğer bitkisel tekstil elyaflarının bükülmesi ve iplik haline getirilmesi (pamuk hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.10.15",
    "title": "Suni ve sentetik elyafların bükülmesi ve iplik haline getirilmesi (filament ipliği ve suni ipek elyafı imalatı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.20.14",
    "title": "Kot kumaşı imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.20.16",
    "title": "Pamuklu dokuma kumaş imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.20.17",
    "title": "Doğal kıl ve yünden dokuma kumaş imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.20.19",
    "title": "Doğal ipekten kumaş (doğal ipekten dokuma tül kumaş dahil) imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.20.20",
    "title": "Keten, rami, kenevir, jüt elyafları ile diğer bitkisel tekstil elyaflarından dokuma kumaş (bitkisel elyaftan dokuma tül kumaş dahil) imalatı (pamuk hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.20.21",
    "title": "Havlı, şönil, havlu, pelüş, tırtıl ve benzeri ilmeği kesilmemiş dokuma kumaşlar ile tafting kumaş imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.20.22",
    "title": "Suni ve sentetik filamentlerden ve devamsız elyaflardan dokuma kumaş imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.20.23",
    "title": "Dokuma yoluyla imitasyon kürk kumaş imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.30.01",
    "title": "Kumaş ve tekstil ürünlerini ağartma ve boyama hizmetleri (giyim eşyası dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.30.02",
    "title": "Tekstil elyaf ve ipliklerini ağartma ve boyama hizmetleri (kasarlama dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.30.03",
    "title": "Kumaş ve tekstil ürünlerine baskı yapılması hizmetleri (giyim eşyası dahil, emprime baskı dahil, transfer baskı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.30.04",
    "title": "Kumaş ve tekstil ürünlerine ilişkin diğer bitirme hizmetleri (apreleme, pliseleme, sanforlama, vb. dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.30.05",
    "title": "Kumaş ve tekstil ürünlerine transfer baskı yapılması hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.30.06",
    "title": "Serigrafi faaliyetleri"
  },
  {
    "code": "13.91.01",
    "title": "Örgü ve tığ işi kumaşların imalatı (penye ve havlı kumaşlar ile raschel veya benzeri makineler ile örülen tül kumaş, perdelik kumaş vb. örgü veya tığ ile örülmüş kumaşlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.91.02",
    "title": "Örme yoluyla imitasyon kürk kumaşı imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.92.01",
    "title": "Yatak örtü takımları, yatak çarşafları, yastık kılıfları, masa örtüsü ile tuvalet ve mutfakta kullanılan örtülerin imalatı (el ve yüz havluları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.92.02",
    "title": "Yorgan, kuştüyü yorgan, minder, puf, yastık, halı yastık, uyku tulumu ve benzerlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.92.03",
    "title": "Perdelerin ve iç storların, perde veya yatak saçaklarının, farbelalarının ve malzemelerinin imalatı (gipür, hazır tül perde ve kalın perdeler dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.92.04",
    "title": "Tekstilden yer bezi, bulaşık bezi, toz bezi vb. temizlik bezleri imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.92.05",
    "title": "Battaniye imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.92.06",
    "title": "Tekstilden çuval, torba, çanta ve benzerlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.92.09",
    "title": "Bayrak, sancak ve flama imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.93.01",
    "title": "Halı (duvar halısı dahil) ve kilim imalatı (paspas, yolluk ve benzeri tekstil yer kaplamaları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.93.02",
    "title": "Halı, kilim vb. için çözgücülük, halı oymacılığı vb. faaliyetler",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "13.94.02",
    "title": "Ağ ve ağ ürünleri imalatı, sicim, kınnap, halat veya urgandan (balık ağı, yük boşaltma ağları, vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "13.94.03",
    "title": "Sicim, urgan, halat, kordon ve benzerleri imalatı (kauçuk veya plastik emdirilmiş, kaplanmış olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.95.01",
    "title": "Dokusuz kumaş ve dokusuz kumaştan yapılan ürünlerin imalatı (giyim eşyası hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.96.01",
    "title": "Dokunabilir ipliklerden metalize iplik ve metalize iplik ile bunlardan dokuma kumaş imalatı (giyim ve döşemecilikte kullanılan)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.96.02",
    "title": "Tekstil malzemelerinden parça halinde kordonlar; işleme yapılmamış şeritçi eşyası ve benzeri süs eşyalarının imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "13.96.03",
    "title": "Dar dokuma kumaşların imalatı (etiket, arma ve diğer benzeri eşyalar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.96.04",
    "title": "Tekstil malzemelerinden dokuma etiket, rozet, arma ve diğer benzeri eşyaların imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "13.96.05",
    "title": "Teknik kullanım amaçlı tekstil ürünleri ve eşyaları imalatı (fitil, lüks lambası gömleği, tekstil malzemesinden hortumlar, taşıma veya konveyör bantları, elek bezi ve süzgeç bezi dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.96.06",
    "title": "Kord bezi imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.96.07",
    "title": "Tekstille kaplanmış kauçuk iplik veya kordon ile kauçuk veya plastikle kaplanmış veya emdirilmiş tekstilden iplik veya şeritler ve bunlardan yapılmış mensucat imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.96.08",
    "title": "Kaplanmış veya emdirilmiş tekstil kumaşlarının imalatı (cilt kapağı için mensucat, mühendis muşambası, tiyatro dekorları, tuval vb. dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.96.09",
    "title": "Cam elyafından kumaş imalatı"
  },
  {
    "code": "13.96.10",
    "title": "Can yeleği ve can kurtaran simidi imalatı"
  },
  {
    "code": "13.96.11",
    "title": "Paraşüt (yönlendirilebilen paraşütler dahil) ve rotoşüt ile bunların parçalarının imalatı"
  },
  {
    "code": "13.96.12",
    "title": "Tekstilden örtü ve kılıf imalatı (araba, makine, mobilya vb. için)"
  },
  {
    "code": "13.96.13",
    "title": "Branda, tente, stor (güneşlik), yelken, çadır ve kamp malzemeleri imalatı (şişme yataklar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.99.02",
    "title": "Oya, dantel ve nakış imalatı (kapitone ürünleri dahil) ile tül ve diğer ağ kumaşların (dokuma, örgü (triko) veya tığ işi (kroşe) olanlar hariç) imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.99.03",
    "title": "Keçe, basınçlı hassas giysi dokumaları, tekstilden ayakkabı bağı, pudra ponponu vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.99.04",
    "title": "Tekstil kırpıntısı imalatı (yatak, yorgan, yastık, şilte ve benzeri doldurmak için)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "13.99.06",
    "title": "Gipe iplik ve şeritlerin, şönil ipliklerin, şenet ipliklerin imalatı (metalize olanlar ile gipe lastikler hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "14.10.01",
    "title": "Giyim eşyası imalatı (örgü veya tığ işi kumaştan olanlar) (spor ve bebek giysileri hariç)"
  },
  {
    "code": "14.10.02",
    "title": "Bebek giyim eşyası imalatı (örgü veya tığ işi kumaştan)"
  },
  {
    "code": "14.10.03",
    "title": "Spor ve antrenman giysileri, kayak kıyafetleri, yüzme kıyafetleri vb. imalatı (örgü veya tığ işi kumaştan olanlar)"
  },
  {
    "code": "14.10.04",
    "title": "Çorap imalatı (örme ve tığ işi olan külotlu çorap, tayt çorap, kısa kadın çorabı, erkek çorabı, patik ve diğer çoraplar)"
  },
  {
    "code": "14.10.05",
    "title": "Sahne ve gösteri elbiseleri imalatı, dokuma, örgü (triko) ve tığ işi (kroşe), vb. kumaştan olanlar"
  },
  {
    "code": "14.21.01",
    "title": "Dış giyim eşyası imalatı (örgü veya tığ işi olanlar hariç) (spor ve bebek giysileri hariç)"
  },
  {
    "code": "14.21.02",
    "title": "Bebek dış giyim eşyası imalatı (örgü veya tığ işi kumaştan olanlar hariç)"
  },
  {
    "code": "14.21.03",
    "title": "Gelinlik imalatı"
  },
  {
    "code": "14.21.04",
    "title": "Siparişe göre ölçü alınarak dış giyim eşyası imalatı, dokuma kumaştan olanlar (terzilerin faaliyetleri) (giyim eşyası tamiri ile gömlek imalatı hariç)"
  },
  {
    "code": "14.22.01",
    "title": "Atlet, fanila, külot, slip, iç etek, kombinezon, jüp, jüpon, sütyen, korse vb. iç çamaşırı imalatı (örgü veya tığ işi kumaştan olanlar hariç)"
  },
  {
    "code": "14.22.02",
    "title": "Gecelik, sabahlık, pijama, bornoz ve ropdöşambır imalatı (örgü veya tığ işi kumaştan olanlar hariç)"
  },
  {
    "code": "14.22.03",
    "title": "Bebek iç giyim eşyalarının imalatı (örgü veya tığ işi kumaştan olanlar hariç)"
  },
  {
    "code": "14.22.04",
    "title": "Çorap bağları, jartiyer, pantolon askıları vb. iç giyim eşyalarının imalatı (her tür kumaştan)"
  },
  {
    "code": "14.23.00",
    "title": "İş giysisi imalatı (dikişsiz plastik olanlar ile ateşe dayanıklı ve koruyucu güvenlik kıyafetleri hariç)"
  },
  {
    "code": "14.24.01",
    "title": "Deri giyim eşyası imalatı (deri ayakkabı hariç)"
  },
  {
    "code": "14.24.02",
    "title": "Kürklü deriden giyim eşyası, giysi aksesuarları ve diğer eşyaların imalatı (kürkten şapka ve başlık hariç)"
  },
  {
    "code": "14.29.01",
    "title": "Giyim eşyası imalatı (keçeden veya diğer dokusuz kumaştan ya da emdirilmiş veya kaplanmış tekstil kumaşından olanlar)"
  },
  {
    "code": "14.29.02",
    "title": "Spor ve antrenman giysileri, kayak kıyafetleri, yüzme kıyafetleri vb. imalatı (örgü veya tığ işi kumaştan olanlar hariç)"
  },
  {
    "code": "14.29.03",
    "title": "Yazma, tülbent, eşarp, vb. imalatı (her tür kumaştan)"
  },
  {
    "code": "14.29.04",
    "title": "Eldiven, kemer, şal, papyon, kravat, saç fileleri, kumaş mendil, atkı, fular vb. giysi aksesuarları imalatı (kürklü deriden olanlar hariç)"
  },
  {
    "code": "14.29.05",
    "title": "Şapka, kep, başlık, kasket ve el manşonları ile bunların parçalarının imalatı (kürkten şapka ve başlıklar dahil)"
  },
  {
    "code": "15.11.10",
    "title": "Deri ve kürklü deri imalatı (kürkün ve derinin tabaklanması, sepilenmesi, boyanması, cilalanması ve işlenmesi)(işlenmiş derinin başka işlemlere tabi tutulmaksızın yalnızca tamburda ütülenmesi ve kurutulması hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "15.11.11",
    "title": "Kürklü derinin ve postların kazınarak temizlenmesi, kırkılması, tüylerinin yolunması ve ağartılması (postlu derilerin terbiyesi dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "15.11.13",
    "title": "Deri ve kösele esaslı terkip ile elde edilen levha, yaprak, şerit deri ve kösele imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "15.11.14",
    "title": "İşlenmiş derinin başka işlemlere tabi tutulmaksızın yalnızca tamburda ütülenmesi ve kurutulması",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "15.12.07",
    "title": "Deri, kösele, karma deri ve diğer malzemelerden bavul ve çanta, deriden sigaralık, deri ayakkabı bağı, kişisel bakım, dikiş vb. amaçlı seyahat seti vb. ürünlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "15.12.08",
    "title": "Deriden veya diğer malzemelerden saraçlık ve koşum takımı imalatı (kamçı, semer, eyer, tasma kayışı, heybe vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "15.12.09",
    "title": "Deri saat kayışı imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "15.12.10",
    "title": "Plastik veya kauçuk saat kayışı imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "15.12.11",
    "title": "Kumaş ve diğer malzemelerden saat kayışı imalatı (metal olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "15.12.99",
    "title": "Deriden veya deri bileşimlerinden başka yerde sınıflandırılmamış diğer ürünlerin imalatı (makinelerde veya mekanik cihazlarda kullanılan veya diğer teknik kullanımlar için ürünler dahil)"
  },
  {
    "code": "15.20.05",
    "title": "Ayakkabı ve terliklerin ahşap parçalarının imalatı"
  },
  {
    "code": "15.20.06",
    "title": "Ayakkabı ve terliklerin kauçuk parçalarının imalatı"
  },
  {
    "code": "15.20.07",
    "title": "Ayakkabı ve terliklerin plastik parçalarının imalatı"
  },
  {
    "code": "15.20.15",
    "title": "Deriden ayakkabı, mes, bot, çizme, postal, terlik, vb. imalatı (ortopedik ayakkabı ve kayak ayakkabısı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "15.20.17",
    "title": "Plastik veya kauçuktan ayakkabı, bot, çizme, postal, terlik, vb. imalatı (ortopedik ayakkabı ve kayak ayakkabısı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "15.20.18",
    "title": "Tekstilden ve diğer malzemelerden ayakkabı, mes, bot, çizme, postal, terlik, vb. imalatı (tamamıyla tekstilden olanlar ile ortopedik ayakkabı ve kayak ayakkabısı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "15.20.19",
    "title": "Ayakkabı ve terliklerin deri parçalarının imalatı ile sayacılık faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "16.11.01",
    "title": "Kereste imalatı (ağaçların biçilmesi, planyalanması, rendelenmesi ve şekillendirilmesi faaliyetleri)"
  },
  {
    "code": "16.11.02",
    "title": "Ahşap demir yolu veya tramvay traversi imalatı"
  },
  {
    "code": "16.11.03",
    "title": "Ağaç yünü, ağaç unu, ağaç talaşı, ağaç yonga imalatı"
  },
  {
    "code": "16.11.04",
    "title": "Ahşap döşemelerin ve yer döşemelerinin imalatı (birleştirilebilir parkeler hariç)"
  },
  {
    "code": "16.12.00",
    "title": "Ahşabın işlenmesi ve bitirilmesi (bir ücret veya sözleşmeye dayalı olarak gerçekleştirilen)"
  },
  {
    "code": "16.21.01",
    "title": "Ahşap, bambu ve diğer odunsu malzemelerden kaplamalık plaka, levha, vb. imalatı (yaprak halde) (preslenmemiş)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "16.21.02",
    "title": "Sıkıştırılmış lif, tahta ve tabakalardan kontrplak, MDF, sunta, OSB, CLT vb. levha imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "16.22.01",
    "title": "Birleştirilmiş parke yer döşemelerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "16.23.02",
    "title": "Ahşap prefabrik yapılar ve ahşap taşınabilir evlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "16.23.99",
    "title": "Başka yerde sınıflandırılmamış diğer inşaat doğrama ve marangozluk ürünleri imalatı"
  },
  {
    "code": "16.24.02",
    "title": "Palet, kutu palet ve diğer ahşap yükleme tablaları imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "16.24.90",
    "title": "Diğer ahşap konteyner imalatı"
  },
  {
    "code": "16.25.00",
    "title": "Ahşap kapı ve pencere imalatı"
  },
  {
    "code": "16.26.00",
    "title": "Bitkisel biyokütleden katı yakıt imalatı"
  },
  {
    "code": "16.27.00",
    "title": "Ahşap ürünlerin bitirilmesi"
  },
  {
    "code": "16.28.01",
    "title": "Ahşap mutfak ve sofra eşyası imalatı (kaşık, kepçe, spatula, bardak, havan, havan eli, tepsi vb.)"
  },
  {
    "code": "16.28.02",
    "title": "Ahşap çerçeve ve ahşaptan diğer eşyaların imalatı (panolar, tuval için çerçeveler, ip vb. için makaralar, arı kovanları, köpek kulübeleri dahil)"
  },
  {
    "code": "16.28.03",
    "title": "Ahşaptan iş aletleri, alet gövdeleri, alet sapları, süpürge veya fırça gövdeleri ile sapları, ayakkabı kalıpları, ahşap mandal, elbise ve şapka askıları imalatı"
  },
  {
    "code": "16.28.04",
    "title": "Hasır veya diğer örme malzemesinden (kamış, saz, saman vb.) eşyaların imalatı ile sepet türü ve hasır işi eşyaların imalatı"
  },
  {
    "code": "16.28.05",
    "title": "Sedef kakma ahşap işleri, kakma ile süslü ahşap eşyalar, mücevher için veya çatal-kaşık takımı ve benzeri eşyalar için ahşap kutular, ahşap biblo, heykel ve diğer süslerin imalatı"
  },
  {
    "code": "16.28.06",
    "title": "Doğal mantarın işlenmesi, aglomera mantar imalatı ile bunlardan eşyaların imalatı"
  },
  {
    "code": "16.28.99",
    "title": "Başka yerde sınıflandırılmamış diğer ağaç ürünleri imalatı; mantardan, saz, saman ve benzeri örme malzemelerinden yapılmış ürünlerin imalatı"
  },
  {
    "code": "17.11.08",
    "title": "Kağıt hamuru imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.12.07",
    "title": "Kağıt ve mukavva imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.21.10",
    "title": "Bürolarda, dükkanlarda ve benzeri yerlerde kullanılan kağıt veya mukavvadan dosya veya evrak tasnif kutuları, mektup kutuları ve benzeri eşyaların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.21.11",
    "title": "Kağıt ve kartondan torba ve çanta imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.21.12",
    "title": "Kağıt veya mukavvadan koli, kutu ve benzeri muhafazaların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.21.13",
    "title": "Oluklu kağıt ve mukavva imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.22.02",
    "title": "Kağıt hamurundan, kağıttan, selüloz vatkadan veya selüloz lifli ağlardan tuvalet kağıdı, kağıt mendil, temizlik veya yüz temizleme için kağıt mendil ve havlular ile masa örtüsü ve peçetelerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.22.03",
    "title": "Kağıt veya mukavvadan tepsi, tabak, kase, bardak ve benzerlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.22.04",
    "title": "Kağıt hamurundan, kağıttan, selüloz vatkadan veya selüloz lifli ağlardan hijyenik havlu ve tamponlar, kadın bağı, pedler, bebek bezleri vb. hijyenik ürünler ile giyim eşyası ve giysi aksesuarlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.23.04",
    "title": "Kullanıma hazır karbon kağıdı, kendinden kopyalı kağıt ve diğer kopyalama veya transfer kağıtları, mumlu teksir kağıdı, kağıttan ofset tabakalar ile tutkallı veya yapışkanlı kağıtların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.23.06",
    "title": "Kağıt veya mukavvadan ana niteliği bilgi içermeyen eğitim ve ticari kırtasiye malzemeleri imalatı (ajandalar, defterler, sicil defterleri, muhasebe defterleri, ciltler, kayıt formları ve diğer benzeri kırtasiye ürünleri)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.23.07",
    "title": "Kağıt veya mukavvadan dosya, portföy dosya, klasör ve benzerlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.23.08",
    "title": "Kullanıma hazır basım ve yazım kağıdı ile bilgisayar çıktısı için kullanılacak kağıt ve benzerlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.23.09",
    "title": "Baskısız zarf, mektup kartı, yazışma kartı ve benzerlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.24.02",
    "title": "Duvar kağıdı ve benzeri duvar kaplamalarının imalatı (tekstilden olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.24.03",
    "title": "Tekstil duvar kaplamalarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "17.25.01",
    "title": "Kağıt veya mukavvadan etiketlerin imalatı"
  },
  {
    "code": "17.25.02",
    "title": "Sigara kağıdı, kağıt ve mukavvadan bobin, makara, masura, yumurta viyolü ve benzeri kağıt, mukavva veya kağıt hamurundan destekler ile kağıttan hediyelik ve süs eşyaları imalatı"
  },
  {
    "code": "17.25.03",
    "title": "Filtre kağıdı, kartonları ve mukavvaları, kağıt hamurundan filtre edici blok ve levhalar ile kalıplanmış ya da sıkıştırılmış eşyaların imalatı (kağıt veya karton esaslı contalar ve rondelalar dahil)"
  },
  {
    "code": "17.25.99",
    "title": "Başka yerde sınıflandırılmamış kağıt ve mukavvadan diğer ürünlerin imalatı"
  },
  {
    "code": "18.11.01",
    "title": "Gazetelerin basımı (haftada dört veya daha fazla yayınlananlar)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "18.12.01",
    "title": "Çıkartma, takvim, ticari katalog, tanıtım broşürü, poster, satış bülteni, kartpostal, davetiye ve tebrik kartları, yıllık, rehber, resim, çizim ve boyama kitapları, çizgi roman vb. basım hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "18.12.02",
    "title": "Gazetelerin, dergilerin ve süreli yayınların basım hizmetleri (haftada dört kereden daha az yayınlananlar)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "18.12.03",
    "title": "Ansiklopedi, sözlük, kitap, kitapçık, müzik eserleri ve müzik el yazmaları, atlas, harita vb. basım hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "18.12.04",
    "title": "Röprodüksiyon basımı (bir sanat eserinin aslını bozmadan basılması)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "18.12.06",
    "title": "Posta pulu, damga pulu, matbu belgeler, tapu senetleri, akıllı kart, çek defterleri, kağıt para ve diğer değerli kağıtların ve benzerlerinin basım hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "18.12.07",
    "title": "Plastik, cam, metal, ağaç ve seramik üstüne baskı hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "18.12.08",
    "title": "Fotokopi çekme faaliyetleri"
  },
  {
    "code": "18.12.99",
    "title": "Başka yerde sınıflandırılmamış diğer matbaacılık (USB, mobil cihazlar, hafıza kartları vb. kaynaklardan fotoğraf basımı dahil)"
  },
  {
    "code": "18.13.01",
    "title": "Basımda kullanmak üzere baskı klişeleri ya da silindirleri ile diğer basım unsurlarının üretilmesi (klişecilik vb.) ile mizanpaj, dizgi, tabaka yapım hizmetleri, gravür baskı için silindirlerin kazınması veya asitle aşındırılması vb. hizmetler",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "18.13.02",
    "title": "Basım öncesi bilgisayar destekli hizmetler (bilgisayar destekli sayfa tasarımı ile saydam, asetat, reprografik sunum araçları ve diğer sayısal sunum ortamları, taslaklar, planlar vb. baskı ürünlerinin tasarlanması) (masa üstü yayımcılık dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "18.14.01",
    "title": "Ciltçilik ve ilgili hizmetler (katlama, birleştirme, dikme, yapıştırma, kesme, kapak takma gibi işlemler ile damgalama, Braille alfabesi kopyalama vb. hizmetler)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "18.20.02",
    "title": "Ses ve görüntü kayıtlarının çoğaltılması hizmetleri (CD'lerin, DVD'lerin, kasetlerin ve benzerlerinin asıl (master) kopyalarından çoğaltılması)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "18.20.03",
    "title": "Yazılımların çoğaltılması hizmetleri (CD, kaset vb. ortamlardaki bilgisayar yazılımlarının ve verilerin asıl (master) kopyalarından çoğaltılması)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "19.10.10",
    "title": "Linyit ve turbadan kok fırını ürünlerinin imalatı (kok ve yarı kok kömürü, karni kömürü, katran, zift ve zift koku vb. ürünlerin imalatı ile kok kömürünün topak haline getirilmesi dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "19.10.11",
    "title": "Taşkömüründen kok fırını ürünlerinin imalatı (kok ve yarı kok kömürü, karni kömürü, katran, zift ve zift koku vb. ürünlerin imalatı ile kok kömürünün topak haline getirilmesi dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "19.20.12",
    "title": "Turba, linyit ve taş kömürü briketleri imalatı (kömür tozundan basınçla elde edilen yakıt)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "19.20.15",
    "title": "Petrol türevi yakıtların, petrol gazları ve diğer hidrokarbonların imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "19.20.16",
    "title": "Petrolden madeni yağların (yağlama ve makine yağları) imalatı (gres yağı dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "19.20.17",
    "title": "Vazelin, parafin mumu, petrol mumu, petrol koku, petrol bitümeni ve diğer petrol ürünlerinin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "19.20.19",
    "title": "Ağırlık itibariyle %70 veya daha fazla oranda petrol yağları veya bitümenli yağlardan elde edilen diğer karışımların üretimi (%70 petrol yağı ile karıştırılmış biyodizelden ürünler dahil, madeni yağlar hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.11.01",
    "title": "Sanayi gazları imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.12.01",
    "title": "Boya maddeleri ve pigment imalatı (birincil formda veya konsantre olarak herhangi bir kaynaktan) (hazır boyalar hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.12.02",
    "title": "Tabaklama ekstreleri, bitkisel kökenli; tanenler ve tuzları, eterleri, esterleri ve diğer türevleri; bitkisel veya hayvansal kökenli renklendirme maddelerinin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.13.02",
    "title": "Metalik halojenler, hipokloritler, kloratlar ve perkloratların imalatı (çamaşır suyu dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.13.03",
    "title": "Sülfidler (sülfürler), sülfatlar, fosfinatlar, fosfonatlar, fosfatlar ve nitratların imalatı (şap dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.13.04",
    "title": "Karbonatların imalatı (sodyum, kalsiyum ve diğerleri) (çamaşır sodası dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.13.06",
    "title": "Uranyum, plütonyum ve toryum cevherlerinin zenginleştirilmesi (nükleer reaktörler için yakıt kartuşları dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.13.90",
    "title": "Diğer metal tuzları ve temel inorganik kimyasalların imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.13.99",
    "title": "Başka yerde sınıflandırılmamış kimyasal elementler, inorganik asitler ve bileşiklerin imalatı"
  },
  {
    "code": "20.14.00",
    "title": "Diğer organik temel kimyasalların imalatı"
  },
  {
    "code": "20.15.01",
    "title": "Fosfatlı veya potasyumlu gübreler, iki (azot ve fosfor veya fosfor ve potasyum) veya üç besin maddesi (azot, fosfor ve potasyum) içeren gübreler, sodyum nitrat ile diğer kimyasal ve mineral gübrelerin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.15.02",
    "title": "Bileşik azotlu ürünlerin imalatı (gübreler hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.16.01",
    "title": "Birincil formda poliamitler, üre reçineleri, melamin reçineleri, vb. plastik hammaddelerin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.16.02",
    "title": "Birincil formda alkid reçine, polyester reçine, epoksi reçine, poliasetal, polikarbonat ile diğer polieter ve polyester imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.16.03",
    "title": "Birincil formda polimerlerin imalatı (etilen, propilen, stiren, vinil klorür, vinil asetat, vinil esterleri, akrilik vb. polimerleri ile sertleştirilmiş proteinler, doğal kauçuğun kimyasal türevleri dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.16.04",
    "title": "Birincil formda silikon ve polimer esaslı iyon değiştiricileri imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.16.05",
    "title": "Birincil formda diğer amino reçineler, fenolik reçineler, poliüretanlar, politerpenler, polisülfürler, selüloz ve kimyasal türevleri ile diğer petrol reçineleri imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.17.01",
    "title": "Birincil formda sentetik kauçuk imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.20.11",
    "title": "Böcek ilacı, kemirgen ilacı, küf ve mantar ilacı, yabancı otla mücadele ilacı imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.20.13",
    "title": "Çimlenmeyi önleyici ve bitki gelişimini düzenleyici ürün imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.20.15",
    "title": "Dezenfektan imalatı (tarımsal ve diğer kullanımlar için) (hijyenik maddeler, bakteriostatlar ve sterilize ediciler dahil) (doğal dezenfektanlar hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.20.16",
    "title": "Doğal dezenfektan imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "20.20.90",
    "title": "Diğer zirai kimyasal ürünlerin imalatı (gübre ve azotlu bileşik imalatı hariç)"
  },
  {
    "code": "20.30.11",
    "title": "Boya ve vernikler, akrilik ve vinil polimer esaslı olanların (sulu ortamda dağılanlar, çözülenler ve çözeltiler) imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.30.12",
    "title": "Macun imalatı (dolgu, cam, sıvama için olanlar ile üstübeç, vb. dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.30.14",
    "title": "Boya ve vernikler, polyester, akrilik ve vinil polimer esaslı olanların (susuz ortamda dağılanlar, çözülenler ve çözeltiler) imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.30.15",
    "title": "Hazır boya pigmentleri, matlaştırıcılar (opaklaştırıcı) ve renklendiriciler, camlaştırılabilir emay ve sırlar, astarlar, cam firit, sıvı cilalar ve benzerlerin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.30.16",
    "title": "Boya müstahzarları hazır kurutucu maddelerinin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.30.17",
    "title": "Elektrostatik toz boya imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.30.90",
    "title": "Diğer boya, vernik ve ilgili ürünlerin imalatı (renk ayarlayıcılar, matbaa mürekkepleri, solventler, incelticiler (tiner))"
  },
  {
    "code": "20.41.01",
    "title": "Kapalı alanlar için kokulu müstahzarlar ve koku gidericiler ile suni mumların imalatı (kişisel kullanım için olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "20.41.03",
    "title": "Ham gliserin (gliserol) imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "20.41.04",
    "title": "Sabun, yıkama ve temizleme müstahzarları (deterjanlar) ile sabun olarak kullanılan müstahzarlar imalatı (kişisel bakım için olanlar ile ovalama toz ve kremleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "20.41.06",
    "title": "Cila, krem ve ovalama krem ve tozlarının imalatı (ayakkabı, mobilya, yer döşemesi, kaporta, cam, metal vb. için)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "20.42.01",
    "title": "Ağız veya diş bakım ürünleri imalatı (diş macunu, vb. ile takma dişleri ağızda sabit tutmaya yarayan macun ve tozlar ile diş temizleme iplikleri dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "20.42.02",
    "title": "Kolonya imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "20.42.03",
    "title": "Parfüm ve koku verici diğer sıvı ürün, manikür/pedikür müstahzarı, güneş koruyucu ürünler, dudak ve göz makyajı ürünü, banyo tuzu, kozmetik veya kişisel bakım amaçlı pudra, sabun ve organik yüzey aktif müstahzarı, deodorant, vb. imalatı (kolonya hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "20.42.04",
    "title": "Şampuan, saç kremi, saç spreyi, jöle, saç düzleştirme ve perma ürünleri, saç losyonları, saç boyaları, vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "20.51.24",
    "title": "Sıvı biyoyakıt imalatı"
  },
  {
    "code": "20.59.01",
    "title": "Fotoğrafik levha ve filmlerin (hassaslaştırılmış, ışığa maruz kalmamış olanlar), anında baskılanan filmlerin, fotoğrafçılıkta kullanılan kimyasal müstahzarların ve karışımsız (saf) ürünlerin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.59.02",
    "title": "Tutkal imalatı"
  },
  {
    "code": "20.59.03",
    "title": "Aktif karbon imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.59.04",
    "title": "Yağlama müstahzarları (hidrolik fren sıvıları dahil), vuruntu önleyici müstahzarlar ile katkı maddeleri ve antifrizlerin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.59.05",
    "title": "Yazım ve çizim mürekkepleri ve diğer mürekkeplerin imalatı (matbaa mürekkebi imalatı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "20.59.06",
    "title": "Peptonlar, diğer protein maddeleri ve bunların türevlerinin ve deri tozlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "20.59.07",
    "title": "Laboratuvar için hazır kültür ortamları, model hamurları, kompozit diyagnostik reaktifler veya laboratuvar reaktifleri imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.59.08",
    "title": "Elektronikte kullanılan macun kıvamında (dope edilmiş) olan kimyasal elementler ile bileşiklerin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.59.09",
    "title": "Bitirme (apreleme dahil) maddeleri, boya hammaddesi ve benzeri ürünlerin sabitlenmesini veya boyayıcılığını hızlandıran boya taşıyıcı maddelerin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.59.10",
    "title": "Dekapaj (temizleme) müstahzarları, eritkenler, hazır vulkanizasyon hızlandırıcı maddeler, kauçuk veya plastikler için plastikleştirici bileşikler ve stabilizatörler, diğer katalitik müstahzarların imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.59.11",
    "title": "Jelatin ve jelatin türevleri ile süt albüminlerinin imalatı (gıda endüstrisinde kullanılan jelatinler ve süt albüminleri hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.59.12",
    "title": "Kimyasal olarak değiştirilmiş veya yenilemeyen hayvansal veya bitkisel katı ve sıvı yağlar ve yağ karışımlarının imalatı (linoksin, teknik ve sanayi amaçlı bitkisel sabit sıvı yağlar, sanayide kullanılan sıvı yağlar, vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "20.59.15",
    "title": "Yangın söndürücü müstahzarları ve dolum malzemeleri imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.59.16",
    "title": "Jelatin ve süt albüminlerinin imalatı (yalnızca gıda endüstrisinde kullanılanlar)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.59.17",
    "title": "Patlayıcı diğer maddelerin imalatı (itici tozların imalatı hariç)"
  },
  {
    "code": "20.59.18",
    "title": "Mikronize edilmiş ve stearik asitle kaplanmış kalsit imalatı"
  },
  {
    "code": "20.59.19",
    "title": "Uçucu yağların imalatı"
  },
  {
    "code": "20.59.20",
    "title": "Barut vb. itici tozların imalatı"
  },
  {
    "code": "20.59.99",
    "title": "Başka yerde sınıflandırılmamış diğer kimyasal ürünlerin imalatı (vakum tüpleri için emiciler, pirolinyitler, kazan taşı önleyici bileşikler, yağ emülsiyonlaştırıcıları, dökümhanelerde kullanılan yardımcı kimyasal ürünler ve hazır bağlayıcılar, vb.)"
  },
  {
    "code": "20.60.01",
    "title": "Kardelenmemiş ve taranmamış suni ve sentetik elyaf imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "20.60.02",
    "title": "Sentetik filament ipliği ve sentetik monofilamentlerin, şeritlerin ve benzerlerinin imalatı (poliamidden ve polyesterden yüksek mukavemetli filament iplikler dahil) (bükülü, katlı ve tekstürize olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "21.10.01",
    "title": "Temel eczacılık ürünlerinin hammaddelerinin  imalatı (antibiyotik, vitamin, salisilik asit gibi ilaçların imalatında farmakolojik özelliklerinden yararlanmak üzere tıbbi olarak etken maddeler ile kan ürünlerinin, salgı bezi ve ekstrelerin, hormonların vb. imalatı) (Kanın işlenmesi dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "21.20.01",
    "title": "Eczacılığa ilişkin tıbbi ilaçların imalatı (antibiyotik içeren tıbbi ilaçlar, ağrı kesiciler, hormon içeren tıbbi ilaçlar vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "21.20.02",
    "title": "Yapışkanlı bandajlar, katkütler ve benzeri tıbbi malzemelerin üretimi (steril cerrahi katgütler, eczacılık maddeleri ile birlikte kullanılan tamponlar, hidrofil pamuk, gazlı bez, sargı bezi vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "21.20.03",
    "title": "Hayvan sağlığına ilişkin tıbbi ilaçların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "21.20.90",
    "title": "Diğer eczacılık müstahzarlarının imalatı (antiserumlar, panzehirler, aşılar, hormon ve spermisit esaslı kimyasal kontraseptik müstahzarlar, diyagnostik reaktifleri ve diğer eczacılık müstahzarları) (hayvan sağlığı için olanlar dahil)"
  },
  {
    "code": "22.11.17",
    "title": "Kauçuktan iç lastiklerin imalatı (dış lastikler için değişebilir sırtlar, kolonlar ve şeritlerin imalatı dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "22.11.18",
    "title": "Kauçuktan dış lastik imalatı (motosikletler, bisikletler, otomobiller, otobüsler, kamyonlar, hava taşıtları, traktörler ve diğer araç ve donanımlar için) (dolgu veya alçak basınçlı lastikler dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "22.11.19",
    "title": "Lastik tekerleklerinin yeniden işlenmesi ve sırt geçirilmesi (lastiğin kaplanması)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "22.12.01",
    "title": "Kauçuktan tüp, boru ve hortumların imalatı (vulkanize kauçuktan)"
  },
  {
    "code": "22.12.02",
    "title": "Kauçuktan silgi, rondela, conta, tekne veya iskele usturmaçaları, gözenekli vulkanize kauçuktan teknik işlerde kullanılan diğer eşyalar ile demiryolu, kara yolu taşıtları ve diğer araçlar için kalıplanmış parçaların imalatı"
  },
  {
    "code": "22.12.03",
    "title": "Kauçuktan konveyör bantları ve taşıma kayışlarının imalatı"
  },
  {
    "code": "22.12.04",
    "title": "Vulkanize edilmiş (kükürtle sertleştirilmiş) kauçuk imalatı (ip, kordon, levha, tabaka, şerit, çubuk ve profil halinde)"
  },
  {
    "code": "22.12.05",
    "title": "Rejenere kauçuk imalatı, birincil formda veya levha, tabaka veya şerit halinde"
  },
  {
    "code": "22.12.06",
    "title": "Kauçuktan paket lastiği, tütün kesesi, cam silecekleri, tarih ıstampaları için karakterler, tapalar, lavabo pompaları, şişeler için tıpa ve halkalar ile sert kauçuktan diğer çeşitli eşyaların imalatı"
  },
  {
    "code": "22.12.07",
    "title": "Kauçuktan yer döşemeleri ve paspasların imalatı"
  },
  {
    "code": "22.12.08",
    "title": "Kauçuktan hijyenik ve eczacılık ürünlerinin imalatı (prezervatifler, emzikler, hijyenik eldivenler vb. dahil)"
  },
  {
    "code": "22.12.09",
    "title": "Kauçuk kaplanmış, emdirilmiş, sıvanmış ve lamine edilmiş tekstil kumaşlarının imalatı, ana bileşeni kauçuk olanlar (kord bezi hariç)"
  },
  {
    "code": "22.12.10",
    "title": "Kauçuktan süpürgelerin ve fırçaların imalatı"
  },
  {
    "code": "22.12.11",
    "title": "Kauçuktan giyim eşyası ve giysi aksesuarlarının imalatı (giysiler, eldivenler vb.)"
  },
  {
    "code": "22.21.03",
    "title": "Plastikten mamul halde tüp, boru, hortum ve bunların bağlantı elemanlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "22.21.04",
    "title": "Plastikten yarı mamul halde profil, çubuk, tabaka, levha, blok, film, folyo, şerit, vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "22.22.43",
    "title": "Plastik ambalaj malzemeleri imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "22.23.08",
    "title": "Plastikten kapı ve pencere imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "22.24.01",
    "title": "Plastikten banyo küvetleri, lavabolar, klozet kapakları, oturakları ve rezervuarları ile benzeri sıhhi ürünlerin imalatı (kalıcı tesisat için kullanılan montaj ve bağlantı parçaları dahil)"
  },
  {
    "code": "22.24.02",
    "title": "Plastikten depo, tank, fıçı ve benzeri kapların imalatı"
  },
  {
    "code": "22.24.03",
    "title": "Plastikten merdiven, merdiven korkuluğu, panjur, güneşlik, jaluzi, stor, vb. eşya ile bunların parçalarının imalatı"
  },
  {
    "code": "22.24.04",
    "title": "Vinil, linolyum (muşamba) gibi esnek yer kaplamaları ile plastik zemin, duvar ve tavan kaplamalarının imalatı (duvar kağıdı hariç)"
  },
  {
    "code": "22.24.05",
    "title": "Plastikten prefabrik yapıların imalatı"
  },
  {
    "code": "22.24.99",
    "title": "Başka yerde sınıflandırılmamış plastik inşaat malzemelerinin imalatı (plastik suni taş-mermerit imalatı hariç)"
  },
  {
    "code": "22.25.00",
    "title": "Plastik ürünlerin işlenmesi ve bitirilmesi"
  },
  {
    "code": "22.26.01",
    "title": "Plastikten sofra, mutfak, banyoda kullanılan eşya (silikon kek kalıbı, leğen, tas, kova vb.) ve diğer ev eşyası imalatı"
  },
  {
    "code": "22.26.02",
    "title": "Plastikten mandal, askı, sünger, sabunluk, tarak, bigudi, toka, saç firketesi, boncuk, biblo, heykelcik ve diğer eşyalar ile mamul haldeki kendinden yapışkanlı levha, şerit vb. ürünlerin imalatı"
  },
  {
    "code": "22.26.03",
    "title": "Makine, mobilya, kaporta, el aletleri ve benzerlerinin plastikten bağlantı parçaları, plastikten taşıyıcı bantların ve konveyör bantlarının imalatı"
  },
  {
    "code": "22.26.04",
    "title": "Plastikten büro ve okul malzemelerinin imalatı"
  },
  {
    "code": "22.26.05",
    "title": "Plastik başlık (koruma amaçlı olanlar hariç), izolasyon bağlantı parçaları ile lambaların, aydınlatma ekipmanlarının, ışıklı tabelaların, vb.nin başka yerde sınıflandırılmamış plastik kısımlarının imalatı"
  },
  {
    "code": "22.26.06",
    "title": "Plastikten dikişsiz giyim eşyası ve giysi aksesuarlarının imalatı (eldiven dahil)"
  },
  {
    "code": "22.26.99",
    "title": "Başka yerde sınıflandırılmamış diğer plastik ürünlerin imalatı"
  },
  {
    "code": "23.11.01",
    "title": "Düz cam imalatı (telli, buzlu cam, renkli veya boyalı düz cam dahil) (dökülmüş, haddelenmiş, çekilmiş, üflenmiş, float, yüzeyi parlatılmış veya cilalanmış ancak başka şekilde işlenmemiş olanlar)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.12.01",
    "title": "Cam ayna imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.12.02",
    "title": "Sertleştirilmiş emniyet camı ve temperli düz cam imalatı (oto camı dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.12.03",
    "title": "Çok katlı yalıtım camları imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.12.04",
    "title": "Levha veya tabaka halinde işlenmiş cam imalatı (kavislendirilmiş, kenarları işlenmiş, gravür yapılmış, delinmiş, emaylanmış/sırlanmış veya başka bir şekilde işlenmiş, fakat çerçevelenmemiş veya monte edilmemiş olanlar) (optik camlar dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.13.01",
    "title": "Camdan şişe, kavanoz ve diğer muhafaza kapları, bardaklar, termos ve diğer vakumlu kapların camdan yapılmış iç yüzeyleri ile camdan sofra ve mutfak eşyaları imalatı (ampuller hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.13.02",
    "title": "Tuvalet, banyo, büro, iç dekorasyon, vb. amaçlarla kullanılan cam ve kristal eşya imalatı (camdan biblo, boncuk vb. küçük cam eşyalar hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.14.01",
    "title": "Cam elyafı imalatı (cam yünü ve bunlardan yapılmış dokuma dışı ürünler dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.15.01",
    "title": "Laboratuvar, hijyen veya eczacılık ile ilgili cam eşyalar ile cam ampullerin (serum ampulleri) imalatı (ambalajlama ve taşımada kullanılanlar hariç)"
  },
  {
    "code": "23.15.02",
    "title": "Lamba ve aydınlatma teçhizatının, ışıklı işaretlerin, isim tabelalarının vb.nin cam parçalarının imalatı (cam tabelaların imalatı dahil)"
  },
  {
    "code": "23.15.03",
    "title": "Sıkıştırılmış veya kalıplanmış camdan döşeme blokları, tuğlalar, karolar ve diğer ürünler, kurşunlu lambalar ve benzerleri, blok, plaka veya benzer şekillerdeki gözenekli, köpüklü camların imalatı (vitray cam hariç)"
  },
  {
    "code": "23.15.04",
    "title": "Küçük cam eşya imalatı (biblo, vb. süs eşyası, boncuklar, imitasyon inciler/taşlar, imitasyon mücevherler, vb. dahil)"
  },
  {
    "code": "23.15.05",
    "title": "Vitray cam imalatı"
  },
  {
    "code": "23.15.06",
    "title": "Camdan elektrik izolasyon malzemesi imalatı"
  },
  {
    "code": "23.15.07",
    "title": "Cam zarflar (açık) ve bunların cam parçalarının imalatı (elektrik ampulleri, elektrik lambaları, katot ışınlı tüpler vb. için kullanılan)"
  },
  {
    "code": "23.15.08",
    "title": "Duvar saati, kol saati veya gözlük için camlar (bombeli, kavisli, içi oyuk vb. şekilde fakat, optik açıdan işlenmemiş) ile bu tür camların imalatı için kullanılan içi boş küre ve bunların parçalarının imalatı"
  },
  {
    "code": "23.15.99",
    "title": "Başka yerde sınıflandırılmamış diğer cam ürünlerin imalatı ve işlenmesi (düz camdan yapılmış akvaryumların imalatı dahil)"
  },
  {
    "code": "23.20.16",
    "title": "Silisli süzme topraktan (kizelgur) ısı yalıtımlı seramik ürünler ile ateşe dayanıklı briket, blok, tuğla, ateş tuğlası, vb. ateşe dayanıklı seramik yapı ürünleri imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.20.17",
    "title": "Ateşe dayanıklı imbikler, damıtma kabı, eritme potası, vana ucu, tüp, boru, döküm potaları, mufl ocağı, püskürtme tüpleri vb. seramik ürünlerin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.20.19",
    "title": "Ateşe dayanıklı çimento imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.20.20",
    "title": "Ateşe dayanıklı çamur, harç, beton vb. imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.31.01",
    "title": "Seramik karo ve kaldırım taşları imalatı (mozaik taşı ve mozaik küpleri dahil) (ateşe dayanıklı olanlar hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.32.02",
    "title": "Fırınlanmış, ateşe dayanıklı olmayan kil ve topraktan baca künkleri ve başlıkları, şömine ve baca boruları, oluklar ve bağlantı parçaları ile karo vb. inşaat malzemeleri imalatı (seramikten oluklar, borular ve bağlantı parçaları dahil) (tuğla ve kiremit hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.32.03",
    "title": "Fırınlanmış, ateşe dayanıklı olmayan kil ve topraktan tuğla ve kiremit imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "23.41.01",
    "title": "Seramik veya porselenden sofra takımları (tabak, bardak, fincan, vb.) ve diğer ev ve tuvalet eşyasının imalatı (çiniden olanlar ve sıhhi ürünler hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.41.02",
    "title": "Seramik ve porselenden heykelcik, vazo, biblo, vb. süs eşyası imalatı (oyuncaklar hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.41.03",
    "title": "Çiniden sofra takımı, ev, tuvalet ve süs eşyası imalatı (çinicilik) (çini dekoru dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.41.04",
    "title": "Topraktan güveç, çanak, çömlek, küp, vazo, vb. eşyalar ile topraktan heykel vb. süs ve dekoratif eşya imalatı (porselen ve çiniden olanlar ile malların ambalajlanması ve taşınması için olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "23.42.01",
    "title": "Seramik sıhhi ürünlerin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.43.01",
    "title": "Seramik yalıtkanların (izolatörlerin) ve yalıtkan bağlantı parçalarının imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.44.01",
    "title": "Diğer teknik seramik ürünlerin imalatı (laboratuvar, kimyasal ve diğer teknik alanlarda kullanılan seramikten ürünler) (ateşe dayanıklı seramik ürünler hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.45.01",
    "title": "Tarımsal amaçlı olanlar ile malların taşınması ya da ambalajlanması için kullanılan seramik ürünlerin imalatı"
  },
  {
    "code": "23.45.99",
    "title": "Başka yerde sınıflandırılmamış yapı işlerinde kullanılmayan diğer seramik eşyaların imalatı (dekoratif amaçlı olmayan seramik saksılar dahil)"
  },
  {
    "code": "23.51.01",
    "title": "Çimento imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.52.01",
    "title": "Sönmemiş kireç, sönmüş kireç ve suya dayanıklı kireç imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.52.02",
    "title": "Sönmüş alçıtaşından ya da sönmüş sülfattan alçı imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.52.03",
    "title": "Yanmış (kalsine edilmiş) veya aglomera edilmiş dolomit imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.61.01",
    "title": "Çimentodan, betondan veya suni taştan prefabrik yapı elemanları imalatı (gazbetondan ve kireç taşından olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "23.61.02",
    "title": "Çimentodan, betondan veya suni taştan karo, döşeme taşı, kiremit, tuğla, boru, vb. inşaat amaçlı ürünlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "23.61.03",
    "title": "Betondan yapılmış prefabrik yapıların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "23.62.01",
    "title": "İnşaat amaçlı alçı ürünlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "23.63.01",
    "title": "Hazır beton imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "23.64.01",
    "title": "Toz harç imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "23.65.02",
    "title": "Lif ve çimento karışımlı ürünlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "23.66.00",
    "title": "Beton, çimento ve alçıdan diğer eşyaların imalatı"
  },
  {
    "code": "23.70.01",
    "title": "Taş ve mermerin kesilmesi, şekil verilmesi ve bitirilmesi (doğal taşlardan, mermerden, su mermerinden, travertenden, kayağantaşından levha/tabaka, kurna, lavabo, karo, kaldırım taşı, yapı taşı, mezar taşı, vb. imalatı dahil, süs eşyası hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.70.02",
    "title": "Doğal taşlardan, mermerden, su mermerinden, travertenden, kayağantaşından süs eşyası imalatı (lületaşı, kehribar ve benzerlerinden olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "23.91.01",
    "title": "Aşındırıcı ürünlerin imalatı (değirmen taşları, bileği taşı, zımpara taşı vb.)(dokuma tekstil kumaşlarına, kağıt ve mukavvaya tutturulmuş zımparalar hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.91.02",
    "title": "Dokuma tekstil kumaşlarına, kağıt ve mukavvaya tutturulmuş olan zımparaların imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.99.01",
    "title": "Asfalttan ve benzeri malzemelerden yapılan ürünlerin imalatı (çatı yapımında veya su yalıtımında kullanılan bitüm esaslı keçeler dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.99.02",
    "title": "Mineral ses/ısı izolasyon malzemelerinin imalatı (cüruf yünleri, taş yünü, madeni yünler, pul pul ayrılmış vermikulit, genleştirilmiş kil, soğuk tandiş plakası, vb. ısı ve ses yalıtım malzemeleri)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.99.03",
    "title": "İşlenmiş asbest (amyant) lifleri, asbest ve magnezyum karbonat esaslı karışımlar, bu karışımlardan veya asbestten yapılan ürünler, fren, debriyaj ve benzerleri için monte edilmemiş sürtünme malzemeleri (fren balatası vb.) imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.99.05",
    "title": "Bitümlü karışımların imalatı (doğal veya suni taştan malzemeler ile bir bağlayıcı olarak bitüm, doğal asfalt veya ilgili maddelerin karıştırılmasıyla elde edilenler)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.99.07",
    "title": "Amyantlı kağıt imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.99.09",
    "title": "Suni korindon imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "23.99.99",
    "title": "Başka yerde sınıflandırılmamış metal dışı minerallerden ürünlerin imalatı"
  },
  {
    "code": "24.10.01",
    "title": "Ham çelik üretilmesi",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.10.02",
    "title": "Çelikten açık profil imalatı (sıcak haddeleme, sıcak çekme veya kalıptan çekme işlemlerinden daha ileri işlem görmemiş)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.10.03",
    "title": "Demir ve çelikten sıcak veya soğuk çekilmiş yassı hadde ürünleri imalatı (demir veya çelik alaşımlı levha, şerit, sac, teneke sac, vb. dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.10.05",
    "title": "Sıcak haddelenmiş demir veya çelikten bar ve çubukların üretilmesi (inşaat demiri dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.10.06",
    "title": "Demir veya çelik granül ve demir tozu üretilmesi",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.10.07",
    "title": "Demir ya da çelik hurdaların yeniden eritilmesi",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.10.08",
    "title": "Demir cevherinin doğrudan indirgenmesiyle elde edilen demirli ürünler ve diğer sünger demir ürünlerinin imalatı ile elektroliz veya diğer kimyasal yöntemlerle istisnai saflıkta demir üretilmesi",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.10.09",
    "title": "Çelikten demir yolu ve tramvay yolu yapım malzemesi (birleştirilmemiş raylar ile ray donanımı, aksamı, vb.) ile levha kazıkları (palplanş) ve kaynaklı açık profil imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.10.10",
    "title": "Pik demir ve manganezli dökme demir (aynalı demir/spiegeleisen) üretimi (külçe, blok, veya diğer birincil formlarda)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.10.12",
    "title": "Ferro alaşımların imalatı (ferro manganez, ferro silisyum, ferro siliko manganez, ferro krom ve diğerleri)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.20.09",
    "title": "Çelikten/demirden yapılmış tüp, boru, içi boş profiller ve ilgili bağlantı parçalarının imalatı (sıcak çekilmiş veya sıcak haddelenmiş)"
  },
  {
    "code": "24.20.10",
    "title": "Çelikten/demirden yapılmış tüp, boru, içi boş profiller ve ilgili bağlantı parçalarının imalatı (soğuk çekilmiş veya soğuk haddelenmiş)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "24.31.01",
    "title": "Barların soğuk çekilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "24.32.01",
    "title": "Dar şeritlerin soğuk haddelenmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "24.33.01",
    "title": "Soğuk şekillendirme veya katlama",
    "hazard": "Tehlikeli"
  },
  {
    "code": "24.34.01",
    "title": "Tellerin soğuk çekilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "24.41.16",
    "title": "İşlenmemiş, yarı işlenmiş, toz halde altın imalatı ile gümüş veya adi metallerin altınla preslenerek kaplanması (Mücevher ve benzeri eşyaların imalatı hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.41.17",
    "title": "İşlenmemiş, yarı işlenmiş, toz halde gümüş imalatı ile adi metallerin gümüşle preslenerek kaplanması (Mücevher ve benzeri eşyaların imalatı hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.41.18",
    "title": "İşlenmemiş, yarı işlenmiş, toz halde platin imalatı ile altın, gümüş veya adi metallerin platinle preslenerek kaplanması (paladyum, rodyum, osmiyum ve rutenyum imalatı ile platin katalizör imalatı dahil) (Mücevher ve benzeri eşyaların imalatı hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.41.19",
    "title": "Değerli metal alaşımlarının imalatı (Mücevher ve benzeri eşyaların imalatı hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.42.16",
    "title": "Alüminyum folyo imalatı (alaşımdan olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "24.42.17",
    "title": "Alüminyum imalatı (işlenmemiş halde)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.42.18",
    "title": "Alüminyum sac, levha, tabaka, şerit imalatı (alaşımdan olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "24.42.20",
    "title": "Alüminyum oksit imalatı (suni korindon hariç) (alümina)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.42.21",
    "title": "Alüminyum bar, çubuk, tel ve profil, tüp, boru ve bağlantı parçaları imalatı (alaşımdan olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "24.43.01",
    "title": "Kurşun tabaka, levha, şerit, folyo, kurşun tozu ve pulu imalatı (alaşımdan olanlar dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.43.02",
    "title": "Kurşun imalatı (işlenmemiş)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.43.04",
    "title": "Kalay bar, çubuk, profil, tel, vb. imalatı (alaşımdan olanlar dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.43.05",
    "title": "Kalay imalatı (işlenmemiş halde)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.43.06",
    "title": "Çinko imalatı (işlenmemiş halde)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.43.07",
    "title": "Çinko bar, çubuk, profil, tel vb. imalatı (alaşımdan olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "24.43.08",
    "title": "Çinko sac, tabaka, levha, şerit, folyo, çinko tozları, vb. imalatı (alaşımdan olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "24.44.01",
    "title": "Bakır, bakır matı, bakır tozu, semente bakır, bakır anotu ile bakır ve bakır alaşımlarının imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.44.03",
    "title": "Bakır sac, tabaka, levha, şerit, folyo imalatı (alaşımdan olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "24.44.04",
    "title": "Bakırın çekilmesi ve haddelenmesi ile tüp, boru, bunların bağlantı elemanları, bar, çubuk, tel ve profil imalatı (alaşımdan olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "24.45.01",
    "title": "Maden cevherlerinden ya da oksitlerden işlenmemiş krom, manganez, nikel, tungsten, molibden, tantalum, kobalt, bizmut, titanyum, zirkonyum, berilyum, germanyum vb. imalatı (alaşımları dahil)(atık ve hurdalardan dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.45.02",
    "title": "Krom, manganez, tungsten, molibden, tantalum, kobalt, bizmut, titanyum, zirkonyum, berilyum, germanyum vb. diğer demir dışı metallerden yapılan ürünlerin imalatı (sermetler ve diğer ara ürünler dahil, nikelden olanlar hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.45.06",
    "title": "Nikel matları, nikel oksit sinterleri ve diğer ara ürünleri ile nikel bar, çubuk, profil, tel, levha, şerit, folyo, tüp, boru ve bağlantı parçaları imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.46.00",
    "title": "Nükleer yakıtların işlenmesi"
  },
  {
    "code": "24.51.13",
    "title": "Demir döküm",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.52.20",
    "title": "Çelik dökümü",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.53.01",
    "title": "Hafif metallerin dökümü",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.54.02",
    "title": "Değerli metallerin dökümü",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "24.54.90",
    "title": "Demir dışı diğer metallerin dökümü (değerli metallerin dökümü hariç)"
  },
  {
    "code": "25.11.06",
    "title": "İnşaat ve inşaatın parçaları için metal çatı ya da iskeletlerin imalatı (kuleler, direkler, destekler, köprüler vb.) (kepenk ve yangın merdiveni ile prefabrik yapılar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.11.07",
    "title": "Metalden kepenk ve yangın merdiveni imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.11.08",
    "title": "Metalden prefabrik yapı imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.12.04",
    "title": "Alüminyum kapı, pencere, bunların kasaları, kapı eşiği, panjur, vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.12.05",
    "title": "Çelik kapı, pencere, bunların kasaları, kapı eşiği, panjur, vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.12.06",
    "title": "Demir kapı, pencere, bunların kasaları, kapı eşiği, panjur, vb. imalatı (bahçe kapıları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.21.10",
    "title": "Merkezi ısıtma radyatörleri imalatı (elektrikli radyatörler ile döküm olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.21.12",
    "title": "Merkezi ısıtma radyatörleri imalatı, döküm olanlar (elektrikli radyatörler hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "25.21.13",
    "title": "Buhar üretim kazanları (buhar jeneratörü), kızgın su kazanları (boyler), denizcilik veya enerji kazanları ile bunların parçaları ile kazanlar (boylerler) için yardımcı üniteler ve buhar veya diğer buhar güç üniteleri için kondansatör imalatı"
  },
  {
    "code": "25.21.14",
    "title": "Nükleer reaktörler ve nükleer reaktör parçası imalatı (izotop ayırıcılar hariç)"
  },
  {
    "code": "25.22.01",
    "title": "Metalden rezervuarlar, tanklar, fıçılar ve benzeri kapasitesi > 300 litre olan konteynerlerin imalatı (sıkıştırılmış veya sıvılaştırılmış gazlar için olanlar ile mekanik veya termal ekipmanlı olanlar hariç)"
  },
  {
    "code": "25.22.02",
    "title": "Sıkıştırılmış veya sıvılaştırılmış gaz için kullanılan metal konteynerlerin imalatı"
  },
  {
    "code": "25.30.03",
    "title": "Tabanca, revolver (altıpatlar), av tüfeği, havalı tabanca, cop, vb. askeri amaçlı olmayan ateşli silahlar ve benzeri aletlerin ve bunların parçalarının imalatı"
  },
  {
    "code": "25.30.04",
    "title": "Askeri silah ve bunların parçalarının imalatı (büyük toplar, savaş araçları, füzeatarlar, torpil kovanları, ağır makineli tüfekler, vb.)"
  },
  {
    "code": "25.30.05",
    "title": "Bomba, füze ve benzeri savaş gereçleri, fişekler, diğer mermi ve mühimmatlar ile bunların parçalarının imalatı"
  },
  {
    "code": "25.40.04",
    "title": "Metallerin dövülmesi, preslenmesi, baskılanması ve damgalanması"
  },
  {
    "code": "25.40.05",
    "title": "Toz metalürjisi"
  },
  {
    "code": "25.51.01",
    "title": "Metallerin nikel ile kaplanması (nikelajcılık) faaliyeti"
  },
  {
    "code": "25.51.02",
    "title": "Metallerin kalay ile kaplanması (kalaycılık) faaliyeti"
  },
  {
    "code": "25.51.09",
    "title": "Metallerin diğer malzemelerle kaplanması (ısıl işlem hariç)"
  },
  {
    "code": "25.52.00",
    "title": "Metallerin ısıl işlemi"
  },
  {
    "code": "25.53.01",
    "title": "Metallerin makinede işlenmesi (torna tesfiye işleri, metal parçaları delme, tornalama, frezeleme, rendeleme, parlatma, oluk açma, perdahlama, birleştirme, kaynak yapma, çapak alma, kumlama, vb. faaliyetler)"
  },
  {
    "code": "25.53.02",
    "title": "CNC oksijen, CNC plazma, CNC su jeti vb. makinelerinin kullanılması yoluyla metallerin kesilmesi veya üzerlerinin yazılması"
  },
  {
    "code": "25.53.03",
    "title": "Lazer ışınlarının kullanılması yoluyla metallerin kesilmesi veya üzerlerinin yazılması"
  },
  {
    "code": "25.61.04",
    "title": "Kaşık, çatal, kepçe, kevgir, servis spatulası, şeker maşası ve benzeri mutfak gereçleri, sofra takımları, çatal bıçak takımları imalatı (balık bıçakları, kahvaltı ve meyve bıçakları dahil fakat, sofra bıçakları hariç)"
  },
  {
    "code": "25.61.05",
    "title": "Tıraş bıçakları, usturalar ile jiletler ve tıraş makinelerinin bıçaklarının imalatı"
  },
  {
    "code": "25.61.06",
    "title": "Sofra bıçakları (balık bıçakları, kahvaltı ve meyve bıçakları hariç), budama bıçakları, sustalı bıçaklar, satır,balta vb. bıçaklar (makineler için olanlar hariç) ile terzi makasları, vb. makaslar ve bunların ağızlarının imalatı"
  },
  {
    "code": "25.61.07",
    "title": "Manikür veya pedikür setleri ve aletleri, kağıt bıçakları, mektup açacakları, kalemtıraşlar ve bunların bıçakları, kırma, yarma ve kıyma bıçakları, saç kesme ve hayvan kırkma makine ve aletleri ile benzeri elektriksiz kesici aletlerin imalatı"
  },
  {
    "code": "25.61.08",
    "title": "Kılıç, pala, kasatura, mızrak, süngü, avcı bıçağı ve benzeri silahlar ile bunların parçalarının imalatı"
  },
  {
    "code": "25.62.04",
    "title": "Kilit ve menteşe imalatı"
  },
  {
    "code": "25.63.01",
    "title": "Metalden kalıp ve döküm modeli imalatı (kek ve ayakkabı kalıpları hariç)"
  },
  {
    "code": "25.63.02",
    "title": "Plastikten kalıp ve döküm modeli imalatı (kek ve ayakkabı kalıpları hariç)"
  },
  {
    "code": "25.63.03",
    "title": "Ahşap ve diğer malzemelerden kalıp ve döküm modeli imalatı (kek ve ayakkabı kalıpları hariç)"
  },
  {
    "code": "25.63.04",
    "title": "El aletleri, takım tezgahı uçları, testere ağızları, mengeneler, kıskaçlar, sıkıştırma anahtarları vb. imalatı (makineler veya mekanik cihazlar için değiştirilebilen uçlar dahil)"
  },
  {
    "code": "25.91.01",
    "title": "Çelik varil ve benzer muhafazaların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.92.01",
    "title": "Demir veya çelikten yiyecek, içecek ve diğer ürünler için kapasitesi < 50 litre olan kutuların imalatı (lehim veya kıvrılarak kapatılanlar) (tenekeden olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.92.02",
    "title": "Adi metalden dişli kapaklar (şişe kapağı vb.) ve tıpalar ile tıkaçlar ve kapakların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.92.03",
    "title": "Kapasitesi 300 lt.yi geçmeyen alüminyum varil fıçı, kova vb. imalatı (diş macunu, krem gibi kapaklı tüpler ve katlanabilir kutular ile aerosol kutuları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.93.01",
    "title": "Metalden zincirler (mafsallı bağlantı zinciri hariç) ve parçaları ile yay ve yay yaprakları, kaplanmış veya nüveli teller, çubuklar, tüpler, levhalar ve elektrotların imalatı (elektrik işlerinde kullanılanlar ile elektrik yalıtımı olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.93.02",
    "title": "İğne, çengelli iğne, çuvaldız, örgü şişi, tığ, raptiye, çivi, vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.93.03",
    "title": "Telden yapılan diğer ürünlerin imalatı (örgülü tel, örme şerit,örme halat, taşıma askısı, dikenli tel (elektrik yalıtımı olanlar hariç) ve demir, çelik veya bakır tellerden mensucat, ızgara, ağ, kafeslik ve çitler)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.94.01",
    "title": "Yivsiz bağlantı malzemeleri imalatı, demir, çelik veya bakırdan (rondelalar, perçinler, perçin çivileri, kamalı pimler, kopilyalar vb. ürünler)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.94.02",
    "title": "Yivli bağlantı malzemeleri imalatı, demir, çelik veya bakırdan (vidalar, cıvatalar, somunlar vb. yivli ürünler)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.99.01",
    "title": "Demir, çelik ve alüminyumdan sofra ve mutfak eşyalarının imalatı (tencere, tava, çaydanlık, cezve, yemek kapları, bulaşık telleri vb.) (teflon, emaye vb. ile kaplanmışlar dahil, bakırdan olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.99.02",
    "title": "Metalden yapılmış eviye, lavabo, küvet, duş teknesi, jakuzi (emaye olsun ya da olmasın) ve diğer sıhhi ürünlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.99.03",
    "title": "Zırhlı veya güçlendirilmiş kasalar, kasa daireleri, kilitli para kasaları, zırhlı kapılar vb. imalatı (adi metalden)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.99.04",
    "title": "Adi metalden büro malzemeleri imalatı (dosya kutuları, kaşeler, zımba telleri, kağıt ataçları vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.99.05",
    "title": "Adi metalden tokalar, klipsli çanta sapları, kemer tokaları, kancalar, halkalar, kuş gözü halkalar ve benzerleri (giysi, ayakkabı, tente, el çantası, seyahat eşyası veya diğer hazır eşya için kullanılan türde) ile adi metallerden boru şeklinde veya çatallı perçinler; boncuklar vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.99.06",
    "title": "Bakırdan sofra ve mutfak eşyası imalatı (cezve, tencere, çanak, tabak, ibrik vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.99.08",
    "title": "Metalden gemi ve tekne pervaneleri ve bunların aksamları ile çıpalar, filika demirleri vb. imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "25.99.12",
    "title": "Kalıba dökülerek yapılan zil, çan, gong vb. eşyalar ile adi metallerden kalıba dökülerek yapılan biblo, heykelcik ve diğer süs eşyası imalatı (bisiklet zilleri dahil ancak bakırdan olanlar ile mutfak eşyaları hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "25.99.13",
    "title": "Metalden çatı olukları, çatı kaplamaları vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.99.14",
    "title": "Adi metallerden işaret levhaları ve tabelalar ile rakamlar, harfler ve diğer sembollerin imalatı (oto plakaları dahil, ışıklı olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.99.15",
    "title": "Kurşun tüp, boru ve bunların bağlantı parçaları ile kurşun bar, çubuk, profil, tel vb. imalatı (alaşımdan olanlar dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "25.99.18",
    "title": "Bakırdan yapılan biblolar, çerçeveler, aynalar ve diğer süsleme eşyaları ile süsleme işleri (mutfak eşyaları hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.99.21",
    "title": "Metalden elektriksiz hazneli döner bacaların, havalandırma kanallarının vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "25.99.99",
    "title": "Başka yerde sınıflandırılmamış diğer fabrikasyon metal ürünlerin imalatı"
  },
  {
    "code": "26.11.04",
    "title": "Diyotların, transistörlerin, diyakların, triyaklar, tristör, rezistans, ledler, kristal, röle, mikro anahtar, sabit veya ayarlanabilir direnç ve kondansatörler ile elektronik entegre devrelerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.11.05",
    "title": "Katot ışınlı görüntü tüpleri, televizyon kamerası tüpleri ve magnetronlar, klistronlar, mikrodalga tüpleri ve diğer valf tüplerinin, LCD ve plazma TV panelleri ve göstergelerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.11.06",
    "title": "Çıplak baskılı devre kartlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.11.99",
    "title": "Başka yerde sınıflandırılmamış diğer elektronik bileşenlerin imalatı"
  },
  {
    "code": "26.12.01",
    "title": "Yüklü elektronik kart imalatı (yüklü baskılı devre kartları, ses, görüntü, denetleyici, ağ ve modem kartları ile akıllı kartlar vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.20.01",
    "title": "Bilgisayar ve bilgisayar çevre birimleri imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.30.02",
    "title": "Radyo ve televizyon stüdyoları ve yayın teçhizatları ile radyo ve televizyon iletim cihazlarının imalatı (tv kameraları ve baz istasyonları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.30.03",
    "title": "Kızıl ötesi (enfraruj) sinyal kullanan iletişim cihazlarının imalatı (örn: uzaktan kumanda cihazları)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.30.05",
    "title": "Alıcı ve verici antenlerin imalatı (harici, teleskopik, çubuk, uydu, çanak ve hava ve deniz taşıtlarının antenleri)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.30.06",
    "title": "Kablolu ve kablosuz telefon, cep telefonu, kablolu görüntülü telefon, çağrı cihazı ve faks cihazı imalatı (telesekreter imalatı dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.30.08",
    "title": "Merkezi iletişim santral donanımları ile sayısal veya analog telefon-telgraf santrallerinin ve ağ geçitleri, köprüleri, yönlendiricileri gibi veri iletim donanımlarının imalatı (mors veya mors tipi kaydedici ve anahtarlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.30.09",
    "title": "Hırsız ve yangın alarm sistemleri ve kapı konuşma sistemlerinin (diyafon) (görüntülü olanlar dahil) imalatı (motorlu kara taşıtları için alarm sistemleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.30.10",
    "title": "Ses, görüntü veya diğer verilerin alınması, dönüştürülmesi, iletilmesi/yeniden oluşturulması için kullanılan diğer makinelerin imalatı (alıcısı/vericisi bulunan telgraf, teleks cihazları ile anahtarlama ve yönlendirme cihazları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.30.99",
    "title": "Başka yerde sınıflandırılmamış diğer iletişim ekipmanlarının imalatı"
  },
  {
    "code": "26.40.08",
    "title": "Ses ve görüntü oynatıcı ve kaydedicileri, ev tipi video kameralar ve diğer görüntü kayıt veya görüntü çoğaltma cihazlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.40.09",
    "title": "Radyo ve televizyon imalatı (taşıtlarda kullanılanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.40.10",
    "title": "Mikrofon, hoparlör ve kulaklıklar ile elektrikli ses yükselteçlerinin (amplifikatörler) imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.40.11",
    "title": "Monitörler ve projektörlerin imalatı (bilgisayar gibi bir otomatik veri işleme sisteminde kullanılmayanlar)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.40.12",
    "title": "Video oyun ve konsollarının (televizyonla kullanılanlar ve kendi ekranı olanlar) imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.40.99",
    "title": "Başka yerde sınıflandırılmamış tüketici elektroniği ürünlerinin imalatı"
  },
  {
    "code": "26.51.01",
    "title": "Hırsız ve yangın alarm sistemleri imalatı (bir kontrol istasyonuna sinyal gönderenler) (motorlu kara taşıtları için olanlar hariç)"
  },
  {
    "code": "26.51.02",
    "title": "Dedektör imalatı (yeraltı kaynakları, maden, mayın, güvenlik kontrol, radyasyon vb. dedektörleri)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.03",
    "title": "Elektrik miktarını (volt, akım vb.) ölçmek ve kontrol etmek için kullanılan alet ve cihazların imalatı (avometre, voltmetre, osiloskop ile diğer voltaj, akım, direnç veya elektrik gücünü ölçüm veya kontrol için olanlar) (elektrik sayaçları hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.04",
    "title": "Hız ve mesafe ölçümünde kullanılan alet ve cihazların imalatı (taşıt hız göstergesi, takometre, taksimetre vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.05",
    "title": "Isı ve sıcaklık ölçümünde kullanılan alet ve cihazların imalatı (termometre, termostat, pirometre vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.06",
    "title": "Işık, ışın ve renk ölçümünde kullanılan alet ve cihazların imalatı (polarimetre, kolorimetre, refraktometre vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.07",
    "title": "Meteorolojide kullanılan alet ve cihazların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.08",
    "title": "Yön bulma pusulaları ile diğer seyrüsefer alet ve cihazlarının, radar ve sonar cihazlarının imalatı (hava, kara ve deniz taşımacılığında kullanılanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.09",
    "title": "Hava, sıvı ve gazların akış, seviye, basınç veya diğer değişkenlerini ölçme ve kontrol etme için kullanılan aletlerin imalatı (hidrometre, debimetre, barometre, higrometre vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.10",
    "title": "Gaz, sıvı veya elektrik üretim veya tüketim sayaçlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.11",
    "title": "Teçhizatlı çizim masaları ve makineleri ile diğer çizim, işaretleme veya matematiksel hesaplama aletlerinin imalatı (pergel takımı, pantograf, resim, çizim, hesap yapmaya mahsus elektrikli/elektronik çiziciler vb. dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.12",
    "title": "Laboratuvar, kuyumculuk vb. yerlerde kullanılan hassas tartıların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.13",
    "title": "Sanayide kullanılan işlem kontrol amaçlı teçhizatların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.14",
    "title": "Telemetreler, teodolitler ve diğer arazi ölçümü, hidrografik, oşinografik, hidrolojik veya jeofizik alet ve cihazlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.15",
    "title": "Seyrüsefere yardımcı telsiz cihazları ile uzaktan kumandalı kontrol cihazlarının (roketler, füzeler, makineler vb) imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.51.99",
    "title": "Başka yerde sınıflandırılmamış ölçme, test ve seyrüsefer amaçlı alet ve cihazların imalatı (hidrolik veya pnömatik otomatik ayar veya kontrol aletleri ile milometreler, pedometreler, stroboskoplar, monostatlar, kumpaslar, spektrometreler dahil)"
  },
  {
    "code": "26.52.03",
    "title": "Devam kayıt cihazları, zaman kayıt cihazları, parkmetreler; duvar ve kol saati makineli zaman ayarlı anahtarların imalatı (vardiya saati vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.52.04",
    "title": "Kol, masa, duvar ve cep saatlerinin, bunların makinelerinin, kasalarının ve diğer parçalarının imalatı (kronometreler ve taşıtlar için gösterge panellerinde bulunan saatler ve benzeri tipteki saatler dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.60.01",
    "title": "Işınlama, elektro medikal ve elektro terapi ile ilgili cihazların imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "26.70.11",
    "title": "Objektif merceği, levha ve tabaka halinde polarizan madde, renk filtresi, optik mercek, prizma, ayna ve diğer optik elemanlar ile dürbün, optik mikroskop, optik teleskop ve diğer astronomik aletler ile bunların aksam ve parçalarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.70.12",
    "title": "Mikrofilm, mikrofiş ve diğer mikroform okuyucuların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.70.13",
    "title": "Sinematografik kameraların ve projektörlerin, diyapozitif (slayt) ve diğer projektörlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.70.16",
    "title": "Fotoğraf makinesi imalatı (dijital, anında görüntü basan, dokümanların mikrofilm, vb. üzerine kaydedilmesinde, deniz altında, hava fotoğrafçılığında, adli tıp veya kriminolojik laboratuvarlarda, vb. kullanılanlar)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.70.19",
    "title": "Flaş lambaları, fotografik agrandisörler (büyütücüler), fotoğraf laboratuvarları için cihazlar, negatoskoplar (ince ışıklı panel), projeksiyon ekranları, likit kristal cihazlar ile lazerlerin (lazer diyotlar hariç) imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "26.70.20",
    "title": "Boş manyetik ses ve görüntü kaset bantlarının imalatı (plak dahil)"
  },
  {
    "code": "26.70.21",
    "title": "Manyetik şeritli kartların imalatı (boş telefon kartı dahil)"
  },
  {
    "code": "26.70.22",
    "title": "Boş CD, DVD, disket, mavi ışınlı (blu-ray) disk, vb. ürünlerin imalatı (disk üretimi için kullanılan kalıp (matris) ve master dahil)"
  },
  {
    "code": "26.70.99",
    "title": "Başka yerde sınıflandırılmamış manyetik ve optik ortamların imalatı"
  },
  {
    "code": "27.11.01",
    "title": "Elektrik motoru, jeneratör ve transformatörlerin imalatı (aksam ve parçaları hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.11.03",
    "title": "Elektrik motoru, jeneratör ve transformatörlerin aksam ve parçalarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.12.01",
    "title": "Elektrik dağıtım ve kontrol cihazları imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.12.02",
    "title": "Elektrik dağıtım ve kontrol cihazlarının aksam ve parçalarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.20.01",
    "title": "Elektrik akümülatör parçalarının imalatı (akümülatör plakaları, separatörler, kurşun ızgaralar) (akümülatör kutu ve kapaklarının imalatı hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "27.20.02",
    "title": "Şarj edilemeyen (birincil) pil ve bataryalar ile bunların aksam ve parçalarının imalatı (manganez dioksitli, cıva oksitli, gümüş oksitli, lityum oksitli, çinko-hava reaksiyonlu pil ve bataryalar)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "27.20.03",
    "title": "Akümülatör imalatı (kurşun asitli, nikel kadmiyum, nikel metal hidrit, lityum-iyon, lityum polimer, nikel demir ve diğer elektrik akümülatörleri)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "27.20.04",
    "title": "Şarj edilebilir pil ve batarya ile bunların parçalarının imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "27.20.05",
    "title": "Akümülatör kutu ve kapaklarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.31.04",
    "title": "Fiber optik kabloların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.32.03",
    "title": "Diğer elektronik ve elektrikli teller ve kabloların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.33.00",
    "title": "Kablolamada kullanılan gereçlerin imalatı"
  },
  {
    "code": "27.40.01",
    "title": "Ampul, flaş küpü ve benzerlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.40.02",
    "title": "Hava ve motorlu kara taşıtları için monoblok far üniteleri, kara, hava ve deniz taşıtları için elektrikli aydınlatma donanımları veya görsel sinyalizasyon ekipmanları imalatı (polis araçları, ambulans vb. araçların dış ikaz lambaları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.40.03",
    "title": "Avize, aplik ve diğer elektrikli aydınlatma armatürleri, sahne, fotoğraf veya sinema stüdyoları için projektörler ve spot ışıkları, elektrikli masa lambaları, çalışma lambaları, abajur vb. lambaların imalatı (süsleme için ışıklandırma setleri dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.40.04",
    "title": "Sokak aydınlatma donanımlarının imalatı (trafik ışıkları hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.40.05",
    "title": "Pil, akümülatör veya manyeto ile çalışan portatif elektrik lambaları ve elektriksiz lambalar ile el feneri, gaz ve lüks lambası vb. aydınlatma armatürlerinin imalatı (taşıtlar için olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.40.06",
    "title": "Işıklı tabela, ışıklı reklam panosu ve benzerlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.40.99",
    "title": "Başka yerde sınıflandırılmamış aydınlatma ekipmanları imalatı"
  },
  {
    "code": "27.51.02",
    "title": "Ev tipi elektrikli su ısıtıcıları (depolu su ısıtıcıları, anında su ısıtıcıları, şofben, termosifon dahil), elektrikli ısıtma cihazları (elektrikli soba, radyatör, vb.) ve elektrikli toprak ısıtma cihazlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.51.03",
    "title": "Ev tipi elektrikli süpürge ve halı temizleme/yıkama makineleri ile kuru veya ıslak elektrikli süpürgeler, şarjlı veya pilli el süpürgelerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.51.04",
    "title": "Mutfakta kullanılan elektrikli küçük ev aletlerinin imalatı (çay veya kahve makinesi, semaver, ızgara, kızartma cihazı, ekmek kızartma makinesi, mutfak robotu, mikser, blender, meyve sıkacağı, et kıyma makinesi, tost makinesi, fritöz vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.51.05",
    "title": "Elektrikli diğer küçük ev aletleri (elektrotermik el kurutma makinesi, elektrikli ütü, havlu dispenseri, hava nemlendirici) ile elektrikli battaniyelerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.51.06",
    "title": "Elektrikli kişisel bakım eşyalarının imalatı (elektrikli tıraş makinesi, epilatör ve saç kesme makinesi, elektrotermik saç şekillendirme makinesi (saç kurutma makinesi, bigudi, tarak, saç maşası), elektrikli diş fırçası, vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.51.07",
    "title": "Elektrikli ev aletleri aksam ve parçalarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.51.08",
    "title": "Ev tipi buzdolabı, dondurucu, çamaşır makinesi, çamaşır kurutma makinesi, bulaşık makinesi, vantilatör, aspiratör, fan, aspiratörlü davlumbaz, fırın, ocak, mikrodalga fırın, elektrikli pişirme sacı vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.51.99",
    "title": "Başka yerde sınıflandırılmamış diğer elektrikli ev aletlerinin imalatı"
  },
  {
    "code": "27.52.02",
    "title": "Elektriksiz ev tipi gaz, sıvı veya katı yakıtlı soba, kuzine, ızgara, şömine, mangal, semaver, su ısıtıcısı (termosifon, şofben vb.) vb. aletlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.52.05",
    "title": "Elektriksiz yemek pişirme cihazlarının imalatı (gaz yakıtlı set üstü ocaklar, gaz veya sıvı yakıtlı fırınlar ve ocaklar vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.52.06",
    "title": "Elektriksiz ev aletlerinin aksam ve parçalarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.90.01",
    "title": "Elektro kaplama makinelerinin imalatı (galvanoplasti, elektro kaplama, elektroliz veya elektroforez için)"
  },
  {
    "code": "27.90.03",
    "title": "Elektrikli sinyalizasyon, güvenlik veya trafik kontrol ekipmanlarının imalatı (demir yolları, kara yolları, iç su yolları, taşıt park alanları, limanlar ve hava meydanları için) (trafik ışıkları ve sinyal donanımları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.90.04",
    "title": "Karbon elektrotlar ve elektrik işlerinde kullanılan grafitten veya karbondan diğer ürünlerin imalatı (ısıtıcı kömür rezistanslar, pil kömürleri, ark lambaları ve diğer lambalar için kömürler vb. dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "27.90.05",
    "title": "Elektrikli kaynak ve lehim teçhizatı (lehim havyaları, ark kaynak makineleri, endüksiyon kaynak makineleri vb.) ile metallerin veya sinterlenmiş metal karbürlerin sıcak spreylenmesi için elektrikli makine ve cihazlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.90.06",
    "title": "Sıvı kristal cihazlı (LCD) veya ışık yayan diyotlu (LED) gösterge panelleri ile bys. elektrikli sesli veya görsel sinyalizasyon cihazlarının imalatı (elektronik sayı levhası (skorbord) dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "27.90.99",
    "title": "Başka yerde sınıflandırılmamış diğer elektrikli ekipmanların imalatı"
  },
  {
    "code": "28.11.08",
    "title": "Türbin ve türbin parçalarının imalatı (rüzgar, gaz, su ve buhar türbinleri ile su çarkları ve bunların parçaları) (hava taşıtları için turbo jetler veya turbo pervaneler hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.11.09",
    "title": "Deniz taşıtlarında, demir yolu taşıtlarında ve sanayide kullanılan kıvılcım ateşlemeli veya sıkıştırma ateşlemeli içten yanmalı motorların ve bunların parçalarının imalatı (hava taşıtı, motorlu kara taşıtı ve motosiklet motorları hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.11.10",
    "title": "İçten yanmalı motorlar, dizel motorlar vb.de kullanılan pistonlar, silindirler ve silindir blokları, silindir başları, silindir gömlekleri, emme ve egzos subapları, segmanlar, hareket kolları, karbüratörler, yakıt memeleri vb.nin imalatı  (hava taşıtı, motorlu kara taşıtı ve motosiklet motorları hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.12.05",
    "title": "Akışkan gücü ile çalışan ekipmanların ve bunların parçalarının imalatı (hidrolik ve pnömatik motorlar, hidrolik pompalar, hidrolik ve pnömatik valfler, hidrolik sistemler ve bunların parçaları)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.13.01",
    "title": "Hava veya vakum pompaları ile hava veya diğer gaz kompresörlerinin imalatı (el ve ayakla çalışan hava pompaları ile motorlu taşıtlar için olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.13.02",
    "title": "Sıvı pompaları ve sıvı elevatörleri imalatı (yakıt, yağlama, soğutma ve diğer amaçlar için) (deplasmanlı ve santrifüjlü pompalar ile benzinliklerde kullanılan akaryakıt pompaları dahil) (tulumba dahil, içten yanmalı motorlar için olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.13.03",
    "title": "El ve ayakla çalışan hava pompalarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.13.04",
    "title": "İçten yanmalı motorlara monte edilmek üzere tasarlanmış pompaların imalatı (yağ pompaları, yakıt pompaları (benzin, mazot vb. pompaları) ve soğutma pompaları)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.14.01",
    "title": "Sanayi musluk, valf ve vanaları, sıhhi tesisat ve ısıtmada kullanılan musluk ve vanalar ile doğalgaz vanaları, dökme olanlar",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "28.14.02",
    "title": "Sanayi musluk, valf ve vanaları, sıhhi tesisat ve ısıtmada kullanılan musluk ve vanalar ile doğalgaz vanaları, dökme olanlar hariç",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.15.01",
    "title": "Rulmanlar ve mekanik güç aktarma donanımları imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.15.02",
    "title": "Debriyajlar (kavramalar), mil (şaft) kaplinler ve üniversal mafsalların imalatı (motorlu kara taşıtlarında kullanılan debriyajlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.15.03",
    "title": "Dişliler/dişli takımları, bilyeli ve makaralı vidalar, şanzımanlar, vites kutuları ve diğer hız değiştiricilerin imalatı (motorlu kara taşıtlarında kullanılan vites kutuları ve diferansiyelleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.15.04",
    "title": "Volanlar ve kasnaklar ile mafsallı bağlantı zincirleri ve güç aktarım zincirlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.21.07",
    "title": "Elektrikli veya elektriksiz laboratuar ocakları, döküm ocakları vb. endüstriyel ocak ve fırınlarının imalatı (çöp yakma fırınları ile elektrikli ekmek ve unlu mamul fırınları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.21.10",
    "title": "Güneşle (güneş kolektörleri), buharla ve yağla ısıtma sistemleri ile benzeri ocak ve ısınma donanımları gibi elektriksiz ev tipi ısıtma, soğutma, havalandırma donanımlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.21.11",
    "title": "Merkezi ısıtma kazanları (boyler) imalatı (kombi, kat kaloriferi ve diğer merkezi ısıtma kazanları",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.21.99",
    "title": "Başka yerde sınıflandırılmamış diğer fırın ve ocakların (sanayi ocakları) imalatı (ocak brülörleri (ateşleyicileri), endüksiyon veya dielektrik ısıtma ekipmanları, mekanik kömür taşıyıcıları, mekanik ızgaralar, mekanik kül boşaltıcıları ve benzeri cihazların imalatı, vb.)"
  },
  {
    "code": "28.22.10",
    "title": "El veya motor gücü ile çalışan kaldırma, taşıma, yükleme ya da boşaltma makinelerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.22.11",
    "title": "Asansör, yürüyen merdiven ve yürüyen yolların imalatı (yeraltında kullanılanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.22.12",
    "title": "Pnömatik ve diğer devamlı hareketli asansör, elavatör ve konveyörlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.22.90",
    "title": "Diğer kaldırma, taşıma, yükleme veya boşaltma makinelerinin imalatı"
  },
  {
    "code": "28.23.00",
    "title": "Büro makine ve ekipmanları imalatı (bilgisayarlar ve çevre birimleri hariç)"
  },
  {
    "code": "28.23.90",
    "title": "Diğer büro makine ve ekipmanları imalatı"
  },
  {
    "code": "28.24.01",
    "title": "Motorlu veya pnömatik (hava basınçlı) el aletlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.25.01",
    "title": "Sanayi tipi soğutucu ve dondurucu donanımları ile ısı pompalarının imalatı (camekanlı, tezgahlı veya mobilya tipi soğutucular, kondenserleri ısı değiştiricisi fonksiyonu gören kompresörlü üniteler vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.25.02",
    "title": "Sanayi tipi fan ve vantilatörlerin imalatı (çatı havalandırma pervaneleri dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.25.03",
    "title": "İklimlendirme cihazlarının (klimalar) imalatı (motorlu taşıtlarda kullanılanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.25.04",
    "title": "Isı değiştirici birimlerin (eşanjörler), hava veya diğer gazların sıvılaştırılmasında kullanılan makinelerin ve hava/gazların filtrelenmesi ve arıtılması için kullanılan makine ve cihazların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.29.05",
    "title": "Doldurma, paketleme ve ambalajlama makinelerinin imalatı (doldurma, kapatma, mühürleme, kapsülleme veya etiketleme ve içecekleri gazlandırma vb. için makineler)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.29.07",
    "title": "Metal tabakalardan contaların ve mekanik salmastraların imalatı (diğer malzemelerle birleştirilmiş metal tabakalardan veya iki ya da daha fazla metal tabakasından yapılmış olanlar)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.29.08",
    "title": "Tartı aletleri ve baskül imalatı (ev ve dükkanlarda kullanılan terazi ve kantarlar, sürekli ölçüm için tartılar, taşıt baskülleri (köprü tipi basküller) vb.) (kuyumculukta ve laboratuvarlarda kullanılan hassas tartılar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.29.10",
    "title": "Yangın söndürücüler, püskürtme tabancaları, buhar veya kum püskürtme makineleri vb. sıvı ve tozları atan, dağıtan ya da püskürten mekanik cihazların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.29.18",
    "title": "İçten yanmalı motorlar için yağ filtresi, yakıt filtresi, hava filtresi, gres nipelleri, yağ keçesi ve benzerlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.29.90",
    "title": "Diğer genel amaçlı makinelerin imalatı"
  },
  {
    "code": "28.30.08",
    "title": "Tarımsal amaçlı römork veya yarı römork imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.30.09",
    "title": "Yumurta, meyve ve diğer tarımsal ürünlerin temizlenmesi, tasnif edilmesi veya derecelendirilmesi için kullanılan makine ve ekipmanların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.30.10",
    "title": "Traktörlerin ve yaya kontrollü traktörlerin (motokültörler) imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.30.11",
    "title": "Kümes hayvanı makineleri, arıcılık makineleri ve hayvan yemi hazırlama makinelerinin ve donanımlarının imalatı (kuluçka makineleri dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.30.12",
    "title": "Çim biçme makinelerinin imalatı (traktörlere monte edilen kesici barlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.30.13",
    "title": "Hasat ve harman makinelerinin imalatı (biçer döver, saman yapma makinesi, ot ve saman balyalama makinesi, kök ve yumru hasat makinesi, vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.30.14",
    "title": "Pulluk, saban, tırmık, diskaro, skarifikatör, kültivatör, çapa makinesi, mibzer, fide ve fidan dikim makinesi vb. toprağın hazırlanmasında, ekiminde, dikiminde kullanılan aletler ile gübreleme makinelerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.30.15",
    "title": "Süt sağma makinelerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.30.16",
    "title": "Tarım ve bahçecilikte kullanılan hava, sıvı veya toz atma, dağıtma, püskürtme ve iklimlendirme makinelerinin imalatı (sulama cihazları, pülverizatörler, zirai mücadelede kullanılan portatif sıvı ve toz püskürtücüler, don pervaneleri vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.30.90",
    "title": "Ormancılığa özgü makineler ile tarla bahçe bakımına mahsus diğer makine ve cihazların imalatı"
  },
  {
    "code": "28.41.01",
    "title": "Takım tezgahları (metal işlemek için lazer ve benzerleriyle çalışanlar) ile metal ve benzerlerini işlemek için işleme merkezlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.41.03",
    "title": "Metal tornalama, delme, frezeleme ve planyalama takım tezgahlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.41.07",
    "title": "Metal işleyen takım tezgahlarının parça ve aksesuarlarının imalatı (alet tutacakları ve kendinden açılan pafta kafaları, iş tutacakları, ayırıcı kafalar ve takım tezgahları için diğer özel aksesuarlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.41.90",
    "title": "Metal işlemek için kullanılan diğer takım tezgahlarının imalatı"
  },
  {
    "code": "28.42.01",
    "title": "Ahşap, mantar, kemik, sert kauçuk, sert plastik veya benzeri sert malzemeleri işlemek için olan takım tezgahı ile bunların parçalarının imalatı (transfer, testere, planya, freze, taşlama, zımparalama, parlatma, bükme, delme, dilimleme, pres, vb.)"
  },
  {
    "code": "28.42.02",
    "title": "Takım tezgahları ve el aletleri için takım tutucuları ve kendinden açılan pafta kafaları, işlenecek parça tutucuları, bölme başlıkları ve diğer özel ek parçalar, dingiller, yüksükler ve rakorlar ile fikstürlerin imalatı"
  },
  {
    "code": "28.42.03",
    "title": "Taş, seramik, beton veya benzeri mineral malzemeleri işlemek veya camı soğuk işlemek için olan takım tezgahı ile bunların parçalarının imalatı (testere, taşlama, parlatma, vb.)"
  },
  {
    "code": "28.42.99",
    "title": "Başka yerde sınıflandırılmamış diğer takım tezgahlarının imalatı"
  },
  {
    "code": "28.91.01",
    "title": "Konvertörler (metalürji), külçe kalıpları (ingot kalıpları), döküm kepçeleri, döküm makineleri, vb. sıcak metallerin işlenmesi için kullanılan makine ve teçhizatın imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.91.02",
    "title": "Sıcak ve soğuk metal haddeleme makinesi ve metal boru imaline özgü hadde makinesi ile hadde ve metalürji makineleri için silindir ve diğer parçaların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.92.01",
    "title": "Beton ve harç karıştırıcılarının imalatı (mikserler dahil, beton karıştırıcılı (mikserli) kamyonlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.92.02",
    "title": "Buldozer, angledozer, greyder, skreyper, düzleyici, önden küreyici-yükleyici, kepçeli yükleyici, mekanik kepçe, ekskavatör, kazık çakma (kazık varyosları) ve sökme makineleri, harç ve asfalt yayıcılar ile beton kaplama makinelerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.92.03",
    "title": "Taş, toprak, cevher, alçı, çimento ve diğer mineral maddeleri tasnif etme, eleme, ayırma, yıkama, ezme, öğütme, karıştırma, yoğurma vb. işlemden geçirme için kullanılan makinelerin imalatı (beton ve harç karıştırıcılar (mikserler) hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.92.05",
    "title": "Kömür veya kaya kesicileri (havözler), tünel ve kuyu açma makineleri ile delme ve sondaj makinelerinin imalatı (yer altı veya yer üstü)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.92.06",
    "title": "Yer altı kullanımı için sürekli hareketli elevatör ve konveyörlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.92.08",
    "title": "Paletli traktörlerin imalatı (inşaat veya madencilikte kullanılan traktörler)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.92.09",
    "title": "Kara yolu dışında kullanılan damperli kamyonların imalatı (mega kamyonlar)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.92.10",
    "title": "Kar küreyici ve püskürtücüleri, toprağı sıkıştırmaya veya bastırıp sıkıştırmaya mahsus makineler ile maden, taş ocağı, inşaat, imar, park vb. işler için kullanılan diğer makinelerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.92.11",
    "title": "Delme, sondaj, hafriyat ve kazı makinesi parçalarının, vinç ve hareketli kaldırma kafeslerinin ve toprak, taş ve benzeri maddeleri tasnifleme, öğütme, karıştırma veya diğer işlerde kullanılan makine parçalarının imalatı (buldozer bıçakları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.93.02",
    "title": "Şarap, meyve suyu ve benzeri içeceklerin imalatında kullanılan makinelerin imalatı (presler, eziciler ve benzeri makineler)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.93.03",
    "title": "Süt ürünleri makinelerinin ve santrifüjlü krema ayırıcılarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.93.04",
    "title": "Tütünün hazırlanmasında ve işlenmesinde kullanılan makinelerin imalatı (tütün yapraklarını damarlarından ayıran makineler ile enfiye, sigara, puro, pipo tütünü veya çiğneme tütünleri imalinde kullanılan makineler)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.93.06",
    "title": "Değirmencilik sanayiinde, hububat veya kurutulmuş sebzelerin işlenmesi veya öğütülmesi için kullanılan makinelerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.93.07",
    "title": "Ekmek ve diğer unlu mamuller için elektrikli olmayan fırınların imalatı (gaz, sıvı ve katı yakıtlı olanlar)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.93.08",
    "title": "Ev tipi olmayan pişirme veya ısıtma cihazlarının imalatı (ev tipi olmayan filtreli kahve makineleri vb. dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.93.09",
    "title": "Tarımsal ürünler için kurutucuların imalatı (kahve, kuruyemiş vb. için kavurma makine ve cihazları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.93.10",
    "title": "Tohumların, tanelerin veya kuru baklagillerin temizlenmesi, tasnif edilmesi veya derecelendirilmesi için kullanılan makinelerin imalatı (tarımsal selektörler dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.93.99",
    "title": "Gıda ve içeceklerin endüstriyel olarak hazırlanması veya imalatı için başka yerde sınıflandırılmamış makinelerin imalatı"
  },
  {
    "code": "28.94.01",
    "title": "Post, deri ve köselelerin işlenmesi ile ayakkabı ve diğer deri eşyaların üretimi veya tamiri için kullanılan makinelerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.94.02",
    "title": "Sanayi tipi çamaşır makinesi, kuru temizleme makinesi, çamaşır kurutma makinesi, ütü makinesi ve pres ütü imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.94.03",
    "title": "Sanayi ve ev tipi dikiş makinelerinin imalatı (dikiş makinelerinin iğneleri, mobilyaları, tabanları, kapakları vb. parçaları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.94.04",
    "title": "Suni ve sentetik tekstil malzemesinin ekstrüzyonu, çekilmesi, tekstüre edilmesi veya kesilmesi için kullanılan makineler ile doğal tekstil elyafı hazırlama makineleri ve dokuma makinelerinin imalatı (çırçır makinesi, taraklama makinesi vb. dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.94.05",
    "title": "Tekstil ipliği ve kumaşını yıkama, ağartma, boyama, apreleme, temizleme, sıkma, sarma, emprenye etme, bitirme, kesme, surfile ve benzerleri için makineler ile keçe imalatında ve bitirilmesinde kullanılan makinelerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.94.06",
    "title": "Tekstil büküm makineleri ile katlama, bükme, bobine sarma veya çile yapma makinelerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.94.07",
    "title": "Örgü, trikotaj ve benzeri makineler ile tafting makinelerinin imalatı (gipe iplik, tül, dantel, nakış, süs, örgü veya ağ yapma makineleri dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.94.08",
    "title": "Tekstil amaçlı makinelerle kullanılan yardımcı makinelerin ve tekstil baskı makinelerinin imalatı (ratiyerler, jakardlar, vb.) (ofset baskı makineleri, tipografik, fleksografik, gravür baskı makineleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.94.09",
    "title": "Tekstil, giyim eşyası ve deri üretiminde kullanılan makinelerin parçalarının imalatı (dikiş makinelerinde kullanılanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.95.01",
    "title": "Kağıt ve mukavva üretiminde kullanılan makinelerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.96.01",
    "title": "Plastik ve kauçuk makinelerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.97.00",
    "title": "Katmanlı (eklemeli) imalat makineleri imalatı"
  },
  {
    "code": "28.99.01",
    "title": "Basım ve ciltleme makineleri ile basıma yardımcı makinelerin ve bunların parçalarının imalatı (ofset baskı makinesi, tipografik baskı makinesi, dizgi makinesi, baskı kalıpları için makineler, ciltleme makinesi vb.) (büro tipi baskı makinesi hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.99.02",
    "title": "Cam ve cam eşya imalatında ve cam eşyaların sıcak işlenmesinde kullanılan makinelerin ve elektrikli veya elektronik lamba, tüp, ampul montajında kullanılan makinelerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.99.04",
    "title": "Kiremit, briket, şekilli seramik hamuru, boru, grafit elektrotu, yazı tahtası tebeşiri vb. ürünlerin üretilmesinde kullanılan makinelerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.99.05",
    "title": "Otomatik bovling salonu donanımlarının, dönme dolap, atlı karınca, salıncak, poligon, vb. diğer panayır alanı eğlence donanımlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.99.06",
    "title": "Hava taşıtı fırlatma donanımlarının, uçak gemilerinde kullanılan katapultların (kısa mesafede hava taşıtlarının kalkmasını sağlayan mekanizma) ve ilgili donanımların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.99.07",
    "title": "Yarı iletken tek kristalli külçe (boules) ve yonga plakalar ile yarı iletken aygıtların, elektronik entegre devre veya düz panel ekranların imalatı için kullanılan makine ve cihazların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.99.08",
    "title": "Sicim ve halat makinelerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.99.09",
    "title": "Lastik tekerlerin balansında ve hizalanmasında kullanılan donanımların imalatı (jant için kullanılanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.99.10",
    "title": "Özel amaçlar için çoklu görevlerde kullanılabilen sanayi robotlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.99.11",
    "title": "Kurutucuların imalatı (odun, kağıt hamuru, kağıt, mukavva, süt tozu ve diğer malzemelerin imalatında kullanılanlar) (ev tipi, tarım ürünleri ve tekstil için olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "28.99.12",
    "title": "İzotopik ayırma makineleri ve cihazlarının imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "28.99.99",
    "title": "Başka yerde sınıflandırılmamış diğer özel amaçlı makinelerin imalatı"
  },
  {
    "code": "29.10.01",
    "title": "Kamyonet, kamyon, yarı römorklar için çekiciler, tankerler, vb. karayolu taşıtlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.10.02",
    "title": "Otomobil ve benzeri araçların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.10.03",
    "title": "Motorlu kara taşıtlarının motorlarının imalatı (elektrikli motor ve motorların fabrikada yeniden yapımı dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.10.04",
    "title": "Minibüs, midibüs, otobüs, troleybüs, metrobüs, vb. yolcu nakil araçlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.10.05",
    "title": "Kar motosikleti, golf arabası, ATV motosikletler, go-kart arabaları vb. taşıtların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.10.07",
    "title": "Özel amaçlı motorlu kara taşıtlarının imalatı (amfibi araçlar, çöp kamyonu, yol temizleme araçları, zırhlı nakil araçları, mikserli kamyon, vinçli kamyon, itfaiye aracı, ambulans, motorlu karavan vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.10.08",
    "title": "Motorlu kara taşıtları için şasi imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.20.01",
    "title": "Treyler (römork), yarı treyler (yarı römork) ve mekanik hareket ettirici tertibatı bulunmayan diğer araçların parçalarının imalatı (bu araçların karoserleri, kasaları, aksları ve diğer parçaları)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.20.02",
    "title": "Motorlu kara taşıtları için karoser, kabin, kupa, dorse ve damper imalatı (otomobil, kamyon, kamyonet, otobüs, minibüs, traktör, damperli kamyon ve özel amaçlı motorlu kara taşıtlarının karoserleri)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.20.03",
    "title": "Konteyner imalatı (bir veya daha fazla taşıma şekline göre özel olarak tasarlanmış olanlar)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.20.04",
    "title": "Treyler (römork) ve yarı treyler (yarı römork) imalatı, römorklar için şasi imalatı (karavan tipinde olanlar ve tarımsal amaçlı olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.20.05",
    "title": "Karavan tipinde treyler (römork) ve yarı treyler (yarı römork) imalatı - ev olarak veya kamp için kullanılanlar",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.20.06",
    "title": "Motorlu kara taşıtlarının modifiye edilmesi ve karoser hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.31.04",
    "title": "Motorlu taşıtlar için ateşleme kablo takımları ve diğer kablo setleri ile ateşleme bujisi ve manyetosu, dinamo, manyetik volan, distribütör, ateşleme bobini, marş motoru, alternatör vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.31.05",
    "title": "Motorlu kara taşıtları ve motosikletler için elektrikli sinyalizasyon donanımları, kornalar, sirenler, cam silecekleri, buğu önleyiciler, elektrikli cam/kapı sistemleri, voltaj regülatörleri vb. elektrikli ekipmanların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.31.90",
    "title": "Motorlu kara taşıtları için diğer elektrik ve elektronik donanımların imalatı (oto alarm sistemlerinin imalatı dahil)"
  },
  {
    "code": "29.32.20",
    "title": "Motorlu kara taşıtları için vites kutusu, debriyaj, fren, aks, amortisör gibi çeşitli parça ve aksesuarların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.32.21",
    "title": "Motorlu kara taşıtları için karoser, kabin ve kupalara ait parça ve aksesuarların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.32.22",
    "title": "Motorlu kara taşıtları için koltuk imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "29.32.23",
    "title": "Motorlu kara taşıtlarında kullanılan motorlar için piston, segman ve diğer motor parçaları ile karbüratörlerin imalatı"
  },
  {
    "code": "29.32.24",
    "title": "Motorlu kara taşıtları için iklimlendirme cihazlarının (klimalar) imalatı"
  },
  {
    "code": "30.11.01",
    "title": "Yüzen ve su altında kalabilen sondaj platformlarının inşası faaliyetleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "30.11.02",
    "title": "Yolcu gemi ve tekneleri, feribotlar, tankerler, frigorifik gemiler, kuru yük gemileri, çekici ve itici römorkörler, tarak gemileri, açık deniz gemileri, hover kraftların ve diğer gemilerin inşası (spor ve eğlence amaçlı olanlar hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "30.11.04",
    "title": "Balıkçı gemi ve tekneleri ile deniz ürünlerinin işlenmesine ve saklanmasına yönelik fabrika gemilerinin yapımı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "30.11.05",
    "title": "Yüzen rıhtımlar, dubalar, batardolar, koferdamlar, yüzen iskeleler, şamandıralar, yüzen tanklar, mavnalar, salapuryalar, yüzen vinçler, eğlence amaçlı olmayan şişme botlar vb. imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "30.11.06",
    "title": "Gemiler ve yüzer yapılar için oturulacak yerlerin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "30.11.07",
    "title": "Gemiler ve yüzer yapılar için iç bölmelerin imalatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "30.11.08",
    "title": "Gemilerin, yüzer platformların ve yüzer yapıların büyük çapta değiştirilmesi ve yeniden inşası",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "30.12.01",
    "title": "Jet ski vb. kişisel su araçlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.12.03",
    "title": "Şişirilebilir motorlu/motorsuz botların imalatı (eğlence ve spor amaçlı olanlar)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.12.04",
    "title": "Eğlence ve sportif amaçlı motorlu/motorsuz yelkenlilerin, motorlu tekne ve yatların, sandalların, kayıkların, kanoların, eğlence amaçlı hover kraftların ve benzer araçların imalatı (polyester tekneler dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "30.13.00",
    "title": "Askeri gemilerin ve teknelerin inşası"
  },
  {
    "code": "30.20.01",
    "title": "Demir yolu ve tramvay lokomotifleri, vagonları, bagaj vagonları, lokomotif tenderleri, demir yolu veya tramvay bakım veya servis araçları imalatı (lokomotiflere ve vagonlara ait parçalar ile koltuklarının imalatı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.20.02",
    "title": "Demir yolu ve tramvay lokomotif veya vagonlarının parçalarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.20.03",
    "title": "Raylı sistem taşıtları için koltuk imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.20.04",
    "title": "Mekanik veya elektromekanik sinyalizasyon, emniyet veya trafik kontrol cihazları ve bunların parçalarının imalatı (demir yolu, tramvay hatları, kara yolları, dahili su yolları, park yerleri, liman tesisleri veya hava alanları için olanlar)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.20.05",
    "title": "Demir yolu veya tramvay lokomotiflerinin ve vagonlarının büyük çapta yenilenmesi ve donanım hizmetleri (tamamlama)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.31.01",
    "title": "Sivil helikopter imalatı (helikopter veya helikopter motorlarının fabrikalarda büyük çaplı revizyonu ve değiştirilmesi dahil)"
  },
  {
    "code": "30.31.02",
    "title": "Sivil hava taşıtı parçalarının imalatı"
  },
  {
    "code": "30.31.03",
    "title": "Sivil sıcak hava balonu, zeplin, planör, delta kanatlı planör ve diğer motorsuz hava araçlarının imalatı"
  },
  {
    "code": "30.31.04",
    "title": "Sivil uçak ve benzer hava taşıtlarının imalatı (uçak veya uçak motorlarının fabrikalarda büyük çaplı revizyonu ve değiştirilmesi dahil)"
  },
  {
    "code": "30.31.05",
    "title": "Sivil yer uçuş eğitim cihazları ve bunların parçalarının imalatı"
  },
  {
    "code": "30.31.06",
    "title": "Sivil uzay aracı, uzay aracı fırlatma araçları ve mekanizmaları ile uydular, uzay roketleri, yörünge istasyonları ve uzay mekiklerinin imalatı"
  },
  {
    "code": "30.31.07",
    "title": "Sivil hava taşıtları ve uzay araçlarında kullanılan koltukların imalatı"
  },
  {
    "code": "30.32.00",
    "title": "Askeri hava ve uzay araçları ve ilgili makinelerin imalatı"
  },
  {
    "code": "30.40.01",
    "title": "Askeri kara savaş araçlarının imalatı (tank, zırhlı savaş araçları ve bunların parçaları)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "30.91.01",
    "title": "Motosiklet ve moped imalatı (yardımcı elektrikli motoru bulunan bisiklet hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.91.02",
    "title": "Motosiklet parça ve aksesuarları imalatı (motosikletler için pistonlar, piston segmanları, karbüratörler dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.91.03",
    "title": "Motosiklet motorları imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.92.01",
    "title": "Bisiklet imalatı (yardımcı elektrikli motoru bulunan bisiklet dahil) (çocuklar için plastik bisikletler hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.92.02",
    "title": "Bisiklet parça ve aksesuarlarının imalatı (jantlar, gidonlar, iskelet, çatallar, pedal fren göbekleri/poyraları, göbek/poyra frenleri, krank dişlileri, pedallar ve serbest dişlilerin parçaları, vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.92.03",
    "title": "Engelli araçlarının imalatı (motorlu, motorsuz, akülü, şarjlı, vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.92.04",
    "title": "Engelli araçlarının parça ve aksesuarlarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.92.05",
    "title": "Bebek arabaları, pusetler ve bunların parçalarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.99.01",
    "title": "Mekanik hareket ettirici tertibatı bulunmayan araçların imalatı (alışveriş arabaları, sanayi el arabaları, işportacı arabaları, bagaj arabaları, elle çekilen golf arabaları, hasta nakli için arabalar, kızaklar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "30.99.02",
    "title": "Hayvanlar tarafından çekilen araçların imalatı (at, eşek arabası, fayton, vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "30.99.99",
    "title": "Başka yerde sınıflandırılmamış diğer ulaşım ekipmanlarının imalatı"
  },
  {
    "code": "31.00.01",
    "title": "Yatak odası, yemek odası, mutfak mobilyası, banyo dolabı, genç ve çocuk odası takımı, gardırop, vestiyer, vb. imalatı (gömme dolap, masa, zigon, vb. dahil)"
  },
  {
    "code": "31.00.02",
    "title": "Büro, okul, ibadethane, otel, lokanta, sinema, tiyatro vb. kapalı alanlar için mobilya imalatı (iskelet imalatı dahil; taş, beton, seramikten olanlar hariç)"
  },
  {
    "code": "31.00.03",
    "title": "Sandalye, koltuk, kanepe, oturma takımı, çekyat, divan, markiz, vb. imalatı (iskelet imalatı dahil; plastik olanlar ile bürolarda ve park ve bahçelerde kullanılanlar hariç)"
  },
  {
    "code": "31.00.04",
    "title": "Mağazalar için tezgah, banko, vitrin, raf, çekmeceli dolap vb. özel mobilya imalatı (laboratuvarlar ve teknik bürolar için olanlar hariç)"
  },
  {
    "code": "31.00.05",
    "title": "Yatak ve yatak desteklerinin imalatı (kauçuk şişme yatak ve su yatağı hariç)"
  },
  {
    "code": "31.00.06",
    "title": "Mobilyaların boyanması, verniklenmesi, cilalanması vb. tamamlayıcı işlerin yapılması"
  },
  {
    "code": "31.00.07",
    "title": "Park ve bahçelerde kullanılan bank, masa, tabure, sandalye, koltuk, vb. mobilyaların imalatı (plastik olanlar hariç)"
  },
  {
    "code": "31.00.08",
    "title": "Sandalyelerin, koltukların vb. döşenmesi gibi tamamlayıcı işlerin yapılması (büro ve ev mobilyalarının yeniden kaplanması hariç)"
  },
  {
    "code": "31.00.09",
    "title": "Plastikten bank, masa, tabure, sandalye vb. mobilyaların imalatı"
  },
  {
    "code": "31.00.90",
    "title": "Diğer mobilyaların imalatı"
  },
  {
    "code": "32.11.01",
    "title": "Madeni para basımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.12.01",
    "title": "Değerli metallerden takı ve mücevherlerin imalatı (değerli metallerle baskı, yapıştırma vb. yöntemlerle giydirilmiş adi metallerden olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.12.04",
    "title": "İnci ve değerli doğal taşların işlenmesi ve değerli taşlardan takı ve mücevher ile bunların parçalarının imalatı (sentetik veya yeniden oluşturulmuş olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.12.90",
    "title": "Mücevher ve benzeri diğer eşyaların imalatı"
  },
  {
    "code": "32.13.01",
    "title": "İmitasyon (taklit) takılar ve ilgili eşyaların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.20.21",
    "title": "Elektronik müzik aletleri veya klavyeli çalgıların imalatı (elektrik gücüyle ses üreten veya sesi güçlendirilen enstrümanlar) (dijital piyano, sintizayzır, elektrogitar, vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.20.23",
    "title": "Ağızları huni gibi genişleyen neviden olan boru esaslı müzik aletleri ile diğer üflemeli müzik aletlerinin imalatı (saksafon, flüt, trombon, borazan, vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.20.24",
    "title": "Vurmalı çalgıların imalatı (trampet, davul, ksilofon, zil, kas vs.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.20.25",
    "title": "Piyanolar ve diğer klavyeli yaylı/telli çalgıların imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "32.20.26",
    "title": "Borulu ve klavyeli orglar, armonyumlar, akordiyonlar, ağız mızıkaları (armonikalar), tulum vb. çalgıların imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "32.20.27",
    "title": "Müzik kutuları, orkestriyonlar, laternalar, çıngıraklar vb. imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "32.20.28",
    "title": "Metronomlar, akort çatalları (diyapazonlar) ve akort düdükleri, müzik kutuları için mekanizmalar, müzik aleti telleri ile müzik aletlerinin parça ve aksesuarlarının imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "32.20.90",
    "title": "Diğer yaylı/telli müzik aletlerinin imalatı (saz, gitar, keman, vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "32.20.99",
    "title": "Başka yerde sınıflandırılmamış diğer müzik aletlerinin imalatı"
  },
  {
    "code": "32.30.17",
    "title": "Kar kayakları, kayak ayakkabıları, kayak botları, kayak batonları, buz patenleri ve tekerlekli patenler ile su kayağı araçları, sörf tahtaları, rüzgar sörfleri vb. ekipmanlar ile bunların parçalarının imalatı (kaykaylar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.30.18",
    "title": "Jimnastik ve atletizm eşyaları ile form tutma salonlarına ait eşya ve ekipmanların imalatı (atlama beygiri, dambıl ve halterler, kürek çekme ve bisiklete binme aletleri, ciritler, çekiçler; boks çalışma topları, boks veya güreş için ringler vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.30.19",
    "title": "Spor amaçlı dağcılık, avcılık veya balıkçılık eşyalarının imalatı (kasklar, olta kamışları, olta iğneleri ve kancaları, otomatik olta makaraları, el kepçeleri, kelebek ağları, yapma balıklar, sinekler gibi suni yemler, kurşunlar, yapma kuşlar vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.30.20",
    "title": "Spor veya açık hava oyunları için diğer eşyaların imalatı (boks eldiveni, spor eldiveni, yaylar, beyzbol ve golf sopaları ile top ve diğer eşyaları, tenis masası, raket, ağ ve topları, tozluklar, bacak koruyucular, şişme ve diğer havuzlar vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.30.21",
    "title": "Top imalatı (beyzbol, futbol, basketbol ve voleybol için)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.40.02",
    "title": "Bozuk para veya jetonla çalışan oyun makineleri ile bilardo için kullanılan eşya ve aksesuarların imalatı (rulet vb. oyun makineleri ile bilardo masa ve istekaları, isteka dayanakları, bilardo topları, tebeşirleri, toplu veya sürgülü puan sayaçları vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.40.03",
    "title": "Yap boz, puzzle ve benzeri ürünlerin imalatı (lego vb. dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.40.04",
    "title": "İçi doldurulmuş oyuncak bebeklerin ve oyuncak hayvanların imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "32.40.05",
    "title": "Oyuncak bebek, kukla ve hayvanlar ile bunların giysi, parça ve aksesuarlarının imalatı (içi doldurulmuş olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.40.06",
    "title": "Lunapark, masa ve salon oyunları için gereçlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.40.09",
    "title": "Oyun tahtaları (satranç, dama, dart, tavla tahtaları, okey istekası, go vb.) ve tabu, monopol vb. oyunların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.40.10",
    "title": "Tekerlekli oyuncaklar, oyuncak bebek arabaları, oyuncak trenler ve diğer küçültülmüş boyutlu modeller/maketler veya inşaat oyun takımları, yarış setleri imalatı (motorlu olanlar, pres döküm oyuncaklar ve plastik diğer oyuncaklar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.40.99",
    "title": "Başka yerde sınıflandırılmamış diğer oyun ve oyuncakların imalatı"
  },
  {
    "code": "32.50.02",
    "title": "Tıpta, cerrahide ve dişçilikte kullanılan protezler, ortopedik cihazlar ve aksesuarların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.50.03",
    "title": "Diş laboratuvarlarının faaliyetleri (protez diş, metal kuron, vb. imalatı)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.50.04",
    "title": "Gözlükler ve lensler ile parçalarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.50.05",
    "title": "Tıbbi, cerrahi, dişçilik veya veterinerlikle ilgili mobilyaların, berber koltukları ve benzeri sandalyeler ile bunların parçalarının imalatı (X ışını masa ve koltukları hariç)"
  },
  {
    "code": "32.50.06",
    "title": "Dişçi çimentosu, dişçilik mumları, dolgu maddesi, kemik tedavisinde kullanılan çimento, jel preparat, steril adhezyon bariyeri, dikiş malzemesi (katgüt hariç), doku yapıştırıcısı, laminarya, emilebilir hemostatik, vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.50.07",
    "title": "Tıpta, cerrahide, dişçilikte veya veterinerlikte kullanılan şırınga, iğne, katater, kanül ve benzerlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.50.14",
    "title": "Tıpta, cerrahide ve dişçilikte kullanılan araç-gereç ve cihazların imalatı (ortopedik cihazlar hariç)"
  },
  {
    "code": "32.50.15",
    "title": "Terapatik alet ve cihazların imalatı (suni solunum veya terapatik solunum cihazları hariç)"
  },
  {
    "code": "32.50.90",
    "title": "Tıbbi ve dişçilik ile ilgili diğer araç ve gereçlerin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.91.01",
    "title": "Ev veya büro temizliği için olan süpürge ve fırçaların imalatı (elektrikli olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.91.02",
    "title": "Boyama, badana, duvar kağıdı ve vernik fırçaları ile rulolarının imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.91.03",
    "title": "Diş fırçaları, saç fırçaları, tıraş fırçaları ve kişisel bakım için kullanılan diğer fırçalar ile resim fırçaları, yazı fırçaları ve kozmetik fırçaların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.91.99",
    "title": "Başka yerde sınıflandırılmamış diğer süpürge ve fırçaların imalatı (elektrikli olanlar hariç)"
  },
  {
    "code": "32.99.01",
    "title": "Terzi mankeni, el kalbur ve eleği, yapma çiçek, meyve ve bitkiler, şaka ve sihirbazlık benzeri eşya, koku püskürtücüleri ve mekanizmaları, tabut vb. eşyaların imalatı (gelin çiçeği dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.02",
    "title": "Kot vb. baskı düğmeleri, çıtçıtlar, düğmeler, fermuarlar vb. imalatı (düğme formları ve fermuar parçaları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.03",
    "title": "Pipo, sigara ağızlıkları, Oltu veya lüle taşından tespih vb. imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.04",
    "title": "Mekanik olsun veya olmasın her çeşit dolma kalem, tükenmez ve kurşun kalem ile boya kalemi, pastel boya imalatı (kalem ucu ve kurşun kalem içleri dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.05",
    "title": "Koruyucu güvenlik başlıkları ve diğer güvenlik malzemeleri imalatı"
  },
  {
    "code": "32.99.06",
    "title": "Peruk, takma saç, takma sakal, takma kaş vb. imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "32.99.07",
    "title": "Şemsiyeler, güneş şemsiyeleri, baston ve koltuklu baston, koltuk değneği vb. imalatı (parçaları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.08",
    "title": "Tarih verme, damga, mühür veya numara verme kaşeleri, numaratör, elle çalışan basım aletleri, kabartma etiketleri, el baskı setleri, hazır daktilo şeritleri ve ıstampaların imalatı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "32.99.09",
    "title": "Koruyucu amaçlı solunum ekipmanları ve gaz maskelerinin imalatı (tedavi edici olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.10",
    "title": "Ateşe dayanıklı ve koruyucu güvenlik kıyafetleri ve başlıkları ile diğer güvenlik ürünlerinin imalatı (solunum ekipmanları ve gaz maskeleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.11",
    "title": "Mantar can simitlerinin imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.13",
    "title": "Termos ve vakumlu kapların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.15",
    "title": "Suni balmumu ile suni mumların ve müstahzar mumların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.16",
    "title": "Yazı veya çizim tahtaları imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.17",
    "title": "Sigara çakmakları ve diğer çakmaklar ile çabuk tutuşan (piroforik) alaşımların imalatı (çakmaklar için kap hacmi ≤ 300cm3 sıvı veya sıvılaştırılmış gaz yakıtları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.18",
    "title": "Fildişi, kemik, boynuz, sedef gibi hayvansal malzemelerden oyma eşyaların imalatı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "32.99.19",
    "title": "Elektronik sigara imalatı"
  },
  {
    "code": "32.99.99",
    "title": "Başka yerde sınıflandırılmamış diğer imalatlar (bağırsak (ipek böceği guddesi hariç), kursak ve mesaneden mamul eşyalar dahil, tıbbi amaçlı steril olanlar hariç)"
  },
  {
    "code": "33.11.01",
    "title": "Metal boru ve boru hatları ile pompa istasyonlarının onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.11.02",
    "title": "Ateşli silahların ve savaş gereçlerinin onarım ve bakımı (spor ve eğlence amaçlı silahların onarımı dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.11.03",
    "title": "Buhar kazanları veya buhar jeneratörlerinin onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.11.04",
    "title": "Merkezi ısıtma sıcak su kazanları (boyler) ve radyatörlerin onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.11.10",
    "title": "Metal tankların, rezervuarların ve muhafaza kaplarının (konteynerler dahil) onarımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.11.11",
    "title": "Nükleer reaktörlerin onarım ve bakımı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "33.11.99",
    "title": "Başka yerde sınıflandırılmamış metal ürünlerin onarım ve bakımı (balık kafesleri hariç)"
  },
  {
    "code": "33.12.02",
    "title": "Tarım ve ormancılık makinelerinin onarım ve bakımı (traktörlerin bakım ve onarımı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.03",
    "title": "Motor ve türbinlerin onarım ve bakımı (hidrolik, rüzgar, gaz, su, buhar türbinleri) (gemi ve tekne motorları, motorlu kara taşıtı ve motosiklet motorları hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.04",
    "title": "Sanayi fırınlarının, ocaklarının ve ocak brülörlerinin onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.05",
    "title": "Kaldırma ve taşıma ekipmanlarının onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.06",
    "title": "Sanayi tipi soğutma ve havalandırma ekipmanlarının onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.07",
    "title": "Tartı aletlerinin onarım ve bakımı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "33.12.08",
    "title": "Madencilik, inşaat, petrol ve gaz sahalarında kullanılan makinelerin onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.09",
    "title": "Tarım ve ormancılıkta kullanılan motokültörler ve traktörlerin onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.10",
    "title": "Akışkan gücü ile çalışan ekipmanlar, pompalar, kompresörler ile valflerin ve vanaların onarım ve bakımı (akaryakıt pompalarının tamiri dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.11",
    "title": "Metal işleme makinelerinin ve takım tezgahlarının onarım ve bakımı (CNC olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.12",
    "title": "Motorlu veya pnömatik (hava basınçlı) el aletlerinin onarımı (yuvarlak/vargel/zincir testere, matkap, pnömatik veya motorlu metal kesme makası, darbeli cıvata anahtarı vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.13",
    "title": "Elektrikli kaynak ve lehim aletlerinin onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.14",
    "title": "Metalürji makinelerinin onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.15",
    "title": "Gıda, içecek ve tütün işleme makinelerinin onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.16",
    "title": "Tekstil, giyim eşyası ve deri üretim makinelerinin onarım ve bakımı (triko makinelerinin onarımı dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.17",
    "title": "Kağıt, karton ve mukavva üretiminde kullanılan makinelerin onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.18",
    "title": "Büro ve muhasebe makinelerinin onarım ve bakımı (daktilo, yazar kasa, fotokopi makineleri, hesap makineleri, vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "33.12.19",
    "title": "Ağaç, mantar, taş, sert kauçuk veya benzeri sert malzemeleri işlemede kullanılan takım tezgahlarının onarım ve bakımı (CNC olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.21",
    "title": "Sıvılar için filtreleme ya da temizleme makineleri ve aparatlarının onarım ve bakımı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "33.12.27",
    "title": "Kesici aletler ile el aletlerinin onarım ve bakımı (matbaa giyotini, şerit testere, el testeresi, çapa, orak vb. bileyleme ve çarkçılık dahil) (motorlu ve pnömatik olanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.28",
    "title": "Plastik ve kauçuk imalatında ve işlenmesinde kullanılan makinelerin onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.29",
    "title": "Endüstriyel rulmanların, dişlilerin, dişli takımlarının ve tahrik tertibatı elemanlarının onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.30",
    "title": "Tarımsal amaçlı kullanılan römorkların onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.12.99",
    "title": "Başka yerde sınıflandırılmamış diğer makinelerin onarım ve bakımı (motorlu kara taşıtları, gemiler, tekneler ve uçaklar hariç)"
  },
  {
    "code": "33.13.01",
    "title": "Ölçme, test ve seyrüsefer alet ve cihazlarının onarım ve bakımı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "33.13.02",
    "title": "Işınlama, elektromedikal ve elektroterapi ekipmanlarının onarım ve bakımı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "33.13.03",
    "title": "Profesyonel optik aletlerin ve fotoğrafçılık ekipmanlarının onarım ve bakımı (tüketici elektronik ürünlerinin onarımı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.13.05",
    "title": "Yüklü elektronik devrelerin/kartların bakımı ve onarımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.13.90",
    "title": "Diğer profesyonel elektronik ekipmanların onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.14.01",
    "title": "Güç transformatörleri, dağıtım transformatörleri ve özel transformatörlerin onarım ve bakımı (elektrik dağıtım ve kontrol cihazları dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.14.02",
    "title": "Elektrik motorları, jeneratörler ve motor jeneratör setlerinin onarım ve bakımı (bobinlerin tekrar sarımı dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.14.90",
    "title": "Diğer profesyonel elektrikli ekipmanların onarım ve bakımı"
  },
  {
    "code": "33.15.00",
    "title": "Sivil gemilerin ve teknelerin onarım ve bakımı (yüzen yapılar, sandal, kayık, vb. bakım ve onarımı ile bunların kalafatlanması dahil)"
  },
  {
    "code": "33.16.01",
    "title": "Sivil hava taşıtları ve uzay araçlarının onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.17.01",
    "title": "Demir yolu lokomotiflerinin ve vagonlarının onarım ve bakımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.17.99",
    "title": "Başka yerde sınıflandırılmamış diğer ulaşım ekipmanlarının onarım ve bakımı"
  },
  {
    "code": "33.18.01",
    "title": "Askeri kara savaş araçlarının onarım ve bakımı"
  },
  {
    "code": "33.18.02",
    "title": "Askeri hava taşıtlarının ve uzay araçlarının onarım ve bakımı"
  },
  {
    "code": "33.18.03",
    "title": "Askeri savaş gemilerinin ve teknelerin onarım ve bakımı"
  },
  {
    "code": "33.19.01",
    "title": "Tentelerin, kamp ekipmanlarının, çuvalların ve balıkçılık ağları gibi diğer hazır tekstil malzemelerinin onarımı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "33.19.02",
    "title": "Halatlar, gemi çarmık ve halatları ile yelken bezleri ve bez astarlı muşambaların onarımı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "33.19.99",
    "title": "Başka yerde sınıflandırılmamış diğer ekipmanların onarımı (ahşap konteyner, gemi fıçı ve varilleri, madeni para ile çalışan oyun makineleri, değirmentaşı, bileme taşı vs.)"
  },
  {
    "code": "33.20.36",
    "title": "Metallerin işlenmesinde, kesilmesinde ve şekillendirilmesinde kullanılan makinelerin kurulum hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.20.45",
    "title": "Sanayi tipi ısıtma, iklimlendirme ve soğutma cihaz ve ekipmanlarının kurulumu",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.20.46",
    "title": "Genel amaçlı makinelerin kurulum hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.20.51",
    "title": "Elektrikli ekipmanların kurulum hizmetleri (yollar, vb. için elektrikli sinyalizasyon ekipmanları hariç))",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.20.52",
    "title": "Fabrikasyon metal ürünlerin kurulum hizmetleri (buhar jeneratörlerinin kurulum hizmetleri ve sanayi tesislerindeki metal boru sistemlerinin kurulumu dahil, merkezi ısıtma sıcak su kazanları (boylerleri) ile makine ve ekipmanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.20.53",
    "title": "Endüstriyel işlem kontrol ekipmanlarının kurulum hizmetleri (otomasyon destekliler dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "33.20.90",
    "title": "Diğer sanayi makine ve ekipmanlarının kurulumu",
    "hazard": "Tehlikeli"
  },
  {
    "code": "35.11.00",
    "title": "Yenilenemeyen kaynaklardan elektrik üretimi"
  },
  {
    "code": "35.12.00",
    "title": "Yenilenebilir kaynaklardan elektrik üretimi"
  },
  {
    "code": "35.13.00",
    "title": "Elektrik enerjisinin iletimi"
  },
  {
    "code": "35.14.02",
    "title": "Elektrik sayaçlarının bakım ve onarımı"
  },
  {
    "code": "35.14.06",
    "title": "Elektrik enerjisinin dağıtımı (üretim kaynağından veya iletim sisteminden son kullanıcıya iletim sistemiyle taşınan elektrik enerjisi dağıtım sisteminin işletilmesi)"
  },
  {
    "code": "35.15.01",
    "title": "Elektrikli araçlar ve elektronik cihazlar için şarj istasyonlarının işletilmesi"
  },
  {
    "code": "35.15.02",
    "title": "Elektrik ticareti"
  },
  {
    "code": "35.16.00",
    "title": "Elektriğin depolanması"
  },
  {
    "code": "35.21.01",
    "title": "Doğalgaz dahil, çeşitli türdeki gazlardan arındırma, karıştırma, vb. işlemlerle kalorifik değerde gazlı yakıtların üretimi",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "35.21.02",
    "title": "Kömürün karbonlaştırılması, tarımsal yan ürün veya atıklarından gaz üretimi",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "35.22.01",
    "title": "Ana şebeke üzerinden gaz yakıtların dağıtımı (her çeşit gazlı yakıtın, ana boru sistemiyle dağıtımı ve tedariki)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "35.22.02",
    "title": "Gaz sayaçlarının bakım ve onarımı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "35.23.01",
    "title": "Ana şebeke üzerinden gaz ticareti (komisyoncular ve acentelerin faaliyetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "35.24.00",
    "title": "Gazın depolanması (şebeke tedarik hizmetlerinin bir parçası olarak)"
  },
  {
    "code": "35.30.21",
    "title": "Buhar ve sıcak su üretimi, toplanması ve dağıtımı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "35.30.22",
    "title": "Soğutulmuş hava ve soğutulmuş su üretim ve dağıtımı (buz üretimi dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "35.40.00",
    "title": "Elektrik enerjisi ve doğal gaz aracılarının ve komisyoncularının faaliyetleri"
  },
  {
    "code": "36.00.02",
    "title": "Suyun toplanması, arıtılması ve dağıtılması",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "36.00.03",
    "title": "Su sayaçlarının bakım ve onarımı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "37.00.01",
    "title": "Kanalizasyon (kanalizasyon atıklarının uzaklaştırılması ve arıtılması, kanalizasyon sistemlerinin ve atık su arıtma tesislerinin işletimi, foseptik çukurların ve havuzların boşaltılması ve temizlenmesi, seyyar tuvalet faaliyetleri vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "38.11.01",
    "title": "Tehlikesiz atıkların toplanması (çöpler, geri dönüştürülebilir maddeler, tekstil atıkları, vb.) (inşaat ve yıkım atıkları, çalı, çırpı, moloz gibi enkazlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "38.11.02",
    "title": "İnşaat ve yıkım atıklarının, çalı, çırpı, moloz gibi enkazların toplanması ve kaldırılması",
    "hazard": "Tehlikeli"
  },
  {
    "code": "38.11.03",
    "title": "Tehlikesiz atık transfer istasyonlarının işletilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "38.12.01",
    "title": "Tehlikeli atıkların toplanması",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "38.21.02",
    "title": "Gemi ve yüzer yapıların hurdalarının materyallerinin geri kazanımı amacıyla parçalara ayrılması (sökülmesi)"
  },
  {
    "code": "38.21.03",
    "title": "Hurdaların geri kazanım amacıyla parçalara ayrılması (otomobil, bilgisayar, televizyon vb. donanımlar) (gemiler ve yüzer yapılar ile satmak için kullanılabilir parçalar oluşturmak amacıyla sökme hariç)"
  },
  {
    "code": "38.21.04",
    "title": "Tasnif edilmiş metal atıklar, hurdalar ve diğer parçaların genellikle mekanik veya kimyasal değişim işlemleri ile geri kazanılması"
  },
  {
    "code": "38.21.05",
    "title": "Tasnif edilmiş metal dışı atıklar, hurdalar ve diğer parçaların genellikle mekanik veya kimyasal değişim işlemleri ile geri kazanılması "
  },
  {
    "code": "38.22.00",
    "title": "Enerji geri kazanımı"
  },
  {
    "code": "38.23.00",
    "title": "Diğer atık geri kazanımı"
  },
  {
    "code": "38.31.00",
    "title": "Enerji geri kazanımı olmaksızın atıkların yakılması"
  },
  {
    "code": "38.32.03",
    "title": "Tehlikesiz atıkların düzenli veya kalıcı olarak depolanması"
  },
  {
    "code": "38.32.04",
    "title": "Tehlikeli atıkların düzenli veya kalıcı olarak depolanması (radyoaktif atıklar hariç)"
  },
  {
    "code": "38.32.05",
    "title": "Radyoaktif atıkların düzenli veya kalıcı olarak depolanması"
  },
  {
    "code": "38.33.00",
    "title": "Diğer atıkların bertarafı"
  },
  {
    "code": "39.00.01",
    "title": "İyileştirme faaliyetleri ve diğer atık yönetimi hizmetleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "41.00.01",
    "title": "İkamet amaçlı binaların inşaatı (ahşap binaların inşaatı hariç)"
  },
  {
    "code": "41.00.02",
    "title": "İkamet amaçlı olmayan binaların inşaatı"
  },
  {
    "code": "41.00.03",
    "title": "Mevcut ikamet amaçlı olan veya ikamet amaçlı olmayan binaların yeniden düzenlenmesi veya yenilenmesi (büyük çaplı revizyon) (tarihi yapıların restorasyonu hariç)"
  },
  {
    "code": "41.00.04",
    "title": "İkamet amaçlı ahşap binaların inşaatı"
  },
  {
    "code": "41.00.05",
    "title": "Prefabrik binalar için bileşenlerin alanda birleştirilmesi ve kurulması"
  },
  {
    "code": "42.11.01",
    "title": "Otoyollar, kara yolları, şehir içi yollar ve diğer araç veya yaya yollarının inşaatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.11.02",
    "title": "Yol yüzeylerinin asfaltlanması ve onarımı, kaldırım, kasis, bisiklet yolu vb.lerin inşaatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.11.03",
    "title": "Havaalanı pisti inşaatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.12.01",
    "title": "Demir yolları ve metroların inşaatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.13.01",
    "title": "Köprülerin inşaatı (yükseltilmiş kara yolları-viyadükler dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.13.02",
    "title": "Tünel inşaatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.21.01",
    "title": "Akışkanlar için uzun mesafe boru hatlarının inşaatı (petrol ürünleri ve gaz taşımacılığı ile su ve diğer ürünlerin taşımacılığına yönelik karada ve deniz altında uzun mesafe boru hattı)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.21.02",
    "title": "Su kuyusu açma ve septik sistem kurulum faaliyetleri (kuyu, artezyen vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.21.03",
    "title": "Ana su şebekeleri ve su hatları ile su arıtma tesisleri, kanalizasyon bertaraf tesisleri ve pompa istasyonları inşaatı (sulama sistemleri (kanallar) dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.21.05",
    "title": "Akışkanlar için kısa mesafe (yerel) boru hatlarının inşaatı (petrol ürünleri ve gaz taşımacılığı ile su, kanalizasyon, sıcak su, buhar ve diğer ürünlerin taşımacılığına yönelik kısa mesafe boru hattı)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.22.01",
    "title": "Uzun mesafe elektrik hatlarının inşaatı (uzun mesafe yüksek gerilim elektrik iletim hatları ile uzun mesafe yer üstü/altı veya deniz altı iletim hatları)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.22.02",
    "title": "Enerji santralleri inşaatı (hidroelektrik santrali, termik santral, güneş ve rüzgar santrali, nükleer enerji üretim santralleri vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.22.04",
    "title": "Kentsel (kısa mesafe) elektrik hatlarının inşaatı (trafo istasyonları ve yerel sınırlar içerisindeki dağıtım alt istasyonları vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.22.05",
    "title": "Telekomünikasyon şebeke ve ağlarının bakım ve onarımı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.22.06",
    "title": "Uzun mesafe telekomünikasyon (iletişim) hatlarının inşaatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.22.07",
    "title": "Kentsel (kısa mesafe) telekomünikasyon (iletişim) hatlarının inşaatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.91.01",
    "title": "Kıyı ve liman inşaatları ve ilgili hidromekanik yapıların inşaatı (su yolları, kanal vb. dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.91.02",
    "title": "Su ve su zemininin taranması ve temizlenmesi (deniz, nehir, göl vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.91.03",
    "title": "Tersane, dok ve kanal havuzu inşaatı (gemi inşaatı ve tamiri için)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.91.04",
    "title": "Baraj ve bentlerin inşaatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.99.01",
    "title": "Açık havada yapılan sporlara uygun tesislerin ve eğlence alanları yapılarının inşaatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.99.02",
    "title": "Madencilik ve imalat sanayisi yapılarının inşaatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.99.04",
    "title": "Doğalgaz işleme tesisleri inşaatı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "42.99.05",
    "title": "Yüzme havuzlarının inşaatı (prefabrik olanlar hariç)"
  },
  {
    "code": "42.99.99",
    "title": "Başka yerde sınıflandırılmamış bina dışı diğer yapıların inşaatı (arazi iyileştirilmesi ile birlikte arazinin parsellemesi dahil, iyileştirme yapılmaksızın parselleme hariç)"
  },
  {
    "code": "43.11.01",
    "title": "Yıkım işleri (binaların ve diğer yapıların yıkılması ve sökülmesi)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.12.00",
    "title": "Şantiyenin hazırlanması (zemin ve arazi hazırlama, alanın temizlenmesi ile kazı ve hafriyat işleri)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.13.01",
    "title": "Test sondajı ve delme (madencilikle bağlantılı olarak gerçekleştirilen test sondajı hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.21.01",
    "title": "Bina ve bina dışı yapıların (ulaşım için aydınlatma ve sinyalizasyon sistemleri hariç) elektrik tesisatı, kablolu televizyon ve bilgisayar ağı tesisatı ile konut tipi antenler (uydu antenleri dahil), elektrikli güneş enerjisi kollektörleri, elektrik sayaçları, elektrikli araçlar için elektrikli şarj cihazları tesisatının kurulumu, duvar dibi ısıtma sistemleri, yangın ve hırsızlık alarm sistemleri vb. kurulumu",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.21.03",
    "title": "Kara yolları, demir yolları ve diğer raylı yolların, liman ve havaalanlarının aydınlatma ve sinyalizasyon sistemlerinin tesisatı (havaalanı pisti aydınlatmasının tesisatı dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.22.03",
    "title": "Bina ve diğer inşaat projelerinde su ve kanalizasyon tesisatı ve onarımı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.22.05",
    "title": "Gaz tesisatı faaliyetleri (hastanelerdeki oksijen gazı temini için kurulum işleri dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.22.06",
    "title": "Bina veya diğer inşaat projelerinde ısıtma, havalandırma, soğutma ve iklimlendirme sistemlerinin onarım ve bakımı (iklimlendirme cihazı ve/veya ısı pompası dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.22.07",
    "title": "Bina veya diğer inşaat projelerinde ısıtma, havalandırma, soğutma ve iklimlendirme sistemlerinin kurulumu (iklimlendirme cihazı ve/veya ısı pompası dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.23.01",
    "title": "Yalıtım tesisatı (su yalıtımı ile çatıların dış yalıtımı hariç)"
  },
  {
    "code": "43.23.02",
    "title": "Su yalıtımı (çatıların su yalıtımı hariç)"
  },
  {
    "code": "43.24.01",
    "title": "Asansörlerin, yürüyen merdivenlerin, yürüyen yolların, otomatik ve döner kapıların onarım ve bakımı dahil kurulum işleri"
  },
  {
    "code": "43.24.03",
    "title": "Parmaklık ve korkuluk tesisatı işleri (metal yangın merdivenlerinin kurulumu dahil)"
  },
  {
    "code": "43.24.99",
    "title": "Başka yerde sınıflandırılmamış diğer tesisat işleri"
  },
  {
    "code": "43.31.01",
    "title": "Sıva işleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.32.01",
    "title": "Hazır mutfaklar, mutfak tezgahları, gömme dolaplar, iç merdivenler ile ince tahta, lambri ve benzerlerinin montajı işleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "43.32.02",
    "title": "Herhangi bir malzemeden yapılan kapı ve pencere kasaları, kapılar (zırhlı kapılar dahil, otomatik ve döner kapılar hariç), pencereler, kepenkler, panjurlar, garaj kapıları ve benzerlerinin montajı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "43.32.03",
    "title": "Seyyar bölme ve metal yapı üzerine asma tavan montaj işleri ile diğer doğrama tesisatı işleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "43.33.01",
    "title": "Bina ve diğer yapıların içi veya dışında yer ve duvar kaplama faaliyetleri (halı, taban muşambası ve kağıt kaplama hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.33.99",
    "title": "Başka yerde sınıflandırılmamış diğer yer döşeme ve kaplama ile duvar kaplama işleri (halı, taban muşambası ve diğer esnek yer kaplamaları ile duvar kaplama işleri)"
  },
  {
    "code": "43.34.01",
    "title": "Binaların iç ve dış boyama işleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.34.02",
    "title": "Cam takma işleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.34.03",
    "title": "Bina dışı yapıların boyama işleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.35.00",
    "title": "İnşaatlardaki diğer bütünleyici ve tamamlayıcı işler"
  },
  {
    "code": "43.41.00",
    "title": "Çatı işleri"
  },
  {
    "code": "43.42.01",
    "title": "Yapısal çelik bileşenlerin kurulması işleri (bina inşaatları için)"
  },
  {
    "code": "43.42.02",
    "title": "Bina inşaatı için kazık çakma ve temel inşaatı işleri (forekazık çakma dahil)"
  },
  {
    "code": "43.42.03",
    "title": "Baca ve sanayi fırınlarının inşaatı ve kurulması (fırınlar için yanma odasına ateş tuğlası döşenmesi işleri dahil)"
  },
  {
    "code": "43.42.99",
    "title": "Bina inşaatlarında başka yerde sınıflandırılmamış diğer inşaat faaliyetleri"
  },
  {
    "code": "43.50.01",
    "title": "Yapısal çelik bileşenlerin kurulması işleri (bina dışı inşaatları için)"
  },
  {
    "code": "43.50.02",
    "title": "Bina dışı yapılar için kazık çakma ve temel inşaatı işleri (forekazık çakma dahil)"
  },
  {
    "code": "43.50.03",
    "title": "Yer altı çalışmaları (su kuyusu açma hariç)"
  },
  {
    "code": "43.50.04",
    "title": "Prefabrik yüzme havuzlarının kurulumu"
  },
  {
    "code": "43.50.05",
    "title": "Yol yüzeylerin boyayla işaretlenmesi, yol bariyeri, trafik işaret ve levhaları vb.nin kurulumu gibi yol, tünel vb. yerlerdeki yüzey işleri"
  },
  {
    "code": "43.50.06",
    "title": "Prefabrik yapıların montajı ve kurulması (prefabrik binalar ve yüzme havuzları hariç her çeşit prefabrik sokak düzeneklerinin (otobüs durağı, telefon kulübesi, bank vb.) kurulumu vb.)"
  },
  {
    "code": "43.60.00",
    "title": "Özel inşaat hizmetleri için aracılık hizmeti faaliyetleri"
  },
  {
    "code": "43.91.00",
    "title": "Duvarcılık ve tuğla, briket vb. döşeme faaliyetleri"
  },
  {
    "code": "43.99.04",
    "title": "Vinç ve benzeri diğer inşaat ekipmanlarının operatörü ile birlikte kiralanması (özel bir inşaat çeşidinde yer almayan)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "43.99.05",
    "title": "İnşaatlarda beton işleri (kalıp içerisine beton dökülmesi vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.99.07",
    "title": "İnşaat iskelesi ve çalışma platformunu kurma ve sökme işleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.99.13",
    "title": "İnşaat demirciliği (inşaat demirinin bükülmesi ve bağlanması)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "43.99.99",
    "title": "Başka yerde sınıflandırılmamış diğer uzmanlaşmış inşaat işleri"
  },
  {
    "code": "46.11.01",
    "title": "Çiçeklerin, bitkilerin, diğer tarımsal hammaddelerin, tekstil hammaddelerinin ve yarı mamul malların bir ücret veya sözleşmeye dayalı olarak toptan satışını yapan aracılar",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.11.02",
    "title": "Canlı hayvanların bir ücret veya sözleşmeye dayalı olarak toptan satışını yapan aracılar",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.11.90",
    "title": "Diğer malların toptan satışı ile ilgili aracıların faaliyetleri (kürklü müzayedeleri vb.)"
  },
  {
    "code": "46.12.01",
    "title": "Katı, sıvı ve gaz haldeki yakıtların ve ilgili ürünlerin toptan satışı ile ilgili aracıların faaliyetleri (motorlu taşıt yakıtları dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.12.02",
    "title": "Endüstriyel kimyasallar, gübreler ve zirai kimyasal ürünlerin toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.12.03",
    "title": "Birincil formdaki metaller ve metal cevherlerinin toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.13.01",
    "title": "İnşaat malzemesi toptan satışı ile ilgili aracıların faaliyetleri (inşaat demiri ve kerestesi hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.13.02",
    "title": "Kereste ve kereste ürünlerinin toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.14.01",
    "title": "Bilgisayar, yazılım, elektronik ve telekomünikasyon donanımlarının ve diğer büro ekipmanlarının toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.14.02",
    "title": "Tarımsal ekipmanlar ile makine ve sanayi ekipmanlarının toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.14.03",
    "title": "Gemilerin, hava taşıtlarının ve diğer taşıma ekipmanlarının toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.15.01",
    "title": "Mobilyaların toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.15.02",
    "title": "Hırdavatçı (nalburiye) eşyalarının, madeni eşyaların ve el aletlerinin toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.15.03",
    "title": "Radyo, televizyon ve video cihazlarının toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.15.90",
    "title": "Diğer ev eşyalarının toptan satışı ile ilgili aracıların faaliyetleri"
  },
  {
    "code": "46.16.01",
    "title": "Deri giyim eşyası, kürk ve ayakkabının bir ücret veya sözleşmeye dayalı olarak toptan satışını yapan aracılar",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.16.02",
    "title": "Deri eşyalar ve seyahat aksesuarlarının bir ücret veya sözleşmeye dayalı olarak toptan satışını yapan aracılar",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.16.03",
    "title": "Giyim eşyalarının bir ücret veya sözleşmeye dayalı olarak toptan satışını yapan aracılar (deri giyim eşyaları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.16.04",
    "title": "Tekstil ürünlerinin bir ücret veya sözleşmeye dayalı olarak toptan satışını yapan aracılar (iplik, kumaş, ev tekstili, perde vb. ürünler) (giyim eşyaları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.17.01",
    "title": "Gıda maddelerinin toptan satışı ile ilgili aracıların faaliyetleri (aracı üretici birlikleri dahil, içecekler ile yaş sebze ve meyve hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.17.02",
    "title": "Yaş sebze ve meyvelerin toptan satışı ile ilgili aracıların faaliyetleri (kabzımallık ve aracı üretici birlikleri dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.17.03",
    "title": "Tütün ve tütün ürünlerinin toptan satışı ile ilgili aracıların faaliyetleri (aracı üretici birlikleri dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.17.04",
    "title": "İçeceklerin toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.18.01",
    "title": "Oyun ve oyuncak, spor malzemesi, bisiklet, kitap, gazete, dergi, kırtasiye ürünleri, müzik aleti, saat ve mücevher ile fotoğrafçılıkla ilgili ve optik aletlerin toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.18.02",
    "title": "Kozmetik, parfüm ve bakım ürünleri ile temizlik malzemesinin toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.18.03",
    "title": "Tıbbi ürünlerin, araç ve malzemelerin toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.18.04",
    "title": "Kağıt ve karton (mukavva) ile ilgili belirli ürünlerin toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.18.05",
    "title": "Eczacılıkla ilgili ürünlerin toptan satışı ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.18.06",
    "title": "Otomobillerin ve hafif motorlu kara taşıtlarının toptan satışı ile ilgili aracıların faaliyetleri (elektrikli olanlar ile ambulans ve minibüs benzeri motorlu yolcu taşıtları için olanlar dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.18.07",
    "title": "Diğer motorlu kara taşıtlarının toptan satışı ile ilgili aracıların faaliyetleri (kamyonlar, çekiciler, römorklar, yarı römorklar, kamp araçları vb., elektrikli olanlar dahil)"
  },
  {
    "code": "46.18.08",
    "title": "Motorlu kara taşıtlarının parça ve aksesuarlarının toptan satışı ile ilgili aracıların faaliyetleri"
  },
  {
    "code": "46.18.09",
    "title": "Motosikletler, motorlu bisikletler ve bunların parça ve aksesuarlarının toptan satışı ile ilgili aracıların faaliyetleri"
  },
  {
    "code": "46.18.99",
    "title": "Başka yerde sınıflandırılmamış belirli diğer ürünlerin toptan satışı ile ilgili aracıların faaliyetleri"
  },
  {
    "code": "46.19.01",
    "title": "Uzmanlaşmamış toptan ticaret ile ilgili aracıların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.21.01",
    "title": "Hayvan yemi toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.21.02",
    "title": "Tahıl toptan ticareti (buğday, arpa, çavdar, yulaf, mısır, çeltik vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.21.03",
    "title": "Yağlı tohum ve yağlı meyvelerin toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.21.06",
    "title": "Pamuk toptan ticareti",
    "hazard": "Tehlikeli"
  },
  {
    "code": "46.21.07",
    "title": "Yün ve tiftik toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.21.08",
    "title": "Tohum (yağlı tohumlar hariç) toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.21.99",
    "title": "Başka yerde sınıflandırılmamış diğer tarımsal ham maddelerin toptan ticareti"
  },
  {
    "code": "46.22.01",
    "title": "Çiçeklerin ve bitkilerin toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.23.01",
    "title": "Canlı hayvanların toptan ticareti (kümes hayvanları hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "46.23.02",
    "title": "Canlı kümes hayvanları toptan ticareti",
    "hazard": "Tehlikeli"
  },
  {
    "code": "46.24.01",
    "title": "Ham deri, post ve kürklü deri toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.24.02",
    "title": "Tabaklanmış deri, güderi ve kösele toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.31.01",
    "title": "Fındık, antep fıstığı, yer fıstığı ve ceviz toptan ticareti (kavrulmuş olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.31.02",
    "title": "Taze incir ve üzüm toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.31.03",
    "title": "Narenciye toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.31.04",
    "title": "Diğer taze meyve sebze toptan ticareti (patates dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.31.05",
    "title": "Zeytin (işlenmiş) toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.31.06",
    "title": "Kültür mantarı toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.31.08",
    "title": "Kuru bakliyat ürünleri toptan ticareti (fasulye, mercimek, nohut, vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.31.09",
    "title": "Kavrulmuş veya işlenmiş kuru yemiş toptan ticareti (leblebi, kavrulmuş fındık, fıstık, çekirdek vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.31.10",
    "title": "Kuru üzüm toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.31.11",
    "title": "Kuru incir toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.31.12",
    "title": "Kuru kayısı toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.31.90",
    "title": "Diğer işlenmiş veya korunmuş sebze ve meyve toptan ticareti (reçel, pekmez, pestil, salamura veya turşusu yapılmış olanlar dahil) (fındık, incir, üzüm, narenciye, zeytin, kültür mantarı ve kuru yemiş hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.32.01",
    "title": "Kümes hayvanları ve av hayvanları etlerinin toptan ticareti",
    "hazard": "Tehlikeli"
  },
  {
    "code": "46.32.02",
    "title": "Et toptan ticareti (av hayvanları ve kümes hayvanları etleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "46.32.03",
    "title": "Yenilebilir sakatat (ciğer, işkembe, böbrek, taşlık vb.) toptan ticareti",
    "hazard": "Tehlikeli"
  },
  {
    "code": "46.32.04",
    "title": "Et ürünlerinin toptan ticareti (salam, sosis, sucuk, pastırma vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "46.32.05",
    "title": "Balık, kabuklular, yumuşakçalar ve diğer deniz ürünleri toptan ticareti"
  },
  {
    "code": "46.33.01",
    "title": "Süt ürünleri toptan ticareti (işlenmiş süt, süt tozu, yoğurt, peynir, kaymak, tereyağı vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "46.33.02",
    "title": "Yumurta ve yumurta ürünleri toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.33.03",
    "title": "Hayvan veya bitkisel kaynaklı yenilebilir sıvı ve katı yağların toptan ticareti (tereyağı hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.33.04",
    "title": "Dondurma ve diğer yenilebilir buzların toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.34.01",
    "title": "Alkollü içeceklerin toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.34.02",
    "title": "Meyve ve sebze suları, maden suyu, meşrubat ve diğer alkolsüz içeceklerin toptan ticareti (su hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.34.03",
    "title": "Su toptan ticareti (su istasyonları dahil, şebeke suyu hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.35.01",
    "title": "Tütün ürünlerinin toptan ticareti (işlenmemiş tütün hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.36.01",
    "title": "Çikolata ve şekerleme toptan ticareti (helva, lokum, akide şekeri, bonbon şekeri vb. dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.36.02",
    "title": "Fırıncılık mamullerinin toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.36.03",
    "title": "Şeker toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.37.01",
    "title": "Çay toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.37.02",
    "title": "Kahve, kakao ve baharat toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.37.03",
    "title": "İçecek amaçlı kullanılan aromatik bitkilerin toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.38.02",
    "title": "Ev hayvanları için yemlerin veya yiyeceklerin toptan ticareti (çiftlik hayvanları için olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.38.03",
    "title": "Gıda tuzu (sofra tuzu) toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.38.04",
    "title": "Un, nişasta, makarna, şehriye vb. ürünler ile hazır gıdaların toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.38.05",
    "title": "Hazır homojenize gıda ile diyetetik gıda ürünleri toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.38.99",
    "title": "Başka yerde sınıflandırılmamış diğer gıda ürünlerinin toptan ticareti"
  },
  {
    "code": "46.39.03",
    "title": "Uzmanlaşmamış gıda, içecek ve tütün toptan ticareti"
  },
  {
    "code": "46.41.01",
    "title": "Evde kullanılan tekstil takımları, perdeler ve çeşitli tekstil malzemesinden ev eşyaları toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.41.02",
    "title": "Tuhafiye ürünleri toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.41.03",
    "title": "Kumaş toptan ticareti (manifatura ürünleri dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.41.04",
    "title": "İplik toptan ticareti (tuhafiye ürünleri ile dikiş ipliği hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.41.90",
    "title": "Diğer tekstil ürünleri toptan ticareti"
  },
  {
    "code": "46.42.01",
    "title": "Bebek giysileri, sporcu giysileri ve diğer giyim eşyalarının toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.42.02",
    "title": "Ayakkabı toptan ticareti (spor ayakkabıları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.42.03",
    "title": "Çorap ve giysi aksesuarlarının toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.42.04",
    "title": "Kürk ve deriden giyim eşyalarının toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.42.05",
    "title": "Dış giyim eşyalarının toptan ticareti (iş giysileri ile triko olanlar dahil, kürk ve deriden olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.42.06",
    "title": "İç giyim eşyalarının toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.42.07",
    "title": "Şemsiye toptan ticareti (güneş ve bahçe şemsiyeleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.42.08",
    "title": "Ayakkabı malzemeleri toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.43.01",
    "title": "Beyaz eşya toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.43.08",
    "title": "Hırsız ve yangın alarmları ile benzeri cihazların toptan ticareti (evlerde kullanım amaçlı)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.43.09",
    "title": "Radyo, televizyon, video ve DVD cihazlarının toptan ticareti (antenler ile arabalar için radyo ve TV ekipmanları dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.43.10",
    "title": "Fotoğrafçılıkla ilgili ürünlerin toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.43.11",
    "title": "Optik ürünlerin toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.43.12",
    "title": "Konutlarda, bürolarda ve mağazalarda kullanılan klimaların (iklimlendirme ekipmanlarının) toptan ticareti (sanayi tipi olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.43.90",
    "title": "Diğer elektrikli ev aletleri toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.44.01",
    "title": "Porselen ve cam eşyalar ile toprak ve seramikten yapılan ürünlerin toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.44.02",
    "title": "Temizlik malzemesi toptan ticareti (kişisel temizlik sabunları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.44.04",
    "title": "Cila ve krem (ayakkabı, mobilya, yer döşemesi, kaporta, cam veya metal için) toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.45.01",
    "title": "Parfüm, kozmetik ürünleri ve kolonya toptan ticareti (ıtriyat dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.45.02",
    "title": "Sabun toptan ticareti (kişisel temizlik için)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.46.01",
    "title": "Cerrahi, tıbbi ve ortopedik alet ve cihazların toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.46.02",
    "title": "Temel eczacılık ürünleri ile eczacılık müstahzarlarının toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.46.03",
    "title": "Dişçilikte kullanılan alet ve cihazların toptan ticareti (protezler, bağlantı parçaları dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.46.04",
    "title": "Hayvan sağlığı ile ilgili ilaçların toptan ticareti (serum, aşı, vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.47.01",
    "title": "Mobilya ve mobilya aksesuarları toptan ticareti (yatak dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.47.02",
    "title": "Halı, kilim, vb. yer kaplamaları toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.47.03",
    "title": "Aydınlatma ekipmanlarının toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.47.04",
    "title": "Büro mobilyalarının toptan ticareti"
  },
  {
    "code": "46.48.01",
    "title": "Mücevher ve takı toptan ticareti (altın, gümüş, vb. olanlar) (imitasyon olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.48.02",
    "title": "Saat toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.01",
    "title": "Deri eşyalar ve seyahat aksesuarları toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.02",
    "title": "Spor malzemesi toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.03",
    "title": "Kırtasiye ürünleri toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.04",
    "title": "Oyun ve oyuncak toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.05",
    "title": "Hasır eşyalar, mantar eşyalar ve diğer ahşap ürünlerin toptan ticareti (ip vb. için makaralar dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.06",
    "title": "Müzik aletleri toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.07",
    "title": "Çatal-bıçak takımı ve diğer kesici aletler ile metal sofra ve mutfak eşyalarının toptan ticareti (bakır mutfak eşyaları dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.08",
    "title": "Tuvalet kağıdı, peçete, kağıt havlu ile kağıt tepsi, tabak, bardak, çocuk bezi vb. toptan ticareti (plastikten olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.09",
    "title": "Sportif amaçlı avcılık ve balıkçılık malzemeleri toptan ticareti (tabanca, av tüfeği ve balık ağları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.11",
    "title": "Kitap, dergi ve gazete toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.12",
    "title": "Hediyelik eşya toptan ticareti (pipo, tespih, bakır süs eşyaları, imitasyon takılar dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.13",
    "title": "Bisikletler, elektrikli bisikletler, elektrikli tek tekerli taşıt (monowheels), hoverboard, kickscooterlar ve bunların parça ve aksesuarlarının toptan ticareti"
  },
  {
    "code": "46.49.17",
    "title": "Plastik sofra, mutfak ve diğer ev eşyası ile tuvalet eşyası toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.22",
    "title": "Tıraş bıçakları, usturalar ve jiletlerin toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.24",
    "title": "Resim, fotoğraf vb. için çerçeve toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.25",
    "title": "Arı kovanı toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.26",
    "title": "Spor ve eğlence amaçlı teknelerin, kayıkların ve kanoların toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.49.99",
    "title": "Başka yerde sınıflandırılmamış diğer ev eşyaları ve ev gereçlerinin toptan ticareti"
  },
  {
    "code": "46.50.01",
    "title": "Bilgisayar, bilgisayar çevre birimleri ve yazılımlarının toptan ticareti (bilgisayar donanımları, pos cihazları, ATM cihazları vb. dahil)"
  },
  {
    "code": "46.50.02",
    "title": "Telekomünikasyon ekipman ve parçalarının toptan ticareti (telefon ve iletişim ekipmanları dahil)"
  },
  {
    "code": "46.50.03",
    "title": "Elektronik cihaz ve parçalarının toptan ticareti (elektronik valfler, tüpler, yarı iletken cihazlar, mikroçipler, entegre devreler, baskılı devreler, vb.) (seyrüsefer cihazları hariç)"
  },
  {
    "code": "46.50.90",
    "title": "Diğer bilgi ve iletişim teknolojisi ekipmanlarının toptan ticareti"
  },
  {
    "code": "46.61.02",
    "title": "Tarım, hayvancılık ve ormancılık makine ve ekipmanları ile aksam ve parçalarının toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.61.03",
    "title": "Çim biçme ve bahçe makine ve ekipmanları ile aksam ve parçalarının toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.62.01",
    "title": "Ağaç işleme takım tezgahları ve parçalarının toptan ticareti (parça tutucuları dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.62.02",
    "title": "Metal işleme takım tezgahlarının ve parçalarının toptan ticareti (parça tutucuları dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.62.04",
    "title": "Lehimleme veya kaynak yapma için kullanılan makineler ile metallerin veya sinterlenmiş metal karbürlerin sıcak spreylenmesi için kullanılan elektrikli makine ve cihazlar ile parçalarının toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.62.90",
    "title": "Diğer malzemeleri işleme için takım tezgahları ve parçalarının toptan ticareti (parça tutucuları dahil) (ağaç ve metal işlemede kullanılanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.63.01",
    "title": "Bina ve bina dışı inşaat iş makinelerinin toptan ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.63.02",
    "title": "Madencilik makinelerinin toptan ticareti (madenler için bocurgatlar, sürekli hareketli elavatörler ve konveyörler dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.64.03",
    "title": "Rüzgar türbinleri, kondansatörler, elektrik yalıtkanları (izolatör), AC/AD/DC motorlar, jeneratörler, yalıtılmış bobin telleri vb. elektrikli makine, cihaz ve aletlerin toptan ticareti"
  },
  {
    "code": "46.64.04",
    "title": "Kaldırma ve yükleme-boşaltma (elleçleme) ekipmanlarının toptan ticareti"
  },
  {
    "code": "46.64.05",
    "title": "Tekstil endüstrisi makineleri ile dikiş ve örgü makineleri ve parçalarının toptan ticareti (ev tipi olanlar hariç)"
  },
  {
    "code": "46.64.06",
    "title": "Kompresör ve parçalarının toptan ticareti (soğutma, hava ve diğer amaçlar için)"
  },
  {
    "code": "46.64.07",
    "title": "Ulaşım araçları toptan ticareti (motorlu kara taşıtları, motosiklet ve bisikletler hariç)"
  },
  {
    "code": "46.64.08",
    "title": "Gıda, içecek ve tütün sanayisinde kullanılan makineler ile parçalarının toptan ticareti"
  },
  {
    "code": "46.64.09",
    "title": "Akümülatör, batarya, pil ve bunların parçalarının toptan ticareti (evlerde, motosikletlerde ve motorlu kara taşıtlarında kullanılanlar hariç)"
  },
  {
    "code": "46.64.10",
    "title": "Silah ve mühimmat toptan ticareti"
  },
  {
    "code": "46.64.11",
    "title": "İş güvenliği amaçlı kişisel koruyucu donanımların toptan ticareti"
  },
  {
    "code": "46.64.12",
    "title": "Yangın söndürücüler, püskürtme tabancaları, buhar veya kum püskürtme makineleri ile benzeri mekanik cihazların toptan ticareti (tarımsal amaçlı kullanılanlar ile taşıtlar için yangın söndürücüler hariç)"
  },
  {
    "code": "46.64.13",
    "title": "Sanayi, ticaret, seyrüsefer ve diğer hizmetlerde kullanılmak üzere başka yerde sınıflandırılmamış diğer makinelere ait parçaların toptan ticareti (motorlu kara taşıtları için olanlar hariç)"
  },
  {
    "code": "46.64.14",
    "title": "Zırhlı veya güçlendirilmiş kasalar ve kutular ile kasa daireleri için zırhlı veya güçlendirilmiş kapılar ve kilitli kutular ile para veya evrak kutuları, vb. (adi metalden) toptan ticareti"
  },
  {
    "code": "46.64.15",
    "title": "Elektrik malzemeleri toptan ticareti (evde kullanılan pil ve bataryalar dahil)"
  },
  {
    "code": "46.64.16",
    "title": "Makine ve ekipmanlarla ilgili aksam ve parçaların toptan ticareti (motorlu kara taşıtları için olanlar hariç)"
  },
  {
    "code": "46.64.99",
    "title": "Başka yerde sınıflandırılmamış diğer makine ve ekipmanların toptan ticareti"
  },
  {
    "code": "46.71.04",
    "title": "Otomobillerin ve hafif motorlu kara taşıtlarının toptan ticareti (elektrikli olanlar ile ambulans ve minibüs benzeri motorlu yolcu taşıtları dahil)"
  },
  {
    "code": "46.71.90",
    "title": "Diğer motorlu kara taşıtlarının toptan ticareti (kamyonlar, çekiciler, römorklar, yarı römorklar, kamp araçları vb., elektrikli olanlar dahil)"
  },
  {
    "code": "46.72.12",
    "title": "Motorlu kara taşıtlarının parçalarının toptan ticareti (cam, lastik ve jantlar ile motosiklet parçaları hariç)"
  },
  {
    "code": "46.72.13",
    "title": "Motorlu kara taşıtı lastiklerinin ve jantlarının toptan ticareti (motosiklet lastik ve jantları hariç)"
  },
  {
    "code": "46.72.14",
    "title": "Motorlu kara taşıtlarının aksesuarlarının toptan ticareti (motosiklet aksesuarları hariç)"
  },
  {
    "code": "46.72.15",
    "title": "Motorlu kara taşıtlarının camlarının toptan ticareti"
  },
  {
    "code": "46.73.24",
    "title": "Motosikletler ve motorlu bisikletlerin toptan ticareti"
  },
  {
    "code": "46.73.25",
    "title": "Motosikletler ve motorlu bisikletlerin parça ve aksesuarlarının toptan ticareti"
  },
  {
    "code": "46.81.01",
    "title": "Sıvı yakıtlar ve bunlarla ilgili ürünlerin toptan ticareti"
  },
  {
    "code": "46.81.02",
    "title": "Gazlı yakıtlar ve bunlarla ilgili ürünlerin toptan ticareti (LPG (bütan ve propan), tüpgaz, doğalgaz (LNG, CNG) vb. dahil, şebeke üzerinden yapılanlar hariç)"
  },
  {
    "code": "46.81.03",
    "title": "Katı yakıtlar ve bunlarla ilgili ürünlerin toptan ticareti"
  },
  {
    "code": "46.82.01",
    "title": "Demir/çelikten bar ve çubukların, profillerin, levha kazıkların (palplanş), tüp ve boruların toptan ticareti"
  },
  {
    "code": "46.82.02",
    "title": "Değerli metal cevherleri ve konsantrelerinin toptan ticareti (altın, gümüş, platin vb.)"
  },
  {
    "code": "46.82.03",
    "title": "Birincil formdaki değerli metallerin toptan ticareti - kütük, blok, granül, toz, pelet, levha, bar, çubuk, profil vb. formlarda (altın, gümüş, platin vb.)"
  },
  {
    "code": "46.82.04",
    "title": "Demir/çelikten haddelenmiş/soğuk çekilmiş yassı ürünlerin toptan ticareti"
  },
  {
    "code": "46.82.05",
    "title": "Demir cevherleri toptan ticareti"
  },
  {
    "code": "46.82.06",
    "title": "Demir dışı metal cevherleri ve konsantrelerinin toptan ticareti (alüminyum, bakır, nikel, kurşun, çinko, kalay, vb. cevherleri dahil, uranyum ve toryum cevherleri ile değerli metal cevherleri hariç)"
  },
  {
    "code": "46.82.07",
    "title": "Birincil formdaki demir ve çelik toptan ticareti - kütük (ingot), blok, granül, toz, pelet, parça vb. formlarda (pik demir, manganezli dökme demir, demir, çelik ve çelik alaşımları vb.)"
  },
  {
    "code": "46.82.08",
    "title": "Birincil formdaki demir dışı metallerin toptan ticareti - kütük, blok, granül, toz, pelet, levha, bar, çubuk, profil vb. formlarda (alüminyum, bakır, nikel, kurşun, çinko, kalay, vb. dahil, altın, gümüş ve platin hariç)"
  },
  {
    "code": "46.82.09",
    "title": "Demir/çelikten diğer birincil formdaki ürünlerin toptan ticareti (nervürlü levhalar, sandviç paneller ve demir yolu veya tramvay yolu yapım malzemesi dahil)"
  },
  {
    "code": "46.82.10",
    "title": "Uranyum ve toryum cevherleri toptan ticareti"
  },
  {
    "code": "46.83.01",
    "title": "Çimento, alçı, harç, kireç, mozaik vb. inşaat malzemeleri toptan ticareti"
  },
  {
    "code": "46.83.02",
    "title": "Ağacın ilk işlenmesinden elde edilen ürünlerin toptan ticareti"
  },
  {
    "code": "46.83.03",
    "title": "Düz cam toptan ticareti"
  },
  {
    "code": "46.83.04",
    "title": "Boya, vernik ve lak toptan ticareti"
  },
  {
    "code": "46.83.05",
    "title": "Banyo küvetleri, lavabolar, eviyeler, klozet kapakları, tuvalet taşı ve rezervuarları ile seramikten karo ve fayans vb. sıhhi ürünlerin toptan ticareti"
  },
  {
    "code": "46.83.06",
    "title": "Metalden prefabrik yapıların, köprülerin, köprü parçalarının, kulelerin, kafes direklerin, konstrüksiyon elemanlarının, diğer yapıların ve yapı elemanlarının toptan ticareti"
  },
  {
    "code": "46.83.07",
    "title": "Mermer, granit, kayağan taşı, kum taşı vb. toptan ticareti (işlenmemiş veya blok halde olanlar)"
  },
  {
    "code": "46.83.08",
    "title": "Taş, kum, çakıl, mıcır, kil, kaolin vb. inşaat malzemeleri toptan ticareti"
  },
  {
    "code": "46.83.09",
    "title": "İşlenmiş mermer, traverten, kaymaktaşı (su mermeri) ve bunlardan yapılmış ürünlerin toptan ticareti (levha halinde olanlar ile lavabo vb. sıhhi ürünler dahil)"
  },
  {
    "code": "46.83.10",
    "title": "Tuğla, kiremit, briket, kaldırım taşı vb. inşaat malzemeleri toptan ticareti"
  },
  {
    "code": "46.83.11",
    "title": "Plastik kapı, pencere ve bunların kasaları ile kapı eşikleri, panjurlar, jaluziler, storlar vb. eşyaların toptan ticareti"
  },
  {
    "code": "46.83.12",
    "title": "İşlenmemiş ağaç (tomruk-ham haldeki) toptan ticareti (orman ağaçları, endüstriyel odunlar vb.)"
  },
  {
    "code": "46.83.13",
    "title": "Metalden kapı, pencere ve bunların kasaları ile kapı eşiklerinin toptan ticareti"
  },
  {
    "code": "46.83.14",
    "title": "Masif, lamine ve laminant parke toptan ticareti"
  },
  {
    "code": "46.83.15",
    "title": "İnşaatlarda izolasyon amaçlı kullanılan malzemelerin toptan ticareti"
  },
  {
    "code": "46.83.16",
    "title": "Betondan, çimentodan ve suni taştan prefabrik yapıların, yapı elemanlarının ve diğer ürünlerin toptan ticareti"
  },
  {
    "code": "46.83.17",
    "title": "Alçı ve alçı esaslı bileşenlerden inşaat amaçlı ürünlerin toptan ticareti"
  },
  {
    "code": "46.83.18",
    "title": "Duvar kağıdı, tekstil duvar kaplamaları, plastikten zemin, duvar veya tavan kaplamalarının toptan ticareti"
  },
  {
    "code": "46.83.19",
    "title": "Plastikten inşaat amaçlı tabakalar, levhalar, filmler, folyolar, şeritler ve borular ile asfalt vb. malzemeden çatı kaplama ürünlerinin toptan ticareti"
  },
  {
    "code": "46.83.20",
    "title": "Ahşap kapı, pencere ve bunların kasaları ile kapı eşiklerinin toptan ticareti"
  },
  {
    "code": "46.83.21",
    "title": "Plastikten prefabrik yapılar ve yapı elemanlarının toptan ticareti"
  },
  {
    "code": "46.83.22",
    "title": "Ahşaptan prefabrik yapıların ve yapı elemanlarının toptan ticareti"
  },
  {
    "code": "46.83.99",
    "title": "Başka yerde sınıflandırılmamış diğer inşaat malzemesi toptan ticareti"
  },
  {
    "code": "46.84.01",
    "title": "Hırdavat (nalburiye) malzemesi ve el aletleri toptan ticareti (çivi, raptiye, vida, adi metalden kilit, menteşe, bağlantı parçası, çekiç, testere, pense, tornavida, takım tezgahı uçları, çengel, halka, perçin, vb.)"
  },
  {
    "code": "46.84.02",
    "title": "Sıhhi tesisat ve ısıtma tesisatı malzemesi toptan ticareti (lavabo musluğu, vana, valf, tıkaç, t-parçaları, bağlantılar, vb.) (kombiler ve radyatörler hariç)"
  },
  {
    "code": "46.84.03",
    "title": "Demirden veya çelikten merkezi ısıtma radyatörleri, merkezi ısıtma kazanları (kombiler dahil) ile bunların parçalarının toptan ticareti (buhar jeneratörleri ve kızgın su üreten kazanlar hariç)"
  },
  {
    "code": "46.84.04",
    "title": "Demir veya çelikten dikenli tel, bakır veya alüminyumdan örgülü tel, kablo, örme şerit ve benzerleri (elektrik yalıtımı olanlar hariç), demir, çelik veya bakır tellerden mensucat, ızgara, ağ, kafeslik ve çit toptan ticareti"
  },
  {
    "code": "46.84.05",
    "title": "Tarım ve ormancılık alet ve malzemeleri toptan ticareti (balta, kazma, orak, tırpan, vb. dahil, tarımsal amaçlı makine ve ekipmanlar hariç)"
  },
  {
    "code": "46.84.06",
    "title": "Metal rezervuar, tank, fıçı ve benzeri konteyner toptan ticareti, kapasitesi > 300 litre olanlar (merkezi ısıtma amaçlı olanlar ile mekanik veya termal ekipmanlı olanlar hariç)"
  },
  {
    "code": "46.85.01",
    "title": "Endüstriyel kimyasalların toptan ticareti (anilin, matbaa mürekkebi, kimyasal yapıştırıcı, havai fişek, boyama maddeleri, sentetik reçine, metil alkol, parafin, esans ve tatlandırıcı, soda, sanayi tuzu, parafin, nitrik asit, amonyak, sanayi gazları vb.)"
  },
  {
    "code": "46.85.02",
    "title": "Suni gübrelerin toptan ticareti (gübre mineralleri, gübre ve azot bileşikleri ve turba ile amonyum sülfat, amonyum nitrat, sodyum nitrat, potasyum nitrat vb. dahil, nitrik asit, sülfonitrik asit ve amonyak hariç)"
  },
  {
    "code": "46.85.03",
    "title": "Zirai kimyasal ürünlerin toptan ticareti (haşere ilaçları, yabancı ot ilaçları, dezenfektanlar, mantar ilaçları, çimlenmeyi önleyici ürünler, bitki gelişimini düzenleyiciler ve diğer zirai kimyasal ürünler)"
  },
  {
    "code": "46.85.04",
    "title": "Hayvansal veya bitkisel gübrelerin toptan ticareti (kapalı alanda yapılan ticaret)"
  },
  {
    "code": "46.85.05",
    "title": "Hayvansal veya bitkisel gübrelerin toptan ticareti (açık alanda yapılan ticaret)"
  },
  {
    "code": "46.86.01",
    "title": "Birincil formdaki plastik ve kauçuk toptan ticareti"
  },
  {
    "code": "46.86.02",
    "title": "Sanayide kullanım amaçlı plastik poşet, çanta, torba, çuval, vb. ambalaj malzemelerinin toptan ticareti"
  },
  {
    "code": "46.86.03",
    "title": "Dökme halde kağıt ve mukavva toptan ticareti"
  },
  {
    "code": "46.86.04",
    "title": "Tekstil elyafı toptan ticareti"
  },
  {
    "code": "46.86.05",
    "title": "İşlenmemiş inci, değerli ve yarı değerli taşların toptan ticareti (sanayi tipi elmaslar hariç)"
  },
  {
    "code": "46.86.99",
    "title": "Başka yerde sınıflandırılmamış ara ürün (tarım hariç) toptan ticareti"
  },
  {
    "code": "46.87.01",
    "title": "Atık ve hurda toptan ticareti (metal olanlar) (kağıt, cam, plastik vb. ikincil hammaddeler hariç)"
  },
  {
    "code": "46.87.02",
    "title": "Atık ve hurda toptan ticareti (kağıt, cam, plastik vb. olanlar) (metal olanlar hariç)"
  },
  {
    "code": "46.89.00",
    "title": "Başka yerde sınıflandırılmamış uzmanlaşmış diğer toptan ticaret"
  },
  {
    "code": "46.90.01",
    "title": "Uzmanlaşmamış toptan ticaret (bir başka ülkeyle yapılan toptan ticaret hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "46.90.04",
    "title": "Başka ülkeyle yapılan uzmanlaşmamış toptan ticaret",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.11.01",
    "title": "Bakkal ve marketlerde yapılan perakende ticaret (gıda, içecek veya tütün ağırlıklı perakende ticaret)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.11.02",
    "title": "Süpermarket ve hipermarketlerde yapılan perakende ticaret (gıda, içecek veya tütün ağırlıklı perakende ticaret)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.11.03",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla diğer gıda ürünleri (bal, un, tahıl, pirinç, bakliyat vb. dahil) perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.11.04",
    "title": "Seyyar olarak ve motorlu araçlarla gıda ürünleri ve içeceklerin (alkollü içecekler hariç) perakende ticareti"
  },
  {
    "code": "47.11.05",
    "title": "Büfelerde gıda, alkollü ve alkolsüz içecek veya tütün ağırlıklı perakende ticaret",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.11.06",
    "title": "Mağaza, tezgah, pazar yeri dışında yapılan perakende ticaret"
  },
  {
    "code": "47.11.99",
    "title": "Başka yerde sınıflandırılmamış gıda, içecek veya tütün ağırlıklı perakende ticaret (tanzim satış ve gıda tüketim kooperatifleri dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.12.01",
    "title": "Uzmanlaşmamış diğer perakende ticaret (gıda, içecek ve tütün ağırlıklı olmayan)"
  },
  {
    "code": "47.12.02",
    "title": "Seyyar olarak ve motorlu araçlarla diğer malların perakende ticareti"
  },
  {
    "code": "47.12.03",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla bys. diğer malların perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.21.01",
    "title": "Taze sebze ve meyve perakende ticareti (manav ürünleri ile kültür mantarı dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.21.02",
    "title": "İşlenmiş ve korunmuş meyve ve sebzelerin perakende ticareti (turşular ile dondurulmuş, salamura edilmiş, konserve ve kurutulmuş sebze ve meyveler vb. dahil, baklagil, zeytin ve kuru yemiş hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.21.03",
    "title": "Zeytin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.21.04",
    "title": "Kuru bakliyat ürünleri perakende ticareti (fasulye, mercimek, nohut, vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.21.05",
    "title": "Kuru yemiş perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.21.06",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla sebze ve meyve (taze veya işlenmiş) (zeytin dahil) perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.22.02",
    "title": "Et ürünleri perakende ticareti (sosis, salam, sucuk, pastırma vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.22.05",
    "title": "Et perakende ticareti",
    "hazard": "Tehlikeli"
  },
  {
    "code": "47.22.06",
    "title": "Sakatat perakende ticareti",
    "hazard": "Tehlikeli"
  },
  {
    "code": "47.22.07",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla şarküteri ürünleri, süt ve süt ürünleri ile yumurta perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.23.01",
    "title": "Balık, kabuklu hayvanlar ve yumuşakçaların perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.23.02",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla balık ve diğer su ürünleri perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.24.01",
    "title": "Ekmek, pasta ve unlu mamullerin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.24.02",
    "title": "Çikolata ve şekerleme perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.24.03",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla fırın ürünleri perakende ticareti (seyyar satıcılar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.24.04",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla şekerleme perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.25.01",
    "title": "Alkollü ve alkolsüz içeceklerin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.25.03",
    "title": "İçme suyu perakende ticareti (şebeke suyu hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.26.01",
    "title": "Tütün ve tütün ürünleri perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.26.02",
    "title": "Pipo, nargile, sigara ağızlığı, vb. perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.27.01",
    "title": "Süt ve süt ürünleri perakende ticareti (dondurma perakende ticareti hariç)"
  },
  {
    "code": "47.27.02",
    "title": "Dondurma, aromalı yenilebilir buzlar vb. perakende ticareti (pastanelerde verilen hizmetler hariç)"
  },
  {
    "code": "47.27.03",
    "title": "Toz, kesme ve kristal şeker perakende ticareti"
  },
  {
    "code": "47.27.04",
    "title": "Çay, kahve, kakao ve baharat perakende ticareti (bitki çayları dahil)"
  },
  {
    "code": "47.27.05",
    "title": "Katı ve sıvı yağların perakende ticareti (yemeklik yağ dahil)"
  },
  {
    "code": "47.27.06",
    "title": "Hububat, un ve zahire ürünleri perakende ticareti (bulgur, pirinç, mısır, vb.)"
  },
  {
    "code": "47.27.07",
    "title": "Yumurta perakende ticareti"
  },
  {
    "code": "47.27.08",
    "title": "Homojenize gıda müstahzarları ve diyetetik ürünlerin perakende ticareti (glüten içermeyen gıda maddeleri, sodyum içermeyen tuzlar vb. ile besin yönünden zenginleştirilmiş sporcu gıdaları vb.)"
  },
  {
    "code": "47.27.09",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla yenilebilir katı ve sıvı yağ (tereyağı hariç) perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.27.10",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla çay, kahve, kakao, baharat perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.27.99",
    "title": "Başka yerde sınıflandırılmamış diğer gıda ürünlerinin perakende ticareti"
  },
  {
    "code": "47.30.01",
    "title": "Motorlu kara taşıtı ve motosiklet yakıtının perakende ticareti",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "47.30.02",
    "title": "Motorlu kara taşıtları için yağlama ve soğutma ürünlerinin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.40.01",
    "title": "Bilgisayarların, çevre donanımlarının ve yazılımların perakende ticareti"
  },
  {
    "code": "47.40.02",
    "title": "Telekomünikasyon teçhizatının perakende ticareti"
  },
  {
    "code": "47.40.03",
    "title": "Ses ve görüntü cihazlarının ve bunların parçalarının perakende ticareti"
  },
  {
    "code": "47.51.02",
    "title": "Tuhafiye ürünleri perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.51.03",
    "title": "Kumaş perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.51.04",
    "title": "Halı, goblen veya nakış yapımı için temel materyallerin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.51.05",
    "title": "Evde kullanılan tekstil takımları ve çeşitli tekstil malzemesinden ev eşyaları perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.51.06",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla tuhafiye, manifatura ve mefruşat ürünleri perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.51.07",
    "title": "Seyyar olarak ve motorlu araçlarla tekstil, giyim eşyası ve ayakkabı perakende ticareti"
  },
  {
    "code": "47.51.90",
    "title": "Diğer tekstil ürünleri perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.01",
    "title": "Çimento, alçı, harç, kireç, tuğla, kiremit, briket, taş, kum, çakıl vb. inşaat malzemeleri perakende ticareti",
    "hazard": "Tehlikeli"
  },
  {
    "code": "47.52.02",
    "title": "Hırdavat (nalburiye) ve el aletleri perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.03",
    "title": "Boya, vernik, lak, solvent vb. ürünlerin perakende ticareti",
    "hazard": "Tehlikeli"
  },
  {
    "code": "47.52.04",
    "title": "Düz cam perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.05",
    "title": "Metalden kapı, pencere ve bunların kasaları ile kapı eşiklerinin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.06",
    "title": "Sıhhi tesisat ve ısıtma tesisatı malzemesi perakende ticareti (kombiler ve radyatörler hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.09",
    "title": "Plastik kapı, pencere ve bunların kasaları ile kapı eşikleri, panjurlar, jaluziler, storlar ve benzeri eşyaların perakende ticareti (PVC olanlar dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.10",
    "title": "Ağacın ilk işlenmesinden elde edilen ürünlerin perakende ticareti (kereste, ağaç talaşı ve yongası, kontrplak, yonga ve lifli levhalar (mdf, sunta vb.), parke, ahşap varil, fıçı ve diğer muhafazalar, vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "47.52.11",
    "title": "Banyo küveti, lavabo, klozet kapağı, tuvalet taşı ve rezervuarı ile seramikten karo ve fayans vb. sıhhi ürünlerin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.13",
    "title": "Demirden/çelikten bar ve çubukların, profillerin, tüp ve boruların perakende ticareti",
    "hazard": "Tehlikeli"
  },
  {
    "code": "47.52.15",
    "title": "Demirden veya çelikten merkezi ısıtma radyatörleri, merkezi ısıtma kazanları (kombiler dahil) ile bunların parçalarının perakende ticareti (buhar jeneratörleri ve kızgın su üreten kazanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.16",
    "title": "Çim biçme ve bahçe ekipmanları perakende ticareti (kar küreyiciler dahil) (tarımda kullanılan el aletleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.17",
    "title": "Ahşap kapı, pencere ve bunların kasaları ile kapı eşiklerinin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.18",
    "title": "Prefabrik yapılar ve yapı elemanlarının perakende ticareti (metalden, betondan, plastikten, ahşaptan vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "47.52.19",
    "title": "İşlenmiş mermer, traverten, kaymaktaşı (su mermeri) ve bunlardan yapılmış ürünlerin perakende ticareti (levha halinde olanlar ile mermer lavabo vb. sıhhi ürünler dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.20",
    "title": "Alçı ve alçı esaslı bileşenlerden inşaat amaçlı ürünlerin perakende ticareti (kartonpiyer, panel, levha vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.21",
    "title": "Plastikten inşaat amaçlı levhalar, folyolar, şeritler ve borular ile asfalt vb. malzemeden çatı kaplama ürünlerinin perakende ticareti (inşaat için naylon örtü, shingle, mantolama amaçlı strafor vb. dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.22",
    "title": "Masif, lamine ve laminant parke perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.52.23",
    "title": "Yangın söndürücüler ve ekipmanlarının perakende ticareti (arabalar için olanlar ve yüksek basınçlı olanlar hariç)"
  },
  {
    "code": "47.52.24",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla mutfak eşyaları ile banyo ve tuvalette kullanılan eşyaların perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.52.25",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla elektrikli alet, cihaz ve elektrik malzemeleri, el aletleri ile hırdavat perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.52.99",
    "title": "Başka yerde sınıflandırılmamış inşaat malzemesi perakende ticareti"
  },
  {
    "code": "47.53.01",
    "title": "Perde, iç stor, perde veya yatak saçağı ve farbelası perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.53.02",
    "title": "Halı, kilim ve diğer tekstil yer döşemeleri perakende ticareti (keçeden olanlar dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.53.03",
    "title": "Duvar kağıdı, tekstil duvar kaplamaları, kauçuk yer döşemeleri ve paspaslar ile plastik zemin, duvar veya tavan kaplamaları perakende ticareti (linolyum gibi elastiki zemin kaplamaları, marley, vb. dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.53.04",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla halı, kilim, vb. perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.54.01",
    "title": "Beyaz eşya ve elektrikli küçük ev aleti perakende ticareti (radyo, televizyon ve fotoğrafçılık ürünleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.54.03",
    "title": "Evde kullanım amaçlı elektrik tesisat malzemesi perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.54.99",
    "title": "Başka yerde sınıflandırılmamış elektrikli ev aletleri perakende ticareti (radyo, TV ve fotoğrafçılık ürünleri hariç)"
  },
  {
    "code": "47.55.01",
    "title": "Elektriksiz ev aletleri, sofra ve mutfak eşyaları ile züccaciye ürünlerinin perakende ticareti (plastikten olanlar hariç)"
  },
  {
    "code": "47.55.02",
    "title": "Aydınlatma teçhizatı perakende ticareti (elektrik malzemeleri hariç)"
  },
  {
    "code": "47.55.03",
    "title": "Ev mobilyalarının ve aksesuarlarının perakende ticareti (baza, somya, karyola dahil; hasır ve sepetçi söğüdü gibi malzemelerden olanlar hariç)"
  },
  {
    "code": "47.55.04",
    "title": "Ahşap, mantar ve hasır eşyaların perakende ticareti (ahşap sofra ve mutfak eşyaları hariç)"
  },
  {
    "code": "47.55.05",
    "title": "Plastikten sofra, mutfak, tuvalet ve diğer ev eşyalarının perakende ticareti"
  },
  {
    "code": "47.55.06",
    "title": "Büro mobilyaları ve aksesuarlarının perakende ticareti"
  },
  {
    "code": "47.55.07",
    "title": "Bahçe mobilyalarının perakende ticareti"
  },
  {
    "code": "47.55.08",
    "title": "Yatak perakende ticareti"
  },
  {
    "code": "47.55.09",
    "title": "Elektriksiz fırın ve ocaklar ile hava ve su ısıtıcılarının perakende ticareti"
  },
  {
    "code": "47.55.10",
    "title": "Bebek arabaları, pusetleri, bebek yürüteçleri, bebek taşıyıcıları, bebek oto koltukları gibi bebek ekipmanlarının perakende ticareti"
  },
  {
    "code": "47.55.11",
    "title": "Kağıt veya mukavvadan tuvalet kağıdı, kağıt mendil, kağıt havlular, kağıt masa örtüsü ve peçeteler ile kağıt veya mukavvadan tepsi, tabak, kase, bardak ve benzerlerinin perakende ticareti"
  },
  {
    "code": "47.55.12",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla ev ve büro mobilyaları (ağaç, metal, vb.) perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.55.13",
    "title": "Bakır eşya, bakır sofra ve mutfak eşyası perakende ticareti"
  },
  {
    "code": "47.55.99",
    "title": "Başka yerde sınıflandırılmamış diğer ev eşyalarının perakende ticareti"
  },
  {
    "code": "47.61.00",
    "title": "Kitap perakende ticareti"
  },
  {
    "code": "47.62.01",
    "title": "Kırtasiye ürünlerinin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.62.03",
    "title": "Gazete ve dergilerin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.63.02",
    "title": "Motorlu taşıtlar dışındaki eğlence ve spor amaçlı taşıtların perakende ticareti (tekne, yelkenli, kano, kayık, bot, balon,vb. ile deniz taşıtları için dıştan takmalı motorlar dahil)"
  },
  {
    "code": "47.63.03",
    "title": "Kamp malzemeleri perakende ticareti"
  },
  {
    "code": "47.63.04",
    "title": "Bisiklet perakende ticareti"
  },
  {
    "code": "47.63.05",
    "title": "Jimnastik ve atletizm eşya ve ekipmanları ile form tutma merkezlerine ait eşya ve ekipmanların perakende ticareti (halter, yürüme bantları, vb.)"
  },
  {
    "code": "47.63.07",
    "title": "Spor ayakkabısı perakende ticareti (kayak botları dahil)"
  },
  {
    "code": "47.63.08",
    "title": "Avcılık ve balıkçılık teçhizatı ve malzemeleri ile silah ve mühimmat perakende ticareti"
  },
  {
    "code": "47.63.90",
    "title": "Uzmanlaşmış diğer spor malzemelerinin perakende ticareti"
  },
  {
    "code": "47.64.08",
    "title": "Oyunlar ve oyuncakların perakende ticareti"
  },
  {
    "code": "47.64.09",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla imitasyon takı, süs eşyası, oyun, oyuncak, turistik ve hediyelik eşya perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.69.01",
    "title": "Müzik aletleri ve müzik partisyonu (nota kağıdı) perakende ticareti"
  },
  {
    "code": "47.69.02",
    "title": "Müzik ve video kayıtlarının perakende ticareti"
  },
  {
    "code": "47.69.03",
    "title": "Sanat eserlerinin perakende ticareti (antika eşyalar hariç)"
  },
  {
    "code": "47.69.99",
    "title": "Başka yerde sınıflandırılmamış diğer kültür ve eğlence (rekreasyon) ürünlerinin perakende ticareti"
  },
  {
    "code": "47.71.01",
    "title": "Bebek ve çocuk giyim eşyası perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.71.02",
    "title": "Giysi aksesuarları perakende ticareti (eldiven, kravat, şapka, eşarp, şal, mendil, kemer, pantolon askısı, şemsiye, baston, vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.71.03",
    "title": "Kürklü deriden giyim eşyalarının perakende ticareti (işlenmiş kürklü deriler dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.71.04",
    "title": "Diğer dış giyim perakende satışı (palto, kaban, anorak, takım elbise, ceket, pantolon, şort (tekstil kumaşından veya örgü ve tığ işi))",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.71.05",
    "title": "İç giyim ve çorap perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.71.07",
    "title": "Deri veya deri bileşimli giyim eşyası perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.71.08",
    "title": "Süveter, kazak, hırka, yelek ve benzeri eşyaların perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.71.09",
    "title": "İş giysisi perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.71.11",
    "title": "Spor giysisi perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.71.12",
    "title": "Gelinlik perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.71.13",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla iç giyim eşyası, dış giyim eşyası, çorap, giysi aksesuarı ve ayakkabı perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.71.99",
    "title": "Uzmanlaşmış mağazalarda başka yerde sınıflandırılmamış giyim eşyası perakende ticareti (plastikten, vulkanize kauçuktan, kağıttan, dokusuz kumaştan ya da emdirilmiş veya kaplanmış tekstil kumaşından giysiler)"
  },
  {
    "code": "47.72.01",
    "title": "Ayakkabı, terlik vb. perakende ticareti (kavafiye dahil; spor ayakkabıları ile tamamı tekstilden olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.72.02",
    "title": "Bavul, el çantası ve diğer seyahat aksesuarlarının perakende ticareti (deriden, deri bileşimlerinden, plastik levhadan, tekstil malzemesinden, vulkanize (ebonit) elyaf veya mukavvadan)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.72.05",
    "title": "Saraciye ürünleri ve koşum takımı perakende ticareti (eyer, semer, vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.72.06",
    "title": "Ayakkabı parçaları perakende ticareti (deri, ayakkabı sayası, topuk, topuk yastığı, ayakkabı bağları vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.72.90",
    "title": "Deriden veya deri bileşimlerinden diğer ürünlerin perakende ticareti (deri veya deri bileşimli giyim eşyası hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.73.01",
    "title": "Eczacılık ürünlerinin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.73.02",
    "title": "Veterinerlik ürünlerinin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.74.01",
    "title": "Tıbbi ve ortopedik ürünlerin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.74.02",
    "title": "Gözlük, kontak lens, gözlük camı vb. perakende ticareti"
  },
  {
    "code": "47.75.01",
    "title": "Kozmetik ve kişisel bakım malzemelerinin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.75.02",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla kişisel bakım ve kozmetik ürünleri (diş fırçaları, saç fırçaları, elektriksiz tıraş makineleri, jilet, ustura, parfümeri ürünleri ve kolonya, doğal sünger, sabun vb. dahil)\tperakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.76.01",
    "title": "Ev hayvanları, bunların mama ve gıdaları ile eşyalarının perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.76.02",
    "title": "Çiçek, bitki ve tohum perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.76.03",
    "title": "Gübre ve zirai kimyasal ürünlerin perakende ticareti",
    "hazard": "Tehlikeli"
  },
  {
    "code": "47.76.04",
    "title": "Canlı büyükbaş ve küçükbaş hayvanların perakende ticareti (ev hayvanları hariç)"
  },
  {
    "code": "47.76.05",
    "title": "Canlı kümes hayvanlarının perakende ticareti"
  },
  {
    "code": "47.76.06",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla çiçek, bitki ve bitki tohumu (çiçek toprağı ve saksıları dahil) perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.76.07",
    "title": "Tezgahlar ve pazar yerleri vasıtasıyla canlı büyük ve küçükbaş hayvan, canlı kümes hayvanı, ev hayvanı ve yemlerinin perakende ticareti (seyyar satıcılar hariç)"
  },
  {
    "code": "47.77.01",
    "title": "Altın ve diğer değerli metallerden takı, eşya ve mücevherat perakende ticareti (kuyumculuk ürünleri perakende ticareti dahil, gümüşten olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.77.02",
    "title": "Gümüş takı, eşya ve mücevherat perakende ticareti (gümüşçü ürünleri perakende ticareti)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.77.03",
    "title": "Saat (kol, masa, duvar vb. saatler ile kronometreler) perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.77.05",
    "title": "Doğal inciden veya kültür incisinden ürünler ile değerli ya da yarı değerli taşlardan yapılan ürünlerin perakende ticareti (pırlanta, yakut, zümrüt, safir vb.den yapılan ürünler)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.78.02",
    "title": "Kömür ve yakacak odun perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.78.04",
    "title": "Hediyelik eşyaların, el işi ürünlerin ve imitasyon takıların perakende ticareti (sanat eserleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.78.07",
    "title": "Optik ve hassas aletlerin perakende ticareti (mikroskop, dürbün ve pusula dahil; gözlük camı, fotoğrafik ürünler hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.78.08",
    "title": "Büro makine ve ekipmanlarının perakende ticareti (hesaplama makineleri, daktilolar, fotokopi makineleri, tarama ve faks cihazları, çizim masaları vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.78.09",
    "title": "Evlerde kullanılan fuel oil perakende ticareti",
    "hazard": "Tehlikeli"
  },
  {
    "code": "47.78.10",
    "title": "Evlerde kullanılan tüpgaz perakende ticareti",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "47.78.15",
    "title": "Temizlik malzemesi perakende ticareti (Arap sabunu, deterjan, yumuşatıcılar, şampuanlar vb. dahil; kişisel hijyen için olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.78.16",
    "title": "Yün, tiftik vb. perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.78.22",
    "title": "Fotoğrafçılık malzemeleri ve aletlerinin perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.78.26",
    "title": "Yapma çiçek, yaprak ve meyveler ile mum perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.78.30",
    "title": "Tekstilden çuval, torba, vb. perakende ticareti (eşya paketleme amacıyla kullanılanlar)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.78.31",
    "title": "Mağaza, tezgah, pazar yeri dışında müşterinin istediği yere ulaştırılarak yapılan doğrudan yakıt satışı (kalorifer yakıtı, yakacak odun, vb.)"
  },
  {
    "code": "47.78.99",
    "title": "Başka yerde sınıflandırılmamış diğer yeni malların perakende ticareti"
  },
  {
    "code": "47.79.01",
    "title": "Antika perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.79.03",
    "title": "İkinci el kitapların perakende ticareti (sahafların faaliyetleri)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.79.04",
    "title": "Kullanılmış mobilya, elektrikli ve elektronik ev eşyası perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.79.06",
    "title": "Kullanılmış giysiler ve aksesuarlarının perakende ticareti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.79.90",
    "title": "Diğer ikinci el eşya perakende ticareti (ikinci el motorlu kara taşıtları ve motosiklet parçaları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.81.14",
    "title": "Otomobillerin ve hafif motorlu kara taşıtlarının perakende ticareti (elektrikli olanlar ile ambulans ve minibüs benzeri motorlu yolcu taşıtları dahil)"
  },
  {
    "code": "47.81.90",
    "title": "Diğer motorlu kara taşıtlarının perakende ticareti (kamyonlar, çekiciler, römorklar, yarı römorklar, kamp araçları vb., elektrikli olanlar dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.82.04",
    "title": "Motorlu kara taşıtı lastiklerinin ve jantlarının perakende ticareti (motosiklet parça ve aksesuarları hariç)"
  },
  {
    "code": "47.82.05",
    "title": "Motorlu kara taşıtı camlarının perakende ticareti (motosiklet parça ve aksesuarları hariç)"
  },
  {
    "code": "47.82.06",
    "title": "Motorlu kara taşıtlarının ikinci el (kullanılmış) parçalarının perakende ticareti (motosiklet parça ve aksesuarları hariç)"
  },
  {
    "code": "47.82.07",
    "title": "Motorlu kara taşıtlarının aksesuarlarının perakende ticareti (motosiklet parça ve aksesuarları hariç)"
  },
  {
    "code": "47.82.08",
    "title": "Motorlu kara taşıtlarının akülerinin perakende ticareti"
  },
  {
    "code": "47.82.90",
    "title": "Motorlu kara taşıtlarının diğer parça ve aksesuarlarının perakende ticareti"
  },
  {
    "code": "47.83.01",
    "title": "Motosikletler ve motorlu bisikletlerin perakende ticareti"
  },
  {
    "code": "47.83.02",
    "title": "Motosikletler ve motorlu bisikletlerin parça ve aksesuarlarının perakende ticareti"
  },
  {
    "code": "47.91.14",
    "title": "Radyo, TV, posta yoluyla veya internet üzerinden yapılan perakende ticaret",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "47.91.15",
    "title": "Uzmanlaşmamış perakende ticaret için aracılık hizmeti faaliyetleri"
  },
  {
    "code": "47.92.00",
    "title": "Uzmanlaşmış perakende ticaret için aracılık hizmeti faaliyetleri"
  },
  {
    "code": "49.11.00",
    "title": "Demir yolu ile şehirler arası yolcu taşımacılığı"
  },
  {
    "code": "49.12.00",
    "title": "Diğer demir yolu ile yolcu taşımacılığı (gezi amaçlı taşımacılık dahil)"
  },
  {
    "code": "49.20.01",
    "title": "Demir yolu ile yük taşımacılığı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "49.31.04",
    "title": "Halk otobüsü/otobüs ile yapılan şehir içi ve banliyö yolcu taşımacılığı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "49.31.05",
    "title": "Belediye otobüsü ile yapılan şehir içi ve banliyö yolcu taşımacılığı (belediyenin sağladığı havaalanı otobüsü dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "49.31.06",
    "title": "Minibüs ve dolmuş ile yapılan şehir içi ve banliyö yolcu taşımacılığı (belirlenmiş güzergahlarda)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "49.31.07",
    "title": "Kara yolu (otobüs, vb.) ile uluslararası yolcu taşımacılığı"
  },
  {
    "code": "49.31.08",
    "title": "Şehirler arası tarifeli kara yolu yolcu taşımacılığı"
  },
  {
    "code": "49.31.09",
    "title": "Şehir içi, banliyö ve kırsal alanlarda kara yolu ile personel, öğrenci, vb. grup taşımacılığı (şehir içi personel ve okul servisleri, vb.)"
  },
  {
    "code": "49.31.10",
    "title": "Kara yolu şehir içi ve şehirler arası havaalanı servisleri ile yolcu taşımacılığı"
  },
  {
    "code": "49.31.90",
    "title": "Kara yoluyla tarifeli diğer yolcu taşımacılığı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "49.32.04",
    "title": "Kara yoluyla tarifesiz yolcu taşımacılığı"
  },
  {
    "code": "49.33.01",
    "title": "Taksi ile yolcu taşımacılığı"
  },
  {
    "code": "49.33.02",
    "title": "Sürücüsü ile birlikte diğer özel araç kiralama faaliyeti"
  },
  {
    "code": "49.34.00",
    "title": "Teleferik ve telesiyejlerle yolcu taşımacılığı"
  },
  {
    "code": "49.39.00",
    "title": "Başka yerde sınıflandırılmamış kara taşımacılığı ile yapılan diğer yolcu taşımacılığı"
  },
  {
    "code": "49.41.01",
    "title": "Kara yolu ile şehir içi yük taşımacılığı (gıda, sıvı, kuru yük vb.) (gaz ve petrol ürünleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "49.41.02",
    "title": "Kara yolu ile şehirler arası yük taşımacılığı (gıda, sıvı, kuru yük, vb.) (gaz ve petrol ürünleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "49.41.03",
    "title": "Kara yolu ile uluslararası yük taşımacılığı (gıda, sıvı, kuru yük, vb.) (gaz ve petrol ürünleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "49.41.05",
    "title": "Kara yolu ile canlı hayvan taşımacılığı (çiftlik hayvanları, kümes hayvanları, vahşi hayvanlar vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "49.41.06",
    "title": "Sürücüsü ile birlikte kamyon, beton mikseri ve diğer motorlu yük taşıma araçlarının kiralanması",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "49.41.08",
    "title": "Kara yolu ile şehir içi yük taşımacılığı (gaz ve petrol ürünleri, kimyasal ürünler vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "49.41.09",
    "title": "Kara yolu ile şehirler arası yük taşımacılığı (gaz ve petrol ürünleri, kimyasal ürünler vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "49.41.10",
    "title": "Kara yolu ile uluslararası yük taşımacılığı (gaz ve petrol ürünleri, kimyasal ürünler vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "49.41.11",
    "title": "Kara yolu ile çeşitli taşıma türüne uygun konteyner taşımacılığı"
  },
  {
    "code": "49.41.90",
    "title": "Kara yolu ile diğer yük taşımacılığı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "49.42.01",
    "title": "Ev ve iş yerlerine verilen taşımacılık hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "49.50.01",
    "title": "Boru hattı ile ham petrol, rafine petrol ve petrol ürünleri taşımacılığı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "49.50.03",
    "title": "Boru hattı pompa istasyonlarını işletme hizmetleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "49.50.04",
    "title": "Boru hattı ile doğal gaz taşımacılığı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "49.50.90",
    "title": "Boru hattı ile diğer malların taşımacılığı (kömür çamuru, kimyasal ürünler, vb, boru hattı pompa istasyonlarını işletme hizmetleri dahil)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "50.10.12",
    "title": "Deniz ve kıyı sularında yolcu gemilerinin ve teknelerinin mürettebatıyla birlikte kiralanması (gezinti tekneleri dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.10.13",
    "title": "Kıyı sularında yolcuların feribotlarla, kruvaziyer gemilerle ve teknelerle taşınması (deniz otobüsleri işletmeciliği dahil; uluslararası denizler ile göl ve nehirlerde yapılanlar hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.10.14",
    "title": "Deniz ve kıyı sularında yat işletmeciliği",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "50.10.15",
    "title": "Deniz ve kıyı sularında gezi veya tur bot ve teknelerinin işletilmesi (yat işletmeciliği hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.10.16",
    "title": "Uluslararası denizlerde yolcuların gemilerle taşınması",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.10.90",
    "title": "Deniz ve kıyı sularında diğer yolcu taşımacılığı (deniz taksi vb. dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.20.17",
    "title": "Uluslararası sularda ham petrolün, petrol ürünlerinin ve kimyasalların tanker gemilerle taşınması (gazlar hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "50.20.18",
    "title": "Uluslararası sularda dökme kuru yük taşınması (kimyasalların taşınması hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.20.19",
    "title": "Uluslararası sularda ve kabotaj hattında çekme ve itme hizmetleri (römorkaj) (mavnaların, petrol kulelerinin vb.nin taşınması) (iç sular hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.20.20",
    "title": "Uluslararası sularda frigorifik gemilerle dondurulmuş veya soğutulmuş malların taşınması",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.20.21",
    "title": "Uluslararası sularda çoklu taşıma türüne uygun konteynerlerin konteyner gemileriyle taşınması",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.20.22",
    "title": "Uluslararası sularda ve kabotaj hattında yük taşımacılığı gemilerinin mürettebatıyla birlikte kiralanması (iç sular hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.20.23",
    "title": "Uluslararası sularda diğer dökme sıvıların tanker gemilerle taşınması (ham petrolün, petrol ürünlerinin, gazların ve kimyasalların taşınması hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.20.24",
    "title": "Uluslararası sularda gazların tanker gemilerle taşınması",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "50.20.25",
    "title": "Kabotaj hattında ham petrolün, petrol ürünlerinin ve kimyasalların tanker gemilerle taşınması (gazlar hariç) (iç sular hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "50.20.26",
    "title": "Kabotaj hattında dökme kuru yük taşınması (kimyasalların taşınması hariç) (iç sular hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.20.27",
    "title": "Kabotaj hattında frigorifik gemilerle dondurulmuş veya soğutulmuş malların taşınması (iç sular hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.20.28",
    "title": "Kabotaj hattında çoklu taşıma türüne uygun konteynerlerin konteyner gemileriyle taşınması (iç sular hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.20.29",
    "title": "Kabotaj hattında diğer sıvıların tanker gemilerle taşınması (ham petrolün, petrol ürünlerinin, gazların ve kimyasalların taşınması hariç) (iç sular hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.20.30",
    "title": "Kabotaj hattında gazların tanker gemilerle taşınması (iç sular hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "50.20.90",
    "title": "Uluslararası sularda yapılan diğer yük taşımacılığı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.20.91",
    "title": "Kabotaj hattında yapılan diğer yük taşımacılığı (iç sular hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.30.08",
    "title": "İç sularda yolcu taşımacılığı (nehir, kanal ve göllerde yapılanlar, vb.) (gezinti amaçlı olanlar dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.30.09",
    "title": "İç sularda yolcu taşıma gemilerinin ve teknelerinin mürettebatıyla birlikte kiralanması",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.40.05",
    "title": "İç sularda yük taşımacılığı (nehir, kanal ve göllerde yapılanlar, vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.40.07",
    "title": "İç sularda yük taşıma gemi ve teknelerinin mürettebatıyla birlikte kiralanması hizmetleri (nehir, kanal ve göllerde, vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "50.40.08",
    "title": "İç sularda çekme ve itme hizmetleri (römorkaj) (mavnaların, şamandıraların vb.nin taşınması) (nehir, kanal, göl vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "51.10.01",
    "title": "Hava yolu yolcu taşımacılığı (tarifeli olanlar)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "51.10.02",
    "title": "Hava yolu yolcu taşımacılığı (turistik ve gezi amaçlı olanlar ile tarifesiz olanlar) (hava taksi taşımacılığı dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "51.10.03",
    "title": "Hava yolu yolcu taşıma araçlarının mürettebatıyla birlikte kiralanması",
    "hazard": "Tehlikeli"
  },
  {
    "code": "51.21.17",
    "title": "Hava yolu ile yük taşımacılığı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "51.22.02",
    "title": "Uzay taşımacılığı",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "52.10.02",
    "title": "Frigorifik depolama ve antrepoculuk faaliyetleri (bozulabilir gıda ürünleri dahil dondurulmuş veya soğutulmuş mallar için depolama)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.10.03",
    "title": "Hububat depolama ve antrepoculuk faaliyetleri (hububat silolarının işletilmesi vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.10.04",
    "title": "Petrol, petrol ürünleri, kimyasallar vb. depolama ve antrepoculuk faaliyetleri(gaz hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "52.10.05",
    "title": "Dökme sıvı depolama ve antrepoculuk faaliyetleri (yağ, şarap vb. dahil; petrol, petrol ürünleri, kimyasallar, gaz vb. hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.10.90",
    "title": "Diğer depolama ve antrepoculuk faaliyetleri (frigorifik depolar ile hububat, kimyasallar, dökme sıvı ve gaz depolama faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.21.04",
    "title": "Kara yolu taşımacılığı ile ilgili özel ve ticari araçlar için çekme ve yol yardımı faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.21.05",
    "title": "Demir yolu taşımacılığını destekleyici faaliyetler (demir yolu çekme ve itme hizmetleri, manevra ve makas değiştirme hizmetleri, demir yolu terminal hizmetleri vb. dahil, emanetçilik hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "52.21.06",
    "title": "Kara taşımacılığına yönelik emanet büroları işletmeciliği (demir yollarında yapılanlar dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "52.21.07",
    "title": "Otopark ve garaj işletmeciliği (bisiklet parkları ve karavanların kışın saklanması dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "52.21.08",
    "title": "Otoyol, tünel ve köprü işletmeciliği",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "52.21.09",
    "title": "Kara yolu yolcu taşımacılığına yönelik otobüs terminal hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "52.21.10",
    "title": "Kara yolu yolcu taşımacılığına yönelik otobüs, minibüs ve taksi duraklarının işletilmesi (otobüs terminal hizmetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "52.21.12",
    "title": "Kara taşımacılığını destekleyici olarak gazların sıvılaştırılması",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "52.21.13",
    "title": "Yolcu taşımacılığı kooperatiflerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "52.21.90",
    "title": "Kara taşımacılığını destekleyici diğer hizmetler (kamyon terminal işletmeciliği dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "52.22.06",
    "title": "Su yolu taşımacılığını destekleyici olarak liman ve su yollarının işletilmesi (limanların, iskelelerin, rıhtımların, su yolu havuzlarının, deniz terminallerinin vb. işletilmesi) (deniz feneri, fener dubası vb. işletilmesi hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.22.07",
    "title": "Su yolu taşımacılığını destekleyici olarak deniz feneri, fener dubası, fener gemisi, şamandıra, kanal işaretleri vb. seyir yardımcıları ile verilen hizmet faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "52.22.08",
    "title": "Deniz ve kıyı suları ile iç sularda kılavuzluk ve rıhtıma yanaştırma faaliyetleri (geminin havuzlanması ve havuzdan çıkarılması dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.22.10",
    "title": "Deniz ve kıyı suları ile iç sularda gemi kurtarma ve tekrar yüzdürme faaliyetleri (zor durumdaki gemilerin çekilmesi, bu gemilerin ve kargolarının kurtarılması vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.22.90",
    "title": "Su taşımacılığını destekleyici diğer hizmetler",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.23.03",
    "title": "Havaalanı yer hizmet faaliyetleri (kargo ve bagaj yükleme boşaltma hizmetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.23.04",
    "title": "Havaalanı işletmeciliği (uçak pisti işletme, yolcu terminali ve havayolu şirketlerinin kendi bilet satış hizmetleri dahil; havaalanı yer hizmetleri ve bilet acentelerinin faaliyetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "52.23.06",
    "title": "Hava trafik kontrol hizmetleri (havaalanında yer alan kule ve radar istasyonları tarafından sağlanan hizmetler dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.23.07",
    "title": "Uzay taşımacılığını destekleyici hizmetler",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "52.23.90",
    "title": "Hava taşımacılığını destekleyici diğer faaliyetler (havaalanlarında yangın söndürme ve yangın önleme faaliyetleri, hava taşıtlarının çekilmesi, vb.)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "52.24.08",
    "title": "Su yolu taşımacılığıyla ilgili kargo ve bagaj yükleme boşaltma (elleçleme) hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.24.09",
    "title": "Hava yolu taşımacılığıyla ilgili kargo ve bagaj yükleme boşaltma (elleçleme) hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.24.10",
    "title": "Kara yolu taşımacılığıyla ilgili kargo yükleme boşaltma (elleçleme) hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.24.11",
    "title": "Demir yolu taşımacılığıyla ilgili kargo yükleme boşaltma (elleçleme) hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "52.24.90",
    "title": "Diğer kargo yükleme boşaltma (elleçleme) hizmetleri"
  },
  {
    "code": "52.25.01",
    "title": "Taşınan malların kasalardan, sandıklardan vb.lerinden çıkarılması, numune alınması, incelenmesi vb. faaliyetler"
  },
  {
    "code": "52.25.99",
    "title": "Başke yerde sınıflandırılmamış taşımacılığı destekleyici diğer faaliyetler (grup sevkiyatının organizasyonu, malların taşınması sırasında korunması için geçici olarak kasalara vb. yerleştirilmesi, yüklerin birleştirilmesi, gruplanması ve parçalara ayırılması, vb. dahil)"
  },
  {
    "code": "52.26.01",
    "title": "Uluslararası deniz yolu yük nakliyat acentelerinin faaliyetleri"
  },
  {
    "code": "52.26.02",
    "title": "Kabotaj hattı deniz yolu yük nakliyat acentelerinin faaliyetleri"
  },
  {
    "code": "52.26.03",
    "title": "Kara yolu yük nakliyat acentelerinin faaliyetleri"
  },
  {
    "code": "52.26.04",
    "title": "Hava yolu yük nakliyat acentelerinin faaliyetleri"
  },
  {
    "code": "52.26.05",
    "title": "Demir yolu yük nakliyat acentelerinin faaliyetleri"
  },
  {
    "code": "52.26.06",
    "title": "Yük taşımacılığı kooperatiflerinin faaliyetleri"
  },
  {
    "code": "52.26.07",
    "title": "Yetkili gümrük müşavirliği veya gümrük müşavirliği"
  },
  {
    "code": "52.26.08",
    "title": "Gümrük komisyoncularının faaliyetleri"
  },
  {
    "code": "52.26.09",
    "title": "Taşıma belgelerinin ve irsaliyelerin düzenlenmesi ve tedarik edilmesi"
  },
  {
    "code": "52.26.99",
    "title": "Başka yerde sınıflandırılmamış taşımacılığa yönelik diğer destekleyici faaliyetler"
  },
  {
    "code": "52.31.01",
    "title": "Deniz yolu yük nakliyat komisyoncuları ve brokerlerinin faaliyetleri"
  },
  {
    "code": "52.31.02",
    "title": "Kara yolu yük nakliyat komisyoncularının faaliyetleri"
  },
  {
    "code": "52.31.03",
    "title": "Hava yolu yük nakliyat komisyoncularının faaliyetleri"
  },
  {
    "code": "52.31.04",
    "title": "Demir yolu yük nakliyat komisyoncularının faaliyetleri"
  },
  {
    "code": "52.32.00",
    "title": "Yolcu taşımacılığına yönelik aracılık hizmeti faaliyetleri"
  },
  {
    "code": "53.10.01",
    "title": "Evrensel hizmet yükümlülüğü altında postacılık faaliyetleri (kargo ve kurye şirketlerinin faaliyetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "53.20.08",
    "title": "Gıda dağıtım faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "53.20.09",
    "title": "Kurye faaliyetleri (kara, deniz ve hava yolu ile yapılanlar dahil; evrensel hizmet yükümlülüğü altında postacılık ile gıda dağıtım faaliyetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "53.20.10",
    "title": "Paket ve koli gibi kargoların toplanması, sınıflandırılması, taşınması ve dağıtımı faaliyetleri (dökme yükler ve evrensel hizmet yükümlülüğü altında postacılık faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "53.30.00",
    "title": "Posta ve kurye faaliyetlerine yönelik aracılık hizmeti faaliyetleri"
  },
  {
    "code": "55.10.02",
    "title": "Otel vb. konaklama yerlerinin faaliyetleri (günlük temizlik ve yatak yapma hizmeti sağlanan yerlerin faaliyetleri) (kendi müşterilerine restoran hizmeti vermeyenler ile devre mülkler hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "55.10.05",
    "title": "Otel vb. konaklama yerlerinin faaliyetleri (günlük temizlik ve yatak yapma hizmeti sağlanan yerlerin faaliyetleri) (kendi müşterilerine restoran hizmeti verenler ile devre mülkler hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "55.20.01",
    "title": "Tatil ve diğer kısa süreli konaklama faaliyetleri (günlük temizlik ve yatak yapma hizmeti sağlanan oda veya süit konaklama faaliyetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "55.20.03",
    "title": "Kendine ait veya kiralanmış mobilyalı evlerde bir aydan daha kısa süreli olarak konaklama faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "55.20.04",
    "title": "Tatil amaçlı pansiyonların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "55.30.36",
    "title": "Kamp alanları ve karavan parkları",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "55.40.00",
    "title": "Konaklama için aracılık hizmeti faaliyetleri"
  },
  {
    "code": "55.90.01",
    "title": "Öğrenci ve işçi yurtları, pansiyonlar ve odası kiralanan evlerde yapılan konaklama faaliyetleri (tatil amaçlı olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "55.90.02",
    "title": "Misafirhaneler, ordu evi, polis evi ve öğretmen evleri ile eğitim ve dinlenme tesisleri gibi konaklama yerlerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "55.90.04",
    "title": "Evlerde ve mobilyalı veya mobilyasız dairelerde veya apartmanlarda bir yıldan daha kısa bir süre için konaklama hizmeti sağlanması faaliyetleri"
  },
  {
    "code": "55.90.90",
    "title": "Diğer konaklama yerlerinin faaliyetleri (başka bir birim tarafından işletildiğinde yataklı vagonlar vb. dahil; misafirhaneler, öğretmen evi vb. hariç)"
  },
  {
    "code": "56.11.01",
    "title": "Genel lokanta ve restoranların (içkili ve içkisiz) faaliyetleri"
  },
  {
    "code": "56.11.02",
    "title": "Çorbacıların ve işkembecilerin faaliyetleri (imalatçıların faaliyetleri ile seyyar olanlar hariç)"
  },
  {
    "code": "56.11.03",
    "title": "Döner, ciğer, kokoreç, köfte ve kebapçıların faaliyeti (garson servisi sunanlar ile self servis sunanlar dahil; imalatçıların ve al götür tesislerin faaliyetleri ile seyyar olanlar hariç)"
  },
  {
    "code": "56.11.04",
    "title": "Oturacak yeri olmayan içli pide ve lahmacun fırınlarının faaliyetleri (al götür tesisi olarak hizmet verenler)"
  },
  {
    "code": "56.11.05",
    "title": "Pizzacıların faaliyeti (garson servisi sunanlar ile self servis sunanlar dahil; imalatçıların ve al götür tesislerin faaliyetleri ile seyyar olanlar hariç)"
  },
  {
    "code": "56.11.06",
    "title": "Mantıcı ve gözlemecilerin faaliyeti (garson servisi sunanlar ile self servis sunanlar dahil; imalatçıların ve al götür tesislerinin faaliyetleri ile seyyar olanlar hariç)"
  },
  {
    "code": "56.11.07",
    "title": "Börekçilerin faaliyetleri (imalatçıların faaliyetleri ile seyyar olanlar hariç)"
  },
  {
    "code": "56.11.08",
    "title": "Pastanelerin ve tatlıcıların (sütlü, şerbetli vb.) faaliyeti (garson servisi sunanlar ile self servis sunanlar dahil; imalatçıların ve al götür tesislerin faaliyetleri ile seyyar olanlar hariç)"
  },
  {
    "code": "56.11.09",
    "title": "Yiyecek ağırlıklı hizmet veren kafe ve kafeteryaların faaliyetleri"
  },
  {
    "code": "56.11.10",
    "title": "Dondurmacıların faaliyetleri (imalatçıların faaliyetleri ile seyyar olanlar hariç)"
  },
  {
    "code": "56.11.11",
    "title": "Oturacak yeri olan fast-food (hamburger, sandviç, tost vb.) satış yerleri (büfeler dahil) tarafından sağlanan yemek hazırlama ve sunum faaliyetleri"
  },
  {
    "code": "56.11.12",
    "title": "Oturacak yeri olmayan fast-food (hamburger, sandviç, tost vb.) satış yerleri (büfeler dahil), al götür tesisleri (içli pide ve lahmacun fırınları hariç) ve benzerleri tarafından sağlanan diğer yemek hazırlama ve sunum faaliyetleri"
  },
  {
    "code": "56.11.13",
    "title": "Lahmacun ve pidecilik (içli pide (kıymalı, peynirli vb.)) faaliyeti (garson servisi sunanlar ile self servis sunanlar dahil; imalatçıların ve al götür tesislerin faaliyetleri ile seyyar olanlar hariç)"
  },
  {
    "code": "56.11.90",
    "title": "Diğer lokantaların faaliyetleri"
  },
  {
    "code": "56.12.00",
    "title": "Seyyar yemek hizmeti faaliyetleri"
  },
  {
    "code": "56.21.01",
    "title": "Özel günlerde dışarıya yemek hizmeti sunan işletmelerin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "56.22.01",
    "title": "Kantinlerin faaliyetleri"
  },
  {
    "code": "56.22.02",
    "title": "Hava yolu şirketleri ve diğer ulaştırma şirketleri için sözleşmeye bağlı düzenlemelere dayalı olarak yiyecek hazırlanması ve temini hizmetleri"
  },
  {
    "code": "56.22.90",
    "title": "Dışarıya yemek sunan diğer işletmelerin faaliyetleri (spor, fabrika, işyeri, üniversite vb. mensupları için tabldot servisi vb. dahil; özel günlerde hizmet verenler hariç)"
  },
  {
    "code": "56.30.02",
    "title": "Çay ocakları, kıraathaneler, kahvehaneler, kafeler (içecek ağırlıklı hizmet veren), meyve suyu salonları ve çay bahçelerinde içecek sunum faaliyeti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "56.30.03",
    "title": "Lokallerde içecek sunum faaliyeti (alkollü-alkolsüz)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "56.30.04",
    "title": "Bar, meyhane ve birahanelerde içecek sunum faaliyetleri (alkollü-alkolsüz)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "56.30.05",
    "title": "Gazino, gece kulübü, taverna, diskotek, kokteyl salonları, vb. yerlerde içecek sunum faaliyetleri (alkollü-alkolsüz)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "56.30.08",
    "title": "Boza, şalgam ve salep sunum faaliyeti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "56.30.90",
    "title": "Seyyar içecek satanlar ile diğer içecek sunum faaliyetleri (Trenlerde ve gemilerde işletilen barların faaliyetleri (alkollü-alkolsüz) dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "56.40.00",
    "title": "Yiyecek ve içecek hizmetleri faaliyetleri için aracılık hizmeti faaliyetleri"
  },
  {
    "code": "58.11.01",
    "title": "Kitap yayımı (broşür, risale, ansiklopedi vb. dahil; çocuk kitaplarının, ders kitaplarının ve yardımcı ders kitaplarının yayımlanması hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "58.11.03",
    "title": "Çocuk kitaplarının yayımlanması",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "58.11.04",
    "title": "Ders kitaplarının ve yardımcı ders kitaplarının yayımlanması (sözlük, atlas, grafikler, haritalar vb. dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "58.12.00",
    "title": "Gazetelerin yayımlanması (haftada en az dört kez yayımlananlar) (reklam gazeteleri dahil)"
  },
  {
    "code": "58.13.02",
    "title": "Eğitime destek amaçlı dergi ve süreli yayınların yayımlanması (haftada dörtten az yayımlananlar)"
  },
  {
    "code": "58.13.03",
    "title": "Bilimsel, teknik, kültürel vb. dergi ve süreli yayınların yayımlanması (haftada dörtten az yayımlananlar)"
  },
  {
    "code": "58.13.90",
    "title": "Diğer dergi ve süreli yayınların yayımlanması (haftada dörtten az yayımlananlar) (çizgi roman, magazin dergileri vb.)"
  },
  {
    "code": "58.19.04",
    "title": "Değerli kağıtların yayımlanması faaliyetleri (pul, tahvil, hisse senedi, bono veya senet vb. değerli kağıtlar)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "58.19.99",
    "title": "Başka yerde sınıflandırılmamış diğer yayımcılık faaliyetleri (fotoğraf, kartpostal, tebrik kartları vb. ile katalog, poster, reklam materyali vb.)"
  },
  {
    "code": "58.21.01",
    "title": "Video oyunlarının yayımlanması",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "58.29.01",
    "title": "Diğer yazılım programlarının yayımlanması",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "59.11.04",
    "title": "Sinema ve reklam filmlerinin, videoların veya animasyonlu görsel-işitsel ve televizyon programları öğelerinin yapım faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "59.11.05",
    "title": "Video içerikleri video blog ,video podcast'lerin yapımı (fenomenler (influencerlar) ve vloggerlar tarafından yapılanlar)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "59.12.01",
    "title": "Sinema filmi, video ve televizyon programları çekim sonrası faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "59.13.02",
    "title": "Sinema filmi ve video dağıtım faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "59.14.02",
    "title": "Sinema filmi gösterim faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "59.20.01",
    "title": "Müzik yayıncılığı faaliyetleri (basılı müzik notaları, elektronik formdaki müzikal besteler, müzikal ses diskleri, indirilebilir müzikler vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "59.20.02",
    "title": "Ses kayıt ve canlı kayıt faaliyetleri (seslerin, sözlerin ve müziğin ses kayıt stüdyosunun özel teknik ekipmanları kullanılarak kaydedilmesi ile konferans, seminer, konser vb. canlı etkinliklerde yapılan kayıt hizmetleri vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "59.20.03",
    "title": "Orijinal ses kayıtlarını kullanım hakkı için lisanslama faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "59.20.06",
    "title": "Radyo programı yapımcılık faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "60.10.09",
    "title": "Radyo yayıncılığı ve ses dağıtım faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "60.20.00",
    "title": "Televizyon programcılığı, yayıncılığı ve video dağıtım faaliyetleri"
  },
  {
    "code": "60.31.00",
    "title": "Haber ajanslarının faaliyetleri"
  },
  {
    "code": "60.39.01",
    "title": "Kullanıcılar tarafından üretilen ve düzenlenen içeriği yayınlayan ve editoryal sorumluluk ve kontrol altında olmayan wiki siteleri, sosyal ağ/sosyal medya siteleri gibi içerik paylaşım sitelerinin dağıtım hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "60.39.09",
    "title": "Diğer içerik dağıtım faaliyetleri"
  },
  {
    "code": "61.10.03",
    "title": "Kablosuz ağlar üzerinden internet erişiminin sağlanması"
  },
  {
    "code": "61.10.04",
    "title": "Kablosuz telekomünikasyon faaliyetleri (kablosuz ağlar üzerinden internet erişiminin sağlanması ve uydu üzerinden yapılanlar hariç)"
  },
  {
    "code": "61.10.05",
    "title": "Uydu üzerinden telekomünikasyon faaliyetleri"
  },
  {
    "code": "61.10.15",
    "title": "Kablolu telekomünikasyon faaliyetleri (kablolu ağlar üzerinden internet erişiminin sağlanması hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "61.10.17",
    "title": "Kablolu ağlar üzerinden internet erişiminin sağlanması",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "61.20.04",
    "title": "Telekomünikasyon ürünlerinin yeniden satışı ve telekomünikasyon için aracılık hizmeti faaliyetleri"
  },
  {
    "code": "61.90.04",
    "title": "Telekomünikasyon uygulamalarına yönelik radar istasyonlarının işletilmesi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "61.90.05",
    "title": "İnternet kafelerin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "61.90.99",
    "title": "Başka yerde sınıflandırılmamış diğer telekomünikasyon faaliyetleri"
  },
  {
    "code": "62.10.00",
    "title": "Bilgisayar programlama faaliyetleri (sistem, veri tabanı, network, web sayfası vb. yazılımları ile müşteriye özel yazılımların kodlanması, masaüstü ya da mobil cihazlar için uygulama geliştirme, vb)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "62.20.00",
    "title": "Bilgisayar danışmanlığı ve bilgisayar birimleri (sistemleri) yönetimi faaliyetleri (siber güvenlik danışmanlığı dahil)"
  },
  {
    "code": "62.90.01",
    "title": "Bilgisayarları felaketten kurtarma ve veri kurtarma faaliyetleri"
  },
  {
    "code": "62.90.99",
    "title": "Başka yerde sınıflandırılmamış diğer bilgi teknolojisi ve bilgisayar hizmet faaliyetleri"
  },
  {
    "code": "63.10.00",
    "title": "Bilgi işlem altyapısı, veri işleme, barındırma ve ilgili faaliyetler"
  },
  {
    "code": "63.91.02",
    "title": "Web arama portalı faaliyetleri"
  },
  {
    "code": "63.92.00",
    "title": "Diğer bilgi hizmeti faaliyetleri"
  },
  {
    "code": "64.11.06",
    "title": "Merkez bankası faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "64.19.01",
    "title": "Bankaların faaliyetleri (katılım bankaları, mevduat bankaları, kredi birlikleri vb. dahil, merkez bankası ve yatırım bankaları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "64.19.02",
    "title": "Esnaf ve sanatkarlar kredi kefalet kooperatiflerinin kredi aracılık faaliyetleri ile kredi garanti fonunun faaliyetleri"
  },
  {
    "code": "64.21.00",
    "title": "Holding şirketlerinin faaliyetleri"
  },
  {
    "code": "64.22.00",
    "title": "Finansman tedarik şirketlerinin faaliyetleri"
  },
  {
    "code": "64.31.00",
    "title": "Para piyasası ve para piyasası dışı yatırım fonlarının faaliyetleri"
  },
  {
    "code": "64.32.00",
    "title": "Servet yönetim şirketleri (trustlar), emlak ve acente hesaplarının faaliyetleri"
  },
  {
    "code": "64.91.01",
    "title": "Finansal kiralama",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "64.92.01",
    "title": "Faktori̇ng ve tedarik zinciri̇ finansmanı faaliyetleri̇",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "64.92.04",
    "title": "Tarım kredi kooperatiflerinin kredi verme faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "64.92.08",
    "title": "Tüketici finansman şirketlerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "64.92.90",
    "title": "Diğer kredi verme faaliyetleri (bankacılık sistemi dışında borç para verilmesi, uluslararası ticari finansman, mevduat kabul etmeyen uzmanlaşmış kuruluşlarca konut kredisi verilmesi, rehin karşılığında borç para verilmesi vb.)"
  },
  {
    "code": "64.99.03",
    "title": "Gayrimenkul yatırım ortaklığı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "64.99.08",
    "title": "Yatırım bankacılığı faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "64.99.09",
    "title": "Varlık yönetim şirketlerinin faaliyetleri (mülkiyet devri yoluyla yapılanlar)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "64.99.10",
    "title": "Menkul kıymet yatırım ortaklığı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "64.99.99",
    "title": "Başka yerde sınıflandırılmamış diğer finansal hizmet faaliyetleri (swap, opsiyon ve diğer riskten korunma sözleşmelerinin yazılması, vb. dahil)"
  },
  {
    "code": "65.11.02",
    "title": "Hayat sigortası",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "65.12.13",
    "title": "Hayat sigortası dışındaki sigortalar",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "65.20.01",
    "title": "Reasürans",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "65.30.01",
    "title": "Emeklilik fonları",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "66.11.02",
    "title": "Finansal piyasaların yönetimi (emtia sözleşmeleri borsası, menkul kıymetler borsası, hisse senedi borsası vb. yönetimi dahil; kamu otoriteleri tarafından yapılanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "66.12.01",
    "title": "Menkul kıymetler aracılık faaliyetleri (borsa aracılığı ve vadeli işlemler dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "66.12.04",
    "title": "Döviz bürolarının faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "66.12.06",
    "title": "Kambiyo hizmetleri (döviz bürolarının faaliyetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "66.12.08",
    "title": "Emtia sözleşmeleri aracılık faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "66.13.02",
    "title": "Kendi adına menkul sermaye iradı faaliyetleri (temettü, banka faizi, iştirak kazançları vb. dahil; ücret geliri elde etme hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "66.13.03",
    "title": "Ücret geliri elde etme faaliyetleri (huzur hakkı vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "66.19.07",
    "title": "Finansal hizmetlere yardımcı diğer faaliyetler (Sigorta ve emeklilik fonları hariç)"
  },
  {
    "code": "66.21.01",
    "title": "Risk ve hasar değerlemesi (sigorta eksperliği dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "66.22.01",
    "title": "Sigorta acentelerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "66.22.02",
    "title": "Sigorta brokerlarının faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "66.29.01",
    "title": "Aktüerya faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "66.29.99",
    "title": "Başka yerde sınıflandırılmamış sigorta ve emeklilik fonuna yardımcı diğer faaliyetler (kurtarılan sigortalı eşyanın idaresi) (sigorta ve emeklilik finansmanına yönelik mali denetim faaliyetleri, merkez bankası tarafından yapılan hariç)"
  },
  {
    "code": "66.30.00",
    "title": "Fon yönetimi faaliyetleri"
  },
  {
    "code": "68.11.00",
    "title": "Kendine ait gayrimenkulün alınıp satılması"
  },
  {
    "code": "68.12.01",
    "title": "Bina projelerinin geliştirilmesi (satışa yönelik bina projeleri için mali, teknik ve fiziksel araçların bir araya getirilmesi suretiyle konut veya diğer amaçlı kullanıma yönelik bina projelerinin organize edilmesi) (yapı kooperatifleri hariç)"
  },
  {
    "code": "68.12.02",
    "title": "Konut yapı kooperatiflerinin faaliyetleri"
  },
  {
    "code": "68.12.03",
    "title": "İşyeri yapı kooperatiflerinin faaliyetleri"
  },
  {
    "code": "68.20.02",
    "title": "Kendine ait veya kiralanan gayrimenkulün kiralanması ve işletilmesi",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "68.31.01",
    "title": "Gayrimenkul faaliyetleri için aracılık hizmeti faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "68.32.01",
    "title": "Gayrimenkul değerleme (eskpertiz) , danışmanlık ve emanet aracılarının (escrow) faaliyetleri"
  },
  {
    "code": "68.32.02",
    "title": "Bir ücret veya sözleşmeye dayalı olarak yapılan diğer gayrimenkul yönetimi faaliyetleri (apartman yöneticiliği hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "68.32.03",
    "title": "Bir ücret veya sözleşmeye dayalı olarak yapılan kira toplama faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "68.32.04",
    "title": "Bir ücret veya sözleşmeye dayalı olarak yapılan apartman yöneticiliği",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "69.10.01",
    "title": "Bilirkişi faaliyetleri (hukuki konularda)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "69.10.02",
    "title": "Hukuk müşavirliği",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "69.10.03",
    "title": "Hukuk danışmanlığı ve temsil faaliyetleri (avukatlık faaliyetleri)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "69.10.07",
    "title": "Noterlik faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "69.10.08",
    "title": "Sosyal güvenlik müşavirlerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "69.10.09",
    "title": "Hukuki arabuluculuk ve uzlaştırma faaliyetleri (işgücü ve yönetim arasında, işletmeler arasında veya şahıslar arasında ortaya çıkan anlaşmazlığın çözümü için tahkim veya arabuluculuk hizmetleri)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "69.10.10",
    "title": "Yediemin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "69.10.90",
    "title": "Diğer hukuki hizmet faaliyetleri"
  },
  {
    "code": "69.20.01",
    "title": "Mali müşavirlik hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "69.20.02",
    "title": "Muhasebe ve defter tutma faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "69.20.03",
    "title": "Vergi danışmanlığı ve vergi beyannamesinin hazırlanması faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "69.20.04",
    "title": "Yeminli mali müşavirlik faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "69.20.05",
    "title": "Mali denetim faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "70.10.01",
    "title": "İdare merkezi faaliyetleri (idare merkezi tarafından aynı şirket veya girişimin diğer birimlerine sağlanan yönetim hizmetleri ile bağlı iştiraklerini yöneten holdingler dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "70.20.01",
    "title": "İşletme ve diğer idari danışmanlık faaliyetleri"
  },
  {
    "code": "70.20.02",
    "title": "İnsan kaynakları yönetim danışmanlığı faaliyetleri"
  },
  {
    "code": "71.11.01",
    "title": "Mimarlık faaliyetleri ve mimari danışmanlık faaliyetleri (kültürel miras varlıklarının korunmasını ve restorasyonunu destekleyen mimari faaliyetler ile bir binanın iç yapısının ve düzeninin yeniden tasarlanması)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.11.02",
    "title": "Şehir ve bölge planlama faaliyetleri (nazım imar planı, vaziyet planı vb. dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.11.04",
    "title": "Peyzaj mimarisi faaliyetleri ve peyzaj konusunda mimari danışmanlık faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.12.01",
    "title": "Yer yüzeyinin araştırılması ve harita yapımına yönelik mühendislik faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.12.03",
    "title": "Bina projelerine yönelik mühendislik ve danışmanlık faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.12.04",
    "title": "Jeolojik, jeofizik ve ilgili araştırma ve danışmanlık hizmetlerine yönelik mühendislik faaliyetleri (petrol ve doğalgaz için olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.12.05",
    "title": "Petrol ve doğalgaz çıkarım projelerine yönelik mühendislik ve danışmanlık faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.12.06",
    "title": "Ulaştırma projelerine yönelik mühendislik ve danışmanlık faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.12.07",
    "title": "Su, kanalizasyon ve drenaj projelerine yönelik mühendislik ve danışmanlık faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.12.08",
    "title": "Sanayi ve imalat projelerine yönelik mühendislik ve danışmanlık faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.12.09",
    "title": "Enerji projelerine yönelik mühendislik ve danışmanlık faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.12.10",
    "title": "Mühendislik danışmanlık hizmetleri (bir projeyle bağlantılı olarak yapılanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.12.14",
    "title": "Yapı denetim kuruluşları",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.12.90",
    "title": "Diğer projelere yönelik mühendislik ve danışmanlık faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.20.05",
    "title": "Kara yolu taşıma araçlarının teknik muayene faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "71.20.07",
    "title": "Bileşim ve saflık konularında teknik test ve analiz faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "71.20.08",
    "title": "Su, hava vb. kirliliği konularında teknik test ve analiz faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "71.20.09",
    "title": "Fiziksel özellikler konusunda teknik test ve analiz faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "71.20.10",
    "title": "Ürünlerin ruhsatlandırılması faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "71.20.11",
    "title": "Gıda konusunda teknik test ve analiz faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "71.20.12",
    "title": "Entegre mekanik ve elektrik sistemleri konusunda teknik test ve analiz faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "71.20.13",
    "title": "Polis laboratuvarlarının analiz faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "71.20.14",
    "title": "Adli tıp laboratuvarlarının faaliyetleri"
  },
  {
    "code": "71.20.90",
    "title": "Diğer teknik test ve analiz faaliyetleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "72.10.01",
    "title": "Doğal bilimler ve mühendislikle ilgili diğer araştırma ve deneysel geliştirme faaliyetleri (tarımsal araştırmalar dahil)"
  },
  {
    "code": "72.10.02",
    "title": "Biyoteknolojiyle ilgili araştırma ve deneysel geliştirme faaliyetleri"
  },
  {
    "code": "72.20.01",
    "title": "Sosyal bilimlerle ve beşeri bilimlerle ilgili araştırma ve deneysel geliştirme faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "73.11.01",
    "title": "Reklam ajanslarının faaliyetleri (kullanılacak medyanın seçimi, reklamın tasarımı, sözlerin yazılması, reklam filmleri için senaryonun yazımı, satış noktalarında reklam ürünlerinin gösterimi ve sunumu vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "73.11.03",
    "title": "Reklam araç ve eşantiyonların dağıtımı ve teslimi faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "73.12.02",
    "title": "Çeşitli medya reklamları için alan ve zamanın bir ücret veya sözleşmeye dayalı olarak satışı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "73.20.03",
    "title": "Piyasa ve kamuoyu araştırma faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "73.30.00",
    "title": "Halkla ilişkiler ve iletişim faaliyetleri"
  },
  {
    "code": "74.11.00",
    "title": "Endüstriyel ürün ve moda tasarımı faaliyetleri"
  },
  {
    "code": "74.12.00",
    "title": "Grafik tasarım ve görsel iletişim faaliyetleri"
  },
  {
    "code": "74.13.00",
    "title": "İç tasarım faaliyetleri (iç mimarların faaliyetleri dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "74.14.00",
    "title": "Diğer uzmanlaşmış tasarım faaliyetleri (endüstriyel ürün ve moda tasarım, iç tasarım ve grafik tasarım faaliyetleri hariç)"
  },
  {
    "code": "74.20.22",
    "title": "Tüketicilere yönelik fotoğrafçılık faaliyetleri (pasaport, okul, düğün vb. için vesikalık ve portre fotoğrafçılığı vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "74.20.25",
    "title": "Hava ve su altı fotoğrafçılığı faaliyetleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "74.20.26",
    "title": "Reklamcılık ile ilgili fotoğrafçılık faaliyetleri (reklam görselleri, broşür, gazete ilanı, katalog vb. için ticari ürünlerin, moda kıyafetlerinin, makinelerin, binaların, kişilerin vb.nin fotoğraflarının çekilmesi)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "74.20.27",
    "title": "Etkinlik fotoğrafçılığı ve etkinliklerin videoya çekilmesi faaliyetleri (düğün, mezuniyet, konferans, resepsiyon, moda gösterileri, spor ve diğer ilgi çekici olayların fotoğraflanması veya videoya çekilmesi)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "74.20.28",
    "title": "Bağımsız foto muhabirlerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "74.20.29",
    "title": "Fotoğraf işleme faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "74.20.90",
    "title": "Diğer fotoğrafçılık faaliyetleri (fotomikrografi, mikrofilm hizmetleri, fotoğrafların restorasyonu ve rötuşlama vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "74.30.12",
    "title": "Tercüme ve sözlü tercüme faaliyetleri (işaret dili dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "74.91.00",
    "title": "Patent aracılığı ve pazarlama hizmeti faaliyetleri"
  },
  {
    "code": "74.99.01",
    "title": "Sanatçı, sporcu, şovmen, manken ve diğerleri için ajansların ve menajerlerin faaliyetleri"
  },
  {
    "code": "74.99.02",
    "title": "Gemi klas müesseseleri, deniz ekspertiz ve deniz sürveyör faaliyetleri"
  },
  {
    "code": "74.99.03",
    "title": "İşyeri komisyonculuğu faaliyetleri (küçük ve orta ölçekli işletmelerin alım ve satımının düzenlenmesi vb.)"
  },
  {
    "code": "74.99.04",
    "title": "Ekspertiz faaliyetleri (antika eşyalar, mücevherler vb. için ekspertiz hizmetleri) (deniz, gayrimenkul ve sigorta için olan ekspertiz faaliyetleri hariç)"
  },
  {
    "code": "74.99.99",
    "title": "Başka yerde sınıflandırılmamış diğer mesleki, bilimsel ve teknik faaliyetler (güvenlik danışmanlığı hariç)"
  },
  {
    "code": "75.00.02",
    "title": "Hayvan hastanelerinin faaliyetleri (evcil hayvanlar için ambulans faaliyetleri dahil)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "75.00.04",
    "title": "Veterinerlik hizmetleri (hayvan hastanelerinde verilen hizmetler hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "77.11.01",
    "title": "Motorlu hafif kara taşıtlarının ve arabaların sürücüsüz olarak kiralanması ve operasyonel leasingi (motosiklet ve motokaravan için olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.11.02",
    "title": "Motosiklet ve motokaravanların sürücüsüz olarak kiralanması veya operasyonel leasingi (ağırlığı 3.5 tondan daha az olanlar)"
  },
  {
    "code": "77.12.01",
    "title": "Motorlu ağır kara taşıtlarının sürücüsüz olarak kiralanması ve operasyonel leasingi (ağırlığı 3.5 tondan daha fazla olanlar) (motokaravan için olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.12.02",
    "title": "Motokaravanların sürücüsüz olarak kiralanması ve operasyonel leasingi (ağırlığı 3.5 tondan daha fazla olanlar)"
  },
  {
    "code": "77.21.02",
    "title": "Bisikletlerin kiralanması ve leasingi (elektrikli bisikletler dahil) (finansal leasing hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.21.04",
    "title": "Eğlence ve spor amaçlı sandal, tekne, kano, yelkenli vb.nin mürettebatsız olarak kiralanması ve leasingi (finansal leasing hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.21.90",
    "title": "Diğer eğlence ve spor eşyalarının kiralanması ve leasingi (finansal leasing hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.22.01",
    "title": "Video kasetlerinin, plakların ve disklerin kiralanması ve operasyonel leasingi",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.22.02",
    "title": "Gelinlik, kostüm, tekstil, giyim eşyası, ayakkabı ve mücevherlerin kiralanması ve operasyonel leasingi"
  },
  {
    "code": "77.22.03",
    "title": "Müzik aletlerinin kiralanması ve operasyonel leasingi"
  },
  {
    "code": "77.22.99",
    "title": "Başka yerde sınıflandırılmamış diğer kişisel ve ev eşyalarının kiralanması ve operasyonel leasingi (müzik aleti, giyim eşyası, mücevher vb. ile video kasetler, büro mobilyaları, eğlence ve spor ekipmanları hariç)"
  },
  {
    "code": "77.31.01",
    "title": "Tarımsal makine ve ekipmanların operatörsüz olarak kiralanması ve operasyonel leasingi (çim biçme makineleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.32.01",
    "title": "Bina ve bina dışı inşaatlarda kullanılan makine ve ekipmanların operatörsüz olarak kiralanması ve operasyonel leasingi (kurma/sökme hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.33.01",
    "title": "Büro makine ve ekipmanlarının operatörsüz olarak kiralanması ve leasingi (finansal leasing hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.33.02",
    "title": "Büro mobilyalarının kiralanması ve leasingi (büro sandalyesi ve masasının kiralanması dahil) (finansal leasing hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.33.03",
    "title": "Bilgisayar ve çevre birimlerinin operatörsüz olarak kiralanması ve leasingi (finansal leasing hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.34.01",
    "title": "Su yolu taşımacılığı ekipmanlarının operatörsüz olarak kiralanması ve operasyonel leasingi (yolcu ve yük taşımacılığı için ticari tekne ve gemiler dahil, gezinti tekneleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.35.01",
    "title": "Hava taşımacılığı araçlarının operatörsüz olarak kiralanması ve operasyonel leasingi",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.39.01",
    "title": "Demir yolu ulaşım ekipmanlarının operatörsüz olarak kiralanması ve operasyonel leasingi",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.39.02",
    "title": "Konteynerlerin kiralanması veya leasingi (konaklama ve büro amaçlı olanlar, birden çok taşıma türlerine uygun olanlar ve diğerleri) (finansal leasing hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.39.03",
    "title": "Motosiklet, karavan ve kamp gereçlerinin operatörsüz olarak kiralanması veya leasingi (finansal leasing hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.39.04",
    "title": "Maden ve petrol sahasında kullanılan ekipmanların operatörsüz olarak kiralanması veya leasingi (finansal leasing hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.39.05",
    "title": "Motorlar ve türbinlerin operatörsüz olarak kiralanması veya leasingi (finansal leasing hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.39.06",
    "title": "Mesleki ve bilimsel amaçlı ölçüm ve kontrol ekipmanlarının operatörsüz olarak kiralanması veya leasingi (tıbbi cihaz ve ekipmanların kiralanması dahil) (finansal leasing hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.39.07",
    "title": "Ticari radyo, televizyon ve telekomünikasyon ekipmanları ile sinema filmi yapım ekipmanlarının operatörsüz olarak kiralanması veya operasyonel leasingi",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.39.99",
    "title": "Başka yerde sınıflandırılmamış diğer makine ve ekipmanların sürücüsüz kiralanması ve leasingi ile maddi malların kiralanması ve operasyonel leasingi"
  },
  {
    "code": "77.40.01",
    "title": "Fikri mülkiyet haklarının ve benzer ürünlerin leasingi (patentli varlıklar, markalar, imtiyaz sözleşmeleri vb. dahil; telif hakkı alınmış olan çalışmalar hariç) (finansal leasing hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "77.51.00",
    "title": "Otomobillerin, motorlu karavanların ve römorkların kiralanması ve leasingine ilişkin aracılık hizmeti faaliyetleri"
  },
  {
    "code": "77.52.00",
    "title": "Diğer maddi varlıkların ve finans dışı maddi olmayan varlıkların kiralanması ve leasingi için aracılık hizmeti faaliyetleri"
  },
  {
    "code": "78.10.01",
    "title": "İş bulma acentelerinin faaliyetleri (işe girecek kişilerin seçimi ve yerleştirilmesi faaliyetleri dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "78.10.04",
    "title": "Oyuncu seçme ajansları ve bürolarının faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "78.20.02",
    "title": "Geçici iş bulma acenteleri ile diğer insan kaynaklarının sağlanması faaliyetleri"
  },
  {
    "code": "79.11.01",
    "title": "Seyahat acentesi faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "79.12.01",
    "title": "Tur operatörü faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "79.90.01",
    "title": "Turist rehberliği ve ziyaretçiler için danışmanlık faaliyetleri (gezilerle ilgili bilgi sağlanması)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "79.90.99",
    "title": "Başka yerde sınıflandırılmamış diğer rezervasyon hizmetleri ve ilgili faaliyetler (turizm tanıtım faaliyetleri, vb.)"
  },
  {
    "code": "80.01.01",
    "title": "Özel güvenlik faaliyetleri (kamu güvenliği hariç)"
  },
  {
    "code": "80.01.02",
    "title": "Soruşturma faaliyetleri (özel dedektiflik faaliyetleri, imza ve el yazısı tespit faaliyetleri dahil)"
  },
  {
    "code": "80.09.01",
    "title": "Çilingirlik hizmetleri"
  },
  {
    "code": "80.09.99",
    "title": "Başka yerde sınıflandırılmamış güvenlik faaliyetleri"
  },
  {
    "code": "81.10.01",
    "title": "Tesis bünyesindeki kombine destek hizmetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "81.21.01",
    "title": "Binaların genel temizliği (uzmanlaşmış temizlik faaliyetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "81.22.03",
    "title": "Nesne veya binaların (ameliyathaneler vb.) sterilizasyonu faaliyetleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "81.22.04",
    "title": "Yapıların dış cepheleri için buharlı temizleme, kum püskürtme vb. uzmanlaşmış temizlik faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "81.22.05",
    "title": "Yeni binaların inşaat sonrası temizliği"
  },
  {
    "code": "81.22.99",
    "title": "Başka yerde sınıflandırılmamış diğer bina ve endüstriyel temizlik faaliyetleri (sterilizasyon faaliyetleri hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "81.23.01",
    "title": "Böceklerin, kemirgenlerin ve diğer zararlıların imhası ve haşere kontrol faaliyetleri (tarımsal zararlılarla mücadele hariç)"
  },
  {
    "code": "81.23.02",
    "title": "Park ve caddelerin süpürülerek yıkanması, temizlenmesi faaliyetleri"
  },
  {
    "code": "81.23.03",
    "title": "Yol ve pistlerdeki kar ve buzun kaldırılması (kum, tuz dökülmesi dahil)"
  },
  {
    "code": "81.23.99",
    "title": "Başka yerde sınıflandırılmamış diğer temizlik faaliyetleri (oto yıkama hariç)"
  },
  {
    "code": "81.30.06",
    "title": "Çevre düzenlemesi ve bakımı faaliyetleri"
  },
  {
    "code": "82.10.01",
    "title": "Büro yönetimi ve destek faaliyetleri (sanal ofis, hazır ofis ve paylaşımlı ofis hariç)"
  },
  {
    "code": "82.10.02",
    "title": "Sanal ofis, hazır ofis ve paylaşımlı ofis yönetimi ve destek faaliyetleri"
  },
  {
    "code": "82.20.01",
    "title": "Çağrı merkezlerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "82.30.02",
    "title": "Kongre ve ticari gösteri organizasyonu",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "82.40.01",
    "title": "Spor, müzik, tiyatro ve diğer eğlence etkinlikleri için yer ayırma (rezervasyon) ve bilet satılması faaliyeti"
  },
  {
    "code": "82.40.99",
    "title": "Başka yerde sınıflandırılmamış işletme destek hizmetleri için aracılık hizmeti faaliyetleri (bilet rezervasyonu hariç)"
  },
  {
    "code": "82.91.00",
    "title": "Tahsilat ve kredi kayıt bürolarının faaliyetleri"
  },
  {
    "code": "82.92.01",
    "title": "Tehlikesiz ürünleri paketleme faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "82.92.05",
    "title": "Tehlikeli ürünleri paketleme faaliyetleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "82.99.02",
    "title": "Elektrik, gaz, su ve ısınma sayaçlarını okuma ve faturalama faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "82.99.04",
    "title": "Trafik müşavirliği",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "82.99.08",
    "title": "İş takipçiliği faaliyeti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "82.99.99",
    "title": "Başka yerde sınıflandırılmamış diğer işletme destek hizmeti faaliyetleri"
  },
  {
    "code": "84.11.41",
    "title": "Belediyelerin kamu yönetimi hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.11.42",
    "title": "Ekonomik ve sosyal planlama ile istatistik ile ilgili kamu yönetimi hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.11.43",
    "title": "Finansal, mali ve denetim ile ilgili kamu yönetimi hizmetleri (defterdarlık, mal müdürlükleri, vergi daireleri, Sayıştay, kamu borç ve fonlarının yönetimi dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.11.44",
    "title": "Genel personel işleri ile ilgili kamu yönetimi hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.11.45",
    "title": "Gümrüklerle ilgili kamu yönetimi hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.11.46",
    "title": "Muhtarların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.11.47",
    "title": "Valiliklerin ve kaymakamlıkların kamu yönetimi hizmetleri (il ve ilçe özel idarelerinin faaliyetleri dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.11.48",
    "title": "Yasama ve yürütme hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.11.90",
    "title": "Kamu için diğer destekleyici kamu yönetimi hizmetleri (merkezi kamu ihale ve tedarik hizmetleri ile haritacılık vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.12.11",
    "title": "Eğitime ilişkin kamu yönetimi hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.12.12",
    "title": "İskan ve toplum refahına ilişkin kamu yönetimi hizmetleri (su temini ve çevre koruma programları dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.12.13",
    "title": "Sağlığa ve sosyal hizmetlere ilişkin kamu yönetimi hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.12.14",
    "title": "Spor, dinlence, kültür ve dine ilişkin kamu yönetimi hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.13.11",
    "title": "Çok amaçlı geliştirme projeleri ile ilgili kamu yönetimi hizmetleri (bölgesel kalkınma projeleri dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.13.12",
    "title": "Genel ekonomik, ticari ve işgücü ile ilgili kamu yönetimi hizmetleri (genel ekonomi politikalarının oluşturulması, teşvik faaliyetleri, patent işleri, genel istihdam politikaları, metroloji işleri, istihdam vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.13.13",
    "title": "Madencilik, doğal kaynaklar, imalat ve inşaat ile ilgili kamu yönetimi hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.13.14",
    "title": "Tarım, ormancılık, balıkçılık ve avcılıkla ilgili kamu yönetimi hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.13.15",
    "title": "Ticaret, otelcilik ve lokantacılık ile ilgili kamu yönetimi hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.13.16",
    "title": "Turizm ile ilgili kamu yönetimi hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.13.17",
    "title": "Ulaştırma ve iletişim ile ilgili kamu yönetimi hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.13.18",
    "title": "Yakıt ve enerji ile ilgili kamu yönetimi hizmetleri (enerji bakanlığı, vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.21.05",
    "title": "Dış işleri ile ilgili kamu yönetimi hizmetleri (yurt dışı diplomatik hizmetler ve konsolosluk hizmetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.21.06",
    "title": "Yurt dışı diplomatik hizmetler ve konsolosluk hizmetleri (yabancı konsolosluklar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.22.05",
    "title": "Askeri savunma hizmetleri (silahlı kuvvetler ve savunma ile ilgili idari hizmetler)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.22.06",
    "title": "Sivil savunma hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.23.04",
    "title": "Adli sistemin yönetilmesi, cumhuriyet savcılıklarının ve icra müdürlüklerinin faaliyetleri (ceza infaz kurumlarının ve mahkemelerin faaliyetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.23.05",
    "title": "Ceza infaz ve tutuk evlerinin faaliyetleri (rehabilitasyon faaliyetleri dahil, eğitim faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "84.23.06",
    "title": "Mahkemelerin faaliyetleri (yüksek yargı organları dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "84.24.01",
    "title": "Kamu düzeni ve güvenliği ile ilgili faaliyetler",
    "hazard": "Tehlikeli"
  },
  {
    "code": "84.25.01",
    "title": "İtfaiye hizmetleri (hava taşıtlarıyla yapılanlar ile orman yangınlarıyla mücadele ve koruma faaliyetleri hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "84.25.02",
    "title": "Hava taşıtları yoluyla yapılan itfaiye hizmetleri (orman yangınlarıyla mücadele ve koruma faaliyetleri hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "84.25.03",
    "title": "Cankurtaranlar gibi plaj gözetmenlerinin faaliyetleri"
  },
  {
    "code": "84.30.01",
    "title": "Zorunlu sosyal güvenlik faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.10.01",
    "title": "Kamu kurumları tarafından verilen okul öncesi eğitim faaliyeti (okula yönelik eğitim verilmeyen gündüz bakım (kreş) faaliyetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.10.02",
    "title": "Özel öğretim kurumları tarafından verilen okul öncesi eğitim faaliyeti (okula yönelik eğitim verilmeyen gündüz bakım (kreş) faaliyetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.20.06",
    "title": "Kamu kurumları tarafından verilen fiziksel veya zihinsel engellilere yönelik ilköğretim faaliyeti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.20.07",
    "title": "Kamu kurumları tarafından verilen ilköğretim faaliyeti (yetişkinlere yönelik okuma yazma programlarının verilmesi dahil, engelliler için verilen eğitim hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.20.08",
    "title": "Özel öğretim kurumları tarafından verilen fiziksel veya zihinsel engellilere yönelik ilköğretim faaliyeti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.20.09",
    "title": "Özel öğretim kurumları tarafından verilen ilköğretim faaliyeti (yetişkinlere yönelik okuma yazma programlarının verilmesi dahil, engelliler için verilen eğitim hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.31.12",
    "title": "Kamu kurumları tarafından verilen genel ortaöğretim (ortaokul/lise) faaliyeti (engellilere yönelik verilen eğitim hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.31.13",
    "title": "Kamu kurumları tarafından verilen fiziksel veya zihinsel engellilere yönelik genel ortaöğretim (ortaokul/lise) faaliyeti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.31.14",
    "title": "Özel öğretim kurumları tarafından verilen genel ortaöğretim (ortaokul/lise) faaliyeti (engellilere yönelik verilen eğitim hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.31.16",
    "title": "Özel öğretim kurumları tarafından verilen fiziksel veya zihinsel engellilere yönelik genel ortaöğretim (ortaokul/lise) faaliyeti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.32.10",
    "title": "Kamu kurumları tarafından verilen fiziksel veya zihinsel engellilere yönelik teknik ve mesleki ortaöğretim (ortaokul/lise) faaliyeti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.32.11",
    "title": "Kamu kurumları tarafından verilen teknik ve mesleki ortaöğretim (ortaokul/lise) faaliyeti (engellilere yönelik verilen eğitim hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "85.32.12",
    "title": "Özel öğretim kurumları tarafından verilen fiziksel veya zihinsel engellilere yönelik teknik ve mesleki ortaöğretim (ortaokul/lise) faaliyeti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.32.13",
    "title": "Özel öğretim kurumları tarafından verilen teknik ve mesleki ortaöğretim (ortaokul/lise) faaliyeti (engellilere yönelik verilen eğitim hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "85.32.14",
    "title": "Çıraklık eğitimi",
    "hazard": "Tehlikeli"
  },
  {
    "code": "85.32.15",
    "title": "Ticari sertifika veren havacılık, yelkencilik, gemicilik vb. kursların faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "85.32.16",
    "title": "Ticari taşıt kullanma belgesi veren sürücü kurslarının faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.32.90",
    "title": "Mesleki amaçlı eğitim veren diğer kursların faaliyetleri (özel öğretim kurumları tarafından verilen fiziksel veya zihinsel engellilere yönelik teknik ve mesleki ortaöğretim (ortaokul/lise) faaliyetleri ile çıraklık eğitimi faaliyetleri dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.33.00",
    "title": "Ortaöğretim sonrası yükseköğretim derecesinde olmayan eğitim"
  },
  {
    "code": "85.40.01",
    "title": "Özel öğretim kurumları tarafından verilen yükseköğretim faaliyeti (yükseköğretim düzeyinde eğitim sağlayan konservatuvarlar dahil)"
  },
  {
    "code": "85.40.02",
    "title": "Kamu kurumları tarafından verilen yükseköğretim faaliyeti (yükseköğretim düzeyinde eğitim sağlayan konservatuvarlar dahil)"
  },
  {
    "code": "85.51.03",
    "title": "Spor ve eğlence (rekreasyon) eğitimi (fitness merkezleri tarafından sağlanan eğitimler ile temel, orta ve yükseköğretim düzeyinde verilen eğitim hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.52.05",
    "title": "Kültürel eğitim (bale, dans, müzik, fotoğraf, halk oyunu, resim, drama, vb. eğitimi dahil, temel, orta ve yükseköğretim düzeyinde verilen eğitim hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.53.01",
    "title": "Sürücü kursu faaliyetleri (ticari sertifika veren sürücülük, havacılık, yelkencilik, gemicilik eğitimi hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.59.01",
    "title": "Halk eğitim merkezlerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.59.03",
    "title": "Bilgisayar, yazılım, veri tabanı, vb. eğitimi veren kursların faaliyetleri (temel, orta ve yükseköğretim düzeyinde verilen eğitim hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.59.05",
    "title": "Orta öğretime, yüksek öğretime, kamu personeli vb. sınavlara yönelik kurs ve etüt merkezlerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.59.06",
    "title": "Biçki, dikiş, nakış, halıcılık, güzellik, berberlik, kuaförlük kurslarının faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.59.08",
    "title": "Kuran kursları ve diğer dini eğitim veren yerlerin faaliyetleri (temel, orta ve yükseköğretim düzeyinde verilen eğitim hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.59.09",
    "title": "Dil ve konuşma becerileri eğitimi veren kursların faaliyetleri (temel, orta ve yükseköğretim düzeyinde verilen eğitim hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.59.10",
    "title": "Mankenlik, modelistlik, stilistlik kurslarının faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.59.12",
    "title": "Muhasebe eğitimi kurslarının faaliyeti",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.59.15",
    "title": "Akademik özel ders verme faaliyeti (temel, orta ve yükseköğretim düzeyinde bire bir eğitim)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.59.16",
    "title": "Çocuk kulüplerinin faaliyetleri (6 yaş ve üzeri çocuklar için)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "85.59.99",
    "title": "Başka yerde sınıflandırılmamış diğer eğitim kursu faaliyetleri (cankurtaranlık, hayatta kalma, topluluğa konuşma, hızlı okuma vb. eğitimi dahil; yetişkin okuma yazma programları ile temel, orta ve yükseköğretim düzeyinde verilen eğitim hariç)"
  },
  {
    "code": "85.61.00",
    "title": "Kurslara ve eğitmenlere yönelik aracılık hizmeti faaliyetleri"
  },
  {
    "code": "85.69.00",
    "title": "Eğitimi destekleyici faaliyetler (eğitim rehberlik, danışmanlık (yurt dışı eğitim danışmanlığı dahil), test değerlendirme, öğrenci değişim programlarının organizasyonu, yaprak test ve soru bankası hazırlama gibi eğitimi destekleyen öğrenim dışı faaliyetler)"
  },
  {
    "code": "86.10.04",
    "title": "Kamu kurumları tarafından verilen insan sağlığına yönelik özel ihtisas gerektiren yataklı hastane hizmetleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "86.10.05",
    "title": "Kamu kurumları tarafından verilen insan sağlığına yönelik yataklı hastane hizmetleri (devlet üniversite hastaneleri dahil; özel ihtisas hastaneleri ile dişçilik, ambulansla taşıma, tıbbi laboratuvar test faaliyetleri hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "86.10.12",
    "title": "Özel sağlık kurumları tarafından verilen insan sağlığına yönelik özel ihtisas gerektiren yataklı hastane hizmetleri",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "86.10.13",
    "title": "Özel sağlık kurumları tarafından verilen insan sağlığına yönelik yataklı hastane hizmetleri (özel veya vakıf üniversite hastaneleri dahil; dişçilik, ambulansla taşıma, tıbbi laboratuvar testleri faaliyetleri hariç)",
    "hazard": "Çok Tehlikeli"
  },
  {
    "code": "86.21.02",
    "title": "Aile ve toplum sağlığı merkezleri tarafından sağlanan yatılı olmayan genel hekimlik uygulama faaliyetleri (yatılı hastane faaliyetleri ile ebeler, hemşireler ve fizyoterapistlerce gerçekleştirilen paramedikal faaliyetler hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.21.03",
    "title": "Özel sağlık kurumları tarafından polikliniklerde sağlanan yatılı olmayan genel hekimlik uygulama faaliyetleri (özel muayene ve yatılı hastane faaliyetleri ile ebe, hemşire ve fizyoterapistlerin paramedikal faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.21.04",
    "title": "Özel muayenehanelerde sağlanan yatılı olmayan genel hekimlik uygulama faaliyetleri (hastane ve poliklinik faaliyetleri ile ebe, hemşire ve fizyoterapistlerin paramedikal faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.21.05",
    "title": "Ortak sağlık ve güvenlik birimlerinin (OSGB) faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.21.90",
    "title": "Diğer yatılı olmayan genel hekimlik uygulama faaliyetleri (ev, iş yeri, okul vb. yerlerde sağlananlar dahil; ebe, hemşire ve fizyoterapistlerin paramedikal faaliyetleri ile OSGB'lerin faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.22.02",
    "title": "Özel muayenehanelerde sağlanan uzman hekimlik ile ilgili yatılı olmayan uygulama faaliyetleri (hastane ve poliklinik faaliyetleri ile ebe, hemşire ve fizyoterapistlerin paramedikal faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.22.05",
    "title": "Özel sağlık kurumları tarafından poliklinik ve yatılı olmayan tıp merkezlerinde sağlanan uzman hekimlik ile ilgili uygulama faaliyetleri (yatılı hastane faaliyetleri ile ebe, hemşire ve fizyoterapistlerin paramedikal faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.22.06",
    "title": "Aile ve toplum sağlığı merkezleri tarafından sağlanan yatılı olmayan uzman hekimlik uygulama faaliyetleri (yatılı hastane faaliyetleri ile ebe, hemşire ve fizyoterapistlerin paramedikal faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.22.07",
    "title": "Diyaliz merkezleri (hastane dışı)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.22.90",
    "title": "Diğer yatılı olmayan uzman hekimlik uygulama faaliyetleri (ev, iş yeri, okul vb. yerlerde sağlananlar dahil; ebe, hemşire ve fizyoterapistlerin paramedikal faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.23.01",
    "title": "Özel sağlık kurumları tarafından sağlanan diş hekimliği uygulama faaliyetleri (yatılı hastane faaliyetleri ile diş hijyenistleri gibi paramedikal diş sağlığı personelinin faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.23.03",
    "title": "Özel muayenehanelerde sağlanan diş hekimliği uygulama faaliyetleri (yatılı hastane faaliyetleri ile diş hijyenistleri gibi paramedikal diş sağlığı personelinin faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.23.05",
    "title": "Kamu kurumları tarafından sağlanan diş hekimliği uygulama faaliyetleri (yatılı hastane faaliyetleri ile diş hijyenistleri gibi paramedikal diş sağlığı personelinin faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "86.91.01",
    "title": "Tıbbi laboratuvar faaliyetleri"
  },
  {
    "code": "86.91.02",
    "title": "Tanı amaçlı görüntüleme faaliyetleri (analiz veya yorumlama olmaksızın)"
  },
  {
    "code": "86.92.00",
    "title": "Ambulansla hasta taşıma"
  },
  {
    "code": "86.93.00",
    "title": "Psikologların, psikoterapistlerin, psikolojik danışmanların ve psikoanalistlerin faaliyetleri (tıp doktorları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "86.94.01",
    "title": "Ebe, sağlık memuru, sünnetçi, iğneci, pansumancı vb.leri tarafından verilen hizmetler (tıp doktorları dışında yetkili kişilerce sağlanan gebelik süresince ve doğum sonrası izleme ve tıbbi işlemleri kapsayan aile planlaması hizmetleri dahil) (hastane dışı)"
  },
  {
    "code": "86.94.02",
    "title": "Hemşirelik hizmetleri (evdeki hastalar için bakım, koruma, anne bakımı, çocuk sağlığı ve hemşirelik bakımı alanındaki benzeri hizmetler dahil; hemşireli yatılı bakım tesislerinin faaliyetleri ile tıp doktorlarının hizmetleri hariç) (hastane dışı)"
  },
  {
    "code": "86.95.00",
    "title": "Fizyoterapi hizmetleri (tıp doktorları dışında yetkili kişilerce sağlanan fizyoterapi, ergoterapi vb. alanlardaki hizmetler) (hastane dışı)"
  },
  {
    "code": "86.96.00",
    "title": "Geleneksel, tamamlayıcı ve alternatif tıp faaliyetleri"
  },
  {
    "code": "86.97.00",
    "title": "Tıp, dişçilik ve diğer insan sağlığı hizmetlerine yönelik aracılık hizmeti faaliyetleri"
  },
  {
    "code": "86.99.01",
    "title": "Kan merkezleri ile kan, sperm ve organ bankalarının faaliyetleri (hastane dışı)"
  },
  {
    "code": "86.99.99",
    "title": "Başka yerde sınıflandırılmamış diğer insan sağlığı faaliyetleri (kan merkezleri ile kan, sperm ve organ bankalarının faaliyetleri hariç)"
  },
  {
    "code": "87.10.01",
    "title": "Hemşireli yatılı bakım faaliyetleri (hemşireli bakım evlerinin, hemşireli huzur evlerinin faaliyetleri dahil; sadece asgari düzeyde hemşire bakımı sağlanan yaşlı evlerinin, yetimhanelerin, yurtların faaliyetleri ile evlerde sağlanan hizmetler hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "87.20.02",
    "title": "Zihinsel rahatsızlığı veya madde kullanımı teşhisi olan kişilere yönelik yatılı bakım faaliyetleri (hastanelerin faaliyetleri ile yatılı sosyal hizmet faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "87.30.02",
    "title": "Yaşlılara ve bedensel engellilere yönelik yatılı bakım faaliyetleri (destekli yaşam tesisleri, hemşire bakımı olmayan huzurevleri ve asgari düzeyde hemşire bakımı olan evlerin faaliyetleri dahil, yaşlılar için hemşire bakımlı evlerin faaliyetleri hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "87.91.00",
    "title": "Yatılı bakım faaliyetleri için aracılık hizmeti faaliyetleri"
  },
  {
    "code": "87.99.00",
    "title": "Başka yerde sınıflandırılmamış diğer yatılı bakım faaliyetleri"
  },
  {
    "code": "88.10.02",
    "title": "Yaşlılar ve bedensel engelliler için barınacak yer sağlanmaksızın verilen sosyal hizmetler (yatılı bakım faaliyetleri ile engelli çocuklara yönelik gündüz bakım (kreş) faaliyetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "88.91.01",
    "title": "Çocuk gündüz bakım (kreş) faaliyetleri (engelli çocuklar için olanlar ile bebek bakıcılığı dahil; okul öncesi eğitim faaliyetleri ile çocuk kulüpleri (6 yaş ve üzeri çocuklar için) hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "88.99.07",
    "title": "Barınacak yer sağlanmaksızın mesleki rehabilitasyon hizmetleri (bedensel engelliler için rehabilitasyon hizmetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "88.99.09",
    "title": "Barınacak yer sağlanmaksızın çocuk ve gençlere yönelik rehabilitasyon hizmetleri (zihinsel engelliler için olanlar dahil, bedensel engellilere yönelik olanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "88.99.99",
    "title": "Başka yerde sınıflandırılmamış barınacak yer sağlanmaksızın verilen diğer sosyal yardım hizmetleri (aile danışmanlığı ve rehberliği, borç danışmanlığı, sosyal hizmet için para toplama, evlat edindirme, evsiz, afetzede ve mültecilere geçici barınak sağlama, yardım için uygun kişi belirleme vb.)"
  },
  {
    "code": "90.11.00",
    "title": "Edebiyat eseri oluşturma ve müzikal kompozisyon faaliyetleri"
  },
  {
    "code": "90.12.00",
    "title": "Görsel sanatlar yaratıcılık faaliyetleri"
  },
  {
    "code": "90.13.00",
    "title": "Diğer sanatsal yaratıcılık faaliyetleri"
  },
  {
    "code": "90.20.01",
    "title": "Bağımsız aktör, aktrist ve dublörlerin faaliyetleri"
  },
  {
    "code": "90.20.02",
    "title": "Bağımsız müzisyen, ses sanatçısı, konuşmacı, sunucu vb.lerin faaliyetleri (müzik grupları dahil)"
  },
  {
    "code": "90.20.03",
    "title": "Canlı tiyatro, opera, bale, müzikal, konser vb. yapımların sahneye konulması faaliyetleri (illüzyon gösterileri, kukla gösterileri ve kumpanyalar dahil)"
  },
  {
    "code": "90.20.04",
    "title": "Sirklerin faaliyetleri"
  },
  {
    "code": "90.20.99",
    "title": "Başka yerde sınıflandırılmamış diğer gösteri sanatları"
  },
  {
    "code": "90.31.00",
    "title": "Sanat tesislerinin ve alanlarının (mekanlarının) işletilmesi"
  },
  {
    "code": "90.39.01",
    "title": "Sanat ve gösteri sanatlarına yönelik yönetmenlerin ve yapımcıların faaliyetleri"
  },
  {
    "code": "90.39.90",
    "title": "Sanat ve gösteri sanatlarına yönelik diğer destek faaliyetleri (sanat ve gösteri sanatlarına yönelik yönetmenlerin ve yapımcıların faaliyetleri hariç)"
  },
  {
    "code": "91.11.00",
    "title": "Kütüphane faaliyetleri"
  },
  {
    "code": "91.12.00",
    "title": "Arşiv faaliyetleri"
  },
  {
    "code": "91.21.00",
    "title": "Müze ve koleksiyonculuk faaliyetleri (müzelerde ve özel koleksiyonlarda yer alan eserlerin konservasyonu faaliyetleri hariç)"
  },
  {
    "code": "91.22.00",
    "title": "Tarihi alan ve anıt faaliyetleri (tarihi alanların ve yapıların işletilmesi, korunması dahil)"
  },
  {
    "code": "91.30.00",
    "title": "Kültürel mirasın konservasyonu, restorasyonu ve diğer destek faaliyetleri (müzeler ve özel koleksiyonlar dahil)"
  },
  {
    "code": "91.41.00",
    "title": "Botanik ve hayvanat bahçesi faaliyetleri"
  },
  {
    "code": "91.42.00",
    "title": "Tabiatı koruma faaliyetleri"
  },
  {
    "code": "92.00.01",
    "title": "Müşterek bahis faaliyetleri (at yarışı, köpek yarışı, futbol ve diğer spor yarışmaları konusunda bahis hizmetleri)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "92.00.02",
    "title": "Loto vb. sayısal şans oyunlarına ilişkin faaliyetler (piyango biletlerinin satışı dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "92.00.03",
    "title": "Kumarhanelerin faaliyetleri (çevrim içi olanlar dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.11.01",
    "title": "Spor tesislerinin işletilmesi (hipodromların işletilmesi hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.11.02",
    "title": "Hipodromların işletilmesi",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.12.01",
    "title": "Atıcılık ve okçuluk kulüplerinin faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "93.12.03",
    "title": "Futbol, voleybol, basketbol ve hentbol kulüplerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.12.90",
    "title": "Diğer spor kulüplerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.13.01",
    "title": "Fitness merkezlerinin faaliyetleri (yoga, pilates, tai chi stüdyolarının faaliyetleri vb. dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.19.01",
    "title": "Kendi hesabına bireysel çalışan atlet, hakem, zaman tutucu, antrenör, spor eğitmeni vb. sporcuların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.19.02",
    "title": "Spor etkinlikleri yapımcılarının faaliyetleri ile bu etkinliklerin kendi tesisleri olmayan kuruluşlar tarafından düzenlenmesi faaliyetleri (spor kulüpleri tarafından yapılanlar hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.19.03",
    "title": "Spor ve eğlence amaçlı sporlara ilişkin destek faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "93.19.04",
    "title": "Spor ligleri ve düzenleyici birimlerin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.19.99",
    "title": "Başka yerde sınıflandırılmamış diğer spor amaçlı faaliyetler"
  },
  {
    "code": "93.21.01",
    "title": "Eğlence parkları ve tema parklarının faaliyetleri (bağımsız sağlayıcılar tarafından mekanik at ve arabaların, oyunların ve gösterilerin işletilmesi hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "93.29.01",
    "title": "Plaj alanlarının işletilmesi (bu tesislerin bütünleyici bir parçası olan soyunma odası, dolap, sandalye, kano, deniz motosikleti vb. kiralanması dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.29.02",
    "title": "Düğün, balo ve kokteyl salonlarının işletilmesi",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.29.03",
    "title": "Oyun makinelerinin işletilmesi",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.29.07",
    "title": "Marina vb. dinlence amaçlı ulaştırma tesislerinin işletilmesi",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.29.08",
    "title": "Bilardo salonlarının faaliyetleri",
    "hazard": "Tehlikeli"
  },
  {
    "code": "93.29.10",
    "title": "Dinlence (rekreasyon) parklarının faaliyetleri (konaklamalı olanlar ile eğlence parkları ve tema parklarının işletilmesi hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.29.11",
    "title": "Elektronik spor (e-spor) oyun merkezlerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "93.29.12",
    "title": "Sanatsal olmayan etkinliklerin organizasyonuyla ilgili görsel-işitsel ekipmanların ve özel efektlerin teknik planlanması, temini, kurulumu ve işletilmesi"
  },
  {
    "code": "93.29.99",
    "title": "Başka yerde sınıflandırılmamış diğer eğlence ve dinlence (rekreasyon) faaliyetleri"
  },
  {
    "code": "94.11.03",
    "title": "Esnaf ve sanatkar odaları, birlikleri ve üst kuruluşlarının faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.11.04",
    "title": "Çiftçi ve ziraat odaları, birlikleri ve üst kuruluşlarının faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.11.05",
    "title": "Ticaret ve sanayi odaları, deniz ticaret odaları ve üst kuruluşlarının faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.11.06",
    "title": "İşveren sendikalarının faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.11.90",
    "title": "Diğer iş ve işveren odaları, birlikleri ve üst kuruluşlarının faaliyetleri (işçi, işveren ve memur sendikaları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.12.01",
    "title": "Baroların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.12.05",
    "title": "Mesleki birlikler, dernekler ve odaların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.12.90",
    "title": "Diğer profesyonel meslek kuruluşlarının faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.20.01",
    "title": "Sendikaların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.91.02",
    "title": "Dini kuruluşların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.92.02",
    "title": "Siyasi kuruluşların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.01",
    "title": "Üyelik gerektiren, çevre ve doğal hayatın korunmasına yönelik dernek ve birliklerin faaliyetleri (vahşi yaşamı koruma kuruluşları dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.02",
    "title": "Üyelik gerektiren gençlik dernek ve birliklerinin faaliyetleri (öğrenci birlikleri ile izci birlik ve kulüpleri dahil)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.03",
    "title": "Üyelik gerektiren yurtsever dernek ve birliklerinin faaliyetleri (savaş gazisi birlikleri vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.04",
    "title": "Üyelik gerektiren hayvanları koruma dernek ve birliklerinin faaliyetleri (hayvanları koruma derneği, vb.)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.05",
    "title": "Üyelik gerektiren kadın hakları koruma dernek ve birliklerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.08",
    "title": "Okul aile birlikleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.09",
    "title": "Üyelik gerektiren, kültür, dayanışma ve eğlence dernek ve birliklerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.12",
    "title": "Üyelik gerektiren ideoloji ve düşünce kuruluşlarının ve derneklerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.13",
    "title": "Üyelik gerektiren sivil arama ve kurtarma dernek ve birliklerinin faaliyetleri (sivil savunma faaliyetleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.14",
    "title": "Üyelik gerektiren bireysel özgürlük ve insan hakları dernek ve birliklerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.15",
    "title": "Üyelik gerektiren gönüllü sağlık dernek ve birliklerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.16",
    "title": "Engellilere, etnik gruplara ve azınlıklara yönelik üyelik gerektiren birlik ve kuruluşların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.17",
    "title": "Üyelik gerektiren, toplumsal hayatı geliştirme ve iyileştirmeye yönelik oluşturulan birlik ve kuruluşların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.18",
    "title": "Üyelik gerektiren, tüketici haklarını savunan birlikler ve kuruluşların faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.19",
    "title": "Havacılığın geliştirilmesine yönelik, üyelik gerektiren kuruluş ve derneklerin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.20",
    "title": "Üye olunan derneklerin üst kuruluşları ve üst birlikleri (iş, işveren ve mesleki birlik ve derneklerin üst kuruluşları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.21",
    "title": "Üyelik gerektiren yardım kuruluşlarının ve derneklerinin faaliyetleri (doğal afetlerde zarar görenler, evsizler, fakirler için organizasyonlar vb.) (arama ve kurtarma hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.22",
    "title": "Üyelik gerektiren eğitim ve araştırma birlik ve derneklerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.23",
    "title": "Üyelik gerektiren konut ve kalkınma birlik ve derneklerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.24",
    "title": "Üyelik gerektiren mezun dernek ve birliklerinin faaliyetleri (profesyonel meslek kuruluşları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "94.99.99",
    "title": "Üyelik gerektiren, başka yerde sınıflandırılmamış diğer üye olunan kuruluşların faaliyetleri (klasik araba birlikleri, kiracı birlikleri vb. dahil)"
  },
  {
    "code": "95.10.01",
    "title": "Bilgisayarların ve bilgisayar çevre birimlerinin onarımı (ATM'ler ve pos cihazları dahil)"
  },
  {
    "code": "95.10.02",
    "title": "İletişim araç ve gereçlerinin onarımı (kablosuz telefonlar, telsizler, cep telefonları, çağrı cihazları, ticari kameralar vb.)"
  },
  {
    "code": "95.10.03",
    "title": "Bilgisayarların ve bilgisayar çevre birimlerinin yenilenmesi hizmeti faaliyetleri (dizüstü bilgisayarlar, masaüstü bilgisayarlar, modemler, oyun konsolları)"
  },
  {
    "code": "95.10.04",
    "title": "İletişim araç ve gereçlerinin yenilenmesi hizmeti faaliyetleri (cep telefonları, akıllı telefonlar)"
  },
  {
    "code": "95.21.01",
    "title": "Tüketici elektroniği ürünlerinin onarım ve bakımı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "95.22.01",
    "title": "Evde kullanılan elektrikli cihazların onarımı (buzdolabı, fırın, çamaşır makinesi, bulaşık makinesi, oda kliması, elektrikli küçük ev aletleri, robot süpürge vb.)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "95.22.02",
    "title": "Ev ve bahçe gereçlerinin bakım ve onarımı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "95.22.03",
    "title": "Termosifon, şofben, banyo kazanı vb. onarım ve bakımı (merkezi ısıtma kazanlarının (boylerler) onarımı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "95.23.01",
    "title": "Ayakkabı ve deri eşyaların onarım ve bakımı (deri giyim eşyası hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "95.24.01",
    "title": "Mobilyaların ve ev döşemelerinin onarım ve bakımı (halı ve kilim onarımı hariç)",
    "hazard": "Tehlikeli"
  },
  {
    "code": "95.25.01",
    "title": "Saatlerin onarımı (kronometreler dahil, devam kayıt cihazları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "95.25.02",
    "title": "Mücevherlerin onarımı",
    "hazard": "Tehlikeli"
  },
  {
    "code": "95.25.03",
    "title": "Saatlerin yenilenmesi hizmeti faaliyetleri (telefon özelliği olmayan akıllı saatler)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "95.29.02",
    "title": "Giyim eşyası ve ev tekstil ürünlerinin onarımı ve tadilatı (deri giyim eşyaları hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "95.29.03",
    "title": "Spor araç ve gereçleri ile kamp malzemelerinin bakımı ve onarımı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "95.29.04",
    "title": "Anahtar çoğaltma hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "95.29.05",
    "title": "Bisiklet onarımı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "95.29.06",
    "title": "Müzik aletlerinin onarım ve bakımı (piyano akordu dahil, tarihi müzik aletleri hariç)",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "95.29.07",
    "title": "Deri ve deri bileşimli giyim eşyaları ile kürk giyim eşyalarının onarımı",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "95.29.99",
    "title": "Başka yerde sınıflandırılmamış diğer kişisel ve ev eşyalarının onarım ve bakımı"
  },
  {
    "code": "95.31.01",
    "title": "Motorlu kara taşıtlarının genel onarım ve bakımı faaliyetleri"
  },
  {
    "code": "95.31.02",
    "title": "Motorlu kara taşıtlarının lastik onarımı faaliyetleri"
  },
  {
    "code": "95.31.03",
    "title": "Motorlu kara taşıtlarının yağlama, yıkama, cilalama vb. faaliyetleri"
  },
  {
    "code": "95.31.04",
    "title": "Motorlu kara taşıtlarının karoser ve kaporta onarımı vb. faaliyetleri"
  },
  {
    "code": "95.31.05",
    "title": "Motorlu kara taşıtlarının boyanması faaliyetleri"
  },
  {
    "code": "95.31.06",
    "title": "Motorlu kara taşıtlarının elektrik sistemlerinin onarım faaliyetleri"
  },
  {
    "code": "95.31.07",
    "title": "Motorlu kara taşıtların koltuk ve döşemelerinin onarım ve bakımı faaliyetleri"
  },
  {
    "code": "95.31.08",
    "title": "Motorlu kara taşıtlarına yakıt sistemi (benzin, dizel, LPG, CNG, LNG vb.) montajı ve bakımı hizmetleri"
  },
  {
    "code": "95.32.00",
    "title": "Motosikletlerin onarım ve bakımı"
  },
  {
    "code": "95.40.00",
    "title": "Bilgisayarların, kişisel eşyalar ve ev eşyalarının, motorlu kara taşıtlarının ve motosikletlerin onarım ve bakımı için aracılık hizmeti faaliyetleri"
  },
  {
    "code": "96.10.01",
    "title": "Giyim eşyası ve diğer tekstil ürünlerini ütüleme hizmetleri"
  },
  {
    "code": "96.10.02",
    "title": "Çamaşırhane hizmetleri"
  },
  {
    "code": "96.10.03",
    "title": "Kuru temizleme hizmetleri"
  },
  {
    "code": "96.10.04",
    "title": "Halı ve kilim yıkama hizmetleri"
  },
  {
    "code": "96.10.90",
    "title": "Diğer tekstil temizleme hizmetleri ile giyim eşyası ve diğer tekstil ürünlerini boyama ve renklendirme hizmetleri (imalat aşamasında yapılanlar hariç)"
  },
  {
    "code": "96.21.01",
    "title": "Kadınlar için kuaför işletmelerinin faaliyetleri"
  },
  {
    "code": "96.21.02",
    "title": "Erkekler için kuaför ve berber işletmelerinin faaliyetleri"
  },
  {
    "code": "96.22.01",
    "title": "Güzellik salonlarının faaliyetleri (cilt bakımı, kaş alma, ağda, manikür, pedikür, makyaj, kalıcı makyaj vb.nin bir arada sunulduğu salonlar) (sağlık bakım hizmetleri hariç)"
  },
  {
    "code": "96.22.02",
    "title": "Sadece manikür ve pedikür hizmeti sunan salonların faaliyetleri"
  },
  {
    "code": "96.22.03",
    "title": "Sadece ağdacılık hizmeti sunan salonların faaliyetleri"
  },
  {
    "code": "96.23.01",
    "title": "Hamam, sauna, vb. yerlerin faaliyetleri"
  },
  {
    "code": "96.23.02",
    "title": "Zayıflama salonu, masaj salonu, solaryum vb. yerlerin işletilmesi faaliyetleri (form tutma salonlarının ve diyetisyenlerin faaliyetleri hariç)"
  },
  {
    "code": "96.23.03",
    "title": "Kaplıca, ılıca, içmeler, spa merkezleri, vb. yerlerin faaliyetleri (konaklama hizmetleri hariç)"
  },
  {
    "code": "96.30.01",
    "title": "Cenaze işleri ile ilgili faaliyetler (cenaze yıkama yerlerinin işletilmesi, cenazenin nakli, yıkama hizmetleri, defin hizmetleri vb.)"
  },
  {
    "code": "96.30.02",
    "title": "Mezarlıkların satış hizmetleri"
  },
  {
    "code": "96.40.00",
    "title": "Kişisel hizmetler için aracılık hizmeti faaliyetleri"
  },
  {
    "code": "96.91.00",
    "title": "Ev içi kişisel hizmet faaliyetlerinin sağlanması"
  },
  {
    "code": "96.99.01",
    "title": "Eskort ve refakat hizmetleri (güvenlik hizmetleri hariç)"
  },
  {
    "code": "96.99.02",
    "title": "Hamallık hizmetleri"
  },
  {
    "code": "96.99.03",
    "title": "Kendi hesabına çalışan yamak, garson vb. hizmet sunanların faaliyetleri"
  },
  {
    "code": "96.99.04",
    "title": "Ev hayvanları ve terk edilmiş hayvanlar için bakım hizmetleri"
  },
  {
    "code": "96.99.05",
    "title": "Kendi hesabına çalışan valelerin hizmetleri"
  },
  {
    "code": "96.99.06",
    "title": "Fal , astroloji ve spiritualist hizmetleri"
  },
  {
    "code": "96.99.07",
    "title": "Genel tuvaletlerin işletilmesi faaliyeti"
  },
  {
    "code": "96.99.08",
    "title": "Arzuhalcilerin faaliyetleri"
  },
  {
    "code": "96.99.09",
    "title": "Tanıştırma bürolarının ve evlendirme ajanslarının hizmetleri"
  },
  {
    "code": "96.99.10",
    "title": "Jeton ile çalışan kişisel hizmet makinelerinin işletilmesi faaliyetleri (jetonlu makinelerle vesikalık fotoğraf, emanet dolapları, tartı, tansiyon ölçümü vb. hizmetler dahil; oyun ve kumar makineleri ile çamaşırhane hizmetleri hariç)"
  },
  {
    "code": "96.99.11",
    "title": "Ayakkabı boyama hizmetleri"
  },
  {
    "code": "96.99.12",
    "title": "Genelev hizmetleri"
  },
  {
    "code": "96.99.13",
    "title": "Şecere bulma faaliyetleri"
  },
  {
    "code": "96.99.14",
    "title": "Nikah salonlarının hizmetleri"
  },
  {
    "code": "96.99.15",
    "title": "Söz, isteme ve davet evleri hizmetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "96.99.99",
    "title": "Başka yerde sınıflandırılmamış diğer hizmet faaliyetleri (dövme ve piercing hizmetleri vb.)"
  },
  {
    "code": "97.00.10",
    "title": "Ev içi çalışan personelin işverenleri olarak hanehalklarının faaliyetleri",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "98.10.01",
    "title": "Hanehalkları tarafından kendi kullanımlarına yönelik olarak üretilen ayrım yapılmamış mallar",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "98.20.01",
    "title": "Hanehalkları tarafından kendi kullanımlarına yönelik olarak üretilen ayrım yapılmamış hizmetler",
    "hazard": "Az Tehlikeli"
  },
  {
    "code": "99.00.15",
    "title": "Uluslararası örgütler ve temsilciliklerinin faaliyetleri",
    "hazard": "Az Tehlikeli"
  }
]
