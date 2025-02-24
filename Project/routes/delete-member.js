"use strict"
const query = require("../scripts/query");

module.exports = async function deleteMember(request, response) {
    try {
        let id = Number(request.params.id);
        if(id) {
            let rows = await query ("SELECT `m_id`, `m_name` FROM `Member` WHERE `m_id` = ?", [id]);
            await query("DELETE FROM `Member` WHERE `m_id` = ?", [id]);
            response.json({rows});
        } else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }
}