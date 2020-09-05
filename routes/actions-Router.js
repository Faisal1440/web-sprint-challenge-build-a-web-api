const express = require("express");
const router = express.Router();
const Actions = require("../data/helpers/actionModel");

//GET REQUEST 
router.get("/", (req, res) => {
    Actions.get()
      .then((allActions) => {
       res.status(200).json(allActions);
      })
      .catch((error) => {
      // console.log(error);
       res.status(500).json({
      errorMessage: "There was a problem retreiving the data, sorry."
      });
    });
  });

  //GET BY ID 
  router.get("/:id", (req, res) => {
    Projects.getProjectActions(req.params.id)
      .then(projectsActions => {
        if (projectsActions.length === 0) {
          return res.status(404).json({
          errorMessage: "user id does not exist"
          });
        } else {
          return res.status(200).json(projectsActions);
        }
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({
          errorMessage: "The project information could not be found."
        });
      });
});


  module.exports = router;