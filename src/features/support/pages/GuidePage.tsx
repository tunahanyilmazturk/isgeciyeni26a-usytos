import { motion } from 'framer-motion'
import {
  BookOpen,
  ChevronDown,
  ExternalLink,
  LifeBuoy,
  Search,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

type CategoryId =
  | 'baslangic'
  | 'musteri'
  | 'katilimci'
  | 'egitimler'
  | 'raporlar'
  | 'sistem'

interface Category {
  id: CategoryId
  label: string
  icon: typeof BookOpen
}

interface GuideTopic {
  id: string
  category: CategoryId
  title: string
  description: string
  steps: string[]
}

const categories: Category[] = [
  { id: 'baslangic', label: 'Başlangıç', icon: BookOpen },
  { id: 'musteri', label: 'Müşteri yönetimi', icon: BookOpen },
  { id: 'katilimci', label: 'Katılımcı yönetimi', icon: BookOpen },
  { id: 'egitimler', label: 'Eğitimler', icon: BookOpen },
  { id: 'raporlar', label: 'Raporlar', icon: BookOpen },
  { id: 'sistem', label: 'Sistem ayarları', icon: BookOpen },
]

const guideTopics: GuideTopic[] = [
  {
    id: 'g1',
    category: 'baslangic',
    title: 'Hesabınıza ilk giriş',
    description: 'Panelinize ilk kez giriş yaparken izlemeniz gereken adımlar.',
    steps: [
      'Giriş ekranından e-posta ve şifrenizi girin.',
      'İki adımlı doğrulama etkinse telefonunuza gelen kodu onaylayın.',
      'Karşılama ekranından rolünüzü seçerek panele devam edin.',
    ],
  },
  {
    id: 'g2',
    category: 'baslangic',
    title: 'Panel genel bakış',
    description: 'Ana menüyü, kısayolları ve kontrol panelini tanıyın.',
    steps: [
      'Sol menüden modüller arasında geçiş yapın.',
      'Kontrol panelinde özet kartları ve son aktiviteleri inceleyin.',
      'Sağ üst köşeden profil ve bildirim ayarlarına erişin.',
    ],
  },
  {
    id: 'g3',
    category: 'musteri',
    title: 'Yeni müşteri ekleme',
    description: 'Firma bilgilerini girerek portföyünüze yeni kayıt ekleyin.',
    steps: [
      'Müşteriler modülünden "Yeni müşteri" butonuna tıklayın.',
      'Firma unvanı, vergi numarası ve iletişim bilgilerini doldurun.',
      'Tehlike sınıfı ve sözleşme durumunu seçip kaydedin.',
    ],
  },
  {
    id: 'g4',
    category: 'musteri',
    title: 'İSG uzmanı ve doktor atama',
    description: 'Müşteri kaydına uzman ve doktor atayarak süreci başlatın.',
    steps: [
      'Müşteri detayından "Atamalar" sekmesini açın.',
      'Uzman ve doktor listesinden uygun personeli seçin.',
      'Atama tarihini belirleyip onaya gönderin.',
    ],
  },
  {
    id: 'g5',
    category: 'katilimci',
    title: 'Katılımcı oluşturma',
    description: 'Eğitime katılacak personel kayıtlarını oluşturun.',
    steps: [
      'Katılımcılar modülünden "Yeni katılımcı" butonuna tıklayın.',
      'T.C. kimlik no, ad soyad ve pozisyon bilgilerini girin.',
      'Bağlı olduğu firmayı seçip kaydedin.',
    ],
  },
  {
    id: 'g6',
    category: 'katilimci',
    title: 'Katılımcı doğrulama',
    description: 'Katılımcı kimlik bilgilerini OTP ile doğrulayın.',
    steps: [
      'Katılımcı listesinden doğrulama bekleyen kaydı seçin.',
      'OTP kanalını (e-posta veya SMS) belirleyin.',
      'Gönderilen kodu girerek doğrulamayı tamamlayın.',
    ],
  },
  {
    id: 'g7',
    category: 'egitimler',
    title: 'Eğitim planlama',
    description: 'Yeni bir eğitim oturumu oluşturup katılımcı atayın.',
    steps: [
      'Eğitimler modülünden "Yeni eğitim" butonuna tıklayın.',
      'Eğitim tipi, tarih ve süreyi belirleyin.',
      'Katılımcı listesini ekleyip eğitmen atamasını yapın.',
    ],
  },
  {
    id: 'g8',
    category: 'raporlar',
    title: 'Rapor dışa aktarma',
    description: 'Oluşturduğunuz raporları Excel veya PDF olarak indirin.',
    steps: [
      'Raporlar modülünden ilgili raporu açın.',
      'Tarih aralığı ve filtreleri uygulayın.',
      '"Dışa aktar" butonundan format seçerek indirin.',
    ],
  },
  {
    id: 'g9',
    category: 'sistem',
    title: 'Kullanıcı yetkilendirme',
    description: 'Panel kullanıcılarını rolleriyle birlikte yönetin.',
    steps: [
      'Sistem ayarları > Kullanıcılar bölümüne girin.',
      '"Yeni kullanıcı" butonundan kullanıcı bilgilerini girin.',
      'Rol ve modül yetkilerini belirleyip kaydedin.',
    ],
  },
  {
    id: 'g10',
    category: 'sistem',
    title: 'Şirket bilgileri',
    description: 'OSGB firma bilgilerinizi ve iletişim ayarlarınızı güncelleyin.',
    steps: [
      'Sistem ayarları > Şirket bilgileri bölümünü açın.',
      'Firma unvanı, vergi ve adres bilgilerini güncelleyin.',
      'Değişiklikleri kaydedip bildirim ayarlarını kontrol edin.',
    ],
  },
]

export function GuidePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredTopics = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR')
    return guideTopics.filter((topic) => {
      const matchesCategory = activeCategory === 'all' || topic.category === activeCategory
      const haystack = `${topic.title} ${topic.description}`.toLocaleLowerCase('tr-TR')
      return matchesCategory && (!query || haystack.includes(query))
    })
  }, [activeCategory, search])

  function toggleTopic(id: string) {
    setExpandedId((current) => (current === id ? null : id))
  }

  function openHelpCenter() {
    toast.info('Yardım merkezi yakında yeni sekmede açılacak.')
  }

  return (
    <div className="space-y-7">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"
      >
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
            <span>Destek</span>
            <span>/</span>
            <span className="text-ink-600">Kullanım kılavuzu</span>
          </div>
          <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">
            Kullanım kılavuzu
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-500">
            Panele hızlı bir başlangıç yapın, modülleri adım adım öğrenin ve sık
            kullanılan işlemleri keşfedin.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ExternalLink className="h-4 w-4" />}
            onClick={openHelpCenter}
          >
            Yardım merkezi
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.04 }}
        className="relative"
      >
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Konu, başlık veya anahtar kelime ara..."
          className="h-11 w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 text-sm text-ink-800 outline-none transition-all placeholder:text-ink-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
        />
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <motion.aside
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="h-fit rounded-2xl border border-ink-200/80 bg-white p-3 shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)] lg:sticky lg:top-6"
        >
          <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-ink-400">
            Kategoriler
          </p>
          <nav className="space-y-1">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={cn(
                'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                activeCategory === 'all'
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
              )}
            >
              <span className="flex items-center gap-2.5">
                <LifeBuoy className="h-4 w-4" strokeWidth={1.7} />
                Tüm konular
              </span>
              <span className="text-[11px] font-semibold text-ink-400">
                {guideTopics.length}
              </span>
            </button>
            {categories.map((category) => {
              const count = guideTopics.filter(
                (topic) => topic.category === category.id,
              ).length
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                    activeCategory === category.id
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <category.icon className="h-4 w-4" strokeWidth={1.7} />
                    {category.label}
                  </span>
                  <span className="text-[11px] font-semibold text-ink-400">
                    {count}
                  </span>
                </button>
              )
            })}
          </nav>
        </motion.aside>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className="space-y-3"
        >
          {filteredTopics.length === 0 && (
            <div className="rounded-2xl border border-ink-200/80 bg-white px-6 py-16 text-center shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
              <Search className="mx-auto h-8 w-8 text-ink-300" />
              <p className="mt-3 text-sm font-semibold text-ink-700">
                Konu bulunamadı
              </p>
              <p className="mt-1 text-xs text-ink-400">
                Aramanızı veya kategori seçimini değiştirerek tekrar deneyin.
              </p>
            </div>
          )}
          {filteredTopics.map((topic, index) => {
            const isOpen = expandedId === topic.id
            const categoryLabel =
              categories.find((category) => category.id === topic.category)?.label ??
              ''
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
              >
                <button
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink-50/50 sm:px-6"
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
                      {categoryLabel}
                    </span>
                    <h3 className="mt-1 text-sm font-semibold text-ink-900">
                      {topic.title}
                    </h3>
                    <p className="mt-1 text-xs text-ink-500">{topic.description}</p>
                  </div>
                  <span
                    className={cn(
                      'inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-colors',
                      isOpen
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-ink-400 hover:bg-ink-100 hover:text-ink-700',
                    )}
                  >
                    {isOpen ? 'Daha az' : 'Daha fazla'}
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform duration-200',
                        isOpen && 'rotate-180',
                      )}
                      strokeWidth={1.8}
                    />
                  </span>
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-ink-100 px-5 py-4 sm:px-6"
                  >
                    <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                      Adımlar
                    </p>
                    <ol className="space-y-2.5">
                      {topic.steps.map((step, stepIndex) => (
                        <li
                          key={stepIndex}
                          className="flex items-start gap-3 text-sm text-ink-700"
                        >
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-brand-50 text-[11px] font-bold text-brand-700">
                            {stepIndex + 1}
                          </span>
                          <span className="leading-6">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </motion.section>
      </div>
    </div>
  )
}
