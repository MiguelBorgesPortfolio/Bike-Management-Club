"use strict"
const query = require("../scripts/query");

module.exports = async function updateMember(request, response) {
    try {
        let id = Number(request.params.id);
        let name = request.body.name;

        if(id) {
            await query("UPDATE `Member` SET `m_name` = ? WHERE `m_id` = ?", [name, id]);
            response.json({});
        } else {
            query.sendError("Invalid ID", response);  
        }
    } catch (error) {
        query.sendError(error, response);
    }
}