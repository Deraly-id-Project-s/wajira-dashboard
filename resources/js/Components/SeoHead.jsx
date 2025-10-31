import { Head } from '@inertiajs/react';

const SeoHead = ({
    title = 'Wajira Jagratara Corps : Indonesia Motorcycle Exporter, Transportation Service Company & Vehicle Agency',
    description = 'Wajira Jagratara Corps is a company established on June 8, 2019 by Mr. Zaifudin Yukhri, focusing on automotive trading and transportation services. The company establishes partnerships with motor vehicle ATPMs across Indonesia, providing new car and motorcycle sales services, as well as vehicle document management. In addition, Wajira Jagratara Corps also offers freight and passenger transportation services, including the rental of various types of vehicles. With a fleet of trucks that support the delivery of goods throughout Indonesia, the company is committed to improving mobility and economic growth. Wajira Jagratara Corps has several subsidiaries, including:',
    keywords = 'ekspor indonesia, exportir indonesia, perdagangan internasional, produk indonesia, eksportir terpercaya, product exporter',
    image = 'https://wajiracorps.com/images/og-image.png',
    url = 'https://wajiracorps.com' }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Wajira Corps" />
            <meta name="robots" content="index, follow" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="Wajira Corps" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <link rel="canonical" href={url} />

            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Wajira Corps",
                    "url": "https://wajiracorps.com",
                    "logo": "https://wajiracorps.com/images/logo.png",
                    "sameAs": [
                        "https://www.instagram.com/wajiracorps",
                        "https://www.facebook.com/wajiracorps"
                    ]
                })
            }} />
        </Head>
    );
};

export default SeoHead;