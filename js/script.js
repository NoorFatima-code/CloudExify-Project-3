/* Noor Smile Dental Studio — Vanilla JavaScript interactions.
   Bootstrap 5 handles the modal, collapse, accordion and carousel primitives. */

const clinic = {
    whatsapp: '923005550186',
    phone: '+92 300 555 0186',
    services: [
        { id: 'checkup', title: 'Check-up & cleaning', category: 'preventive', icon: 'bi-shield-check', tag: 'Routine care', description: 'A gentle exam, scale and polish with practical advice for everyday oral health.', duration: '45–60 min', price: 'From PKR 2,500', idealFor: 'Routine prevention', included: 'Oral exam, scale & polish, care notes' },
        { id: 'kids', title: 'Kids’ dentistry', category: 'preventive', icon: 'bi-emoji-smile', tag: 'Family care', description: 'Friendly first visits and preventive care that helps little smiles grow with confidence.', duration: '30–45 min', price: 'From PKR 2,500', idealFor: 'Children and first visits', included: 'Gentle introduction, screening, family guidance' },
        { id: 'whitening', title: 'Smile brightening', category: 'cosmetic', icon: 'bi-sun', tag: 'Smile design', description: 'Professional whitening guidance for a naturally brighter, camera-ready smile.', duration: '60–90 min', price: 'From PKR 12,000', idealFor: 'Event-ready smiles', included: 'Shade check, sensitivity guidance, tailored plan' },
        { id: 'aligners', title: 'Clear aligners', category: 'cosmetic', icon: 'bi-grid-3x3-gap', tag: 'Smile design', description: 'A discreet way to plan a more balanced smile with clear, easy-to-follow steps.', duration: 'Consultation: 45 min', price: 'Assessment from PKR 5,000', idealFor: 'Mild to moderate alignment goals', included: 'Smile assessment, records guidance, treatment roadmap' },
        { id: 'fillings', title: 'Tooth-coloured fillings', category: 'restorative', icon: 'bi-gem', tag: 'Restorative', description: 'Comfort-first repairs designed to protect your tooth and blend with your smile.', duration: '45–75 min', price: 'From PKR 4,000', idealFor: 'Small to medium repairs', included: 'Assessment, shade-matched repair, aftercare advice' },
        { id: 'implants', title: 'Implant consultations', category: 'restorative', icon: 'bi-person-check', tag: 'Restorative', description: 'A detailed consultation for stable, natural-looking tooth replacement options.', duration: '60 min', price: 'Assessment from PKR 5,000', idealFor: 'Tooth replacement planning', included: 'Clinical review, options discussion, staged estimate' }
    ],
    plans: [
        { name: 'Fresh Start', description: 'For your next check-up and clean.', price: '4,500', features: ['Comprehensive examination', 'Scale and polish', 'Digital X-ray guidance', 'Personal care notes'], featured: false },
        { name: 'Smile Plus', description: 'A considered plan for ongoing care.', price: '8,500', features: ['Everything in Fresh Start', 'Whitening consultation', 'Priority appointment window', 'Follow-up care call'], featured: true },
        { name: 'Family Care', description: 'Thoughtful care for growing families.', price: '12,000', features: ['Up to 3 family check-ups', 'Preventive care guidance', 'Kids’ first-visit support', 'Flexible scheduling'], featured: false }
    ],
    faqs: [
        ['How much does a first visit cost?', 'A first visit starts from PKR 2,500 for an assessment. Treatment costs vary by clinical need and are always discussed before work begins.'],
        ['Do you accept Pakistani dental insurance?', 'We can provide itemised receipts for your insurer. Please send your policy details on WhatsApp before your visit so our team can guide you.'],
        ['Can I speak in Urdu or Punjabi?', 'Yes. Our front desk team can support you in English, Urdu or Punjabi, and we are happy to slow down and explain each step.'],
        ['Where can I park in Gulberg III?', 'We share current parking and arrival guidance when confirming your appointment. Call the studio if you need help finding us.'],
        ['Do you see children?', 'Yes. We welcome children for gentle first visits, preventive guidance and age-appropriate treatment planning.'],
        ['How should I request an emergency visit?', 'Call +92 300 555 0186. If you have swelling, uncontrolled bleeding or a serious injury, seek urgent medical attention as well.']
    ]
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function renderServices(filter = 'all') {
    const container = $('#servicesContainer');
    if (!container) return;
    const visible = clinic.services.filter((service) => filter === 'all' || service.category === filter);
    container.innerHTML = visible.map((service, index) => `
        <div class="col-md-6 col-xl-4 reveal" style="--reveal-delay:${index * 60}ms">
            <article class="service-card" data-service-card="${service.id}">
                <span class="service-tag">${service.tag}</span>
                <span class="service-icon"><i class="bi ${service.icon}"></i></span>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <div class="service-meta" aria-label="${service.title} quick facts">
                    <span><i class="bi bi-clock"></i>${service.duration}</span>
                    <span><i class="bi bi-cash-coin"></i>${service.price}</span>
                </div>
                <div class="service-actions">
                    <button class="service-detail-toggle" type="button" data-service-details="${service.id}" data-bound-directly="true" aria-expanded="false" aria-controls="service-detail-${service.id}">View care details <i class="bi bi-plus-lg"></i></button>
                    <a class="service-link" href="#contact" data-service-link="${service.id}">Ask about this <i class="bi bi-arrow-up-right"></i></a>
                </div>
                <div class="service-detail" id="service-detail-${service.id}" hidden>
                    <div><small>Ideal for</small><strong>${service.idealFor}</strong></div>
                    <div><small>What’s included</small><strong>${service.included}</strong></div>
                </div>
            </article>
        </div>
    `).join('');
    observeReveals(container);
    $$('.service-detail-toggle', container).forEach((toggle) => toggle.addEventListener('click', () => toggleServiceDetail(toggle)));
}

function renderPlans() {
    const container = $('#pricingContainer');
    if (!container) return;
    container.innerHTML = clinic.plans.map((plan, index) => `
        <div class="col-md-6 col-xl-4 reveal" style="--reveal-delay:${index * 70}ms">
            <article class="pricing-card ${plan.featured ? 'featured' : ''}">
                ${plan.featured ? '<span class="plan-badge">Most requested</span>' : ''}
                <h3>${plan.name}</h3>
                <p class="plan-description">${plan.description}</p>
                <div class="price">PKR ${plan.price}<small> / starting</small></div>
                <ul class="features-list">${plan.features.map((feature) => `<li>${feature}</li>`).join('')}</ul>
                <button class="btn ${plan.featured ? 'btn-primary' : 'btn-outline-primary'} w-100" type="button" data-bs-toggle="modal" data-bs-target="#appointmentModal" data-plan="${plan.name}">Talk about this plan <i class="bi bi-arrow-up-right ms-2"></i></button>
            </article>
        </div>
    `).join('');
    observeReveals(container);
}

function renderFaqs() {
    const container = $('#faqAccordion');
    if (!container) return;
    container.innerHTML = clinic.faqs.map(([question, answer], index) => `
        <div class="accordion-item reveal" style="--reveal-delay:${index * 50}ms">
            <h3 class="accordion-header" id="faqHeading${index}">
                <button class="accordion-button ${index ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#faqAnswer${index}" aria-expanded="${index === 0}" aria-controls="faqAnswer${index}">${question}</button>
            </h3>
            <div id="faqAnswer${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="faqHeading${index}" data-bs-parent="#faqAccordion">
                <div class="accordion-body">${answer}</div>
            </div>
        </div>
    `).join('');
    observeReveals(container);
}

function populateServiceSelects() {
    const options = clinic.services.map((service) => `<option value="${service.id}">${service.title}</option>`).join('');
    $$('#service, #modalService').forEach((select) => {
        select.insertAdjacentHTML('beforeend', options);
    });
}

function setupServiceFiltering() {
    $$('.filter-button').forEach((button) => {
        button.addEventListener('click', () => {
            $$('.filter-button').forEach((item) => item.classList.remove('active'));
            button.classList.add('active');
            renderServices(button.dataset.filter);
        });
    });
    document.addEventListener('click', (event) => {
        const link = event.target.closest('[data-service-link]');
        if (!link) return;
        const select = $('#service');
        if (select) select.value = link.dataset.serviceLink;
    });
}

function toggleServiceDetail(toggle) {
    const detail = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!detail) return;
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.classList.toggle('is-open', !open);
    detail.hidden = open;
}

