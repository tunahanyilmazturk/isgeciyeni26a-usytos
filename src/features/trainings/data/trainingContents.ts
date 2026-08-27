import { z } from 'zod'
import { readStorage } from '@/lib/storage'

export type ContentType = 'video' | 'quiz' | 'article' | 'scorm'

export interface Question {
  id: string
  text: string
  options: { id: string; text: string }[]
  correctOptionId: string
  explanation: string
}

export interface Quiz {
  id: string
  title: string
  durationMinutes: number
  passingScore: number
  maxAttempts: number
  questions: Question[]
}

export interface TrainingContent {
  id: string
  chapterId: string
  trainingId: string
  title: string
  type: ContentType
  durationMinutes: number
  videoUrl?: string
  scormUrl?: string
  articleText?: string
  quiz?: Quiz
}

export interface ChapterContent {
  id: string
  title: string
  contents: TrainingContent[]
}

export interface TrainingContentMap {
  trainingId: string
  chapters: ChapterContent[]
}

const questionSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.array(z.object({ id: z.string(), text: z.string() })),
  correctOptionId: z.string(),
  explanation: z.string(),
})

const quizSchema = z.object({
  id: z.string(),
  title: z.string(),
  durationMinutes: z.number(),
  passingScore: z.number(),
  maxAttempts: z.number(),
  questions: z.array(questionSchema),
})

const trainingContentSchema = z.object({
  id: z.string(),
  chapterId: z.string(),
  trainingId: z.string(),
  title: z.string(),
  type: z.enum(['video', 'quiz', 'article', 'scorm']),
  durationMinutes: z.number(),
  videoUrl: z.string().optional(),
  scormUrl: z.string().optional(),
  articleText: z.string().optional(),
  quiz: quizSchema.optional(),
})

const chapterContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  contents: z.array(trainingContentSchema),
})

const trainingContentMapSchema = z.object({
  trainingId: z.string(),
  chapters: z.array(chapterContentSchema),
})

const allTrainingContentsSchema = z.array(trainingContentMapSchema)

export const TRAINING_CONTENTS_STORAGE_KEY = 'hantech-training-contents'

/** Tüm eğitim içerik haritasını döner */
export function readTrainingContents(): TrainingContentMap[] {
  return readStorage(TRAINING_CONTENTS_STORAGE_KEY, allTrainingContents, allTrainingContentsSchema)
}

/** Tek bir eğitimin içerik haritasını döner */
export function getTrainingContents(trainingId: string): TrainingContentMap | undefined {
  return readTrainingContents().find((t) => t.trainingId === trainingId)
}

/** Bir eğitimdeki toplam içerik sayısını döner */
export function getTrainingContentCount(trainingId: string): number {
  const map = getTrainingContents(trainingId)
  if (!map) return 0
  return map.chapters.reduce((sum, ch) => sum + ch.contents.length, 0)
}

/** Bir eğitimdeki tüm content'leri düz bir dizi olarak döner (sıralı) */
export function flattenTrainingContents(trainingId: string): TrainingContent[] {
  const map = getTrainingContents(trainingId)
  if (!map) return []
  return map.chapters.flatMap((ch) => ch.contents)
}

