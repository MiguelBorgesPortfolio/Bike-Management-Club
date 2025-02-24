"use strict"
const query = require("../scripts/query");

module.exports = async function createMember(request, response) {
    try {
        let name = request.body.name;
        
        if(name) {
            await query("INSERT INTO `Member` (m_name) VALUES (?)", [name]);
            response.json({});
        } else {
            query.sendError("Invalid ID", response);
        }
    } catch (error) {
        query.sendError(error, response);
    }    
}