document.addEventListener('DOMContentLoaded', function () {

    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    if (!token || role !== 'Receptionist') {
        console.warn("User is not authenticated as Receptionist. Bypassing for dev purposes.");
    }

    window.handleAction = function (actionName) {
        console.log(`Action triggered: ${actionName}`);

        setTimeout(() => {
            if (actionName === 'New Reservation') {
                window.location.href = 'newBooking.jsp';
            } else if (actionName === 'Find Reservation') {
                window.location.href = 'viewReservation.jsp';
            } else if (actionName === 'Guest Checkout') {
                window.location.href = 'bill.jsp';
            } else if (actionName === 'Help Guidelines') {
                window.location.href = 'help.jsp';
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Module in Progress',
                    text: `Opening module: ${actionName}...\n\n(This is a demo interface)`,
                    confirmButtonColor: '#0077b6'
                });
            }
        }, 100);
    };

    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                title: 'Ready to Leave?',
                text: 'Are you sure you want to log out of the Reception Portal?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#0077b6',
                confirmButtonText: 'Yes, Logout'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userRole');
                    localStorage.removeItem('username');
                    localStorage.removeItem('userId');

                    Swal.fire({
                        icon: 'success',
                        title: 'Logged Out',
                        text: 'You have been successfully logged out.',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.href = 'index.jsp';
                    });
                }
            });
        });
    }

    const cards = document.querySelectorAll('.action-card');

    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');

            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s linear';
            ripple.style.pointerEvents = 'none';

            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            card.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    function updateShiftInfo() {
        const shiftDisplay = document.getElementById('currentShiftDisplay');
        if (!shiftDisplay) return;

        const currentHour = new Date().getHours();
        let shiftName = "";
        let shiftTime = "";

        if (currentHour >= 8 && currentHour < 16) {
            shiftName = "Morning";
            shiftTime = "08:00 - 16:00";
        } else if (currentHour >= 16 && currentHour <= 23) {
            shiftName = "Evening";
            shiftTime = "16:00 - 00:00";
        } else {
            shiftName = "Night";
            shiftTime = "00:00 - 08:00";
        }

        shiftDisplay.textContent = `${shiftName} (${shiftTime})`;
    }

    updateShiftInfo();


});