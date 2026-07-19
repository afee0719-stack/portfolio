import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bot,
  Box,
  Brush,
  Check,
  ChevronRight,
  Cpu,
  Glasses,
  Image as ImageIcon,
  Layers3,
  LayoutGrid,
  Library,
  Monitor,
  Palette,
  PenTool,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tablet,
  Target,
  Users,
  WandSparkles,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import foxconnImage from './assets/foxconn-ecs-display.jpg'
import adesignPlatformCase from './assets/optimized/adesign-platform-case.jpg'
import bIconLibraryCase from './assets/optimized/b-icon-library-case.jpg'
import digitalTwinParkCase from './assets/optimized/digital-twin-park-case.jpg'
import enterpriseComponentSystemCase from './assets/optimized/enterprise-component-system-case.jpg'
import portfolioImage from './assets/portfolio-collection-display.jpg'
import showcase01 from './assets/second-screen/showcase-01.jpg'
import showcase02 from './assets/second-screen/showcase-02.jpg'
import showcase03 from './assets/second-screen/showcase-03.jpg'
import showcase04 from './assets/second-screen/showcase-04.jpg'
import showcase05 from './assets/second-screen/showcase-05.jpg'
import showcase06 from './assets/second-screen/showcase-06.jpg'
import showcase07 from './assets/second-screen/showcase-07.jpg'
import showcase08 from './assets/second-screen/showcase-08.jpg'
import wukongArScreens from './assets/wukong-ar-screens.png'
import wukongCaseLong from './assets/optimized/wukong-case-long.jpg'
import wukongCover from './assets/wukong-cover.png'
import wechatQr from './assets/wechat-qr.jpg'
import xiaomiCockpitCase from './assets/optimized/xiaomi-cockpit-case.jpg'

const showcaseImages = [showcase01, showcase02, showcase03, showcase04, showcase05, showcase06, showcase07, showcase08] as const

const sereneAssets = {
  video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4',
  rainbow: 'https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png',
  cloud: 'https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png',
}

const neuralEase = [0.16, 1, 0.3, 1] as const

const decorImages = {
  moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
}

type ExpressionId = 'focus' | 'wink' | 'wow' | 'smirk' | 'chaos' | 'sleepy'

const expressionLabels: Record<ExpressionId, string> = {
  focus: 'FOCUS MODE',
  wink: 'SIDE QUEST',
  wow: 'IDEA SPARK',
  smirk: 'GENIUS MODE',
  chaos: 'CHAOS DEBUG',
  sleepy: 'DEEP THINK',
}

type ExpressionState = {
  expression: ExpressionId
  look: {
    x: number
    y: number
    tilt: number
  }
}

const avatarExpressions: ExpressionId[] = ['focus', 'wink', 'wow', 'smirk', 'chaos', 'sleepy']

function PortfolioNavigation({ className = '' }: { className?: string }) {
  return (
    <nav className={`portfolio-nav ${className}`} aria-label="Primary navigation">
      <a href="#about">About</a>
      <a href="#ability">Ability</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
  )
}

type FadeInProps = {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
}

function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Magnet({
  children,
  padding = 150,
  strength = 3,
}: {
  children: ReactNode
  padding?: number
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('translate3d(0, 0, 0)')
  const [active, setActive] = useState(false)
  const frame = useRef(0)
  const transformRef = useRef('translate3d(0, 0, 0)')

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (frame.current) return
      const element = ref.current
      if (!element) return

      frame.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distanceX = event.clientX - centerX
        const distanceY = event.clientY - centerY
        const withinX = event.clientX >= rect.left - padding && event.clientX <= rect.right + padding
        const withinY = event.clientY >= rect.top - padding && event.clientY <= rect.bottom + padding

        if (withinX && withinY) {
          setActive(true)
          const nextTransform = `translate3d(${(distanceX / strength).toFixed(2)}px, ${(distanceY / strength).toFixed(2)}px, 0)`
          if (transformRef.current !== nextTransform) {
            transformRef.current = nextTransform
            setTransform(nextTransform)
          }
        } else if (active) {
          transformRef.current = 'translate3d(0, 0, 0)'
          setActive(false)
          setTransform('translate3d(0, 0, 0)')
        }

        frame.current = 0
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [active, padding, strength])

  return (
    <div
      ref={ref}
      style={{
        transform,
        transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

function useReactiveExpressionState() {
  const [state, setState] = useState<ExpressionState>({
    expression: 'focus',
    look: { x: 0, y: 0, tilt: 0 },
  })
  const stateRef = useRef<ExpressionState>({
    expression: 'focus',
    look: { x: 0, y: 0, tilt: 0 },
  })
  const lastPoint = useRef({ x: 0, y: 0, time: 0 })
  const frame = useRef(0)

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (frame.current) return

      frame.current = requestAnimationFrame(() => {
        const now = performance.now()
        const previous = lastPoint.current
        const elapsed = Math.max(now - previous.time, 16)
        const speed = previous.time === 0 ? 0 : Math.hypot(event.clientX - previous.x, event.clientY - previous.y) / elapsed
        const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2
        const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2

        const look = {
          x: Math.max(-1, Math.min(1, normalizedX)) * 10,
          y: Math.max(-1, Math.min(1, normalizedY)) * 8,
          tilt: Math.max(-1, Math.min(1, normalizedX)) * 7,
        }

        let expression: ExpressionId = 'focus'

        if (speed > 1.4) {
          expression = 'chaos'
        } else if (normalizedY < -0.42) {
          expression = 'wow'
        } else if (normalizedY > 0.48) {
          expression = 'sleepy'
        } else if (normalizedX < -0.42) {
          expression = 'wink'
        } else if (normalizedX > 0.42) {
          expression = 'smirk'
        }

        const current = stateRef.current
        const lookDelta = Math.abs(current.look.x - look.x) + Math.abs(current.look.y - look.y) + Math.abs(current.look.tilt - look.tilt)

        if (current.expression !== expression || lookDelta > 3.2) {
          const nextState = { expression, look }
          stateRef.current = nextState
          setState(nextState)
        }

        lastPoint.current = { x: event.clientX, y: event.clientY, time: now }
        frame.current = 0
      })
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  return state
}

function ReactiveExpression({ expression, look }: ExpressionState) {
  const style = {
    '--look-x': `${look.x}px`,
    '--look-y': `${look.y}px`,
    '--face-tilt': `${look.tilt}deg`,
  } as CSSProperties

  return (
    <div className="reactive-expression" data-expression={expression} style={style} aria-hidden="true">
      <span className="expression-scan" />
      <div className="expression-eyes">
        <i />
        <i />
      </div>
      <div className="expression-mouth" />
      <div className="expression-sparks">
        <span />
        <span />
        <span />
      </div>
      <b>{expressionLabels[expression]}</b>
    </div>
  )
}

function LiveProjectButton({ href = '#contact', label = 'Live Project' }: { href?: string; label?: string }) {
  return (
    <a className="live-button" href={href}>
      {label}
    </a>
  )
}

function HeroDesignMeta() {
  const devices = [Monitor, Tablet, Smartphone, Glasses]

  return (
    <div className="hero-design-meta">
      <div className="hero-design-title">
        <strong>UI/UX DESIGN</strong>
        <span>作品集 <b>2026</b></span>
      </div>
      <div className="hero-device-icons" aria-label="多终端设计能力">
        {devices.map((Icon, index) => (
          <Icon size={34} strokeWidth={1.7} key={index} />
        ))}
      </div>
    </div>
  )
}

function HeroSection() {
  const expressionState = useReactiveExpressionState()

  return (
    <section className="hero-section-jack" aria-label="Creator portfolio hero">
      <FadeIn y={-20} className="hero-nav-wrap">
        <PortfolioNavigation className="hero-nav" />
      </FadeIn>

      <FadeIn delay={0.15} y={40} className="hero-heading-wrap">
        <h1 className="hero-heading hero-title">Hi, i'm afee</h1>
      </FadeIn>

      <div className="hero-cn-title-wrap">
        <FadeIn delay={0.28} y={28} className="hero-cn-title-motion">
          <div className="hero-cn-title">
            <div className="hero-cn-orbit" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="hero-cn-kicker">
              <span />
              <p>连接用户 · 场景与未来</p>
              <span />
            </div>
            <h2 aria-label="多端多场景体验设计">
              <span className="hero-cn-line hero-cn-line-top" data-text="多端多场景">多端多场景</span>
              <span className="hero-cn-line hero-cn-line-bottom">
                <b data-text="体验">体验</b>
                <em data-text="设计">设计</em>
              </span>
            </h2>
            <div className="hero-cn-tech-meta">
              <span>一致 <i /> 高效 <i /> 智能 <i /> 融合</span>
              <small>MULTI-PLATFORM / MULTI-SCENARIO EXPERIENCE DESIGN</small>
            </div>
            <div className="hero-cn-corners" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="hero-portrait-wrap">
        <FadeIn delay={0.6} y={30}>
          <Magnet>
            <div className="hero-portrait" data-expression={expressionState.expression} style={{
              '--look-x': `${expressionState.look.x}px`,
              '--look-y': `${expressionState.look.y}px`,
              '--face-tilt': `${expressionState.look.tilt}deg`,
            } as CSSProperties}>
              <ReactiveExpression {...expressionState} />
              <div className="avatar-stack" role="img" aria-label="Afee avatar expression variants">
                {avatarExpressions.map((avatarExpression) => (
                  <span className="avatar-sprite" data-avatar={avatarExpression} key={avatarExpression} />
                ))}
              </div>
            </div>
          </Magnet>
        </FadeIn>
      </div>

      <div className="hero-bottom">
        <FadeIn delay={0.35} y={20}>
          <HeroDesignMeta />
        </FadeIn>
      </div>
    </section>
  )
}

function SereneSlide({ active }: { active: boolean }) {
  return (
    <section className="serene-slide" aria-label="Portfolio vision landing page slide">
      <video className="serene-video" src={active ? sereneAssets.video : undefined} autoPlay={active} muted loop playsInline preload="none" />
      <div className="serene-overlay" />

      <motion.header
        className="serene-nav"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: neuralEase }}
      >
        <a className="serene-logo" href="#hero">AFEE Portfolio</a>
        <nav>
          <a href="#about">About</a>
          <a href="#ability">Ability</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="serene-menu" type="button" aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
      </motion.header>

      <motion.div
        className="serene-content"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.95, ease: neuralEase }}
      >
        <h2>Multi-terminal experiences. Intelligent visual systems.</h2>
        <p>UI/UX, AI design, brand systems, and enterprise product cases shaped for manufacturing, digital twin, XR interaction, and B-end platforms.</p>
      </motion.div>

      <motion.aside
        className="serene-quote liquid-glass"
        initial={{ opacity: 0, y: 34, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.58, duration: 1, ease: neuralEase }}
      >
        <img className="serene-rainbow" src={sereneAssets.rainbow} alt="" />
        <img className="serene-cloud serene-cloud-left" src={sereneAssets.cloud} alt="" />
        <img className="serene-cloud serene-cloud-right" src={sereneAssets.cloud} alt="" />
        <blockquote>
          “A portfolio focused on connecting users, scenarios, and future-facing systems through precise visual language and scalable design assets.”
        </blockquote>
        <p>Afee -- UI / UX Designer</p>
      </motion.aside>

      <div className="serene-sound" aria-hidden="true">
        <span><i /></span>
        <p>Experience<br />with sound</p>
      </div>
    </section>
  )
}

