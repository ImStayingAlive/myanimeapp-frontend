import {makeAutoObservable} from "mobx";

class ReactionStore {

    rerender = false
    reactions = []

    constructor() {
        makeAutoObservable(this)
    }

    addReaction(id, name, emoji) {
        this.rerender = !this.rerender
        this.reactions[id] = {
            name: name,
            emoji: emoji
        }
    }

    removeReaction(id) {
        this.rerender = !this.rerender
        delete this.reactions[id]
    }
}

const reactionStore = new ReactionStore()
export default reactionStore