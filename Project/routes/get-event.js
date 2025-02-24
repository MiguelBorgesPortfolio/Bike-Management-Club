"use strict";
const query = require("../scripts/query");

module.exports = async function readEvent(request, response) {
    try {
        let rows;
        let id = Number(request.params.id);
        if(id) {
            rows = await query("SELECT `e_id`, `e_id_type`, `e_description`, `e_date` FROM `Event` WHERE `e_id` = ?", [id]);
        } else {
            rows = await query("SELECT `e_id`, `e_id_type`, `e_description`, `e_date` FROM `Event`");
        }
        response.json({rows});    
    } catch (error) {
        query.sendError(error, response);
    }
}