const allTrainingContents: TrainingContentMap[] = [
  {
    trainingId: 'base-medium',
    chapters: [
      {
        id: 'general',
        title: '1. Genel Konular',
        contents: [
          {
            id: 'general-1-video',
            chapterId: 'general',
            trainingId: 'base-medium',
            title: '1.1) Çalışma Mevzuatı İle İlgili Bilgiler',
            type: 'video',
            durationMinutes: 8,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          },
          {
            id: 'general-1-quiz',
            chapterId: 'general',
            trainingId: 'base-medium',
            title: '1.1) Çalışma Mevzuatı — Alıştırma Testi',
            type: 'quiz',
            durationMinutes: 3,
            quiz: {
              id: 'general-1-quiz',
              title: 'Çalışma Mevzuatı İle İlgili Bilgiler',
              durationMinutes: 3,
              passingScore: 60,
              maxAttempts: 3,
              questions: [
                {
                  id: 'q1',
                  text: '6331 sayılı İş Sağlığı ve Güvenliği Kanunu\'na göre, "Genç çalışan" ifadesi hangi yaş aralığını tanımlar?',
                  options: [
                    { id: 'a', text: '14 yaşını bitirmiş ancak 18 yaşını doldurmamış çalışan' },
                    { id: 'b', text: '15 yaşını bitirmiş ancak 18 yaşını doldurmamış çalışan' },
                    { id: 'c', text: '16 yaşını bitirmiş ancak 18 yaşını doldurmamış çalışan' },
                    { id: 'd', text: '15 yaşını bitirmiş ancak 17 yaşını doldurmamış çalışan' },
                  ],
                  correctOptionId: 'a',
                  explanation: 'Kanununa göre genç çalışan, 14 yaşını bitirmiş ancak 18 yaşını doldurmamış çalışandır.',
                },
                {
                  id: 'q2',
                  text: 'İşveren, iş kazalarını kazadan sonra en geç kaç iş günü içinde Sosyal Güvenlik Kurumuna bildirmekle yükümlüdür?',
                  options: [
                    { id: 'a', text: '1 iş günü' },
                    { id: 'b', text: '2 iş günü' },
                    { id: 'c', text: '3 iş günü' },
                    { id: 'd', text: '4 iş günü' },
                  ],
                  correctOptionId: 'c',
                  explanation: 'İş kazaları en geç 3 iş günü içinde SGK\'ya bildirilmelidir.',
                },
                {
                  id: 'q3',
                  text: 'İş sağlığı ve güvenliği açısından, çalışma ortamındaki kurallara uymak kimin temel görevidir?',
                  options: [
                    { id: 'a', text: 'Sadece İşverenin' },
                    { id: 'b', text: 'Çalışanın (İşçinin)' },
                    { id: 'c', text: 'Sadece Devletin' },
                    { id: 'd', text: 'Müşterilerin' },
                  ],
                  correctOptionId: 'b',
                  explanation: 'Çalışanların da iş sağlığı ve güvenliği kurallarına uyması temel görevidir.',
                },
                {
                  id: 'q4',
                  text: 'İş sağlığı ve güvenliği çalışmalarının en temel amacı aşağıdakilerden hangisidir?',
                  options: [
                    { id: 'a', text: 'Yalnızca işyerinin karını artırmak' },
                    { id: 'b', text: 'Çalışanların maaşlarını belirlemek' },
                    { id: 'c', text: 'Sağlıklı ve güvenli bir çalışma ortamı sağlamak' },
                    { id: 'd', text: 'Çalışma saatlerini kısaltmak' },
                  ],
                  correctOptionId: 'c',
                  explanation: 'İSG çalışmalarının temel amacı sağlıklı ve güvenli bir çalışma ortamı sağlamaktır.',
                },
                {
                  id: 'q5',
                  text: 'Çalışana, işyerine veya iş ekipmanına zarar verme potansiyeli taşıdığı halde hiçbir zarara yol açmadan ucuz atlatılan olaylara ne ad verilir?',
                  options: [
                    { id: 'a', text: 'İş Kazası' },
                    { id: 'b', text: 'Ramak Kala Olay' },
                    { id: 'c', text: 'Meslek Hastalığı' },
                    { id: 'd', text: 'Acil Durum' },
                  ],
                  correctOptionId: 'b',
                  explanation: 'Zarar verme potansiyeli taşıyan ancak ucuz atlatılan olaylara "Ramak Kala Olay" denir.',
                },
              ],
            },
          },
          {
            id: 'general-2-video',
            chapterId: 'general',
            trainingId: 'base-medium',
            title: '1.2) Çalışanların Yasal Hak ve Sorumlulukları',
            type: 'video',
            durationMinutes: 10,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          },
          {
            id: 'general-2-quiz',
            chapterId: 'general',
            trainingId: 'base-medium',
            title: '1.2) Çalışan Hakları — Alıştırma Testi',
            type: 'quiz',
            durationMinutes: 3,
            quiz: {
              id: 'general-2-quiz',
              title: 'Çalışanların Yasal Hak ve Sorumlukları',
              durationMinutes: 3,
              passingScore: 60,
              maxAttempts: 3,
              questions: [
                {
                  id: 'q1',
                  text: '6331 Sayılı Kanun\'a göre işyerinde ciddi ve yakın tehlike ile karşılaşan çalışan için ücret hakları nasıldır?',
                  options: [
                    { id: 'a', text: 'Çalışmadığı döneme ait ücreti kesilir.' },
                    { id: 'b', text: 'Ücreti yarım olarak ödenir.' },
                    { id: 'c', text: 'Ücreti ile diğer hakları saklı kalır, kesinti yapılamaz.' },
                    { id: 'd', text: 'Ücretinden %25 kesinti yapılarak ödenir.' },
                  ],
                  correctOptionId: 'c',
                  explanation: 'Çalışma hakkını kullanan çalışanın ücreti ve diğer hakları saklı kalır.',
                },
                {
                  id: 'q2',
                  text: '4857 Sayılı İş Kanunu\'na göre, 5 yıldan 15 yıla kadar kıdemi bulunan çalışanın yıllık ücretli izin süresi en az kaç gündür?',
                  options: [
                    { id: 'a', text: '14 gün' },
                    { id: 'b', text: '20 gün' },
                    { id: 'c', text: '40 gün' },
                    { id: 'd', text: '60 gün' },
                  ],
                  correctOptionId: 'b',
                  explanation: '5-15 yıl kıdemi olan çalışan için yıllık izin en az 20 gündür.',
                },
                {
                  id: 'q3',
                  text: 'Günlük çalışma süresi 7,5 saatten fazla süren işlerde asgari ara dinlenmesi süresi ne kadardır?',
                  options: [
                    { id: 'a', text: '5 dakika' },
                    { id: 'b', text: '15 dakika' },
                    { id: 'c', text: '30 dakika' },
                    { id: 'd', text: '1 saat' },
                  ],
                  correctOptionId: 'c',
                  explanation: '7,5 saatten fazla çalışmalarda asgari mola süresi 30 dakikadır.',
                },
                {
                  id: 'q4',
                  text: 'Hastalık sebebiyle SGK istirahat raporu alan bir çalışanın geçici iş göremezlik ödeneği ne zaman başlar?',
                  options: [
                    { id: 'a', text: '1. günden itibaren' },
                    { id: 'b', text: '3. günden itibaren' },
                    { id: 'c', text: '15. günden itibaren' },
                    { id: 'd', text: '10. günden itibaren' },
                  ],
                  correctOptionId: 'b',
                  explanation: 'Hastalık raporlarında geçici iş göremezlik ödeneği 3. günden itibaren başlar.',
                },
                {
                  id: 'q5',
                  text: 'İşverenin tazminatsız fesih hakkını kullanabilmesi için öncelikle yapması gereken yasal usul nedir?',
                  options: [
                    { id: 'a', text: 'Derhal fesih hakkı vardır' },
                    { id: 'b', text: 'İSG Kuruluna şikayet etmek' },
                    { id: 'c', text: 'Yazılı olarak 2 kez uyarmak' },
                    { id: 'd', text: 'Yazılı olarak 4 kez uyarmak' },
                  ],
                  correctOptionId: 'c',
                  explanation: 'Tazminatsız fesih için önce yazılı olarak 2 kez uyarı yapılması gerekir.',
                },
              ],
            },
          },
          {
            id: 'general-3-video',
            chapterId: 'general',
            trainingId: 'base-medium',
            title: '1.3) İşyeri Temizliği ve Düzeni',
            type: 'video',
            durationMinutes: 7,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          },
          {
            id: 'general-3-quiz',
            chapterId: 'general',
            trainingId: 'base-medium',
            title: '1.3) İşyeri Temizliği — Alıştırma Testi',
            type: 'quiz',
            durationMinutes: 3,
            quiz: {
              id: 'general-3-quiz',
              title: 'İşyeri Temizliği ve Düzeni',
              durationMinutes: 3,
              passingScore: 60,
              maxAttempts: 3,
              questions: [
                {
                  id: 'q1',
                  text: 'Yere sıvı döküldüğünde ilk ne yapılmalıdır?',
                  options: [
                    { id: 'a', text: 'Kendi kendine kurumasını beklemek' },
                    { id: 'b', text: 'Üzerine basıp geçmek' },
                    { id: 'c', text: 'Olası kaza riskine karşı hemen temizlemek' },
                    { id: 'd', text: 'Mesai bitiminde temizlemek' },
                  ],
                  correctOptionId: 'c',
                  explanation: 'Dökülen sıvı kayma riski oluşturur, hemen temizlenmelidir.',
                },
                {
                  id: 'q2',
                  text: 'Gereksiz malzemeleri uzaklaştırmak, aletleri düzenlemek için uygulanan 5 adımlık sistem nedir?',
                  options: [
                    { id: 'a', text: '5S Uygulamaları' },
                    { id: 'b', text: 'İnsan Kaynakları Yönetimi' },
                    { id: 'c', text: 'Acil Durum Planı' },
                    { id: 'd', text: 'Yıllık Planlar' },
                  ],
                  correctOptionId: 'a',
                  explanation: '5S Uygulamaları (Seiri, Seiton, Seiso, Seiketsu, Shitsuke) düzen ve temizlik sistemidir.',
                },
                {
                  id: 'q3',
                  text: 'Alet, edevat ve malzemeleri kendi yerine koyma işlemine ne ad verilir?',
                  options: [
                    { id: 'a', text: 'Risk Analizi' },
                    { id: 'b', text: 'Sosyal Tesis Yönetimi' },
                    { id: 'c', text: 'Geri Dönüşüm' },
                    { id: 'd', text: 'Tertip ve Düzen' },
                  ],
                  correctOptionId: 'd',
                  explanation: 'Aletlerin kendi yerine konması tertip ve düzen prensibine uygundur.',
                },
                {
                  id: 'q4',
                  text: 'İşyerinde hijyeni sağlamak amacıyla işverene düşen yükümlülüklerden biri değildir?',
                  options: [
                    { id: 'a', text: 'Temizlik ekipmanı ve personeli temin etmek' },
                    { id: 'b', text: 'Temizlik prosedürleri oluşturmak' },
                    { id: 'c', text: 'Çalışanlara hijyen eğitimi vermek' },
                    { id: 'd', text: 'Sorumluluğu tamamen işçilere bırakmak' },
                  ],
                  correctOptionId: 'd',
                  explanation: 'Hijyen sorumluluğu yönetime aittir, tamamen işçilere bırakılamaz.',
                },
                {
                  id: 'q5',
                  text: 'İşyeri temizliği hangi kanuna dayanan yönetmelikle düzenlenmiştir?',
                  options: [
                    { id: 'a', text: '4857 sayılı İş Kanunu' },
                    { id: 'b', text: '6331 sayılı İş Sağlığı ve Güvenliği Kanunu' },
                    { id: 'c', text: '5510 sayılı Sosyal Sigortalar Kanunu' },
                    { id: 'd', text: 'Umumi Hıfzıssıhha Kanunu' },
                  ],
                  correctOptionId: 'b',
                  explanation: 'İşyeri temizliği 6331 sayılı İSG Kanunu kapsamındaki yönetmelikle düzenlenir.',
                },
              ],
            },
          },
          {
            id: 'general-4-video',
            chapterId: 'general',
            trainingId: 'base-medium',
            title: '1.4) İş Kazası ve Meslek Hastalığından Doğan Hukuki Sonuçlar',
            type: 'video',
            durationMinutes: 9,
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          },
          {
            id: 'general-4-quiz',
            chapterId: 'general',
            trainingId: 'base-medium',
            title: '1.4) Hukuki Sonuçlar — Alıştırma Testi',
            type: 'quiz',
            durationMinutes: 3,
            quiz: {
              id: 'general-4-quiz',
              title: 'İş Kazası ve Meslek Hastalığından Doğan Hukuki Sonuçlar',
              durationMinutes: 3,
              passingScore: 60,
              maxAttempts: 3,
              questions: [
                {
                  id: 'q1',
                  text: 'İş kazası geçiren bir çalışanın tazminat talepleri için başvurması gereken mahkeme hangisidir?',
                  options: [
                    { id: 'a', text: 'Aile Mahkemeleri' },
                    { id: 'b', text: 'İş Mahkemeleri' },
                    { id: 'c', text: 'Tüketici Mahkemeleri' },
                    { id: 'd', text: 'İdare Mahkemeleri' },
                  ],
                  correctOptionId: 'b',
                  explanation: 'İş kazası tazminat davaları İş Mahkemelerinde görülür.',
                },
                {
                  id: 'q2',
                  text: 'Sürekli iş göremezlik geliri bağlanması için kazanma gücü kayıp oranı en az yüzde kaç olmalıdır?',
                  options: [
                    { id: 'a', text: '%5' },
                    { id: 'b', text: '%10' },
                    { id: 'c', text: '%25' },
                    { id: 'd', text: '%50' },
                  ],
                  correctOptionId: 'b',
                  explanation: 'Sürekli iş göremezlik geliri için kazanma gücü kaybı en az %10 olmalıdır.',
                },
                {
                  id: 'q3',
                  text: 'Tedavi gördüğü hekimden "çalışabilir" raporu almadan işe başlayan işçinin geçici iş göremezlik ödeneği için SGK ne yapar?',
                  options: [
                    { id: 'a', text: 'Gelirinin yarısı kesilir' },
                    { id: 'b', text: 'Ödeme tam olarak devam eder' },
                    { id: 'c', text: 'Hiçbir ödeme yapılmaz' },
                    { id: 'd', text: 'Geliri dörtte bir oranında eksiltilir' },
                  ],
                  correctOptionId: 'c',
                  explanation: 'Raporsuz çalışmada geçici iş göremezlik ödeneği yapılmaz.',
                },
                {
                  id: 'q4',
                  text: 'İş kazası veya meslek hastalığı sonucu ölen çalışanın desteğinden yoksun kalan kişilerin açabildiği dava nedir?',
                  options: [
                    { id: 'a', text: 'Destekten Yoksun Kalma Tazminatı' },
                    { id: 'b', text: 'Rücu Tazminat Davası' },
                    { id: 'c', text: 'Manevi Tazminat Davası' },
                    { id: 'd', text: 'İş Göremezlik Tazminatı' },
                  ],
                  correctOptionId: 'a',
                  explanation: 'Destekten yoksun kalma tazminatı, ölen çalışanın bakımından yararlananlar için açılır.',
                },
                {
                  id: 'q5',
                  text: 'Türk Ceza Hukuku\'nda iş kazalarıyla ilgili suçlar genellikle dikkat ve özen yükümlülüğüne uyulmamasıyla gerçekleşir. Buna ne ad verilir?',
                  options: [
                    { id: 'a', text: 'Sabotaj' },
                    { id: 'b', text: 'Rücu' },
                    { id: 'c', text: 'İhmal' },
                    { id: 'd', text: 'Taksir' },
                  ],
                  correctOptionId: 'd',
                  explanation: 'Bilinçli kötülük yoksa, dikkatsizlik ve tedbirsizlik sonucu iş kazasına taksir denir.',
                },
              ],
            },
          },
        ],
      },
    ],
  },
]

export { allTrainingContents }
