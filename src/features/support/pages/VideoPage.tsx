import { motion } from 'framer-motion'
import {
  ArrowRight,
  PlayCircle,
  Star,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

type VideoCategory =
  | 'Tümü'
  | 'Başlangıç'
  | 'Müşteriler'
  | 'Katılımcılar'
  | 'Eğitimler'
  | 'Raporlar'

interface VideoTutorial {
  id: string
  title: string
  duration: string
  category: Exclude<VideoCategory, 'Tümü'>
  description: string
  featured?: boolean
  gradient: string
}

const categoryFilters: VideoCategory[] = [
  'Tümü',
  'Başlangıç',
  'Müşteriler',
  'Katılımcılar',
  'Eğitimler',
  'Raporlar',
]

const videoTutorials: VideoTutorial[] = [
  {
    id: 'v1',
    title: 'Panele ilk adım: 10 dakikada kurulum',
    duration: '10:24',
    category: 'Başlangıç',
    description:
      'Hesap oluşturma, ilk giriş, rol seçimi ve kontrol panelini tanıma sürecini uçtan uca izleyin.',
    featured: true,
    gradient: 'from-brand-600 via-brand-700 to-brand-900',
  },
  {
    id: 'v2',
    title: 'Müşteri ekleme ve sözleşme yönetimi',
    duration: '08:15',
    category: 'Müşteriler',
    description: 'Yeni firma kaydı oluşturun ve sözleşme durumunu takip edin.',
    gradient: 'from-sky-500 via-sky-600 to-sky-800',
  },
  {
    id: 'v3',
    title: 'İSG uzmanı ve doktor atama',
    duration: '06:42',
    category: 'Müşteriler',
    description: 'Müşteri kaydına uzman ve doktor atayarak süreci başlatın.',
    gradient: 'from-violet-500 via-violet-600 to-violet-800',
  },
  {
    id: 'v4',
    title: 'Katılımcı oluşturma ve OTP doğrulama',
    duration: '12:34',
    category: 'Katılımcılar',
    description: 'Katılımcı kayıtlarını oluşturun ve kimlik doğrulamayı tamamlayın.',
    gradient: 'from-amber-500 via-amber-600 to-amber-800',
  },
  {
    id: 'v5',
    title: 'Toplu katılımcı içe aktarma',
    duration: '05:18',
    category: 'Katılımcılar',
    description: 'Excel dosyasıyla toplu katılımcı aktarımını öğrenin.',
    gradient: 'from-rose-500 via-rose-600 to-rose-800',
  },
  {
    id: 'v6',
    title: 'Eğitim planlama ve katılımcı atama',
    duration: '14:07',
    category: 'Eğitimler',
    description: 'Yeni eğitim oturumu oluşturup katılımcı ve eğitmen atayın.',
    gradient: 'from-emerald-500 via-emerald-600 to-emerald-800',
  },
  {
    id: 'v7',
    title: 'Katılım sertifika oluşturma',
    duration: '07:55',
    category: 'Eğitimler',
    description: 'Tamamlanan eğitimler için sertifika üretimini öğrenin.',
    gradient: 'from-teal-500 via-teal-600 to-teal-800',
  },
  {
    id: 'v8',
    title: 'Rapor oluşturma ve dışa aktarma',
    duration: '09:31',
    category: 'Raporlar',
    description: 'Raporları filtreleyin ve Excel/PDF formatında indirin.',
    gradient: 'from-indigo-500 via-indigo-600 to-indigo-800',
  },
]

function categoryBadgeClass(category: string) {
  if (category === 'Başlangıç') return 'bg-brand-50 text-brand-700'
  if (category === 'Müşteriler') return 'bg-sky-50 text-sky-700'
  if (category === 'Katılımcılar') return 'bg-amber-50 text-amber-700'
  if (category === 'Eğitimler') return 'bg-emerald-50 text-emerald-700'
  return 'bg-indigo-50 text-indigo-700'
}

export function VideoPage() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('Tümü')

  const featuredVideo = videoTutorials.find((video) => video.featured) ?? null

  const filteredVideos = useMemo(() => {
    return videoTutorials.filter(
      (video) =>
        !video.featured &&
        (activeCategory === 'Tümü' || video.category === activeCategory),
    )
  }, [activeCategory])

  function handleWatch(title: string) {
    toast.info('Video yakında başlayacak...', {
      description: `"${title}" oynatıcıda açılıyor.`,
    })
  }

  return (
    <div className="space-y-7">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-ink-400">
          <span>Destek</span>
          <span>/</span>
          <span className="text-ink-600">Kullanım videoları</span>
        </div>
        <h1 className="text-2xl font-bold tracking-[-0.035em] text-ink-900 sm:text-[30px]">
          Kullanım videoları
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-ink-500">
          Kısa eğitim videolarıyla panelin tüm modüllerini adım adım öğrenin ve
          en iyi pratikleri keşfedin.
        </p>
      </motion.div>

      {featuredVideo && (
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.04 }}
          className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
        >
          <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
            <button
              type="button"
              onClick={() => handleWatch(featuredVideo.title)}
              className={cn(
                'group relative flex min-h-[260px] items-center justify-center bg-gradient-to-br p-8 text-left lg:min-h-[340px]',
                featuredVideo.gradient,
              )}
            >
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border-[20px] border-white/10" />
              <div className="absolute -bottom-12 left-10 h-40 w-40 rounded-full border-[14px] border-white/10" />
              <div className="relative flex flex-col items-center gap-4 text-center text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                  <Star className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Öne çıkan video
                </span>
                <PlayCircle
                  className="h-16 w-16 transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={1.5}
                />
                <span className="rounded-lg bg-black/25 px-2.5 py-1 text-xs font-semibold backdrop-blur-sm">
                  {featuredVideo.duration}
                </span>
              </div>
            </button>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
              <div>
                <span
                  className={cn(
                    'inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold',
                    categoryBadgeClass(featuredVideo.category),
                  )}
                >
                  {featuredVideo.category}
                </span>
                <h2 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-ink-900 sm:text-xl">
                  {featuredVideo.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-500">
                  {featuredVideo.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<PlayCircle className="h-4 w-4" strokeWidth={1.8} />}
                  onClick={() => handleWatch(featuredVideo.title)}
                >
                  İzle
                </Button>
                <span className="inline-flex items-center gap-1.5 text-xs text-ink-400">
                  <PlayCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
                  {featuredVideo.duration} · {featuredVideo.category}
                </span>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="flex flex-wrap gap-2"
      >
        {categoryFilters.map((category) => {
          const count =
            category === 'Tümü'
              ? videoTutorials.filter((video) => !video.featured).length
              : videoTutorials.filter(
                  (video) => !video.featured && video.category === category,
                ).length
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors',
                activeCategory === category
                  ? 'border-brand-200 bg-brand-50 text-brand-700'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:bg-ink-50',
              )}
            >
              {category}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                  activeCategory === category
                    ? 'bg-brand-600 text-white'
                    : 'bg-ink-100 text-ink-500',
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </motion.div>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredVideos.map((video, index) => (
          <motion.article
            key={video.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]"
          >
            <button
              type="button"
              onClick={() => handleWatch(video.title)}
              className={cn(
                'relative flex h-40 items-center justify-center bg-gradient-to-br transition-transform duration-200 group-hover:scale-[1.01]',
                video.gradient,
              )}
            >
              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full border-[12px] border-white/10" />
              <PlayCircle
                className="relative h-12 w-12 text-white/90 transition-transform duration-200 group-hover:scale-110"
                strokeWidth={1.5}
              />
              <span className="absolute bottom-3 right-3 rounded-lg bg-black/30 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                {video.duration}
              </span>
            </button>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    'inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold',
                    categoryBadgeClass(video.category),
                  )}
                >
                  {video.category}
                </span>
                <span className="text-[11px] font-medium text-ink-400">
                  {video.duration}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold leading-snug text-ink-900">
                  {video.title}
                </h3>
                <p className="mt-1.5 text-xs leading-5 text-ink-500">
                  {video.description}
                </p>
              </div>
              <Button
                variant="subtle"
                size="sm"
                rightIcon={<ArrowRight className="h-4 w-4" strokeWidth={1.8} />}
                onClick={() => handleWatch(video.title)}
                className="w-full"
              >
                İzle
              </Button>
            </div>
          </motion.article>
        ))}
      </section>

      {filteredVideos.length === 0 && (
        <div className="rounded-2xl border border-ink-200/80 bg-white px-6 py-16 text-center shadow-[0_4px_18px_-14px_rgba(17,24,39,0.22)]">
          <PlayCircle className="mx-auto h-8 w-8 text-ink-300" strokeWidth={1.7} />
          <p className="mt-3 text-sm font-semibold text-ink-700">
            Bu kategoride video bulunamadı
          </p>
          <p className="mt-1 text-xs text-ink-400">
            Farklı bir kategori seçerek tekrar deneyin.
          </p>
        </div>
      )}
    </div>
  )
}
