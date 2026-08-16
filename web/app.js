/*
███████╗███╗   ██╗███████╗ ██████╗      ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝████╗  ██║╚══███╔╝██╔═══██╗    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
█████╗  ██╔██╗ ██║  ███╔╝ ██║   ██║    ██║     ██║   ██║██║  ██║█████╗
██╔══╝  ██║╚██╗██║ ███╔╝  ██║   ██║    ██║     ██║   ██║██║  ██║██╔══╝
███████╗██║ ╚████║███████╗╚██████╔╝    ╚██████╗╚██████╔╝██████╔╝███████╗
╚══════╝╚═╝  ╚═══╝╚══════╝ ╚═════╝      ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝

               DISCORD • https://discord.gg/HPEAWNB52w
*/

const identity = document.getElementById('identity');
const form = document.getElementById('identity-form');
const formMessage = document.getElementById('form-message');
const submitButton = document.getElementById('submit-button');

const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const dateofbirth = document.getElementById('dateofbirth');
const height = document.getElementById('height');

let limits = {
    minFirstNameLength: 2,
    maxFirstNameLength: 25,
    minLastNameLength: 2,
    maxLastNameLength: 25,
    minHeight: 120,
    maxHeight: 220,
    lowestYear: 1900,
    highestYear: 2005
};

function getResourceName() {
    if (typeof GetParentResourceName === 'function') {
        return GetParentResourceName();
    }

    return 'EN-identity';
}

function showMessage(text) {
    formMessage.textContent = text || '';
    formMessage.classList.toggle('is-visible', Boolean(text));
}

function setLoading(state) {
    submitButton.disabled = state;
    submitButton.classList.toggle('is-loading', state);
}

function setLimits(data) {
    if (data) {
        limits = Object.assign(limits, data);
    }

    firstname.minLength = Number(limits.minFirstNameLength);
    firstname.maxLength = Number(limits.maxFirstNameLength);
    lastname.minLength = Number(limits.minLastNameLength);
    lastname.maxLength = Number(limits.maxLastNameLength);
    height.min = Number(limits.minHeight);
    height.max = Number(limits.maxHeight);
    dateofbirth.min = Number(limits.lowestYear) + '-01-01';
    dateofbirth.max = Number(limits.highestYear) + '-12-31';
}

function openForm(data) {
    form.reset();
    setLimits(data.settings);
    showMessage('');
    setLoading(false);

    identity.classList.add('is-visible');
    identity.setAttribute('aria-hidden', 'false');

    setTimeout(function () {
        firstname.focus();
    }, 300);
}

function closeForm() {
    identity.classList.remove('is-visible');
    identity.setAttribute('aria-hidden', 'true');
    setLoading(false);
    showMessage('');
}

function checkName(value, min, max, title) {
    if (!value) return title + ' is required.';
    if (value.length < min || value.length > max) return title + ' must be ' + min + '-' + max + ' letters.';
    if (!/^[A-Za-z]+$/.test(value)) return title + ' can only contain letters.';
    return '';
}

function getFormData() {
    const first = firstname.value.trim();
    const last = lastname.value.trim();
    const birth = dateofbirth.value;
    const playerHeight = Number(height.value);
    const sexInput = form.querySelector('input[name="sex"]:checked');
    const sex = sexInput ? sexInput.value : '';

    let error = checkName(first, Number(limits.minFirstNameLength), Number(limits.maxFirstNameLength), 'First name');
    if (error) return { error: error };

    error = checkName(last, Number(limits.minLastNameLength), Number(limits.maxLastNameLength), 'Last name');
    if (error) return { error: error };

    if (!birth) return { error: 'Date of birth is required.' };

    const year = Number(birth.substring(0, 4));
    if (year < Number(limits.lowestYear) || year > Number(limits.highestYear)) {
        return { error: 'Birth year must be between ' + limits.lowestYear + ' and ' + limits.highestYear + '.' };
    }

    if (!Number.isFinite(playerHeight) || playerHeight < Number(limits.minHeight) || playerHeight > Number(limits.maxHeight)) {
        return { error: 'Height must be between ' + limits.minHeight + ' and ' + limits.maxHeight + ' CM.' };
    }

    if (sex !== 'm' && sex !== 'f') return { error: 'Select a gender.' };

    return {
        data: {
            firstname: first,
            lastname: last,
            dateofbirth: birth,
            height: playerHeight,
            sex: sex
        }
    };
}

function sendIdentity(data) {
    return fetch('https://' + getResourceName() + '/submitIdentity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        if (!response.ok) throw new Error('NUI callback failed: ' + response.status);
        return response.json();
    });
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (submitButton.disabled) return;

    showMessage('');

    const result = getFormData();
    if (result.error) {
        showMessage(result.error);
        return;
    }

    setLoading(true);

    sendIdentity(result.data)
        .then(function (response) {
            if (response && response.ok) return;

            showMessage(response && response.message ? response.message : 'Registration failed. Check your information and try again.');
            setLoading(false);
        })
        .catch(function (error) {
            showMessage('Unable to submit the identity form.');
            setLoading(false);
            console.error('[ENZO CODE]', error);
        });
});

window.addEventListener('message', function (event) {
    const data = event.data || {};

    if (data.action === 'open') openForm(data);
    if (data.action === 'close') closeForm();
});
