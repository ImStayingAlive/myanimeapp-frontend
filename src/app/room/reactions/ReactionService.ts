import reactionStore from "./ReactionStore";

class ReactionService {

    playAnimation(userName, emoji) {
        let id = Math.random().toString(36).substring(7)
        reactionStore.addReaction(id, userName, emoji)

        setTimeout(() => {
           this.stopAnimation(id)
        }, 2450)
    }

    stopAnimation(userName) {
        reactionStore.removeReaction(userName)
    }
}

const reactionService = new ReactionService()
export default reactionService