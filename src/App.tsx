import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'
import { ArrowUp, Glasses, Monitor, Smartphone, Tablet } from 'lucide-react'
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
      <a href="#services">Ability</a>
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
            <p>连接用户·场景与未来</p>
            <h2>多端多场景设计</h2>
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
          <a href="#services">Ability</a>
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
    <section className="services-section" id="services">
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

const projects = [
  {
    number: '01',
    category: '悟空智能点检设备',
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
            <h1>悟空智能点检设备</h1>
            <span>Wukong Intelligent Inspection Device</span>
            <p className="wukong-hero-desc">融合 AR 点检、设备识别、数据透视、分步巡检、异常协作与报告闭环，以“悟空·火眼金睛”为核心理念，让巡检更高效、更智能、更可靠。</p>
            <div className="wukong-hero-actions">
              <a href="#wukong-case-body">View Case</a>
              <a href="#projects">Back Home</a>
            </div>
          </div>
          <div className="wukong-hero-visual">
            <img src={wukongArScreens} alt="悟空智能点检设备 AR 巡检界面" />
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
            <h2>悟空智能点检设备</h2>
            <p>以高解像 AR 光波导折射算法为基础，自动贴合复杂核电/化工设备参数，辅助现场人员完成识别、巡检、协作与报告闭环。</p>
            <div className="wukong-feature-pills">
              {features.map((feature) => (
                <b key={feature}>{feature}</b>
              ))}
            </div>
          </div>
          <img src={wukongCover} alt="悟空智能点检设备封面展示" />
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
          <img src={wukongCaseLong} alt="悟空智能点检设备完整项目长图" loading="lazy" />
        </div>
      </section>
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
  const modules = [
    ['01', '园区总览', '联动建筑、能耗、设备与安防数据，构建统一可视化指挥视图。'],
    ['02', '设备监控', '沉淀设备运行、告警、维修与产线效率指标，辅助现场决策。'],
    ['03', '安全管理', '融合人员权限、区域风险和异常事件，实现园区安全闭环。'],
    ['04', '数据分析', '通过指标看板与趋势分析，支持管理层进行持续优化。'],
  ] as const
  const [activeModule, setActiveModule] = useState(0)
  const active = modules[activeModule]

  return (
    <main className="digital-twin-page">
      <header className="digital-twin-hero">
        <nav className="digital-twin-nav">
          <a href="#projects">← Back Projects</a>
          <span>FOXC0NN DIGITAL TWIN CASE</span>
        </nav>
        <section className="digital-twin-intro">
          <div>
            <p>Smart Industrial Campus Digital Twin Platform</p>
            <h1>数字孪生·智能厂区</h1>
            <span>连接管理、设备与数据，驱动更高效、更可靠的园区治理。</span>
          </div>
          <div className="digital-twin-panel">
            <strong>{active[0]}</strong>
            <h2>{active[1]}</h2>
            <p>{active[2]}</p>
            <div className="digital-twin-module-tabs" role="tablist" aria-label="数字孪生模块切换">
              {modules.map(([number, title], index) => (
                <button
                  className={activeModule === index ? 'active' : ''}
                  type="button"
                  onClick={() => setActiveModule(index)}
                  aria-selected={activeModule === index}
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

      <section className="digital-twin-case-body">
        <div className="digital-twin-metrics">
          {['全局监控', '设备联动', '风险预警', '数据驾驶舱'].map((item) => (
            <button type="button" key={item}>{item}</button>
          ))}
        </div>
        <div className="digital-twin-long-shot">
          <img src={digitalTwinParkCase} alt="数字孪生智能厂区完整项目长图" />
        </div>
      </section>
    </main>
  )
}

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
        <nav className="xiaomi-nav">
          <a href="#projects">← Back Projects</a>
          <span>XIAOMI SMART COCKPIT CASE</span>
        </nav>
        <section className="xiaomi-intro">
          <div className="xiaomi-logo-mark">mi</div>
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

function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0

    const updateVisible = () => {
      frame = 0
      const hero = document.getElementById('hero')
      const threshold = hero ? hero.offsetTop + hero.offsetHeight - 80 : window.innerHeight * 0.9
      setVisible(window.scrollY >= threshold)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateVisible)
    }

    updateVisible()
    const deferredUpdate = window.setTimeout(updateVisible, 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('hashchange', onScroll)

    return () => {
      window.clearTimeout(deferredUpdate)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('hashchange', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <button
      className={`back-to-top-button ${visible ? 'is-visible' : ''}`}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ArrowUp size={20} strokeWidth={2.4} />
    </button>
  )
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (hash === '#wukong-device') {
    return <WukongProjectPage />
  }

  if (hash === '#adesign-platform') {
    return (
      <DesignAssetCasePage
        label="ADESIGN PLATFORM CASE"
        title="ADesign 自建 AIGC 设计平台"
        subtitle="AI 内容创作设计平台"
        description="围绕规范统一、组件共享、品质升级与品牌塑造，构建设计资产生产、管理与协作的一体化平台。"
        image={adesignPlatformCase}
      />
    )
  }

  if (hash === '#b-icon-library') {
    return (
      <DesignAssetCasePage
        label="B-END ICON LIBRARY CASE"
        title="B端图标库"
        subtitle="Icon Library"
        description="面向企业级 B 端场景沉淀图标规范，覆盖办公协同、人力资源、财务管理、项目生产、系统运维等业务域。"
        image={bIconLibraryCase}
      />
    )
  }

  if (hash === '#digital-twin-park') {
    return <DigitalTwinProjectPage />
  }

  if (hash === '#xiaomi-cockpit') {
    return <XiaomiCockpitProjectPage />
  }

  if (hash === '#enterprise-component-system') {
    return <EnterpriseComponentProjectPage />
  }

  return (
    <main className="app-shell">
      <FloatingNavigation />
      <BackToTopButton />
      <HeroCarousel />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
