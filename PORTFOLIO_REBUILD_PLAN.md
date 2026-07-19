# 作品集系统性重构计划

> 阶段 0 基线日期：2026-07-19  
> 目标岗位：企业级产品体验设计负责人 / B 端复杂系统设计专家 / AI 体验设计负责人  
> 英文定位：Enterprise Product Experience Design Lead

## 1. 重构目标

本次重构不是继续增加视觉特效，而是将现有作品展示站升级为一条可被招聘方快速判断、可追溯、可验证的能力证据链。网站需要在 90 秒内回答以下问题：

1. 候选人是谁，目标岗位是什么。
2. 是否处理过企业级复杂系统、Design System 与 AI 体验设计。
3. 在项目中承担了什么角色，做出了哪些关键决策。
4. 如何与产品、研发、业务和团队协作。
5. 结果如何，数据依据是什么。
6. 是否具备团队管理与设计基础设施建设能力。

## 2. 约束与原则

- 保留 React 19、TypeScript、Vite 和现有核心视觉资产，不另起技术栈。
- 不编造项目数据、奖项、业务结果或个人职责。
- 所有未有来源的数据统一标记为 `TODO_VERIFY`，不得直接作为事实发布。
- 视觉表达服务于内容层级；减少无证据支撑的装饰性动效、重复大图和无效交互。
- 每一阶段均需通过 lint、TypeScript 检查和生产构建后再进入下一阶段。
- 真实项目素材中涉及公司或业务敏感信息时，先完成脱敏和发布授权确认。

## 3. 当前仓库基线

| 项目 | 当前状态 | 主要影响 |
| --- | --- | --- |
| 应用结构 | `src/App.tsx` 约 2000 行，承载首页、所有案例页和交互 | 修改风险集中，内容难复用 |
| 样式结构 | `src/index.css` 约 7000 行，全局样式与多组断点混合 | 响应式和视觉一致性难维护 |
| 页面路由 | 手写 `window.location.hash` 分发 | 案例可分享但缺少独立 SEO 元数据 |
| 案例呈现 | 原生 React 页面、长图、独立 iframe 三种方式并存 | 阅读体验和交互语言不统一 |
| 内容模型 | 项目与能力数据硬编码在组件中 | 无法系统管理角色、决策、验证和指标 |
| 资产体积 | `src/assets` 约 174 MB，原图与优化图并存 | 构建产物和首屏加载风险较高 |
| 外部资源 | Google Fonts、远程视频、远程 Figma 图片 | 稳定性、隐私和部署可控性不足 |
| 测试 | 有 lint，无自动化测试脚本和 Lighthouse 基线 | 回归风险依赖人工检查 |
| SEO | 仅基础 title/description/favicon | 缺少 OG、Twitter、canonical、结构化数据等 |

## 4. 可复用内容与资产

- 首页 3D 角色、设备图标与多端主题视觉可保留为品牌识别层。
- 第二屏 8 张横版展示图可作为“能力宽度”辅助证据，但不替代核心案例。
- 悟空 AR、ADesign、数字孪生现有素材可作为三大核心案例的视觉底稿。
- ADesign 已有部分原生交互模块，可迁移为统一案例组件。
- 数字孪生独立 HTML 可作为交互原型证据，主叙事需回收到 React 案例页。
- 小米智能驾舱、B 端图标库、企业级组件化可作为次级案例或专项能力补充。
- 联系方式与微信二维码可继续复用。
- 现有 390px 移动端 QA 截图可作为后续回归对照，但需扩展到 360/768/1024/1440。

## 5. 目标信息架构

### 主导航

- Home
- Work
- Leadership
- About
- Resume
- Contact

### 首页顺序

1. Hero：姓名、目标岗位、专业范围、主要行动入口。
2. Proof Strip：年限、管理、核心项目、Design System、AI/XR 等可验证摘要。
3. Selected Work：AR 智能巡检、ADesign、数字孪生三大案例。
4. Leadership & Systems：团队管理、设计流程、组件库、协作与审查机制。
5. Awards / Recognition：仅展示有证书、链接或可公开依据的内容。
6. Final CTA：联系、简历、项目浏览入口。

### 招聘者 90 秒视图

首页提供精简证据模式，聚合定位、三个案例结论、领导力摘要、可核验指标和简历入口；不新增虚假摘要数据。

## 6. 目标代码结构

以下结构优先复用现有组件，只拆分真实的页面和内容边界：

```text
src/
  app/
    App.tsx
    routes.tsx
  components/
    navigation/
    case-study/
    ui/
  content/
    profile.ts
    cases.ts
    leadership.ts
  pages/
    HomePage.tsx
    WorkPage.tsx
    CaseStudyPage.tsx
    LeadershipPage.tsx
    AboutPage.tsx
    ResumePage.tsx
  styles/
    tokens.css
    global.css
    components.css
```

