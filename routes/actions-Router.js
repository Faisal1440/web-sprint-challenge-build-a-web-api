const express = require("express");
const router = express.Router();
const Actions = require("../data/helpers/actionModel");

//GET REQUEST 
router.get("/", (req, res) => {
    Actions.get()
      .then(allActions => {
      return res.status(200).json(allActions);
      })
      .catch(error => {
      console.log(error);
      return res.status(500).json({
      errorMessage: "There was a problem retreiving the data, sorry."
      });
    });
  });