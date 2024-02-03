export interface IContext {
    req: {
        headers: {
            cookie: string
        }
    }

}


export interface IMex {
    meX: {
        data: any
        lists_id: any
        name: string
        id: number
        email: string
    }
}