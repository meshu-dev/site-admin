export default function (context) {
  return new Promise(async (resolve, reject) => {
    let token = localStorage.getItem('auth._token.local');

    if (token && token !== 'false') {
    	token = token.replace('Bearer ', '');

    	let payload = token.split('.')[1],
    		tokenData = JSON.parse(atob(payload));

    	if (tokenData.exp) { // Date.now() + 100000
    		let expiryTime = tokenData.exp * 1000, //1586596035534, //tokenData.exp * 1000,
    			currentTime = Date.now();

    		console.log('expiryTime', new Date(expiryTime));
    		console.log('currentTime', new Date(currentTime));

    		if (expiryTime < currentTime) {
    			await context.$auth.logout();
          context.redirect('/login');
    		}
    	}
    }
    resolve();
  });
}
