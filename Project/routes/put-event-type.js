"use strict"
const query = require("../scripts/query");

module.exports = async function updateEventType(request, response){
    try {
        let id = Number(request.params.id);
        let description = request.body.description;

        if(id) {
            await query("UPDATE `EventType` SET `et_description` = ? Where `et_id` = ?", [description, id]);
            response.json({});
        } else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }
}