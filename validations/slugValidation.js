exports.validateSlug = async function validateSlug(slug, errors) {
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

    for (i = 0; i < slug.length; i++) {
        if (
            slug[i] === slug[i].toUpperCase() &&
            slug[i] !== slug[i].toLowerCase()
        ) {            
            i = slug.length;
            errors.push({text: 'Slug cannot have uppercase letters'});
        }

        badString.forEach(string => {
            if (slug[i] === string) {
                i = slug.length;
                errors.push({text: 'Slug cannot have special characters'});
            }
        });
    }
}