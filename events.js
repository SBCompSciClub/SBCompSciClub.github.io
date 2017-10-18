if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js', {scope: 'sw-test'}).then(function(registration) {
      // registration worked
      console.log('Registration succeeded.');
      registration.unregister().then(function(boolean) {
          alert(boolean);
      });
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  };