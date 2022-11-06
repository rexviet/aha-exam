$(document).ready(async () => {
    console.log("dashboard ready");
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
    }
    
});