路由建议在阶段 1 改为可直接分享的路径路由，并保留旧 hash 的兼容跳转。最终实现前需确认发布平台支持 SPA fallback；若不支持，则采用静态多入口构建。

## 7. 统一案例模型

每个案例必须具备同一叙事结构：

```ts
type VerificationStatus = 'verified' | 'estimated' | 'qualitative' | 'todo'

type CaseMetric = {
  label: string
  value: string
  source: string
  measurementMethod: string
  verificationStatus: VerificationStatus
}

type CaseStudy = {
  slug: string
  title: string
  englishTitle: string
  summary: string
  status: 'published' | 'draft' | 'confidential'
  role: string[]
  duration: string
  team: string[]
  businessContext: string
  targetUsers: string[]
  constraints: string[]
  problems: string[]
  responsibilities: string[]
  keyDecisions: Array<{ decision: string; rationale: string; tradeoff: string }>
  collaboration: string[]
  validation: string[]
  outcome: string[]
  metrics: CaseMetric[]
  evidence: Array<{ type: string; label: string; asset: string }>
  reflection: string[]
}
```

## 8. 分阶段实施顺序

### 阶段 0：仓库与内容审计

- 扫描结构、页面、资产、交互、响应式、SEO 和工程配置。
- 建立计划、内容缺口、实施状态三份文档。
- 运行现有质量检查并记录基线。

### 阶段 1：内容模型与信息架构

- 拆出 profile、case、leadership 内容数据。
- 建立统一 `CaseStudy` 与 `CaseMetric` 类型。
- 加入 `TODO_VERIFY` 机制，阻止未核验指标伪装为事实。
- 建立 Home / Work / Leadership / About / Resume / Contact 路由骨架。

### 阶段 2：首页与 90 秒视图

- 用招聘证据链重排首页。
- 将三大核心案例前置，次级案例进入 Work 列表。
- 减少首屏无效视觉噪音，保留有识别度的多端主题。

### 阶段 3：统一案例模板

- 构建案例 Hero、问题、决策、协作、验证、结果、复盘组件。
- 支持图像放大、键盘关闭、焦点返回和移动端自然排版。
- 长图仅作为补充证据，不再承担整页内容。

### 阶段 4：三大核心案例迁移

- 悟空 AR：任务、导航、识别、异常协作与闭环。
- ADesign：系统目标、AI 工作流、人机控制、Design System 与治理。
- 数字孪生：业务目标、信息架构、监控决策、跨系统协同与结果。

### 阶段 5：Leadership、About 与 Resume

- 建立团队规模、流程、设计评审、组件库治理和跨部门协作证据。
- 重写 About 为专业定位与职业轨迹，不重复简历全文。
- 生成网页简历，并接入可下载 PDF；所有内容与案例一致。

### 阶段 6：视觉系统与响应式

- 建立颜色、字体、间距、圆角、阴影、动效 token。
- 以 `#005DFD` 为主色，控制紫色和高光使用比例。
- 覆盖 360、390、768、1024、1440 及宽屏视口。

### 阶段 7：无障碍、性能与 SEO

- 完成键盘、焦点、语义、对比度和 reduced-motion 检查。
- 清理重复大图，生成响应式 AVIF/WebP/JPEG 资产。
- 本地化关键资源，延迟加载非首屏媒体。
- 增加页面级 title/description、OG、canonical、sitemap、robots 和结构化数据。

### 阶段 8：最终验收与发布

- 核验所有数据、外链、简历、二维码和案例权限。
- 执行浏览器与真机回归、Lighthouse 和生产构建。
- 输出部署说明、回滚方案和发布清单。

## 9. 优先风险清单

| 优先级 | 风险 | 处理阶段 |
| --- | --- | --- |
| P0 | 年限、团队规模、效率、价值等声明暂无公开证据 | 1、4、5 |
| P0 | 三大案例缺少角色、关键决策、验证方法和结果链路 | 1、3、4 |
| P1 | 单文件应用和全局 CSS 使迭代回归风险高 | 1、3、6 |
| P1 | 174 MB 资产、重复原图和大尺寸长图影响性能 | 7 |
| P1 | 数字孪生 iframe 与主站叙事、样式和路由割裂 | 3、4 |
| P1 | 多个视觉按钮没有真实行为 | 2、3、6 |
| P1 | hash 路由无法提供可靠的页面级 SEO | 1、7 |
| P2 | 外部字体、视频和 Figma 图片存在稳定性风险 | 6、7 |
| P2 | 缺少自动化测试、性能预算和可访问性基线 | 7、8 |

## 10. 阶段验收规则

每一阶段完成时必须：

1. 更新 `IMPLEMENTATION_STATUS.md`。
2. 更新新增或消除的 `TODO_VERIFY` 项。
3. 运行 `npm run lint`、`npx tsc --noEmit`、`npm run build`。
4. 对涉及视觉的页面执行桌面与移动端截图检查。
5. 不允许以“后续再修”绕过当前阶段的阻断性错误。
