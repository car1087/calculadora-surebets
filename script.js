document.addEventListener('DOMContentLoaded', () => {

    // --- Elementos del DOM ---
    const exchangeRateInput = document.getElementById('exchangeRate');
    const odds1Input = document.getElementById('odds1');
    const stake1Input = document.getElementById('stake1');
    const odds2Input = document.getElementById('odds2');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsDiv = document.getElementById('results');
    const errorMessageP = document.getElementById('error-message');

    // --- Elementos de Resultados ---
    const stake2ResultDiv = document.getElementById('stake2Result');
    const totalInvestmentSpan = document.getElementById('totalInvestment');
    const profitSpan = document.getElementById('profit');
    const roiSpan = document.getElementById('roi');

    // --- Event Listener para el Botón ---
    calculateBtn.addEventListener('click', () => {
        // Ocultar resultados y errores anteriores
        resultsDiv.classList.add('hidden');
        errorMessageP.textContent = '';

        // 1. Obtener y validar los valores de entrada
        const exchangeRate = parseFloat(exchangeRateInput.value);
        const odds1 = parseFloat(odds1Input.value);
        const stake1 = parseFloat(stake1Input.value);
        const odds2 = parseFloat(odds2Input.value);

        if (isNaN(exchangeRate) || isNaN(odds1) || isNaN(stake1) || isNaN(odds2)) {
            showError('Por favor, completa todos los campos con números válidos.');
            return;
        }

        if (exchangeRate <= 0 || odds1 <= 1 || stake1 <= 0 || odds2 <= 1) {
            showError('Las cuotas deben ser mayores a 1 y los montos y tipo de cambio deben ser positivos.');
            return;
        }

        // 2. Comprobar si es una surebet
        // Para comparar, necesitamos que ambas cuotas estén en la misma "moneda" conceptual.
        // La cuota real de la casa 2, desde la perspectiva de USD, es (odds2 * exchangeRate)
        // Pero la fórmula de surebet (1/c1 + 1/c2 < 1) funciona con las cuotas directas.
        const surebetMargin = (1 / odds1) + (1 / odds2);

        if (surebetMargin >= 1) {
            showError(`No es una surebet. El margen es ${surebetMargin.toFixed(3)}, que es >= 1.`);
            return;
        }

        // 3. Calcular la apuesta para la Casa 2 (en Euros)
        // El objetivo es que el beneficio sea el mismo en ambos resultados.
        // Payout1 (USD) = stake1 * odds1
        // Payout2 (EUR) = stake2 * odds2
        // Para igualarlos, convertimos el Payout1 a EUR: Payout1 (EUR) = (stake1 * odds1) / exchangeRate
        // Entonces: (stake1 * odds1) / exchangeRate = stake2 * odds2
        // Despejando stake2:
        const stake2 = (stake1 * odds1) / (odds2 * exchangeRate);

        // 4. Calcular el resumen de la operación (todo en USD)
        const stake2InUSD = stake2 * exchangeRate;
        const totalInvestment = stake1 + stake2InUSD;
        const potentialPayout = stake1 * odds1; // El pago es el mismo en ambos resultados (en USD)
        const netProfit = potentialPayout - totalInvestment;
        const roi = (netProfit / totalInvestment) * 100;

        // 5. Mostrar los resultados
        displayResults({
            stake2: stake2.toFixed(2),
            totalInvestment: totalInvestment.toFixed(2),
            profit: netProfit.toFixed(2),
            roi: roi.toFixed(2)
        });
    });

    // --- Funciones Auxiliares ---
    function showError(message) {
        errorMessageP.textContent = message;
    }

    function displayResults(data) {
        stake2ResultDiv.textContent = `${data.stake2} EUR`;
        totalInvestmentSpan.textContent = `${data.totalInvestment} USD`;
        profitSpan.textContent = `${data.profit} USD`;
        roiSpan.textContent = `${data.roi} %`;
        resultsDiv.classList.remove('hidden');
    }
});
