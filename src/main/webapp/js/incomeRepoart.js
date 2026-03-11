document.addEventListener('DOMContentLoaded', function () {

    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'Manager') {
        console.warn("User is not authenticated as Manager. Bypassing for dev purposes.");
    }

    const wrapper = document.getElementById('wrapper');
    const sidebarToggle = document.getElementById('sidebarToggle');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function (e) {
            e.preventDefault();
            wrapper.classList.toggle('toggled');
        });
    }

    document.addEventListener('click', function (event) {
        if (!wrapper || !sidebarToggle) return;
        const isClickInsideSidebar = wrapper.contains(event.target);
        const isClickOnToggle = sidebarToggle.contains(event.target);

        if (window.innerWidth < 992 && wrapper.classList.contains('toggled')) {
            if (!isClickInsideSidebar && !isClickOnToggle) {
                wrapper.classList.remove('toggled');
            }
        }
    });

    const generateBtn = document.getElementById('generateBtn');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const resultsSection = document.getElementById('resultsSection');
    const totalIncomeValue = document.getElementById('totalIncomeValue');
    const errorArea = document.getElementById('errorArea');
    const exportBtn = document.getElementById('exportBtn');

    let myChart = null;

    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    if (startDateInput && endDateInput) {
        startDateInput.valueAsDate = lastWeek;
        endDateInput.valueAsDate = today;
    }

    if (generateBtn) {
        generateBtn.addEventListener('click', function () {
            const startStr = startDateInput.value;
            const endStr = endDateInput.value;

            errorArea.classList.add('d-none');

            if (!startStr || !endStr) {
                showError("Please select both Start Date and End Date.");
                return;
            }

            const startDate = new Date(startStr);
            const endDate = new Date(endStr);

            if (startDate > endDate) {
                showError("Start Date cannot be later than End Date.");
                return;
            }

            const originalText = generateBtn.innerHTML;
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Generating...';
            resultsSection.classList.add('d-none');

            const requestBody = {
                startDate: startStr,
                endDate: endStr
            };

            let basePath = typeof contextPath !== 'undefined' ? contextPath : '/oceanViewResort_war_exploded';
            const apiUrl = window.location.origin + basePath + '/api/v1/manager/reports/income';

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to fetch data.");
                    return response.json();
                })
                .then(data => {
                    processReportData(data);
                })
                .catch(error => {
                    console.error("API Error:", error);
                    showError("Unable to load data from the server. Please check your connection.");
                })
                .finally(() => {
                    generateBtn.disabled = false;
                    generateBtn.innerHTML = originalText;
                });
        });
    }

    function showError(message) {
        errorArea.textContent = message;
        errorArea.classList.remove('d-none');
    }

    function processReportData(data) {
        const totalIncome = data.totalIncome || 0;
        const breakdown = data.dailyBreakdown || [];

        const chartLabels = [];
        const chartData = [];

        breakdown.forEach(item => {
            const dateObj = new Date(item.date);
            const formattedLabel = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            chartLabels.push(formattedLabel);
            chartData.push(item.income || 0);
        });

        animateValue(totalIncomeValue, 0, totalIncome, 1000);
        renderChart(chartLabels, chartData);

        resultsSection.classList.remove('d-none');
        void resultsSection.offsetWidth;
        resultsSection.classList.add('slide-up');
    }

    function renderChart(labels, data) {
        const ctx = document.getElementById('incomeChart');
        if (!ctx) return;

        const context = ctx.getContext('2d');

        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(context, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Daily Income (Rs.)',
                    data: data,
                    backgroundColor: '#0077b6',
                    borderRadius: 6,
                    barThickness: Math.max(10, 400 / (labels.length || 1)),
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#023e8a',
                        padding: 12,
                        titleFont: { family: 'Poppins' },
                        bodyFont: { family: 'Poppins' },
                        callbacks: {
                            label: function (context) {
                                return 'Rs. ' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#f0f0f0', drawBorder: false },
                        ticks: {
                            font: { family: 'Poppins' },
                            callback: function (value) {
                                return 'Rs. ' + value.toLocaleString();
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: 'Poppins' } }
                    }
                }
            }
        });
    }

    function animateValue(obj, start, end, duration) {
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            const currentValue = (progress * (end - start) + start);
            obj.innerHTML = currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const confirmLogout = confirm("Are you sure you want to logout of the Manager Portal?");
            if (confirmLogout) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userRole');
                localStorage.removeItem('username');
                localStorage.removeItem('userId');
                window.location.href = 'index.jsp';
            }
        });
    }
});