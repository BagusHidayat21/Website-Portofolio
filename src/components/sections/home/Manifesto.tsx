import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { CountUp } from '@/components/shared/CountUp';
import { Parallax } from '@/components/shared/Parallax';
import { FramedImage } from '@/components/shared/FramedImage';
import { RevealGroup } from '@/components/shared/RevealGroup';
import { ScrollWords } from '@/components/shared/ScrollWords';

const MANIFESTO =
    'I build full stack products, put data and machine learning to work inside them, and teach vocational students to ship software the way real teams do.';
const HIGHLIGHT = ['full', 'stack', 'data', 'machine', 'learning'];

interface Stat {
    value: number;
    suffix?: string;
    label: string;
}

interface ManifestoProps {
    name: string;
    avatarUrl: string;
    stats: Stat[];
}

export function Manifesto({ name, avatarUrl, stats }: ManifestoProps) {
    return (
        <section id="about" aria-labelledby="manifesto-heading" className="relative overflow-hidden py-14 sm:py-20 md:py-28">
            <div className="page-x">
                <p className="label mb-6 flex items-center gap-2 text-ink-muted">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink-accent" />
                    About
                </p>
                <h2 id="manifesto-heading" className="sr-only">
                    About {name}
                </h2>
                <ScrollWords text={MANIFESTO} highlight={HIGHLIGHT} />

                <div className="mt-10 grid grid-cols-1 gap-10 sm:mt-14 md:mt-20 md:gap-12 lg:grid-cols-12 lg:gap-10">
                    <Parallax speed={-0.4} className="lg:col-span-5">
                        <FramedImage src={avatarUrl} alt={`Portrait of ${name}`} sizes="(min-width: 1024px) 40vw, 100vw">
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />
                            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md">
                                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink-accent" />
                                {name}
                            </div>
                            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-xs text-white/90">
                                <span className="font-medium">Software Engineer</span>
                                <span className="font-mono text-[11px] text-white/70">Malang, ID</span>
                            </div>
                        </FramedImage>
                    </Parallax>

                    <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
                        <RevealGroup className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
                            {stats.map((stat, i) => (
                                <Parallax key={stat.label} speed={0.3 + i * 0.25}>
                                    <div className="rise border-t border-ink-line pt-6">
                                        <p className="font-wide text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.04em]">
                                            <CountUp value={stat.value} />
                                            {stat.suffix ? <span className="text-ink-accent-ink">{stat.suffix}</span> : null}
                                        </p>
                                        <p className="mt-3 text-sm text-ink-muted">{stat.label}</p>
                                    </div>
                                </Parallax>
                            ))}
                        </RevealGroup>

                        <p className="mt-14 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
                            Software engineer at PT Universal Big Data and graduate of Universitas Negeri Malang. Most of my week goes to two things:
                            building web systems and teaching students to build them.
                        </p>

                        <Link href="/about" className="group mt-10 inline-flex w-max items-center gap-4 font-wide text-lg uppercase tracking-[-0.01em]">
                            <span className="relative">
                                Read the story
                                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-ink-accent transition-transform duration-500 ease-expo group-hover:scale-x-100" />
                            </span>
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-accent text-ink-on-accent transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-45">
                                <ArrowUpRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
