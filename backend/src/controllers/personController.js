const db = require("../config/dbConfig");
const config = require("../config/index");

const knex = db.knexBuilder;
const axios = require("axios");
const token = `Basic ${config.TOKEN_API}`;
// const dbConnect = require("../config/dbConfig");

const sql = require('mssql')

const sqlConfig = {
  user: 'sa',
  password: 'P@ssw0rd@2',
  database: 'hiptime40',
  server: '172.16.1.17',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
}


// const iconv = require('iconv-lite');
// const { queryPromise, connection } = require('../config/dbConfig');

const personHis = async () => {
  try {
    await knex.raw('SET NAMES utf8');
    const sql = await knex
      .select("*")
      .from("cancer_anywhere_person")
    return sql;
    // const row = await dbConnect.getrow('SELECT * FROM `cancer_anywhere_person`')
    // return row
    
  } catch (error) {
    console.error(error);
  }
};

// const personHis = async () => {
//   try {
//     const results = await queryPromise('SELECT * FROM cancer_anywhere_person');
//     console.log('Query results:', results);
//     return results
//   } catch (error) {
//     console.error('Query error:', error.message);
//   } finally {
//     // Close the connection when done
//     // connection.end();
//   }
// };

// process.on('SIGINT', () => {
//   connection.end();
// });


exports.getPersonHis = async (req, res, next) => {
  try {
    // const data = await personHis();
    // res.header("Content-Type", "application/json; charset=utf-8")
    // res.status(200).json({
    //   message: "success",
    //   data: data,
    // });
    // console.log(data)
    await sql.connect(sqlConfig)
    const result = await sql.query`select * from Holiday`
    console.log(result)
    if(result.recordsets.length>0){
      res.status(200).json({
        message: "success",
        data: result.recordsets[0],
      });
    }else{
      res.status(200).json({
        message: "success",
        data: '',
      });
    }
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

// old version
// const db = require("../config/dbConfig");
// const config = require("../config/index");

// const knex = db.knexBuilder;
// const axios = require("axios");
// const token = `Basic ${config.TOKEN_API}`;

// const personHis = async () => {
//   try {
//     const sql = await knex
//       .select("*")
//       .from("v_person_ca")
//       .where("cancer_check", "0");
//       // .from("cancer_anywhere_person")
//     return sql;
//   } catch (error) {
//     console.error(error);
//   }
// };

// exports.getPersonHis = async (req, res, next) => {
//   try {
//     const data = await personHis();
//     res.status(200).json({
//       message: "success",
//       data: data,
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: {
//         message: "error",
//         message: error.message,
//       },
//     });
//   }
// };

// exports.sendPerson = async (req, res, next) => {
//   try {
//     delete req.body.death_date
//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "https://canceranywhere.com/caw-gateway-production/patient",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       data: req.body,
//     };
//     axios
//       .request(config)
//       .then((response) => {
//         sendCancer(req.body)
//         return res.status(200).json({
//           message: response.data.message,
//           status: "ok",
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         return res.status(400).json({
//           message: "error",
//           status: "error",
//         });
//       });
//   } catch (error) {
//     res.status(400).json({
//       message: "error",
//       status: "error",
//     });
//   }
// };

// function sendCancer(data){
//   let cancerData = {
//     cid: data.cid,
//     visit_date: data.visit_date,
//     behaviour_code: data.behaviour_code,
//     finance_support_code: data.finance_support_code,
//     icd10_code: data.diagnosis_drg,
//   }
//   let config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "https://canceranywhere.com/caw-gateway-production/cancer",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//     data: cancerData,
//   };
//   axios
//     .request(config)
//     .then((response) => {
//       console.log('cron cancer',response.data)
//       return 1
//     })
//     .catch((error) => {
//       console.log(error);
//       return 0
//     });
// }

// function conUpLoadFunction(data){
//   delete data.death_date
//   let config = {
//     method: "post",
//     maxBodyLength: Infinity,
//     url: "https://canceranywhere.com/caw-gateway-production/patient",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//     data: data,
//   };
//   axios
//     .request(config)
//     .then((response) => {
//       console.log('cron person',response.data.message)
//       sendCancer(data)
//       return 1
//     })
//     .catch((error) => {
//       console.log(error);
//       return 0
//     });
// }

// exports.cornJopUpload= async (req, res, next) => {
//   try {
//     const data = await personHis();
//     data.map((val)=>conUpLoadFunction(val))
//     // res.status(200).json({
//     //   message: "success",
//     //   data: data,
//     // });
//   } catch (error) {
//     res.status(400).json({
//       error: {
//         message: "error",
//         message: error.message,
//       },
//     });
//   }
// };
