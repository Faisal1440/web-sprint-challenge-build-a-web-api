const express = require("express");
const router = express.Router();
router.use(express.json());
const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

//GET__ 

// Get  

router.get("/", (req, res) => {
    Projects.get()
      .then(allprojects => {
        return res.status(200).json(allprojects);
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({
          errorMessage: "There was a problem retreiving the data, sorry. "
        });
      });
  });
  


module.exports = router;