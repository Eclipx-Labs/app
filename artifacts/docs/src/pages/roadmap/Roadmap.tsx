import { useLanguage } from "@/lib/LanguageContext";

const phases = {
  en: [
    {
      label: "Phase 1",
      status: "COMPLETE",
      statusColor: "#22C55E",
      title: "Foundation",
      summary:
        "QryptSafe deployed and battle-tested across six sequential contract versions, 270 passing tests, live on Ethereum mainnet.",
      items: [
        "Personal vaults: wallet signature + 100-step keccak256 OTP ratchet chain. Neither factor alone is sufficient.",
        "qToken system: non-transferable receipt tokens, per-vault address isolation, full and partial unshield.",
        "QryptAir: EIP-712 offline vouchers, single-use with expiry, no mempool exposure at sign time.",
        "QryptShield: native Railgun ZK routing, qToken burn + Railgun deposit in one atomic transaction.",
        "Private broadcaster via broadcaster.qryptum.eth, your wallet is not the Etherscan sender.",
        "Docs on IPFS via ENS at qryptum.eth.limo, zero centralized server dependency.",
        "Testnet and mainnet contracts verified on Etherscan. 6 versions, 270/270 tests pass.",
      ],
    },
    {
      label: "Phase 2",
      status: "NEXT",
      statusColor: "#F59E0B",
      title: "Intelligence and Offline Transfer",
      summary:
        "AI assistance embedded in the protocol interface, and a fully offline transfer mode requiring zero internet at signing time.",
      subsections: [
        {
          title: "AI Integration",
          body:
            "An AI assistant trained on the full QryptSafe protocol spec is embedded directly in the docs and app. It answers questions about vault operations, OTP chain mechanics, Railgun routing, and contract behavior without leaving the interface.",
        },
        {
          title: "QryptOffline: Full Offline Transfer",
          body:
            "A sender generates a signed EIP-712 transfer voucher with no internet connection. The signed payload is encoded as a QR code. The recipient scans the QR and broadcasts the redeemVoucher() transaction. The sender never needs to be online at broadcast time. Vouchers are single-use with a deadline enforced on-chain. Three transfer modes in one panel: QryptSafe (commit-reveal), QryptShield (Railgun ZK), QryptOffline (QR voucher).",
        },
      ],
    },
    {
      label: "Phase 3",
      status: "PLANNED",
      statusColor: "#8B5CF6",
      title: "Chain Expansion",
      summary:
        "Bring the QryptSafe vault architecture to Ethereum L2s using the same factory pattern already verified on mainnet.",
      items: [
        "Deploy to Arbitrum, Base, and Optimism using the existing EIP-1167 factory, no contract redesign required.",
        "Native ETH wrapping so users shield ETH directly without a separate WETH step.",
        "LST (liquid staked ETH) and LP token compatibility.",
        "Gasless UX: meta-transaction relay so vault operations deduct gas from the shielded balance instead of requiring ETH in the connected wallet.",
      ],
    },
    {
      label: "Phase 4",
      status: "PLANNED",
      statusColor: "#06B6D4",
      title: "Post-Quantum Hardening",
      summary:
        "Replace classical cryptographic assumptions with quantum-resistant primitives across the full stack.",
      items: [
        "Replace ECDSA wallet signatures with a NIST-standardized post-quantum scheme (CRYSTALS-Dilithium or FALCON) for vault authorization. The OTP ratchet chain is already quantum-resistant to brute force; this closes the signing layer.",
        "Upgrade the broadcaster relay signing to match vault-level post-quantum guarantees, removing the last classically vulnerable path in the transaction flow.",
        "Independent third-party cryptographic audit of the full post-quantum stack before mainnet migration.",
      ],
    },
    {
      label: "Phase 5",
      status: "PLANNED",
      statusColor: "#F97316",
      title: "Qrypt Chain",
      summary:
        "A dedicated Qrypt blockchain built exclusively for private transactions and ecosystem utility. Qrypt Chain is not a general-purpose trading chain. There is no public order book, no open DEX, and no external token listings. Every feature on the chain exists to serve one purpose: private, secure asset movement within the Qryptum ecosystem, powered entirely by $Qrypt.",
      items: [
        "$Qrypt replaces ETH as the gas token across the entire Qryptum protocol. Vault operations, transfers, and all on-chain interactions are paid in $Qrypt. No ETH required at any point.",
        "Every transaction burns a portion of $Qrypt permanently, reducing total supply over time. Higher protocol activity means faster burn. The chain is deflationary by design, not by governance vote.",
        "Auto-bridge for all ERC-20 assets: any token held on Ethereum mainnet or supported L2s can be bridged to Qrypt Chain in one click, with the bridge itself secured by the same two-factor vault proof system.",
        "Private swap natively on Qrypt Chain. Token swaps are routed through a ZK-shielded AMM where the input, output, and swap path are hidden from the public mempool. Trade without exposing position size or strategy.",
        "Community broadcaster program: anyone can run a broadcaster node and earn $Qrypt rewards for relaying vault transactions. This decentralizes the relay layer from a single protocol-operated node to a permissionless network of community broadcasters, each staking $Qrypt to participate.",
        "The Qrypt chain is purpose-built around the QryptSafe vault architecture, with native support for the two-factor proof system and broadcaster relay at the protocol level.",
        "Migration path from Ethereum mainnet to Qrypt Chain for all existing vault holders, with a non-custodial bridge for ERC-20 assets and $Qrypt liquidity.",
      ],
    },
  ],
  ru: [
    {
      label: "Фаза 1",
      status: "ЗАВЕРШЕНО",
      statusColor: "#22C55E",
      title: "Основа",
      summary:
        "QryptSafe развёрнут и проверен на шести последовательных версиях контракта, 270 тестов прошли, работает в основной сети Ethereum.",
      items: [
        "Личные хранилища: подпись кошелька + 100-шаговая цепочка OTP keccak256. Ни один фактор сам по себе недостаточен.",
        "Система qToken: непередаваемые токены-квитанции, изоляция адресов по хранилищу, полное и частичное снятие защиты.",
        "QryptAir: офлайн-ваучеры EIP-712, одноразовые с истечением срока, без утечки в мемпул при подписании.",
        "QryptShield: нативная маршрутизация Railgun ZK, сжигание qToken + депозит Railgun в одной атомарной транзакции.",
        "Приватный broadcaster через broadcaster.qryptum.eth, ваш кошелёк не является отправителем в Etherscan.",
        "Документация на IPFS через ENS по адресу qryptum.eth.limo, нулевая зависимость от централизованных серверов.",
        "Контракты тестнета и основной сети верифицированы на Etherscan. 6 версий, 270/270 тестов.",
      ],
    },
    {
      label: "Фаза 2",
      status: "СЛЕДУЮЩАЯ",
      statusColor: "#F59E0B",
      title: "Интеллект и офлайн-переводы",
      summary:
        "AI-ассистент встроен в интерфейс протокола, и полностью офлайн-режим перевода без интернета при подписании.",
      subsections: [
        {
          title: "Интеграция ИИ",
          body:
            "ИИ-ассистент, обученный на полной спецификации протокола QryptSafe, встроен прямо в документацию и приложение. Отвечает на вопросы об операциях с хранилищем, механике цепочки OTP, маршрутизации Railgun и поведении контрактов.",
        },
        {
          title: "QryptOffline: Полный офлайн-перевод",
          body:
            "Отправитель создаёт подписанный ваучер перевода EIP-712 без подключения к интернету. Подписанная полезная нагрузка кодируется в QR-код. Получатель сканирует QR и транслирует транзакцию redeemVoucher(). Ваучеры одноразовые с дедлайном, защита от повторного использования на уровне контракта.",
        },
      ],
    },
    {
      label: "Фаза 3",
      status: "ЗАПЛАНИРОВАНО",
      statusColor: "#8B5CF6",
      title: "Расширение сетей",
      summary:
        "Принести архитектуру хранилищ QryptSafe в L2-сети Ethereum, используя ту же фабричную схему, верифицированную в основной сети.",
      items: [
        "Развёртывание на Arbitrum, Base и Optimism с использованием существующей фабрики EIP-1167, без изменения контракта.",
        "Нативный оборот ETH для прямого экранирования ETH без отдельного шага WETH.",
        "Совместимость с LST (liquid staked ETH) и LP-токенами.",
        "Безгазовый UX: мета-транзакции, чтобы операции с хранилищем вычитали газ из защищённого баланса.",
      ],
    },
    {
      label: "Фаза 4",
      status: "ЗАПЛАНИРОВАНО",
      statusColor: "#06B6D4",
      title: "Постквантовое усиление",
      summary:
        "Замена классических криптографических допущений на квантово-устойчивые примитивы по всему стеку.",
      items: [
        "Замена подписей ECDSA на стандартизированную NIST постквантовую схему (CRYSTALS-Dilithium или FALCON) для авторизации хранилища.",
        "Обновление подписей broadcaster-релея для соответствия постквантовым гарантиям на уровне хранилища.",
        "Независимый сторонний криптографический аудит всего постквантового стека перед миграцией в основную сеть.",
      ],
    },
    {
      label: "Фаза 5",
      status: "ЗАПЛАНИРОВАНО",
      statusColor: "#F97316",
      title: "Qrypt Chain",
      summary:
        "Выделенный блокчейн Qrypt, созданный исключительно для приватных транзакций и утилит экосистемы. Qrypt Chain не является блокчейном общего назначения для торговли. Здесь нет публичного ордербука, открытой DEX и листинга сторонних токенов. Каждая функция цепочки служит одной цели: приватное и безопасное движение активов внутри экосистемы Qryptum, полностью на $Qrypt.",
      items: [
        "$Qrypt заменяет ETH как токен для оплаты газа во всём протоколе Qryptum. Операции с хранилищем, переводы и все взаимодействия on-chain оплачиваются в $Qrypt. ETH больше не требуется ни на каком этапе.",
        "Каждая транзакция безвозвратно сжигает часть $Qrypt, постоянно уменьшая общее предложение. Чем выше активность протокола, тем быстрее сжигание. Дефляция заложена в дизайне цепочки, а не регулируется голосованием.",
        "Автоматический мост для всех ERC-20 активов: любой токен на Ethereum mainnet или поддерживаемых L2 можно переместить в Qrypt Chain в один клик. Сам мост защищён той же двухфакторной системой доказательств хранилища.",
        "Приватный своп нативно на Qrypt Chain. Обмены токенов маршрутизируются через ZK-защищённый AMM, где входные данные, выходные данные и путь свопа скрыты от публичного мемпула. Торгуйте, не раскрывая размер позиции или стратегию.",
        "Программа сообщества broadcaster: любой желающий может запустить узел broadcaster и получать вознаграждения в $Qrypt за ретрансляцию транзакций хранилища. Это децентрализует уровень ретрансляции от одного узла протокола до беспермиссионной сети community broadcaster-ов, каждый из которых стейкает $Qrypt для участия.",
        "Qrypt Chain разработан специально под архитектуру хранилищ QryptSafe с нативной поддержкой двухфакторной системы доказательств и broadcaster-релея на уровне протокола.",
        "Путь миграции с Ethereum mainnet на Qrypt Chain для всех существующих владельцев хранилищ, с некастодиальным мостом для ERC-20 активов и ликвидности $Qrypt.",
      ],
    },
  ],
  zh: [
    {
      label: "阶段 1",
      status: "已完成",
      statusColor: "#22C55E",
      title: "基础建设",
      summary:
        "QryptSafe 经过六个连续合约版本的测试，270 个测试全部通过，已在以太坊主网上线。",
      items: [
        "个人金库：钱包签名 + 100 步 keccak256 OTP 棘轮链。任何单一因素都不足以访问。",
        "qToken 系统：不可转让的收据代币，按金库地址隔离，支持全额和部分解封。",
        "QryptAir：EIP-712 离线凭证，单次使用并带有过期时间，签名时不暴露于内存池。",
        "QryptShield：原生 Railgun ZK 路由，qToken 销毁 + Railgun 存款在一个原子交易中完成。",
        "通过 broadcaster.qryptum.eth 的私人广播器，您的钱包不会出现在 Etherscan 的发送方。",
        "文档托管在 IPFS 上，通过 ENS 访问 qryptum.eth.limo，零中心化服务器依赖。",
        "测试网和主网合约已在 Etherscan 上验证。6 个版本，270/270 测试通过。",
      ],
    },
    {
      label: "阶段 2",
      status: "下一阶段",
      statusColor: "#F59E0B",
      title: "智能与离线转账",
      summary:
        "AI 助手嵌入协议界面，以及签名时无需网络连接的全离线转账模式。",
      subsections: [
        {
          title: "AI 集成",
          body:
            "经过完整 QryptSafe 协议规范训练的 AI 助手直接嵌入文档和应用程序中，回答有关金库操作、OTP 链机制、Railgun 路由和合约行为的问题。",
        },
        {
          title: "QryptOffline：完全离线转账",
          body:
            "发送方无需网络连接即可生成已签名的 EIP-712 转账凭证。签名后的数据被编码为 QR 码。接收方扫描 QR 码并广播 redeemVoucher() 交易。凭证为一次性使用，链上强制执行截止日期和防重放保护。",
        },
      ],
    },
    {
      label: "阶段 3",
      status: "已规划",
      statusColor: "#8B5CF6",
      title: "多链扩展",
      summary:
        "使用已在主网验证的相同工厂模式，将 QryptSafe 金库架构带到以太坊 L2。",
      items: [
        "使用现有 EIP-1167 工厂部署到 Arbitrum、Base 和 Optimism，无需重新设计合约。",
        "原生 ETH 封装流程，用户可直接屏蔽 ETH，无需单独的 WETH 步骤。",
        "LST（液态质押 ETH）和 LP 代币兼容性。",
        "无 Gas 用户体验：元交易中继，使金库操作从屏蔽余额中扣除 Gas，无需连接钱包中持有 ETH。",
      ],
    },
    {
      label: "阶段 4",
      status: "已规划",
      statusColor: "#06B6D4",
      title: "后量子加固",
      summary:
        "在整个技术栈中以量子抗性原语替换经典密码学假设。",
      items: [
        "将 ECDSA 钱包签名替换为 NIST 标准化的后量子方案（CRYSTALS-Dilithium 或 FALCON）用于金库授权。OTP 棘轮链已对量子暴力破解具有抗性；此举封闭签名层。",
        "升级广播中继签名以匹配金库级别的后量子保证，消除交易流程中最后一个经典易受攻击的路径。",
        "在主网迁移前对完整后量子技术栈进行独立第三方密码学审计。",
      ],
    },
    {
      label: "阶段 5",
      status: "已规划",
      statusColor: "#F97316",
      title: "Qrypt Chain",
      summary:
        "专为私密交易与生态系统功能而构建的 Qrypt 专用区块链。Qrypt Chain 并非通用交易链，链上没有公开订单簿、开放式 DEX 或外部代币上市。链上的每项功能只服务于一个目的：在 Qryptum 生态系统内进行私密、安全的资产流转，全部由 $Qrypt 驱动。",
      items: [
        "$Qrypt 取代 ETH，成为整个 Qryptum 协议的 Gas 代币。金库操作、转账及所有链上交互均以 $Qrypt 支付。任何环节都不再需要 ETH。",
        "每笔交易永久销毁一部分 $Qrypt，持续减少总供应量。协议活跃度越高，销毁速度越快。通缩机制由链的设计决定，而非由治理投票控制。",
        "所有 ERC-20 资产自动跨链：以太坊主网或支持 L2 上持有的任意代币，可一键桥接至 Qrypt Chain。跨链桥本身由相同的双因素金库证明系统保护。",
        "Qrypt Chain 原生私密兑换。代币兑换通过 ZK 屏蔽 AMM 路由，输入、输出及兑换路径均对公开内存池不可见。交易时无需暴露仓位大小或策略。",
        "社区广播者计划：任何人均可运行广播者节点，通过中继金库交易赚取 $Qrypt 奖励。这将中继层从单一协议节点分散为无许可的社区广播者网络，参与者需质押 $Qrypt。",
        "Qrypt Chain 专为 QryptSafe 金库架构而构建，在协议层原生支持双因素证明系统与广播中继。",
        "为所有现有金库持有者提供从以太坊主网迁移至 Qrypt Chain 的路径，并配备非托管跨链桥，支持 ERC-20 资产与 $Qrypt 流动性转移。",
      ],
    },
  ],
};

