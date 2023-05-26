export const getDataFromJson = () => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.overrideMimeType("application/json");
        request.open('GET', './data.json', true);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    // Обработка данных JSON-файла
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(new Error('Произошла ошибка при загрузке JSON-файла'));
                }
            }
        };
        request.send(null);
    });
}