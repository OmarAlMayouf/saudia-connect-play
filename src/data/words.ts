export interface Word {
    word: string;
    category: string;
    region?: string;
}

/**
 * The wordDatabase represents the Firestore `words` collection.
 * It is NOT used to fetch words at runtime — Firebase is the source of truth.
 * This file is used for:
 *   1. Uploading the initial seed data to Firebase.
 *   2. Referencing the algorithm (getRandomWords) locally during development.
 */
export const wordDatabase: Word[] = [
    // ===== FOOD =====
    { word: "كبسة", category: "food" },
    { word: "مندي", category: "food" },
    { word: "جريش", category: "food" },
    { word: "مرقوق", category: "food" },
    { word: "مطازيز", category: "food" },
    { word: "قرصان", category: "food" },
    { word: "عريكة", category: "food" },
    { word: "سليق", category: "food" },
    { word: "معصوب", category: "food" },
    { word: "حنيني", category: "food" },
    { word: "كليجا", category: "food" },
    { word: "مضبي", category: "food" },
    { word: "سمبوسة", category: "food" },
    { word: "تمر", category: "food" },
    { word: "هريسة", category: "food" },
    { word: "مكبوس", category: "food" },
    { word: "بريانی", category: "food" },
    { word: "شاورما", category: "food" },
    { word: "فول", category: "food" },
    { word: "متبل", category: "food" },
    { word: "حمص", category: "food" },
    { word: "فلافل", category: "food" },
    { word: "كنافة", category: "food" },
    { word: "قطايف", category: "food" },
    { word: "مهلبية", category: "food" },
    { word: "لقيمات", category: "food" },
    { word: "بلاليط", category: "food" },
    { word: "عصيدة", category: "food" },
    { word: "مسكوف", category: "food" },
    { word: "قوزي", category: "food" },
    { word: "منسف", category: "food" },
    { word: "ثريد", category: "food" },
    { word: "مرق", category: "food" },
    { word: "مفطح", category: "food" },
    { word: "خبز", category: "food" },
    { word: "مرتديلا", category: "food" },
    { word: "محمر", category: "food" },
    { word: "قهوة", category: "food" },
    { word: "شاي", category: "food" },
    { word: "عرق سوس", category: "food" },
    { word: "تمر هندي", category: "food" },
    { word: "لبن", category: "food" },
    { word: "كشك", category: "food" },
    { word: "صالونة", category: "food" },
    { word: "مرق دجاج", category: "food" },
    { word: "حساء عدس", category: "food" },
    { word: "فتة", category: "food" },
    { word: "كبدة", category: "food" },
    { word: "مشاوي", category: "food" },
    { word: "رشوف", category: "food" },

    // ===== CITIES =====
    { word: "الرياض", category: "cities" },
    { word: "جدة", category: "cities" },
    { word: "مكة", category: "cities" },
    { word: "المدينة", category: "cities" },
    { word: "الدمام", category: "cities" },
    { word: "الخبر", category: "cities" },
    { word: "أبها", category: "cities" },
    { word: "تبوك", category: "cities" },
    { word: "حائل", category: "cities" },
    { word: "نجران", category: "cities" },
    { word: "العلا", category: "cities" },
    { word: "الطائف", category: "cities" },
    { word: "جازان", category: "cities" },
    { word: "سكاكا", category: "cities" },
    { word: "عرعر", category: "cities" },
    { word: "القطيف", category: "cities" },
    { word: "الأحساء", category: "cities" },
    { word: "ينبع", category: "cities" },
    { word: "خميس مشيط", category: "cities" },
    { word: "بريدة", category: "cities" },
    { word: "عنيزة", category: "cities" },
    { word: "القصيم", category: "cities" },
    { word: "الجوف", category: "cities" },
    { word: "الباحة", category: "cities" },
    { word: "الليث", category: "cities" },
    { word: "القنفذة", category: "cities" },
    { word: "وادي الدواسر", category: "cities" },
    { word: "رفحاء", category: "cities" },
    { word: "الزلفي", category: "cities" },
    { word: "شرورة", category: "cities" },

    // ===== TRADITIONS & CULTURE =====
    { word: "العرضة", category: "traditions" },
    { word: "البشت", category: "traditions" },
    { word: "العقال", category: "traditions" },
    { word: "الغترة", category: "traditions" },
    { word: "الشماغ", category: "traditions" },
    { word: "السدو", category: "traditions" },
    { word: "المجلس", category: "traditions" },
    { word: "الدلال", category: "traditions" },
    { word: "المزمار", category: "traditions" },
    { word: "الحناء", category: "traditions" },
    { word: "الدف", category: "traditions" },
    { word: "الرواية", category: "traditions" },
    { word: "المهر", category: "traditions" },
    { word: "الوليمة", category: "traditions" },
    { word: "السمر", category: "traditions" },
    { word: "المبارك", category: "traditions" },
    { word: "الكيل", category: "traditions" },
    { word: "الخرج", category: "traditions" },
    { word: "العيد", category: "traditions" },
    { word: "رمضان", category: "traditions" },
    { word: "الزكاة", category: "traditions" },
    { word: "الحج", category: "traditions" },
    { word: "العمرة", category: "traditions" },
    { word: "الأذان", category: "traditions" },
    { word: "الصلاة", category: "traditions" },
    { word: "الضيافة", category: "traditions" },
    { word: "البخور", category: "traditions" },
    { word: "العطر", category: "traditions" },
    { word: "المسواك", category: "traditions" },
    { word: "السفرة", category: "traditions" },

    // ===== SAUDI DIALECT =====
    { word: "سنعة", category: "dialect" },
    { word: "كشخة", category: "dialect" },
    { word: "هرجة", category: "dialect" },
    { word: "مشوار", category: "dialect" },
    { word: "زحمة", category: "dialect" },
    { word: "خشم", category: "dialect" },
    { word: "حيل", category: "dialect" },
    { word: "طق", category: "dialect" },
    { word: "يهبل", category: "dialect" },
    { word: "تفشخر", category: "dialect" },
    { word: "مزة", category: "dialect" },
    { word: "ثقيل", category: "dialect" },
    { word: "شكل", category: "dialect" },
    { word: "ودعة", category: "dialect" },
    { word: "غلط", category: "dialect" },
    { word: "بلوى", category: "dialect" },
    { word: "صراحة", category: "dialect" },
    { word: "على طول", category: "dialect" },
    { word: "ما عليه", category: "dialect" },
    { word: "قدام", category: "dialect" },
    { word: "وراه", category: "dialect" },
    { word: "زين", category: "dialect" },
    { word: "عشم", category: "dialect" },
    { word: "ترس", category: "dialect" },
    { word: "لقف", category: "dialect" },

    // ===== CELEBRITIES & PUBLIC FIGURES =====
    { word: "محمد عبده", category: "celebrities" },
    { word: "ماجد عبدالله", category: "celebrities" },
    { word: "سامي الجابر", category: "celebrities" },
    { word: "ياسر القحطاني", category: "celebrities" },
    { word: "طلال مداح", category: "celebrities" },
    { word: "عبدالمجيد عبدالله", category: "celebrities" },
    { word: "رابح صقر", category: "celebrities" },
    { word: "عبادي الجوهر", category: "celebrities" },
    { word: "أحمد عطية", category: "celebrities" },
    { word: "محمد الشمري", category: "celebrities" },
    { word: "فهد بالنفس", category: "celebrities" },
    { word: "أصيل أبو بكر", category: "celebrities" },
    { word: "فؤاد عبدالواحد", category: "celebrities" },
    { word: "عبدالله الرويشد", category: "celebrities" },
    { word: "نوال الكويتية", category: "celebrities" },
    { word: "حسين الجسمي", category: "celebrities" },

    // ===== LANDMARKS =====
    { word: "الكعبة", category: "landmarks" },
    { word: "مدائن صالح", category: "landmarks" },
    { word: "الدرعية", category: "landmarks" },
    { word: "برج الفيصلية", category: "landmarks" },
    { word: "برج المملكة", category: "landmarks" },
    { word: "العلا", category: "landmarks" },
    { word: "نيوم", category: "landmarks" },
    { word: "البحر الأحمر", category: "landmarks" },
    { word: "تروجينا", category: "landmarks" },
    { word: "القدية", category: "landmarks" },
    { word: "الخزامى", category: "landmarks" },
    { word: "جبل عمر", category: "landmarks" },
    { word: "البلد", category: "landmarks" },
    { word: "الفيلا", category: "landmarks" },
    { word: "وادي حنيفة", category: "landmarks" },
    { word: "منتزه الملك", category: "landmarks" },
    { word: "مسجد قباء", category: "landmarks" },
    { word: "الروضة الشريفة", category: "landmarks" },
    { word: "مقام إبراهيم", category: "landmarks" },
    { word: "بئر زمزم", category: "landmarks" },

    // ===== ANIMALS =====
    { word: "صقر", category: "animals" },
    { word: "ناقة", category: "animals" },
    { word: "مها", category: "animals" },
    { word: "وعل", category: "animals" },
    { word: "ضب", category: "animals" },
    { word: "نمر عربي", category: "animals" },
    { word: "حمامة", category: "animals" },
    { word: "عقاب", category: "animals" },
    { word: "أرنب", category: "animals" },
    { word: "ذئب", category: "animals" },
    { word: "ثعلب", category: "animals" },
    { word: "قنفذ", category: "animals" },
    { word: "دلفين", category: "animals" },
    { word: "سلحفاة", category: "animals" },
    { word: "قرش", category: "animals" },
    { word: "بعير", category: "animals" },
    { word: "حصان", category: "animals" },
    { word: "خروف", category: "animals" },
    { word: "تيس", category: "animals" },
    { word: "دجاجة", category: "animals" },

    // ===== SPORTS =====
    { word: "الهلال", category: "sports" },
    { word: "النصر", category: "sports" },
    { word: "الاتحاد", category: "sports" },
    { word: "الأهلي", category: "sports" },
    { word: "الشباب", category: "sports" },
    { word: "دوري روشن", category: "sports" },
    { word: "كأس الملك", category: "sports" },
    { word: "رالي داكار", category: "sports" },
    { word: "كرة القدم", category: "sports" },
    { word: "السلة", category: "sports" },
    { word: "التنس", category: "sports" },
    { word: "السباحة", category: "sports" },
    { word: "الفروسية", category: "sports" },
    { word: "الهجن", category: "sports" },
    { word: "صيد الصقور", category: "sports" },
    { word: "الغوص", category: "sports" },
    { word: "التزلج", category: "sports" },

    // ===== NATURE =====
    { word: "صحراء", category: "nature" },
    { word: "نخلة", category: "nature" },
    { word: "رمال", category: "nature" },
    { word: "جبل", category: "nature" },
    { word: "وادي", category: "nature" },
    { word: "خشب", category: "nature" },
    { word: "بركان", category: "nature" },
    { word: "شلال", category: "nature" },
    { word: "كثيب", category: "nature" },
    { word: "سماء", category: "nature" },
    { word: "نجم", category: "nature" },
    { word: "قمر", category: "nature" },
    { word: "شمس", category: "nature" },
    { word: "غيوم", category: "nature" },
    { word: "مطر", category: "nature" },
    { word: "برق", category: "nature" },
    { word: "رعد", category: "nature" },
    { word: "موج", category: "nature" },
    { word: "شاطئ", category: "nature" },
    { word: "جزيرة", category: "nature" },

    // ===== OBJECTS / EVERYDAY =====
    { word: "مفتاح", category: "objects" },
    { word: "ساعة", category: "objects" },
    { word: "هاتف", category: "objects" },
    { word: "كتاب", category: "objects" },
    { word: "قلم", category: "objects" },
    { word: "مرآة", category: "objects" },
    { word: "سجادة", category: "objects" },
    { word: "مصباح", category: "objects" },
    { word: "نافذة", category: "objects" },
    { word: "باب", category: "objects" },
    { word: "طاولة", category: "objects" },
    { word: "كرسي", category: "objects" },
    { word: "حقيبة", category: "objects" },
    { word: "عطر", category: "objects" },
    { word: "خاتم", category: "objects" },
    { word: "سوار", category: "objects" },
    { word: "قلادة", category: "objects" },
    { word: "نظارة", category: "objects" },
    { word: "محفظة", category: "objects" },
    { word: "سيارة", category: "objects" },

    // ===== PROFESSIONS =====
    { word: "طبيب", category: "professions" },
    { word: "مهندس", category: "professions" },
    { word: "معلم", category: "professions" },
    { word: "شرطي", category: "professions" },
    { word: "تاجر", category: "professions" },
    { word: "محامي", category: "professions" },
    { word: "طيار", category: "professions" },
    { word: "صياد", category: "professions" },
    { word: "نجار", category: "professions" },
    { word: "حداد", category: "professions" },
    { word: "خياط", category: "professions" },
    { word: "صيدلاني", category: "professions" },
    { word: "ممرض", category: "professions" },
    { word: "مصور", category: "professions" },
    { word: "مذيع", category: "professions" },
    { word: "سائق", category: "professions" },
    { word: "فلاح", category: "professions" },
    { word: "رسام", category: "professions" },
    { word: "موسيقار", category: "professions" },
    { word: "ممثل", category: "professions" },

    // ===== CONCEPTS & EMOTIONS =====
    { word: "حنين", category: "concepts" },
    { word: "فخر", category: "concepts" },
    { word: "شوق", category: "concepts" },
    { word: "كرم", category: "concepts" },
    { word: "وفاء", category: "concepts" },
    { word: "أمل", category: "concepts" },
    { word: "سلام", category: "concepts" },
    { word: "عدل", category: "concepts" },
    { word: "شجاعة", category: "concepts" },
    { word: "حكمة", category: "concepts" },
    { word: "صبر", category: "concepts" },
    { word: "تواضع", category: "concepts" },
    { word: "إخلاص", category: "concepts" },
    { word: "رحمة", category: "concepts" },
    { word: "غيرة", category: "concepts" },
    { word: "حسد", category: "concepts" },
    { word: "خوف", category: "concepts" },
    { word: "أمان", category: "concepts" },
    { word: "حرية", category: "concepts" },
    { word: "وحدة", category: "concepts" },

    // ===== ENTERTAINMENT =====
    { word: "مسلسل", category: "entertainment" },
    { word: "فيلم", category: "entertainment" },
    { word: "أغنية", category: "entertainment" },
    { word: "مسرحية", category: "entertainment" },
    { word: "ألعاب", category: "entertainment" },
    { word: "سينما", category: "entertainment" },
    { word: "يوتيوب", category: "entertainment" },
    { word: "بودكاست", category: "entertainment" },
    { word: "تويتش", category: "entertainment" },
    { word: "سناب", category: "entertainment" },
    { word: "تيك توك", category: "entertainment" },
    { word: "قناة", category: "entertainment" },
    { word: "نتفليكس", category: "entertainment" },
    { word: "فيفا", category: "entertainment" },
    { word: "ببجي", category: "entertainment" },

    // ===== TRANSPORTATION =====
    { word: "طائرة", category: "transportation" },
    { word: "قطار", category: "transportation" },
    { word: "سفينة", category: "transportation" },
    { word: "حافلة", category: "transportation" },
    { word: "دراجة", category: "transportation" },
    { word: "مترو", category: "transportation" },
    { word: "تاكسي", category: "transportation" },
    { word: "مروحية", category: "transportation" },
    { word: "قارب", category: "transportation" },
    { word: "جمل", category: "transportation" },

    // ===== TECHNOLOGY =====
    { word: "ذكاء اصطناعي", category: "technology" },
    { word: "إنترنت", category: "technology" },
    { word: "برنامج", category: "technology" },
    { word: "كمبيوتر", category: "technology" },
    { word: "لاب توب", category: "technology" },
    { word: "تطبيق", category: "technology" },
    { word: "شبكة", category: "technology" },
    { word: "كاميرا", category: "technology" },
    { word: "شاشة", category: "technology" },
    { word: "مكبر صوت", category: "technology" },
];

