exports.validatePost = async function validatePost(body, errors) {
    // title
    if (
        !body.title ||
        body.title === null ||
        typeof body.title === 'undefined'
    ) {
        errors.push({text: 'Invalid title!'});
    }

    if (body.title.length < 3) {
        errors.push({text: 'Post title is too small!'});
    }

    if (body.title.length > 255) {
        errors.push({text: 'Post title is too large!'});
    }

    // slug
    badString = [
        '!',
        '@',
        '#',
        '$',
        '%',
        '¨',
        '&',
        '*',
        '(',
        ')',
        '_',
        '+',
        '=',
        '\'',
        '"',
        '£',
        '¢',
        '¬',
        '§',
        'º',
        'ª',
        '´',
        '`',
        '?',
        '/',
        '\\',
        '|',
        '.',
        ',',
        ';',
        ':',
        'ç',
        '<',
        '>',
        '°',
        '^',
        '~',
        '[',
        ']',
        '{',
        '}'
    ];

    for (i = 0; i < body.slug.length; i++) {
        if (
            body.slug[i] === body.slug[i].toUpperCase() &&
            body.slug[i] !== body.slug[i].toLowerCase()
        ) {            
            i = body.slug.length;
            errors.push({text: 'Slug cannot have uppercase letters'});
        }

        badString.forEach(string => {
            if (body.slug[i] === string) {
                i = body.slug.length;
                errors.push({text: 'Slug cannot have special characters'});
            }
        });
    }

    if (
        !body.slug ||
        body.slug === null ||
        typeof body.slug === 'undefined'
    ) {
        errors.push({text: 'Invalid slug!'});
    }

    if (body.slug.length < 3) {
        errors.push({text: 'Post slug is too small!'});
    }

    if (body.slug.length > 255) {
        errors.push({text: 'Post slug is too large!'});
    }

    if (body.slug.indexOf(' ') >= 0) {
        errors.push({text: 'Slug cannot have spaces'});
    }

    // description
    if (
        !body.description  ||
        body.description === null ||
        typeof body.description === 'undefined'
    ) {
        errors.push({text: 'Invalid description!'});
    }

    if (body.description.length < 10) {
        errors.push({text: 'Post description is too small!'});
    }

    if (body.description.length > 500) {
        errors.push({text: 'Post description is too large!'});
    }

    // category
    if (body.category === "0") {
        errors.push({text: 'Invalid category! Please create one.'});
    }

    // content
    if (
        !body.content  ||
        body.content === null ||
        typeof body.content === 'undefined'
    ) {
        errors.push({text: 'Invalid content!'});
    }

    if (body.content.length < 10) {
        errors.push({text: 'Post content is too small!'});
    }

    if (body.content.length > 10000) {
        errors.push({text: 'Post content is too large!'});
    }
}