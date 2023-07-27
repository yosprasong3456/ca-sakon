const db = require("../config/dbConfig");
const config = require("../config/index");

const knex = db.knexBuilder;
const axios = require("axios");
const token = `Basic ${config.TOKEN_API}`;

const personHis = async () => {
  try {
    const sql = await knex
      .select("*")
      .from("v_person_ca")
    return sql;
  } catch (error) {
    console.error(error);
  }
};

exports.getPersonHis = async (req, res, next) => {
  try {
    const data = await personHis();
    res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "error",
        message: error.message,
      },
    });
  }
};

exports.sendPerson = async (req, res, next) => {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://canceranywhere.com/caw-gateway-production/patient",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: req.body,
    };
    axios
      .request(config)
      .then((response) => {
        return res.status(200).json({
          message: response.data.message,
          status: "ok",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          message: "error",
          status: "error",
        });
      });
  } catch (error) {
    res.status(400).json({
      message: "error",
      status: "error",
    });
  }
};
