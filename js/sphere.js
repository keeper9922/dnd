table_craft = $('#craft')
table_resources = $('#resources')
table_fails = $('#fails')
jQuery(function($) {
    $.getJSON("js/json/sphere_table.json", function(jsonData) {
        for (const jsonDataKey in jsonData["materials"]) {
            let item = jsonData["materials"][jsonDataKey];
            let row = "<tr>" +
                "<td>" + item.rarity + "</td>" +
                "<td>" + item.result + "</td>" +
                "<td>" + item.resources + "</td>" +
                "<td>" + item.instruments + "</td>" +
                "<td>" + item.difficulty + "</td>" +
                "</tr>";
            table_resources.append(row);
        }
        for (const jsonDataKey in jsonData["items"]) {
            let item = jsonData["items"][jsonDataKey];
            let row = "<tr>" +
                "<td>" + item.rarity + "</td>" +
                "<td>" + item.result + "</td>" +
                "<td>" + item.resources + "</td>" +
                "<td>" + item.instruments + "</td>" +
                "<td>" + item.difficulty + "</td>" +
                "</tr>";
            table_craft.append(row);
        }
        for (const jsonDataKey in jsonData["fails"]) {
            let item = jsonData["fails"][jsonDataKey];
            let row = "<tr>" +
                "<td>" + item.rarity + "</td>" +
                "<td>" + item.char_price + "</td>" +
                "<td>" + item.fail_price + "</td>" +
                "</tr>";
            table_fails.append(row);
        }

    });

});