import SiteTypes from "../models/SiteType.js";

const skipDetails = "-__v -_id"
function controller() {

  async function get(req, res) {
    const typeList = await SiteTypes.find({}, skipDetails);
    console.log(typeList);
    return res.status(200).send(typeList);
  }

  return { get }; 
}

export default controller;