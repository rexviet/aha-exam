const localStorageAsync = {
    set: function (key, value) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    get: function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    }
  };

const updateProfile = async () => {
    const newName = $('div input').attr('value');
    console.log('new name:', newName);
    await axios.patch('https://aha-exam-api.chaunguyen.dev/users/me', {
        name: newName
    });
    $('span.name').text(newName);
    const storagedUser = localStorage.getItem('user');
    const user = JSON.parse(storagedUser);
    user.displayName = newName;
    console.log('new user:', user);
    localStorageAsync.set('user', JSON.stringify(user)).then(backToDashboard);
}

const updatePassword = async () => {
    const currentPassword = $('input.current-password').attr('value');
    const newPassword = $('input.new-password').attr('value');
    const confirmNewPassword = $('input.confirm-new-password').attr('value');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        alert("Current password, new password and confirm new password are required fields");
        return;
    }

    if (newPassword !== confirmNewPassword) {
        alert("Passwords are not match");
        return;
    }

    await axios.post('https://aha-exam-api.chaunguyen.dev/auth/change-password', {
        currentPassword,
        newPassword,
        confirmNewPassword,
    });
}

const backToDashboard = () => {
    location.href = 'dashboard.html';;
}

$(document).ready(async () => {
    axios.defaults.withCredentials = true;
    const storagedUser = localStorage.getItem('user');
    if (storagedUser) {
        const user = JSON.parse(storagedUser);
        $('h3.name').text(user.displayName);
        $('p.email').text(user.email);
        $('img').attr('src', user.photoURL);
        $('input.input-name').attr('value', user.displayName);
        $('button.btn-save-profile').on('click', updateProfile);
        $('button.btn-cancel').on('click', backToDashboard);
        ['input.input-name', 'input.current-password', 'input.new-password', 'input.confirm-new-password'].forEach(selector => {
            $(selector).on('keyup', (e) => {
                $(selector).attr('value', e.target.value);
            });
        });
        $('button.btn-update-password').on('click', updatePassword);
    }
    
});