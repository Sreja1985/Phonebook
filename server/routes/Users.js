const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("Korisnik dodan!");
    });
});


router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) res.json({ error: "Korisnik ne postoji" });

    bcrypt.compare(password, user.password).then(async (match) => {   //prvi je upisani password, drugi je password iz baze
        if (!match) res.json({ error: "Pogrešna kombinacija koriničkog imena i lozinke" });

        const accessToken = sign(
            { username: user.username, id: user.id },
            "token"
        );
        res.json({ token: accessToken, username: username, id: user.id });
    });
});
//Provjera valjanosti tokena
router.get("/authentication", validateToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;