let metalTable = $("#metals")
let healthPotionTable = $("#health_potions")
let data = {}
jQuery(function ($) {
    $.getJSON("js/json/resources.json", function(jsonData) {
        for (const jsonDataKey in jsonData["metals"]) {
            let item = jsonData["metals"][jsonDataKey];
            let row = "<tr>" +
                "<td>" + item.name + "</td>" +
                "<td>" + item.weight_lb + " фунт </td>" +
                "<td>" + item.price + " зм </td>" +
                "</tr>";
            metalTable.append(row);
        }
        for (const jsonDataKey in jsonData["health_potions"]) {
            let item = jsonData["health_potions"][jsonDataKey];
            let row = "<tr>" +
                "<td>" + item.name + "</td>" +
                "<td>" + item.rarity + "</td>" +
                "<td>" + item.price + " зм </td>" +
                "<td>" + item.heal_amount + " </td>" +
                "</tr>";
            healthPotionTable.append(row);
        }
    });

});
