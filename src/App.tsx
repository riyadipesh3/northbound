import { useEffect, useRef, useState, type ReactNode } from 'react'

/* Shared primitives. Scroll reveal uses IntersectionObserver, never a scroll
   listener, and collapses to fully visible under prefers-reduced-motion. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Sections: heading stacks vertically, never a split-header */
function SectionHead({
  kicker,
  title,
  body,
}: {
  kicker?: string
  title: string
  body?: string
}) {
  return (
    <div className="max-w-2xl">
      {kicker ? <p className="micro mb-5">{kicker}</p> : null}
      <h2 className="display display-lg">{title}</h2>
      {body ? <p className="lede mt-6">{body}</p> : null}
    </div>
  )
}

const DESTINATIONS = [
  {
    place: 'Ilulissat',
    country: 'Greenland',
    note: 'Icefjord calving and dog sled runs from the town edge.',
    window: 'May to September',
    seed: 'northbound-ilulissat-icefjord-calving',
    alt: 'Icebergs drifting out of the Ilulissat icefjord at dusk',
  },
  {
    place: 'Disko Island',
    country: 'Greenland',
    note: 'A fishing island with reindeer, and no road to anywhere.',
    window: 'June to August',
    seed: 'northbound-disko-island-arctic-hills',
    alt: 'Low green hills and a rocky shore on Disko Island',
  },
  {
    place: 'Upernavik',
    country: 'Greenland',
    note: 'Small-town Greenland, reached by air and then by boat.',
    window: 'May to September',
    seed: 'northbound-upernavik-thule-coast-fjord',
    alt: 'A narrow fjord channel leading north past Upernavik',
  },
  {
    place: 'Svalbard',
    country: 'Norway',
    note: 'Glacier fronts, sea ice, and walrus colonies by zodiac.',
    window: 'July to August',
    seed: 'northbound-svalbard-glacier-front-sea-ice',
    alt: 'Sea ice and a glacier front on the coast of Svalbard',
  },
  {
    place: 'Senja',
    country: 'Norway',
    note: 'The Norway of the postcards, at the wrong end of the map.',
    window: 'June to September',
    seed: 'northbound-senja-fjord-mountains',
    alt: 'Sharp peaks rising from a narrow fjord on Senja',
  },
  {
    place: 'Lyngen Alps',
    country: 'Norway',
    note: 'Glacier approaches and a ski line almost at sea level.',
    window: 'June to July',
    seed: 'northbound-lyngen-alps-snow-summit',
    alt: 'A snow summit in the Lyngen Alps above the fjord',
  },
]

type Day = { day: number; title: string; note: string }

