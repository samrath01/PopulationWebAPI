// Web API URL
let url_address = '/api/Populations';
let edit_status = false;

function displayAllPopulations(options) {
    $.ajax({
        type: "GET",
        url: url_address,
        cache: false,
        success: function (data) {            
            const tableBody = $("#table_population");
            $(tableBody).empty(); 
            if (data.length == 0) { 
                if (options) {
                    const tr = $("<tr></tr>");
                    tr.append('<td colspan="3" align="center">No Population information</td>');
                    tr.appendTo(tableBody);
                } else {
                    const tr = $("<tr></tr>");
                    tr.append('<td colspan="5" align="center">No Population information</td>');
                    tr.appendTo(tableBody);
                }                
            } else {
                $.each(data, function (key, item) {
                    const tr = $("<tr></tr>");
                    tr.append($("<td></td>").text(item.countryName));
                    tr.append($("<td></td>").text(item.totalPopulation));
                    tr.append($("<td></td>").text(item.growthRate + "%"));
                    tr.append($("<td></td>").text(item.area));
                    if (options) {
                        tr.append($("<td></td>").append('<button class="btn btn-secondary" data-toggle="modal" data-target="#add_edit_dialog">Edit Record</button>')
                            .on("click", function () {
                                getPopulationDetails(item.id);                                
                            })
                        );
                        tr.append($("<td></td>").append('<button class="btn btn-danger">Delete Record</button>')
                            .on("click", function () {
                                if (confirm("Are You Sure To Remove This Population Details?")) {
                                    deletePopulationDetails(item.id);
                                }                                
                            })
                        );                    
                    }                    
                    tr.appendTo(tableBody)
                });
            }
        }
    });
}

function savePopulation() {
    let country_value = $('#country').val();
    let population_value = parseInt($('#population').val());
    let growth_rate_value = parseFloat($('#growth_rate').val());
    let area_value = parseInt($("#area").val());

    let population = {
        countryName: country_value,
        totalPopulation: population_value,
        growthRate: growth_rate_value,
        area: area_value
    };

    if (edit_status) {
        let popid = parseInt($("#population_id").val());
        population["id"] = popid;
        $.ajax({
            type: "PUT",
            url: url_address + "/" + popid,
            data: JSON.stringify(population),
            contentType: "application/json; charset=utf-8"
        }).done(function (response) {
            $("#output").html("Population Details is Updated!!!");
            displayAllPopulations(true);
        }).fail(function (xhr, status) {
            $("#output").html("Population Details is not Updated!!!");
        });
    } else {
        $.ajax({
            type: "POST",
            url: url_address,
            data: JSON.stringify(population),
            contentType: "application/json; charset=utf-8"
        }).done(function (response) {
            $("#output").html("Population Details is Saved!!!");
            displayAllPopulations(true);
        }).fail(function (xhr, status) {
            $("#output").html("Population Details is not Saved!!!");
        });
    }
}

function resetForm() {
    $("#model_title").html("Add Population Details");
    $('#population_id').val("");
    $('#country').val("");
    $('#growth_rate').val("");
    $('#area').val("");
    $('#population').val("");
    $('#output').html("");
    edit_status = false;
}

function getPopulationDetails(id) {
    $.ajax({
        type: "GET",
        url: url_address + "/" + id,
        contentType: "application/json"
    }).done(function (population) {
        $('#population_id').val(population.id);
        $('#country').val(population.countryName);
        $('#growth_rate').val(population.growthRate);
        $('#area').val(population.area);
        $('#population').val(population.totalPopulation);
        $("#model_title").html("Edit Population Details");
        edit_status = true;
    });
}

function deletePopulationDetails(id) {
    $.ajax({
        type: "DELETE",
        url: url_address + "/" + id,
    }).done(function (response) {
        displayAllPopulations(true);
    });
}