// Hebrew letter to number mapping (Gematria)
const hebrewValues = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9,
    'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'o': 6, 'p': 7, 'q': 8, 'r': 9,
    's': 1, 't': 2, 'u': 3, 'v': 4, 'w': 5, 'x': 6, 'y': 7, 'z': 8
};

// Calculate complete profile
function calculateProfile(name, birthdate) {
    // Parse birthdate components
    const [year, month, day] = birthdate.split('-').map(Number);
    
    // Basic calculations
    const nameNumber = calculateNameNumber(name);
    const birthNumber = calculateBirthNumber(birthdate);
    
    // Get astrological signs
    const westernSign = AstrologyCalculator.westernZodiac.calculateSign(day, month);
    const chineseSign = AstrologyCalculator.chineseZodiac.calculateSign(year);
    const africanSign = AstrologyCalculator.africanAstrology.calculateSign(month);
    const japaneseSign = AstrologyCalculator.japaneseZodiac.calculateSign(year);
    
    // Get Brazilian horoscope
    const brazilianHoroscope = AstrologyCalculator.brazilianGuidance.getHoroscope(month, day);
    
    // Calculate life path information
    const lifePath = AstrologyCalculator.enhancedLifePath.getDetailedGuidance(birthdate);
    
    // Get decision guidance
    const guidance = AstrologyCalculator.decisionGuidance.getGuidance(lifePath.number, westernSign);
    
    // Get spiritual messages
    const spiritualMessage = AstrologyCalculator.spiritualMessages.getDailyMessage(lifePath.number);
    const protection = AstrologyCalculator.spiritualMessages.getProtection();

    return formatResults({
        nameNumber,
        birthNumber,
        westernSign,
        chineseSign,
        africanSign,
        japaneseSign,
        brazilianHoroscope,
        lifePath,
        guidance,
        spiritualMessage,
        protection
    });
}

// Calculate name number
function calculateNameNumber(name) {
    return name.toLowerCase()
        .replace(/[^a-z]/g, '')
        .split('')
        .reduce((sum, letter) => sum + (hebrewValues[letter] || 0), 0);
}

// Calculate birth number
function calculateBirthNumber(date) {
    return date.split('-')
        .join('')
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
}

