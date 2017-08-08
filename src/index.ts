import * as express from "express"

export function start() {
    const app: express.Express = express()

    app.use("/", () => { "cenas" })

    function startApp() {
        return new Promise((resolve, reject) => {
            try {
                const server = app.listen(8080, () => {
                    return resolve()
                })
                server.on("checkContinue", (req: express.Request, res: express.Response) => {
                res.writeContinue()
                })
                server.once("error", (err: Error) => {
                return reject(err)
                })
            } catch (err) {
                reject(err)
            }
        })
    }

    return { app, startApp }
}

start().startApp()