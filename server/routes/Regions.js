const express = require('express');
const router = express.Router();
const {Regions} = require('../models');

//Kreiranje Lokaliteta Client/Admin/RegionAdd.js
router.post("/", async(req, res) => {
    try {
        const regions = req.body;
        await Regions.create(regions);
        res.json(regions);
    }
    catch(error) {
        res.send(error);
    }
}); 

//Dohvačanje Lokaliteta Client/CRUDRegions.js  &&  Dropdown Client/Admin/DepartmentAdd
router.get("/", async(req, res) => {
    const listOfRegions = await Regions.findAll();
    res.json(listOfRegions);
});

//Dohvačanje Lokaliteta po ID-u Client/Admin/RegionEdit.js
router.get("/byId/:id", async(req, res) => {
    const id = req.params.id;
    const region = await Regions.findByPk(id);
    res.json(region);
});

//Editiranje Lokaliteta Client/Admin/RegionEdit.js
router.put("/edit", async(req, res) => {
    try{
        const { newTitle, id } = req.body; // ovo dolazi od strane klijenta
        await Regions.update({ regionTitle: newTitle}, {where: { id: id }});
        res.json(newTitle);
    }
    catch(error)
    {
        res.send(error);
    }
});

//Brisanje Lokaliteta  Client/CRUDRegions.js
router.delete("/:byId", async(req, res) => {
    const byId = req.params.byId;
    await Regions.destroy({
        where: {
            id: byId,
        },
    });
    res.json("Deleted !");
});




module.exports = router;