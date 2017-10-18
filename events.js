this.addEventListener('activate', function (event)
{
    event.waitUntil(
        caches.keys().then(function (keyList)
        {
            return Promise.all(keyList.map(function (key)
            {
                return caches.delete(key);
            }));
        })
    );
});