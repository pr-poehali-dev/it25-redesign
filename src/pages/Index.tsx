import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/7fd79c7a-5eb2-4bda-b5de-fe794892721e/bucket/f5e86b67-a5c2-4802-aaeb-dc6d1f396aa4.png";
const HERO_IMG = "https://cdn.poehali.dev/projects/7fd79c7a-5eb2-4bda-b5de-fe794892721e/files/6345e7e9-3445-4156-8371-59632bd72375.jpg";
const API_URL = "https://functions.poehali.dev/29546ff1-29ef-421d-b074-faacee62b377";

// ===== SCROLL REVEAL HOOK =====
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

// ===== ANIMATED COUNTER =====
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 4);
          setCount(Math.round(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCase, setActiveCase] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");

  useReveal();

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState("success");
        setForm({ name: "", phone: "", email: "", service: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  // ===== DATA =====
  const services = [
    { icon: "Users", title: "ИТ-аутсорсинг", desc: "Полноценный ИТ-отдел под ключ или первая линия поддержки. Берём на себя весь операционный ИТ.", features: ["Первая линия поддержки", "Руководитель ИТ-отдела", "Штат инженеров", "Ежедневная помощь сотрудникам"], color: "blue" },
    { icon: "Server", title: "Облачные серверы", desc: "Собственная инфраструктура на AMD Ryzen 9 9950X3D. Максимальная производительность и защита данных.", features: ["AMD Ryzen 9 9950X3D", "ОЗУ до 192 ГБ", "NVMe-диски", "SLA 99.9%"], color: "orange" },
    { icon: "Camera", title: "Видеонаблюдение", desc: "Монтаж систем видеонаблюдения в СПб и Ленобласти. Интеграция с системами контроля доступа.", features: ["Проектирование систем", "Монтаж оборудования", "Настройка и запуск", "Тех. обслуживание"], color: "green" },
    { icon: "Network", title: "Локальные сети", desc: "Монтаж и настройка ЛВС в офисах. Надёжная инфраструктура для стабильной работы бизнеса.", features: ["Проектирование ЛВС", "Кабельные трассы", "Настройка оборудования", "Wi-Fi покрытие"], color: "blue" },
    { icon: "Database", title: "1С: доработка", desc: "Переход с УПП на ERP, доработки конфигураций, обновления и поддержка пользователей 1С.", features: ["Переход УПП → ERP", "Доработка конфигураций", "Обновления 1С", "Поддержка пользователей"], color: "orange" },
    { icon: "Shield", title: "ИТ-безопасность", desc: "Защита корпоративной инфраструктуры, контроль доступа, резервное копирование и аудит.", features: ["Антивирусная защита", "Контроль доступа", "Резервное копирование", "Аудит безопасности"], color: "green" },
  ];

  const colorIcons: Record<string, string> = { blue: "text-[#1A7DC8]", orange: "text-[#F47820]", green: "text-[#5BB838]" };
  const bgIcons: Record<string, string> = { blue: "bg-blue-50", orange: "bg-orange-50", green: "bg-green-50" };
  const dotColors: Record<string, string> = { blue: "bg-[#1A7DC8]", orange: "bg-[#F47820]", green: "bg-[#5BB838]" };

  const advantages = [
    { icon: "Zap", title: "Быстрый старт", desc: "Начинаем работу в день обращения. Без бюрократии." },
    { icon: "Globe", title: "Работаем удалённо", desc: "Обслуживаем компании по всей России." },
    { icon: "Clock", title: "Поддержка 9–18 МСК", desc: "Стабильное рабочее время без переплат." },
    { icon: "TrendingUp", title: "Масштабируемость", desc: "Растём вместе с вашим бизнесом." },
    { icon: "DollarSign", title: "Экономия до 40%", desc: "Дешевле собственного штата ИТ-специалистов." },
    { icon: "Award", title: "Единая ответственность", desc: "Один подрядчик закрывает все ИТ-задачи." },
  ];

  const cases = [
    {
      category: "Производство",
      title: "Миграция 1С УПП → ERP для завода",
      challenge: "Производственный завод, 120 пользователей. Устаревшая 1С:УПП тормозила работу: закрытие месяца занимало 3 дня, ошибки в данных, невозможность масштабирования.",
      solution: "Разработали план поэтапной миграции без остановки производства. Перенесли 8 лет истории транзакций, настроили производственные процессы в ERP, обучили пользователей.",
      results: [
        { metric: "3 дня → 4 часа", label: "закрытие периода" },
        { metric: "0 ошибок", label: "в данных после миграции" },
        { metric: "2 недели", label: "срок реализации" },
        { metric: "+35%", label: "скорость работы" },
      ],
      tags: ["1С:ERP", "Миграция данных", "Производство"],
      color: "#F47820",
    },
    {
      category: "Финансы",
      title: "ИТ-инфраструктура инвестиционной компании",
      challenge: "Инвестиционная компания, 45 сотрудников. Нет ИТ-отдела, критичные данные на личных ноутбуках, частые сбои и утечки информации. Нужно решение за 2 недели.",
      solution: "Развернули облачную инфраструктуру на наших серверах AMD Ryzen 9, настроили VPN, корпоративную почту, 2FA, систему резервного копирования и мониторинга.",
      results: [
        { metric: "2 недели", label: "полный запуск" },
        { metric: "99.9%", label: "uptime серверов" },
        { metric: "0 инцидентов", label: "безопасности за год" },
        { metric: "-42%", label: "затраты на ИТ" },
      ],
      tags: ["Облако", "Безопасность", "Аутсорсинг"],
      color: "#1A7DC8",
    },
    {
      category: "Ретейл",
      title: "Видеонаблюдение сети торговых центров",
      challenge: "Сеть из 5 торговых центров в Санкт-Петербурге. Устаревшее аналоговое оборудование, «мёртвые зоны», невозможность удалённого просмотра. Высокий уровень краж.",
      solution: "Проектирование и монтаж 240 IP-камер 4K, интеграция с СКУД, облачное хранилище видео на 90 дней, мобильный мониторинг для руководителей.",
      results: [
        { metric: "240 камер", label: "смонтировано" },
        { metric: "-67%", label: "краж за квартал" },
        { metric: "90 дней", label: "архив видео" },
        { metric: "24/7", label: "удалённый мониторинг" },
      ],
      tags: ["Видеонаблюдение", "СКУД", "Ретейл"],
      color: "#5BB838",
    },
    {
      category: "Логистика",
      title: "Полный ИТ-аутсорсинг логистической компании",
      challenge: "Логистическая компания, 200 сотрудников в 3 городах. Собственный ИТ-отдел из 4 человек не справлялся, время решения инцидентов — 4+ часа, простои стоили миллионы.",
      solution: "Взяли полный аутсорсинг: первая и вторая линии поддержки, выделенный CTO, единая Service Desk система, мониторинг 24/7 критичных систем, SLA 30 минут на реакцию.",
      results: [
        { metric: "30 мин", label: "время реакции" },
        { metric: "-78%", label: "время простоев" },
        { metric: "3 города", label: "в единой системе" },
        { metric: "×2.5", label: "ROI за год" },
      ],
      tags: ["Аутсорсинг", "Service Desk", "Мультигород"],
      color: "#F47820",
    },
  ];

  const plans = [
    { name: "Старт", subtitle: "Первая линия поддержки", price: "от 25 000", period: "₽/мес", highlight: false, features: ["До 10 пользователей", "Первая линия поддержки", "Удалённая помощь", "Время ответа — 2 часа", "Отчётность ежемесячно"] },
    { name: "Бизнес", subtitle: "Полный ИТ-аутсорсинг", price: "от 65 000", period: "₽/мес", highlight: true, features: ["До 30 пользователей", "Первая + вторая линия", "Руководитель ИТ-отдела", "Время ответа — 30 мин", "Облачный сервер в подарок", "Отчётность еженедельно"] },
    { name: "Корпоратив", subtitle: "Для крупных компаний", price: "По запросу", period: "", highlight: false, features: ["Более 30 пользователей", "Выделенная команда", "CTO на аутсорсе", "SLA под ваши требования", "Интеграция с вашими процессами", "Приоритетная поддержка"] },
  ];

  const reviews = [
    { name: "Алексей Петров", role: "Генеральный директор, ООО «СтройГрупп»", text: "ITSPB ведёт наш ИТ уже 2 года. Никаких нареканий — всё работает, вопросы решаются быстро. Реально освободились от головной боли с техникой.", rating: 5 },
    { name: "Марина Сидорова", role: "Финансовый директор, АО «ТоргПлюс»", text: "Переход с УПП на ERP прошёл без остановки работы. Команда сделала всё чисто и в срок. Теперь работаем на аутсорсе — очень довольны.", rating: 5 },
    { name: "Дмитрий Козлов", role: "Владелец, сеть магазинов «Формат»", text: "Подключили видеонаблюдение во всех точках. Работа выполнена аккуратно, оборудование работает без сбоев уже больше года. Рекомендую.", rating: 5 },
  ];

  const faqs = [
    { q: "Как быстро вы реагируете на запросы?", a: "Время реакции зависит от тарифа: от 30 минут до 2 часов в рабочее время (9–18 МСК). Для критических инцидентов — внеочередной приоритет." },
    { q: "Работаете ли вы с компаниями не из Санкт-Петербурга?", a: "Да, большинство услуг предоставляется удалённо по всей России. Монтаж оборудования — только в СПб и Ленобласти." },
    { q: "Что нужно, чтобы начать работать?", a: "Оставьте заявку, мы свяжемся, проведём аудит ИТ-инфраструктуры и предложим оптимальный план. Старт возможен в день подписания договора." },
    { q: "Можно ли взять только часть услуг?", a: "Конечно. Выбираете ровно то, что нужно: только поддержка пользователей, только 1С, только облачный сервер или полный аутсорсинг." },
    { q: "Какие гарантии надёжности облачных серверов?", a: "Серверы на AMD Ryzen 9 9950X3D с NVMe и ОЗУ до 192 ГБ. Гарантируем SLA 99.9%, резервное копирование и защиту от атак." },
    { q: "Как происходит переход с УПП на ERP?", a: "Анализ данных, план миграции, перенос данных, настройка конфигурации. Переход занимает 1–4 недели в зависимости от объёма." },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* PROGRESS BAR */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg border-b border-gray-200" : "bg-[#0D1B2E]/90 backdrop-blur-xl border-b border-white/10"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-18" style={{ height: "72px" }}>
            {/* Logo — одинаковый везде, на белом фоне */}
            <div className={`flex items-center rounded-xl px-3 py-1.5 ${scrolled ? "bg-gray-50" : "bg-white"}`}>
              <img src={LOGO_URL} alt="ITSPB" className="h-12 object-contain" />
            </div>
            <div className="hidden md:flex items-center gap-6">
              {[["Услуги","services"],["Преимущества","advantages"],["Тарифы","plans"],["Кейсы","cases"],["Отзывы","reviews"],["FAQ","faq"]].map(([l,id]) => (
                <button key={id} onClick={() => scrollTo(id)}
                  className={`nav-link text-sm font-semibold transition-colors ${scrolled ? "text-[#0D1B2E] hover:text-[#1A7DC8]" : "text-white hover:text-[#F47820]"}`}>
                  {l}
                </button>
              ))}
              <button onClick={() => scrollTo("contact")} className="btn-orange px-5 py-2.5 rounded-lg text-sm font-bold">
                Оставить заявку
              </button>
            </div>
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} className={scrolled ? "text-[#0D1B2E]" : "text-white"} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t shadow-xl">
            <div className="px-4 py-4 flex flex-col gap-3">
              {[["Услуги","services"],["Преимущества","advantages"],["Тарифы","plans"],["Кейсы","cases"],["Отзывы","reviews"],["FAQ","faq"],["Контакты","contact"]].map(([l,id]) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-left text-[#0D1B2E] font-semibold py-2 border-b border-gray-50">{l}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero-bg min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        {/* Particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${10 + i * 11}%`,
            animationDuration: `${6 + i * 1.5}s`,
            animationDelay: `${i * 0.8}s`,
            width: i % 2 === 0 ? "3px" : "2px",
            height: i % 2 === 0 ? "3px" : "2px",
          }} />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="hero-sub inline-block mb-6 px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: "rgba(244,120,32,0.2)", border: "1px solid rgba(244,120,32,0.4)", color: "#ffaa50" }}>
                ИТ-решения для вашего бизнеса
              </div>
              <h1 className="hero-title font-extrabold text-4xl sm:text-5xl lg:text-[3.5rem] text-white leading-[1.08] mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Ваш надёжный<br />
                <span className="text-gradient-orange">ИТ-отдел</span><br />
                на аутсорсе
              </h1>
              <p className="hero-sub text-white/75 text-lg leading-relaxed mb-8 max-w-lg">
                Берём на себя всю ИТ-инфраструктуру — от поддержки сотрудников до облачных серверов и 1С. Работаем удалённо по всей России.
              </p>
              <div className="hero-btns flex flex-wrap gap-4 mb-12">
                <button onClick={() => scrollTo("contact")} className="btn-orange px-8 py-4 rounded-xl text-base font-bold">
                  Получить консультацию
                </button>
                <button onClick={() => scrollTo("cases")} className="px-8 py-4 rounded-xl text-base font-semibold text-white border border-white/25 hover:bg-white/10 transition-all">
                  Смотреть кейсы
                </button>
              </div>
              <div className="hero-stats flex flex-wrap gap-8">
                {[["10+","лет опыта"],["200+","клиентов"],["99.9%","SLA гарантия"]].map(([n,l]) => (
                  <div key={l}>
                    <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>{n}</div>
                    <div className="text-white/45 text-sm mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero right — floating card stack */}
            <div className="hidden lg:block relative h-96">
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: "0 30px 80px rgba(26,125,200,0.3)" }}>
                <img src={HERO_IMG} alt="ITSPB" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,27,46,0.5), rgba(15,61,110,0.3))" }} />
              </div>
              {/* Badge top-right */}
              <div className="badge-float absolute -top-5 -right-5 w-24 h-24 rounded-2xl flex flex-col items-center justify-center shadow-2xl"
                style={{ background: "linear-gradient(135deg, #F47820, #d4610a)" }}>
                <Icon name="Shield" size={28} className="text-white mb-1" />
                <span className="text-white text-xs font-bold">Защита</span>
              </div>
              {/* Status badge bottom-left */}
              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white p-4 shadow-2xl" style={{ minWidth: "220px" }}>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#5BB838] animate-pulse" />
                  <div>
                    <div className="text-xs text-gray-500 font-medium">Статус системы</div>
                    <div className="text-sm font-bold text-[#0D1B2E]">Все системы работают</div>
                  </div>
                </div>
              </div>
              {/* Floating metric */}
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 rounded-xl bg-[#0D1B2E]/90 backdrop-blur border border-white/10 p-4 shadow-xl">
                <div className="text-2xl font-extrabold text-[#F47820]" style={{ fontFamily: "'Montserrat',sans-serif" }}>30 мин</div>
                <div className="text-white/60 text-xs">время реакции</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(to top, #F4F7FA, transparent)" }} />
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-12 bg-[#0D1B2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {[
              { target: 10, suffix: "+", label: "лет на рынке" },
              { target: 200, suffix: "+", label: "клиентов" },
              { target: 99, suffix: ".9%", label: "uptime серверов" },
              { target: 30, suffix: " мин", label: "время реакции" },
            ].map((s) => (
              <div key={s.label} className="reveal text-center md:px-8">
                <div className="counter-number text-4xl font-extrabold mb-1">
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                </div>
                <div className="text-white/50 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-24 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <div className="section-tag mb-4">Что мы делаем</div>
            <h2 className="font-extrabold text-3xl sm:text-4xl text-[#0D1B2E] mb-4" style={{ fontFamily: "'Montserrat',sans-serif" }}>Наши услуги</h2>
            <div className="divider-line w-16 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={s.title} className={`reveal card-lift stagger-${(i % 3) + 1} glow-hover bg-white rounded-2xl p-7 shadow-sm border border-gray-100`}>
                <div className={`w-13 h-13 rounded-xl ${bgIcons[s.color]} flex items-center justify-center mb-5 icon-pulse`} style={{ width: "52px", height: "52px" }}>
                  <Icon name={s.icon} size={24} className={colorIcons[s.color]} />
                </div>
                <h3 className="font-bold text-xl text-[#0D1B2E] mb-3" style={{ fontFamily: "'Montserrat',sans-serif" }}>{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#0D1B2E]">
                      <div className={`w-1.5 h-1.5 rounded-full ${dotColors[s.color]} flex-shrink-0`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ADVANTAGES ===== */}
      <section id="advantages" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <div className="section-tag mb-4">Почему мы</div>
            <h2 className="font-extrabold text-3xl sm:text-4xl text-[#0D1B2E] mb-4" style={{ fontFamily: "'Montserrat',sans-serif" }}>Преимущества ITSPB</h2>
            <div className="divider-line w-16 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a, i) => (
              <div key={a.title} className={`reveal card-lift stagger-${(i % 3) + 1} flex gap-4 p-6 rounded-2xl bg-[#F4F7FA] border border-gray-100`}>
                <div className="w-12 h-12 shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Icon name={a.icon} size={22} className="text-[#1A7DC8]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#0D1B2E] mb-1" style={{ fontFamily: "'Montserrat',sans-serif" }}>{a.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PLANS ===== */}
      <section id="plans" className="py-24 bg-[#F4F7FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <div className="section-tag mb-4">Стоимость</div>
            <h2 className="font-extrabold text-3xl sm:text-4xl text-[#0D1B2E] mb-4" style={{ fontFamily: "'Montserrat',sans-serif" }}>Тарифные планы</h2>
            <div className="divider-line w-16 mx-auto" />
            <p className="text-gray-500 mt-4 text-sm">Первый аудит — бесплатно. Точная стоимость зависит от задач.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((p, i) => (
              <div key={p.name} className={`reveal stagger-${i + 1} rounded-2xl p-8 relative card-lift ${p.highlight ? "md:scale-105 shadow-2xl" : "bg-white border border-gray-100 shadow-sm"}`}
                style={p.highlight ? { background: "linear-gradient(135deg, #0D1B2E 0%, #0f3d6e 100%)" } : {}}>
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full"
                    style={{ background: "linear-gradient(135deg, #F47820, #d4610a)" }}>Популярный</div>
                )}
                <div className={`text-sm font-semibold mb-1 ${p.highlight ? "text-white/60" : "text-gray-400"}`}>{p.subtitle}</div>
                <div className="font-extrabold text-3xl mb-1" style={{ fontFamily: "'Montserrat',sans-serif", color: p.highlight ? "#F47820" : "#1A7DC8" }}>{p.price}</div>
                <div className={`text-sm mb-6 ${p.highlight ? "text-white/50" : "text-gray-400"}`}>{p.period}</div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Icon name="Check" size={16} className={p.highlight ? "text-[#F47820]" : "text-[#5BB838]"} />
                      <span className={p.highlight ? "text-white/90" : "text-[#0D1B2E]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollTo("contact")} className={`w-full py-3 rounded-xl font-bold text-sm ${p.highlight ? "btn-orange" : "btn-primary"}`}>
                  Выбрать план
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CASES ===== */}
      <section id="cases" className="py-24 overflow-hidden" style={{ background: "#060e1a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <div className="section-tag mb-4" style={{ background: "rgba(244,120,32,0.15)", border: "1px solid rgba(244,120,32,0.3)", color: "#F47820" }}>
              Реальные результаты
            </div>
            <h2 className="font-extrabold text-3xl sm:text-4xl text-white mb-4" style={{ fontFamily: "'Montserrat',sans-serif" }}>Кейсы клиентов</h2>
            <div className="divider-line w-16 mx-auto" />
            <p className="text-white/50 mt-4 text-sm">Конкретные цифры, реальные проекты</p>
          </div>

          {/* Case Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-10 reveal">
            {cases.map((c, i) => (
              <button key={i} onClick={() => setActiveCase(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCase === i ? "text-white shadow-lg scale-105" : "text-white/50 border border-white/15 hover:border-white/30 hover:text-white/80"}`}
                style={activeCase === i ? { background: `linear-gradient(135deg, ${c.color}, ${c.color}99)`, boxShadow: `0 8px 24px ${c.color}40` } : {}}>
                {c.category}
              </button>
            ))}
          </div>

          {/* Active Case */}
          {cases.map((c, i) => i === activeCase && (
            <div key={i} className="case-card reveal">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left */}
                <div className="p-10 border-r border-white/10">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}40` }}>
                    {c.category}
                  </div>
                  <h3 className="font-extrabold text-2xl text-white mb-6" style={{ fontFamily: "'Montserrat',sans-serif" }}>{c.title}</h3>
                  <div className="mb-6">
                    <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Задача</div>
                    <p className="text-white/75 text-sm leading-relaxed">{c.challenge}</p>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Решение</div>
                    <p className="text-white/75 text-sm leading-relaxed">{c.solution}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {c.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs text-white/60 border border-white/15">{t}</span>
                    ))}
                  </div>
                </div>
                {/* Right — Metrics */}
                <div className="p-10">
                  <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-8">Результаты</div>
                  <div className="grid grid-cols-2 gap-5">
                    {c.results.map((r, ri) => (
                      <div key={ri} className="metric-shimmer rounded-2xl p-5 border border-white/10"
                        style={{ background: "rgba(255,255,255,0.04)", animationDelay: `${ri * 0.5}s` }}>
                        <div className="font-extrabold text-2xl mb-1" style={{ fontFamily: "'Montserrat',sans-serif", color: c.color }}>{r.metric}</div>
                        <div className="text-white/55 text-xs leading-tight">{r.label}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => scrollTo("contact")} className="mt-8 w-full py-4 rounded-xl font-bold text-sm text-white transition-all"
                    style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}bb)` }}>
                    Хочу такой же результат
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Case navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {cases.map((_, i) => (
              <button key={i} onClick={() => setActiveCase(i)}
                className="transition-all duration-300 rounded-full"
                style={{ width: activeCase === i ? "32px" : "8px", height: "8px", background: activeCase === i ? "#F47820" : "rgba(255,255,255,0.2)" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section id="reviews" className="py-24" style={{ background: "#0D1B2E" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <div className="section-tag mb-4" style={{ background: "rgba(244,120,32,0.15)", border: "1px solid rgba(244,120,32,0.3)", color: "#F47820" }}>Клиенты о нас</div>
            <h2 className="font-extrabold text-3xl sm:text-4xl text-white mb-4" style={{ fontFamily: "'Montserrat',sans-serif" }}>Отзывы</h2>
            <div className="divider-line w-16 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={r.name} className={`reveal card-lift stagger-${i + 1} rounded-2xl p-7 border border-white/10`}
                style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={16} className="text-[#F47820]" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">«{r.text}»</p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-bold text-white text-sm">{r.name}</div>
                  <div className="text-white/40 text-xs mt-1">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-24 bg-[#F4F7FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 reveal">
            <div className="section-tag mb-4">Вопросы и ответы</div>
            <h2 className="font-extrabold text-3xl sm:text-4xl text-[#0D1B2E] mb-4" style={{ fontFamily: "'Montserrat',sans-serif" }}>FAQ</h2>
            <div className="divider-line w-16 mx-auto" />
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="reveal bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button className="w-full flex items-center justify-between p-6 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-bold text-[#0D1B2E] text-base pr-4" style={{ fontFamily: "'Montserrat',sans-serif" }}>{f.q}</span>
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={20} className="text-[#1A7DC8] shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="reveal-left">
              <div className="section-tag mb-4">Напишите нам</div>
              <h2 className="font-extrabold text-3xl sm:text-4xl text-[#0D1B2E] mb-6" style={{ fontFamily: "'Montserrat',sans-serif" }}>Оставьте заявку</h2>
              <div className="divider-line w-16 mb-8" />
              <p className="text-gray-600 mb-10 leading-relaxed">Опишите задачу — свяжемся в течение рабочего дня и предложим оптимальное решение.</p>
              <div className="space-y-5">
                {[
                  { icon: "Mail", text: "roman@itspb.com", href: "mailto:roman@itspb.com" },
                  { icon: "Send", text: "@roman_levanov", href: "https://t.me/roman_levanov" },
                  { icon: "Clock", text: "Пн–Пт, 9:00–18:00 МСК", href: null },
                  { icon: "MapPin", text: "Санкт-Петербург (монтаж в СПб и ЛО)", href: null },
                ].map((c) => (
                  <div key={c.text} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Icon name={c.icon} size={18} className="text-[#1A7DC8]" />
                    </div>
                    {c.href ? (
                      <a href={c.href} className="text-[#0D1B2E] hover:text-[#1A7DC8] transition-colors font-medium">{c.text}</a>
                    ) : (
                      <span className="text-[#0D1B2E] font-medium">{c.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-right rounded-2xl p-8 border border-gray-100" style={{ background: "#F4F7FA" }}>
              {formState === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-[#5BB838]" />
                  </div>
                  <h3 className="font-bold text-xl text-[#0D1B2E] mb-2" style={{ fontFamily: "'Montserrat',sans-serif" }}>Заявка отправлена!</h3>
                  <p className="text-gray-500">Свяжемся с вами в течение рабочего дня.</p>
                  <button className="mt-6 text-[#1A7DC8] text-sm font-medium hover:underline" onClick={() => setFormState("idle")}>
                    Отправить ещё одну
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-[#0D1B2E] mb-1.5 block">Имя *</label>
                      <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Иван Иванов"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#0D1B2E] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A7DC8]/30 focus:border-[#1A7DC8] text-sm" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#0D1B2E] mb-1.5 block">Телефон</label>
                      <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+7 (___) ___-__-__"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#0D1B2E] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A7DC8]/30 focus:border-[#1A7DC8] text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0D1B2E] mb-1.5 block">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="ivan@company.ru"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#0D1B2E] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A7DC8]/30 focus:border-[#1A7DC8] text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0D1B2E] mb-1.5 block">Услуга</label>
                    <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#0D1B2E] focus:outline-none focus:ring-2 focus:ring-[#1A7DC8]/30 focus:border-[#1A7DC8] text-sm">
                      <option value="">Выберите услугу</option>
                      <option>ИТ-аутсорсинг</option>
                      <option>Облачные серверы</option>
                      <option>Видеонаблюдение</option>
                      <option>Локальные сети</option>
                      <option>1С: доработка и поддержка</option>
                      <option>Другое</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#0D1B2E] mb-1.5 block">Сообщение</label>
                    <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Опишите вашу задачу..." rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#0D1B2E] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A7DC8]/30 focus:border-[#1A7DC8] text-sm resize-none" />
                  </div>
                  {formState === "error" && <p className="text-red-500 text-sm">Ошибка. Попробуйте ещё раз или напишите напрямую.</p>}
                  <button type="submit" disabled={formState === "loading"} className="btn-orange w-full py-4 rounded-xl font-bold text-base disabled:opacity-60">
                    {formState === "loading" ? "Отправляю..." : "Отправить заявку"}
                  </button>
                  <p className="text-gray-400 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-10 border-t border-white/10" style={{ background: "#0D1B2E" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="bg-white rounded-xl px-3 py-1.5">
              <img src={LOGO_URL} alt="ITSPB" className="h-12 object-contain" />
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {[["Услуги","services"],["Тарифы","plans"],["Кейсы","cases"],["Контакты","contact"]].map(([l,id]) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-white/40 hover:text-white text-sm transition-colors font-medium">{l}</button>
              ))}
            </div>
            <div className="text-white/25 text-sm">© 2025 ITSPB. IT Services & Solutions</div>
          </div>
        </div>
      </footer>
    </div>
  );
}