exports.validateCategory = async (body, errors) => {
    // name
    if (
        !body.name ||
        body.name === null ||
        typeof body.name === 'undefined'
    ) {
        errors.push({text: 'Invalid name!'});
    }

    if (body.name.length < 3) {
        errors.push({text: 'Category name is too small!'});
    }

    if (body.name.length > 255) {
        errors.push({text: 'Category name is too large!'});
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
        errors.push({text: 'Category slug is too small!'});
    }

    if (body.slug.length > 255) {
        errors.push({text: 'Category slug is too large!'});
    }

    if (body.slug.indexOf(' ') >= 0) {
        errors.push({text: 'Slug cannot have spaces'});
    }
}