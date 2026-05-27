<script setup>
const logo =
    'https://www.figma.com/api/mcp/asset/93000580-93da-4f24-80f4-fcea63dd8383'

const footerLinks = {
    visit: [
        {
            icon: 'tabler:map-pin',
            text: 'Langkærvej 2B, 8381 tilst',
        },
        {
            icon: 'tabler:clock',
            text: 'Man-Fre: 10:00-18:00\nLør: 10:00-16:00\nSøn: Lukket',
        },
    ],

    contact: [
        {
            icon: 'tabler:phone',
            text: '+45 12 34 56 78',
        },
        {
            icon: 'tabler:mail',
            text: 'asiatown@gmail.com',
        },
        {
            icon: 'tabler:package',
            text: 'GLS pakkeudleveringssted',
        },
    ],

    social: [
        {
            icon: 'tabler:brand-facebook',
            label: 'Facebook',
            href: '#',
        },
        {
            icon: 'tabler:brand-instagram',
            label: 'Instagram',
            href: '#',
        },
        {
            icon: 'tabler:brand-tiktok',
            label: 'TikTok',
            href: '#',
        },
    ],
}
</script>

<template>
    <footer class="site-footer">
        <NuxtLink to="https://www.findsmiley.dk/1284336" target="_blank" class="footer-smiley">
            <p>
                Se vores smiley rapport
            </p>
            <Icon name="ph:smiley-bold" />
            <Icon name="cuida:open-in-new-tab-outline" />
        </NuxtLink>

        <div class="footer-main">
            <div class="footer-grid">
                <article class="footer-brand">
                    <div class="footer-logo">
                        <NuxtImg :src="logo" alt="Asia Market logo" />
                        <h2>Asia Market</h2>
                    </div>

                    <p>
                        Din lokale asiatiske butik med et bredt udvalg af autentiske
                        produkter fra hele Asien.
                    </p>
                </article>

                <article>
                    <h2>Besøg os</h2>

                    <div class="footer-list">
                        <div v-for="item in footerLinks.visit" :key="item.text" class="footer-item">
                            <span class="icon-circle">
                                <Icon :name="item.icon" />
                            </span>

                            <p>{{ item.text }}</p>
                        </div>
                    </div>
                </article>

                <article>
                    <h2>Kontakt</h2>

                    <div class="footer-list">
                        <div v-for="item in footerLinks.contact" :key="item.text" class="footer-item">
                            <span class="icon-circle">
                                <Icon :name="item.icon" />
                            </span>

                            <p>{{ item.text }}</p>
                        </div>
                    </div>
                </article>

                <article>
                    <h2>Følg os</h2>

                    <div class="social-list">
                        <NuxtLink v-for="item in footerLinks.social" :key="item.label" :to="item.href"
                            :aria-label="item.label" class="icon-circle">
                            <Icon :name="item.icon" />
                        </NuxtLink>
                    </div>
                </article>
            </div>

            <p class="footer-copy">
                © 2026 Asia Market. Alle rettigheder forbeholdes.
            </p>
        </div>
    </footer>
</template>

<style scoped>
.site-footer {
    color: #ffffff;
    /* FIX FOOTER LATER ITS TOO SHORT FOR CONTACT PAGE! */
}

.iconify {
    font-size: var(--font-h3-desktop);
}

.footer-smiley {
    display: flex;
    gap: var(--space-sm);
    justify-content: center;
    align-items: center;
    padding: 16px;
    /* FIX BACKGRUND COLOR TO VAR WHEN ADDED IN ROOT */
    background: #4a9e34;
    color: #ffffff;
}

.footer-smiley p {
    font-size: var(--font-h4-desktop);

}

.footer-main {
    padding: 64px 64px 24px;
    background: #1a1a1a;
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
    gap: 48px;
    padding-bottom: 24px;
    border-bottom: 1px solid #ffffff;
}

.footer-brand {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.footer-logo {
    display: flex;
    gap: 8px;
}

.footer-logo img {
    width: 48px;
    height: 48px;
    object-fit: contain;
}

.footer-list {
    display: grid;
    gap: 16px;
    margin-top: 16px;
}

.footer-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.icon-circle {
    display: grid;
    place-items: center;
    width: 50px;
    aspect-ratio: 1;
    flex: 0 0 auto;
    border-radius: 100px;
    background: #fef8f8;
    color: #1a1a1a;
}

.social-list {
    display: flex;
    gap: 16px;
    margin-top: 16px;
}

.footer-copy {
    padding-top: 24px;
    font-size: 14px;
}
</style>