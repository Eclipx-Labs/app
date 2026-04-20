export type PhaseItem = { title: string; body: string };

export type PhaseContent = {
  sectionLabel: string;
  phaseLabel: string;
  statusBadge: string;
  title: string;
  intro: string;
  items: PhaseItem[];
};

export type RoadmapContent = {
  phase1: PhaseContent;
  phase2: PhaseContent;
  phase3: PhaseContent;
  phase4: PhaseContent;
  phase5: PhaseContent;
};

export const roadmapContent: Record<"en" | "ru" | "zh", RoadmapContent> = {
  en: {
    phase1: {
      sectionLabel: "Roadmap",
      phaseLabel: "Phase 1",
      statusBadge: "COMPLETE",
      title: "Foundation",
      intro:
        "QryptSafe deployed and battle-tested across six sequential contract versions with 270 passing tests, live on Ethereum mainnet. Phase 1 establishes the complete security foundation that all future phases build on.",
      items: [
        {
          title: "1. Dual-factor vault access",
          body: "Every QryptSafe vault requires two independent proofs: a valid Ethereum wallet signature AND a one-time password derived from a 100-step keccak256 ratchet chain. The ratchet is consumed one step per operation, meaning each proof is unique and non-replayable. An attacker who intercepts your wallet private key still cannot access the vault without the current OTP chain position, and vice versa.",
        },
        {
          title: "2. qToken isolation system",
          body: "When you shield an ERC-20 token, the vault mints a matching qToken bound to your specific vault address. qTokens are permanently non-transferable: the transfer(), transferFrom(), and approve() functions revert unconditionally. This makes it impossible for any external contract or protocol to drain your vault balance by manipulating token approvals. Each vault gets its own isolated qToken contract address per token type, so balances across vaults cannot interfere with each other.",
        },
        {
          title: "3. QryptAir: EIP-712 offline vouchers",
          body: "QryptAir lets a vault owner sign a transfer authorization entirely offline. The signed EIP-712 payload specifies token, amount, recipient address, a unique nonce, and an expiry timestamp. The signed voucher never enters the mempool until the recipient broadcasts the claimAirVoucher() call. At that point the contract verifies the signature, checks expiry, consumes the nonce, and atomically delivers the underlying token. Replaying the same voucher reverts immediately because the nonce is marked used on-chain on first claim.",
        },
        {
          title: "4. QryptShield: native Railgun ZK routing",
          body: "A single unshieldToRailgun() call burns qTokens, transfers the underlying ERC-20 to the Railgun contract, and deposits into the Railgun shielded pool, all atomically in one transaction. There is no intermediate step where the token sits in an unprotected intermediate wallet. The Railgun ZK proof system then breaks the on-chain link between the depositor address and the eventual withdrawal address.",
        },
        {
          title: "5. Private broadcaster via broadcaster.qryptum.eth",
          body: "Outbound transfers from QryptSafe are relayed through a private broadcaster wallet that resolves via ENS at broadcaster.qryptum.eth. When you initiate an outbound transfer, you sign the calldata off-chain with your vault proof. The broadcaster submits the transaction to the network on your behalf. On Etherscan, the broadcaster address appears as the transaction sender, not your wallet. Your wallet address is not exposed in the transaction metadata.",
        },
        {
          title: "6. Docs on IPFS via ENS",
          body: "The full documentation site is pinned to IPFS and served through the ENS name qryptum.eth.limo. There is no centralized web server hosting the docs. Any reader can verify the content hash matches the ENS record. The site cannot be taken down by a hosting provider, and the content is immutably versioned per ENS content hash update.",
        },
        {
          title: "7. Six verified contract versions, 270 tests",
          body: "The protocol was not deployed once and iterated in place. Six completely separate contract versions were deployed to Sepolia in sequence, each with a full test suite before superseding the previous. V1 started with 12 tests and EIP-1167 minimal proxies. V6 ends with 72 tests covering OTP ratchet chain mechanics, airBag isolation, rechargeChain forward secrecy, and combined multi-token flows. All 270 tests across all versions pass. All factory and implementation contracts are source-verified on Etherscan.",
        },
      ],
    },
    phase2: {
      sectionLabel: "Roadmap",
      phaseLabel: "Phase 2",
      statusBadge: "NEXT",
      title: "Intelligence and Offline Transfer",
      intro:
        "Two major additions to the protocol surface: an AI assistant embedded directly in the protocol interface, and QryptOffline, a fully offline transfer mode that requires zero internet connection at the moment of signing.",
      items: [
        {
          title: "1. AI assistant embedded in the docs and app",
          body: "An AI assistant trained on the complete QryptSafe V6 protocol specification is embedded directly into both the documentation site and the application interface. It answers questions about vault operations, OTP ratchet chain mechanics, Railgun routing behavior, qToken isolation rules, and contract error codes without leaving the page. This is not a generic AI chatbot with access to the internet. The model is grounded on the protocol spec only, so answers are specific to the actual behavior of deployed contracts, not general Ethereum knowledge. Users can ask things like \"why did my transfer revert with ProofAlreadyUsed\" and receive a precise answer referencing the chain position consumed, not a generic troubleshooting guide.",
        },
        {
          title: "2. QryptOffline: sign with zero internet connection",
          body: "The sender generates a signed EIP-712 transfer voucher entirely offline. The signing step requires only the sender's wallet private key, the recipient address, the token, the amount, a nonce, and a deadline. No network call is made at signing time. The signed payload is then encoded as a QR code that can be saved to disk, printed, or shown on screen. The sender never needs to be online again for this transfer.",
        },
        {
          title: "3. QryptOffline: recipient scans and broadcasts",
          body: "The recipient opens the QryptOffline redeem interface and scans the QR code using their device camera. The interface decodes the voucher and signature, displays the transfer details (sender vault, token, amount, deadline), and presents a single \"Claim Transfer\" button. The recipient broadcasts the redeemVoucher() transaction to the chain. The contract recovers the signer from the EIP-712 hash, verifies it matches the vault owner, checks the deadline, consumes the nonce as used, burns the sender's qTokens, and transfers the underlying ERC-20 to the recipient address. The sender's wallet was not online at any point after the initial signing.",
        },
        {
          title: "4. Single-use voucher with on-chain anti-replay",
          body: "Every QryptOffline voucher includes a nonce unique to the vault. On successful redeemVoucher() execution, the contract stores the voucher hash in a mapping and marks it as used. Any second attempt to redeem the same voucher reverts immediately. Expired vouchers (past the deadline timestamp) also revert. This means a voucher intercepted in transit cannot be replayed, and a voucher that was never redeemed before its deadline expires harmlessly.",
        },
        {
          title: "5. Three transfer modes in one panel",
          body: "The transfer panel in the app will expose a three-mode toggle at the top: QryptSafe (the existing commit-reveal flow), QryptShield (Railgun ZK routing), and QryptOffline (QR voucher flow). The existing QryptSafe commit-reveal flow is not modified. Selecting QryptShield or QryptOffline renders the corresponding UI below the toggle. Users who never use the new modes see no change to their existing workflow.",
        },
      ],
    },
    phase3: {
      sectionLabel: "Roadmap",
      phaseLabel: "Phase 3",
      statusBadge: "PLANNED",
      title: "Chain Expansion",
      intro:
        "Bring the QryptSafe vault architecture to Ethereum L2 networks using the same EIP-1167 factory pattern already verified on mainnet, with expanded token support and gasless UX for users without ETH in their connected wallet.",
      items: [
        {
          title: "1. L2 deployment: Arbitrum, Base, Optimism",
          body: "The QryptSafe factory contract uses EIP-1167 minimal proxies, meaning each new vault is a cheap clone of the implementation contract rather than a full deployment. This factory pattern is already deployed and verified on Ethereum mainnet. Deploying to Arbitrum, Base, and Optimism requires no redesign of the contract architecture. The same factory bytecode, the same implementation, and the same test suite apply. The only change is the deployment chain and the factory address registered in the app. Users on L2 benefit from the same vault security model at L2 gas costs, which are typically 10 to 100 times cheaper than Ethereum mainnet.",
        },
        {
          title: "2. Native ETH shielding without a WETH step",
          body: "Currently, shielding ETH requires the user to first wrap it into WETH (an ERC-20) before the vault can accept it, because the qrypt() function only handles ERC-20 tokens. Phase 3 adds a payable entry point to the vault that accepts raw ETH, wraps it internally, mints the corresponding WETH-backed qToken, and completes the shield in one transaction. From the user's perspective, they send ETH and receive a qToken representing shielded ETH. No separate WETH approval step, no intermediate exposed WETH balance.",
        },
        {
          title: "3. LST and LP token compatibility",
          body: "Liquid staked ETH tokens (stETH, rETH, cbETH) and LP tokens from AMMs (Uniswap v3 positions, Curve LP tokens) have non-standard behavior: some have rebasing balances, some represent a share of a pool rather than a fixed token amount, and some have transfer restrictions. Phase 3 adds compatibility wrappers for the major LST and LP token types so they can be shielded without the vault receiving a different balance than expected due to rebasing or fee-on-transfer mechanics.",
        },
        {
          title: "4. Gasless UX via meta-transactions",
          body: "Currently, users must hold ETH in their connected wallet to pay gas for vault operations. Phase 3 introduces a meta-transaction relay where gas fees are deducted from the user's shielded balance instead of requiring ETH in the signing wallet. The user signs an EIP-712 authorization off-chain. The relay submits the transaction and is reimbursed in the shielded token (converted to ETH equivalent at execution time). This means a user can hold only USDC in their vault and still operate the vault without ever holding ETH in their wallet.",
        },
        {
          title: "5. QryptAir v2: batch multi-recipient vouchers",
          body: "The Phase 1 QryptAir system supports one voucher per recipient per signing action. Phase 3 upgrades QryptAir to support batch vouchers: a single EIP-712 signature authorizes a split of a shielded amount across multiple recipient addresses in specified proportions. The vault owner signs once. Each recipient can independently redeem their allocation. The nonce for the batch is consumed atomically on the first partial claim, and a bitmap tracks which recipients have redeemed. This enables payroll-style distributions, DAO contributor payouts, or prize splits from a single vault operation.",
        },
      ],
    },
    phase5: {
      sectionLabel: "Roadmap",
      phaseLabel: "Phase 5",
      statusBadge: "PLANNED",
      title: "Qrypt Chain",
      intro:
        "A dedicated Qrypt blockchain built exclusively for private transactions and ecosystem utility. Qrypt Chain is not a general-purpose trading chain. There is no public order book, no open DEX, and no external token listings. Every feature on the chain exists to serve one purpose: private, secure asset movement within the Qryptum ecosystem, powered entirely by $Qrypt.",
      items: [
        {
          title: "1. $Qrypt as the native gas token",
          body: "$Qrypt replaces ETH as the gas token across the entire Qryptum protocol. Vault operations, transfers, and all on-chain interactions are paid in $Qrypt. No ETH is required at any point. Every transaction permanently burns a portion of $Qrypt, continuously reducing total supply over time. The higher the protocol activity, the faster the burn. The chain is deflationary by design, not by governance vote.",
        },
        {
          title: "2. Auto-bridge for all ERC-20 assets",
          body: "Any ERC-20 token held on Ethereum mainnet or supported L2 networks can be bridged to Qrypt Chain in one click. The bridge is non-custodial and secured by the same two-factor vault proof system used in QryptSafe. Users retain full control of their assets throughout the bridging process. No third party holds funds at any step.",
        },
        {
          title: "3. Private swap via ZK-shielded AMM",
          body: "Token swaps on Qrypt Chain are routed through a ZK-shielded AMM where the input token, output token, amounts, and swap path are all hidden from the public mempool. Trades are settled on-chain without exposing position size, strategy, or wallet address to observers. This is not a standard DEX. It is a private swap layer built for users who need to move between assets without leaving an on-chain trail.",
        },
        {
          title: "4. Community broadcaster program",
          body: "The broadcaster relay layer is decentralized from a single protocol-operated node to a permissionless network of community broadcaster nodes. Anyone can run a broadcaster node by staking $Qrypt. Nodes earn $Qrypt rewards for successfully relaying vault transactions. Malicious or unreliable nodes lose their stake. This creates a self-sustaining, incentive-aligned relay network that cannot be shut down by taking out a single point of failure.",
        },
        {
          title: "5. Native two-factor proof at the protocol level",
          body: "Qrypt Chain is purpose-built around the QryptSafe vault architecture. The two-factor proof system and broadcaster relay are not bolt-on additions; they are enforced at the consensus layer. Every vault operation on Qrypt Chain is cheaper than on Ethereum mainnet because the chain is optimized specifically for this workload, with no competition from unrelated contract execution.",
        },
        {
          title: "6. Migration path from Ethereum mainnet",
          body: "All existing QryptSafe vault holders on Ethereum mainnet can migrate to Qrypt Chain through a non-custodial bridge. The migration process is batched into a single transaction per vault: withdraw from the Ethereum vault, bridge assets to Qrypt Chain, and open a new vault on the destination chain. ETH-based vaults remain fully operational on mainnet for users who prefer to stay. Migration is optional, not forced.",
        },
      ],
    },
    phase4: {
      sectionLabel: "Roadmap",
      phaseLabel: "Phase 4",
      statusBadge: "PLANNED",
      title: "Post-Quantum Hardening",
      intro:
        "Replace all classical cryptographic assumptions across the full protocol stack with quantum-resistant primitives. The OTP ratchet chain introduced in V6 is already resistant to quantum brute force. Phase 4 closes the remaining classically vulnerable surfaces: wallet signatures and the broadcaster relay layer.",
      items: [
        {
          title: "1. Replace ECDSA wallet signatures with post-quantum scheme",
          body: "Every vault authorization today requires an ECDSA signature from the connected wallet. ECDSA security depends on the hardness of the elliptic curve discrete logarithm problem, which Shor's algorithm running on a sufficiently large quantum computer can solve in polynomial time. Phase 4 replaces ECDSA vault authorization with a NIST-standardized post-quantum signature scheme, specifically CRYSTALS-Dilithium (ML-DSA, FIPS 204) or FALCON (FN-DSA, FIPS 206), both of which are lattice-based and resist quantum attacks. Vault access requires a post-quantum signature in addition to the OTP ratchet step, making the vault secure against both classical and quantum adversaries.",
        },
        {
          title: "2. Post-quantum broadcaster relay signing",
          body: "The private broadcaster at broadcaster.qryptum.eth currently signs relay transactions using a classical ECDSA key. A quantum adversary who can break ECDSA could forge broadcaster signatures and submit arbitrary transactions through the relay. Phase 4 upgrades the broadcaster's signing key to match the vault-level post-quantum guarantee. The relay infrastructure shifts to a post-quantum key pair, and the on-chain relay verification logic is updated to validate post-quantum signatures. This closes the last classically vulnerable path in the full transaction flow from user intent to on-chain execution.",
        },
        {
          title: "3. Why the OTP ratchet is already quantum-resistant",
          body: "The 100-step keccak256 OTP chain used for vault proof verification is based on a hash function, not on number-theoretic hardness assumptions. Grover's algorithm, the most relevant quantum attack on symmetric primitives, provides only a quadratic speedup. Against a 256-bit hash output, Grover reduces the effective security from 256 bits to 128 bits. 128-bit post-quantum security is considered sufficient by NIST for the foreseeable future. The ratchet chain therefore requires no modification in Phase 4. The focus is exclusively on replacing the ECDSA surfaces.",
        },
        {
          title: "4. Independent third-party cryptographic audit",
          body: "The complete post-quantum upgraded protocol stack will undergo an independent third-party cryptographic audit before any mainnet migration. The audit scope covers the post-quantum signature scheme integration in the vault contract, the updated broadcaster relay verification logic, the interaction between the PQ signing layer and the existing OTP ratchet, and any new attack surfaces introduced by the scheme migration. Mainnet migration begins only after the audit report is published and all critical findings are resolved. The audit report will be publicly accessible through the docs site.",
        },
        {
          title: "5. Migration path from V6 to post-quantum vaults",
          body: "Existing V6 vault holders will not lose access to their assets during the post-quantum migration. A migration window will allow users to withdraw from their V6 vault and deposit into a new post-quantum vault using a single batched transaction. The V6 factory will continue to operate for the duration of the migration window. After the window closes, the V6 factory is paused and new vault creation routes to the post-quantum factory exclusively. V6 vaults already created remain fully functional for withdrawal throughout the migration window.",
        },
      ],
    },
  },

  ru: {
    phase1: {
      sectionLabel: "Дорожная карта",
      phaseLabel: "Фаза 1",
      statusBadge: "ЗАВЕРШЕНО",
      title: "Основа",
      intro:
        "QryptSafe развёрнут и проверен на шести последовательных версиях контрактов с 270 пройденными тестами, работает в основной сети Ethereum. Фаза 1 закладывает полный фундамент безопасности, на котором строятся все последующие фазы.",
      items: [
        {
          title: "1. Двухфакторный доступ к хранилищу",
          body: "Каждое хранилище QryptSafe требует двух независимых доказательств: действительной подписи кошелька Ethereum И одноразового пароля из 100-шаговой цепочки keccak256. Цепочка расходуется по одному шагу за операцию, поэтому каждое доказательство уникально и не воспроизводимо. Злоумышленник, завладевший приватным ключом кошелька, всё равно не получит доступ к хранилищу без текущей позиции OTP-цепочки, и наоборот.",
        },
        {
          title: "2. Система изоляции qToken",
          body: "При экранировании токена ERC-20 хранилище создаёт qToken, привязанный к конкретному адресу хранилища. qToken невозможно передать: функции transfer(), transferFrom() и approve() безоговорочно откатываются. Ни один внешний контракт не может опустошить хранилище через манипуляции с разрешениями. У каждого хранилища свой изолированный адрес qToken-контракта для каждого типа токена, что исключает взаимовлияние балансов между хранилищами.",
        },
        {
          title: "3. QryptAir: офлайн-ваучеры EIP-712",
          body: "QryptAir позволяет владельцу хранилища подписать авторизацию перевода полностью в офлайне. Подписанный пакет EIP-712 задаёт токен, сумму, адрес получателя, уникальный nonce и метку времени истечения. Подписанный ваучер не попадает в мемпул до тех пор, пока получатель не отправит вызов claimAirVoucher(). После этого контракт проверяет подпись, срок действия, расходует nonce и атомарно доставляет базовый токен. Повторное использование ваучера мгновенно откатывается, поскольку nonce помечен как использованный в блокчейне при первом требовании.",
        },
        {
          title: "4. QryptShield: маршрутизация через Railgun ZK",
          body: "Один вызов unshieldToRailgun() сжигает qToken, переводит базовый ERC-20 в контракт Railgun и вносит его в экранированный пул, всё атомарно в одной транзакции. Нет промежуточного шага, при котором токен находился бы в незащищённом кошельке. Система ZK-доказательств Railgun разрывает связь между адресом вкладчика и адресом итогового вывода средств.",
        },
        {
          title: "5. Приватный ретранслятор через broadcaster.qryptum.eth",
          body: "Исходящие переводы из QryptSafe ретранслируются через приватный кошелёк-ретранслятор, разрешаемый через ENS по имени broadcaster.qryptum.eth. При инициации исходящего перевода вы подписываете calldata в офлайне с доказательством хранилища. Ретранслятор отправляет транзакцию в сеть от вашего имени. В Etherscan отображается адрес ретранслятора, а не ваш кошелёк. Адрес вашего кошелька не фигурирует в метаданных транзакции.",
        },
        {
          title: "6. Документация на IPFS через ENS",
          body: "Полный сайт документации закреплён в IPFS и доступен через ENS-имя qryptum.eth.limo. Централизованного веб-сервера не существует. Любой читатель может проверить, что хеш содержимого соответствует записи ENS. Сайт не может быть заблокирован хостинг-провайдером, а содержимое неизменно версионируется по обновлению хеша контента ENS.",
        },
        {
          title: "7. Шесть верифицированных версий контрактов, 270 тестов",
          body: "Протокол не был развёрнут один раз и не дорабатывался на месте. Шесть полностью отдельных версий контрактов были последовательно развёрнуты в сети Sepolia, каждая с полным набором тестов перед заменой предыдущей. V1 начинался с 12 тестов и минимальных прокси EIP-1167. V6 завершает 72 тестами, охватывающими механику OTP-цепочки, изоляцию airBag, прямую секретность rechargeChain и комбинированные потоки с несколькими токенами. Все 270 тестов во всех версиях проходят. Все фабричные и имплементационные контракты верифицированы на Etherscan.",
        },
      ],
    },
    phase2: {
      sectionLabel: "Дорожная карта",
      phaseLabel: "Фаза 2",
      statusBadge: "СЛЕДУЮЩАЯ",
      title: "Интеллект и офлайн-переводы",
      intro:
        "Два крупных дополнения к протоколу: AI-ассистент, встроенный непосредственно в интерфейс протокола, и QryptOffline — полностью офлайн-режим переводов, не требующий интернет-соединения в момент подписания.",
      items: [
        {
          title: "1. AI-ассистент в документации и приложении",
          body: "AI-ассистент, обученный на полной спецификации протокола QryptSafe V6, встроен непосредственно в сайт документации и интерфейс приложения. Он отвечает на вопросы об операциях с хранилищем, механике OTP-цепочки, поведении маршрутизации Railgun, правилах изоляции qToken и кодах ошибок контрактов, не покидая страницу. Это не общий AI-чат-бот с доступом в интернет. Модель ограничена только спецификацией протокола, поэтому ответы относятся к реальному поведению развёрнутых контрактов, а не к общим знаниям об Ethereum. Пользователи могут спросить, например, почему их перевод откатился с ProofAlreadyUsed, и получить точный ответ с указанием позиции использованной цепочки.",
        },
        {
          title: "2. QryptOffline: подпись без интернет-соединения",
          body: "Отправитель генерирует подписанный ваучер EIP-712 полностью в офлайне. Для подписания требуется только приватный ключ кошелька отправителя, адрес получателя, токен, сумма, nonce и дедлайн. Сетевые вызовы в момент подписания не выполняются. Подписанный пакет затем кодируется в QR-код, который можно сохранить на диск, распечатать или отобразить на экране. После подписания отправитель больше не нуждается в подключении к интернету для этого перевода.",
        },
        {
          title: "3. QryptOffline: получатель сканирует и транслирует",
          body: "Получатель открывает интерфейс погашения QryptOffline и сканирует QR-код камерой устройства. Интерфейс декодирует ваучер и подпись, отображает детали перевода (хранилище отправителя, токен, сумму, дедлайн) и предлагает единственную кнопку «Получить перевод». Получатель транслирует транзакцию redeemVoucher() в блокчейн. Контракт восстанавливает подписанта из хеша EIP-712, проверяет совпадение с владельцем хранилища, проверяет дедлайн, помечает nonce как использованный, сжигает qToken отправителя и переводит базовый ERC-20 на адрес получателя. Кошелёк отправителя не был в сети ни в какой момент после первоначального подписания.",
        },
        {
          title: "4. Одноразовый ваучер с защитой от повторного использования",
          body: "Каждый ваучер QryptOffline содержит nonce, уникальный для хранилища. При успешном выполнении redeemVoucher() контракт сохраняет хеш ваучера в mapping и помечает его как использованный. Любая вторая попытка погасить тот же ваучер немедленно откатывается. Ваучеры с истёкшим сроком действия (после метки времени дедлайна) также откатываются. Перехваченный при передаче ваучер не может быть воспроизведён повторно, а ваучер, не погашённый до истечения дедлайна, просто истекает без вреда.",
        },
        {
          title: "5. Три режима перевода в одной панели",
          body: "Панель переводов в приложении будет иметь переключатель трёх режимов вверху: QryptSafe (существующий поток commit-reveal), QryptShield (ZK-маршрутизация через Railgun) и QryptOffline (поток QR-ваучера). Существующий поток QryptSafe commit-reveal не изменяется. Выбор QryptShield или QryptOffline отображает соответствующий интерфейс ниже переключателя. Пользователи, никогда не использующие новые режимы, не увидят изменений в своём текущем рабочем процессе.",
        },
      ],
    },
    phase3: {
      sectionLabel: "Дорожная карта",
      phaseLabel: "Фаза 3",
      statusBadge: "ПЛАНИРУЕТСЯ",
      title: "Расширение сетей",
      intro:
        "Перенос архитектуры хранилищ QryptSafe в сети L2 Ethereum с использованием той же фабричной схемы EIP-1167, уже верифицированной в основной сети, с расширенной поддержкой токенов и UX без необходимости держать ETH в подключённом кошельке.",
      items: [
        {
          title: "1. Развёртывание на L2: Arbitrum, Base, Optimism",
          body: "Фабричный контракт QryptSafe использует минимальные прокси EIP-1167, то есть каждое новое хранилище представляет собой дешёвый клон имплементационного контракта, а не полное развёртывание. Этот фабричный шаблон уже развёрнут и верифицирован в основной сети Ethereum. Развёртывание на Arbitrum, Base и Optimism не требует изменения архитектуры контрактов. Применяются те же байткоды фабрики, та же имплементация и тот же набор тестов. Единственное изменение — сеть развёртывания и адрес фабрики в приложении. Пользователи L2 получают ту же модель безопасности хранилища при затратах на газ в 10–100 раз ниже, чем в основной сети Ethereum.",
        },
        {
          title: "2. Прямое экранирование ETH без шага WETH",
          body: "В настоящее время экранирование ETH требует предварительной конвертации в WETH (ERC-20), поскольку функция qrypt() обрабатывает только токены ERC-20. В фазе 3 добавляется payable-точка входа в хранилище, которая принимает чистый ETH, оборачивает его внутри, создаёт соответствующий qToken, обеспеченный WETH, и завершает экранирование в одной транзакции. С точки зрения пользователя: он отправляет ETH и получает qToken, представляющий экранированный ETH. Никакого отдельного шага одобрения WETH, никакого промежуточного открытого баланса WETH.",
        },
        {
          title: "3. Совместимость с LST и LP-токенами",
          body: "Токены ликвидного стейкинга ETH (stETH, rETH, cbETH) и LP-токены от AMM (позиции Uniswap v3, LP-токены Curve) имеют нестандартное поведение: у некоторых ребазирующиеся балансы, некоторые представляют долю пула, а не фиксированное количество токенов, у некоторых есть ограничения на передачу. В фазе 3 добавляются обёртки совместимости для основных типов LST и LP-токенов, чтобы их можно было экранировать без несоответствия балансов из-за ребазирования или сборов при передаче.",
        },
        {
          title: "4. Gasless UX через мета-транзакции",
          body: "В настоящее время пользователи должны держать ETH в подключённом кошельке для оплаты газа за операции с хранилищем. В фазе 3 вводится мета-транзакционный ретранслятор, где комиссии за газ вычитаются из экранированного баланса пользователя, а не требуют ETH в кошельке для подписания. Пользователь подписывает авторизацию EIP-712 в офлайне. Ретранслятор отправляет транзакцию и получает компенсацию в экранированном токене (конвертированном в эквивалент ETH на момент исполнения). Это означает, что пользователь может держать только USDC в своём хранилище и оперировать им без необходимости когда-либо держать ETH в кошельке.",
        },
        {
          title: "5. QryptAir v2: пакетные ваучеры для нескольких получателей",
          body: "Система QryptAir из фазы 1 поддерживает один ваучер на получателя за одно действие подписания. В фазе 3 QryptAir обновляется для поддержки пакетных ваучеров: одна подпись EIP-712 авторизует распределение экранированной суммы между несколькими адресами получателей в указанных пропорциях. Владелец хранилища подписывает один раз. Каждый получатель может независимо погасить свою долю. Nonce для пакета расходуется атомарно при первом частичном требовании, а битмап отслеживает, кто из получателей уже погасил свою долю. Это позволяет производить выплаты в стиле зарплатной ведомости, вознаграждения участников DAO или распределение призов из одной операции хранилища.",
        },
      ],
    },
    phase5: {
      sectionLabel: "Дорожная карта",
      phaseLabel: "Фаза 5",
      statusBadge: "ПЛАНИРУЕТСЯ",
      title: "Qrypt Chain",
      intro:
        "Выделенный блокчейн Qrypt, созданный исключительно для приватных транзакций и утилит экосистемы. Qrypt Chain не является блокчейном общего назначения для торговли. Здесь нет публичного ордербука, открытой DEX и листинга сторонних токенов. Каждая функция цепочки служит одной цели: приватное и безопасное движение активов внутри экосистемы Qryptum, полностью на $Qrypt.",
      items: [
        {
          title: "1. $Qrypt как нативный токен для оплаты газа",
          body: "$Qrypt заменяет ETH как токен для оплаты газа во всём протоколе Qryptum. Операции с хранилищем, переводы и все взаимодействия on-chain оплачиваются в $Qrypt. ETH не требуется ни на каком этапе. Каждая транзакция безвозвратно сжигает часть $Qrypt, постоянно уменьшая общее предложение. Чем выше активность протокола, тем быстрее сжигание. Дефляция заложена в дизайне цепочки, а не регулируется голосованием.",
        },
        {
          title: "2. Автоматический мост для всех ERC-20 активов",
          body: "Любой ERC-20 токен на Ethereum mainnet или поддерживаемых L2 можно переместить в Qrypt Chain в один клик. Мост некастодиальный и защищён той же двухфакторной системой доказательств хранилища, что и QryptSafe. Пользователи сохраняют полный контроль над своими активами на протяжении всего процесса бриджинга. Ни один сторонний участник не держит средства ни на каком этапе.",
        },
        {
          title: "3. Приватный своп через ZK-защищённый AMM",
          body: "Обмены токенов на Qrypt Chain маршрутизируются через ZK-защищённый AMM, где входной токен, выходной токен, суммы и путь свопа скрыты от публичного мемпула. Сделки исполняются on-chain без раскрытия размера позиции, стратегии или адреса кошелька наблюдателям. Это не стандартный DEX, а приватный слой свопов для пользователей, которым нужно переключаться между активами, не оставляя on-chain следов.",
        },
        {
          title: "4. Программа сообщества broadcaster",
          body: "Уровень ретрансляции broadcaster децентрализован от единственного узла протокола до беспермиссионной сети community broadcaster-узлов. Любой желающий может запустить broadcaster-узел, застейкав $Qrypt. Узлы получают вознаграждения в $Qrypt за успешную ретрансляцию транзакций хранилища. Злонамеренные или ненадёжные узлы теряют свой стейк. Это создаёт самодостаточную, стимулированную сеть ретрансляции, которую невозможно отключить, устранив единую точку отказа.",
        },
        {
          title: "5. Нативная двухфакторная система доказательств на уровне протокола",
          body: "Qrypt Chain создан специально для архитектуры хранилищ QryptSafe. Двухфакторная система доказательств и broadcaster-ретрансляция не являются надстройками — они реализованы на уровне консенсуса. Каждая операция с хранилищем на Qrypt Chain дешевле, чем на Ethereum mainnet, потому что цепочка оптимизирована именно под эту нагрузку, без конкуренции со стороны несвязанного исполнения контрактов.",
        },
        {
          title: "6. Путь миграции с Ethereum mainnet",
          body: "Все существующие владельцы хранилищ QryptSafe на Ethereum mainnet могут мигрировать в Qrypt Chain через некастодиальный мост. Процесс миграции объединён в одну транзакцию на хранилище: вывод из Ethereum-хранилища, бридж активов в Qrypt Chain и открытие нового хранилища в целевой сети. ETH-хранилища остаются полностью работоспособными на mainnet для пользователей, которые предпочитают остаться. Миграция необязательна, не принудительна.",
        },
      ],
    },
    phase4: {
      sectionLabel: "Дорожная карта",
      phaseLabel: "Фаза 4",
      statusBadge: "ПЛАНИРУЕТСЯ",
      title: "Постквантовое усиление",
      intro:
        "Замена всех классических криптографических предположений в полном стеке протокола квантово-устойчивыми примитивами. OTP-цепочка, введённая в V6, уже устойчива к квантовому перебору. Фаза 4 закрывает оставшиеся классически уязвимые поверхности: подписи кошелька и уровень ретранслятора.",
      items: [
        {
          title: "1. Замена ECDSA-подписей кошелька постквантовой схемой",
          body: "Каждая авторизация хранилища сегодня требует ECDSA-подписи от подключённого кошелька. Безопасность ECDSA зависит от сложности задачи дискретного логарифма на эллиптической кривой, которую алгоритм Шора на достаточно мощном квантовом компьютере может решить за полиномиальное время. Фаза 4 заменяет ECDSA-авторизацию хранилища на стандартизированную NIST постквантовую схему подписи — CRYSTALS-Dilithium (ML-DSA, FIPS 204) или FALCON (FN-DSA, FIPS 206), обе основанные на решётчатых задачах и устойчивые к квантовым атакам. Доступ к хранилищу требует постквантовой подписи в дополнение к шагу OTP-цепочки, делая хранилище защищённым от классических и квантовых атак.",
        },
        {
          title: "2. Постквантовое подписание в ретрансляторе",
          body: "Приватный ретранслятор на broadcaster.qryptum.eth в настоящее время подписывает ретрансляционные транзакции с использованием классического ECDSA-ключа. Квантовый противник, способный взломать ECDSA, мог бы подделывать подписи ретранслятора и отправлять произвольные транзакции через ретранслятор. Фаза 4 обновляет ключ подписи ретранслятора для соответствия постквантовой гарантии уровня хранилища. Инфраструктура ретранслятора переходит на постквантовую пару ключей, а логика верификации ретранслятора на блокчейне обновляется для проверки постквантовых подписей. Это закрывает последний классически уязвимый путь в полном потоке транзакций от намерения пользователя до исполнения на блокчейне.",
        },
        {
          title: "3. Почему OTP-цепочка уже квантово-устойчива",
          body: "100-шаговая OTP-цепочка keccak256, используемая для верификации доказательства хранилища, основана на хеш-функции, а не на предположениях теоретико-числовой сложности. Алгоритм Гровера, наиболее актуальная квантовая атака на симметричные примитивы, даёт лишь квадратичное ускорение. Для 256-битного хеш-вывода Гровер сокращает эффективную безопасность с 256 бит до 128 бит. Постквантовая безопасность в 128 бит считается достаточной по оценке NIST на обозримое будущее. Поэтому цепочка не требует изменений в фазе 4. Фокус сосредоточен исключительно на замене поверхностей ECDSA.",
        },
        {
          title: "4. Независимый сторонний криптографический аудит",
          body: "Полный постквантово обновлённый стек протокола пройдёт независимый сторонний криптографический аудит до миграции в основную сеть. Область аудита охватывает интеграцию постквантовой схемы подписи в контракт хранилища, обновлённую логику верификации ретранслятора, взаимодействие PQ-уровня подписи с существующей OTP-цепочкой и любые новые поверхности атаки, введённые при миграции схемы. Миграция в основную сеть начнётся только после публикации отчёта об аудите и устранения всех критических выводов. Отчёт об аудите будет общедоступен через сайт документации.",
        },
        {
          title: "5. Путь миграции с V6 на постквантовые хранилища",
          body: "Владельцы существующих хранилищ V6 не потеряют доступ к своим активам во время постквантовой миграции. В течение миграционного окна пользователи смогут вывести средства из хранилища V6 и внести их в новое постквантовое хранилище с помощью одной пакетной транзакции. Фабрика V6 продолжит работу в течение миграционного окна. После его закрытия фабрика V6 приостанавливается, и создание новых хранилищ направляется исключительно в постквантовую фабрику. Хранилища V6, уже созданные, остаются полностью функциональными для вывода средств в течение всего миграционного окна.",
        },
      ],
    },
  },

  zh: {
    phase1: {
      sectionLabel: "路线图",
      phaseLabel: "阶段 1",
      statusBadge: "已完成",
      title: "基础建设",
      intro:
        "QryptSafe 已在六个连续合约版本中部署并经受测试，通过270项测试，在以太坊主网上线。第1阶段建立了完整的安全基础，所有后续阶段均以此为基础。",
      items: [
        {
          title: "1. 双因素金库访问",
          body: "每个 QryptSafe 金库需要两个独立证明：有效的以太坊钱包签名，以及来自100步 keccak256 棘轮链的一次性密码。每次操作消耗链上一步，意味着每个证明都是唯一且不可重放的。即使攻击者获取了您的钱包私钥，若没有当前 OTP 链位置，仍无法访问金库，反之亦然。",
        },
        {
          title: "2. qToken 隔离系统",
          body: "当您屏蔽 ERC-20 代币时，金库会铸造绑定到您特定金库地址的 qToken。qToken 永久不可转让：transfer()、transferFrom() 和 approve() 函数无条件回滚。这使得任何外部合约或协议都无法通过操纵代币授权来清空金库余额。每个金库每种代币类型都有其独立的 qToken 合约地址，因此不同金库之间的余额不会相互干扰。",
        },
        {
          title: "3. QryptAir：EIP-712 离线凭证",
          body: "QryptAir 让金库所有者完全在离线状态下签署转账授权。签名的 EIP-712 载荷指定代币、金额、收款地址、唯一 nonce 和到期时间戳。签名凭证在收款人广播 claimAirVoucher() 调用之前不会进入内存池。此时合约验证签名、检查到期时间、消耗 nonce，并原子性地交付底层代币。重放同一凭证会立即回滚，因为 nonce 在首次认领时已在链上标记为已使用。",
        },
        {
          title: "4. QryptShield：原生 Railgun ZK 路由",
          body: "单次 unshieldToRailgun() 调用会销毁 qToken，将底层 ERC-20 转入 Railgun 合约，并存入 Railgun 屏蔽池，全部在一笔交易中原子性完成。不存在代币停留在未受保护的中间钱包的中间步骤。Railgun 的 ZK 证明系统随后切断存款地址与最终提款地址之间的链上关联。",
        },
        {
          title: "5. 通过 broadcaster.qryptum.eth 的私人广播器",
          body: "QryptSafe 的出站转账通过一个私人广播器钱包中继，该钱包通过 ENS 解析为 broadcaster.qryptum.eth。当您发起出站转账时，您在离线状态下用金库证明签署调用数据。广播器代表您向网络提交交易。在 Etherscan 上，广播器地址显示为交易发送方，而非您的钱包。您的钱包地址不会出现在交易元数据中。",
        },
        {
          title: "6. 通过 ENS 在 IPFS 上托管文档",
          body: "完整的文档站点已固定到 IPFS，并通过 ENS 名称 qryptum.eth.limo 提供服务。没有集中式 Web 服务器托管文档。任何读者都可以验证内容哈希与 ENS 记录匹配。该站点不能被托管提供商关闭，且内容根据每次 ENS 内容哈希更新进行不可变版本化。",
        },
        {
          title: "7. 六个已验证的合约版本，270项测试",
          body: "该协议并非部署一次后就地迭代。六个完全独立的合约版本按顺序部署到 Sepolia，每个版本在取代前一个版本之前都有完整的测试套件。V1 从12项测试和 EIP-1167 最小代理开始。V6 最终有72项测试，涵盖 OTP 棘轮链机制、airBag 隔离、rechargeChain 前向保密性以及组合多代币流程。所有版本的270项测试全部通过。所有工厂和实现合约均在 Etherscan 上经过源码验证。",
        },
      ],
    },
    phase2: {
      sectionLabel: "路线图",
      phaseLabel: "阶段 2",
      statusBadge: "下一阶段",
      title: "智能与离线转账",
      intro:
        "协议新增两大功能：直接嵌入协议界面的 AI 助手，以及 QryptOffline — 一种完全离线的转账模式，在签名时无需任何网络连接。",
      items: [
        {
          title: "1. 嵌入文档和应用的 AI 助手",
          body: "基于完整 QryptSafe V6 协议规范训练的 AI 助手直接嵌入文档站点和应用界面。它无需离开页面即可回答有关金库操作、OTP 棘轮链机制、Railgun 路由行为、qToken 隔离规则和合约错误代码的问题。这不是可以访问互联网的通用 AI 聊天机器人。模型仅基于协议规范，因此答案具体针对已部署合约的实际行为，而非通用以太坊知识。用户可以询问为何转账以 ProofAlreadyUsed 回滚，并获得引用已消耗链位置的精确答案，而非通用故障排除指南。",
        },
        {
          title: "2. QryptOffline：零网络连接签名",
          body: "发送方完全在离线状态下生成签名的 EIP-712 转账凭证。签名步骤仅需发送方的钱包私钥、收款地址、代币、金额、nonce 和截止时间。签名时不进行任何网络调用。签名载荷随后编码为 QR 码，可保存到磁盘、打印或显示在屏幕上。此后发送方无需再次上线即可完成此次转账。",
        },
        {
          title: "3. QryptOffline：收款人扫描并广播",
          body: "收款人打开 QryptOffline 赎回界面，使用设备摄像头扫描 QR 码。界面解码凭证和签名，显示转账详情（发送方金库、代币、金额、截止时间），并呈现单个「认领转账」按钮。收款人将 redeemVoucher() 交易广播到链上。合约从 EIP-712 哈希中恢复签名者，验证其与金库所有者匹配，检查截止时间，将 nonce 标记为已使用，销毁发送方的 qToken，并将底层 ERC-20 转账至收款地址。发送方钱包在初始签名后的任何时刻均未上线。",
        },
        {
          title: "4. 带链上防重放保护的一次性凭证",
          body: "每个 QryptOffline 凭证包含金库唯一的 nonce。redeemVoucher() 成功执行后，合约将凭证哈希存储在 mapping 中并标记为已使用。任何第二次赎回同一凭证的尝试都会立即回滚。过期凭证（超过截止时间戳）同样回滚。这意味着在传输过程中被截获的凭证无法重放，而在截止时间前未被赎回的凭证会无害地过期。",
        },
        {
          title: "5. 一个面板中的三种转账模式",
          body: "应用中的转账面板顶部将显示三种模式切换：QryptSafe（现有的提交揭示流程）、QryptShield（Railgun ZK 路由）和 QryptOffline（QR 凭证流程）。现有的 QryptSafe 提交揭示流程不作修改。选择 QryptShield 或 QryptOffline 将在切换下方渲染相应的 UI。从不使用新模式的用户不会看到其现有工作流程有任何变化。",
        },
      ],
    },
    phase3: {
      sectionLabel: "路线图",
      phaseLabel: "阶段 3",
      statusBadge: "计划中",
      title: "多链扩展",
      intro:
        "使用已在主网上验证的相同 EIP-1167 工厂模式，将 QryptSafe 金库架构引入以太坊 L2 网络，扩展代币支持，并为连接钱包中没有 ETH 的用户提供免 Gas UX。",
      items: [
        {
          title: "1. L2 部署：Arbitrum、Base、Optimism",
          body: "QryptSafe 工厂合约使用 EIP-1167 最小代理，意味着每个新金库都是实现合约的廉价克隆，而非完整部署。此工厂模式已在以太坊主网部署并验证。部署到 Arbitrum、Base 和 Optimism 无需重新设计合约架构。相同的工厂字节码、相同的实现和相同的测试套件均适用。唯一的变化是部署链和应用中注册的工厂地址。L2 上的用户以比以太坊主网低10到100倍的 Gas 成本享受相同的金库安全模型。",
        },
        {
          title: "2. 无需 WETH 步骤的原生 ETH 屏蔽",
          body: "目前，屏蔽 ETH 需要用户首先将其包装成 WETH（ERC-20），因为 qrypt() 函数只处理 ERC-20 代币。第3阶段在金库中添加可支付入口点，接受原始 ETH，在内部包装它，铸造相应的 WETH 支持的 qToken，并在一笔交易中完成屏蔽。从用户角度看，他们发送 ETH 并获得代表屏蔽 ETH 的 qToken。无需单独的 WETH 授权步骤，无中间暴露的 WETH 余额。",
        },
        {
          title: "3. LST 和 LP 代币兼容性",
          body: "流动质押 ETH 代币（stETH、rETH、cbETH）和 AMM 的 LP 代币（Uniswap v3 仓位、Curve LP 代币）具有非标准行为：一些具有变基余额，一些代表池的份额而非固定代币数量，一些有转账限制。第3阶段为主要 LST 和 LP 代币类型添加兼容包装器，以便在不因变基或转账手续费导致金库余额差异的情况下进行屏蔽。",
        },
        {
          title: "4. 通过元交易实现免 Gas UX",
          body: "目前，用户必须在连接的钱包中持有 ETH 来支付金库操作的 Gas 费。第3阶段引入元交易中继，Gas 费从用户的屏蔽余额中扣除，而不需要签名钱包中有 ETH。用户在离线状态下签署 EIP-712 授权。中继提交交易并以屏蔽代币（在执行时转换为 ETH 等值）获得补偿。这意味着用户可以在金库中只持有 USDC 并操作金库，而无需在钱包中持有 ETH。",
        },
        {
          title: "5. QryptAir v2：批量多收款人凭证",
          body: "第1阶段的 QryptAir 系统每次签名操作支持一个收款人对应一个凭证。第3阶段升级 QryptAir 以支持批量凭证：单个 EIP-712 签名授权将屏蔽金额按指定比例分配给多个收款地址。金库所有者签名一次。每个收款人可以独立赎回其分配。批次的 nonce 在首次部分认领时原子性消耗，位图跟踪哪些收款人已赎回。这支持薪资式分配、DAO 贡献者奖励或从单个金库操作进行奖品分配。",
        },
      ],
    },
    phase5: {
      sectionLabel: "路线图",
      phaseLabel: "阶段 5",
      statusBadge: "计划中",
      title: "Qrypt Chain",
      intro:
        "专为私密交易与生态系统功能而构建的 Qrypt 专用区块链。Qrypt Chain 并非通用交易链，链上没有公开订单簿、开放式 DEX 或外部代币上市。链上的每项功能只服务于一个目的：在 Qryptum 生态系统内进行私密、安全的资产流转，全部由 $Qrypt 驱动。",
      items: [
        {
          title: "1. $Qrypt 作为原生 Gas 代币",
          body: "$Qrypt 取代 ETH，成为整个 Qryptum 协议的 Gas 代币。金库操作、转账及所有链上交互均以 $Qrypt 支付，任何环节都不再需要 ETH。每笔交易永久销毁一部分 $Qrypt，持续减少总供应量。协议活跃度越高，销毁速度越快。通缩机制由链的设计决定，而非由治理投票控制。",
        },
        {
          title: "2. 所有 ERC-20 资产自动跨链",
          body: "以太坊主网或支持 L2 上持有的任意 ERC-20 代币，可一键桥接至 Qrypt Chain。跨链桥为非托管式，由与 QryptSafe 相同的双因素金库证明系统保护。用户在整个桥接过程中始终保有对资产的完全控制权，任何环节均无第三方持有资金。",
        },
        {
          title: "3. 通过 ZK 屏蔽 AMM 实现私密兑换",
          body: "Qrypt Chain 上的代币兑换通过 ZK 屏蔽 AMM 路由，输入代币、输出代币、金额及兑换路径均对公开内存池不可见。交易在链上结算，无需向观察者暴露仓位大小、策略或钱包地址。这不是标准 DEX，而是为需要在资产之间转换且不留链上痕迹的用户构建的私密兑换层。",
        },
        {
          title: "4. 社区广播者计划",
          body: "广播者中继层从单一协议节点分散为无许可的社区广播者节点网络。任何人均可通过质押 $Qrypt 运行广播者节点。节点因成功中继金库交易而获得 $Qrypt 奖励。恶意或不可靠的节点将失去其质押。这构建了一个自我维持、激励对齐的中继网络，无法通过消除单一故障点而被关闭。",
        },
        {
          title: "5. 协议层的原生双因素证明系统",
          body: "Qrypt Chain 专为 QryptSafe 金库架构而构建。双因素证明系统与广播者中继并非附加功能，而是在共识层强制执行。Qrypt Chain 上的每次金库操作都比以太坊主网更便宜，因为该链专为此工作负载优化，无需与无关合约执行竞争。",
        },
        {
          title: "6. 从以太坊主网的迁移路径",
          body: "以太坊主网上所有现有 QryptSafe 金库持有者均可通过非托管跨链桥迁移至 Qrypt Chain。迁移流程每个金库合并为一笔交易：从以太坊金库提款、将资产桥接至 Qrypt Chain、在目标链上开设新金库。偏好留在主网的用户，其 ETH-based 金库仍可完全正常运行。迁移为可选项，非强制。",
        },
      ],
    },
    phase4: {
      sectionLabel: "路线图",
      phaseLabel: "阶段 4",
      statusBadge: "计划中",
      title: "后量子加固",
      intro:
        "将整个协议栈的所有经典密码学假设替换为量子抗性原语。V6 中引入的 OTP 棘轮链已对量子暴力破解具有抵抗力。第4阶段关闭剩余的经典易受攻击面：钱包签名和广播器中继层。",
      items: [
        {
          title: "1. 用后量子方案替换 ECDSA 钱包签名",
          body: "目前每次金库授权都需要连接钱包的 ECDSA 签名。ECDSA 安全性依赖于椭圆曲线离散对数问题的困难性，而在足够大的量子计算机上运行的 Shor 算法可以在多项式时间内解决此问题。第4阶段将 ECDSA 金库授权替换为 NIST 标准化的后量子签名方案，具体为 CRYSTALS-Dilithium（ML-DSA，FIPS 204）或 FALCON（FN-DSA，FIPS 206），两者均基于格并可抵抗量子攻击。金库访问除 OTP 棘轮步骤外还需要后量子签名，使金库对经典和量子对手都安全。",
        },
        {
          title: "2. 后量子广播器中继签名",
          body: "broadcaster.qryptum.eth 处的私人广播器目前使用经典 ECDSA 密钥签署中继交易。能够破解 ECDSA 的量子对手可以伪造广播器签名并通过中继提交任意交易。第4阶段将广播器的签名密钥升级为与金库级别后量子保证相匹配。中继基础设施转换为后量子密钥对，链上中继验证逻辑更新为验证后量子签名。这关闭了从用户意图到链上执行的完整交易流程中最后一个经典易受攻击的路径。",
        },
        {
          title: "3. 为何 OTP 棘轮已具有量子抗性",
          body: "用于金库证明验证的100步 keccak256 OTP 链基于哈希函数，而非数论困难性假设。Grover 算法是对对称原语最相关的量子攻击，仅提供二次加速。对于256位哈希输出，Grover 将有效安全性从256位降低到128位。NIST 认为128位后量子安全性在可预见的未来已足够。因此棘轮链在第4阶段无需修改。重点完全在于替换 ECDSA 面。",
        },
        {
          title: "4. 独立第三方密码学审计",
          body: "完整的后量子升级协议栈将在任何主网迁移之前接受独立第三方密码学审计。审计范围涵盖金库合约中后量子签名方案的集成、更新的广播器中继验证逻辑、PQ 签名层与现有 OTP 棘轮的交互，以及方案迁移引入的任何新攻击面。主网迁移仅在审计报告发布且所有关键发现解决后开始。审计报告将通过文档站点公开访问。",
        },
        {
          title: "5. 从 V6 到后量子金库的迁移路径",
          body: "后量子迁移期间，现有 V6 金库持有者不会失去对其资产的访问权限。迁移窗口允许用户使用单笔批量交易从 V6 金库提款并存入新的后量子金库。V6 工厂将在迁移窗口期间继续运行。窗口关闭后，V6 工厂暂停，新金库创建专门路由到后量子工厂。已创建的 V6 金库在整个迁移窗口期间仍可完全提款。",
        },
      ],
    },
  },
};
