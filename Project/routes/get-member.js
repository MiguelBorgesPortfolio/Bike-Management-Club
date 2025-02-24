"use strict";
const query = require("../scripts/query");

module.exports = async function readMember(request, response) {
    try {
        let rows;
        let id = Number(request.params.id);
        if(id){
            rows = await query("SELECT `m_id`, `m_name` FROM `Member` WHERE `m_id` = ?", [id]);
        } else {
            rows = await query("SELECT `m_id`, `m_name` FROM `Member`");
        }
        response.json({rows});
    } catch (error) {
        query.sendError(error, response);
    }
}