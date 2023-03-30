$(document).ready(function() {
    $("[data-monitor-feed]").on("change", function() { monitorExec(); });
    $("[data-target='#monitor-modal']").on("click", function() { updateConfigurationModal(); });
});

function monitorExec() {
    if (getMonitorValues().length == 0)
        return; // There is nothing to monitor
    const feed = $("[data-monitor-feed]").val().toUpperCase(); // Feed in uppercase for comparation

    getMonitorValues().forEach(value => {
        if (feed.includes(value)) {
            const regex = new RegExp(`(.)*${value}(.)*`); // regex used to get the line where the match is
            const match = feed.match(regex)[0].replace(value, `<strong>${value}</strong>`);
            const msg = `El monitor encontró la siguiente coincidencia: <strong>${value}</strong><br/>${match}`;
            bootstrapAlert({ msg: msg, icon: 'skull', type: 'danger' });
            return; // A match has beed found
        }
    });
}

function getMonitorValues() {
    const values = localStorage.monitorValues;
    if (!values || (values && values.length == 0)) // If values are not present or empty
        return new Array(); // Return an empty array

    return values.split(","); // Split back into an array
}

// Values are saved in upper case format and compare in the same format
function setMonitorValues() {
    let newValues = new Array();
    $('.monitor-value').each(function() {
        if (this.value.length == 0) return; // Do not append empty values;
        newValues.push(this.value.toUpperCase());
    });

    localStorage.monitorValues = newValues;
    bootstrapAlert({ msg: "Se guardó la configuración del monitor", icon: 'flag', type: 'success' });
}

function updateConfigurationModal() {
    const values = getMonitorValues();
    $("#monitor-modal").find(".modal-body").html("");
    $("#monitor-modal").find(".modal-body").append("<p>Añade palabras clave a monitorear</p>");

    values.forEach(val => {
        appendField(val);
    });

    if (values.length == 0)
        appendField();
}

function appendField(value = '') {
    $("#monitor-modal").find(".modal-body").append(`
        <div class="form-group row">
            <div class="col-10">
                <input type="text" value="${value}" class="form-control monitor-value"/>
            </div>
            <div class="col-2">
                <a href="#" tabindex="-1" class="text-danger" onclick="$(this).closest('.row').remove();">
                    <i class="fa fas fa-times fa-2x"></i>
                </a>
            </div>
        </div>
    `);
}