const TRIPS: {
  id: string
  name: string
  days: number
  group: number
  price: string
  season: string
  start: string
  lead: string
  blurb: string
  seed: string
  alt: string
  itinerary: Day[]
}[] = [
  {
    id: 'icefjord-crossing',
    name: 'Icefjord Crossing',
    days: 5,
    group: 10,
    price: '£4,850',
    season: 'June to August',
    start: 'Ilulissat, Greenland',
    lead: 'Led by Halldora Vigfusson',
    blurb:
      'Five days moving north by boat through the icefjord, sleeping two nights in a hunter cabin on the fast ice.',
    seed: 'northbound-trip-icefjord-crossing-boat',
    alt: 'An open boat crossing an icefjord channel with icebergs either side',
    itinerary: [
      { day: 1, title: 'Arrive Ilulissat', note: 'Transfer from the airstrip, gear fitting, evening walk to the Sermeq soak.' },
      { day: 2, title: 'Into the fjord', note: 'Boat north through the fast ice. First night in a wooden cabin at Ukneq.' },
      { day: 3, title: 'The calving face', note: 'A full day on the water beside the glacier wall, then a night on the ice.' },
      { day: 4, title: 'Hunting cabin day', note: 'Sled dogs, a walk out to the sealing grounds, dinner cooked on a stove.' },
      { day: 5, title: 'Return to town', note: 'Slow boat south, kit return, and a final dinner in town.' },
    ],
  },
  {
    id: 'svalbard-summit-week',
    name: 'Svalbard Summit Week',
    days: 9,
    group: 12,
    price: '£8,400',
    season: 'July to August',
    start: 'Longyearbyen, Svalbard',
    lead: 'Led by Jonas Ellingsen',
    blurb:
      'Nine days of long days: sea ice by zodiac, a summit push on a nunatak, and polar bears at a distance you can measure.',
    seed: 'northbound-trip-svalbard-zodiac-sea-ice',
    alt: 'A zodiac boat heading toward sea ice off the coast of Spitsbergen',
    itinerary: [
      { day: 1, title: 'Longyearbyen', note: 'Kit issue, polar-bear briefing, and a town evening with the whole group.' },
      { day: 2, title: 'Sea ice by zodiac', note: 'First trip onto the fast ice, several hours of walking on it.' },
      { day: 3, title: 'Walrus colony', note: 'Two hours on a ridge above the beach. No approach, no noise.' },
      { day: 4, title: 'Rest and review', note: 'A quiet day, laundry, and a briefing on the summit attempt.' },
      { day: 5, title: 'Nunatak approach', note: 'Long walk to the base camp, ropes carried in.' },
      { day: 6, title: 'Summit day', note: 'Start at 02:00. Twelve hours on the north face, weather dependent.' },
      { day: 7, title: 'Barentsburg', note: 'Boat to the Russian settlement, museum visit, overnight there.' },
      { day: 8, title: 'Fjord and pack ice', note: 'Back south through Isfjorden with the ice floes moving.' },
      { day: 9, title: 'Longyearbyen', note: 'Kit return, debrief, and flights out after 15:00.' },
    ],
  },
  {
    id: 'senja-fjord-traverse',
    name: 'Senja Fjord Traverse',
    days: 6,
    group: 8,
    price: '£6,150',
    season: 'June to September',
    start: 'Senjordalen, Norway',
    lead: 'Led by Marit Holm',
    blurb:
      'Six days hut to hut along the west coast of Senja, with two weather days held back so the traverse does not close early.',
    seed: 'northbound-trip-senja-coast-hut-walk',
    alt: 'A coastal trail above the water on the west side of Senja',
    itinerary: [
      { day: 1, title: 'Senjordalen', note: 'Kit fitting and a low walk into the fjord to shake out the flight.' },
      { day: 2, title: 'Tungeneset', note: 'Out along the shore to the basalt stacks, then hut at Grasnes.' },
      { day: 3, title: 'Husøy', note: 'Cross by ferry to the fishing village, dinner, and a spare weather day.' },
      { day: 4, title: 'Bergsbotn platform', note: 'The high traverse under Segla, with a long descent to the north shore.' },
      { day: 5, title: 'Mefjordvær', note: 'Quiet water, sea eagles, and the last hut before the valley.' },
      { day: 6, title: 'Valley exit', note: 'Walk out to the road, transfer back, and a debrief over dinner.' },
    ],
  },
]

const REASONS = [
  {
    n: '01',
    title: 'Twelve, never fourteen',
    body: 'Group size is capped at twelve on every departure, and it does not move. On ice that is the difference between a walk and a scramble.',
  },
  {
    n: '02',
    title: 'Two guides, one of them local',
    body: 'Every trip runs with two guides and at least one raised on the ground you are walking. Neither has been recruited from a warm country.',
  },
  {
    n: '03',
    title: 'Dates that move',
    body: 'Departures are planned around daylight and ice, not a calendar. If the window closes we shift the trip by a day and say so in March.',
  },
  {
    n: '04',
    title: 'One price, everything in it',
    body: 'Boats, huts, group transfers, all meals and the gear hire are inside the quoted figure. The only thing you pay for is the flight to get there.',
  },
]

const NAV_ITEMS = ['Trips', 'Destinations', 'Guides', 'Enquire']

