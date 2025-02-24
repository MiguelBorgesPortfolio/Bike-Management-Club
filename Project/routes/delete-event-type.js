"use strict"
const query = require("../scripts/query");

module.exports = async function deleteEventType(request, response) {
    try {
        let id = Number(request.params.id);
        if (id) {
            let rows = await query("SELECT `et_id`, `et_description` FROM `EventType` WHERE `et_id` = ?", [id]);
            await query("DELETE FROM `EventType` WHERE `et_id` = ?", [id]);
            response.json({ rows });
        } else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }
}