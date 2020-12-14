const express =require('express')
const cors = require("cors")
const app = express()
const { HttpCode } = require("./helpers/constants")
const routerContacts = require("./api/contacts")


app.use(cors())
app.use(express.json())

app.use("/api/contacts", routerContacts)

app.use((req, res, next) => {
    res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: `use api on ${req.baseUrl}/api/contacts`
    })
})

app.use((err, req, res, next) => {
    err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR
    res.status(err.status).json({
        status: err.status === 500 ? 'fail' : 'error',
        code: err.status,
        message: err.message
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('server on');
})