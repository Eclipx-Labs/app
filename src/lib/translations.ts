export type Language = "en" | "ru" | "zh";

export const translations = {
    en: {
        nav: {
            features: "Features",
            howItWorks: "How It Works",
            security: "Security",
            launchApp: "Launch App",
        },
        hero: {
            tagline: "QRYPTUM",
            headline: "The second layer beyond your private key.",
            subheadline: "Post-quantum security for on-chain assets.",
            watchBtn: "Watch How It Works",
            docsBtn: "Documentation",
            chips: {
                ethereum: "Ethereum L1",
                nonCustodial: "Non-Custodial",
                openSource: "Open Source",
            },
        },
        stats: [
            { value: "100%", label: "Non-Custodial" },
            { value: "Zero", label: "Exposed Keys" },
            { value: "ERC-20", label: "Native Compatible" },
            { value: "L1", label: "Ethereum Native" },
        ],
        features: {
            title: "Features",
            subtitle: "Every layer of Qryptum is engineered for one purpose: making your assets unmovable without your proof.",
            items: [
                {
                    title: "QRYPTANK",
                    description: "Your vault proof is cryptographically hashed before it leaves your browser. The blockchain stores only a fingerprint, never your secret.",
                },
                {
                    title: "Transfer Shield",
                    description: "Direct wallet transfers are blocked at the contract level. Every move requires QRYPTANK vault proof verification. No exceptions.",
                },
                {
                    title: "qToken Representation",
                    description: "Shielded assets appear as qTokens (qETH, qUSDT) in MetaMask. Your real tokens stay shielded inside your personal QRYPTANK.",
                },
                {
                    title: "Anti-Frontrun Protection",
                    description: "A two-step transfer process ensures your vault proof is never exposed during a transaction. Full protection from start to finish.",
                },
                {
                    title: "Etherscan Verified",
                    description: "Every transaction is publicly verifiable. Full transparency on the blockchain with zero exposure of your credentials.",
                },
                {
                    title: "Emergency Recovery",
                    description: "After 180 days of inactivity, an emergency withdrawal unlocks your assets. Your last line of defense, built into the contract.",
                },
            ],
        },
        howItWorks: {
            title: "How It Works",
            subtitle: "Three simple steps to complete asset protection.",
            steps: [
                {
                    step: "01",
                    title: "Connect Your Wallet",
                    headline: "Your gateway to Qryptum.",
                    description: "Connect any Ethereum-compatible wallet in seconds. Qryptum works with MetaMask, WalletConnect, and all major Web3 wallets. No registration, no email, no KYC.",
                    points: [
                        "Works with MetaMask and all major wallets",
                        "No account creation or sign-up required",
                        "Fully non-custodial from the first click",
                    ],
                },
                {
                    step: "02",
                    title: "Create Your QRYPTANK",
                    headline: "Your personal on-chain QRYPTANK.",
                    description: "Deploy a personal QRYPTANK smart contract to the Ethereum blockchain with a single click. Set a vault proof that only you know. Your QRYPTANK belongs to your address and no one else.",
                    points: [
                        "One QRYPTANK per wallet, deployed to Ethereum",
                        "Vault proof is never stored anywhere in plain form",
                        "Full ownership, no admin keys",
                    ],
                },
                {
                    step: "03",
                    title: "Shield and Transfer",
                    headline: "Move assets your way.",
                    description: "Shield any ERC-20 token into your QRYPTANK and receive qTokens in your wallet. Transfer them to anyone using only your vault proof. Direct wallet transfers are permanently blocked.",
                    points: [
                        "Receive qTokens instantly upon shielding",
                        "Transfer to any address with your vault proof",
                        "Every transaction verifiable on Etherscan",
                    ],
                },
            ],
        },
        security: {
            label: "Security Architecture",
            quote: "Even a compromised private key cannot move your tokens.",
            description: "Qryptum requires a cryptographic QRYPTANK proof on every transaction, independent of your wallet key. Your QRYPTANK is a smart contract deployed to your address. Only you can access it.",
            metrics: [
                { label: "QRYPTANK Type", value: "Personal Smart Contract" },
                { label: "Vault Proof Storage", value: "Encrypted Hash Only" },
                { label: "Emergency Delay", value: "180 Days" },
            ],
        },
        cta: {
            title: "Ready to shield your assets?",
            subtitle: "Deploy your QRYPTANK on Ethereum. Your key, your proof, your tokens.",
            btn: "Launch App",
        },
        footer: {
            tagline: "Post-quantum security for on-chain assets.",
            links: ["Documentation", "Etherscan"],
            copy: "Qryptum. Non-custodial Web3 protocol.",
        },
    },

    ru: {
        nav: {
            features: "Функции",
            howItWorks: "Как это работает",
            security: "Безопасность",
            launchApp: "Открыть",
        },
        hero: {
            tagline: "QRYPTUM",
            headline: "Второй уровень защиты за вашим приватным ключом.",
            subheadline: "Постквантовая безопасность для on-chain активов.",
            watchBtn: "Смотреть, как это работает",
            docsBtn: "Документация",
            chips: {
                ethereum: "Ethereum L1",
                nonCustodial: "Некастодиальный",
                openSource: "Открытый код",
            },
        },
        stats: [
            { value: "100%", label: "Некастодиальный" },
            { value: "Ноль", label: "Открытых ключей" },
            { value: "ERC-20", label: "Нативная совместимость" },
            { value: "L1", label: "Нативный Ethereum" },
        ],
        features: {
            title: "Функции",
            subtitle: "Каждый слой Qryptum создан с одной целью: сделать ваши активы недоступными без вашего доказательства.",
            items: [
                {
                    title: "Хранилище паролей",
                    description: "Ваш пароль шифруется до отправки из браузера. Блокчейн хранит только отпечаток, никогда секрет.",
                },
                {
                    title: "Блокировка переводов",
                    description: "Прямые переводы из кошелька заблокированы на уровне контракта. Каждое движение требует пароля. Без исключений.",
                },
                {
                    title: "Представление qToken",
                    description: "Защищённые активы отображаются как qTokens (qETH, qUSDT) в MetaMask. Реальные токены заблокированы в хранилище.",
                },
                {
                    title: "Защита от перехвата",
                    description: "Двухшаговый процесс гарантирует, что пароль никогда не раскрывается во время транзакции. Полная защита от начала до конца.",
                },
                {
                    title: "Проверка Etherscan",
                    description: "Каждая транзакция публично верифицируется. Полная прозрачность без раскрытия учётных данных.",
                },
                {
                    title: "Экстренное восстановление",
                    description: "После 180 дней бездействия экстренный вывод открывает доступ к активам. Последний рубеж защиты, встроенный в контракт.",
                },
            ],
        },
        howItWorks: {
            title: "Как это работает",
            subtitle: "Три простых шага до полной защиты активов.",
            steps: [
                {
                    step: "01",
                    title: "Подключите кошелёк",
                    headline: "Ваш вход в Qryptum.",
                    description: "Подключите любой Ethereum-кошелёк за секунды. Qryptum работает с MetaMask, WalletConnect и всеми крупными Web3-кошельками. Без регистрации, email и KYC.",
                    points: [
                        "Работает с MetaMask и всеми крупными кошельками",
                        "Не требует создания аккаунта или регистрации",
                        "Полностью некастодиальный с первого клика",
                    ],
                },
                {
                    step: "02",
                    title: "Создайте хранилище",
                    headline: "Ваше личное on-chain хранилище.",
                    description: "Разверните личный смарт-контракт-хранилище в блокчейне Ethereum одним кликом. Установите секретный пароль, который знаете только вы. Хранилище принадлежит только вашему адресу.",
                    points: [
                        "Одно хранилище на кошелёк, развёрнутое в Ethereum",
                        "Пароль нигде не хранится в открытом виде",
                        "Полное владение, без административных ключей",
                    ],
                },
                {
                    step: "03",
                    title: "Защищайте и переводите",
                    headline: "Перемещайте активы по своим правилам.",
                    description: "Заблокируйте любой ERC-20 токен в хранилище и получите qTokens в кошельке. Переводите их кому угодно только с паролем хранилища. Прямые переводы навсегда заблокированы.",
                    points: [
                        "Получайте qTokens мгновенно при блокировке",
                        "Переводите на любой адрес с паролем хранилища",
                        "Каждая транзакция верифицируется на Etherscan",
                    ],
                },
            ],
        },
        security: {
            label: "Архитектура безопасности",
            quote: "Даже скомпрометированный приватный ключ не может переместить ваши токены.",
            description: "Qryptum требует криптографического доказательства хранилища в каждой транзакции, независимо от вашего ключа. Хранилище это смарт-контракт, развёрнутый по вашему адресу. Только вы можете получить к нему доступ.",
            metrics: [
                { label: "Тип хранилища", value: "Личный смарт-контракт" },
                { label: "Хранение пароля", value: "Только зашифрованный хеш" },
                { label: "Задержка вывода", value: "180 дней" },
            ],
        },
        cta: {
            title: "Готовы защитить свои активы?",
            subtitle: "Разверните персональное хранилище на Ethereum. Ваш ключ, ваше доказательство, ваши токены.",
            btn: "Открыть",
        },
        footer: {
            tagline: "Постквантовая безопасность для on-chain активов.",
            links: ["Документация", "Etherscan"],
            copy: "Qryptum. Некастодиальный Web3-протокол.",
        },
    },

    zh: {
        nav: {
            features: "功能特性",
            howItWorks: "工作原理",
            security: "安全机制",
            launchApp: "启动应用",
        },
        hero: {
            tagline: "QRYPTUM",
            headline: "超越私钥的第二层防护。",
            subheadline: "为链上资产提供后量子加密安全保障。",
            watchBtn: "观看演示",
            docsBtn: "文档",
            chips: {
                ethereum: "Ethereum L1",
                nonCustodial: "非托管",
                openSource: "开源",
            },
        },
        stats: [
            { value: "100%", label: "非托管" },
            { value: "零", label: "暴露密钥" },
            { value: "ERC-20", label: "原生兼容" },
            { value: "L1", label: "以太坊原生" },
        ],
        features: {
            title: "功能特性",
            subtitle: "Qryptum 的每一层都为同一个目标而构建：让您的资产在没有您的证明时无法移动。",
            items: [
                {
                    title: "密码金库",
                    description: "您的密码在离开浏览器前经过加密处理。区块链只存储数字指纹，从不存储秘密本身。",
                },
                {
                    title: "转账锁定",
                    description: "直接钱包转账在合约层面被阻止。每次转移都需要金库密码验证，没有例外。",
                },
                {
                    title: "qToken 表示",
                    description: "受保护的资产在 MetaMask 中显示为 qToken（qETH、qUSDT）。真实代币锁定在您的个人金库中。",
                },
                {
                    title: "防抢跑保护",
                    description: "两步转账流程确保密码在交易过程中不会暴露。从头到尾全程保护。",
                },
                {
                    title: "Etherscan 验证",
                    description: "每笔交易都可公开验证。完全透明，零凭证暴露。",
                },
                {
                    title: "紧急恢复",
                    description: "180 天不活动后，紧急提款可解锁您的资产。合约内置的最后一道防线。",
                },
            ],
        },
        howItWorks: {
            title: "工作原理",
            subtitle: "三个简单步骤实现完整资产保护。",
            steps: [
                {
                    step: "01",
                    title: "连接钱包",
                    headline: "您进入 Qryptum 的门户。",
                    description: "在几秒钟内连接任何以太坊兼容钱包。Qryptum 支持 MetaMask、WalletConnect 及所有主流 Web3 钱包。无需注册、无需邮箱、无需 KYC。",
                    points: [
                        "支持 MetaMask 及所有主流钱包",
                        "无需创建账户或注册",
                        "从第一次点击起即完全非托管",
                    ],
                },
                {
                    step: "02",
                    title: "创建您的金库",
                    headline: "您的个人链上金库。",
                    description: "一键在以太坊区块链上部署个人金库智能合约。设置只有您知道的秘密密码。您的金库归属于您的地址，仅此而已。",
                    points: [
                        "每个钱包一个金库，部署在以太坊上",
                        "密码永远不以明文形式存储",
                        "完全所有权，无管理员密钥",
                    ],
                },
                {
                    step: "03",
                    title: "保护并转账",
                    headline: "按您的方式移动资产。",
                    description: "将任意 ERC-20 代币锁入金库并在钱包中获得 qToken。仅凭金库密码即可将其转给任何人。直接钱包转账被永久阻止。",
                    points: [
                        "锁定后立即获得 qToken",
                        "凭金库密码转账至任意地址",
                        "每笔交易均可在 Etherscan 上验证",
                    ],
                },
            ],
        },
        security: {
            label: "安全架构",
            quote: "即使私钥被泄露，也无法移动您的代币。",
            description: "Qryptum 在每笔交易中都需要独立于钱包密钥的加密金库证明。您的金库是部署在您地址上的智能合约，只有您能访问它。",
            metrics: [
                { label: "金库类型", value: "个人智能合约" },
                { label: "密码存储", value: "仅存加密哈希" },
                { label: "紧急延迟", value: "180 天" },
            ],
        },
        cta: {
            title: "准备好保护您的资产了吗？",
            subtitle: "在以太坊上部署您的个人金库。您的密钥，您的证明，您的代币。",
            btn: "启动应用",
        },
        footer: {
            tagline: "为链上资产提供后量子加密安全保障。",
            links: ["文档", "Etherscan"],
            copy: "Qryptum. 非托管 Web3 协议。",
        },
    },
} as const;

export type TranslationSet = {
    nav: { readonly features: string; readonly howItWorks: string; readonly security: string; readonly launchApp: string };
    hero: {
        readonly tagline: string;
        readonly headline: string;
        readonly subheadline: string;
        readonly watchBtn: string;
        readonly docsBtn: string;
        readonly chips: { readonly ethereum: string; readonly nonCustodial: string; readonly openSource: string };
    };
    stats: ReadonlyArray<{ readonly value: string; readonly label: string }>;
    features: { readonly title: string; readonly subtitle: string; readonly items: ReadonlyArray<{ readonly title: string; readonly description: string }> };
    howItWorks: {
        readonly title: string;
        readonly subtitle: string;
        readonly steps: ReadonlyArray<{
            readonly step: string;
            readonly title: string;
            readonly headline: string;
            readonly description: string;
            readonly points: ReadonlyArray<string>;
        }>;
    };
    security: {
        readonly label: string;
        readonly quote: string;
        readonly description: string;
        readonly metrics: ReadonlyArray<{ readonly label: string; readonly value: string }>;
    };
    cta: { readonly title: string; readonly subtitle: string; readonly btn: string };
    footer: { readonly tagline: string; readonly links: ReadonlyArray<string>; readonly copy: string };
};
