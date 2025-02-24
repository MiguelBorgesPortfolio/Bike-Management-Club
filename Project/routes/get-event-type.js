"use strict";
const query = require("../scripts/query");

module.exports = async function readEventType(request, response) {
    try {
        let rows;
        let id = Number(request.params.id);
        if(id) {
            rows = await query("SELECT `et_id`, `et_description` FROM `EventType` WHERE `et_id` = ?", [id]);
        } else {
            rows = await query("SELECT `et_id`, `et_description` FROM `EventType`");
        }
        response.json({rows});
    } catch (error) {
        query.sendError(error, response);
    }
} 