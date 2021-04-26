class SEOModel {

    title: string
    color: string
    description: string
    image: string
    url: string

    constructor(title = "MyAnimeApp", color = "#DC143C", description = "", image = "", url = "") {
        this.title = title
        this.color = color
        this.description = description
        this.image = image
        this.url = url
    }
}

export default SEOModel