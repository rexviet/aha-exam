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
    localStorageAsync.set('user', JSON.stringify(user)).then(() => {
        location.href = 'dashboard.html';
      })
}

$(document).ready(async () => {
    console.log("profile ready");
    axios.defaults.withCredentials = true;
    const storagedUser = localStorage.getItem('user');
    console.log('AAAAA storagedUser', storagedUser);
    if (storagedUser) {
        const user = JSON.parse(storagedUser);
        $('span.name').text(user.displayName);
        $('span.email').text(user.email);
        $('img').attr('src', user.photoURL);
        $('div input').attr('value', user.displayName);
        $('button.btn-save-profile').on('click', updateProfile);
    }
    
});