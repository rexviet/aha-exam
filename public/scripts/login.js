
const emailField = document.getElementById('email');
const passwordField = document.getElementById('password');
const btnGoogle = document.getElementById('btnGoogle');
const btnFacebook = document.getElementById('btnFacebook');

const onBtnLoginSubmit = (e) => {
  e.preventDefault();
  const email = emailField.value;
  const password = passwordField.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      handleStorageUser(user.toJSON());
    })
    .catch((err) => {
      console.error(err.message);
      error.innerHTML = err.message;
    });
}

const onBtnGoogleClicked = () => {
  var ggProvider = new firebase.auth.GoogleAuthProvider();
  ggProvider.setCustomParameters({
    'display': 'popup'
  });
  
  console.log('ggProvider:', ggProvider);
  firebase.auth()
  .signInWithPopup(ggProvider)
  .then((result) => {
    console.log('result:', result);
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    console.log('token:', token);
    // localStorage.setItem('token', token);
    // The signed-in user info.
    var user = result.user.toJSON();
    handleStorageUser(user);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

const onBtnFacebookClicked = () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  var auth = firebase.auth();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log('result:', result);
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user.toJSON();
      handleStorageUser(user);
    })
    .catch((error) => {
      console.error('err:', error);
      
      // Handle Errors here.
      var errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        // Step 2.
        // User's email already exists.
        // The pending Facebook credential.
        var pendingCred = error.credential;
        // The provider account's email address.
        var email = error.email;
        // Get sign-in methods for this email.
        auth.fetchSignInMethodsForEmail(email).then(function(methods) {
          // Step 3.
          // If the user has several sign-in methods,
          // the first method in the list will be the "recommended" method to use.
          if (methods[0] === 'password') {
            // Asks the user their password.
            // In real scenario, you should handle this asynchronously.
            var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
            auth.signInWithEmailAndPassword(email, password).then(function(result) {
              // Step 4a.
              return result.user.linkWithCredential(pendingCred);
            }).then(function() {
              // Facebook account successfully linked to the existing Firebase user.
              goToApp();
            });
            return;
          }
          // All the other cases are external providers.
          // Construct provider object for that provider.
          // TODO: implement getProviderForProviderId.
          var provider = getProviderForProviderId(methods[0]);
          // At this point, you should let the user know that they already have an account
          // but with a different provider, and let them validate the fact they want to
          // sign in with this provider.
          // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
          // so in real scenario you should ask the user to click on a "continue" button
          // that will trigger the signInWithPopup.
          auth.signInWithPopup(provider).then(function(result) {
            // Remember that the user may have signed in with an account that has a different email
            // address than the first one. This can happen as Firebase doesn't control the provider's
            // sign in flow and the user is free to login using whichever account they own.
            // Step 4b.
            // Link to Facebook credential.
            // As we have access to the pending credential, we can directly call the link method.
            result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
              // Facebook account successfully linked to the existing Firebase user.
              goToApp();
            });
          });
        });
      }
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });
}

const exchangeSession = async () => {
  const storagedUser = localStorage.getItem('user');
  if (storagedUser) {
    const user = JSON.parse(storagedUser);
    const token = user.stsTokenManager.accessToken;
    console.log('axios:', axios);
    axios.get('https://api-dev-aha.coinlab.network/auth/exchange-session', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      console.log('response.headers:', response.headers);
    });
    

    // let options = {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   },
    //   credentials: 'include'
    // }
    // fetch(`https://api-dev-aha.coinlab.network/auth/exchange-session`, options);

    // $.ajax({
    //   type: 'GET',
    //   url: `https://api-dev-aha.coinlab.network/auth/exchange-session`,
    //   headers: {"Authorization": `Bearer ${token}`},
    //   success: function (data, status, xhr) {
    //     return data;
    //   },
    // });
  }
}

const testSession = async () => {
  axios.get('https://api-dev-aha.coinlab.network', {
      withCredentials: true 
    });
  // const testRs = await fetch('https://api-dev-aha.coinlab.network', {credentials: 'include'});
  // console.log('testRs:', testRs);
  // $.ajax({
  //   type: 'GET',
  //   url: `https://api-dev-aha.coinlab.network`,
  //   xhrFields: {
  //     withCredentials: true
  //  },
  //   success: function (data, status, xhr) {
  //     return data;
  //   },
  // });
}

$(document).ready(async () => {
  console.log('ready');
  $('#login-form').on('submit', onBtnLoginSubmit);
  $('#btnGoogle').on('click', onBtnGoogleClicked);
  $('#btnFacebook').on('click', onBtnFacebookClicked);
  $('button.btnExchange').on('click', exchangeSession);
  $('button.btnTestSession').on('click', testSession);
});


const handleStorageUser = (user) => {
  console.log('user:', user);
  // const accessToken = user.stsTokenManager.accessToken;
  // const refreshToken = user.stsTokenManager.refreshToken;
  // localStorage.setItem('accessToken', accessToken);
  // localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
};