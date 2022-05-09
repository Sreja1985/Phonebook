const express = require('express');
const router = express.Router();
const { Departments, Regions } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware"); // ovo staviti kod ruta za admina

//Kreiranje Odjela Client/Admin/DepartmentAdd.js
router.post("/", async (req, res) => {
    try {
        const departments = req.body;

        await Departments.create(departments);
        res.json(departments);
    }
    catch (error) {
        res.send(error);
    }
});
/*
// Ruta za Department.js u Clientu
router.get("/:id", async(req, res) => {  
    const id = req.params.id;  
    const listOfDepartments = await Departments.findByPk((id), {include: [Regions]});
    res.json( listOfDepartments );
});
*/
//LiveSearch, Client/Department.js   &&  Client/CRUDDepartments.js
router.get("/", async (req, res) => {
    const listOfDepartments = await Departments.findAll({ include: [Regions] });
    res.json(listOfDepartments);
});

//Brisanje Odjela Client/Admin/CRUDDepartments.js
router.delete("/:byId", async (req, res) => {
    const byId = req.params.byId;
    await Departments.destroy({
        where: {
            id: byId,
        },
    });
    res.json("Deleted !");
});

//Dohvačanje Odjela  po ID-u  Client/Admin/DepartmentEdit.js
router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const department = await Departments.findByPk(id);
    res.json(department);
});

//Editiranje Odjela  Client/Admin/DepartmentEdit.js
router.put("/edit", async (req, res) => {
    try {
        const { newTitle, newAlias, id } = req.body; // ovo dolazi od strane klijenta
        await Departments.update({ departmentTitle: newTitle, alias: newAlias }, { where: { id: id } });
        res.json({ newTitle, newAlias });
    }
    catch (error) {
        res.send(error);
    }
});

// Dohvačanje Odjela po RegionId
router.get("/byRegionId/:id", async (req, res) => {
    const id = req.params.id;
    //const listOfDepartments = await Departments.findAll({include: [Regions]});
    const listOfDepartments = await Departments.findAll({ include: [Regions], where: { RegionId: id } });;
    res.json(listOfDepartments);
});




module.exports = router;
