document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('laundry-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const btnText = document.querySelector('.btn-text');
    
    // Set minimum date to today for the date picker
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Custom Alert Function
    function showCustomAlert(title, message, isError = false) {
        const alertBox = document.getElementById('custom-alert');
        document.querySelector('.alert-title').textContent = title;
        document.querySelector('.alert-message').textContent = message;
        document.querySelector('.alert-icon').textContent = isError ? '❌' : '🎉';
        alertBox.classList.remove('hidden');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // UI feedback - loading state
        submitBtn.disabled = true;
        btnText.textContent = "Spinning...";
        errorMessage.classList.add('hidden');
        
        // Gather form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            // Obfuscated tokens to prevent basic scraping bots from stealing them
            const pt1 = "8412589405";
            const pt2 = "AAFIJXZ1cCLNMK6iJh4sp3OivpIQVOiLvkw";
            const cid = "1200648460";
            
            // Format the Telegram message
            const message = `🫧 *New Laundry Booking - SpinDoor!* 🫧\n\n` +
                            `👤 *Name:* ${data.name || 'N/A'}\n` +
                            `📞 *Phone:* ${data.phone || 'N/A'}\n` +
                            `🏠 *Address:* ${data.address || 'N/A'}\n` +
                            `👕 *Service:* ${data.service || 'N/A'}\n` +
                            `🗓 *Pickup Date:* ${data.date || 'N/A'}\n\n` +
                            `🚀 *SpinDoor - Wash away your troubles!*`;

            const telegramUrl = `https://api.telegram.org/bot${pt1}:${pt2}/sendMessage`;
            
            // Send directly to Telegram API
            const response = await fetch(telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: cid,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });
            
            const result = await response.json();
            
            // Telegram API uses 'ok' instead of 'success'
            if (result.ok) {
                // Hide form and show funny washing machine animation
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');
                
                // Show beautiful custom modal
                showCustomAlert("Awesome!", "Your pickup has been scheduled successfully!");
            } else {
                showCustomAlert("Oops!", "Telegram Error: " + (result.description || "Unknown error"), true);
                throw new Error(result.description || 'Failed to book');
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.classList.remove('hidden');
            
            // Reset button
            submitBtn.disabled = false;
            btnText.textContent = "Schedule Pickup";
        }
    });
});
