const db = require('../config/dbConfig')
const knex = db.knexBuilder

const personHis = async () => {
    try {
        const sql = await knex.select('*').from('v_person_ca')
        return sql
    } catch (error) {
        console.error(error)
    }
}

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