// ─────────────────────────────────────────────
// PRODUCTION ALGORITHM
// ─────────────────────────────────────────────

/**
 * Category weights — higher = more likely to appear.
 * Tuned for fun, culturally rich games with variety.
 */
const CATEGORY_WEIGHTS: Record<string, number> = {
    food: 9,
    cities: 7,
    traditions: 8,
    dialect: 10, // dialect is super fun for Saudi players
    celebrities: 6,
    landmarks: 7,
    animals: 6,
    sports: 7,
    nature: 6,
    objects: 5,
    professions: 5,
    concepts: 7,
    entertainment: 8,
    transportation: 4,
    technology: 5,
};

/**
 * Max words allowed per category in a single 25-card game.
 * Prevents any one category from dominating the board.
 */
const MAX_PER_CATEGORY = 3;

/**
 * Words that would be too ambiguous or too easy to pass as Codenames hints
 * (e.g., one-letter words, extremely common fillers).
 */
const WORD_LENGTH_MIN = 2; // minimum word character length

function isValidWord(word: Word): boolean {
    const parts = word.word.trim().split(/\s+/);
    // Max 2 tokens (no 3-word phrases)
    if (parts.length > 2) return false;
    // Min character length
    if (word.word.replace(/\s/g, "").length < WORD_LENGTH_MIN) return false;
    return true;
}

