// Système de traductions multilingues
const translations = {
    fr: {
        nav: {
            home: "Accueil",
            about: "À propos",
            services: "Services",
            events: "Événements",
            gallery: "Galerie",
            partners: "Partenaires",
            testimonials: "Témoignages",
            pricing: "Tarifs",
            contact: "Contact"
        },
        hero: {
            title: "Révélez Votre Potentiel",
            subtitle: "Coaching fitness personnalisé pour femmes à Bratislava",
            description: "Transformez votre corps et votre esprit avec un accompagnement bienveillant et professionnel",
            cta: "Réserver une séance",
            discover: "Découvrir mes services",
            scroll: "Défiler"
        },
        about: {
            tag: "Qui suis-je",
            title: "À Propos d'Alina",
            subtitle: "Coach Fitness Certifiée",
            experience: "Années d'expérience",
            bio1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Passionnée par le fitness et le bien-être, j'accompagne les femmes dans leur transformation physique et mentale depuis plus de 5 ans.",
            bio2: "Ma philosophie repose sur une approche holistique : exercices adaptés, nutrition équilibrée et mindset positif. Chaque programme est personnalisé selon vos objectifs et votre rythme.",
            cert1: "Certifiée Personal Trainer",
            cert2: "Spécialiste Nutrition",
            cert3: "Coach Bien-être"
        },
        services: {
            tag: "Mes Services",
            title: "Programmes de Coaching",
            description: "Des programmes adaptés à vos besoins et objectifs",
            popular: "Populaire",
            learn: "En savoir plus →",
            individual: {
                title: "Coaching Individuel",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Accompagnement personnalisé en présentiel ou en ligne.",
                price: "À partir de 50€",
                feat1: "Programme sur mesure",
                feat2: "Suivi personnalisé",
                feat3: "Flexibilité horaires"
            },
            group: {
                title: "Séances en Groupe",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Entraînements dynamiques en petit groupe (max 6 personnes).",
                price: "15€/séance",
                feat1: "Ambiance motivante",
                feat2: "Tarif avantageux",
                feat3: "Créer des liens"
            },
            online: {
                title: "Programmes en Ligne",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Entraînez-vous où vous voulez, quand vous voulez.",
                price: "Sur devis",
                feat1: "Accès 24/7",
                feat2: "Vidéos détaillées",
                feat3: "Support continu"
            }
        },
        events: {
            tag: "Prochains événements",
            title: "Retrouvez-moi lors des prochains rendez-vous",
            description: "Séances collectives, ateliers et événements bien-être à venir."
        },
        gallery: {
            tag: "Galerie",
            title: "Exemples & Vidéos",
            description: "Découvrez mes entraînements et transformations",
            videos: "Vidéos d'Entraînement",
            photos: "Galerie Photos"
        },
        partners: {
            tag: "Partenariats",
            title: "Mes Partenaires",
            description: "Je collabore avec d'excellents professionnels",
            specialty1: "Yoga & Pilates",
            specialty2: "Nutrition",
            specialty3: "Mindset Coach",
            desc1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        testimonials: {
            tag: "Témoignages",
            title: "Ce Que Disent Mes Clientes",
            client: "Cliente depuis",
            text1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Alina est une coach exceptionnelle qui m'a aidée à atteindre mes objectifs. Je me sens plus forte et confiante!",
            text2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Programme parfaitement adapté à mes besoins. Les résultats sont visibles et je me sens en pleine forme!",
            text3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Approche bienveillante et professionnelle. Je recommande vivement Alina à toutes les femmes!"
        },
        pricing: {
            tag: "Tarifs",
            title: "Choisissez Votre Formule",
            description: "Des tarifs adaptés à tous les budgets",
            popular: "Populaire",
            session: "/ séance",
            month: "/ mois",
            book: "Réserver",
            starter: {
                name: "Découverte",
                feat1: "1 séance individuelle",
                feat2: "Évaluation complète",
                feat3: "Programme personnalisé",
                feat4: "Conseils nutrition"
            },
            premium: {
                name: "Premium",
                feat1: "4 séances / mois",
                feat2: "Suivi personnalisé",
                feat3: "Plan nutrition détaillé",
                feat4: "Support WhatsApp",
                feat5: "Accès vidéos exclusives"
            },
            vip: {
                name: "VIP",
                feat1: "8 séances / mois",
                feat2: "Suivi quotidien",
                feat3: "Nutrition + suppléments",
                feat4: "Support 24/7",
                feat5: "Accès tous programmes",
                feat6: "Séances partenaires"
            }
        },
        contact: {
            tag: "Contact",
            title: "Commencez Votre Transformation",
            description: "Contactez-moi pour une première séance découverte",
            location: "Localisation",
            email: "Email",
            phone: "Téléphone / WhatsApp",
            hours: "Horaires",
            schedule: "Lun-Ven: 7h-20h<br>Sam: 9h-14h",
            form: {
                name: "Nom *",
                email: "Email *",
                phone: "Téléphone",
                service: "Service souhaité",
                select: "Sélectionnez...",
                individual: "Coaching individuel",
                group: "Séances en groupe",
                online: "Programme en ligne",
                message: "Message *",
                send: "Envoyer le message"
            }
        },
        footer: {
            tagline: "Votre partenaire fitness à Bratislava",
            quick: "Liens Rapides",
            legal: "Légal",
            privacy: "Politique de confidentialité",
            terms: "Conditions d'utilisation",
            cookies: "Cookies",
            newsletter: "Newsletter",
            subscribe: "Recevez mes conseils fitness",
            email: "Votre email",
            join: "S'inscrire",
            rights: "Tous droits réservés."
        }
    },
    en: {
        nav: {
            home: "Home",
            about: "About",
            services: "Services",
            events: "Events",
            gallery: "Gallery",
            partners: "Partners",
            testimonials: "Testimonials",
            pricing: "Pricing",
            contact: "Contact"
        },
        hero: {
            title: "Reveal Your Potential",
            subtitle: "Personalized fitness coaching for women in Bratislava",
            description: "Transform your body and mind with caring and professional support",
            cta: "Book a session",
            discover: "Discover my services",
            scroll: "Scroll"
        },
        about: {
            tag: "Who I am",
            title: "About Alina",
            subtitle: "Certified Fitness Coach",
            experience: "Years of experience",
            bio1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Passionate about fitness and wellness, I have been supporting women in their physical and mental transformation for over 5 years.",
            bio2: "My philosophy is based on a holistic approach: adapted exercises, balanced nutrition and positive mindset. Each program is personalized according to your goals and pace.",
            cert1: "Certified Personal Trainer",
            cert2: "Nutrition Specialist",
            cert3: "Wellness Coach"
        },
        services: {
            tag: "My Services",
            title: "Coaching Programs",
            description: "Programs adapted to your needs and goals",
            popular: "Popular",
            learn: "Learn more →",
            individual: {
                title: "Individual Coaching",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Personalized support in person or online.",
                price: "From 50€",
                feat1: "Customized program",
                feat2: "Personal follow-up",
                feat3: "Flexible schedule"
            },
            group: {
                title: "Group Sessions",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dynamic training in small groups (max 6 people).",
                price: "15€/session",
                feat1: "Motivating atmosphere",
                feat2: "Advantageous rate",
                feat3: "Build connections"
            },
            online: {
                title: "Online Programs",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Train where you want, when you want.",
                price: "On quote",
                feat1: "24/7 access",
                feat2: "Detailed videos",
                feat3: "Continuous support"
            }
        },
        events: {
            tag: "Upcoming events",
            title: "Meet me at the next sessions",
            description: "Group sessions, workshops and wellness events coming soon."
        },
        gallery: {
            tag: "Gallery",
            title: "Examples & Videos",
            description: "Discover my workouts and transformations",
            videos: "Training Videos",
            photos: "Photo Gallery"
        },
        partners: {
            tag: "Partnerships",
            title: "My Partners",
            description: "I collaborate with excellent professionals",
            specialty1: "Yoga & Pilates",
            specialty2: "Nutrition",
            specialty3: "Mindset Coach",
            desc1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        testimonials: {
            tag: "Testimonials",
            title: "What My Clients Say",
            client: "Client for",
            text1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Alina is an exceptional coach who helped me achieve my goals. I feel stronger and more confident!",
            text2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Program perfectly adapted to my needs. The results are visible and I feel great!",
            text3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Caring and professional approach. I highly recommend Alina to all women!"
        },
        pricing: {
            tag: "Pricing",
            title: "Choose Your Plan",
            description: "Rates adapted to all budgets",
            popular: "Popular",
            session: "/ session",
            month: "/ month",
            book: "Book",
            starter: {
                name: "Discovery",
                feat1: "1 individual session",
                feat2: "Complete assessment",
                feat3: "Personalized program",
                feat4: "Nutrition advice"
            },
            premium: {
                name: "Premium",
                feat1: "4 sessions / month",
                feat2: "Personal follow-up",
                feat3: "Detailed nutrition plan",
                feat4: "WhatsApp support",
                feat5: "Exclusive video access"
            },
            vip: {
                name: "VIP",
                feat1: "8 sessions / month",
                feat2: "Daily follow-up",
                feat3: "Nutrition + supplements",
                feat4: "24/7 support",
                feat5: "All programs access",
                feat6: "Partner sessions"
            }
        },
        contact: {
            tag: "Contact",
            title: "Start Your Transformation",
            description: "Contact me for a first discovery session",
            location: "Location",
            email: "Email",
            phone: "Phone / WhatsApp",
            hours: "Hours",
            schedule: "Mon-Fri: 7am-8pm<br>Sat: 9am-2pm",
            form: {
                name: "Name *",
                email: "Email *",
                phone: "Phone",
                service: "Desired service",
                select: "Select...",
                individual: "Individual coaching",
                group: "Group sessions",
                online: "Online program",
                message: "Message *",
                send: "Send message"
            }
        },
        footer: {
            tagline: "Your fitness partner in Bratislava",
            quick: "Quick Links",
            legal: "Legal",
            privacy: "Privacy Policy",
            terms: "Terms of Use",
            cookies: "Cookies",
            newsletter: "Newsletter",
            subscribe: "Receive my fitness tips",
            email: "Your email",
            join: "Subscribe",
            rights: "All rights reserved."
        }
    },
    sk: {
        nav: {
            home: "Domov",
            about: "O mne",
            services: "Služby",
            events: "Podujatia",
            gallery: "Galéria",
            partners: "Partneri",
            testimonials: "Referencie",
            pricing: "Cenník",
            contact: "Kontakt"
        },
        hero: {
            title: "Odhaľte Svoj Potenciál",
            subtitle: "Personalizovaný fitness koučing pre ženy v Bratislave",
            description: "Transformujte svoje telo a myseľ s láskavou a profesionálnou podporou",
            cta: "Rezervovať lekciu",
            discover: "Objaviť moje služby",
            scroll: "Posunúť"
        },
        about: {
            tag: "Kto som",
            title: "O Aline",
            subtitle: "Certifikovaná Fitness Trénerka",
            experience: "Rokov skúseností",
            bio1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Som nadšená pre fitness a wellness, podporujem ženy v ich fyzickej a mentálnej transformácii už viac ako 5 rokov.",
            bio2: "Moja filozofia je založená na holistickom prístupe: prispôsobené cvičenia, vyvážená výživa a pozitívne myslenie. Každý program je personalizovaný podľa vašich cieľov a tempa.",
            cert1: "Certifikovaná Personal Trainer",
            cert2: "Špecialista na výživu",
            cert3: "Wellness Kouč"
        },
        services: {
            tag: "Moje Služby",
            title: "Koučingové Programy",
            description: "Programy prispôsobené vašim potrebám a cieľom",
            popular: "Populárne",
            learn: "Zistiť viac →",
            individual: {
                title: "Individuálny Koučing",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Personalizovaná podpora osobne alebo online.",
                price: "Od 50€",
                feat1: "Program na mieru",
                feat2: "Osobné sledovanie",
                feat3: "Flexibilný rozvrh"
            },
            group: {
                title: "Skupinové Lekcie",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dynamický tréning v malých skupinách (max 6 ľudí).",
                price: "15€/lekcia",
                feat1: "Motivujúca atmosféra",
                feat2: "Výhodná cena",
                feat3: "Vytváranie vzťahov"
            },
            online: {
                title: "Online Programy",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Trénujte kde chcete, kedy chcete.",
                price: "Na cenovú ponuku",
                feat1: "Prístup 24/7",
                feat2: "Podrobné videá",
                feat3: "Nepretržitá podpora"
            }
        },
        events: {
            tag: "Nadchádzajúce podujatia",
            title: "Pridajte sa ku mne na najbližších stretnutiach",
            description: "Skupinové lekcie, workshopy a wellness podujatia, ktoré sa blížia."
        },
        gallery: {
            tag: "Galéria",
            title: "Príklady & Videá",
            description: "Objavte moje tréningy a transformácie",
            videos: "Tréningové Videá",
            photos: "Fotogaléria"
        },
        partners: {
            tag: "Partnerstvá",
            title: "Moji Partneri",
            description: "Spolupracujem s výbornými profesionálmi",
            specialty1: "Yoga & Pilates",
            specialty2: "Výživa",
            specialty3: "Mindset Kouč",
            desc1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        testimonials: {
            tag: "Referencie",
            title: "Čo Hovoria Moje Klientky",
            client: "Klientka už",
            text1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Alina je výnimočná trénerka, ktorá mi pomohla dosiahnuť moje ciele. Cítim sa silnejšia a sebavedomejšia!",
            text2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Program perfektne prispôsobený mojim potrebám. Výsledky sú viditeľné a cítim sa skvelo!",
            text3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Láskavý a profesionálny prístup. Vrelo odporúčam Alinu všetkým ženám!"
        },
        pricing: {
            tag: "Cenník",
            title: "Vyberte Si Svoj Plán",
            description: "Ceny prispôsobené všetkým rozpočtom",
            popular: "Populárne",
            session: "/ lekcia",
            month: "/ mesiac",
            book: "Rezervovať",
            starter: {
                name: "Objavovanie",
                feat1: "1 individuálna lekcia",
                feat2: "Kompletné hodnotenie",
                feat3: "Personalizovaný program",
                feat4: "Výživové poradenstvo"
            },
            premium: {
                name: "Premium",
                feat1: "4 lekcie / mesiac",
                feat2: "Osobné sledovanie",
                feat3: "Podrobný výživový plán",
                feat4: "WhatsApp podpora",
                feat5: "Exkluzívny prístup k videám"
            },
            vip: {
                name: "VIP",
                feat1: "8 lekcií / mesiac",
                feat2: "Denné sledovanie",
                feat3: "Výživa + doplnky",
                feat4: "Podpora 24/7",
                feat5: "Prístup ku všetkým programom",
                feat6: "Partnerské lekcie"
            }
        },
        contact: {
            tag: "Kontakt",
            title: "Začnite Svoju Transformáciu",
            description: "Kontaktujte ma pre prvú objavovaciu lekciu",
            location: "Lokalita",
            email: "Email",
            phone: "Telefón / WhatsApp",
            hours: "Hodiny",
            schedule: "Pon-Pia: 7:00-20:00<br>Sob: 9:00-14:00",
            form: {
                name: "Meno *",
                email: "Email *",
                phone: "Telefón",
                service: "Požadovaná služba",
                select: "Vyberte...",
                individual: "Individuálny koučing",
                group: "Skupinové lekcie",
                online: "Online program",
                message: "Správa *",
                send: "Odoslať správu"
            }
        },
        footer: {
            tagline: "Váš fitness partner v Bratislave",
            quick: "Rýchle Odkazy",
            legal: "Právne",
            privacy: "Ochrana súkromia",
            terms: "Podmienky používania",
            cookies: "Cookies",
            newsletter: "Newsletter",
            subscribe: "Dostávajte moje fitness tipy",
            email: "Váš email",
            join: "Prihlásiť sa",
            rights: "Všetky práva vyhradené."
        }
    },
    ua: {
        nav: {
            home: "Головна",
            about: "Про мене",
            services: "Послуги",
            events: "Події",
            gallery: "Галерея",
            partners: "Партнери",
            testimonials: "Відгуки",
            pricing: "Ціни",
            contact: "Контакт"
        },
        hero: {
            title: "Розкрийте Свій Потенціал",
            subtitle: "Персоналізований фітнес-коучинг для жінок у Братиславі",
            description: "Трансформуйте своє тіло та розум з турботливою та професійною підтримкою",
            cta: "Забронювати сесію",
            discover: "Відкрити мої послуги",
            scroll: "Прокрутити"
        },
        about: {
            tag: "Хто я",
            title: "Про Аліну",
            subtitle: "Сертифікований Фітнес-Тренер",
            experience: "Років досвіду",
            bio1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Захоплена фітнесом та велнесом, я підтримую жінок у їхній фізичній та ментальній трансформації вже понад 5 років.",
            bio2: "Моя філософія базується на холістичному підході: адаптовані вправи, збалансоване харчування та позитивне мислення. Кожна програма персоналізована відповідно до ваших цілей та темпу.",
            cert1: "Сертифікований Персональний Тренер",
            cert2: "Спеціаліст з харчування",
            cert3: "Велнес-Коуч"
        },
        services: {
            tag: "Мої Послуги",
            title: "Програми Коучингу",
            description: "Програми адаптовані до ваших потреб та цілей",
            popular: "Популярне",
            learn: "Дізнатися більше →",
            individual: {
                title: "Індивідуальний Коучинг",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Персоналізована підтримка особисто або онлайн.",
                price: "Від 50€",
                feat1: "Програма на замовлення",
                feat2: "Особисте спостереження",
                feat3: "Гнучкий графік"
            },
            group: {
                title: "Групові Заняття",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Динамічні тренування в малих групах (макс 6 осіб).",
                price: "15€/сесія",
                feat1: "Мотивуюча атмосфера",
                feat2: "Вигідна ціна",
                feat3: "Створення зв'язків"
            },
            online: {
                title: "Онлайн Програми",
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Тренуйтеся де хочете, коли хочете.",
                price: "За запитом",
                feat1: "Доступ 24/7",
                feat2: "Детальні відео",
                feat3: "Постійна підтримка"
            }
        },
        events: {
            tag: "Найближчі події",
            title: "Приєднуйтесь до мене на найближчих подіях",
            description: "Групові сесії, воркшопи та wellness-події найближчим часом."
        },
        gallery: {
            tag: "Галерея",
            title: "Приклади та Відео",
            description: "Відкрийте мої тренування та трансформації",
            videos: "Тренувальні Відео",
            photos: "Фотогалерея"
        },
        partners: {
            tag: "Партнерства",
            title: "Мої Партнери",
            description: "Я співпрацюю з чудовими професіоналами",
            specialty1: "Йога та Пілатес",
            specialty2: "Харчування",
            specialty3: "Майндсет Коуч",
            desc1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            desc3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        testimonials: {
            tag: "Відгуки",
            title: "Що Кажуть Мої Клієнтки",
            client: "Клієнтка вже",
            text1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Аліна - виняткова тренерка, яка допомогла мені досягти моїх цілей. Я відчуваю себе сильнішою та впевненішою!",
            text2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Програма ідеально адаптована до моїх потреб. Результати видимі, і я відчуваю себе чудово!",
            text3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Турботливий та професійний підхід. Я щиро рекомендую Аліну всім жінкам!"
        },
        pricing: {
            tag: "Ціни",
            title: "Виберіть Свій План",
            description: "Ціни адаптовані до всіх бюджетів",
            popular: "Популярне",
            session: "/ сесія",
            month: "/ місяць",
            book: "Забронювати",
            starter: {
                name: "Відкриття",
                feat1: "1 індивідуальна сесія",
                feat2: "Повна оцінка",
                feat3: "Персоналізована програма",
                feat4: "Поради з харчування"
            },
            premium: {
                name: "Преміум",
                feat1: "4 сесії / місяць",
                feat2: "Особисте спостереження",
                feat3: "Детальний план харчування",
                feat4: "Підтримка WhatsApp",
                feat5: "Ексклюзивний доступ до відео"
            },
            vip: {
                name: "VIP",
                feat1: "8 сесій / місяць",
                feat2: "Щоденне спостереження",
                feat3: "Харчування + добавки",
                feat4: "Підтримка 24/7",
                feat5: "Доступ до всіх програм",
                feat6: "Партнерські сесії"
            }
        },
        contact: {
            tag: "Контакт",
            title: "Почніть Свою Трансформацію",
            description: "Зв'яжіться зі мною для першої ознайомчої сесії",
            location: "Локація",
            email: "Електронна пошта",
            phone: "Телефон / WhatsApp",
            hours: "Години",
            schedule: "Пн-Пт: 7:00-20:00<br>Сб: 9:00-14:00",
            form: {
                name: "Ім'я *",
                email: "Email *",
                phone: "Телефон",
                service: "Бажана послуга",
                select: "Виберіть...",
                individual: "Індивідуальний коучинг",
                group: "Групові заняття",
                online: "Онлайн програма",
                message: "Повідомлення *",
                send: "Надіслати повідомлення"
            }
        },
        footer: {
            tagline: "Ваш фітнес-партнер у Братиславі",
            quick: "Швидкі Посилання",
            legal: "Юридичне",
            privacy: "Політика конфіденційності",
            terms: "Умови використання",
            cookies: "Cookies",
            newsletter: "Розсилка",
            subscribe: "Отримуйте мої фітнес-поради",
            email: "Ваш email",
            join: "Підписатися",
            rights: "Всі права захищені."
        }
    }
};

// Fonction pour changer la langue
function changeLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Language ${lang} not found`);
        return;
    }
    
    // Sauvegarder la langue choisie
    localStorage.setItem('preferredLanguage', lang);
    
    // Instead of updating data-i18n elements directly, trigger content reload from Netlify Blobs
    // This ensures content comes from the CMS, not from static translations
    if (window.siteContent && typeof window.applySiteContent === 'function') {
        window.applySiteContent(lang);
    } else {
        // Fallback: update data-i18n elements with static translations (for navigation, etc.)
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getNestedTranslation(translations[lang], key);
            
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Mettre à jour les placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = getNestedTranslation(translations[lang], key);
            
            if (translation) {
                element.placeholder = translation;
            }
        });
    }
    
    // Mettre à jour les boutons de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Mettre à jour l'attribut lang du HTML
    document.documentElement.lang = lang;
}

// Fonction helper pour accéder aux traductions imbriquées
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Don't call changeLanguage automatically - content is now managed by content-loader.js from Netlify Blobs
    // const savedLang = localStorage.getItem('preferredLanguage') || 'fr';
    // changeLanguage(savedLang);
    
    // Toggle dropdown
    const langToggle = document.getElementById('publicLangToggle');
    const langDropdown = document.getElementById('publicLangDropdown');
    
    if (langToggle && langDropdown) {
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });
    }
    
    // Ajouter les event listeners sur les boutons de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
            
            // Close dropdown after selection
            if (langDropdown) {
                langDropdown.classList.remove('active');
            }

            if (typeof window.renderEventsForLanguage === 'function') {
                window.renderEventsForLanguage(lang);
            } else if (typeof window.applySiteContent === 'function') {
                window.applySiteContent(lang);
            }
        });
    });
});

// Made with Bob
