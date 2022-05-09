const express = require('express');
const router = express.Router();
const { Numbers, Departments, Regions } = require('../models');

router.post("/", async (req, res) => {
    try {
        const numbers = req.body;

        await Numbers.create(numbers);
        res.json(numbers);
    }
    catch (error) {
        res.send(error);
    }
});
// Popis brojeva kod Admina
router.get("/", async (req, res) => {                                               // ovo je dodano
    const listOfNumbers = await Numbers.findAll({ include: [Regions, Departments], where: { visible: 1, active: 1 } });
    res.json(listOfNumbers);
});

router.get("/", async (req, res) => {
    const oneNumber = await Numbers.findAll({ include: [Regions, Departments], where: { visible: 1, active: 1 } })
    res.json(oneNumber);
})

//Dohvačanje brojeva  po DepartmentId kod Clienta (Pretraga po odjelu)
router.get("/byDepartmentId/:id", async (req, res) => {
    const id = req.params.id;
    const number = await Numbers.findAll({ include: [Regions, Departments], where: { visible: 1, active: 1, DepartmentId: id } });
    res.json(number);
});
// Dohvačanje brojeva po nazivu (Pretraga po nazivu)
router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const number = await Numbers.findAll({ include: [Regions, Departments], where: { visible: 1, active: 1, id: id } });
    res.json(number);
});

/* ADMIN */
// Dohvačanje brojeva za uređivanje kod Admina (CRUDNumbers i CRUDNumbersByDepartment)
router.get("/admin", async (req, res) => {
    const oneNumber = await Numbers.findAll({ include: [Regions, Departments], where: { active: 1 } })
    res.json(oneNumber);
});

// Dohvačanje brojeva po nazivu kod Admina (CRUDNumbers) //OVO JE MOŽDA VIŠAK
router.get("/admin/byId/:id", async (req, res) => {
    const id = req.params.id;
    const number = await Numbers.findAll({ include: [Regions, Departments], where: { active: 1, id: id } });
    res.json(number);
});
// Dohvačanje brojeva po po DepartmentId kod Admin (CRUDNumbersByDepartment)
router.get("/admin/byDepartmentId/:id", async (req, res) => {
    const id = req.params.id;
    const number = await Numbers.findAll({ include: [Regions, Departments], where: { active: 1, DepartmentId: id } });
    res.json(number);
});
//Dohvačanje broja za uređivanje NumberEdit.js
router.get("/edit/byId/:id", async (req, res) => {
    const id = req.params.id;
    const number = await Numbers.findOne({ include: [Departments, Regions], where: { id: id } }); // Zato šta je jedan podtatak
    res.json(number);
});
// Uređivanje broja NumberEdit.js
router.put("/edit", async (req, res) => {
    try {
        const { newDepartmentTitle, newName, newNumber, id } = req.body; // ovo dolazi od strane klijenta
        await Numbers.update({ DepartmentId: newDepartmentId, name: newName, number: newNumber }, { where: { id: id } });
        res.json({ newDepartmentTitle, newName, newNumber });
    }
    catch (error) {
        res.send(error);
    }
});


//Sakrij broj CRUDNumbers i CRUDNumbersByDepartment
router.put("/admin/invisible", async (req, res) => {
    try {
        const { id, visible } = req.body;
        await Numbers.update({ visible: false }, { where: { id: id } });
        res.json({ visible });
    }
    catch (error) {
        res.send(error);
    }
});


//Otkrij broj CRUDNumbers i CRUDNumbersByDepartment
router.put("/admin/visible", async (req, res) => {
    try {
        const { id, visible } = req.body;
        await Numbers.update({ visible: true }, { where: { id: id } });
        res.json({ visible });
    }
    catch (error) {
        res.send(error);
    }
});

//Obriši broj CRUDNumbers i CRUDNumbersByDepartment
router.put("/admin/delete", async (req, res) => {
    try {
        const { id, active } = req.body;
        await Numbers.update({ active: false }, { where: { id: id } });
        res.json({ active });
    }
    catch (error) {
        res.send(error);
    }
});

/*
router.put("/", async(req, res) => {
    
    const visible = await Numbers.findOne({
        where: {id: id }
    });
    if (!visible){
        await Numbers.put({ 
            where: {id: id},
         });
        res.json({ visible: true });
    } else {
        await Numbers.put({
            where: {id: id},
        });
        res.json({ visible: false});
    }
})
*/



module.exports = router;