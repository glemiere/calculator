export interface Command {
    exec() : Promise<void>
}

export interface CommandDescription {
    cmdStr: string,
    exec: () => any,
    subs?: Array<CommandDescription>
}