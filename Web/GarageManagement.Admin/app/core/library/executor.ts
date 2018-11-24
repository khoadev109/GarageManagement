import Dictionary from "./dictionary";

interface ICommandHandler {
    ref: any,
    callBack: any
}

export class CommandExecutor {
    public commands: Dictionary.IKeyedCollection<ICommandHandler>;

    constructor() {
        this.commands = new Dictionary.KeyedCollection<ICommandHandler>();
    }

    register = (commandName: string, callBack: any) => {
        let commandHandler: ICommandHandler = {
            ref: this,
            callBack: callBack
        };
        this.commands.add(commandName, commandHandler);
    };
    
    execute = (commandName: string, parameters) => {
        let cmd = this.commands.getItem(commandName);
        if (cmd) {
            cmd.callBack.call(cmd.ref, parameters);
        }
    };
}
