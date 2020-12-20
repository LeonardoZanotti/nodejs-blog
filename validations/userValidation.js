exports.validateUser = async (body, errors) => {
    // name
    if (
        !body.name ||
        body.name === null ||
        typeof body.name === 'undefined'
    ) {
        errors.push({text: 'Invalid name!'});
    }

    if (body.name.length < 3) {
        errors.push({text: 'User name is too small!'});
    }

    if (body.name.length > 255) {
        errors.push({text: 'User name is too large!'});
    }

    // email
    if (
        !body.email ||
        body.email === null ||
        typeof body.email === 'undefined'
    ) {
        errors.push({text: 'Invalid email!'});
    }

    // password
    if (
        !body.password ||
        body.password === null ||
        typeof body.password === 'undefined'
    ) {
        errors.push({text: 'Invalid password!'});
    }

    if (body.password.length < 7) {
        errors.push({text: 'The password is too small! Use more than 6 characters!'})
    }

    // password confirmation
    if (body.password !== body.passwordConfirm) {
        errors.push({text: 'The passwords do not match!'})
    }
}