function setupServiceDetails() {
    document.addEventListener('click', (event) => {
        const toggle = event.target.closest('[data-service-details]');
        if (!toggle || event.defaultPrevented) return;
        if (!toggle.dataset.boundDirectly) toggleServiceDetail(toggle);
    });
}

function setupStatsCounter() {
    const stats = $$('.stat-number');
    if (!stats.length || !('IntersectionObserver' in window)) {
        stats.forEach((element) => { element.textContent = `${element.dataset.target}${element.dataset.suffix || ''}`; });
        return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting || entry.target.dataset.animated) return;
            entry.target.dataset.animated = 'true';
            const element = entry.target;
            const target = Number(element.dataset.target);
            const suffix = element.dataset.suffix || '';
            const duration = 1100;
            const start = performance.now();
            const tick = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                element.textContent = `${Math.round(target * eased)}${suffix}`;
                if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            currentObserver.unobserve(element);
        });
    }, { threshold: .55 });
    stats.forEach((stat) => observer.observe(stat));
}

function setupThemeToggle() {
    const toggle = $('#themeToggle');
    if (!toggle) return;
    let stored = null;
    try { stored = localStorage.getItem('noor-smile-theme'); } catch (error) { stored = null; }
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const setTheme = (dark) => {
        document.body.classList.toggle('dark-mode', dark);
        document.documentElement.classList.toggle('theme-dark', dark);
        document.documentElement.setAttribute('data-bs-theme', dark ? 'dark' : 'light');
        document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
        toggle.innerHTML = dark ? '<i class="bi bi-sun-fill"></i><span class="visually-hidden">Switch to light mode</span>' : '<i class="bi bi-moon-stars-fill"></i><span class="visually-hidden">Switch to dark mode</span>';
        toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
        toggle.setAttribute('aria-pressed', String(dark));
        toggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    };
    setTheme(stored ? stored === 'dark' : Boolean(prefersDark));
    toggle.addEventListener('click', () => {
        const dark = !document.body.classList.contains('dark-mode');
        setTheme(dark);
        try { localStorage.setItem('noor-smile-theme', dark ? 'dark' : 'light'); } catch (error) { /* Theme still works for this session. */ }
    });
}

