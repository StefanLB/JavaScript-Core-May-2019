function addSticker() {
    let titleElement = $('.title');
    let textElement = $('.content');

    if (!titleElement.val() || !textElement.val()) {
        return;
    }

    let li = $('<li>').addClass('note-content');

    $('<a>').addClass('button').text('x').appendTo(li).on('click', removeElement);
    $('<h2>').text(titleElement.val()).appendTo(li);
    $('<hr>').appendTo(li);
    $('<p>').text(textElement.val()).appendTo(li);
    $('#sticker-list').append(li);

    titleElement.val('');
    textElement.val('');

    function removeElement(event) {
        $(event.target).parent().remove();
    }
}
