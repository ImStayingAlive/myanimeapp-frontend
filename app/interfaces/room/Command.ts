class Command {

    name: string
    onCommand: Function

    constructor(name: string, onCommand: Function) {
        this.name = name
        this.onCommand = onCommand
    }

}

export default Command