document.getElementById('promptForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const prompt = document.getElementById('prompt').value;
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = 'Loading...';

    try {
        console.log('Sending request to /api/chat with prompt:', prompt);

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        console.log('Received response:', data);

        responseDiv.innerHTML = `<pre>${data.reply}</pre>`;
    } catch (error) {
        console.error('Error sending request:', error);
        responseDiv.innerHTML = 'An error occurred. Please try again.';
    }
});
