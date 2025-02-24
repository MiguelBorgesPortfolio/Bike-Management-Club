"use strict"
const query = require("../scripts/query");

module.exports = async function deleteEvent(request, response) {
    try {
        let id = Number(request.params.id);
        
        if(id) {
            let rows = await query("SELECT `e_id`, `e_id_type`, `e_description`, `e_date` FROM `Event` WHERE `e_id` = ?", [id]);
            await query("DELETE FROM `Event` WHERE `e_id` = ?", [id]);
            response.json({rows});
        }else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }
}