const statusBg: Record<string, string> = {
  COMPLETE: "rgba(34,197,94,0.12)",
  DONE: "rgba(34,197,94,0.12)",
  ЗАВЕРШЕНО: "rgba(34,197,94,0.12)",
  已完成: "rgba(34,197,94,0.12)",
  NEXT: "rgba(245,158,11,0.12)",
  "СЛЕДУЮЩАЯ": "rgba(245,158,11,0.12)",
  下一阶段: "rgba(245,158,11,0.12)",
  PLANNED: "rgba(139,92,246,0.10)",
  ЗАПЛАНИРОВАНО: "rgba(139,92,246,0.10)",
  已规划: "rgba(139,92,246,0.10)",
};

export default function Roadmap() {
  const { lang } = useLanguage();
  const data = phases[lang] ?? phases.en;

  return (
    <div className="docs-content">
      <div style={{ marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "hsl(var(--muted-fg))" }}>
          Roadmap
        </span>
      </div>
      <h1>{lang === "ru" ? "Дорожная карта протокола" : lang === "zh" ? "协议路线图" : "Protocol Roadmap"}</h1>
      <p style={{ fontSize: "1.0625rem", color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: "2.5rem" }}>
        {lang === "ru"
          ? "Пять фаз разработки протокола: от проверенного основания до собственного блокчейна Qrypt."
          : lang === "zh"
          ? "协议开发的五个阶段：从经过验证的基础到专用 Qrypt 区块链。"
          : "Five phases of protocol development, from a tested foundation to the Qrypt Chain."}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {data.map((phase) => (
          <div
            key={phase.label}
            style={{
              border: `1px solid ${phase.statusColor}33`,
              borderRadius: "0.75rem",
              padding: "1.5rem",
              background: statusBg[phase.status] ?? "transparent",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
              <span style={{ fontWeight: 700, fontSize: "0.8rem", color: phase.statusColor, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {phase.label}
              </span>
              <span style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: phase.statusColor,
                background: `${phase.statusColor}22`,
                border: `1px solid ${phase.statusColor}44`,
                borderRadius: "0.3rem",
                padding: "0.1rem 0.5rem",
              }}>
                {phase.status}
              </span>
            </div>

            <h2 style={{ marginTop: 0, marginBottom: "0.5rem", fontSize: "1.25rem" }}>{phase.title}</h2>
            <p style={{ color: "hsl(var(--muted-fg))", marginBottom: "1rem", lineHeight: 1.7 }}>{phase.summary}</p>

            {"subsections" in phase && phase.subsections && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {phase.subsections.map((sub) => (
                  <div key={sub.title}>
                    <h3 style={{ margin: "0 0 0.35rem 0", fontSize: "1rem", color: phase.statusColor }}>{sub.title}</h3>
                    <p style={{ margin: 0, lineHeight: 1.7, color: "hsl(var(--fg))" }}>{sub.body}</p>
                  </div>
                ))}
              </div>
            )}

            {"items" in phase && phase.items && (
              <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {phase.items.map((item) => (
                  <li key={item} style={{ lineHeight: 1.7 }}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
