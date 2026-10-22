// Running pace calculator: enter any two of time, distance, and pace to get the third.
(function () {
    const KM_PER_MILE = 1.609344;

    const form = document.getElementById('pace-form');
    const timeInput = document.getElementById('time');
    const distanceInput = document.getElementById('distance');
    const distanceUnit = document.getElementById('distance-unit');
    const raceSelect = document.getElementById('race');
    const paceInput = document.getElementById('pace');
    const paceUnit = document.getElementById('pace-unit');
    const result = document.getElementById('result');
    const splits = document.getElementById('splits');

    // No colons = minutes, one colon = min:sec, two colons = hr:min:sec
    function parseDuration(value) {
        const text = value.trim();
        if (!text) return null;
        const parts = text.split(':');
        if (parts.length > 3 || parts.some(part => part.trim() === '' || isNaN(part))) return NaN;
        const [a, b, c] = parts.map(Number);
        if (parts.length === 1) return a * 60;
        if (parts.length === 2) return a * 60 + b;
        return a * 3600 + b * 60 + c;
    }

    function parseDistance(value) {
        const text = value.trim();
        if (!text) return null;
        const distance = Number(text);
        return isNaN(distance) ? NaN : distance;
    }

    function formatDuration(totalSeconds) {
        const rounded = Math.round(totalSeconds);
        const hours = Math.floor(rounded / 3600);
        const minutes = Math.floor((rounded % 3600) / 60);
        const seconds = rounded % 60;
        const ss = String(seconds).padStart(2, '0');
        if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${ss}`;
        return `${minutes}:${ss}`;
    }

    function toKm(distance, unit) {
        return unit === 'mi' ? distance * KM_PER_MILE : distance;
    }

    function fromKm(km, unit) {
        return unit === 'mi' ? km / KM_PER_MILE : km;
    }

    function formatDistance(distance) {
        return String(Math.round(distance * 100) / 100);
    }

    function showError(message) {
        result.innerHTML = `<p class="text-red-600 font-medium">${message}</p>`;
        splits.innerHTML = '';
    }

    function isValid(value) {
        return value !== null && !isNaN(value) && value > 0;
    }

    function calculate(target) {
        const seconds = parseDuration(timeInput.value);
        const distance = parseDistance(distanceInput.value);
        const pace = parseDuration(paceInput.value);

        let km;
        let totalSeconds;
        let secondsPerKm;

        if (target === 'pace') {
            if (!isValid(seconds) || !isValid(distance)) return showError('Enter a time and a distance to calculate pace.');
            km = toKm(distance, distanceUnit.value);
            totalSeconds = seconds;
            secondsPerKm = seconds / km;
            paceInput.value = formatDuration(paceUnit.value === 'mi' ? secondsPerKm * KM_PER_MILE : secondsPerKm);
        } else if (target === 'time') {
            if (!isValid(distance) || !isValid(pace)) return showError('Enter a distance and a pace to calculate time.');
            km = toKm(distance, distanceUnit.value);
            secondsPerKm = paceUnit.value === 'mi' ? pace / KM_PER_MILE : pace;
            totalSeconds = km * secondsPerKm;
            timeInput.value = formatDuration(totalSeconds);
        } else {
            if (!isValid(seconds) || !isValid(pace)) return showError('Enter a time and a pace to calculate distance.');
            secondsPerKm = paceUnit.value === 'mi' ? pace / KM_PER_MILE : pace;
            km = seconds / secondsPerKm;
            totalSeconds = seconds;
            distanceInput.value = formatDistance(fromKm(km, distanceUnit.value));
            raceSelect.value = '';
        }

        showResult(km, totalSeconds, secondsPerKm);
    }

    function showResult(km, totalSeconds, secondsPerKm) {
        const secondsPerMile = secondsPerKm * KM_PER_MILE;
        const kmh = 3600 / secondsPerKm;
        const mph = 3600 / secondsPerMile;

        result.innerHTML = `
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><dt class="text-sm text-gray-500">Time</dt><dd class="text-xl font-semibold">${formatDuration(totalSeconds)}</dd></div>
                <div><dt class="text-sm text-gray-500">Distance</dt><dd class="text-xl font-semibold">${formatDistance(km / KM_PER_MILE)} mi / ${formatDistance(km)} km</dd></div>
                <div><dt class="text-sm text-gray-500">Pace</dt><dd class="text-xl font-semibold">${formatDuration(secondsPerMile)} /mi · ${formatDuration(secondsPerKm)} /km</dd></div>
                <div><dt class="text-sm text-gray-500">Speed</dt><dd class="text-xl font-semibold">${mph.toFixed(1)} mph · ${kmh.toFixed(1)} km/h</dd></div>
            </dl>`;

        showSplits(km, secondsPerKm);
    }

    function showSplits(km, secondsPerKm) {
        const unit = paceUnit.value;
        const unitKm = unit === 'mi' ? KM_PER_MILE : 1;
        const total = km / unitKm;
        const fullUnits = Math.floor(total + 1e-9);

        // Skip splits for very short or very long distances
        if (fullUnits < 1 || fullUnits > 100) {
            splits.innerHTML = '';
            return;
        }

        const rows = [];
        for (let i = 1; i <= fullUnits; i++) {
            rows.push([`${i} ${unit}`, formatDuration(i * unitKm * secondsPerKm)]);
        }
        if (total - fullUnits > 0.01) {
            rows.push([`${formatDistance(total)} ${unit}`, formatDuration(km * secondsPerKm)]);
        }

        splits.innerHTML = `
            <h2 class="text-2xl font-bold mb-4">Splits</h2>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse bg-white rounded-lg overflow-hidden">
                    <thead class="bg-gray-50">
                        <tr><th class="px-4 py-3 text-left font-semibold">Distance</th><th class="px-4 py-3 text-left font-semibold">Elapsed time</th></tr>
                    </thead>
                    <tbody class="divide-y">
                        ${rows.map(([d, t]) => `<tr><td class="px-4 py-2">${d}</td><td class="px-4 py-2">${t}</td></tr>`).join('')}
                    </tbody>
                </table>
            </div>`;
    }

    raceSelect.addEventListener('change', () => {
        const option = raceSelect.selectedOptions[0];
        if (!option.dataset.distance) return;
        distanceInput.value = option.dataset.distance;
        distanceUnit.value = option.dataset.unit;
    });

    distanceInput.addEventListener('input', () => { raceSelect.value = ''; });
    distanceUnit.addEventListener('change', () => { raceSelect.value = ''; });

    document.querySelectorAll('[data-calculate]').forEach(button => {
        button.addEventListener('click', () => calculate(button.dataset.calculate));
    });

    // Pressing Enter calculates whichever field is empty, defaulting to pace
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!timeInput.value.trim()) return calculate('time');
        if (!distanceInput.value.trim()) return calculate('distance');
        calculate('pace');
    });

    // Prefill from links like /calc?race=marathon
    const race = new URLSearchParams(window.location.search).get('race');
    if (race) {
        const option = raceSelect.querySelector(`option[value="${CSS.escape(race)}"]`);
        if (option) {
            raceSelect.value = race;
            raceSelect.dispatchEvent(new Event('change'));
        }
    }
})();
