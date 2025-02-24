"use strict"
const query = require("../scripts/query");

module.exports = async function createEventType(request, response) {
    try {
        let description = request.body.description;
        if (description) {
            await query("INSERT INTO `EventType` (et_description) VALUES (?)", [description]);
            response.json({});
        } else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }
}