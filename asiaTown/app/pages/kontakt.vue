<script setup>
const mapImage =
    'https://www.figma.com/api/mcp/asset/e6932c89-b920-4526-bd29-f249b6dc8a84'

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
    <main class="contact-page">
        <nav class="breadcrumbs">
            <p>Breadcrumb soon</p>
        </nav>

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

                        <h2>{{ card.title }}</h2>
                        <p>{{ card.text }}</p>
                    </article>
                </div>

                <div class="bottom-card">
                    <div class="social-content">
                        <h2>Følg os</h2>

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
                        <h2>GLS</h2>
                        <p>
                            Hent din pakke alle dage mellem
                            <br />
                            10:00 - 15:00
                        </p>
                    </div>
                </div>
            </div>

            <div class="map-wrapper">
                <img :src="mapImage" alt="Kort over Asia Towns placering" />
            </div>
        </section>
    </main>
</template>

<style scoped>
.contact-page {
    /* max-width: 1440px;
    margin: 0 auto;
    padding: 16px 64px 64px; */

    /* Move to style.css later */
    /* background: #fff; */
    /* color: #1a1a1a; */
}

.contact-layout {
    display: grid;
    grid-template-columns: minmax(320px, 644px) minmax(320px, 1fr);
    gap: clamp(32px, 5vw, 64px);
    align-items: start;
}

.contact-content {
    display: grid;
    gap: 24px;
}

.contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
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

.info-card p {
  white-space: pre-line;
}

.bottom-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding: 24px;
}
.social-content{
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.socials{
    display: flex;
    gap: 16px;
}
.gls-content{
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.map-wrapper {
    border-radius: 6px;
    height: 100%;
}

.map-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

@media (max-width: 900px) {
    .contact-page {
        padding: 16px 24px 48px;
    }

    .contact-layout,
    .bottom-card {
        grid-template-columns: 1fr;
    }

    .map-wrapper img {
        height: auto;
        aspect-ratio: 644 / 590;
    }

    .page-header h1 {
        font-size: 40px;
    }
}
</style>