function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const pauseTimerRef = useRef<number | null>(null)
  const slides = ['Creator Portfolio', 'Portfolio Vision'] as const

  useEffect(() => {
    if (paused) return undefined

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
      setProgressKey((current) => current + 1)
    }, 10000)

    return () => window.clearInterval(timer)
  }, [paused, slides.length])

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current)
    }
  }, [])

  const showSlide = (index: number) => {
    setActiveSlide(index)
    setProgressKey((current) => current + 1)
    setPaused(true)
    if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = window.setTimeout(() => setPaused(false), 1000)
  }

  return (
    <section
      className="home-carousel"
      id="hero"
      aria-label="Homepage carousel"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={`carousel-slide ${activeSlide === 0 ? 'is-active' : ''}`} aria-hidden={activeSlide !== 0}>
        <HeroSection />
      </div>
      <div className={`carousel-slide ${activeSlide === 1 ? 'is-active' : ''}`} aria-hidden={activeSlide !== 1}>
        <SereneSlide active={activeSlide === 1} />
      </div>
      <div className="carousel-controls" aria-label="Carousel controls">
        {slides.map((label, index) => (
          <button
            className={activeSlide === index ? 'active' : ''}
            type="button"
            onClick={() => showSlide(index)}
            aria-label={`Show ${label}`}
            aria-current={activeSlide === index ? 'true' : undefined}
            key={label}
          >
            {activeSlide === index && <i className="carousel-progress" key={progressKey} />}
            <span>{String(index + 1).padStart(2, '0')}</span>
            <b>{label}</b>
          </button>
        ))}
      </div>
    </section>
  )
}

function MarqueeRow({ images, direction }: { images: string[]; direction: 'left' | 'right' }) {
  const repeated = [...images, ...images, ...images]

  return (
    <div className={`marquee-row ${direction === 'right' ? 'move-right' : 'move-left'}`}>
      <div className="marquee-track">
        {repeated.map((src, index) => (
          <img
            className="marquee-tile"
            src={src}
            alt=""
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = index % 2 === 0 ? foxconnImage : portfolioImage
            }}
            key={`${src}-${index}`}
          />
        ))}
      </div>
    </div>
  )
}

function MarqueeSection() {
  const topRow = showcaseImages.slice(0, 4)
  const bottomRow = showcaseImages.slice(4, 8)

  return (
    <section className="marquee-section">
      <MarqueeRow images={topRow} direction="right" />
      <MarqueeRow images={bottomRow} direction="left" />
    </section>
  )
}

