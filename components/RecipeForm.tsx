'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import type { RecipeFormValues, ScanResult } from '@/lib/types'
import { DIAL_CONFIGS } from '@/lib/types'
import { FILM_SIMULATIONS } from '@/lib/filmSimulations'
import { FilmSwatch } from './FilmSwatch'
import { AIScanButton } from './AIScanButton'

interface RecipeFormProps {
  mode: 'create' | 'edit'
  initialValues?: Partial<RecipeFormValues>
  onSubmit: (values: RecipeFormValues) => Promise<void>
}

const DEFAULT_VALUES: RecipeFormValues = {
  name: '',
  film_simulation: 'provia',
  dynamic_range: 'Auto',
  grain_effect: 'Off',
  color_chrome_effect: 'Off',
  color_chrome_effect_blue: 'Off',
  white_balance: 'Auto (AWB)',
  white_balance_k: undefined,
  wb_red_shift: 0,
  wb_blue_shift: 0,
  highlight: 0,
  shadow: 0,
  color: 0,
  sharpness: 0,
  noise_reduction: 0,
  clarity: 0,
  iso: '',
  exposure_compensation: '',
  camera_body: '',
  is_favorite: false,
  notes: '',
}

const WB_PRESETS = [
  'Auto (AWB)',
  'Auto White Priority',
  'Auto Ambience Priority',
  'Daylight',
  'Shade',
  'Fluorescent (Daylight)',
  'Fluorescent (Warm)',
  'Fluorescent (Cold)',
  'Incandescent',
  'Underwater',
  'Color Temperature (K)',
]

const DYNAMIC_RANGE_OPTIONS = ['Auto', 'DR100', 'DR200', 'DR400']

const GRAIN_OPTIONS = [
  'Off',
  'Weak Small',
  'Weak Large',
  'Strong Small',
  'Strong Large',
]

const CCE_OPTIONS = ['Off', 'Weak', 'Strong']

