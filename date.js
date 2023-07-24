exports.getDate = function() {
    let week = {day:'numeric',month:'short',weekday:'long'};
    let date = new Date();
    let day = date.toLocaleDateString("en-US",week);
    return day        
}
exports.getDay = function() {
    let week = {weekday:'long'};
    let date = new Date();
    let day = date.toLocaleDateString("en-US",week);
    return day        
}
exports.getYear = function() {
    let week = {year:'numeric'};
    let date = new Date();
    let day = date.toLocaleDateString("en-US",week);
    return day        
}
exports.getMonth = function() {
    let week = {month:'long'};
    let date = new Date();
    let day = date.toLocaleDateString("en-US",week);
    return day        
}