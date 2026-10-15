import { CardData } from '../types/game';

export const DEFAULT_CARDS: CardData[] = [
  // --- TEMEL KUVVET & İŞARET KURALLARI ---
  {
    id: 'tk-1',
    expression: '(-2)⁴',
    expressionSubtext: 'Parantezli Negatif Taban & Çift Kuvvet',
    value: '16',
    topic: 'temel_kuvvet',
    difficulty: 'kolay',
    hint: '💡 İpucu: Negatif bir sayının parantez DIŞINDAKİ çift kuvveti daima POZİTİFTİR! (-2) · (-2) · (-2) · (-2) işlemini düşün.',
    solutionSteps: [
      '1. Adım: Parantez içindeki taban (-2) ve üs 4\'tür.',
      '2. Adım: (-2) sayısı 4 kez kendisiyle çarpılır: (-2) · (-2) · (-2) · (-2)',
      '3. Adım: (-) ile (-) çarpımı (+) olduğundan (+4) · (+4) = +16',
      'Sonuç: 16'
    ],
    wrongOptions: ['-16', '-8', '8'],
    colorTheme: 'indigo'
  },
  {
    id: 'tk-2',
    expression: '-2⁴',
    expressionSubtext: 'Parantezsiz Negatif Taban & Çift Kuvvet',
    value: '-16',
    topic: 'temel_kuvvet',
    difficulty: 'orta',
    hint: '💡 İpucu: Dikkat! Parantez olmadığı için 4. kuvvet sadece 2 sayısına aittir, öndeki eksi (-) işarete etki etmez!',
    solutionSteps: [
      '1. Adım: Parantez yoktur. Bu yüzden üs (4) sadece 2 tabanını bağlar.',
      '2. Adım: Öndeki eksi aynen kalır: -(2 · 2 · 2 · 2)',
      '3. Adım: -(16) = -16',
      'Sonuç: -16 (LGS sınavında en çok karıştırılan kural!)'
    ],
    wrongOptions: ['16', '-8', '8'],
    colorTheme: 'rose'
  },
  {
    id: 'tk-3',
    expression: '(-3)³',
    expressionSubtext: 'Negatif Taban & Tek Kuvvet',
    value: '-27',
    topic: 'temel_kuvvet',
    difficulty: 'kolay',
    hint: '💡 İpucu: Negatif sayıların TEK kuvvetleri daima NEGATİFTİR! Üç adet eksi çarpılınca eksi kalır.',
    solutionSteps: [
      '1. Adım: (-3) tabanını 3 kez yan yana çarpalım.',
      '2. Adım: (-3) · (-3) · (-3)',
      '3. Adım: (+9) · (-3) = -27',
      'Sonuç: -27'
    ],
    wrongOptions: ['27', '-9', '9'],
    colorTheme: 'purple'
  },
  {
    id: 'tk-4',
    expression: '7⁰ + (-5)⁰',
    expressionSubtext: 'Sıfırıncı Kuvvet Kuralı',
    value: '2',
    topic: 'temel_kuvvet',
    difficulty: 'kolay',
    hint: '💡 İpucu: Sıfır hariç tüm sayıların 0. kuvveti 1\'e eşittir: a⁰ = 1.',
    solutionSteps: [
      '1. Adım: 7⁰ = 1\'dir.',
      '2. Adım: (-5)⁰ = 1\'dir (çünkü parantez içindedir).',
      '3. Adım: 1 + 1 = 2',
      'Sonuç: 2'
    ],
    wrongOptions: ['0', '1', '12'],
    colorTheme: 'cyan'
  },
  {
    id: 'tk-5',
    expression: '-5⁰',
    expressionSubtext: 'Parantezsiz Sıfırıncı Kuvvet',
    value: '-1',
    topic: 'temel_kuvvet',
    difficulty: 'orta',
    hint: '💡 İpucu: Parantez yoksa 0 kuvveti sadece 5\'e aittir: -(5⁰) şeklinde düşün!',
    solutionSteps: [
      '1. Adım: 5⁰ = 1\'dir.',
      '2. Adım: Öndeki eksi işareti aynen geçer: -(1) = -1.',
      'Sonuç: -1'
    ],
    wrongOptions: ['1', '0', '-5'],
    colorTheme: 'rose'
  },

  // --- NEGATİF ÜS & TERS DÖNDÜRME ---
  {
    id: 'nu-1',
    expression: '2⁻³',
    expressionSubtext: 'Pozitif Taban & Negatif Üs',
    value: '1/8',
    topic: 'negatif_us',
    difficulty: 'kolay',
    hint: '💡 İpucu: Üssün eksi (-) olması sayıyı eksi yapmaz! Sayıyı takla attırır (ters çevirir): a⁻ⁿ = 1 / aⁿ.',
    solutionSteps: [
      '1. Adım: Negatif üs kuralı: a⁻ⁿ = 1 / aⁿ',
      '2. Adım: 2⁻³ = 1 / 2³',
      '3. Adım: 2³ = 8 olduğundan sonuç 1/8 olur.',
      'Sonuç: 1/8'
    ],
    wrongOptions: ['-8', '-6', '1/6'],
    colorTheme: 'emerald'
  },
  {
    id: 'nu-2',
    expression: '3⁻²',
    expressionSubtext: 'Negatif Kuvvet Değeri',
    value: '1/9',
    topic: 'negatif_us',
    difficulty: 'kolay',
    hint: '💡 İpucu: 3² = 9 olduğuna göre, üssün önündeki eksi paya 1 yazdırıp paydaya indirir.',
    solutionSteps: [
      '1. Adım: 3⁻² = 1 / 3²',
      '2. Adım: 3² = 9',
      '3. Adım: 1 / 9',
      'Sonuç: 1/9'
    ],
    wrongOptions: ['-9', '-6', '1/6'],
    colorTheme: 'amber'
  },
  {
    id: 'nu-3',
    expression: '(-3)⁻²',
    expressionSubtext: 'Negatif Tabanın Negatif Çift Kuvveti',
    value: '1/9',
    topic: 'negatif_us',
    difficulty: 'orta',
    hint: '💡 İpucu: Önce negatif üsle ters çevir: 1 / (-3)². Sonra (-3)² pozitif midir negatif midir incele.',
    solutionSteps: [
      '1. Adım: a⁻ⁿ = 1 / aⁿ kuralından: 1 / [(-3)²]',
      '2. Adım: (-3)² = (-3) · (-3) = +9',
      '3. Adım: 1 / 9',
      'Sonuç: 1/9 (İşaret pozitif kalır!)'
    ],
    wrongOptions: ['-1/9', '-9', '9'],
    colorTheme: 'purple'
  },
  {
    id: 'nu-4',
    expression: '(1/4)⁻²',
    expressionSubtext: 'Basit Kesrin Negatif Kuvveti',
    value: '16',
    topic: 'negatif_us',
    difficulty: 'orta',
    hint: '💡 İpucu: Kesirli bir ifadenin üssü negatifse, kesir ters çevrilir ve üs pozitif olur: (a/b)⁻ⁿ = (b/a)ⁿ.',
    solutionSteps: [
      '1. Adım: (1/4)⁻² ifadesinde kesir ters döner: (4/1)²',
      '2. Adım: 4² hesaplanır: 4 · 4 = 16',
      'Sonuç: 16'
    ],
    wrongOptions: ['1/16', '-16', '8'],
    colorTheme: 'cyan'
  },
  {
    id: 'nu-5',
    expression: '(1/2)⁻³ + 5⁻¹',
    expressionSubtext: 'Negatif Kuvvetli Toplama İşlemi',
    value: '41/5',
    topic: 'negatif_us',
    difficulty: 'zor',
    hint: '💡 İpucu: (1/2)⁻³ = 2³ = 8 ve 5⁻¹ = 1/5. Şimdi 8 + 1/5 işlemini yap (8 tam 1/5).',
    solutionSteps: [
      '1. Adım: (1/2)⁻³ = (2/1)³ = 8',
      '2. Adım: 5⁻¹ = 1/5',
      '3. Adım: 8 + 1/5 = (8 · 5 + 1) / 5 = 41/5 (veya 8,2)',
      'Sonuç: 41/5'
    ],
    wrongOptions: ['8/5', '13/5', '39/5'],
    colorTheme: 'emerald'
  },

  // --- ÇARPMA VE BÖLME İŞLEMLERİ ---
  {
    id: 'cb-1',
    expression: '2³ · 2⁴',
    expressionSubtext: 'Tabanları Eşit Üslü Çarpma',
    value: '128',
    topic: 'carpma_bolme',
    difficulty: 'kolay',
    hint: '💡 İpucu: Tabanları eşit olan üslü ifadeler çarpılırken taban aynen yazılır, üsler toplanır: aᵐ · aⁿ = aᵐ⁺ⁿ.',
    solutionSteps: [
      '1. Adım: Tabanlar eşit ve 2\'dir.',
      '2. Adım: Üsler toplanır: 3 + 4 = 7 -> 2⁷',
      '3. Adım: 2⁷ = 128',
      'Sonuç: 128 (veya 2⁷)'
    ],
    wrongOptions: ['64', '256', '2¹²'],
    colorTheme: 'indigo'
  },
  {
    id: 'cb-2',
    expression: '3⁵ / 3²',
    expressionSubtext: 'Tabanları Eşit Üslü Bölme',
    value: '27',
    topic: 'carpma_bolme',
    difficulty: 'kolay',
    hint: '💡 İpucu: Tabanları eşit olan üslü ifadeler bölünürken payın üssünden paydanın üssü çıkarılır: aᵐ / aⁿ = aᵐ⁻ⁿ.',
    solutionSteps: [
      '1. Adım: Tabanlar 3\'tür.',
      '2. Adım: Üsler çıkarılır: 5 - 2 = 3 -> 3³',
      '3. Adım: 3³ = 3 · 3 · 3 = 27',
      'Sonuç: 27 (veya 3³)'
    ],
    wrongOptions: ['9', '81', '3⁷'],
    colorTheme: 'amber'
  },
  {
    id: 'cb-3',
    expression: '2⁴ · 5⁴',
    expressionSubtext: 'Üsleri Eşit Üslü Çarpma',
    value: '10000',
    topic: 'carpma_bolme',
    difficulty: 'orta',
    hint: '💡 İpucu: Üsleri eşit olan ifadeler çarpılırken tabanlar çarpılır, ortak üs aynen yazılır: aⁿ · bⁿ = (a · b)ⁿ.',
    solutionSteps: [
      '1. Adım: Üsler 4\'tür (eşit).',
      '2. Adım: Tabanlar çarpılır: (2 · 5)⁴ = 10⁴',
      '3. Adım: 10⁴ = 1\'in yanına 4 sıfır = 10000',
      'Sonuç: 10000 (10⁴)'
    ],
    wrongOptions: ['1000', '100000', '20⁴'],
    colorTheme: 'cyan'
  },
  {
    id: 'cb-4',
    expression: '12³ / 4³',
    expressionSubtext: 'Üsleri Eşit Üslü Bölme',
    value: '27',
    topic: 'carpma_bolme',
    difficulty: 'orta',
    hint: '💡 İpucu: Üsler aynı ise tabanlar birbirine bölünür ve ortak üs alınır: aⁿ / bⁿ = (a / b)ⁿ.',
    solutionSteps: [
      '1. Adım: Ortak üs 3 parantezine alınır: (12 / 4)³',
      '2. Adım: 12 / 4 = 3',
      '3. Adım: 3³ = 3 · 3 · 3 = 27',
      'Sonuç: 27'
    ],
    wrongOptions: ['9', '3', '81'],
    colorTheme: 'purple'
  },
  {
    id: 'cb-5',
    expression: '5⁷ · 5⁻⁵',
    expressionSubtext: 'Negatif Üslü Çarpma',
    value: '25',
    topic: 'carpma_bolme',
    difficulty: 'kolay',
    hint: '💡 İpucu: Tabanlar eşit: üsleri işaretlerine dikkat ederek topla: 7 + (-5) = ?',
    solutionSteps: [
      '1. Adım: Taban 5\'tir. Üsler toplanır: 7 + (-5) = 2',
      '2. Adım: 5² = 25',
      'Sonuç: 25'
    ],
    wrongOptions: ['5', '125', '5⁻³⁵'],
    colorTheme: 'emerald'
  },

  // --- ÜSSÜN ÜSSÜ & KARIŞIK İŞLEMLER ---
  {
    id: 'uu-1',
    expression: '(2³)²',
    expressionSubtext: 'Üssün Üssü Kuralı',
    value: '64',
    topic: 'ussun_ussu',
    difficulty: 'kolay',
    hint: '💡 İpucu: Üssün üssü alınırken üsler birbiriyle çarpılır: (aᵐ)ⁿ = aᵐ·ⁿ.',
    solutionSteps: [
      '1. Adım: Kural: (aᵐ)ⁿ = aᵐ·ⁿ',
      '2. Adım: Üsler çarpılır: 3 · 2 = 6 -> 2⁶',
      '3. Adım: 2⁶ = 64',
      'Sonuç: 64'
    ],
    wrongOptions: ['32', '128', '2⁵ (32)'],
    colorTheme: 'indigo'
  },
  {
    id: 'uu-2',
    expression: '(3²)³ / 3⁴',
    expressionSubtext: 'Üssün Üssü ve Bölme Birlikte',
    value: '9',
    topic: 'ussun_ussu',
    difficulty: 'orta',
    hint: '💡 İpucu: Önce paydaki (3²)³ ifadesini üsleri çarparak 3⁶ yap. Sonra 3⁶ / 3⁴ bölmesini yap.',
    solutionSteps: [
      '1. Adım: Paydaki üssün üssü: (3²)³ = 3²·³ = 3⁶',
      '2. Adım: Bölme kuralı: 3⁶ / 3⁴ = 3⁶⁻⁴ = 3²',
      '3. Adım: 3² = 9',
      'Sonuç: 9'
    ],
    wrongOptions: ['3', '27', '81'],
    colorTheme: 'amber'
  },
  {
    id: 'uu-3',
    expression: '4³ · 2⁻⁴',
    expressionSubtext: 'Tabanları Eşitleyerek Çarpma',
    value: '4',
    topic: 'ussun_ussu',
    difficulty: 'zor',
    hint: '💡 İpucu: 4 sayısını 2\'nin kuvveti olarak yaz: 4 = 2². Buradan 4³ = (2²)³ = 2⁶ olur!',
    solutionSteps: [
      '1. Adım: 4 tabanı 2 tabanına dönüştürülür: 4 = 2²',
      '2. Adım: 4³ = (2²)³ = 2⁶',
      '3. Adım: 2⁶ · 2⁻⁴ = 2⁶⁺⁽⁻⁴⁾ = 2²',
      '4. Adım: 2² = 4',
      'Sonuç: 4'
    ],
    wrongOptions: ['2', '8', '16'],
    colorTheme: 'rose'
  },
  {
    id: 'uu-4',
    expression: '8² / 4²',
    expressionSubtext: 'Kuvvetleri Eşit Sayıların Bölünmesi',
    value: '4',
    topic: 'ussun_ussu',
    difficulty: 'orta',
    hint: '💡 İpucu: İki yöntem var: Ya (8/4)² = 2² yap ya da 2 tabanına çevir.',
    solutionSteps: [
      '1. Yöntem: Üsler aynı olduğundan (8 / 4)² = 2² = 4',
      '2. Yöntem: 8² = (2³)² = 2⁶ ve 4² = (2²)² = 2⁴. 2⁶ / 2⁴ = 2² = 4',
      'Sonuç: 4'
    ],
    wrongOptions: ['2', '16', '1'],
    colorTheme: 'cyan'
  },
  {
    id: 'uu-5',
    expression: '(5⁻²)⁻¹',
    expressionSubtext: 'Negatif Üslerin Çarpımı',
    value: '25',
    topic: 'ussun_ussu',
    difficulty: 'orta',
    hint: '💡 İpucu: Üssün üssünde üsleri çarp: (-2) · (-1) = +2.',
    solutionSteps: [
      '1. Adım: Üsler çarpılır: (-2) · (-1) = +2',
      '2. Adım: 5² = 25',
      'Sonuç: 25'
    ],
    wrongOptions: ['1/25', '-25', '1/5'],
    colorTheme: 'purple'
  },
  {
    id: 'uu-6',
    expression: '(2⁴ · 2³) / 2⁵',
    expressionSubtext: 'Çok Adımlı LGS Tarzı Sadeleştirme',
    value: '4',
    topic: 'ussun_ussu',
    difficulty: 'orta',
    hint: '💡 İpucu: Payı hesapla: 2⁴ · 2³ = 2⁷. Sonra 2⁷ / 2⁵ bölmesini uygula.',
    solutionSteps: [
      '1. Adım: Pay: 2⁴ · 2³ = 2⁴⁺³ = 2⁷',
      '2. Adım: Kesir: 2⁷ / 2⁵ = 2⁷⁻⁵ = 2²',
      '3. Adım: 2² = 4',
      'Sonuç: 4'
    ],
    wrongOptions: ['2', '8', '16'],
    colorTheme: 'emerald'
  }
];

export const TOPIC_LABELS: Record<string, string> = {
  all: 'Tüm Konular (Karışık)',
  temel_kuvvet: '1. Temel Kuvvet & İşaretler',
  negatif_us: '2. Negatif Üs & Ters Çevirme',
  carpma_bolme: '3. Çarpma & Bölme Kuralları',
  ussun_ussu: '4. Üssün Üssü & Sadeleştirme',
  ozel_kartlar: '5. Özel Tasarlanan Kartlar'
};
