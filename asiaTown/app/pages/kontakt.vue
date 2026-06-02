<script setup>

const contactCards = [
    {
        icon: 'tabler:map-pin',
        title: 'Adresse',
        text: 'Langkærvej 2B, 8381 tilst',
    },
    {
        icon: 'tabler:phone',
        title: 'Telefon',
        text: '+ 52 82 99 99',
    },
    {
        icon: 'tabler:mail',
        title: 'E-mail',
        text: 'asiatown@email.dk',
    },
    {
        icon: 'tabler:clock',
        title: 'Åbningstider',
        text: 'Man-Lør: 10:00 - 18:00\nSøn 10:00 - 15:00',
    },
]
</script>

<template>
    <main>
        <header class="page-header">
            <h1>Kontakt</h1>
            <p>Vi ser frem til at høre fra dig</p>
        </header>

        <section class="contact-layout">
            <div class="contact-content">
                <div class="contact-grid">
                    <article v-for="card in contactCards" :key="card.title" class="info-card">
                        <div class="icon-circle">
                            <Icon :name="card.icon" />
                        </div>

                        <h4>{{ card.title }}</h4>
                        <p>{{ card.text }}</p>
                    </article>
                </div>

                <div class="bottom-card">
                    <div class="social-content">
                        <h4>Følg os</h4>

                        <div class="socials">
                            <a href="#" aria-label="Facebook">
                                <Icon name="tabler:brand-facebook" />
                            </a>

                            <a href="#" aria-label="Instagram">
                                <Icon name="tabler:brand-instagram" />
                            </a>
                        </div>
                    </div>

                    <div class="gls-content">
                        <h4>GLS</h4>
                        <p>
                            Hent din pakke alle dage mellem
                            <br />
                            10:00 - 15:00
                        </p>
                    </div>
                </div>
            </div>

            <div class="map-wrapper">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2220.2239306568927!2d10.1050174!3d56.187807299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c156aade27517%3A0x5b1609117aa2f528!2sAsiatown!5e0!3m2!1sda!2sdk!4v1779880590055!5m2!1sda!2sdk"
                    width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
    </main>
</template>

<style scoped>
header {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    margin-bottom: var(--space-lg);
}

.contact-layout {
    display: grid;
    grid-template-columns: minmax(320px, 1fr) minmax(320px, 1fr);
    gap: clamp(32px, 5vw, 64px);
    align-items: start;
}

.contact-content {
    display: grid;
    gap: 24px;
}

.contact-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(min(220px, 100%), 1fr));
    gap: 24px;
}

.info-card,
.bottom-card {
    border: 1px solid;
    border-radius: 20px;
}

.info-card {
    display: grid;
    gap: 16px;
    padding: 24px;
}

.iconify {
    font-size: 40px;
}

.info-card p {
    white-space: pre-line;
}

.bottom-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding: 24px;
}

.social-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.socials {
    display: flex;
    gap: 16px;
}

.gls-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.map-wrapper {
    border-radius: 6px;
    height: 100%;
}

.map-wrapper iframe {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Nødvendig for layout skift, ellers map-wrapper for smal */
@media (max-width: 1300px) {
    .contact-layout {
        grid-template-columns: 1fr;
    }

    .map-wrapper {
        height: 300px;
    }
}

@media (max-width: 768px) {
    .contact-grid {
        grid-template-columns: 1fr;
    }
}
</style>