type Status = 'idle' | 'sending' | 'done'
type Errors = { name?: string; email?: string; trip?: string }

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="text-[0.8125rem] font-medium text-[var(--color-alert)]">
      {children}
    </p>
  )
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [openTrip, setOpenTrip] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [formKey, setFormKey] = useState(0)
  const railRef = useRef<HTMLDivElement>(null)

  function nudge(dir: 1 | -1) {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: dir * Math.round(rail.clientWidth * 0.8), behavior: 'smooth' })
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const trip = String(data.get('trip') ?? '')

    const next: Errors = {}
    if (name.length < 2) next.name = 'We need a name to put on the booking form.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = 'That address will not reach you. Check it once more.'
    if (!trip) next.trip = 'Pick a departure so we can check the dates.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('sending')
    window.setTimeout(() => setStatus('done'), 1100)
  }

  function reset() {
    setStatus('idle')
    setErrors({})
    setFormKey((k) => k + 1)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-[var(--color-accent-ink)]"
      >
        Skip to content
      </a>

      {/* ---------------------------------------------------------------- */}
      {/* NAV - single line at desktop, 72px                              */}
      {/* ---------------------------------------------------------------- */}
      <header className="edge sticky top-0 z-40 border-b border-[var(--color-hairline)] bg-[var(--color-canvas)]/88 backdrop-blur-sm">
        <div className="shell flex h-[72px] items-center justify-between">
          <a
            href="#top"
            className="display display-sm leading-none tracking-[0.06em]"
          >
            Northbound
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link text-[0.9375rem] font-medium text-[var(--color-body)]"
              >
                {item}
              </a>
            ))}
          </nav>

          <a href="#enquire" className="btn btn-primary hidden md:inline-flex">
            Check dates
          </a>

          <button
            type="button"
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="mobile-nav"
            onClick={() => setNavOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-[var(--color-line-strong)] text-[var(--color-ink)] md:hidden"
          >
            <span className="flex w-4 flex-col gap-[4px]">
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? 'translate-y-[2.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-[var(--color-ink)] transition-transform duration-200 ${
                  navOpen ? '-translate-y-[2.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {navOpen ? (
          <div id="mobile-nav" className="edge border-t border-[var(--color-hairline)] md:hidden">
            <nav className="shell flex flex-col py-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setNavOpen(false)}
                  className="border-b border-[var(--color-hairline)] py-3.5 text-[1rem] font-medium text-[var(--color-ink)] last:border-b-0"
                >
                  {item}
                </a>
              ))}
              <a
                href="#enquire"
                onClick={() => setNavOpen(false)}
                className="btn btn-primary mt-5 w-full"
              >
                Check dates
              </a>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="main">
        {/* -------------------------------------------------------------- */}
        {/* HERO - type over landscape photo, 4 text elements, fits screen  */}
        {/* -------------------------------------------------------------- */}
        <section
          id="top"
          className="edge relative flex min-h-[640px] items-end overflow-hidden md:min-h-[calc(100dvh-72px)]"
        >
          <img
            src="https://picsum.photos/seed/northbound-hero-glacier-fjord-aerial/1800/1200"
            alt="Aerial view of a glacier fjord with snow fields running down to the water"
            loading="eager"
            width={1800}
            height={1200}
            className="hero-media absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,20,24,0.95)_0%,rgba(10,20,24,0.78)_34%,rgba(10,20,24,0.28)_78%,rgba(10,20,24,0.42)_100%)]"
          />

          <div className="shell relative pb-16 md:pb-24">
            <p className="micro micro-on-photo hero-in" style={{ animationDelay: '60ms' }}>
              Small-group expeditions, Arctic and North Atlantic
            </p>
            <h1
              className="display display-xl hero-in mt-6 text-[var(--color-ink)]"
              style={{ animationDelay: '150ms' }}
            >
              Where the road ends
            </h1>
            <p
              className="lede lede-on-photo hero-in mt-7 max-w-[52ch]"
              style={{ animationDelay: '250ms' }}
            >
              Twelve travellers, two guides, and no coach tours. Trips into Greenland, Svalbard
              and the Lofoten wall, run from April to September.
            </p>
            <div
              className="hero-in mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '340ms' }}
            >
              <a href="#trips" className="btn btn-primary">
                See departures
              </a>
              <a href="#enquire" className="btn btn-ghost">
                Check dates
              </a>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* DESTINATIONS - horizontal scroll-snap rail, manual scrolling    */}
        {/* -------------------------------------------------------------- */}
        <section id="destinations" className="overflow-hidden py-24 md:py-32">
          <div className="shell">
            <Reveal>
              <SectionHead
                title="Where we work"
                body="Six places, all reachable on foot from a small town with a landing strip."
              />
            </Reveal>
          </div>

          <div className="mt-14 flex items-center justify-end gap-3 pr-5 md:pr-10">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Previous destinations"
              className="grid h-11 w-11 place-items-center border border-[var(--color-line-strong)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <span className="chev chev-prev" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Next destinations"
              className="grid h-11 w-11 place-items-center border border-[var(--color-line-strong)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <span className="chev chev-next" />
            </button>
          </div>

          <div
            ref={railRef}
            className="rail rail-pad mt-6"
            role="list"
            aria-label="Destinations"
          >
            {DESTINATIONS.map((d, i) => (
              <Reveal
                key={d.place}
                delay={i * 60}
                className="w-[74vw] shrink-0 sm:w-[46vw] lg:w-[23vw] xl:w-[350px]"
              >
                <article role="listitem" className="rail-card h-full">
                  <div className="frame aspect-4/5 w-full">
                    <img
                      src={`https://picsum.photos/seed/${d.seed}/700/875`}
                      alt={d.alt}
                      loading="lazy"
                      width={700}
                      height={875}
                    />
                  </div>
                  <h3 className="display display-sm mt-5">{d.place}</h3>
                  <p className="meta mt-2">{d.country}</p>
                  <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                    {d.note}
                  </p>
                  <p className="mt-4 text-[0.8125rem] text-[var(--color-mute)]">{d.window}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* TRIPS - one feature trip, then expandable day-by-day rows       */}
        {/* -------------------------------------------------------------- */}
        <section id="trips" className="edge border-t border-[var(--color-hairline)] py-24 md:py-32">
          <div className="shell">
            <Reveal>
              <SectionHead
                kicker="Departures, April to September"
                title="Three trips, dates that shift"
                body="Quotes cover everything on the ground. Flights to Ilulissat, Longyearbyen or Senjordalen are booked separately."
              />
            </Reveal>

            {/* Feature trip: image and text side by side, itinerary below */}
            <article className="trip mt-16">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <Reveal className="lg:col-span-7">
                  <div className="frame aspect-16/10 w-full">
                    <img
                      src={`https://picsum.photos/seed/${TRIPS[0].seed}/1400/875`}
                      alt={TRIPS[0].alt}
                      loading="lazy"
                      width={1400}
                      height={875}
                    />
                  </div>
                </Reveal>
                <Reveal delay={90} className="lg:col-span-5">
                  <h3 className="display display-lg">{TRIPS[0].name}</h3>
                  <p className="lede mt-5 text-[1rem]">{TRIPS[0].blurb}</p>
                  <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--color-hairline)] pt-6">
                    {[
                      { k: 'Duration', v: `${TRIPS[0].days} days` },
                      { k: 'Group', v: `${TRIPS[0].group} travellers` },
                      { k: 'Start', v: TRIPS[0].start },
                      { k: 'Season', v: TRIPS[0].season },
                    ].map((f) => (
                      <div key={f.k}>
                        <dt className="meta">{f.k}</dt>
                        <dd className="mt-1.5 text-[1rem] font-medium text-[var(--color-ink)]">
                          {f.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--color-hairline)] pt-6">
                    <p>
                      <span className="meta block">Per person</span>
                      <span className="display display-md mt-1 block">{TRIPS[0].price}</span>
                    </p>
                    <a href="#enquire" className="btn btn-primary">
                      Book this trip
                    </a>
                  </div>
                  <p className="mt-5 text-[0.8125rem] text-[var(--color-mute)]">
                    {TRIPS[0].lead}
                  </p>
                </Reveal>
              </div>

              <div className="mt-14 border-t border-[var(--color-hairline)] pt-8">
                <p className="meta">Day by day</p>
                <ol className="mt-6 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {TRIPS[0].itinerary.map((day, i) => (
                    <Reveal key={day.day} delay={i * 60}>
                      <li className="border-t border-[var(--color-hairline)] pt-4">
                        <p className="meta text-[var(--color-accent)]">
                          Day {day.day}
                        </p>
                        <h4 className="display display-sm mt-2">{day.title}</h4>
                        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                          {day.note}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </article>

            {/* Remaining trips: rows that expand into their own itinerary */}
            {TRIPS.slice(1).map((t, i) => {
              const open = openTrip === t.id
              return (
                <Reveal key={t.id} delay={i * 80}>
                  <article className="trip mt-16 border-t border-[var(--color-hairline)] pt-8">
                    <div className="grid gap-7 lg:grid-cols-12 lg:items-center lg:gap-10">
                      <div className="lg:col-span-3">
                        <div className="frame aspect-4/3 w-full">
                          <img
                            src={`https://picsum.photos/seed/${t.seed}/800/600`}
                            alt={t.alt}
                            loading="lazy"
                            width={800}
                            height={600}
                          />
                        </div>
                      </div>

                      <div className="lg:col-span-5">
                        <h3 className="display display-md">{t.name}</h3>
                        <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                          {t.blurb}
                        </p>
                        <p className="meta mt-4">{t.lead}</p>
                      </div>

                      <div className="flex flex-wrap items-end justify-between gap-6 lg:col-span-4 lg:flex-col lg:items-end lg:justify-center lg:gap-5">
                        <dl className="flex gap-8">
                          {[
                            { k: 'Duration', v: `${t.days} days` },
                            { k: 'Group', v: `${t.group}` },
                            { k: 'Season', v: t.season },
                          ].map((f) => (
                            <div key={f.k}>
                              <dt className="meta">{f.k}</dt>
                              <dd className="mt-1 text-[0.9375rem] font-medium text-[var(--color-ink)]">
                                {f.v}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <div className="flex items-center gap-5">
                          <p className="display display-md">{t.price}</p>
                          <button
                            type="button"
                            onClick={() => setOpenTrip(open ? null : t.id)}
                            aria-expanded={open}
                            aria-controls={`itin-${t.id}`}
                            className="btn btn-ghost"
                          >
                            {open ? 'Hide days' : 'Show days'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      id={`itin-${t.id}`}
                      className={`collapse ${open ? 'is-open' : ''}`}
                      aria-hidden={!open}
                    >
                      <div>
                        <ol className="grid gap-x-12 gap-y-7 border-t border-[var(--color-hairline)] pt-8 sm:grid-cols-2 lg:grid-cols-3">
                          {t.itinerary.map((day) => (
                            <li key={day.day}>
                              <p className="meta text-[var(--color-accent)]">Day {day.day}</p>
                              <h4 className="display display-sm mt-2">{day.title}</h4>
                              <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                                {day.note}
                              </p>
                            </li>
                          ))}
                        </ol>
                        <div className="mt-8">
                          <a href="#enquire" className="btn btn-ghost">
                            Check {t.season.toLowerCase()} dates
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* WHY US - numbered full-width rows                              */}
        {/* -------------------------------------------------------------- */}
        <section
          id="why"
          className="edge border-t border-[var(--color-hairline)] bg-[var(--color-surface)] py-24 md:py-32"
        >
          <div className="shell">
            <Reveal>
              <SectionHead
                title="How a Northbound trip runs"
                body="Four rules that decide the shape of every departure."
              />
            </Reveal>

            <ol className="mt-16">
              {REASONS.map((r, i) => (
                <Reveal key={r.n} delay={i * 70}>
                  <li className="grid gap-4 border-t border-[var(--color-hairline)] py-8 md:grid-cols-12 md:gap-10 md:py-9">
                    <p className="display display-md text-[var(--color-accent)] md:col-span-2">
                      {r.n}
                    </p>
                    <h3 className="display display-sm md:col-span-3">{r.title}</h3>
                    <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)] md:col-span-7 md:pt-1">
                      {r.body}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* GUIDES - asymmetric 2+1, lead guide card plus traveller quotes  */}
        {/* -------------------------------------------------------------- */}
        <section id="guides" className="edge py-24 md:py-32">
          <div className="shell">
            <Reveal>
              <SectionHead
                title="Who is already there"
                body="Every departure has a lead guide named before you book, and a second guide who has worked the route at least twice."
              />
            </Reveal>

            <div className="mt-16 grid gap-6 lg:grid-cols-12">
              <Reveal className="lg:col-span-7">
                <article className="card h-full overflow-hidden">
                  <div className="frame aspect-16/9 w-full">
                    <img
                      src="https://picsum.photos/seed/northbound-guide-halldora-icefjord-boat/1200/675"
                      alt="A guide in a heavy jacket standing on the deck of a boat in an icefjord"
                      loading="eager"
                      width={1200}
                      height={675}
                    />
                  </div>
                  <div className="p-7 md:p-9">
                    <p className="meta">Lead guide, Ilulissat</p>
                    <h3 className="display display-md mt-3">Halldora Vigfusson</h3>
                    <p className="mt-5 max-w-[54ch] text-[0.9375rem] leading-relaxed text-[var(--color-body)]">
                      Twelve seasons on the icefjord. Halldora reads the fast ice and decides when
                      the group goes out, which is the only reason the trip works when the wind is
                      up. She also runs the village dog team that pulls the kit out to Ukneq.
                    </p>
                    <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-[var(--color-hairline)] pt-6">
                      {[
                        { k: 'Seasons', v: '12' },
                        { k: 'Languages', v: 'IS, EN, DA' },
                        { k: 'Crossings', v: '86' },
                      ].map((f) => (
                        <div key={f.k}>
                          <dt className="meta">{f.k}</dt>
                          <dd className="mt-1.5 text-[0.9375rem] font-medium text-[var(--color-ink)]">
                            {f.v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </Reveal>

              <div className="flex flex-col gap-6 lg:col-span-5">
                <Reveal delay={90}>
                  <figure className="card flex h-full flex-col justify-between p-7 md:p-9">
                    <blockquote className="display display-md text-[var(--color-ink)]">
                      &ldquo;We were on the ice four days out of five. The other day was weather,
                      and nobody pretended otherwise.&rdquo;
                    </blockquote>
                    <figcaption className="mt-7 text-[0.9375rem] text-[var(--color-mute)]">
                      Anneke Vos, Logistics Lead, DeltaWerken
                    </figcaption>
                  </figure>
                </Reveal>

                <Reveal delay={160}>
                  <figure className="card flex h-full flex-col justify-between p-7 md:p-9">
                    <blockquote className="display display-md text-[var(--color-ink)]">
                      &ldquo;Twelve people, two boats, and a guide who knew every name in
                      Upernavik.&rdquo;
                    </blockquote>
                    <figcaption className="mt-7 text-[0.9375rem] text-[var(--color-mute)]">
                      Rowan Beck, Architect, Fieldset Studio
                    </figcaption>
                  </figure>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* BOOKING - full-bleed CTA band with the enquiry form            */}
        {/* -------------------------------------------------------------- */}
        <section
          id="enquire"
          className="edge border-t border-[var(--color-hairline)] bg-[var(--color-surface)] py-24 md:py-32"
        >
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-4">
                <h2 className="display display-lg">Start with a departure date</h2>
                <p className="lede mt-6">
                  Tell us which trip and roughly when. We confirm the guide, the hut and the
                  boat inside two working days.
                </p>
                <dl className="mt-10 space-y-5">
                  <div>
                    <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">Email</dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                      trips@northbound.travel
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">Phone</dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                      +44 20 7946 0812
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.8125rem] font-semibold text-[var(--color-ink)]">
                      Deposit
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-[var(--color-body)]">
                      15% on confirmation, balance 30 days out
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal className="lg:col-span-8" delay={90}>
                {status === 'done' ? (
                  <div
                    role="status"
                    className="card flex flex-col justify-center p-8 md:p-12"
                  >
                    <p className="micro">Request received</p>
                    <p className="display display-md mt-4">
                      We have your trip and your dates
                    </p>
                    <p className="lede mt-5">
                      A guide will reply within two working days with the confirmed itinerary and
                      the hut allocation.
                    </p>
                    <button type="button" onClick={reset} className="btn btn-ghost mt-8 self-start">
                      Send another
                    </button>
                  </div>
                ) : (
                  <form key={formKey} onSubmit={onSubmit} noValidate className="grid gap-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <label
                          htmlFor="name"
                          className="text-[0.8125rem] font-semibold text-[var(--color-ink)]"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Anneke Vos"
                          aria-invalid={errors.name ? true : undefined}
                          aria-describedby={errors.name ? 'name-error' : 'name-hint'}
                          className={`field ${errors.name ? 'field-error' : ''}`}
                        />
                        {errors.name ? (
                          <FieldError id="name-error">{errors.name}</FieldError>
                        ) : (
                          <p id="name-hint" className="text-[0.8125rem] text-[var(--color-mute)]">
                            The booking form goes to this name.
                          </p>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <label
                          htmlFor="email"
                          className="text-[0.8125rem] font-semibold text-[var(--color-ink)]"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          aria-invalid={errors.email ? true : undefined}
                          aria-describedby={errors.email ? 'email-error' : 'email-hint'}
                          className={`field ${errors.email ? 'field-error' : ''}`}
                        />
                        {errors.email ? (
                          <FieldError id="email-error">{errors.email}</FieldError>
                        ) : (
                          <p id="email-hint" className="text-[0.8125rem] text-[var(--color-mute)]">
                            We only use this to answer you.
                          </p>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <label
                          htmlFor="trip"
                          className="text-[0.8125rem] font-semibold text-[var(--color-ink)]"
                        >
                          Departure
                        </label>
                        <select
                          id="trip"
                          name="trip"
                          defaultValue=""
                          aria-invalid={errors.trip ? true : undefined}
                          aria-describedby={errors.trip ? 'trip-error' : 'trip-hint'}
                          className={`field ${errors.trip ? 'field-error' : ''}`}
                        >
                          <option value="" disabled>
                            Choose a trip
                          </option>
                          {TRIPS.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name}
                            </option>
                          ))}
                        </select>
                        {errors.trip ? (
                          <FieldError id="trip-error">{errors.trip}</FieldError>
                        ) : (
                          <p id="trip-hint" className="text-[0.8125rem] text-[var(--color-mute)]">
                            Dates move with the ice, so pick the trip first.
                          </p>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <label
                          htmlFor="travellers"
                          className="text-[0.8125rem] font-semibold text-[var(--color-ink)]"
                        >
                          Travellers
                        </label>
                        <select
                          id="travellers"
                          name="travellers"
                          defaultValue="2"
                          aria-describedby="travellers-hint"
                          className="field"
                        >
                          {[2, 4, 6, 8, 10, 12].map((n) => (
                            <option key={n} value={n}>
                              {n} people
                            </option>
                          ))}
                        </select>
                        <p id="travellers-hint" className="text-[0.8125rem] text-[var(--color-mute)]">
                          Groups above eight are split across two boats.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <label
                        htmlFor="note"
                        className="text-[0.8125rem] font-semibold text-[var(--color-ink)]"
                      >
                        Anything we should plan around
                      </label>
                      <textarea
                        id="note"
                        name="note"
                        rows={4}
                        placeholder="Mobility, dietary needs, or dates that do not work."
                        aria-describedby="note-hint"
                        className="field resize-y"
                      />
                      <p id="note-hint" className="text-[0.8125rem] text-[var(--color-mute)]">
                        Optional. Two lines is plenty.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-5 pt-2">
                      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending' : 'Check dates'}
                      </button>
                      {status === 'sending' ? (
                        <span
                          aria-hidden="true"
                          className="skeleton block h-[0.8125rem] w-[220px] max-w-full"
                        />
                      ) : (
                        <p className="text-[0.8125rem] text-[var(--color-mute)]">
                          No card details needed to check dates.
                        </p>
                      )}
                    </div>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                          */}
      {/* ---------------------------------------------------------------- */}
      <footer className="edge border-t border-[var(--color-hairline)] py-12">
        <div className="shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.875rem] text-[var(--color-mute)]">
            Northbound Expeditions Ltd, ATOL 11437
          </p>
          <nav className="flex flex-wrap gap-x-7 gap-y-2">
            {NAV_ITEMS.map((i) => (
              <a
                key={i}
                href={`#${i.toLowerCase()}`}
                className="text-[0.875rem] text-[var(--color-mute)] transition-colors hover:text-[var(--color-ink)]"
              >
                {i}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  )
}