// Format results for display
function formatResults(profile) {
    return `
        <div class="space-y-6">
            <!-- Daily Spiritual Message -->
            <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
                <h3 class="text-2xl font-semibold text-primary mb-4">${getTranslation('dailyMessage')}</h3>
                <p class="text-lg italic text-secondary">"${profile.spiritualMessage}"</p>
                <p class="mt-4 text-sm text-secondary">${profile.protection}</p>
            </div>

            <!-- Numerology Map -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-2xl font-semibold text-primary mb-4">${getTranslation('numerologyMap')}</h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('nameNumber')}: ${profile.nameNumber}</h4>
                        <p class="mt-1 text-secondary">${AstrologyCalculator.spiritualWisdom.getCabalisticInsight(profile.nameNumber)}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('birthNumber')}: ${profile.birthNumber}</h4>
                        <p class="mt-1 text-secondary">${AstrologyCalculator.spiritualWisdom.getCabalisticInsight(profile.birthNumber)}</p>
                    </div>
                </div>
            </div>

            <!-- Brazilian Horoscope -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-2xl font-semibold text-primary mb-4">${getTranslation('brazilianHoroscope')}</h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('sign')}: ${profile.brazilianHoroscope.sign}</h4>
                        <p class="mt-1 text-secondary">${getTranslation('orixaLabel')}: ${profile.brazilianHoroscope.orixá}</p>
                        <p class="mt-1 text-secondary">${getTranslation('element')}: ${profile.brazilianHoroscope.elemento}</p>
                        <p class="mt-1 text-secondary">${getTranslation('crystal')}: ${profile.brazilianHoroscope.cristal}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('orixaAdvice')}</h4>
                        <p class="mt-1 text-secondary">${profile.brazilianHoroscope.conselho}</p>
                    </div>
                </div>
            </div>

            <!-- World Astrology -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-2xl font-semibold text-primary mb-4">${getTranslation('worldAstrology')}</h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('westernSign')}</h4>
                        <p class="mt-1 text-secondary">${profile.westernSign}</p>
                        <p class="mt-1 text-secondary">${AstrologyCalculator.westernZodiac.getDescription(profile.westernSign)}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('chineseSign')}</h4>
                        <p class="mt-1 text-secondary">${profile.chineseSign}</p>
                        <p class="mt-1 text-secondary">${AstrologyCalculator.chineseZodiac.getDescription(profile.chineseSign)}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('africanSign')}</h4>
                        <p class="mt-1 text-secondary">${profile.africanSign}</p>
                        <p class="mt-1 text-secondary">${AstrologyCalculator.africanAstrology.getDescription(profile.africanSign)}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('japaneseSign')}</h4>
                        <p class="mt-1 text-secondary">${profile.japaneseSign}</p>
                        <p class="mt-1 text-secondary">${AstrologyCalculator.japaneseZodiac.getDescription(profile.japaneseSign)}</p>
                    </div>
                </div>
            </div>

            <!-- Decision Guide -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-2xl font-semibold text-primary mb-4">${getTranslation('decisionGuide')}</h3>
                <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('career')}</h4>
                        <p class="mt-1 text-secondary">${profile.guidance.career}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('relationships')}</h4>
                        <p class="mt-1 text-secondary">${profile.guidance.relationships}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('spiritual')}</h4>
                        <p class="mt-1 text-secondary">${profile.guidance.spiritual}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-primary">${getTranslation('dailyAffirmation')}</h4>
                        <p class="mt-1 text-secondary italic">"${profile.guidance.dailyAffirmation}"</p>
                    </div>
                </div>
            </div>

            <!-- Life Cycles -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-2xl font-semibold text-primary mb-4">${getTranslation('lifeCycles')}</h3>
                <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('lifeMission')}: ${profile.lifePath.number}</h4>
                        <p class="mt-1 text-secondary">${AstrologyCalculator.spiritualWisdom.getCabalisticInsight(profile.lifePath.number)}</p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-4">
                        <div>
                            <h4 class="font-semibold text-primary">${getTranslation('firstCycle')}</h4>
                            <p class="mt-1 text-secondary">${profile.lifePath.cycles.first}</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-primary">${getTranslation('secondCycle')}</h4>
                            <p class="mt-1 text-secondary">${profile.lifePath.cycles.second}</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-primary">${getTranslation('thirdCycle')}</h4>
                            <p class="mt-1 text-secondary">${profile.lifePath.cycles.third}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Challenges and Opportunities -->
            <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-2xl font-semibold text-primary mb-4">${getTranslation('challenges')}</h3>
                <div class="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('firstChallenge')}</h4>
                        <p class="mt-1 text-secondary">${profile.lifePath.challenges.first}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('secondChallenge')}</h4>
                        <p class="mt-1 text-secondary">${profile.lifePath.challenges.second}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('thirdChallenge')}</h4>
                        <p class="mt-1 text-secondary">${profile.lifePath.challenges.third}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-primary">${getTranslation('fourthChallenge')}</h4>
                        <p class="mt-1 text-secondary">${profile.lifePath.challenges.fourth}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Get current language
function getCurrentLanguage() {
    return document.getElementById('languageSelect').value;
}

// Get translation
function getTranslation(key) {
    const lang = getCurrentLanguage();
    return translations[lang][key];
}

// Update all page content based on selected language
function updatePageContent() {
    // Update title and form elements
    document.title = `CosmoClick - ${getTranslation('title')}`;
    document.querySelector('.max-w-2xl h2').textContent = getTranslation('title');
    document.querySelector('label[for="name"]').textContent = getTranslation('nameLabel');
    document.querySelector('#name').placeholder = getTranslation('namePlaceholder');
    document.querySelector('label[for="birthdate"]').textContent = getTranslation('birthLabel');
    document.querySelector('button[type="submit"]').innerHTML = `<i class="fas fa-magic mr-2"></i>${getTranslation('submitButton')}`;
    
    // Update spiritual journey title
    document.querySelector('#results h2').textContent = getTranslation('spiritualJourney');
    
    // Update information sections
    const sections = {
        'Sabedoria Ancestral': 'ancestralWisdom',
        'Guia para Sua Jornada': 'journeyGuide',
        'Numerologia Cabalística e Sabedoria Divina': 'cabalisticNumerology',
        'Horóscopo Brasileiro e Orientação dos Orixás': 'brazilianGuidance',
        'Astrologia Oriental e Africana': 'orientalAstrology',
        'Sabedoria do Alcorão e da Torá': 'sacredTexts',
        'Mensagens do Senhor dos Espíritos': 'spiritualMessages',
        'Propósito de Vida': 'lifePurpose',
        'Carreira e Abundância': 'careerAbundance',
        'Amor e Relacionamentos': 'loveRelationships',
        'Desenvolvimento Espiritual': 'spiritualDevelopment'
    };
    
    // Update section titles and content
    document.querySelectorAll('h2, h3').forEach(heading => {
        const key = sections[heading.textContent];
        if (key) {
            heading.textContent = getTranslation(key);
        }
    });
    
    // Update description texts
    document.querySelector('.text-lg').textContent = getTranslation('ancestralDescription');
    
    // Update footer text
    document.querySelector('footer p.text-sm').textContent = getTranslation('footerBlessing');
    
    // Update results if they're visible
    const results = document.getElementById('results');
    const resultContent = document.getElementById('resultContent');
    if (!results.classList.contains('hidden') && resultContent.innerHTML) {
        const name = document.getElementById('name').value;
        const birthdate = document.getElementById('birthdate').value;
        resultContent.innerHTML = calculateProfile(name, birthdate);
    }
}

// Handle form submission and language switching
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('numerologyForm');
    const results = document.getElementById('results');
    const resultContent = document.getElementById('resultContent');
    const languageSelect = document.getElementById('languageSelect');

    // Initial page content update
    updatePageContent();

    // Update page content when language changes
    languageSelect.addEventListener('change', updatePageContent);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const birthdate = document.getElementById('birthdate').value;
        
        if (!name || !birthdate) {
            alert(getTranslation('errorMessage'));
            return;
        }

        resultContent.innerHTML = calculateProfile(name, birthdate);
        results.classList.remove('hidden');
        
        // Smooth scroll to results
        results.scrollIntoView({ behavior: 'smooth' });
    });
});