function setupNavigation() {
    const nav = $('#mainNav');
    const links = $$('.nav-link');
    const sections = links.map((link) => $(link.getAttribute('href'))).filter(Boolean);
    const update = () => {
        nav?.classList.toggle('scrolled', window.scrollY > 16);
        let current = '';
        sections.forEach((section) => {
            if (section.getBoundingClientRect().top <= 125) current = section.id;
        });
        links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
    };
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => { update(); ticking = false; });
    }, { passive: true });
    update();
    links.forEach((link) => link.addEventListener('click', () => {
        const collapse = $('#navbarNav');
        if (collapse?.classList.contains('show') && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(collapse).hide();
    }));
}

function setupComparisons() {
    /* The comparison enhancement lives in this primary runtime file. The care-plan image
       is anchored on the right side of the handle so the labels match what visitors see. */
    $$('[data-comparison]').forEach((frame) => {
        const baseImage = frame.querySelector(':scope > img');
        const after = $('.comparison-after', frame);
        const handle = $('.comparison-handle', frame);
        const afterImage = $('.comparison-after img', frame);
        if (!baseImage || !after || !handle || !afterImage) return;

        let dragging = false;
        const syncImage = () => {
            const frameWidth = Math.max(frame.getBoundingClientRect().width, 1);
            [baseImage, afterImage].forEach((image) => {
                image.loading = 'eager';
                image.decoding = 'async';
                image.style.width = `${frameWidth}px`;
                image.style.maxWidth = 'none';
                image.style.height = '100%';
                image.style.objectFit = 'cover';
                image.style.objectPosition = 'center';
            });
        };
        const setPosition = (value) => {
            const percent = Math.max(0, Math.min(100, value));
            const remaining = 100 - percent;
            after.style.left = `${percent}%`;
            after.style.right = '0';
            after.style.width = `${remaining}%`;
            after.style.overflow = 'hidden';
            afterImage.style.transform = `translateX(-${percent}%)`;
            handle.style.left = `${percent}%`;
            handle.setAttribute('aria-valuenow', String(Math.round(percent)));
        };
        const positionFromEvent = (event) => {
            const rect = frame.getBoundingClientRect();
            if (!rect.width) return 50;
            return ((event.clientX - rect.left) / rect.width) * 100;
        };
        const move = (event) => { if (dragging) setPosition(positionFromEvent(event)); };
        const stop = () => { dragging = false; };

        frame.addEventListener('pointerdown', (event) => {
            dragging = true;
            frame.setPointerCapture?.(event.pointerId);
            setPosition(positionFromEvent(event));
        });
        frame.addEventListener('pointermove', move);
        frame.addEventListener('pointerup', stop);
        frame.addEventListener('pointercancel', stop);
        frame.addEventListener('lostpointercapture', stop);
        handle.addEventListener('keydown', (event) => {
            const current = Number(handle.getAttribute('aria-valuenow')) || 50;
            if (event.key === 'ArrowLeft') { event.preventDefault(); setPosition(current - 5); }
            if (event.key === 'ArrowRight') { event.preventDefault(); setPosition(current + 5); }
            if (event.key === 'Home') { event.preventDefault(); setPosition(0); }
            if (event.key === 'End') { event.preventDefault(); setPosition(100); }
        });

        if ('ResizeObserver' in window) new ResizeObserver(syncImage).observe(frame);
        else window.addEventListener('resize', syncImage, { passive: true });
        syncImage();
        setPosition(50);
    });
}

