import { Stamp, Trash2, Upload } from 'lucide-react'
import { useRef, type ChangeEvent } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui'

type StampUploadFieldProps = {
  image: string
  fileName: string
  onChange: (image: string, fileName: string) => void
  ownerLabel: string
}

export function StampUploadField({ image, fileName, onChange, ownerLabel }: StampUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Yalnızca JPG, PNG veya WEBP görselleri kullanılabilir.')
      event.target.value = ''
      return
    }
    if (file.size > 1.5 * 1024 * 1024) {
      toast.error('Kaşe görseli 1,5 MB sınırını aşamaz.')
      event.target.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = () => onChange(String(reader.result), file.name)
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  return (
    <section className="rounded-2xl border border-brand-200 bg-brand-50/40 p-4">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-700 ring-1 ring-brand-100"><Stamp className="h-5 w-5" /></span>
        <div><p className="text-sm font-semibold text-ink-800">Onay kaşesi</p><p className="mt-1 text-[11px] leading-4 text-ink-500">{ownerLabel} eğitimi onayladığında bu kaşe sertifikaya otomatik eklenir.</p></div>
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="grid h-28 flex-1 place-items-center overflow-hidden rounded-xl border border-dashed border-brand-200 bg-white p-3">
          {image ? <img src={image} alt={`${ownerLabel} kaşesi önizlemesi`} className="max-h-24 max-w-full object-contain" /> : <div className="text-center text-ink-300"><Stamp className="mx-auto h-6 w-6" /><p className="mt-1 text-[10px]">Şeffaf arka planlı PNG önerilir</p></div>}
        </div>
        <div className="flex gap-2 sm:flex-col">
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFile} className="hidden" />
          <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} leftIcon={<Upload className="h-3.5 w-3.5" />}>{image ? 'Kaşeyi değiştir' : 'Kaşe yükle'}</Button>
          {image && <Button type="button" variant="ghost" size="sm" onClick={() => onChange('', '')} leftIcon={<Trash2 className="h-3.5 w-3.5" />}>Kaşeyi kaldır</Button>}
        </div>
      </div>
      {fileName && <p className="mt-2 truncate text-[10px] font-semibold text-brand-700">{fileName}</p>}
    </section>
  )
}