export function RecipeForm({ mode, initialValues, onSubmit }: RecipeFormProps) {
  const router = useRouter()
  const { register, control, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm<RecipeFormValues>({
    defaultValues: { ...DEFAULT_VALUES, ...initialValues },
  })

  const watchedSim = watch('film_simulation')
  const watchedWB = watch('white_balance')

  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([key, value]) => {
        setValue(key as keyof RecipeFormValues, value as never)
      })
    }
  }, [initialValues, setValue])

  const handleScanComplete = (result: ScanResult) => {
    const fieldMap: Array<[keyof ScanResult, keyof RecipeFormValues]> = [
      ['name', 'name'],
      ['film_simulation', 'film_simulation'],
      ['dynamic_range', 'dynamic_range'],
      ['grain_effect', 'grain_effect'],
      ['color_chrome_effect', 'color_chrome_effect'],
      ['color_chrome_effect_blue', 'color_chrome_effect_blue'],
      ['white_balance', 'white_balance'],
      ['white_balance_k', 'white_balance_k'],
      ['wb_red_shift', 'wb_red_shift'],
      ['wb_blue_shift', 'wb_blue_shift'],
      ['highlight', 'highlight'],
      ['shadow', 'shadow'],
      ['color', 'color'],
      ['sharpness', 'sharpness'],
      ['noise_reduction', 'noise_reduction'],
      ['clarity', 'clarity'],
      ['iso', 'iso'],
      ['exposure_compensation', 'exposure_compensation'],
    ]

    // Match film simulation key from label
    if (result.film_simulation) {
      const sim = FILM_SIMULATIONS.find(
        (s) =>
          s.label.toLowerCase() === result.film_simulation!.toLowerCase() ||
          s.key.toLowerCase() === result.film_simulation!.toLowerCase().replace(/\s/g, '_')
      )
      if (sim) setValue('film_simulation', sim.key)
    }

    fieldMap.forEach(([from, to]) => {
      if (from === 'film_simulation') return
      const val = result[from]
      if (val !== undefined && val !== null && val !== '') {
        setValue(to, val as never)
      }
    })
  }

  const submit = handleSubmit(async (values) => {
    // Clean up undefined optional fields
    const clean = { ...values }
    if (clean.white_balance !== 'Color Temperature (K)') {
      clean.white_balance_k = undefined
    }
    await onSubmit(clean)
  })

  const inputClass =
    'w-full bg-bg-tertiary border border-border-primary rounded-lg px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors placeholder:text-text-tertiary'
  const selectClass = inputClass + ' pr-8'
  const labelClass = 'block text-text-secondary text-xs mb-1.5'
  const sectionHeadClass = 'text-text-tertiary text-[11px] font-mono uppercase tracking-widest mb-3 mt-5'

  return (
    <div className="min-h-screen bg-bg-primary pb-32">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-bg-primary/95 backdrop-blur-sm border-b border-border-primary">
        <div className="flex items-center justify-between px-4 pt-14 pb-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-text-secondary text-sm"
          >
            Cancel
          </button>
          <h1 className="font-display font-semibold text-text-primary text-base">
            {mode === 'create' ? <><span className="italic">New</span> recipe</> : 'Edit recipe'}
          </h1>
          <button
            type="button"
            onClick={submit}
            disabled={isSubmitting}
            className="text-accent text-sm font-medium disabled:opacity-50"
          >
            {isSubmitting ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <form onSubmit={submit} className="px-4 space-y-1">
        {/* AI Scan */}
        <div className="pt-4">
          <AIScanButton onScanComplete={handleScanComplete} />
        </div>

        {/* Preview strip */}
        <div className="pt-3">
          <FilmSwatch simulation={watchedSim} height="h-12" variant="form" className="rounded-xl">
            <div className="absolute inset-0 flex items-center px-3">
              <span className="font-mono text-white/90 text-xs">
                {FILM_SIMULATIONS.find((s) => s.key === watchedSim)?.label ?? watchedSim}
              </span>
            </div>
          </FilmSwatch>
        </div>

        {/* Recipe name */}
        <div className="pt-3">
          <label className={labelClass}>Recipe Name</label>
          <input
            {...register('name', { required: true })}
            placeholder="e.g. Golden Hour Street"
            className={inputClass}
          />
        </div>

        {/* Film simulation */}
        <div>
          <p className={sectionHeadClass}>Film Simulation</p>
          <div className="grid grid-cols-2 gap-2">
            {FILM_SIMULATIONS.map((sim) => (
              <button
                key={sim.key}
                type="button"
                onClick={() => setValue('film_simulation', sim.key)}
                className={`relative rounded-lg overflow-hidden h-12 text-left transition-all ${
                  watchedSim === sim.key
                    ? 'ring-2 ring-accent'
                    : 'ring-1 ring-border-primary'
                }`}
              >
                <div className="absolute inset-0" style={{ background: sim.formGradient }} />
                <div className="absolute inset-0 flex items-center px-2.5">
                  <span className="font-mono text-white text-[10px] leading-tight drop-shadow-sm">
                    {sim.label}
                  </span>
                </div>
                {watchedSim === sim.key && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                    <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dials */}
        <div>
          <p className={sectionHeadClass}>Tone & Color Dials</p>
          <div className="bg-bg-card border border-border-primary rounded-xl overflow-hidden">
            {DIAL_CONFIGS.map((dial) => (
              <Controller
                key={dial.key}
                name={dial.key}
                control={control}
                render={({ field }) => {
                  const v = Number(field.value)
                  return (
                    <div className="px-4 py-3 border-b border-border-primary last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-text-secondary text-sm">{dial.label}</span>
                        <span
                          className={`font-mono text-sm font-medium ${
                            v > 0
                              ? 'text-dial-pos'
                              : v < 0
                              ? 'text-dial-neg'
                              : 'text-text-tertiary'
                          }`}
                        >
                          {v > 0 ? `+${v}` : v}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={dial.min}
                        max={dial.max}
                        step={dial.step ?? 1}
                        value={v}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )
                }}
              />
            ))}
          </div>
        </div>

        {/* Camera settings */}
        <div>
          <p className={sectionHeadClass}>Camera Settings</p>
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Dynamic Range</label>
              <select {...register('dynamic_range')} className={selectClass}>
                {DYNAMIC_RANGE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className={labelClass}>Grain Effect</label>
              <select {...register('grain_effect')} className={selectClass}>
                {GRAIN_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className={labelClass}>Color Chrome FX</label>
              <select {...register('color_chrome_effect')} className={selectClass}>
                {CCE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className={labelClass}>Color Chrome FX Blue</label>
              <select {...register('color_chrome_effect_blue')} className={selectClass}>
                {CCE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className={labelClass}>White Balance</label>
              <select {...register('white_balance')} className={selectClass}>
                {WB_PRESETS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            {/* Color Temperature — only for K preset */}
            {watchedWB === 'Color Temperature (K)' && (
              <div className="pl-3 border-l-2 border-accent/40">
                <label className={labelClass}>Color Temperature (K)</label>
                <input
                  type="number"
                  min={2500}
                  max={10000}
                  {...register('white_balance_k', { valueAsNumber: true })}
                  placeholder="e.g. 5500"
                  className={inputClass}
                />
              </div>
            )}

            {/* Red / Blue Shift — available for all WB presets */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Red Shift (-9 to +9)</label>
                <input
                  type="number"
                  min={-9}
                  max={9}
                  {...register('wb_red_shift', { valueAsNumber: true })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Blue Shift (-9 to +9)</label>
                <input
                  type="number"
                  min={-9}
                  max={9}
                  {...register('wb_blue_shift', { valueAsNumber: true })}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>ISO</label>
              <input
                {...register('iso')}
                placeholder="e.g. Auto up to 6400"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Exposure Compensation</label>
              <input
                {...register('exposure_compensation')}
                placeholder="e.g. +1/3"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Camera Body (optional)</label>
              <input
                {...register('camera_body')}
                placeholder="e.g. X-T5, X100VI"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Favorite */}
        <div className="flex items-center justify-between py-3 border-t border-border-primary mt-4">
          <span className="text-text-secondary text-sm">Mark as Favourite</span>
          <Controller
            name="is_favorite"
            control={control}
            render={({ field }) => (
              <button
                type="button"
                onClick={() => field.onChange(!field.value)}
                className={`text-2xl transition-colors ${field.value ? 'text-gold' : 'text-text-tertiary'}`}
              >
                {field.value ? '★' : '☆'}
              </button>
            )}
          />
        </div>

        {/* Notes */}
        <div>
          <label className={labelClass}>Notes (optional)</label>
          <textarea
            {...register('notes')}
            placeholder="Best shooting conditions, tips, when to use…"
            rows={3}
            className={inputClass + ' resize-none'}
          />
        </div>

        {/* Bottom save button */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 pb-8 pt-3 bg-bg-primary/95 backdrop-blur-sm border-t border-border-primary">
          <button
            type="submit"
            disabled={isSubmitting}
            onClick={submit}
            className="w-full py-3.5 rounded-xl bg-accent text-white font-medium disabled:opacity-50 active:scale-[0.98] transition-transform"
          >
            {isSubmitting ? 'Saving…' : mode === 'create' ? 'Save Recipe' : 'Update Recipe'}
          </button>
        </div>
      </form>
    </div>
  )
}
