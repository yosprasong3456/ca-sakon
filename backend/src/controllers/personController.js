const db = require('../config/dbConfig')
const config = require("../config/index");

const knex = db.knexBuilder
const base_api = "https://canceranywhere.com/caw-gateway-production/";
const axios = require("axios");
const token = `Basic ${config.TOKEN_API}`;

const personHis = async () => {
    try {
        const sql = await knex.select('*').from('v_person_ca')
        return sql
    } catch (error) {
        console.error(error)
    }
}

const uploadData = (params) => {
    return axios.post(base_api + `patient`, params, {
      headers: { Authorization: token },
    });
  };

exports.getPersonHis = async (req, res, next) => {
    try {
        const data = await personHis()
        console.log(data)
        res.status(200).json({
            message: 'success',
            data: data
            
        })
    } catch (error) {
        res.status(400).json({
            error: {
                message: 'error',
                message: error.message
            }
        })
    }
}

exports.sendPersonCA = async (req, res, next) => {
    try {
        const result = await uploadData(req.body);
        console.log(result.data);
        if (result.data.message === "DONE") {
          return res.status(200).json({
            message: "success",
            status: "ok",
          });
        }
      } catch (error) {
        res.status(400).json({
          message: "error",
          status: "error",
        });
      }
}