/**
 * Weighted random selection from a list of (item, weight) pairs.
 */
function weightedSample<T>(
    pool: Array<{ item: T; weight: number }>,
    count: number,
): T[] {
    const results: T[] = [];
    const available = [...pool];

    for (let i = 0; i < count && available.length > 0; i++) {
        const totalWeight = available.reduce((sum, e) => sum + e.weight, 0);
        let rand = Math.random() * totalWeight;
        let idx = 0;
        for (; idx < available.length; idx++) {
            rand -= available[idx].weight;
            if (rand <= 0) break;
        }
        idx = Math.min(idx, available.length - 1);
        results.push(available[idx].item);
        available.splice(idx, 1);
    }

    return results;
}

/**
 * Production-grade word selector.
 *
 * Strategy:
 * 1. Filter invalid words.
 * 2. Group words by category.
 * 3. Use weighted random to pick categories proportionally.
 * 4. Within each chosen category, pick uniformly at random.
 * 5. Enforce MAX_PER_CATEGORY cap to guarantee variety.
 * 6. Shuffle the final 25 cards so category clusters don't appear together.
 */
export function getRandomWords(count: number = 25): Word[] {
    const valid = wordDatabase.filter(isValidWord);

    // Group by category
    const byCategory: Record<string, Word[]> = {};
    for (const word of valid) {
        if (!byCategory[word.category]) byCategory[word.category] = [];
        byCategory[word.category].push(word);
    }

    // Shuffle words within each category
    for (const cat in byCategory) {
        byCategory[cat] = byCategory[cat].sort(() => Math.random() - 0.5);
    }

    const categoryPointers: Record<string, number> = {};
    for (const cat in byCategory) categoryPointers[cat] = 0;

    const categoryUsage: Record<string, number> = {};
    const result: Word[] = [];

    // Build weighted category pool
    const buildPool = () =>
        Object.keys(byCategory)
            .filter((cat) => {
                const used = categoryUsage[cat] ?? 0;
                const pointer = categoryPointers[cat] ?? 0;
                return used < MAX_PER_CATEGORY && pointer < byCategory[cat].length;
            })
            .map((cat) => ({
                item: cat,
                weight: CATEGORY_WEIGHTS[cat] ?? 5,
            }));

    while (result.length < count) {
        const pool = buildPool();
        if (pool.length === 0) break;

        // How many slots remain?
        const needed = count - result.length;

        // Sample a batch of categories (with replacement allowed via loop)
        const selectedCategories = weightedSample(pool, Math.min(needed, pool.length));

        let addedThisRound = 0;
        for (const cat of selectedCategories) {
            if (result.length >= count) break;
            if ((categoryUsage[cat] ?? 0) >= MAX_PER_CATEGORY) continue;
            if ((categoryPointers[cat] ?? 0) >= byCategory[cat].length) continue;

            const ptr = categoryPointers[cat] ?? 0;
            result.push(byCategory[cat][ptr]);
            categoryPointers[cat] = ptr + 1;
            categoryUsage[cat] = (categoryUsage[cat] ?? 0) + 1;
            addedThisRound++;
        }

        // Safety: if nothing was added (all caps hit), break
        if (addedThisRound === 0) break;
    }

    // Final shuffle — mix categories across the board
    return result.sort(() => Math.random() - 0.5);
}
