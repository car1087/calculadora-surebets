document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const gainUSD = document.getElementById('gainUSD');
    const gainEUR = document.getElementById('gainEUR');
    const stake2ResultDiv = document.getElementById('stake2Result');
    const errorMessageP = document.getElementById('error-message');

    console.log('Botón encontrado:', calculateBtn);
    console.log('Elementos encontrados:', { gainUSD, gainEUR, stake2ResultDiv, errorMessageP });

    calculateBtn.addEventListener('click', () => {
        console.log('Botón clickeado');
        
        // Obtener valores de los inputs
        const exchangeRate = parseFloat(document.getElementById('exchangeRate').value);
        const stake1 = parseFloat(document.getElementById('stake1').value);
        const odds2 = parseFloat(document.getElementById('odds2').value);
        const odds1 = parseFloat(document.getElementById('odds1').value);

        console.log('Valores ingresados:', { exchangeRate, stake1, odds2, odds1 });

        // Validar que todos los campos tengan valores
        if (isNaN(exchangeRate) || isNaN(stake1) || isNaN(odds2) || isNaN(odds1)) {
            console.log('Error: campos vacíos o inválidos');
            showError('Por favor, completa todos los campos con números válidos');
            return;
        }

        // Validar que los valores sean positivos
        if (exchangeRate <= 0 || stake1 <= 0 || odds2 <= 0 || odds1 <= 0) {
            console.log('Error: valores no positivos');
            showError('Todos los valores deben ser positivos');
            return;
        }

        // 1. Calcular ganancia en Pinnacle
        const gainInUSD = stake1 * odds2;
        console.log('Ganancia en USD:', gainInUSD);
        gainUSD.textContent = `${stake1.toFixed(2)} USD × ${odds2.toFixed(2)} = ${gainInUSD.toFixed(2)} USD`;
        
        // 2. Convertir a Euros
        const gainInEUR = gainInUSD * exchangeRate;
        console.log('Ganancia en EUR:', gainInEUR);
        gainEUR.textContent = `${gainInUSD.toFixed(2)} USD × ${exchangeRate.toFixed(4)} = ${gainInEUR.toFixed(2)} EUR`;
        
        // 3. Calcular apuesta en Winamax
        const stake2 = gainInEUR / odds1;
        console.log('Apuesta Winamax:', stake2);
        stake2ResultDiv.textContent = `${gainInEUR.toFixed(2)} EUR ÷ ${odds1.toFixed(2)} = ${stake2.toFixed(2)} EUR`;
    });

    function showError(message) {
        console.log('Error mostrado:', message);
        errorMessageP.textContent = message;
    }
});
