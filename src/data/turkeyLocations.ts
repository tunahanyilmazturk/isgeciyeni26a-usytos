// Source: Turkey provinces and districts dataset (81 provinces / 973 districts), CC-BY public data.
// https://github.com/furkan-dogu/Turkiye-Sehir-ve-Ilceleri
// https://github.com/furkan-dogu/Turkiye-Sehir-ve-Ilceleri/blob/main/il-ilce.json
// Administrative-system count cross-check: https://nvi.gov.tr/mernis

export interface TurkeyLocation {
  province: string
  plateCode: string
  districts: readonly string[]
}

export const turkeyLocations: readonly TurkeyLocation[] = [
  {
    "province": "Adana",
    "plateCode": "01",
    "districts": [
      "Aladağ",
      "Ceyhan",
      "Çukurova",
      "Feke",
      "İmamoğlu",
      "Karaisalı",
      "Karataş",
      "Kozan",
      "Pozantı",
      "Saimbeyli",
      "Sarıçam",
      "Seyhan",
      "Tufanbeyli",
      "Yumurtalık",
      "Yüreğir"
    ]
  },
  {
    "province": "Adıyaman",
    "plateCode": "02",
    "districts": [
      "Merkez",
      "Besni",
      "Çelikhan",
      "Gerger",
      "Gölbaşı",
      "Kahta",
      "Samsat",
      "Sincik",
      "Tut"
    ]
  },
  {
    "province": "Afyonkarahisar",
    "plateCode": "03",
    "districts": [
      "Merkez",
      "Başmakçı",
      "Bayat",
      "Bolvadin",
      "Çay",
      "Çobanlar",
      "Dazkırı",
      "Dinar",
      "Emirdağ",
      "Evciler",
      "Hocalar",
      "İhsaniye",
      "İscehisar",
      "Kızılören",
      "Sandıklı",
      "Sinanpaşa",
      "Sultandağı",
      "Şuhut"
    ]
  },
  {
    "province": "Ağrı",
    "plateCode": "04",
    "districts": [
      "Merkez",
      "Diyadin",
      "Doğubayazıt",
      "Eleşkirt",
      "Hamur",
      "Patnos",
      "Taşlıçay",
      "Tutak"
    ]
  },
  {
    "province": "Amasya",
    "plateCode": "05",
    "districts": [
      "Merkez",
      "Göynücek",
      "Gümüşhacıköy",
      "Hamamözü",
      "Merzifon",
      "Suluova",
      "Taşova"
    ]
  },
  {
    "province": "Ankara",
    "plateCode": "06",
    "districts": [
      "Akyurt",
      "Altındağ",
      "Ayaş",
      "Bala",
      "Beypazarı",
      "Çamlıdere",
      "Çankaya",
      "Çubuk",
      "Elmadağ",
      "Etimesgut",
      "Evren",
      "Gölbaşı",
      "Güdül",
      "Haymana",
      "Kahramankazan",
      "Kalecik",
      "Keçiören",
      "Kızılcahamam",
      "Mamak",
      "Nallıhan",
      "Polatlı",
      "Pursaklar",
      "Sincan",
      "Şereflikoçhisar",
      "Yenimahalle"
    ]
  },
  {
    "province": "Antalya",
    "plateCode": "07",
    "districts": [
      "Akseki",
      "Aksu",
      "Alanya",
      "Demre",
      "Döşemealtı",
      "Elmalı",
      "Finike",
      "Gazipaşa",
      "Gündoğmuş",
      "İbradı",
      "Kaş",
      "Kemer",
      "Kepez",
      "Konyaaltı",
      "Korkuteli",
      "Kumluca",
      "Manavgat",
      "Muratpaşa",
      "Serik"
    ]
  },
  {
    "province": "Artvin",
    "plateCode": "08",
    "districts": [
      "Merkez",
      "Ardanuç",
      "Arhavi",
      "Borçka",
      "Hopa",
      "Kemalpaşa",
      "Murgul",
      "Şavşat",
      "Yusufeli"
    ]
  },
  {
    "province": "Aydın",
    "plateCode": "09",
    "districts": [
      "Bozdoğan",
      "Buharkent",
      "Çine",
      "Didim",
      "Efeler",
      "Germencik",
      "İncirliova",
      "Karacasu",
      "Karpuzlu",
      "Koçarlı",
      "Köşk",
      "Kuşadası",
      "Kuyucak",
      "Nazilli",
      "Söke",
      "Sultanhisar",
      "Yenipazar"
    ]
  },
  {
    "province": "Balıkesir",
    "plateCode": "10",
    "districts": [
      "Altıeylül",
      "Ayvalık",
      "Balya",
      "Bandırma",
      "Bigadiç",
      "Burhaniye",
      "Dursunbey",
      "Edremit",
      "Erdek",
      "Gömeç",
      "Gönen",
      "Havran",
      "İvrindi",
      "Karesi",
      "Kepsut",
      "Manyas",
      "Marmara",
      "Savaştepe",
      "Sındırgı",
      "Susurluk"
    ]
  },
  {
    "province": "Bilecik",
    "plateCode": "11",
    "districts": [
      "Merkez",
      "Bozüyük",
      "Gölpazarı",
      "İnhisar",
      "Osmaneli",
      "Pazaryeri",
      "Söğüt",
      "Yenipazar"
    ]
  },
  {
    "province": "Bingöl",
    "plateCode": "12",
    "districts": [
      "Merkez",
      "Adaklı",
      "Genç",
      "Karlıova",
      "Kiğı",
      "Solhan",
      "Yayladere",
      "Yedisu"
    ]
  },
  {
    "province": "Bitlis",
    "plateCode": "13",
    "districts": [
      "Merkez",
      "Adilcevaz",
      "Ahlat",
      "Güroymak",
      "Hizan",
      "Mutki",
      "Tatvan"
    ]
  },
  {
    "province": "Bolu",
    "plateCode": "14",
    "districts": [
      "Merkez",
      "Dörtdivan",
      "Gerede",
      "Göynük",
      "Kıbrıscık",
      "Mengen",
      "Mudurnu",
      "Seben",
      "Yeniçağa"
    ]
  },
  {
    "province": "Burdur",
    "plateCode": "15",
    "districts": [
      "Merkez",
      "Ağlasun",
      "Altınyayla",
      "Bucak",
      "Çavdır",
      "Çeltikçi",
      "Gölhisar",
      "Karamanlı",
      "Kemer",
      "Tefenni",
      "Yeşilova"
    ]
  },
  {
    "province": "Bursa",
    "plateCode": "16",
    "districts": [
      "Büyükorhan",
      "Gemlik",
      "Gürsu",
      "Harmancık",
      "İnegöl",
      "İznik",
      "Karacabey",
      "Keles",
      "Kestel",
      "Mudanya",
      "Mustafakemalpaşa",
      "Nilüfer",
      "Orhaneli",
      "Orhangazi",
      "Osmangazi",
      "Yenişehir",
      "Yıldırım"
    ]
  },
  {
    "province": "Çanakkale",
    "plateCode": "17",
    "districts": [
      "Merkez",
      "Ayvacık",
      "Bayramiç",
      "Biga",
      "Bozcaada",
      "Çan",
      "Eceabat",
      "Ezine",
      "Gelibolu",
      "Gökçeada",
      "Lapseki",
      "Yenice"
    ]
  },
  {
    "province": "Çankırı",
    "plateCode": "18",
    "districts": [
      "Merkez",
      "Atkaracalar",
      "Bayramören",
      "Çerkeş",
      "Eldivan",
      "Ilgaz",
      "Kızılırmak",
      "Korgun",
      "Kurşunlu",
      "Orta",
      "Şabanözü",
      "Yapraklı"
    ]
  },
  {
    "province": "Çorum",
    "plateCode": "19",
    "districts": [
      "Merkez",
      "Alaca",
      "Bayat",
      "Boğazkale",
      "Dodurga",
      "İskilip",
      "Kargı",
      "Laçin",
      "Mecitözü",
      "Oğuzlar",
      "Ortaköy",
      "Osmancık",
      "Sungurlu",
      "Uğurludağ"
    ]
  },
  {
    "province": "Denizli",
    "plateCode": "20",
    "districts": [
      "Acıpayam",
      "Babadağ",
      "Baklan",
      "Bekilli",
      "Beyağaç",
      "Bozkurt",
      "Buldan",
      "Çal",
      "Çameli",
      "Çardak",
      "Çivril",
      "Güney",
      "Honaz",
      "Kale",
      "Merkezefendi",
      "Pamukkale",
      "Sarayköy",
      "Serinhisar",
      "Tavas"
    ]
  },
  {
    "province": "Diyarbakır",
    "plateCode": "21",
    "districts": [
      "Bağlar",
      "Bismil",
      "Çermik",
      "Çınar",
      "Çüngüş",
      "Dicle",
      "Eğil",
      "Ergani",
      "Hani",
      "Hazro",
      "Kayapınar",
      "Kocaköy",
      "Kulp",
      "Lice",
      "Silvan",
      "Sur",
      "Yenişehir"
    ]
  },
  {
    "province": "Edirne",
    "plateCode": "22",
    "districts": [
      "Merkez",
      "Enez",
      "Havsa",
      "İpsala",
      "Keşan",
      "Lalapaşa",
      "Meriç",
      "Süloğlu",
      "Uzunköprü"
    ]
  },
  {
    "province": "Elazığ",
    "plateCode": "23",
    "districts": [
      "Merkez",
      "Ağın",
      "Alacakaya",
      "Arıcak",
      "Baskil",
      "Karakoçan",
      "Keban",
      "Kovancılar",
      "Maden",
      "Palu",
      "Sivrice"
    ]
  },
  {
    "province": "Erzincan",
    "plateCode": "24",
    "districts": [
      "Merkez",
      "Çayırlı",
      "İliç",
      "Kemah",
      "Kemaliye",
      "Otlukbeli",
      "Refahiye",
      "Tercan",
      "Üzümlü"
    ]
  },
  {
    "province": "Erzurum",
    "plateCode": "25",
    "districts": [
      "Aşkale",
      "Aziziye",
      "Çat",
      "Hınıs",
      "Horasan",
      "İspir",
      "Karaçoban",
      "Karayazı",
      "Köprüköy",
      "Narman",
      "Oltu",
      "Olur",
      "Palandöken",
      "Pasinler",
      "Pazaryolu",
      "Şenkaya",
      "Tekman",
      "Tortum",
      "Uzundere",
      "Yakutiye"
    ]
  },
  {
    "province": "Eskişehir",
    "plateCode": "26",
    "districts": [
      "Alpu",
      "Beylikova",
      "Çifteler",
      "Günyüzü",
      "Han",
      "İnönü",
      "Mahmudiye",
      "Mihalgazi",
      "Mihalıççık",
      "Odunpazarı",
      "Sarıcakaya",
      "Seyitgazi",
      "Sivrihisar",
      "Tepebaşı"
    ]
  },
  {
    "province": "Gaziantep",
    "plateCode": "27",
    "districts": [
      "Araban",
      "İslahiye",
      "Karkamış",
      "Nizip",
      "Nurdağı",
      "Oğuzeli",
      "Şahinbey",
      "Şehitkamil",
      "Yavuzeli"
    ]
  },
  {
    "province": "Giresun",
    "plateCode": "28",
    "districts": [
      "Merkez",
      "Alucra",
      "Bulancak",
      "Çamoluk",
      "Çanakçı",
      "Dereli",
      "Doğankent",
      "Espiye",
      "Eynesil",
      "Görele",
      "Güce",
      "Keşap",
      "Piraziz",
      "Şebinkarahisar",
      "Tirebolu",
      "Yağlıdere"
    ]
  },
  {
    "province": "Gümüşhane",
    "plateCode": "29",
    "districts": [
      "Merkez",
      "Kelkit",
      "Köse",
      "Kürtün",
      "Şiran",
      "Torul"
    ]
  },
  {
    "province": "Hakkari",
    "plateCode": "30",
    "districts": [
      "Merkez",
      "Çukurca",
      "Derecik",
      "Şemdinli",
      "Yüksekova"
    ]
  },
  {
    "province": "Hatay",
    "plateCode": "31",
    "districts": [
      "Altınözü",
      "Antakya",
      "Arsuz",
      "Belen",
      "Defne",
      "Dörtyol",
      "Erzin",
      "Hassa",
      "İskenderun",
      "Kırıkhan",
      "Kumlu",
      "Payas",
      "Reyhanlı",
      "Samandağ",
      "Yayladağı"
    ]
  },
  {
    "province": "Isparta",
    "plateCode": "32",
    "districts": [
      "Merkez",
      "Aksu",
      "Atabey",
      "Eğirdir",
      "Gelendost",
      "Gönen",
      "Keçiborlu",
      "Senirkent",
      "Sütçüler",
      "Şarkikaraağaç",
      "Uluborlu",
      "Yalvaç",
      "Yenişarbademli"
    ]
  },
  {
    "province": "Mersin",
    "plateCode": "33",
    "districts": [
      "Akdeniz",
      "Anamur",
      "Aydıncık",
      "Bozyazı",
      "Çamlıyayla",
      "Erdemli",
      "Gülnar",
      "Mezitli",
      "Mut",
      "Silifke",
      "Tarsus",
      "Toroslar",
      "Yenişehir"
    ]
  },
  {
    "province": "İstanbul",
    "plateCode": "34",
    "districts": [
      "Adalar",
      "Arnavutköy",
      "Ataşehir",
      "Avcılar",
      "Bağcılar",
      "Bahçelievler",
      "Bakırköy",
      "Başakşehir",
      "Bayrampaşa",
      "Beşiktaş",
      "Beykoz",
      "Beylikdüzü",
      "Beyoğlu",
      "Büyükçekmece",
      "Çatalca",
      "Çekmeköy",
      "Esenler",
      "Esenyurt",
      "Eyüpsultan",
      "Fatih",
      "Gaziosmanpaşa",
      "Güngören",
      "Kadıköy",
      "Kağıthane",
      "Kartal",
      "Küçükçekmece",
      "Maltepe",
      "Pendik",
      "Sancaktepe",
      "Sarıyer",
      "Silivri",
      "Sultanbeyli",
      "Sultangazi",
      "Şile",
      "Şişli",
      "Tuzla",
      "Ümraniye",
      "Üsküdar",
      "Zeytinburnu"
    ]
  },
  {
    "province": "İzmir",
    "plateCode": "35",
    "districts": [
      "Aliağa",
      "Balçova",
      "Bayındır",
      "Bayraklı",
      "Bergama",
      "Beydağ",
      "Bornova",
      "Buca",
      "Çeşme",
      "Çiğli",
      "Dikili",
      "Foça",
      "Gaziemir",
      "Güzelbahçe",
      "Karabağlar",
      "Karaburun",
      "Karşıyaka",
      "Kemalpaşa",
      "Kınık",
      "Kiraz",
      "Konak",
      "Menderes",
      "Menemen",
      "Narlıdere",
      "Ödemiş",
      "Seferihisar",
      "Selçuk",
      "Tire",
      "Torbalı",
      "Urla"
    ]
  },
  {
    "province": "Kars",
    "plateCode": "36",
    "districts": [
      "Merkez",
      "Akyaka",
      "Arpaçay",
      "Digor",
      "Kağızman",
      "Sarıkamış",
      "Selim",
      "Susuz"
    ]
  },
  {
    "province": "Kastamonu",
    "plateCode": "37",
    "districts": [
      "Merkez",
      "Abana",
      "Ağlı",
      "Araç",
      "Azdavay",
      "Bozkurt",
      "Cide",
      "Çatalzeytin",
      "Daday",
      "Devrekani",
      "Doğanyurt",
      "Hanönü",
      "İhsangazi",
      "İnebolu",
      "Küre",
      "Pınarbaşı",
      "Seydiler",
      "Şenpazar",
      "Taşköprü",
      "Tosya"
    ]
  },
  {
    "province": "Kayseri",
    "plateCode": "38",
    "districts": [
      "Akkışla",
      "Bünyan",
      "Develi",
      "Felahiye",
      "Hacılar",
      "İncesu",
      "Kocasinan",
      "Melikgazi",
      "Özvatan",
      "Pınarbaşı",
      "Sarıoğlan",
      "Sarız",
      "Talas",
      "Tomarza",
      "Yahyalı",
      "Yeşilhisar"
    ]
  },
  {
    "province": "Kırklareli",
    "plateCode": "39",
    "districts": [
      "Merkez",
      "Babaeski",
      "Demirköy",
      "Kofçaz",
      "Lüleburgaz",
      "Pehlivanköy",
      "Pınarhisar",
      "Vize"
    ]
  },
  {
    "province": "Kırşehir",
    "plateCode": "40",
    "districts": [
      "Merkez",
      "Akçakent",
      "Akpınar",
      "Boztepe",
      "Çiçekdağı",
      "Kaman",
      "Mucur"
    ]
  },
  {
    "province": "Kocaeli",
    "plateCode": "41",
    "districts": [
      "Başiskele",
      "Çayırova",
      "Darıca",
      "Derince",
      "Dilovası",
      "Gebze",
      "Gölcük",
      "İzmit",
      "Kandıra",
      "Karamürsel",
      "Kartepe",
      "Körfez"
    ]
  },
  {
    "province": "Konya",
    "plateCode": "42",
    "districts": [
      "Ahırlı",
      "Akören",
      "Akşehir",
      "Altınekin",
      "Beyşehir",
      "Bozkır",
      "Cihanbeyli",
      "Çeltik",
      "Çumra",
      "Derbent",
      "Derebucak",
      "Doğanhisar",
      "Emirgazi",
      "Ereğli",
      "Güneysınır",
      "Hadim",
      "Halkapınar",
      "Hüyük",
      "Ilgın",
      "Kadınhanı",
      "Karapınar",
      "Karatay",
      "Kulu",
      "Meram",
      "Sarayönü",
      "Selçuklu",
      "Seydişehir",
      "Taşkent",
      "Tuzlukçu",
      "Yalıhüyük",
      "Yunak"
    ]
  },
  {
    "province": "Kütahya",
    "plateCode": "43",
    "districts": [
      "Merkez",
      "Altıntaş",
      "Aslanapa",
      "Çavdarhisar",
      "Domaniç",
      "Dumlupınar",
      "Emet",
      "Gediz",
      "Hisarcık",
      "Pazarlar",
      "Simav",
      "Şaphane",
      "Tavşanlı"
    ]
  },
  {
    "province": "Malatya",
    "plateCode": "44",
    "districts": [
      "Akçadağ",
      "Arapgir",
      "Arguvan",
      "Battalgazi",
      "Darende",
      "Doğanşehir",
      "Doğanyol",
      "Hekimhan",
      "Kale",
      "Kuluncak",
      "Pütürge",
      "Yazıhan",
      "Yeşilyurt"
    ]
  },
  {
    "province": "Manisa",
    "plateCode": "45",
    "districts": [
      "Ahmetli",
      "Akhisar",
      "Alaşehir",
      "Demirci",
      "Gölmarmara",
      "Gördes",
      "Kırkağaç",
      "Köprübaşı",
      "Kula",
      "Salihli",
      "Sarıgöl",
      "Saruhanlı",
      "Selendi",
      "Soma",
      "Şehzadeler",
      "Turgutlu",
      "Yunusemre"
    ]
  },
  {
    "province": "Kahramanmaraş",
    "plateCode": "46",
    "districts": [
      "Afşin",
      "Andırın",
      "Çağlayancerit",
      "Dulkadiroğlu",
      "Ekinözü",
      "Elbistan",
      "Göksun",
      "Nurhak",
      "Onikişubat",
      "Pazarcık",
      "Türkoğlu"
    ]
  },
  {
    "province": "Mardin",
    "plateCode": "47",
    "districts": [
      "Artuklu",
      "Dargeçit",
      "Derik",
      "Kızıltepe",
      "Mazıdağı",
      "Midyat",
      "Nusaybin",
      "Ömerli",
      "Savur",
      "Yeşilli"
    ]
  },
  {
    "province": "Muğla",
    "plateCode": "48",
    "districts": [
      "Bodrum",
      "Dalaman",
      "Datça",
      "Fethiye",
      "Kavaklıdere",
      "Köyceğiz",
      "Marmaris",
      "Menteşe",
      "Milas",
      "Ortaca",
      "Seydikemer",
      "Ula",
      "Yatağan"
    ]
  },
  {
    "province": "Muş",
    "plateCode": "49",
    "districts": [
      "Merkez",
      "Bulanık",
      "Hasköy",
      "Korkut",
      "Malazgirt",
      "Varto"
    ]
  },
  {
    "province": "Nevşehir",
    "plateCode": "50",
    "districts": [
      "Merkez",
      "Acıgöl",
      "Avanos",
      "Derinkuyu",
      "Gülşehir",
      "Hacıbektaş",
      "Kozaklı",
      "Ürgüp"
    ]
  },
  {
    "province": "Niğde",
    "plateCode": "51",
    "districts": [
      "Merkez",
      "Altunhisar",
      "Bor",
      "Çamardı",
      "Çiftlik",
      "Ulukışla"
    ]
  },
  {
    "province": "Ordu",
    "plateCode": "52",
    "districts": [
      "Akkuş",
      "Altınordu",
      "Aybastı",
      "Çamaş",
      "Çatalpınar",
      "Çaybaşı",
      "Fatsa",
      "Gölköy",
      "Gülyalı",
      "Gürgentepe",
      "İkizce",
      "Kabadüz",
      "Kabataş",
      "Korgan",
      "Kumru",
      "Mesudiye",
      "Perşembe",
      "Ulubey",
      "Ünye"
    ]
  },
  {
    "province": "Rize",
    "plateCode": "53",
    "districts": [
      "Merkez",
      "Ardeşen",
      "Çamlıhemşin",
      "Çayeli",
      "Derepazarı",
      "Fındıklı",
      "Güneysu",
      "Hemşin",
      "İkizdere",
      "İyidere",
      "Kalkandere",
      "Pazar"
    ]
  },
  {
    "province": "Sakarya",
    "plateCode": "54",
    "districts": [
      "Adapazarı",
      "Akyazı",
      "Arifiye",
      "Erenler",
      "Ferizli",
      "Geyve",
      "Hendek",
      "Karapürçek",
      "Karasu",
      "Kaynarca",
      "Kocaali",
      "Pamukova",
      "Sapanca",
      "Serdivan",
      "Söğütlü",
      "Taraklı"
    ]
  },
  {
    "province": "Samsun",
    "plateCode": "55",
    "districts": [
      "Alaçam",
      "Asarcık",
      "Atakum",
      "Ayvacık",
      "Bafra",
      "Canik",
      "Çarşamba",
      "Havza",
      "İlkadım",
      "Kavak",
      "Ladik",
      "19 mayıs",
      "Salıpazarı",
      "Tekkeköy",
      "Terme",
      "Vezirköprü",
      "Yakakent"
    ]
  },
  {
    "province": "Siirt",
    "plateCode": "56",
    "districts": [
      "Merkez",
      "Baykan",
      "Eruh",
      "Kurtalan",
      "Pervari",
      "Şirvan",
      "Tillo"
    ]
  },
  {
    "province": "Sinop",
    "plateCode": "57",
    "districts": [
      "Merkez",
      "Ayancık",
      "Boyabat",
      "Dikmen",
      "Durağan",
      "Erfelek",
      "Gerze",
      "Saraydüzü",
      "Türkeli"
    ]
  },
  {
    "province": "Sivas",
    "plateCode": "58",
    "districts": [
      "Merkez",
      "Akıncılar",
      "Altınyayla",
      "Divriği",
      "Doğanşar",
      "Gemerek",
      "Gölova",
      "Gürün",
      "Hafik",
      "İmranlı",
      "Kangal",
      "Koyulhisar",
      "Suşehri",
      "Şarkışla",
      "Ulaş",
      "Yıldızeli",
      "Zara"
    ]
  },
  {
    "province": "Tekirdağ",
    "plateCode": "59",
    "districts": [
      "Çerkezköy",
      "Çorlu",
      "Ergene",
      "Hayrabolu",
      "Kapaklı",
      "Malkara",
      "Marmaraereğlisi",
      "Muratlı",
      "Saray",
      "Süleymanpaşa",
      "Şarköy"
    ]
  },
  {
    "province": "Tokat",
    "plateCode": "60",
    "districts": [
      "Merkez",
      "Almus",
      "Artova",
      "Başçiftlik",
      "Erbaa",
      "Niksar",
      "Pazar",
      "Reşadiye",
      "Sulusaray",
      "Turhal",
      "Yeşilyurt",
      "Zile"
    ]
  },
  {
    "province": "Trabzon",
    "plateCode": "61",
    "districts": [
      "Akçaabat",
      "Araklı",
      "Arsin",
      "Beşikdüzü",
      "Çarşıbaşı",
      "Çaykara",
      "Dernekpazarı",
      "Düzköy",
      "Hayrat",
      "Köprübaşı",
      "Maçka",
      "Of",
      "Ortahisar",
      "Sürmene",
      "Şalpazarı",
      "Tonya",
      "Vakfıkebir",
      "Yomra"
    ]
  },
  {
    "province": "Tunceli",
    "plateCode": "62",
    "districts": [
      "Merkez",
      "Çemişgezek",
      "Hozat",
      "Mazgirt",
      "Nazımiye",
      "Ovacık",
      "Pertek",
      "Pülümür"
    ]
  },
  {
    "province": "Şanlıurfa",
    "plateCode": "63",
    "districts": [
      "Akçakale",
      "Birecik",
      "Bozova",
      "Ceylanpınar",
      "Eyyübiye",
      "Halfeti",
      "Haliliye",
      "Harran",
      "Hilvan",
      "Karaköprü",
      "Siverek",
      "Suruç",
      "Viranşehir"
    ]
  },
  {
    "province": "Uşak",
    "plateCode": "64",
    "districts": [
      "Merkez",
      "Banaz",
      "Eşme",
      "Karahallı",
      "Sivaslı",
      "Ulubey"
    ]
  },
  {
    "province": "Van",
    "plateCode": "65",
    "districts": [
      "Bahçesaray",
      "Başkale",
      "Çaldıran",
      "Çatak",
      "Edremit",
      "Erciş",
      "Gevaş",
      "Gürpınar",
      "İpekyolu",
      "Muradiye",
      "Özalp",
      "Saray",
      "Tuşba"
    ]
  },
  {
    "province": "Yozgat",
    "plateCode": "66",
    "districts": [
      "Merkez",
      "Akdağmadeni",
      "Aydıncık",
      "Boğazlıyan",
      "Çandır",
      "Çayıralan",
      "Çekerek",
      "Kadışehri",
      "Saraykent",
      "Sarıkaya",
      "Sorgun",
      "Şefaatli",
      "Yenifakılı",
      "Yerköy"
    ]
  },
  {
    "province": "Zonguldak",
    "plateCode": "67",
    "districts": [
      "Merkez",
      "Alaplı",
      "Çaycuma",
      "Devrek",
      "Ereğli",
      "Gökçebey",
      "Kilimli",
      "Kozlu"
    ]
  },
  {
    "province": "Aksaray",
    "plateCode": "68",
    "districts": [
      "Merkez",
      "Ağaçören",
      "Eskil",
      "Gülağaç",
      "Güzelyurt",
      "Ortaköy",
      "Sarıyahşi",
      "Sultanhanı"
    ]
  },
  {
    "province": "Bayburt",
    "plateCode": "69",
    "districts": [
      "Merkez",
      "Aydıntepe",
      "Demirözü"
    ]
  },
  {
    "province": "Karaman",
    "plateCode": "70",
    "districts": [
      "Merkez",
      "Ayrancı",
      "Başyayla",
      "Ermenek",
      "Kazımkarabekir",
      "Sarıveliler"
    ]
  },
  {
    "province": "Kırıkkale",
    "plateCode": "71",
    "districts": [
      "Merkez",
      "Bahşılı",
      "Balışeyh",
      "Çelebi",
      "Delice",
      "Karakeçili",
      "Keskin",
      "Sulakyurt",
      "Yahşihan"
    ]
  },
  {
    "province": "Batman",
    "plateCode": "72",
    "districts": [
      "Merkez",
      "Beşiri",
      "Gercüş",
      "Hasankeyf",
      "Kozluk",
      "Sason"
    ]
  },
  {
    "province": "Şırnak",
    "plateCode": "73",
    "districts": [
      "Merkez",
      "Beytüşşebap",
      "Cizre",
      "Güçlükonak",
      "İdil",
      "Silopi",
      "Uludere"
    ]
  },
  {
    "province": "Bartın",
    "plateCode": "74",
    "districts": [
      "Merkez",
      "Amasra",
      "Kurucaşile",
      "Ulus"
    ]
  },
  {
    "province": "Ardahan",
    "plateCode": "75",
    "districts": [
      "Merkez",
      "Çıldır",
      "Damal",
      "Göle",
      "Hanak",
      "Posof"
    ]
  },
  {
    "province": "Iğdır",
    "plateCode": "76",
    "districts": [
      "Merkez",
      "Aralık",
      "Karakoyunlu",
      "Tuzluca"
    ]
  },
  {
    "province": "Yalova",
    "plateCode": "77",
    "districts": [
      "Merkez",
      "Altınova",
      "Armutlu",
      "Çınarcık",
      "Çiftlikköy",
      "Termal"
    ]
  },
  {
    "province": "Karabük",
    "plateCode": "78",
    "districts": [
      "Merkez",
      "Eflani",
      "Eskipazar",
      "Ovacık",
      "Safranbolu",
      "Yenice"
    ]
  },
  {
    "province": "Kilis",
    "plateCode": "79",
    "districts": [
      "Merkez",
      "Elbeyli",
      "Musabeyli",
      "Polateli"
    ]
  },
  {
    "province": "Osmaniye",
    "plateCode": "80",
    "districts": [
      "Merkez",
      "Bahçe",
      "Düziçi",
      "Hasanbeyli",
      "Kadirli",
      "Sumbas",
      "Toprakkale"
    ]
  },
  {
    "province": "Düzce",
    "plateCode": "81",
    "districts": [
      "Merkez",
      "Akçakoca",
      "Cumayeri",
      "Çilimli",
      "Gölyaka",
      "Gümüşova",
      "Kaynaşlı",
      "Yığılca"
    ]
  }
]
