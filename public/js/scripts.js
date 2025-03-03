console.log('Client side javascript file is loaded!');


document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.querySelector('input').value;
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {``
                console.log(data.location);
                console.log(data.forecast);
            }
        });;
    });
});