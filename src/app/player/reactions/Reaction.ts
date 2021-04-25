class Reaction {
    source;
    id;

    constructor(id, source) {
        this.id = id;
        this.source = source
    }
}


const reactions = [
    new Reaction("laugh", "https://i.imgur.com/P1YL5x9.png"),
    new Reaction("love", "https://imgur.com/Gi0tdNp.png"),
    new Reaction("surprised", "https://imgur.com/pAKzTHl.png"),
    new Reaction("cry", "https://imgur.com/tdZ0cWx.png"),
    new Reaction("angry", "https://i.imgur.com/RKov3tQ.png")
]

export default reactions