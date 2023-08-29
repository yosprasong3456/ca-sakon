// const db = require("../config/dbConfig");
const config = require("../config/index");

// const knex = db.knexBuilder;
const axios = require("axios");
const token = `Basic ${config.TOKEN_API}`;
// const iconv = require('iconv-lite');
const { queryPromise, connection } = require('../config/dbConfig');

// const personHis = async () => {
//   try {
//     const sql = await knex
//       .select("*")
//       .from("cancer_anywhere_person")
//       .limit("10")
//       // const cleanedData = utf8Data.replace(/\x00/g, '');
//     return sql;
    
//   } catch (error) {
//     console.error(error);
//   }
// };

const personHis = async () => {
  try {
    const results = await queryPromise('SELECT * FROM cancer_anywhere_person');
    console.log('Query results:', results);
    return results
  } catch (error) {
    console.error('Query error:', error.message);
  } finally {
    // Close the connection when done
    // connection.end();
  }
};

// process.on('SIGINT', () => {
//   connection.end();
// });


exports.getPersonHis = async (req, res, next) => {
  try {
    const data = await personHis();
    res.header("Content-Type", "application/json; charset=utf-8")
    res.status(200).json({
      message: "success",
      data: data,
    });
    console.log(data)
  } 
  catch (error) {
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
    delete req.body.death_date
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
        sendCancer(req.body)
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


function conUpLoadFunction(data){
  delete data.death_date
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://canceranywhere.com/caw-gateway-production/patient",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      console.log('cron',response.data.message)
      sendCancer(data)
      return 1
    })
    .catch((error) => {
      console.log(error);
      return 0
    });
}


function sendCancer(data){
  let cancerData = {
    cid: data.cid,
    visit_date: data.visit_date,
    behaviour_code: data.behaviour_code,
    finance_support_code: data.finance_support_code,
    icd10_code: data.diagnosis_drg,
  }
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://canceranywhere.com/caw-gateway-production/cancer",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: cancerData,
  };
  axios
    .request(config)
    .then((response) => {
      console.log('cron cancer',response.data)
      return 1
    })
    .catch((error) => {
      console.log(error);
      return 0
    });
}


exports.cornJopUpload= async (req, res, next) => {
  try {
    const data = await personHis();
    data.map((val)=>conUpLoadFunction(val))
    // res.status(200).json({
    //   message: "success",
    //   data: data,
    // });
  } catch (error) {
    res.status(400).json({
      error: {
        message: "error",
        message: error.message,
      },
    });
  }
};
