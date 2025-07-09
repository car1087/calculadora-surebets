document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const gainUSD = document.getElementById('gainUSD');
    const gainEUR = document.getElementById('gainEUR');
    const stake2ResultDiv = document.getElementById('stake2Result');
    const surebetCalculation = document.getElementById('surebetCalculation');
    const errorMessageP = document.getElementById('error-message');

    calculateBtn.addEventListener('click', () => {
        // Limpiar errores anteriores
        errorMessageP.textContent = '';
        
        // Obtener valores de los inputs
        const exchangeRate = parseFloat(document.getElementById('exchangeRate').value);
        const stake1 = parseFloat(document.getElementById('stake1').value);
        const odds2 = parseFloat(document.getElementById('odds2').value);
        const odds1 = parseFloat(document.getElementById('odds1').value);

        // Validar que todos los campos tengan valores
        if (isNaN(exchangeRate) || isNaN(stake1) || isNaN(odds2) || isNaN(odds1)) {
            showError('Por favor, completa todos los campos con números válidos');
            return;
        }

        // Validar que los valores sean positivos
        if (exchangeRate <= 0 || stake1 <= 0 || odds2 <= 0 || odds1 <= 0) {
            showError('Todos los valores deben ser positivos');
            return;
        }

        // 1. Calcular ganancia en Pinnacle
        const gainInUSD = stake1 * odds2;
        gainUSD.textContent = `Pinnacle: ${gainInUSD.toFixed(2)} USD`;
        
        // 2. Convertir a Euros
        const gainInEUR = gainInUSD * exchangeRate;
        gainEUR.textContent = `Winamax: ${gainInEUR.toFixed(2)} EUR`;
        
        // 3. Calcular apuesta en Winamax
        const stake2 = gainInEUR / odds1;
        stake2ResultDiv.textContent = `${stake2.toFixed(2)} EUR`;

        // 4. Calcular el porcentaje de surebet (1 - (1/odds1 + 1/odds2))
        const surebetValue = (1 - (1/odds1 + 1/odds2)) * 100;
        surebetCalculation.textContent = `Porcentaje de surebet: ${surebetValue.toFixed(2)}%`;
        
        // 5. Calcular la ganancia total en USD
        const totalGainUSD = gainInUSD * (surebetValue / 100);
        document.getElementById('totalGain').textContent = `Ganancia Total: ${totalGainUSD.toFixed(2)} USD`;
    });

    function showError(message) {
        errorMessageP.textContent = message;
    }
});
