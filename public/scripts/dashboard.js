const signOut = async () => {
    await axios.get('https://api-dev-aha.coinlab.network/auth/logout');
    localStorage.removeItem('user');
    location.href = 'index.html';
};

$(document).ready(async () => {
    console.log("dashboard ready");
    axios.defaults.withCredentials = true;
    const storagedUser = localStorage.getItem('user');
    console.log('AAAAA storagedUser', storagedUser);
    if (storagedUser) {
        const user = JSON.parse(storagedUser);
        $('h5.name').text(user.displayName);
        $('p.email').text(user.email);
        $('img').attr('src', user.photoURL);
        $('button.btn-edit-profile').on('click', () => {
            location.href = 'profile.html';
        })
        $('button.btn-sign-out').on('click', signOut);
    }
    
});