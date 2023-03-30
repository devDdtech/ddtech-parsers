function bootstrapAlert(args = {}) {
    const alertId = generateHashId();
    const defaultArgs = {
        icon: 'info',
        type: 'info',
        dismissDelay: 30000
    }
    args = { ...defaultArgs, ...args }; // merge options

    if (args.errors) {
        args.msg = 'Ooppss! <ul>';
        args.errors.forEach(error => {
            args.msg += `<li>${error}</li>`;
        });
        args.msg += '</ul>'
    }

    $('.alert').alert('close'); // remove old alerts

    $('.alerts-container').append(`
    <div class="alert alert-${args.type} alert-dismissible fade show alert-${alertId}" role="alert">
        <i class="fas fa-${args.icon} mr-2"></i> ${args.msg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    `);

    setTimeout(function () {
        $(`.alert-${alertId}`).alert('close');
    }, args.dismissDelay);

    document.documentElement.scrollTop = 0;
}

function copyToClipboard(text) {
    var textArea = document.createElement("textarea");
    $('#ddtech-modal').append(textArea);
    textArea.value = text;

    textArea.select();
    textArea.setSelectionRange(0, 99999);

    document.execCommand("copy");
    $(textArea).remove();

    const options = {
        msg: 'Copeado al portapapeles',
        icon: 'flag',
        type: 'primary'
    }
    bootstrapAlert(options);
}

function lastMatch(data, regex) {
    let match = [];
    match = data.match(regex);
    return match[match.length - 1];
}

function generateHashId() {
    return Math.random().toString(36).replace('0.', '');
}

function updateCounter(obj) {
    $('.counter').html(Object.getOwnPropertyNames(obj).length);
}
