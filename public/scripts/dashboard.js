const signOut = async () => {
    await axios.get('https://api-dev-aha.coinlab.network/auth/logout');
    localStorage.removeItem('user');
    location.href = 'index.html';
};

const getSummary = async () => {
    const {data} = await axios.get('https://api-dev-aha.coinlab.network/users/summary');
    return data.data;
}

const getListUsers = async () => {
    const {data} = await axios.get('https://api-dev-aha.coinlab.network/users');
    return data;
}

const renderSummary = async () => {
    const summary = await getSummary();
    console.log('summary:', summary);
    $('#signed-up').text(summary.signedUpUsers);
    $('#active-sessions-today').text(summary.activeSessionsToday);
    $('#avg-sessions').text(summary.avgSessions);
}

const rowTemplate =
'<tr>' +
'<td>${uid}</td>' +
'<td>${email}</td>' +
'<td>${emailVerified}</td>' +
'<td>${displayName}</td>' +
'<td><img src=${photoURL} alt="" border=3 height=32 width=32></img>' +
'<td>${created_at}</td>' +
'<td>${no_times_logged_in}</td>' +
'<td>${last_session_timestamp}</td>' +
'</tr>';

const renderTableUsers = async () => {
    const {data, total} = await getListUsers();
    console.log('data:', data);
    console.log('total:', total);
    for (let i = 0; i < total; i++) {
        data[i].last_session_timestamp = new Date(Number(data[i].last_session_timestamp) * 1000);
        data[i].created_at = new Date(data[i].created_at);
        $.tmpl(rowTemplate, data[i]).appendTo(`table.table`);
    }
};

$(document).ready(async () => {
    console.log("dashboard ready");
    axios.defaults.withCredentials = true;
    const storagedUser = localStorage.getItem('user');
    console.log('AAAAA storagedUser', storagedUser);
    if (storagedUser) {
        const user = JSON.parse(storagedUser);
        $('span.name').text(user.displayName);
        $('img').attr('src', user.photoURL);
        $('button.btn-edit-profile').on('click', () => {
            location.href = 'profile.html';
        })
        $('button.btn-sign-out').on('click', signOut);
        await renderSummary();
        await renderTableUsers();
    }
    
});