/* 中英文切换:i18n 字典与语言切换逻辑 */
(function () {
  'use strict';

  var LANG_KEY = 'bioinfoysis-lang';

  var DICT = {
    'meta.title': {
      en: 'Bioinfoysis: A Multi-Agent Framework for Long-Horizon Bioinformatics Analysis — DeepAutonomy Technical Report',
      zh: 'Bioinfoysis:面向长程生物信息学分析的多智能体框架 — DeepAutonomy 技术报告'
    },
    'meta.desc': {
      en: 'Technical report introducing Bioinfoysis, a multi-agent framework for long-horizon, artifact-grounded bioinformatics analysis, achieving 82.4% accuracy on BixBench.',
      zh: '介绍 Bioinfoysis 的技术报告:一个面向长程、产物驱动的生物信息学分析的多智能体框架,在 BixBench 上取得 82.4% 的准确率。'
    },

    'hero.badge': { en: 'Technical Report', zh: '技术报告' },
    'hero.h1': {
      en: 'Bioinfoysis: A Multi-Agent Framework for Long-Horizon Bioinformatics Analysis',
      zh: 'Bioinfoysis:面向长程生物信息学分析的多智能体框架'
    },
    'hero.sub': {
      en: 'A persistent, artifact-grounded analysis harness that combines adaptive planning, governed skills, and controlled execution — achieving state-of-the-art accuracy on BixBench.',
      zh: '一个持久化、产物驱动的分析执行框架,融合自适应规划、受治理技能与受控执行——在 BixBench 上取得最先进的准确率。'
    },
    'nav.official': { en: 'Bioinfoysis Official Website', zh: 'Bioinfoysis 官网' },

    'toc.label': { en: 'Contents', zh: '目录' },
    'toc.abstract': { en: 'Abstract', zh: '摘要' },
    'toc.intro': { en: 'Introduction', zh: '引言' },
    'toc.arch': { en: 'Architecture', zh: '架构' },
    'toc.infra': { en: 'Agent Infrastructure', zh: '智能体基础设施' },
    'toc.eval': { en: 'Evaluation', zh: '评估' },
    'toc.authors': { en: 'Authors', zh: '作者' },
    'toc.demo': { en: 'Demo', zh: '演示' },
    'toc.cite': { en: 'Citation', zh: '引用' },

    'links.paper': { en: 'Read the Paper', zh: '阅读论文' },
    'meta.date': { en: 'August 2026', zh: '2026 年 8 月' },
    'meta.team': { en: 'DeepAutonomy Team', zh: 'DeepAutonomy 团队' },

    'abstract.lab': { en: 'Abstract', zh: '摘要' },
    'abstract.body': {
      en: 'Bioinfoysis is a multi-agent harness that represents each request as a persistent, artifact-grounded analysis run. It combines global planning with step-wise, evidence-driven replanning, coordinates specialized agents through structured handoffs, and preserves every intermediate artifact, trace, and decision needed to inspect, recover, or verify an analysis. On BixBench, Bioinfoysis achieves state-of-the-art accuracy of 82.4%. Across four underlying language models on LAB-Bench2, the harness raises average accuracy from 41.65% to 69.69% on SeqQA2 and from 3.13% to 27.60% on DbQA2.',
      zh: 'Bioinfoysis 是一个多智能体执行框架,将每个请求表示为一个持久化、产物驱动的分析运行(run)。它将全局规划与逐步、证据驱动的重规划相结合,通过结构化交接协调各专业智能体,并保留检查、恢复或验证分析所需的每一个中间产物、追踪记录与决策。在 BixBench 上,Bioinfoysis 达到 82.4% 的最先进准确率。在 LAB-Bench2 的四个底层语言模型上,该框架将 SeqQA2 的平均准确率从 41.65% 提升至 69.69%,将 DbQA2 从 3.13% 提升至 27.60%。'
    },

    'intro.kicker': { en: '01 · Introduction', zh: '01 · 引言' },
    'intro.h2': {
      en: 'Why bioinformatics needs a governed execution harness',
      zh: '为什么生物信息学需要一个受治理的执行框架'
    },
    'intro.p1': {
      en: 'Modern bioinformatics analysis is long-horizon by nature: a single request can require data inspection, tool selection, statistical modeling, code execution, and interpretation across many dependent steps. General-purpose language models can reason about individual steps, but they struggle to keep a multi-hour analysis coherent — intermediate results are lost, workflows drift, and outputs become impossible to verify.',
      zh: '现代生物信息学分析本质上具有长程(long-horizon)特征:单个请求可能涉及数据探查、工具选择、统计建模、代码执行与结果解读等多个相互依赖的步骤。通用语言模型可以对单个步骤进行推理,却难以让持续数小时的分析保持连贯——中间结果丢失、流程漂移、输出无法验证。'
    },
    'intro.p2': {
      en: 'Bioinfoysis addresses this with a governed execution harness. The system treats each analysis as a first-class, persistent run, and its quality is judged not only by the final answer, but by whether the path to that answer can be <strong>executed, inspected, recovered, and verified</strong>. Five capabilities define the design:',
      zh: 'Bioinfoysis 通过一个受治理的执行框架解决这一问题。该系统将每次分析视为一等公民的持久化运行,其质量不仅取决于最终答案,更取决于通往该答案的路径能否被<strong>执行、检查、恢复与验证</strong>。以下五项能力定义了该设计:'
    },
    'intro.li1': {
      en: '<strong>Coordinated multi-agent analysis</strong> — specialized roles for planning, research, coding, and reporting, coordinated through structured handoffs.',
      zh: '<strong>协同多智能体分析</strong>——面向规划、研究、编码与报告的专业角色,通过结构化交接协同工作。'
    },
    'intro.li2': {
      en: '<strong>Evidence-grounded, skill-governed execution</strong> — claims must be backed by executed code and validated artifacts; bioinformatics skills encode domain-correct procedures.',
      zh: '<strong>证据驱动、技能受治理的执行</strong>——结论必须由实际执行的代码与经过验证的产物支撑;生物信息学技能将领域正确的流程编码化。'
    },
    'intro.li3': {
      en: '<strong>Role-specific context and persistent memory</strong> — each agent sees a tailored, budget-aware view of the run, with evidence-backed memory across runs.',
      zh: '<strong>角色专属上下文与持久化记忆</strong>——每个智能体看到为其量身定制、受预算约束的运行视图,并拥有跨运行的证据支撑记忆。'
    },
    'intro.li4': {
      en: '<strong>Structured handoffs and artifact continuity</strong> — results carry their provenance, artifacts, and uncertainty forward.',
      zh: '<strong>结构化交接与产物连续性</strong>——结果随其溯源信息、产物与不确定性一并传递。'
    },
    'intro.li5': {
      en: '<strong>Trace-based audit and evaluation</strong> — every call, tool use, and failure is recorded for audit and recovery.',
      zh: '<strong>基于追踪的审计与评估</strong>——每一次调用、工具使用与失败都被记录,供审计与恢复。'
    },

    'arch.kicker': { en: '02 · Architecture', zh: '02 · 架构' },
    'arch.h2': { en: 'Three layers, five roles', zh: '三层架构,五种角色' },
    'arch.p1': {
      en: 'The system is organized into three layers: an <strong>orchestration layer</strong> that maintains an adaptive plan and checklist; a <strong>scientific capability and execution layer</strong> providing tools, governed skills, isolated code execution, and artifact validation; and an <strong>observability layer</strong> that records traces, analytics, and audit records.',
      zh: '系统组织为三层:维护自适应计划与检查清单的<strong>编排层</strong>;提供工具、受治理技能、隔离代码执行与产物验证的<strong>科学能力与执行层</strong>;以及记录追踪、分析与审计记录的<strong>可观测层</strong>。'
    },
    'arch.figcap': {
      en: '<b>Figure 1.</b> Overview of the Bioinfoysis framework. Five functional roles — coordinator, planner, researcher, coder, and reporter — operate over an adaptive checklist, with an optional human-feedback gate. After the plan is accepted, the planner enters planner-supervisor mode, reviewing step outcomes and triggering replanning when evidence demands it.',
      zh: '<b>图 1.</b> Bioinfoysis 框架总览。五种职能角色——协调者、规划者、研究者、编码者与报告者——在自适应检查清单之上协作运行,并带有一个可选的人工反馈关卡。计划被接受后,规划者进入“规划者-监督者”模式,审查每个步骤的结果,并在证据要求时触发重规划。'
    },
    'arch.h3a': { en: 'Adaptive planning', zh: '自适应规划' },
    'arch.p2': {
      en: 'Unlike fixed plan-then-execute pipelines, Bioinfoysis replans step-wise. The planner issues a global plan, then revises the remaining checklist as intermediate results arrive — a failed statistical test, an unexpected data shape, or a contradictory finding can all trigger a bounded, evidence-driven replan rather than a blind continuation.',
      zh: '与“先计划后执行”的固定流水线不同,Bioinfoysis 逐步重规划。规划者发布全局计划后,随着中间结果的出现不断修订剩余检查清单——统计检验失败、意外的数据形态、相互矛盾的发现,都可以触发一次有界、证据驱动的重规划,而不是盲目地继续执行。'
    },
    'arch.h3b': { en: 'Governed skills and tools', zh: '受治理的技能与工具' },
    'arch.p3': {
      en: 'Domain correctness is encoded as skills: reusable, versioned procedures (differential expression, enrichment, variant calling, QC) that specify applicable inputs, assumptions, and expected artifacts. Skills constrain the coder to scientifically defensible workflows instead of ad-hoc script generation.',
      zh: '领域正确性以技能(skill)的形式编码:可复用、带版本的流程(差异表达、富集分析、变异检测、质量控制),明确规定适用的输入、假设与预期产物。技能将编码者约束在科学上站得住脚的工作流内,而非临时的脚本生成。'
    },

    'infra.kicker': { en: '03 · Agent Infrastructure', zh: '03 · 智能体基础设施' },
    'infra.h2': {
      en: 'Persistent runs and artifact-grounded execution',
      zh: '持久化运行与产物驱动的执行'
    },
    'infra.h3a': { en: 'Persistent runs and controlled execution', zh: '持久化运行与受控执行' },
    'infra.p1': {
      en: 'Each analysis is stored as a persistent run with a stable identifier, registered inputs, workflow state, an ordered event history, and an artifact index. Runs execute in run-specific workspaces with serialized state-changing operations, so concurrent analyses cannot overwrite one another, and interrupted runs resume from a valid checkpoint under the same identifier.',
      zh: '每次分析都存储为一个持久化运行,具有稳定标识符、登记的输入、工作流状态、有序事件历史与产物索引。运行在专属工作区中执行,状态变更操作被串行化,因此并发分析不会相互覆盖;被中断的运行可以在同一标识符下从有效检查点恢复。'
    },
    'infra.h3b': { en: 'Role-specific context and persistent memory', zh: '角色专属上下文与持久化记忆' },
    'infra.p2': {
      en: 'The full conversation is never dumped into every prompt. Each role receives a tailored view — the planner sees the task and checklist, the coder sees the active step and relevant inputs, the reporter sees validated results. Large tool outputs are stored outside the prompt behind stable identifiers, and only evidence-backed facts from completed runs are promoted to persistent memory.',
      zh: '完整对话永远不会被塞进每一个提示。每个角色获得量身定制的视图——规划者看到任务与检查清单,编码者看到当前步骤与相关输入,报告者看到已验证的结果。大型工具输出以稳定标识符存储在提示之外,只有来自已完成运行的、有证据支撑的事实才会被提升为持久化记忆。'
    },
    'infra.h3c': { en: 'Artifact-grounded execution', zh: '产物驱动的执行' },
    'infra.p3': {
      en: 'Generated outputs are managed as run artifacts, not paths mentioned in a response. Reported scripts, tables, and figures are resolved inside the permitted workspace, checked for existence, and validated against the requested output. Before completion, public artifacts are frozen and indexed with content hashes; if a required deliverable cannot be published, the run is not reported as successful.',
      zh: '生成的输出作为运行产物管理,而不是响应中提到的路径。上报的脚本、表格与图形都在允许的工作区内解析,检查其存在性,并针对所请求的输出进行验证。完成前,公开产物被冻结并以内容哈希建立索引;如果必需交付物无法发布,该运行不会被报告为成功。'
    },
    'infra.h3d': { en: 'Trace, audit, and recovery', zh: '追踪、审计与恢复' },
    'infra.p4': {
      en: 'A sanitized public event stream serves users, while an internal trace records agent calls, tool use, retrieval, and failures. Recovery is checkpoint-based: publication and memory updates are protected from double-application, and cancellation stops at safe workflow boundaries, leaving runs resumable.',
      zh: '经脱敏的公开事件流服务于用户,内部追踪则记录智能体调用、工具使用、检索与失败。恢复基于检查点:发布与记忆更新受防重复应用保护,取消操作在安全的工作流边界停止,使运行保持可恢复。'
    },
    'infra.callout': {
      en: 'System quality is judged by whether the path to an answer can be executed, inspected, recovered, and verified — not by the answer alone.',
      zh: '系统质量的评判标准,是通往答案的路径能否被执行、检查、恢复与验证——而不仅仅是答案本身。'
    },

    'eval.kicker': { en: '04 · Evaluation', zh: '04 · 评估' },
    'eval.h2': {
      en: 'State of the art on BixBench, consistent gains on LAB-Bench2',
      zh: 'BixBench 上达到最先进,LAB-Bench2 上稳定提升'
    },
    'eval.p1': {
      en: 'We evaluate on a complementary benchmark suite: <strong>BixBench</strong>, 61 real-world analysis capsules yielding 205 open-ended questions across ~20 domains, measuring end-to-end executable analysis; and <strong>LAB-Bench2</strong>, where we focus on SeqQA2 (400 questions) and DbQA2 (86 questions), measuring sequence-analysis reasoning and database retrieval.',
      zh: '我们在互补的基准套件上进行评估:<strong>BixBench</strong> 包含 61 个真实世界的分析案例,衍生出约 20 个领域的 205 道开放式问题,衡量端到端的可执行分析;以及 <strong>LAB-Bench2</strong>,我们重点关注 SeqQA2(400 题)与 DbQA2(86 题),衡量序列分析推理与数据库检索。'
    },
    'eval.h3a': { en: 'BixBench: 82.4% accuracy, first place', zh: 'BixBench:82.4% 准确率,排名第一' },
    'eval.p2': {
      en: 'With Kimi-K2.6 as the underlying agent model, Bioinfoysis answers 169 of 205 questions correctly, outperforming the second-ranked GPT Rosalind by 7.3 percentage points and exceeding GPT-5.4 Agent and Grok-4.2 Agent by 9.2 and 9.6 points. Against bioinformatics-oriented systems, it improves over Biomni Lab and BioAgent by 30.2 and 33.6 points. Because bioinformatics conventions can change conclusions, our evaluation additionally audits code-execution correctness, artifact generation, and traceability — see the full report for the benchmark audit protocol.',
      zh: '以 Kimi-K2.6 作为底层智能体模型,Bioinfoysis 正确回答了 205 题中的 169 题,比第二名 GPT Rosalind 高出 7.3 个百分点,比 GPT-5.4 Agent 和 Grok-4.2 Agent 分别高出 9.2 与 9.6 个百分点。相较面向生物信息学的系统,它比 Biomni Lab 与 BioAgent 分别高出 30.2 与 33.6 个百分点。由于生物信息学惯例的差异可能改变结论,我们的评估还审计了代码执行正确性、产物生成与可追溯性——完整报告中有基准审计协议。'
    },
    'eval.figcap2': {
      en: '<b>Figure 2.</b> BixBench leaderboard. Bioinfoysis achieves the highest accuracy of 82.4% (169/205), outperforming the second-ranked system by 7.3 percentage points.',
      zh: '<b>图 2.</b> BixBench 排行榜。Bioinfoysis 取得最高准确率 82.4%(169/205),比排名第二的系统高出 7.3 个百分点。'
    },

    't1.caption': {
      en: '<span class="no">Table 1</span>Domain-wise results of Bioinfoysis (Kimi-K2.6) on BixBench',
      zh: '<span class="no">表 1</span>Bioinfoysis(Kimi-K2.6)在 BixBench 上的分领域结果'
    },
    't1.th1': { en: 'Domain', zh: '领域' },
    't1.th2': { en: 'Capsules', zh: '案例数' },
    't1.th3': { en: 'Correct', zh: '正确数' },
    't1.th4': { en: 'Questions', zh: '问题数' },
    't1.th5': { en: 'Accuracy', zh: '准确率' },
    't1.d1': { en: 'Functional Genomics &amp; Pathway Enrichment', zh: '功能基因组学与通路富集' },
    't1.d2': { en: 'Genomic Variant Analysis', zh: '基因组变异分析' },
    't1.d3': { en: 'Transcriptomics &amp; Differential Expression', zh: '转录组学与差异表达' },
    't1.d4': { en: 'Phylogenetics &amp; Comparative Genomics', zh: '系统发育与比较基因组学' },
    't1.d5': { en: 'Epigenomics', zh: '表观基因组学' },
    't1.d6': { en: 'Clinical Research &amp; Biostatistics', zh: '临床研究与生物统计学' },
    't1.d7': { en: 'Bioimaging &amp; Quantitative Phenotyping', zh: '生物成像与定量表型' },
    't1.d8': { en: 'Single-Cell Transcriptomics', zh: '单细胞转录组学' },
    't1.d9': { en: 'Proteomics', zh: '蛋白质组学' },
    't1.d10': { en: 'Multi-Omics Integration &amp; Machine Learning', zh: '多组学整合与机器学习' },
    't1.d11': { en: 'Microbial Genomics &amp; Antimicrobial Resistance', zh: '微生物基因组学与耐药性' },
    't1.overall': { en: 'Overall', zh: '总体' },
    't1.note': {
      en: 'Errors concentrate in Functional Genomics (70.97%) and Transcriptomics (71.43%), which together account for 21 of 36 incorrect answers — tasks where dependent decisions (sample selection, model specification, identifier conversion) let early errors propagate. 100% results in small categories (2–4 questions) should not be read as uniformly solved capability.',
      zh: '错误集中在功能基因组学(70.97%)与转录组学(71.43%),两者合计占 36 道错误答案中的 21 道——这些任务中,依赖性的决策(样本选择、模型设定、标识符转换)让早期错误得以传播。小类别(2–4 题)的 100% 结果不应被解读为完全解决的能力。'
    },

    'eval.h3b': {
      en: 'LAB-Bench2: large, consistent gains across four models',
      zh: 'LAB-Bench2:四个模型上大幅、稳定的提升'
    },
    'eval.p3': {
      en: 'On SeqQA2, Bioinfoysis improves every evaluated model, with gains of 30.50, 36.89, and 34.50 points for Kimi-K2.6, DeepSeek, and GLM. Many sequence-analysis questions can be converted into deterministic operations, and the harness decomposes them into explicit, executable steps. DbQA2 is far harder for direct inference — base models average just 3.13% — while Bioinfoysis reaches 27.60% on average by completing the full retrieve–process–answer workflow.',
      zh: '在 SeqQA2 上,Bioinfoysis 提升了每一个被评估模型,Kimi-K2.6、DeepSeek 与 GLM 分别提升 30.50、36.89 与 34.50 个百分点。许多序列分析问题可以转化为确定性操作,该框架将其分解为显式、可执行的步骤。DbQA2 对直接推理来说困难得多——基础模型平均仅 3.13%——而 Bioinfoysis 通过完成完整的“检索–处理–回答”工作流,平均达到 27.60%。'
    },

    't2.caption': {
      en: '<span class="no">Table 2</span>LAB-Bench2 success rates: Bioinfoysis vs. base model',
      zh: '<span class="no">表 2</span>LAB-Bench2 成功率:Bioinfoysis vs. 基础模型'
    },
    't2.th1': { en: 'Benchmark', zh: '基准' },
    't2.th2': { en: 'System', zh: '系统' },
    't2.th3': { en: 'Average', zh: '平均' },
    't2.seqqa': { en: 'SeqQA2 (400 q)', zh: 'SeqQA2(400 题)' },
    't2.dbqa': { en: 'DbQA2 (86 q)', zh: 'DbQA2(86 题)' },
    't2.base': { en: 'Base model', zh: '基础模型' },
    't2.note': {
      en: 'SeqQA2 uses Kimi-K2.6, GPT-5.5, DeepSeek-V4-Pro, and GLM-5.2. For DbQA2, the reported base model for DeepSeek is DeepSeek-V4-Flash, making that column a system-level rather than strictly model-matched comparison.',
      zh: 'SeqQA2 使用 Kimi-K2.6、GPT-5.5、DeepSeek-V4-Pro 与 GLM-5.2。对于 DbQA2,DeepSeek 列所报告的基础模型为 DeepSeek-V4-Flash,因此该列是系统层面的比较,而非严格的模型匹配比较。'
    },

    'eval.figcap3': {
      en: '<b>Figure 3.</b> Category-level performance on SeqQA2. Each cell reports the success rate for one of the 20 SeqQA2 task categories under a given model and system configuration; darker red indicates higher accuracy. Gains extend broadly across categories rather than concentrating in a few.',
      zh: '<b>图 3.</b> SeqQA2 的类别级表现。每个格子报告 20 个 SeqQA2 任务类别之一在特定模型与系统配置下的成功率;红色越深表示准确率越高。提升广泛分布于各类别,而非集中于少数。'
    },

    'eval.h3c': { en: 'Ablations: memory and skills dominate', zh: '消融实验:记忆与技能贡献最大' },
    'eval.p4': {
      en: 'On all 205 BixBench questions with GPT-5.4, removing persistent memory costs 22.44 points and removing bioinformatics skills costs 19.02 points — the two largest contributors. ReAct-style planning contributes 6.83 points, and removing the entire skill catalog drops accuracy to 42.44%. The harness also transfers across models, holding 77–82% accuracy with Kimi-K2.6, GPT-5.4, and DeepSeek-V4-Pro.',
      zh: '在 GPT-5.4 下的全部 205 道 BixBench 题目上,移除持久化记忆损失 22.44 分,移除生物信息学技能损失 19.02 分——这是两个最大的贡献项。ReAct 式规划贡献 6.83 分,移除整个技能目录则使准确率降至 42.44%。该框架还能跨模型迁移:使用 Kimi-K2.6、GPT-5.4 与 DeepSeek-V4-Pro 时保持 77–82% 的准确率。'
    },

    't3.caption': {
      en: '<span class="no">Table 3</span>Component ablations on BixBench (Δ Acc. relative to full GPT-5.4 configuration)',
      zh: '<span class="no">表 3</span>BixBench 组件消融(Δ 准确率,相对完整 GPT-5.4 配置)'
    },
    't3.th1': { en: 'Configuration', zh: '配置' },
    't3.th2': { en: 'Agent model', zh: '智能体模型' },
    't3.th3': { en: 'Skills', zh: '技能数' },
    't3.th4': { en: 'Accuracy', zh: '准确率' },
    't3.th5': { en: 'Correct', zh: '正确数' },
    't3.th6': { en: 'Δ Acc.', zh: 'Δ 准确率' },
    't3.full': { en: 'Bioinfoysis (full)', zh: 'Bioinfoysis(完整)' },
    't3.noreact': { en: 'w/o ReAct-style planning', zh: '无 ReAct 式规划' },
    't3.nomem': { en: 'w/o memory', zh: '无记忆' },
    't3.noskills': { en: 'w/o bioinformatics skills', zh: '无生物信息学技能' },
    't3.noall': { en: 'w/o all skills', zh: '无全部技能' },

    'authors.kicker': { en: '05 · Authors', zh: '05 · 作者' },
    'authors.h2': { en: 'Author list and acknowledgments', zh: '作者名单与致谢' },
    'authors.core': { en: 'Core Contributors', zh: '核心贡献者' },
    'authors.contrib': { en: 'Contributors', zh: '贡献者' },
    'authors.leaders': { en: 'Project Leaders', zh: '项目负责人' },
    'authors.note': {
      en: '* indicates individuals who have since left the team.',
      zh: '* 表示已离开团队的成员。'
    },

    'demo.kicker': { en: '06 · Demo', zh: '06 · 演示' },
    'demo.h2': { en: 'Five Bioinformatics Case Studies', zh: '五个生物信息学案例演示' },

    'dlg.close': { en: 'Close', zh: '关闭' },
    'dlg.tab1': { en: 'Task Background', zh: '任务背景' },
    'dlg.tab2': { en: 'View Report', zh: '浏览报告' },
    'dlg.resultLabel': { en: 'Key Result', zh: '主要结果' },
    'dlg.frameTitle': { en: 'Analysis report', zh: '分析报告' },
    'dlg.note': {
      en: 'Report available for online viewing only.',
      zh: '报告仅用于在线浏览。'
    },
    'dlg.prev': { en: '← Previous', zh: '← 上一个' },
    'dlg.next': { en: 'Next →', zh: '下一个 →' },

    'cite.kicker': { en: '07 · Citation', zh: '07 · 引用' },
    'cite.h2': { en: 'Citing Bioinfoysis', zh: '引用 Bioinfoysis' },
    'cite.p': {
      en: 'If Bioinfoysis helps your research, please cite the report:',
      zh: '如果 Bioinfoysis 对您的研究有帮助,请引用该报告:'
    },
    'cite.copy': { en: 'COPY BIBTEX', zh: '复制 BIBTEX' }
  };

  var current = 'en';
  try {
    current = localStorage.getItem(LANG_KEY) || 'en';
  } catch (err) {}
  if (current !== 'zh' && current !== 'en') current = 'en';

  function t(key, lang) {
    var entry = DICT[key];
    if (!entry) return '';
    return entry[lang] != null ? entry[lang] : entry.en;
  }

  function apply(lang) {
    current = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t('meta.title', lang);

    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.desc', lang));

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n'), lang);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'), lang));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title'), lang));
    });
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = lang === 'zh' ? 'English' : '中文';
      btn.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换为中文');
    });

    try { localStorage.setItem(LANG_KEY, lang); } catch (err) {}
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  /* BibTeX 复制按钮 */
  var copyBtn = document.querySelector('.copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var pre = copyBtn.nextElementSibling;
      if (!pre) return;
      var flash = function () {
        copyBtn.textContent = current === 'zh' ? '已复制' : 'COPIED';
        setTimeout(function () {
          copyBtn.innerHTML = t('cite.copy', current);
        }, 1500);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(pre.innerText).then(flash);
      }
    });
  }

  document.querySelectorAll('.lang-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      apply(current === 'zh' ? 'en' : 'zh');
    });
  });

  apply(current);
})();
