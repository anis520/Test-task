import asynchandler from "express-async-handler";
import User from "../models/User.js";

/**
 * @DESC   user
 * @ROUTE /api/v1/user
 * @method POST
 * @access public
 */
export const UserSector = asynchandler(async (req, res) => {
  try {
    const { name, sector, subsector, microsector } = req.body;
    const data = await User.create(req.body);

    if (data) {
      res.status(200).json({ data, message: "Data created successfull" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Data created faild" });
  }
});

/**
 * @DESC   user
 * @ROUTE /api/v1/user
 * @method PUT
 * @access public
 */
export const UserSectorUpdate = asynchandler(async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });

    if (data) {
      res.status(200).json({ data, message: "Data update successfull" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Data update faild" });
  }
});
/**
 * @DESC   user
 * @ROUTE /api/v1/user
 * @method GET
 * @access public
 */
export const AllSector = asynchandler(async (req, res) => {
  try {
    const data = await User.find();

    if (data) {
      res.status(200).json({ data, message: "Get all datasuccessfull" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Get all data  faild" });
  }
});
/**
 * @DESC   user
 * @ROUTE /api/v1/user/:id
 * @method DELETE
 * @access public
 */
export const deleteSector = asynchandler(async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);

    if (data) {
      res.status(200).json({ data, message: "Delete  data successfull" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Delete data  faild" });
  }
});
