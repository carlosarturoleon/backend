const jwt = require('jsonwebtoken')

const verificar_token = (req, res, next) => {
    const token = req.header('auth-token-jwt')
    
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })

    try {
        const verified = jwt.verify(token, process.env.SECRETO_JWT)

        req.user = verified

        next()
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

module.exports = verificar_token;