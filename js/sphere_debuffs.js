table1 = $('#1')
table2 = $('#2')
jQuery(function($) {
    $.getJSON("js/json/table_fails.json", function(jsonData) {
        for (const jsonDataKey in jsonData["1"]) {
            let item = jsonData["1"][jsonDataKey];
            let row = "<tr>" +
                "<td>" + item.rarity + "</td>" +
                "<td>" + item.char_price + "</td>" +
                "<td>" + item.fail_price + "</td>" +
                "</tr>";
            table1.append(row);
        }
        for (const jsonDataKey in jsonData["2"]) {
            let item = jsonData["2"][jsonDataKey];
            let row = "<tr>" +
                "<td>" + item.rarity + "</td>" +
                "<td>" + item.char_price + "</td>" +
                "<td>" + item.fail_price + "</td>" +
                "</tr>";
            table2.append(row);
        }

    });

});