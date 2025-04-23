/**
 * Initializes the page when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    
    // Calendar elements
    const monthYearElement = document.getElementById('month-year');
    const calendarDates = document.getElementById('calendar-dates');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const todayButton = document.getElementById('today-button');
    const eventsList = document.getElementById('events');
    const addEventButton = document.getElementById('add-event-button');
    const eventModal = document.getElementById('add-appointment-modal');
    const closeModalButton = document.querySelector('.close-modal');
    const cancelButton = document.querySelector('.cancel-btn');
    const appointmentForm = document.getElementById('appointment-form');
    
    // State
    let currentDate = new Date();
    let selectedDate = null;
    let events = JSON.parse(localStorage.getItem('calendarEvents')) || [];
    
    // Initialize
    setupEventListeners();
    setupCart();
    renderCalendar();
    renderEventsList();
    updateNotificationBadges();
    loadUserProfile();
    
    /**
     * Sets up all event listeners
     */
    function setupEventListeners() {
        // Sidebar toggle
        if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
        if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Calendar navigation
        if (prevMonthButton) prevMonthButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        
        if (nextMonthButton) nextMonthButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
        
        if (todayButton) todayButton.addEventListener('click', () => {
            currentDate = new Date();
            selectedDate = new Date();
            renderCalendar();
            renderEventsList();
        });
        
        // Event management
        if (addEventButton) addEventButton.addEventListener('click', openAddAppointmentModal);
        if (closeModalButton) closeModalButton.addEventListener('click', closeAddAppointmentModal);
        if (cancelButton) cancelButton.addEventListener('click', closeAddAppointmentModal);
        
        if (appointmentForm) appointmentForm.addEventListener('submit', handleEventSubmit);
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('click', (e) => {
            if (eventModal && e.target === eventModal) {
                closeAddAppointmentModal();
            }
        });
    }
    
    /**
     * Toggles the sidebar
     */
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
        sidebarOverlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
    }
    
    /**
     * Closes the sidebar
     */
    function closeSidebar() {
        sidebar.classList.remove('active');
        sidebarToggle.classList.remove('active');
        sidebarOverlay.style.display = 'none';
    }
    
    /**
     * Handles window resize events
     */
    function handleResize() {
        if (window.innerWidth > 992) {
            closeSidebar();
        }
    }
    
    /**
     * Renders the calendar
     */
    function renderCalendar() {
        if (!monthYearElement || !calendarDates) return;
        
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
        monthYearElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        
        calendarDates.innerHTML = '';
        
        // Empty cells for days before the first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'date empty';
            calendarDates.appendChild(emptyCell);
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Cells for each day of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateCell = document.createElement('div');
            dateCell.className = 'date';
            dateCell.textContent = day;
            
            const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            
            // Check if it's a past date
            if (cellDate < today) {
                dateCell.classList.add('past-date');
                dateCell.title = "This date has passed";
            } 
            // Check if it's today
            else if (cellDate.getTime() === today.getTime()) {
                dateCell.classList.add('today');
                dateCell.title = "Today";
            }
            
            // Check for events
            const dateStr = formatDate(cellDate);
            const dateEvents = events.filter(event => event.date === dateStr);
            
            if (dateEvents.length > 0) {
                dateCell.classList.add('event');
                dateCell.title = `${dateEvents.length} appointment${dateEvents.length > 1 ? 's' : ''}`;
            }
            
            // Check if selected
            if (selectedDate && 
                cellDate.getFullYear() === selectedDate.getFullYear() && 
                cellDate.getMonth() === selectedDate.getMonth() && 
                cellDate.getDate() === selectedDate.getDate()) {
                dateCell.classList.add('selected');
            }
            
            // Only allow interaction with future dates or today
            if (cellDate >= today) {
                dateCell.addEventListener('click', () => {
                    selectedDate = cellDate;
                    renderCalendar();
                    renderEventsList();
                });
            }
            
            calendarDates.appendChild(dateCell);
        }
        
        // Fill remaining cells to complete the grid
        const totalCells = firstDay + daysInMonth;
        const remainingCells = 7 - (totalCells % 7);
        
        if (remainingCells < 7) {
            for (let i = 0; i < remainingCells; i++) {
                const emptyCell = document.createElement('div');
                emptyCell.className = 'date empty';
                calendarDates.appendChild(emptyCell);
            }
        }
    }
    
    /**
     * Renders the events list for the selected date
     */
    function renderEventsList() {
        if (!eventsList) return;
        
        eventsList.innerHTML = '';
        
        if (!selectedDate) {
            const noSelection = document.createElement('li');
            noSelection.textContent = 'Select a date to view appointments';
            eventsList.appendChild(noSelection);
            return;
        }
        
        const dateStr = formatDate(selectedDate);
        const dateEvents = events.filter(event => event.date === dateStr);
        
        if (dateEvents.length === 0) {
            const noEvents = document.createElement('li');
            noEvents.textContent = 'No appointments for this day';
            eventsList.appendChild(noEvents);
            return;
        }
        
        dateEvents.forEach((event, index) => {
            const eventItem = document.createElement('li');
            eventItem.innerHTML = `
                <div>
                    <strong>${event.title}</strong>
                    <div>${event.time} - ${event.vehicle}</div>
                    ${event.notes ? `<div class="event-notes">${event.notes}</div>` : ''}
                </div>
                <div class="event-actions">
                    <button class="delete-event" data-index="${index}">✕</button>
                </div>
            `;
            eventsList.appendChild(eventItem);
        });
        
        document.querySelectorAll('.delete-event').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                deleteEvent(dateStr, index);
            });
        });
    }
    
    /**
     * Opens the add appointment modal
     */
    function openAddAppointmentModal() {
        if (!selectedDate) {
            alert('Please select a date first');
            return;
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Cannot add appointments to past dates');
            return;
        }
        
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        const vehicleSelect = document.getElementById('appointment-vehicle');
        
        if (!vehicleSelect) return;
        
        vehicleSelect.innerHTML = '<option value="">Select a vehicle</option>';
        
        if (vehicles.length === 0) {
            alert('You need to add a vehicle first!');
            return;
        }
        
        vehicles.forEach(vehicle => {
            const option = document.createElement('option');
            option.value = `${vehicle.brand} ${vehicle.model} (${vehicle.plate})`;
            option.textContent = option.value;
            vehicleSelect.appendChild(option);
        });
        
        document.getElementById('appointment-date').value = formatDate(selectedDate);
        document.getElementById('appointment-title').value = '';
        document.getElementById('appointment-time').value = '';
        document.getElementById('appointment-notes').value = '';
        
        if (eventModal) {
            eventModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    /**
     * Closes the add appointment modal
     */
    function closeAddAppointmentModal() {
        if (eventModal) {
            eventModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    /**
     * Handles the appointment form submission
     */
    function handleEventSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('appointment-title').value.trim();
        const date = document.getElementById('appointment-date').value;
        const time = document.getElementById('appointment-time').value;
        const vehicle = document.getElementById('appointment-vehicle').value;
        const notes = document.getElementById('appointment-notes').value.trim();
        
        if (!title || !date || !time || !vehicle) {
            alert('Please fill all required fields');
            return;
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(date);
        
        if (selectedDate < today) {
            alert('Cannot add appointments to past dates');
            return;
        }
        
        const newEvent = {
            id: Date.now(),
            title,
            date,
            time,
            vehicle,
            notes,
            createdAt: new Date().toISOString()
        };
        
        events.push(newEvent);
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        
        closeAddAppointmentModal();
        renderCalendar();
        renderEventsList();
        updateNotificationBadges();
    }
    
    /**
     * Deletes an event
     */
    function deleteEvent(date, index) {
        let globalIndex = -1;
        let count = 0;
        
        for (let i = 0; i < events.length; i++) {
            if (events[i].date === date) {
                if (count === index) {
                    globalIndex = i;
                    break;
                }
                count++;
            }
        }
        
        if (globalIndex !== -1) {
            events.splice(globalIndex, 1);
            localStorage.setItem('calendarEvents', JSON.stringify(events));
            renderCalendar();
            renderEventsList();
            updateNotificationBadges();
        }
    }
    
    /**
     * Formats a date as YYYY-MM-DD
     */
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /**
     * Sets up cart functionality
     */
    function setupCart() {
        const cartIconContainer = document.getElementById('cart-icon-container');
        if (!cartIconContainer) return;

        const cartPopup = cartIconContainer.querySelector('.cart-popup');

        // Initial cart update
        updateCartPopup();

        // Mobile behavior
        function toggleCartPopup(event) {
            if (window.matchMedia("(max-width: 768px)").matches) {
                event.stopPropagation();
                cartPopup.classList.toggle('show');
            }
        }

        cartIconContainer.addEventListener('click', toggleCartPopup);

        // Close popup when clicking outside on mobile
        document.addEventListener('click', (event) => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                if (!cartIconContainer.contains(event.target)) {
                    cartPopup.classList.remove('show');
                }
            }
        });

        // Prevent popup from closing when clicking inside it
        cartPopup.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        // Close popup completely on resize
        window.addEventListener('resize', () => {
            cartPopup.classList.remove('show');
        });

        // Event delegation for cart buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('quantity-btn')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                const delta = parseInt(e.target.getAttribute('data-delta'));
                changeQuantity(index, delta);
            }
            
            if (e.target.classList.contains('remove-btn')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                removeFromCart(index);
            }
        });
    }

    /**
     * Updates the cart popup content and totals
     */
    function updateCartPopup() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
        // Update cart total in header
        const cartTotalElement = document.getElementById('cart-total');
        if (cartTotalElement) {
            cartTotalElement.textContent = `${cartTotal.toFixed(2)}€`;
        }
      
        // Update popup content
        const cartPopupContent = document.getElementById('cartPopupContent');
        if (cartPopupContent) {
            if (cartItems.length === 0) {
                cartPopupContent.innerHTML = '<div class="empty-cart-message">Cart empty</div>';
            } else {
                cartPopupContent.innerHTML = cartItems.map((item, index) => `
                    <div class="cart-item">
                        <img src="${item.image || 'assets/default-part.png'}" alt="${item.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">${item.price.toFixed(2)}€</div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn" data-index="${index}" data-delta="-1">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn" data-index="${index}" data-delta="1">+</button>
                            </div>
                        </div>
                        <button class="remove-btn" data-index="${index}">✖</button>
                    </div>
                `).join('');
            }
        }
      
        // Update totals
        const totalPriceElement = document.querySelector('.total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `${cartTotal.toFixed(2)}€`;
        }
    }

    /**
     * Changes the quantity of a cart item
     */
    function changeQuantity(index, delta) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems[index]) {
            cartItems[index].quantity += delta;
            
            // Remove if quantity is 0 or less
            if (cartItems[index].quantity <= 0) {
                cartItems.splice(index, 1);
            }
            
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartPopup();
            updateNotificationBadges();
        }
    }

    /**
     * Removes an item from the cart
     */
    function removeFromCart(index) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems[index]) {
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartPopup();
            updateNotificationBadges();
        }
    }

    /**
     * Updates all notification badges
     */
    function updateNotificationBadges() {
        // Cart badge
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartBadge = document.querySelector('.notification-badge-cart');
        if (cartBadge) {
            const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartBadge.textContent = totalItems;
        }

        // Appointments badge
        const appointments = JSON.parse(localStorage.getItem('calendarEvents')) || [];
        const appointBadge = document.querySelector('.notification-badge-appoint');
        if (appointBadge) {
            appointBadge.textContent = appointments.length;
        }

        // Garage badge
        const vehicles = JSON.parse(localStorage.getItem('garage')) || [];
        const garageBadge = document.querySelector('.notification-badge-garage');
        if (garageBadge) {
            garageBadge.textContent = vehicles.length;
        }

        // Wishlist badge
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const wishlistBadge = document.querySelector('.notification-badge-wishlist');
        if (wishlistBadge) {
            wishlistBadge.textContent = wishlist.length;
        }
    }

    /**
     * Loads user profile data
     */
    function loadUserProfile() {
        const authText = document.getElementById('auth-text');
        const authIcon = document.getElementById('header-profile-img');
        const authIconBig = document.getElementById('profile-avatar');
        const emailValue = document.getElementById('email-value');

        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

        if (currentUser) {
            authText.textContent = currentUser.name || "user1234";
            emailValue.textContent = currentUser.email;
            authIcon.src = currentUser.avatar || "assets/profile.svg";
            authIconBig.src = currentUser.avatar || "assets/profile.svg";
            authIcon.alt = currentUser.name || "user1234";
        } else {
            authText.textContent = "Sign In";
            authIcon.src = "assets/profile.svg"; 
            authIcon.alt = "Sign In";
        }
    }
});

// Event listeners for data updates
document.addEventListener('cartUpdated', updateNotificationBadges);
document.addEventListener('garageUpdated', updateNotificationBadges);
document.addEventListener('appointmentsUpdated', updateNotificationBadges);
document.addEventListener('wishlistUpdated', updateNotificationBadges);