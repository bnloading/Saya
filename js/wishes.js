async function submitWish(event) {
  event.preventDefault();
  
  const wishForm = document.getElementById('wishForm');
  const submitButton = wishForm.querySelector('button[type="submit"]');
  
  try {
    submitButton.disabled = true;
    
    const formData = new FormData(wishForm);
    const wishData = {
      name: formData.get('name'),
      message: formData.get('message'),
      date: new Date().toISOString()
    };

    const response = await fetch('/api/wishes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wishData)
    });

    if (!response.ok) {
      throw new Error('Failed to send wish');
    }

    // Clear form and show success message
    wishForm.reset();
    showMessage('Thank you for your wish!', 'success');
    
  } catch (error) {
    console.error('Error:', error);
    showMessage('Failed to send your wish. Please try again.', 'error');
  } finally {
    submitButton.disabled = false;
  }
}

function showMessage(message, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.className = `alert alert-${type}`;
  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.className = '';
  }, 3000);
}