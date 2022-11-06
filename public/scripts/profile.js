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
    await axios.patch('https://api-dev-aha.coinlab.network/users/me', {
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
    const currentPasword = $('input.current-password').attr('value');
    const newPasword = $('input.new-password').attr('value');
    const confirmNewPasword = $('input.confirm-new-password').attr('value');
    await axios.patch('https://api-dev-aha.coinlab.network/auth/change-password', {
        currentPasword,
        newPasword,
        confirmNewPasword,
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
        $('span.name').text(user.displayName);
        $('span.email').text(user.email);
        $('img').attr('src', user.photoURL);
        $('input.txtName').attr('value', user.displayName);
        $('button.btn-save-profile').on('click', updateProfile);
        $('button.btn-cancel').on('click', backToDashboard);
        ['input.txtName', 'input.current-password', 'input.new-password', 'input.confirm-new-password'].forEach(selector => {
            $(selector).on('keyup', (e) => {
                $(selector).attr('value', e.target.value);
            });
        });
        $('button.btn-update-password').on('click', updatePassword);
    }
    
});