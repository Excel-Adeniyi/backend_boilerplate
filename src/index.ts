import express, {Express, Request, Response} from 'express'
// import helmet from 'helmet'

const app: Express = express()

app.use(express.json())
// app.use(helmet())
app.get('/app', (req: Request, res: Response) => {
    res.send('Text Something US SS SS')
})
app.listen(3000, () => {
    console.log('App Listening on port 3000')
})

