import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/73d44e83-d564-479d-8f43-da6574df1585/bucket/f2afdc21-162f-4ca8-9867-a4268fb3f41a.PNG";
const HERO_IMG = "https://cdn.poehali.dev/projects/7fd79c7a-5eb2-4bda-b5de-fe794892721e/files/6345e7e9-3445-4156-8371-59632bd72375.jpg";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
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
      const res = await fetch("https://functions.poehali.dev/29546ff1-29ef-421d-b074-faacee62b377", {
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

  const services = [
    {
      icon: "Users",
      title: "ИТ-аутсорсинг",
      desc: "Полноценный ИТ-отдел под ключ или первая линия поддержки. Берём на себя весь операционный ИТ вашего бизнеса.",
      features: ["Первая линия поддержки", "Руководитель ИТ-отдела", "Штат инженеров", "Ежедневная помощь сотрудникам"],
      color: "blue",
    },
    {
      icon: "Server",
      title: "Облачные серверы",
      desc: "Собственная облачная инфраструктура на AMD Ryzen 9 9950X3D. Высокая производительность и надёжная защита данных.",
      features: ["AMD Ryzen 9 9950X3D", "ОЗУ до 192 ГБ", "NVMe-диски", "Защита и резервирование"],
      color: "orange",
    },
    {
      icon: "Camera",
      title: "Видеонаблюдение",
      desc: "Проектирование и монтаж систем видеонаблюдения для офисов и объектов. Работаем в СПб и Ленобласти.",
      features: ["Проектирование систем", "Монтаж оборудования", "Настройка и запуск", "Техническое обслуживание"],
      color: "green",
    },
    {
      icon: "Network",
      title: "Локальные сети",
      desc: "Монтаж и настройка локальных сетей в офисах. Надёжная инфраструктура для стабильной работы вашего бизнеса.",
      features: ["Проектирование ЛВС", "Прокладка кабельных трасс", "Настройка оборудования", "Wi-Fi покрытие"],
      color: "blue",
    },
    {
      icon: "Database",
      title: "1С: доработка и поддержка",
      desc: "Доработка конфигураций 1С, переход с УПП на ERP, обновления и техническая поддержка пользователей.",
      features: ["Переход УПП → ERP", "Доработка конфигураций", "Обновления 1С", "Поддержка пользователей"],
      color: "orange",
    },
    {
      icon: "Shield",
      title: "ИТ-безопасность",
      desc: "Настройка защиты корпоративной инфраструктуры, контроль доступа, резервное копирование и восстановление данных.",
      features: ["Антивирусная защита", "Контроль доступа", "Резервное копирование", "Аудит безопасности"],
      color: "green",
    },
  ];

  const advantages = [
    { icon: "Zap", title: "Быстрый старт", desc: "Начинаем работу в день обращения. Без бюрократии и долгих согласований." },
    { icon: "Globe", title: "Работаем удалённо", desc: "Обслуживаем компании по всей России. Не привязаны к географии." },
    { icon: "Clock", title: "Режим работы 9–18 МСК", desc: "Поддержка в рабочее время без переплат за ночные смены." },
    { icon: "TrendingUp", title: "Масштабируемость", desc: "Растём вместе с вашим бизнесом — добавляем ресурсы по мере необходимости." },
    { icon: "DollarSign", title: "Экономия до 40%", desc: "Аутсорсинг обходится значительно дешевле собственного штата ИТ-специалистов." },
    { icon: "Award", title: "Единая ответственность", desc: "Один подрядчик закрывает все ИТ-задачи. Никаких перекладываний ответственности." },
  ];

  const plans = [
    {
      name: "Старт",
      subtitle: "Первая линия поддержки",
      price: "от 25 000",
      period: "₽/мес",
      highlight: false,
      features: [
        "До 10 пользователей",
        "Первая линия поддержки",
        "Удалённая помощь",
        "Время ответа — 2 часа",
        "Отчётность ежемесячно",
      ],
    },
    {
      name: "Бизнес",
      subtitle: "Полный ИТ-аутсорсинг",
      price: "от 65 000",
      period: "₽/мес",
      highlight: true,
      features: [
        "До 30 пользователей",
        "Первая + вторая линия",
        "Руководитель ИТ-отдела",
        "Время ответа — 30 мин",
        "Облачный сервер в подарок",
        "Отчётность еженедельно",
      ],
    },
    {
      name: "Корпоратив",
      subtitle: "Для крупных компаний",
      price: "По запросу",
      period: "",
      highlight: false,
      features: [
        "Более 30 пользователей",
        "Выделенная команда",
        "CTO на аутсорсе",
        "SLA под ваши требования",
        "Интеграция с вашими процессами",
        "Приоритетная поддержка",
      ],
    },
  ];

  const portfolio = [
    {
      title: "Переход с УПП на ERP",
      category: "1С",
      desc: "Перевели производственное предприятие с 1С:УПП на 1С:ERP. 80 пользователей, миграция данных за 2 недели.",
    },
    {
      title: "ИТ-инфраструктура под ключ",
      category: "Аутсорсинг",
      desc: "Построили ИТ-инфраструктуру для нового офиса: сеть, видеонаблюдение, серверное оборудование, 45 рабочих мест.",
    },
    {
      title: "Облачная миграция",
      category: "Облако",
      desc: "Перенесли корпоративные сервисы компании в наше облако. Снизили стоимость ИТ на 35% и повысили надёжность.",
    },
    {
      title: "Система видеонаблюдения",
      category: "Безопасность",
      desc: "Смонтировали систему из 48 камер для торгового центра в СПб. Интеграция с системой контроля доступа.",
    },
  ];

  const reviews = [
    {
      name: "Алексей Петров",
      role: "Генеральный директор, ООО «СтройГрупп»",
      text: "ITSPB ведёт наш ИТ уже 2 года. Никаких нареканий — всё работает, вопросы решаются быстро. Реально освободились от головной боли с техникой.",
      rating: 5,
    },
    {
      name: "Марина Сидорова",
      role: "Финансовый директор, АО «ТоргПлюс»",
      text: "Переход с УПП на ERP прошёл без остановки работы. Команда сделала всё чисто и в срок. Теперь работаем на аутсорсе — очень довольны.",
      rating: 5,
    },
    {
      name: "Дмитрий Козлов",
      role: "Владелец, сеть магазинов «Формат»",
      text: "Подключили видеонаблюдение во всех точках. Работа выполнена аккуратно, оборудование работает без сбоев уже больше года. Рекомендую.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "Как быстро вы реагируете на запросы?",
      a: "Время реакции зависит от тарифного плана: от 30 минут до 2 часов в рабочее время (9–18 МСК). Для критических инцидентов — внеочередной приоритет.",
    },
    {
      q: "Работаете ли вы с компаниями не из Санкт-Петербурга?",
      a: "Да, большинство наших услуг предоставляется удалённо по всей России. Монтаж оборудования (видеонаблюдение, сети) — только в СПб и Ленинградской области.",
    },
    {
      q: "Что нужно, чтобы начать работать?",
      a: "Оставьте заявку, мы свяжемся с вами, проведём аудит текущей ИТ-инфраструктуры и предложим оптимальный план. Старт возможен в день подписания договора.",
    },
    {
      q: "Можно ли взять только часть услуг?",
      a: "Конечно. Вы выбираете ровно то, что нужно: только поддержка пользователей, только 1С, только облачный сервер или полный аутсорсинг.",
    },
    {
      q: "Какие гарантии надёжности облачных серверов?",
      a: "Серверы работают на AMD Ryzen 9 9950X3D с NVMe-дисками и оперативной памятью до 192 ГБ. Гарантируем SLA 99,9%, резервное копирование и защиту от атак.",
    },
    {
      q: "Как происходит переход с УПП на ERP в 1С?",
      a: "Проводим анализ данных, разрабатываем план миграции, переносим данные и настраиваем конфигурацию. Переход занимает от 1 до 4 недель в зависимости от объёма данных.",
    },
  ];

  const colorMap: Record<string, string> = {
    blue: "text-brand-blue",
    orange: "text-brand-orange",
    green: "text-brand-green",
  };

  const bgMap: Record<string, string> = {
    blue: "bg-blue-50",
    orange: "bg-orange-50",
    green: "bg-green-50",
  };

  const dotMap: Record<string, string> = {
    blue: "bg-brand-blue",
    orange: "bg-brand-orange",
    green: "bg-brand-green",
  };

  return (
    <div className="min-h-screen font-golos">
      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100" : "bg-transparent"}`}>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <img src={LOGO_URL} alt="ITSPB" className="h-10 object-contain" />
            <div className="hidden md:flex items-center gap-6">
              {[["Услуги", "services"], ["Преимущества", "advantages"], ["Тарифы", "plans"], ["Портфолио", "portfolio"], ["Отзывы", "reviews"], ["FAQ", "faq"]].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`nav-link text-sm font-medium transition-colors ${scrolled ? "text-gray-700 hover:text-brand-blue" : "text-white/90 hover:text-white"}`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="btn-orange px-5 py-2 rounded-lg text-sm font-semibold"
              >
                Оставить заявку
              </button>
            </div>
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? "X" : "Menu"} size={24} className={scrolled ? "text-gray-800" : "text-white"} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="container px-4 py-4 flex flex-col gap-3">
              {[["Услуги", "services"], ["Преимущества", "advantages"], ["Тарифы", "plans"], ["Портфолио", "portfolio"], ["Отзывы", "reviews"], ["FAQ", "faq"], ["Контакты", "contact"]].map(([label, id]) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-left text-gray-700 font-medium py-2 border-b border-gray-50">
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="hero-bg grid-bg min-h-screen flex items-center pt-16 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="section-tag mb-6" style={{ background: "rgba(244,120,32,0.15)", border: "1px solid rgba(244,120,32,0.3)", color: "#F47820" }}>
                ИТ-решения для вашего бизнеса
              </div>
              <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
                Ваш надёжный<br />
                <span className="text-gradient-orange">ИТ-отдел</span><br />
                на аутсорсе
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Берём на себя всю ИТ-инфраструктуру вашей компании — от поддержки сотрудников до облачных серверов и 1С. Работаем удалённо по всей России.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <button onClick={() => scrollTo("contact")} className="btn-orange px-8 py-4 rounded-xl text-base font-bold">
                  Получить консультацию
                </button>
                <button onClick={() => scrollTo("services")} className="px-8 py-4 rounded-xl text-base font-semibold text-white border border-white/30 hover:bg-white/10 transition-all">
                  Наши услуги
                </button>
              </div>
              <div className="flex flex-wrap gap-8">
                {[["10+", "лет опыта"], ["200+", "клиентов"], ["9–18", "часов поддержки"]].map(([num, label]) => (
                  <div key={label}>
                    <div className="text-2xl font-montserrat font-extrabold text-white">{num}</div>
                    <div className="text-white/50 text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-float" style={{ boxShadow: "0 30px 80px rgba(26,125,200,0.35)" }}>
                <img src={HERO_IMG} alt="ITSPB офис" className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-brand-orange flex items-center justify-center shadow-xl">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-56 rounded-xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-brand-green" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Статус</div>
                    <div className="text-sm font-semibold text-gray-800">Все системы работают</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F4F7FA] to-transparent" />
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-[#F4F7FA]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="section-tag mb-4">Что мы делаем</div>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-brand-dark mb-4">Наши услуги</h2>
            <div className="divider-line w-16 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="card-hover bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <div className={`w-12 h-12 rounded-xl ${bgMap[s.color]} flex items-center justify-center mb-5`}>
                  <Icon name={s.icon} size={24} className={colorMap[s.color]} />
                </div>
                <h3 className="font-montserrat font-bold text-xl text-brand-dark mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className={`w-1.5 h-1.5 rounded-full ${dotMap[s.color]}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="section-tag mb-4">Почему мы</div>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-brand-dark mb-4">Преимущества ITSPB</h2>
            <div className="divider-line w-16 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a) => (
              <div key={a.title} className="card-hover flex gap-4 p-6 rounded-2xl bg-[#F4F7FA] border border-gray-100">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Icon name={a.icon} size={22} className="text-brand-blue" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-base text-brand-dark mb-1">{a.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-20 bg-[#F4F7FA]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="section-tag mb-4">Стоимость</div>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-brand-dark mb-4">Тарифные планы</h2>
            <div className="divider-line w-16 mx-auto" />
            <p className="text-gray-500 mt-4 text-sm">Точная стоимость зависит от количества пользователей и задач. Первый аудит — бесплатно.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-8 relative ${p.highlight
                  ? "bg-gradient-to-br from-brand-dark to-[#0f3d6e] text-white shadow-2xl md:scale-105"
                  : "bg-white border border-gray-100 shadow-sm"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-xs font-bold px-4 py-1 rounded-full">
                    Популярный
                  </div>
                )}
                <div className={`text-sm font-semibold mb-1 ${p.highlight ? "text-white/60" : "text-gray-400"}`}>{p.subtitle}</div>
                <div className="font-montserrat font-extrabold text-3xl mb-1" style={{ color: p.highlight ? "#F47820" : "#1A7DC8" }}>{p.price}</div>
                <div className={`text-sm mb-6 ${p.highlight ? "text-white/50" : "text-gray-400"}`}>{p.period}</div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Icon name="Check" size={16} className={p.highlight ? "text-brand-orange" : "text-brand-green"} />
                      <span className={p.highlight ? "text-white/90" : "text-gray-700"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("contact")}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${p.highlight ? "btn-orange" : "btn-primary"}`}
                >
                  Выбрать план
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="section-tag mb-4">Наши работы</div>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-brand-dark mb-4">Портфолио</h2>
            <div className="divider-line w-16 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {portfolio.map((p) => (
              <div key={p.title} className="card-hover group rounded-2xl p-8 bg-[#F4F7FA] border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-blue to-brand-orange" />
                <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold mb-4 ml-4">{p.category}</span>
                <h3 className="font-montserrat font-bold text-xl text-brand-dark mb-3 ml-4">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed ml-4">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-brand-dark">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="section-tag mb-4" style={{ background: "rgba(244,120,32,0.15)", border: "1px solid rgba(244,120,32,0.3)", color: "#F47820" }}>Клиенты о нас</div>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-white mb-4">Отзывы</h2>
            <div className="divider-line w-16 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="card-hover rounded-2xl p-7 bg-white/5 border border-white/10">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-brand-orange" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">«{r.text}»</p>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-semibold text-white text-sm">{r.name}</div>
                  <div className="text-white/40 text-xs mt-1">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[#F4F7FA]">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="section-tag mb-4">Вопросы и ответы</div>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-brand-dark mb-4">FAQ</h2>
            <div className="divider-line w-16 mx-auto" />
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-montserrat font-semibold text-brand-dark text-base">{f.q}</span>
                  <Icon
                    name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                    size={20}
                    className="text-brand-blue shrink-0 ml-4"
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="section-tag mb-4">Напишите нам</div>
              <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-brand-dark mb-6">Оставьте заявку</h2>
              <div className="divider-line w-16 mb-8" />
              <p className="text-gray-500 mb-10 leading-relaxed">
                Опишите вашу задачу или вопрос. Мы свяжемся с вами в течение рабочего дня и предложим оптимальное решение.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "Mail", text: "roman@itspb.com", href: "mailto:roman@itspb.com" },
                  { icon: "Send", text: "@roman_levanov", href: "https://t.me/roman_levanov" },
                  { icon: "Clock", text: "Пн–Пт, 9:00–18:00 МСК", href: null },
                  { icon: "MapPin", text: "Санкт-Петербург (монтаж по СПб и ЛО)", href: null },
                ].map((c) => (
                  <div key={c.text} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Icon name={c.icon} size={18} className="text-brand-blue" />
                    </div>
                    {c.href ? (
                      <a href={c.href} className="text-gray-700 hover:text-brand-blue transition-colors font-medium">{c.text}</a>
                    ) : (
                      <span className="text-gray-700 font-medium">{c.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#F4F7FA] rounded-2xl p-8 border border-gray-100">
              {formState === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-brand-green" />
                  </div>
                  <h3 className="font-montserrat font-bold text-xl text-brand-dark mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-500">Мы свяжемся с вами в течение рабочего дня.</p>
                  <button className="mt-6 text-brand-blue text-sm font-medium hover:underline" onClick={() => setFormState("idle")}>
                    Отправить ещё одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Имя *</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Иван Иванов"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Телефон</label>
                      <input
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="ivan@company.ru"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Услуга</label>
                    <select
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-sm"
                    >
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
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Сообщение</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Опишите вашу задачу..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue text-sm resize-none"
                    />
                  </div>
                  {formState === "error" && (
                    <p className="text-red-500 text-sm">Ошибка отправки. Попробуйте ещё раз или напишите напрямую.</p>
                  )}
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="btn-orange w-full py-4 rounded-xl font-bold text-base disabled:opacity-60"
                  >
                    {formState === "loading" ? "Отправляю..." : "Отправить заявку"}
                  </button>
                  <p className="text-gray-400 text-xs text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark py-10 border-t border-white/10">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <img src={LOGO_URL} alt="ITSPB" className="h-10 object-contain brightness-0 invert" />
            <div className="flex flex-wrap justify-center gap-6">
              {[["Услуги", "services"], ["Тарифы", "plans"], ["Портфолио", "portfolio"], ["Контакты", "contact"]].map(([label, id]) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-white/50 hover:text-white text-sm transition-colors">
                  {label}
                </button>
              ))}
            </div>
            <div className="text-white/30 text-sm">© 2025 ITSPB. IT Services & Solutions</div>
          </div>
        </div>
      </footer>
    </div>
  );
}