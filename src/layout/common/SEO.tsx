import Head from "next/head";
import SEOModel from "../../app/utils/models/SEOModel";

const SEO = (props) => {

    let data: SEOModel = props.data

    return (
        <Head>
            {/* General Meta Tags */}
            <title>
                {data.title}
            </title>
            <meta name="title" content={data.title} />
            <meta name="description" content={data.description} />
            <meta name="robots" content="index, follow"/>
            <meta name="theme-color" content={data.color}/>

            {/* Open graph meta tags */}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={data.url} />
            <meta property="og:title" content={data.title} />
            <meta property="og:description" content={data.description} />
            <meta property="og:image" content={data.image} />

            {/* Twitter meta tags */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={data.url}/>
            <meta property="twitter:title" content={data.title}/>
            <meta property="twitter:description" content={data.description} />
            <meta property="twitter:image" content={data.image} />
        </Head>
    )
}

export default SEO