function isPakistaniMobile(value) {
    const digits = value.replace(/[\s-]/g, '');
    return /^(03\d{9}|\+923\d{9}|00923\d{9})$/.test(digits);
}

function setMinimumDates() {
    const today = new Date();
    const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    ['#apptDate'].forEach((selector) => { const input = $(selector); if (input) input.min = iso; });
}

function showAlert(element, message, type = 'success') {
    if (!element) return;
    element.textContent = message;
    element.className = `alert alert-${type}`;
}

function validateContactForm() {
    const form = $('#appointmentForm');
    if (!form) return;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = $('#patientName');
        const phone = $('#phone');
        const email = $('#email');
        const service = $('#service');
        const date = $('#apptDate');
        const consent = $('#consent');
        const alert = $('#formAlert');
        let valid = true;
        [name, phone, email, service, date, consent].forEach((field) => field?.classList.remove('is-invalid'));
        if (!name.value.trim()) { name.classList.add('is-invalid'); valid = false; }
        if (!isPakistaniMobile(phone.value)) { phone.classList.add('is-invalid'); valid = false; }
        if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.classList.add('is-invalid'); valid = false; }
        if (!service.value) { service.classList.add('is-invalid'); valid = false; }
        if (!date.value) { date.classList.add('is-invalid'); valid = false; }
        if (!consent.checked) { consent.classList.add('is-invalid'); valid = false; }
        if (!valid) { showAlert(alert, 'Please check the highlighted details before sending your request.', 'danger'); return; }
        showAlert(alert, 'Thank you. The Noor Smile team will call you shortly to confirm your visit.', 'success');
        form.reset();
    });
}