function AboutSection() {
  const profileItems = [
    ['学校 / 专业', '郑州大学 / 视觉传达专业'],
    ['个人定位', '专注于企业级平台、AI工作流与智能交互体验设计，能力涵盖可视化呈现、企业平台、AI产品、XR交互、数字孪生。'],
    ['联系方式', '17759153261'],
    ['邮箱', 'afee0719@gmail.com'],
  ]
  const timelineItems = [
    {
      period: '2016.3 – 2016.5',
      org: '信阳润氏电商有限公司',
      role: '美工',
      tasks: ['产品精修与版式设计', '产品形象包装与卖点提炼', '店铺主图与详情页设计优化', '宣传海报、画册等物料支持'],
    },
    {
      period: '2016.9 – 2020.9',
      org: '中华人民共和国73123部队',
      role: '机关文书 / 副班长',
      tasks: ['文书命令传达与行动方案辅助', '行政、党建事务沟通与会议记录', '档案、兵器室与部门资产管理'],
    },
    {
      period: '2021.6 – 至今',
      org: '富士康集团A事业群 IT',
      role: 'UI设计主管',
      tasks: ['团队管理、项目落地、MES系统、智能仓储、数字孪生', '负责方案评审与设计规范建设', '带领12人UI团队，覆盖研究、交互、视觉全流程', '建立组件库与审查制度，提升设计效率30%'],
    },
  ]

  return (
    <section className="about-section-jack" id="about">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="about-decor decor-moon">
        <img src={decorImages.moon} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="about-decor decor-object">
        <img src={decorImages.object} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="about-decor decor-lego">
        <img src={decorImages.lego} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="about-decor decor-group">
        <img src={decorImages.group} alt="" loading="lazy" />
      </FadeIn>

      <div className="about-content about-profile-layout">
        <div className="about-title-block">
          <FadeIn y={40}>
            <h2 className="hero-heading section-heading">About me</h2>
          </FadeIn>
          <span>UI / UX Designer</span>
        </div>

        <div className="about-grid">
          <FadeIn y={34} className="about-profile-card">
            <h3>张海涛</h3>
            <strong>UI / UX Designer</strong>
            <div className="about-profile-line" />
            {profileItems.map(([label, value]) => (
              <section className="about-profile-item" key={label}>
                <i />
                <div>
                  <b>{label}</b>
                  <p>{value}</p>
                </div>
              </section>
            ))}
            <a className="about-ability-entry" href="#ability">
              <i><Sparkles size={19} strokeWidth={2} /></i>
              <span>
                <small>ABILITY ARCHIVE</small>
                <strong>查看个人能力与设计方法</strong>
              </span>
              <ArrowRight size={20} strokeWidth={2.2} />
            </a>
          </FadeIn>

          <div className="about-timeline">
            <FadeIn y={28}>
              <div className="about-timeline-title">
                <span>Career Timeline</span>
                <i />
              </div>
            </FadeIn>
            {timelineItems.map((item, index) => (
              <FadeIn delay={index * 0.08} y={32} className="about-timeline-row" key={item.period}>
                <div className="about-timeline-main">
                  <span className="about-dot" />
                  <h3>{item.period}</h3>
                  <p>{item.org}<em>|</em><b>{item.role}</b></p>
                </div>
                <ul>
                  {item.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const abilityBars = [
  ['跨部协作', 'Cross-functional Collaboration', 86],
  ['产品体验', 'Product Experience', 84],
  ['AIGC 能力', 'AIGC Capability', 78],
  ['系统搭建', 'System Building', 86],
  ['交互设计', 'Interaction Design', 85],
  ['项目管理', 'Project Management', 66],
] as const

const approachItems = [
  ['系统思维', 'System Thinking', '从全局视角规划产品与体验'],
  ['用户导向', 'User-Centered', '以用户需求为中心创造价值'],
  ['高效执行', 'Efficient Execution', '快速响应、高质量完成目标'],
  ['数据驱动', 'Data-Driven', '用数据洞察问题并持续优化'],
] as const

const professionalToolGroups = [
  ['设计协作', ['Figma', 'Sketch', 'Pixso', 'XD']],
  ['视觉生产', ['Photoshop', 'Illustrator', 'InDesign', 'Midjourney']],
  ['动效原型', ['After Effects', 'Premiere', 'Principle', 'CapCut']],
  ['系统效率', ['Axure', 'Blender', 'Stable Diffusion', 'MindNode']],
] as const

function ServicesSection() {
  return (
    <section className="services-section" id="ability">
      <div className="ability-starfield" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="ability-shell">
        <h2>Ability</h2>
        <p className="ability-kicker">个人能力 <span>/ Core Competencies</span></p>

        <article className="ability-section">
          <strong className="ability-number">01</strong>
          <div className="ability-content">
            <h3>个人能力概述 <span>Personal Skills Overview</span></h3>
            <p className="ability-lead">具备全面的设计思维与执行能力，擅长测试、沟通、视觉设计、分析、交互与管理，以用户为中心，打造高效、可靠的设计解决方案。</p>
            <p className="ability-copy">Comprehensive abilities in testing, communication, visual design, analysis, interaction, and management. User-centered, delivering effective and impactful solutions.</p>
            <div className="ability-overview-grid">
              <section className="ability-card">
                <h4>能力雷达图 <span>/ Skill Radar</span></h4>
                <div className="ability-radar">
                  <svg viewBox="0 0 420 360" role="img" aria-label="测试、视觉、交互、管理、分析、沟通六维能力雷达图">
                    <polygon className="radar-grid outer" points="210,32 340,107 340,253 210,328 80,253 80,107" />
                    <polygon className="radar-grid middle" points="210,92 288,137 288,223 210,268 132,223 132,137" />
                    <polygon className="radar-grid inner" points="210,151 240,168 240,202 210,219 180,202 180,168" />
                    <polygon className="radar-fill" points="210,94 310,132 320,234 210,278 112,224 96,130" />
                    <polygon className="radar-line" points="210,94 310,132 320,234 210,278 112,224 96,130" />
                    <text x="210" y="24">测试</text>
                    <text x="368" y="122">视觉</text>
                    <text x="368" y="260">交互</text>
                    <text x="210" y="356">管理</text>
                    <text x="48" y="260">分析</text>
                    <text x="48" y="122">沟通</text>
                  </svg>
                </div>
              </section>
              <section className="ability-card">
                <h4>核心标签 <span>/ Core Tags</span></h4>
                <p className="ability-tags">5年制造业IT设计团队管理&nbsp; | &nbsp;4年带队机关经验&nbsp; | &nbsp;精通MES/ERP/智能仓储/数字孪生全链路设计&nbsp; | &nbsp;工厂数字化转型项目落地经验&nbsp; | &nbsp;令行禁止，使命必达</p>
              </section>
            </div>
          </div>
        </article>

        <article className="ability-section">
          <strong className="ability-number">02</strong>
          <div className="ability-content">
            <h3>技能优势 <span>Skill Advantages</span></h3>
            <p className="ability-lead">跨部门协作，覆盖产品体验、AIGC、系统搭建、交互设计与项目管理等多维能力。</p>
            <section className="ability-card ability-card-wide">
              <h4>技能维度 <span>/ Skill Dimensions</span></h4>
              <div className="ability-bars">
                {abilityBars.map(([label, subLabel, value]) => (
                  <div className="ability-bar" key={label}>
                    <strong>{label}</strong>
                    <em>{subLabel}</em>
                    <span><i style={{ width: `${value}%` }} /></span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>

        <article className="ability-section">
          <strong className="ability-number">03</strong>
          <div className="ability-content">
            <h3>专业工具 <span>Professional Tools</span></h3>
            <p className="ability-copy">熟练运用行业领先的设计与生产力工具，保障高质量高效率的设计交付。</p>
            <div className="ability-tool-matrix">
              {professionalToolGroups.map(([group, tools]) => (
                <section className="ability-tool-group" key={group}>
                  <h4>{group}</h4>
                  <div>
                    {tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </article>

        <article className="ability-section">
          <strong className="ability-number">04</strong>
          <div className="ability-content">
            <h3>价值观与方法 <span>Value & Approach</span></h3>
            <p className="ability-copy">以数据驱动设计决策，以系统思维推进项目落地，关注用户价值与业务增长。</p>
            <div className="ability-approach-grid">
              {approachItems.map(([name, english, desc], index) => (
                <section className="ability-approach" key={name}>
                  <em>{String(index + 1).padStart(2, '0')}</em>
                  <b>{name}</b>
                  <span>{english}</span>
                  <p>{desc}</p>
                </section>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

function AbilityPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <main className="ability-page">
      <header className="ability-page-nav">
        <a href="#about"><ArrowLeft size={17} strokeWidth={2.3} /> Back About</a>
        <span>AFEE / ABILITY ARCHIVE</span>
      </header>
      <ServicesSection />
      <BackToTopButton />
    </main>
  )
}

const projects = [
  {
    number: '01',
    category: '悟空智能点检',
    name: 'AR Industrial Inspection System',
    actions: [{ href: '#wukong-device', label: 'View Case' }],
    images: [wukongArScreens, wukongCover, wukongArScreens],
  },
  {
    number: '02',
    category: '自建设计平台及B端图标库',
    name: 'ADesign Platform & B-End Icon Library',
    actions: [
      { href: '#adesign-platform', label: 'ADesign' },
      { href: '#b-icon-library', label: 'Icon Library' },
    ],
    images: [adesignPlatformCase, bIconLibraryCase, adesignPlatformCase],
  },
  {
    number: '03',
    category: '数字孪生·智能厂区',
    name: 'Smart Industrial Campus Digital Twin',
    actions: [{ href: '#digital-twin-park', label: 'View Case' }],
    images: [digitalTwinParkCase, digitalTwinParkCase, digitalTwinParkCase],
  },
  {
    number: '04',
    category: '小米智能驾舱-试设计',
    name: 'Xiaomi Smart Cockpit Concept Design',
    actions: [{ href: '#xiaomi-cockpit', label: 'View Case' }],
    images: [xiaomiCockpitCase, xiaomiCockpitCase, xiaomiCockpitCase],
  },
  {
    number: '05',
    category: '企业级B端组件化',
    name: 'Enterprise Component System',
    actions: [{ href: '#enterprise-component-system', label: 'View Case' }],
    images: [enterpriseComponentSystemCase, enterpriseComponentSystemCase, enterpriseComponentSystemCase],
  },
]

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: (typeof projects)[number]
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const range: [number, number] = [index / total, 1]
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div className="project-sticky-shell">
      <motion.article
        className="project-card"
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
      >
        <div className="project-top">
          <strong>{project.number}</strong>
          <span>{project.category}</span>
          <h3>{project.name}</h3>
          <div className="project-actions">
            {project.actions.map((action) => (
              <LiveProjectButton href={action.href} label={action.label} key={action.href} />
            ))}
          </div>
        </div>
        <div className="project-images">
          <div className="project-left">
            <img src={project.images[0]} alt={`${project.name} detail one`} loading="lazy" />
            <img src={project.images[1]} alt={`${project.name} detail two`} loading="lazy" />
          </div>
          <div className="project-right">
            <img src={project.images[2]} alt={`${project.name} hero`} loading="lazy" />
          </div>
        </div>
      </motion.article>
    </div>
  )
}

function ProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <h2 className="hero-heading section-heading">Project</h2>
      <div className="project-stack">
        {projects.map((project, index) => (
          <ProjectCard
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
            key={project.number}
          />
        ))}
      </div>
    </section>
  )
}

function ContactSection() {
  const [showQr, setShowQr] = useState(false)

  return (
    <section className="contact-section-jack" id="contact">
      <h2 className="hero-heading section-heading">Contact</h2>
      <div className="contact-info">
        <a href="tel:17759153261">17759153261</a>
        <a href="mailto:afee0719@gmail.com">afee0719@gmail.com</a>
      </div>
      <button className="qr-contact-button" type="button" onClick={() => setShowQr(true)}>
        联系我
      </button>
      {showQr && (
        <div className="qr-modal" role="dialog" aria-modal="true" aria-label="微信二维码">
          <button className="qr-modal-backdrop" type="button" aria-label="关闭二维码弹窗" onClick={() => setShowQr(false)} />
          <div className="qr-card">
            <button className="qr-close" type="button" onClick={() => setShowQr(false)} aria-label="关闭">×</button>
            <img src={wechatQr} alt="微信二维码" />
            <div className="qr-actions">
              <a href={wechatQr} download="afee-wechat-qr.jpg">保存二维码</a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function WukongProjectPage() {
  const specs = [
    ['产品定位', 'AR 智能巡检设备'],
    ['核心场景', '工业设备点检 / 数据透视 / 异常协作'],
    ['设计关键词', '火眼识别 / 导航巡检 / 远程专家'],
    ['交付内容', '系统体验设计 / UI 视觉 / 案例包装'],
  ]
  const features = ['火眼识别', '数据透视', '智能巡检', '远程协作']
  const caseSections = [
    ['01', '任务接收与导航', '将巡检任务、路径指引、设备状态整合到 AR 视野中，降低现场操作判断成本。'],
    ['02', '设备识别与数据透视', '通过设备识别与实时数据浮层，让巡检人员快速定位关键参数和风险信号。'],
    ['03', '异常速报与远程协作', '异常场景中建立记录、标注、专家协同闭环，提升问题响应效率。'],
  ]

  return (
    <main className="wukong-page">
      <header className="wukong-detail-hero">
        <nav className="wukong-detail-nav">
          <a href="#projects">← Back Projects</a>
          <span>WUKONG CASE STUDY</span>
        </nav>
        <section className="wukong-hero-grid">
          <div className="wukong-hero-copy">
            <p>AR 工业巡检系统</p>
            <h1>悟空智能点检</h1>
            <span>Wukong Intelligent Inspection</span>
            <p className="wukong-hero-desc">融合 AR 点检、设备识别、数据透视、分步巡检、异常协作与报告闭环，以“悟空·火眼金睛”为核心理念，让巡检更高效、更智能、更可靠。</p>
            <div className="wukong-hero-actions">
              <a href="#wukong-case-body">View Case</a>
              <a href="#projects">Back Home</a>
            </div>
          </div>
          <div className="wukong-hero-visual">
            <img src={wukongArScreens} alt="悟空智能点检 AR 巡检界面" />
          </div>
        </section>
        <div className="wukong-spec-strip">
          {specs.map(([label, value]) => (
            <section key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </section>
          ))}
        </div>
      </header>

      <section className="wukong-white-case" id="wukong-case-body">
        <div className="wukong-case-cover">
          <div>
            <span>01</span>
            <h2>悟空智能点检</h2>
            <p>以高解像 AR 光波导折射算法为基础，自动贴合复杂核电/化工设备参数，辅助现场人员完成识别、巡检、协作与报告闭环。</p>
            <div className="wukong-feature-pills">
              {features.map((feature) => (
                <b key={feature}>{feature}</b>
              ))}
            </div>
          </div>
        </div>

        <div className="wukong-case-sections">
          {caseSections.map(([number, title, desc]) => (
            <article key={number}>
              <strong>{number}</strong>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>

        <div className="wukong-long-shot">
          <img src={wukongCaseLong} alt="悟空智能点检完整项目长图" loading="lazy" />
        </div>
      </section>
    </main>
  )
}

type ADesignInteractiveItem = {
  title: string
  label: string
  description: string
  icon: LucideIcon
  points: readonly string[]
}

const adesignBackgroundItems: readonly ADesignInteractiveItem[] = [
  {
    title: '统一视觉规范',
    label: 'SYSTEM STANDARD',
    description: '建立统一的视觉规则与体验基线，让跨系统、跨团队的设计语言保持一致。',
    icon: Target,
    points: ['设计原则', '栅格与版式', '交互基线'],
  },
  {
    title: '沉淀组件资产',
    label: 'ASSET LIBRARY',
    description: '把高频模式沉淀为可复用组件，减少重复设计并提升交付稳定性。',
    icon: Layers3,
    points: ['基础组件', '业务组件', '页面模板'],
  },
  {
    title: '支撑多业务线',
    label: 'SCALABLE SYSTEM',
    description: '以可扩展架构承接不同业务场景，让规范与效率在规模化中持续生效。',
    icon: Workflow,
    points: ['多业务适配', '权限协同', '版本管理'],
  },
  {
    title: '塑造品牌体验',
    label: 'BRAND EXPERIENCE',
    description: '将品牌识别融入每一个操作触点，形成专业、可靠且一致的产品印象。',
    icon: ShieldCheck,
    points: ['品牌一致性', '品质控制', '体验度量'],
  },
]

const adesignCapabilityItems: readonly ADesignInteractiveItem[] = [
  {
    title: '规范 / 组件共享',
    label: 'DESIGN SYSTEM',
    description: '统一设计规则、组件状态与交付标准，构建设计资产的共同语言。',
    icon: Layers3,
    points: ['Token 变量', '组件文档', '版本追踪'],
  },
  {
    title: '主题定制 / 样式参考',
    label: 'THEME ENGINE',
    description: '通过品牌主题与场景模板，快速生成稳定且可扩展的界面风格。',
    icon: Palette,
    points: ['主题切换', '样式映射', '品牌预设'],
  },
  {
    title: 'AI 自助绘图',
    label: 'AIGC WORKFLOW',
    description: '把提示词、模型与素材流程整合进工作台，降低创意生产门槛。',
    icon: WandSparkles,
    points: ['智能生图', '批量变体', '结果管理'],
  },
  {
    title: '模板 / 素材 / 模型广场',
    label: 'CREATIVE MARKET',
    description: '集中管理模板、素材与模型能力，让优质资产被发现、复用和持续迭代。',
    icon: LayoutGrid,
    points: ['模板中心', '素材检索', '模型管理'],
  },
]

const adesignShowcaseItems: readonly ADesignInteractiveItem[] = [
  {
    title: '规范与组件共享',
    label: 'LIBRARY',
    description: '按业务域浏览组件、规范与更新记录，快速定位可复用资产。',
    icon: Library,
    points: ['32 个组件族', '126 个状态', '实时版本同步'],
  },
  {
    title: 'AI 自助绘图',
    label: 'AI STUDIO',
    description: '通过结构化提示词和风格预设，生成可直接进入设计流程的视觉内容。',
    icon: Bot,
    points: ['提示词模板', '风格控制', '批量生成'],
  },
  {
    title: '模板与素材广场',
    label: 'MARKET',
    description: '聚合高质量页面模板与品牌素材，支持收藏、筛选和一键复用。',
    icon: ImageIcon,
    points: ['智能筛选', '资产收藏', '一键复用'],
  },
  {
    title: '主题与品牌管理',
    label: 'BRAND KIT',
    description: '集中维护颜色、字体、圆角与阴影等品牌变量，并预览全局影响。',
    icon: Brush,
    points: ['主题预览', '变量映射', '全局发布'],
  },
]

const adesignStrategyItems: readonly ADesignInteractiveItem[] = [
  {
    title: '规范化',
    label: 'STANDARDIZATION',
    description: '建立唯一规则源，让设计、研发和业务对同一标准形成共识。',
    icon: ShieldCheck,
    points: ['定义标准', '团队评审', '持续维护'],
  },
  {
    title: '组件化',
    label: 'COMPONENTIZATION',
    description: '将成熟模式转化为高复用资产，在统一中保留业务扩展能力。',
    icon: Box,
    points: ['模式抽象', '组件建设', '场景验证'],
  },
  {
    title: '品质化',
    label: 'QUALITY UPGRADE',
    description: '通过检查清单与体验度量，持续提升产品的一致性和完成度。',
    icon: Sparkles,
    points: ['体验巡检', '质量评分', '问题闭环'],
  },
  {
    title: '品牌化',
    label: 'BRAND IDENTITY',
    description: '把品牌基因注入设计系统，使产品体验成为品牌资产的一部分。',
    icon: Rocket,
    points: ['识别提炼', '规则映射', '体验沉淀'],
  },
]

const adesignValueItems: readonly ADesignInteractiveItem[] = [
  {
    title: '统一体验',
    label: 'CONSISTENCY',
    description: '同一套原则覆盖跨端、跨系统和跨业务的核心体验。',
    icon: Check,
    points: ['统一标准', '统一语言', '统一质量'],
  },
  {
    title: '提升效率',
    label: 'EFFICIENCY',
    description: '减少重复劳动，让团队把时间投入到真正需要解决的问题。',
    icon: Zap,
    points: ['复用提速', '自动检查', '快速交付'],
  },
  {
    title: '强化协作',
    label: 'COLLABORATION',
    description: '用共享资产和透明流程连接设计、研发与业务团队。',
    icon: Users,
    points: ['在线共创', '版本可见', '反馈闭环'],
  },
  {
    title: '提升品牌',
    label: 'BRAND VALUE',
    description: '用持续一致的数字体验建立专业、可信赖的品牌认知。',
    icon: Activity,
    points: ['品牌识别', '体验记忆', '资产复利'],
  },
]

const adesignImpactItems = [
  ['40%', '重复设计周期缩短', '通过组件复用与模板化生产减少重复工作。'],
  ['10.6 万', '单项目节省成本', '统一交付标准，降低沟通、返工与研发适配成本。'],
  ['84.8 万/年', '设计资产价值', '让组件、模板与规范持续产生可复用的业务价值。'],
  ['80-100 万', '年度协作价值', '通过跨团队共建与规模化应用释放组织效能。'],
] as const

const adesignFutureItems = [
  ['设计智能化', '将 AI 能力嵌入资产检索、生成、检查与决策流程。'],
  ['协同自动化', '连接设计与研发数据，让版本、规范和变更自动同步。'],
  ['开放服务化', '把设计能力封装为服务，灵活支撑更多业务场景。'],
  ['安全可信化', '建立模型、素材与设计资产的权限和质量治理体系。'],
] as const

function ADesignSectionTitle({
  number,
  label,
  title,
  description,
  inverse = false,
}: {
  number: string
  label: string
  title: string
  description: string
  inverse?: boolean
}) {
  return (
    <div className={`adesign-section-title${inverse ? ' is-inverse' : ''}`}>
      <span>{number}</span>
      <div>
        <p>{label}</p>
        <h2>{title}</h2>
        <strong>{description}</strong>
      </div>
    </div>
  )
}

function ADesignPlatformPage() {
  const [activeBackground, setActiveBackground] = useState(0)
  const [activeCapability, setActiveCapability] = useState(0)
  const [activeShowcase, setActiveShowcase] = useState(0)
  const [activeStrategy, setActiveStrategy] = useState(0)
  const [activeValue, setActiveValue] = useState(0)
  const [activeImpact, setActiveImpact] = useState(0)
  const [activeFuture, setActiveFuture] = useState(0)

  const background = adesignBackgroundItems[activeBackground]
  const capability = adesignCapabilityItems[activeCapability]
  const showcase = adesignShowcaseItems[activeShowcase]
  const strategy = adesignStrategyItems[activeStrategy]
  const value = adesignValueItems[activeValue]

  return (
    <main className="adesign-page">
      <header className="adesign-hero">
        <nav className="adesign-top-nav">
          <a href="#projects">← Back Projects</a>
          <span>ADESIGN PLATFORM CASE</span>
        </nav>

        <div className="adesign-hero-grid">
          <FadeIn className="adesign-hero-copy" y={24}>
            <p>AI 内容创作设计平台</p>
            <h1 aria-label="ADesign 自建 AIGC 设计平台">
              <span>ADesign</span>
              <small>自建 <em>AIGC</em> 设计平台</small>
            </h1>
            <strong>规范统一 · 组件共享 · 品质升级 · 品牌塑造</strong>
            <p>围绕设计资产生产、管理与协作，构建覆盖规范、组件、模板与 AI 能力的一体化平台。</p>
            <a href="#adesign-background">
              Explore the system
              <ArrowRight size={16} />
            </a>
          </FadeIn>

          <FadeIn className="adesign-platform-visual" delay={0.12} x={28} y={0}>
            <div className="adesign-visual-orbit" aria-hidden="true" />
            <div className="adesign-core-stack">
              <span>A</span>
              <small>{capability.label}</small>
            </div>
            <div className="adesign-floating-tools" role="group" aria-label="核心能力快捷切换">
              {adesignCapabilityItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    className={activeCapability === index ? 'is-active' : ''}
                    type="button"
                    onClick={() => setActiveCapability(index)}
                    aria-label={`切换到${item.title}`}
                    key={item.title}
                  >
                    <Icon size={19} />
                  </button>
                )
              })}
            </div>
          </FadeIn>
        </div>

        <div className="adesign-hero-features">
          {adesignCapabilityItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                className={activeCapability === index ? 'is-active' : ''}
                type="button"
                onClick={() => setActiveCapability(index)}
                key={item.title}
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </button>
            )
          })}
        </div>
      </header>

      <nav className="adesign-anchor-nav" aria-label="ADesign 案例章节导航">
        {[
          ['01', '背景', '#adesign-background'],
          ['02', '能力', '#adesign-capabilities'],
          ['03', '展示', '#adesign-showcase'],
          ['04', '策略', '#adesign-strategy'],
          ['05', '价值', '#adesign-value'],
          ['06', '展望', '#adesign-future'],
        ].map(([number, label, href]) => (
          <a href={href} key={number}>
            <span>{number}</span>
            {label}
          </a>
        ))}
      </nav>

      <section className="adesign-section adesign-background-section" id="adesign-background">
        <FadeIn>
          <ADesignSectionTitle
            number="01"
            label="BACKGROUND"
            title="项目背景"
            description="从单点设计交付走向可持续的设计资产体系。"
          />
        </FadeIn>
        <div className="adesign-background-grid" role="tablist" aria-label="项目背景目标">
          {adesignBackgroundItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                className={activeBackground === index ? 'is-active' : ''}
                type="button"
                role="tab"
                aria-selected={activeBackground === index}
                onClick={() => setActiveBackground(index)}
                key={item.title}
              >
                <Icon size={28} />
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <ChevronRight size={18} />
              </button>
            )
          })}
        </div>
        <motion.div
          className="adesign-background-detail"
          key={background.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: neuralEase }}
          aria-live="polite"
        >
          <div>
            <span>{background.label}</span>
            <h3>{background.title}</h3>
            <p>{background.description}</p>
          </div>
          <div>
            {background.points.map((point) => <span key={point}>{point}</span>)}
          </div>
        </motion.div>
      </section>

      <section className="adesign-section adesign-capability-section" id="adesign-capabilities">
        <FadeIn>
          <ADesignSectionTitle
            number="02"
            label="CORE CAPABILITIES"
            title="核心能力"
            description="让规范、主题、AI 与设计资产在同一个工作流中协同。"
            inverse
          />
        </FadeIn>
        <div className="adesign-capability-tabs" role="tablist" aria-label="核心能力切换">
          {adesignCapabilityItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                className={activeCapability === index ? 'is-active' : ''}
                type="button"
                role="tab"
                aria-selected={activeCapability === index}
                onClick={() => setActiveCapability(index)}
                key={item.title}
              >
                <Icon size={22} />
                <span>{String.fromCharCode(65 + index)}.</span>
                {item.title}
              </button>
            )
          })}
        </div>
        <motion.div
          className="adesign-capability-stage"
          key={capability.title}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: neuralEase }}
        >
          <div className="adesign-capability-diagram" aria-hidden="true">
            <div className="adesign-diagram-ring is-outer" />
            <div className="adesign-diagram-ring is-inner" />
            <div className="adesign-diagram-core">
              {(() => {
                const Icon = capability.icon
                return <Icon size={34} />
              })()}
              <span>{capability.label}</span>
            </div>
            {capability.points.map((point, index) => (
              <span className={`adesign-diagram-node node-${index + 1}`} key={point}>{point}</span>
            ))}
          </div>
          <div className="adesign-capability-copy">
            <span>{capability.label}</span>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
            <ul>
              {capability.points.map((point) => (
                <li key={point}><Check size={15} />{point}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      <section className="adesign-section adesign-showcase-section" id="adesign-showcase">
        <FadeIn>
          <ADesignSectionTitle
            number="03"
            label="INTERFACE SHOWCASE"
            title="页面展示"
            description="选择不同能力，实时查看对应的工作台状态。"
          />
        </FadeIn>
        <div className="adesign-showcase-layout">
          <div className="adesign-showcase-tabs" role="tablist" aria-label="页面展示切换">
            {adesignShowcaseItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  className={activeShowcase === index ? 'is-active' : ''}
                  type="button"
                  role="tab"
                  aria-selected={activeShowcase === index}
                  onClick={() => setActiveShowcase(index)}
                  key={item.title}
                >
                  <Icon size={20} />
                  <span>{item.title}<small>{item.label}</small></span>
                  <ChevronRight size={17} />
                </button>
              )
            })}
          </div>
          <motion.div
            className={`adesign-workbench theme-${activeShowcase + 1}`}
            key={showcase.title}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: neuralEase }}
          >
            <div className="adesign-workbench-bar">
              <span /><span /><span />
              <strong>{showcase.label}</strong>
              <button type="button" aria-label="工作台更多选项">•••</button>
            </div>
            <div className="adesign-workbench-body">
              <aside>
                <span className="is-logo">A</span>
                {[LayoutGrid, Layers3, PenTool, Cpu].map((Icon, index) => (
                  <button className={index === activeShowcase ? 'is-active' : ''} type="button" aria-label={`工具 ${index + 1}`} key={index}>
                    <Icon size={17} />
                  </button>
                ))}
              </aside>
              <div className="adesign-workbench-canvas">
                <header>
                  <div><span>{showcase.label}</span><h3>{showcase.title}</h3></div>
                  <button type="button"><Sparkles size={15} />新建资产</button>
                </header>
                <div className="adesign-canvas-grid">
                  {showcase.points.map((point, index) => (
                    <article key={point}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div><i /><i /><i /></div>
                      <strong>{point}</strong>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="adesign-section adesign-strategy-section" id="adesign-strategy">
        <FadeIn>
          <ADesignSectionTitle
            number="04"
            label="DESIGN STRATEGY"
            title="设计策略"
            description="以规范为起点，让设计资产持续升级并形成品牌价值。"
          />
        </FadeIn>
        <div className="adesign-strategy-track" role="tablist" aria-label="设计策略步骤">
          {adesignStrategyItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                className={activeStrategy === index ? 'is-active' : ''}
                type="button"
                role="tab"
                aria-selected={activeStrategy === index}
                onClick={() => setActiveStrategy(index)}
                key={item.title}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Icon size={25} />
                <strong>{item.title}</strong>
                <small>{item.label}</small>
              </button>
            )
          })}
        </div>
        <motion.div
          className="adesign-strategy-detail"
          key={strategy.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div><span>{strategy.label}</span><h3>{strategy.title}</h3><p>{strategy.description}</p></div>
          <ol>
            {strategy.points.map((point, index) => (
              <li key={point}><span>{index + 1}</span>{point}</li>
            ))}
          </ol>
        </motion.div>
      </section>

      <section className="adesign-section adesign-value-section" id="adesign-value">
        <FadeIn>
          <ADesignSectionTitle
            number="05"
            label="DESIGN VALUE"
            title="价值输出"
            description="把设计系统从规范文档转化为可衡量、可复用的组织能力。"
          />
        </FadeIn>
        <div className="adesign-value-layout">
          <div className="adesign-value-options" role="tablist" aria-label="设计价值切换">
            {adesignValueItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  className={activeValue === index ? 'is-active' : ''}
                  type="button"
                  role="tab"
                  aria-selected={activeValue === index}
                  onClick={() => setActiveValue(index)}
                  key={item.title}
                >
                  <Icon size={23} />
                  <span>{item.title}<small>{item.label}</small></span>
                </button>
              )
            })}
          </div>
          <motion.div
            className="adesign-value-focus"
            key={value.title}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <span>{String(activeValue + 1).padStart(2, '0')}</span>
            <div><small>{value.label}</small><h3>{value.title}</h3><p>{value.description}</p></div>
            <ul>{value.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul>
          </motion.div>
        </div>

        <div className="adesign-impact" aria-label="设计价值指标">
          {adesignImpactItems.map(([metric, label, description], index) => (
            <button
              className={activeImpact === index ? 'is-active' : ''}
              type="button"
              onClick={() => setActiveImpact(index)}
              key={metric}
            >
              <span>{metric}</span>
              <strong>{label}</strong>
              <i><span style={{ width: activeImpact === index ? '100%' : `${70 + index * 7}%` }} /></i>
              <p>{description}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="adesign-section adesign-future-section" id="adesign-future">
        <div className="adesign-future-copy">
          <FadeIn>
            <ADesignSectionTitle
              number="06"
              label="FUTURE OUTLOOK"
              title="设计展望"
              description="让规范与智能共同演进，构建企业设计协同的新基础设施。"
            />
          </FadeIn>
          <div className="adesign-future-options" role="tablist" aria-label="未来能力方向">
            {adesignFutureItems.map(([title], index) => (
              <button
                className={activeFuture === index ? 'is-active' : ''}
                type="button"
                role="tab"
                aria-selected={activeFuture === index}
                onClick={() => setActiveFuture(index)}
                key={title}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>{title}
              </button>
            ))}
          </div>
          <motion.p
            key={adesignFutureItems[activeFuture][0]}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {adesignFutureItems[activeFuture][1]}
          </motion.p>
        </div>
        <div className="adesign-future-orbit" aria-hidden="true">
          <div className="adesign-future-ring ring-1" />
          <div className="adesign-future-ring ring-2" />
          <span>A</span>
          {[Sparkles, Workflow, Rocket, ShieldCheck].map((Icon, index) => (
            <i className={`future-node node-${index + 1}${activeFuture === index ? ' is-active' : ''}`} key={index}><Icon size={20} /></i>
          ))}
        </div>
      </section>

      <footer className="adesign-footer">
        <div><span>ADesign</span><p>In-house AIGC Design Platform Case Study</p></div>
        <a href="#projects">Back to projects <ArrowRight size={17} /></a>
      </footer>
    </main>
  )
}

function DesignAssetCasePage({
  label,
  title,
  subtitle,
  description,
  image,
}: {
  label: string
  title: string
  subtitle: string
  description: string
  image: string
}) {
  return (
    <main className="design-case-page">
      <header className="design-case-hero">
        <nav className="design-case-nav">
          <a href="#projects">← Back Projects</a>
          <span>{label}</span>
        </nav>
        <section className="design-case-intro">
          <span>02</span>
          <div>
            <p>{subtitle}</p>
            <h1>{title}</h1>
            <strong>规范统一 · 组件共享 · 品质升级 · 品牌塑造</strong>
            <p>{description}</p>
          </div>
        </section>
      </header>
      <section className="design-case-long">
        <img src={image} alt={`${title}完整案例长图`} />
      </section>
    </main>
  )
}

function DigitalTwinProjectPage() {
  const [scrollWindow, setScrollWindow] = useState<Window | null>(null)

  return (
    <main className="digital-twin-embed-page">
      <iframe
        className="digital-twin-embed"
        src="/digital-twin/index.html"
        title="厂区数字孪生运营平台完整案例"
        onLoad={(event) => setScrollWindow(event.currentTarget.contentWindow)}
      />
      <BackToTopButton scrollTarget={scrollWindow} />
    </main>
  )
}

const xiaomiHeroParticles = [
  [7, 22, 0.2, 3], [14, 68, 1.4, 2], [23, 35, 2.1, 4], [31, 82, 0.8, 2],
  [42, 16, 2.8, 3], [49, 58, 1.1, 2], [58, 29, 3.2, 4], [66, 74, 0.4, 2],
  [73, 12, 1.9, 3], [79, 47, 3.6, 2], [87, 25, 2.4, 4], [93, 72, 1.2, 2],
  [11, 88, 3.9, 3], [37, 47, 0.7, 2], [61, 91, 2.9, 3], [89, 89, 1.6, 2],
] as const

function XiaomiCockpitProjectPage() {
  const modes = [
    ['休息模式', '座舱进入低亮度沉浸状态，联动座椅、氛围灯与屏幕内容。'],
    ['午休小憩', '一键调整座椅角度与空调风量，降低打扰并保留安全提示。'],
    ['露营观影', '将中控屏切换为场景化影音入口，支持个性化氛围设置。'],
    ['安全提醒', '保留 P 档、车窗、门锁、电量等关键安全条件校验。'],
  ] as const
  const [activeMode, setActiveMode] = useState(0)
  const active = modes[activeMode]

  return (
    <main className="xiaomi-page">
      <header className="xiaomi-hero">
        <div className="xiaomi-tech-field" aria-hidden="true">
          <i className="xiaomi-tech-orbit orbit-one" />
          <i className="xiaomi-tech-orbit orbit-two" />
          <i className="xiaomi-tech-scan" />
          {xiaomiHeroParticles.map(([left, top, delay, size], index) => (
            <span
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
              }}
              key={index}
            />
          ))}
        </div>
        <nav className="xiaomi-nav">
          <a href="#projects">← Back Projects</a>
          <span>XIAOMI SMART COCKPIT CASE</span>
        </nav>
        <section className="xiaomi-intro">
          <div className="xiaomi-logo-mark">
            <svg viewBox="0 0 48 48" role="img" aria-label="Xiaomi logo">
              <path d="M10.5 14h13.4c5.2 0 9.4 4.2 9.4 9.4V34h-5.8V23.8c0-2.2-1.8-4-4-4h-1.6V34h-5.8V19.8h-5.6V34H4.7V14h5.8Z" />
              <path d="M36.2 14h5.8v5.8h-5.8zM36.2 22.2H42V34h-5.8z" />
            </svg>
          </div>
          <p>小米智能驾舱-试设计</p>
          <h1>休息模式方案设计</h1>
          <span>让每一次停车，都成为身心的放松时刻。</span>
          <div className="xiaomi-mode-card">
            <strong>{String(activeMode + 1).padStart(2, '0')}</strong>
            <h2>{active[0]}</h2>
            <p>{active[1]}</p>
          </div>
          <div className="xiaomi-mode-tabs" role="tablist" aria-label="小米智能驾舱场景切换">
            {modes.map(([title], index) => (
              <button
                className={activeMode === index ? 'active' : ''}
                type="button"
                onClick={() => setActiveMode(index)}
                aria-selected={activeMode === index}
                role="tab"
                key={title}
              >
                {title}
              </button>
            ))}
          </div>
        </section>
      </header>

      <section className="xiaomi-case-body">
        <div className="xiaomi-quick-actions">
          {['方案背景', '竞品分析', '体验流程', '核心体验', '注意事项'].map((item) => (
            <button type="button" key={item}>{item}</button>
          ))}
        </div>
        <div className="xiaomi-long-shot">
          <img src={xiaomiCockpitCase} alt="小米智能驾舱休息模式完整项目长图" />
        </div>
      </section>
    </main>
  )
}

function EnterpriseComponentProjectPage() {
  const layers = [
    ['01', '设计资产底座', '从设计原则、Design Token 到基础组件，建立稳定可复用的系统资产。'],
    ['02', '业务组件沉淀', '围绕表格、看板、告警、设备卡片等高频场景沉淀业务组件。'],
    ['03', '页面模板复用', '用可组合模板承接复杂页面，减少重复生产与跨项目设计偏差。'],
    ['04', '深色工业主题', '统一数据可视化、状态色、控件层级和工业大屏视觉规范。'],
  ] as const
  const [activeLayer, setActiveLayer] = useState(0)
  const active = layers[activeLayer]

  return (
    <main className="enterprise-page">
      <header className="enterprise-hero">
        <nav className="enterprise-nav">
          <a href="#projects">← Back Projects</a>
          <span>FOXC0NN COMPONENT SYSTEM CASE</span>
        </nav>
        <section className="enterprise-intro">
          <div>
            <p>Design System / Component Library / Enterprise Experience</p>
            <h1>企业级B端组件化</h1>
            <span>面向工业、制造与企业管理平台，搭建可持续复用的设计资产底座。</span>
          </div>
          <div className="enterprise-panel">
            <strong>{active[0]}</strong>
            <h2>{active[1]}</h2>
            <p>{active[2]}</p>
            <div className="enterprise-layer-tabs" role="tablist" aria-label="企业级组件系统模块切换">
              {layers.map(([number, title], index) => (
                <button
                  className={activeLayer === index ? 'active' : ''}
                  type="button"
                  onClick={() => setActiveLayer(index)}
                  aria-selected={activeLayer === index}
                  role="tab"
                  key={number}
                >
                  <span>{number}</span>
                  {title}
                </button>
              ))}
            </div>
          </div>
        </section>
      </header>

      <section className="enterprise-case-body">
        <div className="enterprise-quick-actions">
          {['设计基础', '基础组件', '业务组件', '页面模板', '工业主题'].map((item) => (
            <button type="button" key={item}>{item}</button>
          ))}
        </div>
        <div className="enterprise-long-shot">
          <img src={enterpriseComponentSystemCase} alt="企业级B端组件化完整项目长图" />
        </div>
      </section>
    </main>
  )
}

function FloatingNavigation() {
  const [docked, setDocked] = useState(false)

  useEffect(() => {
    let frame = 0

    const updateDocked = () => {
      frame = 0
      const hero = document.getElementById('hero')
      const threshold = hero ? hero.offsetTop + hero.offsetHeight - 80 : window.innerHeight * 0.9
      setDocked(window.scrollY >= threshold)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateDocked)
    }

    updateDocked()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={`floating-nav-shell ${docked ? 'is-docked' : ''}`} aria-hidden={!docked}>
      <PortfolioNavigation className="floating-nav" />
    </div>
  )
}

function BackToTopButton({ scrollTarget }: { scrollTarget?: Window | null }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const targetWindow = scrollTarget ?? window

    const updateVisible = () => {
      frame = 0
      const hero = targetWindow.document.getElementById('hero')
      const threshold = hero ? hero.offsetTop + hero.offsetHeight - 80 : targetWindow.innerHeight * 0.9
      setVisible(targetWindow.scrollY >= threshold)
    }

    const onScroll = () => {
      if (frame) return
      frame = targetWindow.requestAnimationFrame(updateVisible)
    }

    updateVisible()
    const deferredUpdate = targetWindow.setTimeout(updateVisible, 80)
    targetWindow.addEventListener('scroll', onScroll, { passive: true })
    targetWindow.addEventListener('resize', onScroll)
    targetWindow.addEventListener('hashchange', onScroll)

    return () => {
      targetWindow.clearTimeout(deferredUpdate)
      targetWindow.removeEventListener('scroll', onScroll)
      targetWindow.removeEventListener('resize', onScroll)
      targetWindow.removeEventListener('hashchange', onScroll)
      if (frame) targetWindow.cancelAnimationFrame(frame)
    }
  }, [scrollTarget])

  return (
    <button
      className={`back-to-top-button ${visible ? 'is-visible' : ''}`}
      type="button"
      onClick={() => (scrollTarget ?? window).scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ArrowUp size={20} strokeWidth={2.4} />
    </button>
  )
}

function ProjectDetailShell({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BackToTopButton />
    </>
  )
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (!['#hero', '#about', '#projects', '#contact'].includes(hash)) return

    const frame = window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [hash])

  if (hash === '#wukong-device') {
    return <ProjectDetailShell><WukongProjectPage /></ProjectDetailShell>
  }

  if (hash === '#ability') {
    return <AbilityPage />
  }

  if (hash.startsWith('#adesign-')) {
    return <ProjectDetailShell><ADesignPlatformPage /></ProjectDetailShell>
  }

  if (hash === '#b-icon-library') {
    return (
      <ProjectDetailShell>
        <DesignAssetCasePage
          label="B-END ICON LIBRARY CASE"
          title="B端图标库"
          subtitle="Icon Library"
          description="面向企业级 B 端场景沉淀图标规范，覆盖办公协同、人力资源、财务管理、项目生产、系统运维等业务域。"
          image={bIconLibraryCase}
        />
      </ProjectDetailShell>
    )
  }

  if (hash === '#digital-twin-park') {
    return <DigitalTwinProjectPage />
  }

  if (hash === '#xiaomi-cockpit') {
    return <ProjectDetailShell><XiaomiCockpitProjectPage /></ProjectDetailShell>
  }

  if (hash === '#enterprise-component-system') {
    return <ProjectDetailShell><EnterpriseComponentProjectPage /></ProjectDetailShell>
  }

  return (
    <main className="app-shell">
      <FloatingNavigation />
      <BackToTopButton />
      <HeroCarousel />
      <MarqueeSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
