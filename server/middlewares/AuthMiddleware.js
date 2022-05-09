const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");//dohvača ga s fronthenda

    if (!accessToken) return res.json({ error: "Korisnik nije prijavljen !" });

    try {
        const validToken = verify(accessToken, "token");
        if (validToken) {
            return next();
        }
    }
    catch (error) {
        return res.json({ error: error });
    }

};

module.exports = { validateToken };