function setupModalForm() {
    const form = $('#modalAppointmentForm');
    const modal = $('#appointmentModal');
    if (!form || !modal) return;
    document.addEventListener('click', (event) => {
        const planButton = event.target.closest('[data-plan]');
        if (planButton) {
            const alert = $('#modalFormAlert');
            if (alert) alert.className = 'alert d-none';
        }
    });
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = $('#modalName');
        const phone = $('#modalPhone');
        const service = $('#modalService');
        const alert = $('#modalFormAlert');
        [name, phone, service].forEach((field) => field.classList.remove('is-invalid'));
        let valid = true;
        if (!name.value.trim()) { name.classList.add('is-invalid'); valid = false; }
        if (!isPakistaniMobile(phone.value)) { phone.classList.add('is-invalid'); valid = false; }
        if (!service.value) { service.classList.add('is-invalid'); valid = false; }
        if (!valid) { showAlert(alert, 'Please add your name, a Pakistani mobile number and a service.', 'danger'); return; }
        showAlert(alert, 'Request received. We will call you from the studio to confirm availability.', 'success');
        form.reset();
        window.setTimeout(() => bootstrap.Modal.getOrCreateInstance(modal).hide(), 1800);
    });
}

function setupChat() {
    const launcher = $('#chatLauncher');
    const panel = $('#chatPanel');
    const close = $('#chatClose');
    const input = $('#chatInput');
    const send = $('#chatSend');
    const messages = $('#chatMessages');
    if (!launcher || !panel) return;
    const open = () => { panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); launcher.setAttribute('aria-expanded', 'true'); input?.focus(); };
    const hide = () => { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); launcher.setAttribute('aria-expanded', 'false'); };
    const addMessage = (text, role = 'assistant') => { const bubble = document.createElement('div'); bubble.className = `chat-bubble ${role}`; bubble.textContent = text; messages.appendChild(bubble); messages.scrollTop = messages.scrollHeight; };
    const respond = (text) => {
        const lower = text.toLowerCase();
        addMessage(text, 'user');
        window.setTimeout(() => {
            if (lower.includes('hour') || lower.includes('time')) addMessage('We are open Monday to Saturday, 9:00 am to 9:00 pm.');
            else if (lower.includes('price') || lower.includes('cost')) addMessage('First assessments start from PKR 2,500. We confirm treatment costs after a clinical assessment.');
            else addMessage('A team member can guide you. Please call +92 300 555 0186 or use the appointment button.');
        }, 260);
    };
    launcher.addEventListener('click', () => panel.classList.contains('open') ? hide() : open());
    close?.addEventListener('click', hide);
    send?.addEventListener('click', () => { if (input.value.trim()) { respond(input.value.trim()); input.value = ''; } });
    input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') send.click(); });
    $$('[data-chat]').forEach((button) => button.addEventListener('click', () => {
        const action = button.dataset.chat;
        if (action === 'appointment') { hide(); bootstrap.Modal.getOrCreateInstance($('#appointmentModal')).show(); }
        if (action === 'hours') addMessage('We are open Monday to Saturday, 9:00 am to 9:00 pm.');
        if (action === 'whatsapp') window.open(`https://wa.me/${clinic.whatsapp}`, '_blank', 'noopener');
    }));
}

function observeReveals(scope = document) {
    const items = $$('.reveal', scope);
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) { items.forEach((item) => item.classList.add('reveal-visible')); return; }
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => { if (!entry.isIntersecting) return; entry.target.classList.add('reveal-visible'); currentObserver.unobserve(entry.target); });
    }, { threshold: .12 });
    items.forEach((item) => observer.observe(item));
}

function setupModalPrefill() {
    const modal = $('#appointmentModal');
    modal?.addEventListener('show.bs.modal', (event) => {
        const plan = event.relatedTarget?.dataset?.plan;
        const service = $('#modalService');
        if (plan && service) service.value = '';
    });
}

function init() {
    renderServices();
    renderPlans();
    renderFaqs();
    populateServiceSelects();
    setupServiceFiltering();
    setupServiceDetails();
    setupStatsCounter();
    setupThemeToggle();
    setupNavigation();
    setupComparisons();
    setMinimumDates();
    validateContactForm();
    setupModalForm();
    setupChat();
    setupModalPrefill();
    observeReveals();
}

document.addEventListener('DOMContentLoaded', init);
