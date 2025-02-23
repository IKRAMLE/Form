const form = document.getElementById('formulaire');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        name: form.querySelector('input[type="text"]').value,
        surname: form.querySelectorAll('input[type="text"]')[1].value,
        age: parseInt(document.getElementById('age').value),
        country: document.getElementById('country').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        occupation: document.getElementById('occupation').value,
        interest: document.getElementById('interest').value,
        file: document.getElementById('file').files[0]?.name || 'No file selected'
    };
    
    try {
        // Send data to server
        const response = await fetch('http://localhost:3000/api/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Form submission failed');
        }

        const result = await response.json();
        console.log('Form data saved to MongoDB:', result);

        // Show success page
        document.body.innerHTML = `
            <div class="container">
                <h1>Form Submission Results</h1>
                <div class="info-row">
                    <span class="label">Name:</span> ${formData.name}
                </div>
                <div class="info-row">
                    <span class="label">Surname:</span> ${formData.surname}
                </div>
                <div class="info-row">
                    <span class="label">Age:</span> ${formData.age}
                </div>
                <div class="info-row">
                    <span class="label">Country:</span> ${formData.country}
                </div>
                <div class="info-row">
                    <span class="label">Gender:</span> ${formData.gender}
                </div>
                <div class="info-row">
                    <span class="label">Occupation:</span> ${formData.occupation}
                </div>
                <div class="info-row">
                    <span class="label">Interest:</span> ${formData.interest}
                </div>
                <div class="info-row">
                    <span class="label">Uploaded File:</span> ${formData.file}
                </div>
                <div class="success-message">
                    Data has been successfully saved !
                </div>
            </div>
        `;

        document.body.style.cssText = `
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-image: url(https://i.pinimg.com/474x/f6/3b/77/f63b776781b03bcab790b4b7e685c6c5.jpg);
        `;

        const style = document.createElement('style');
        style.textContent = `
            .container {
                background-color: rgb(212, 158, 158);
                padding: 30px;
                border-radius: 10px;
                border: 3px solid rgb(155, 66, 80);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                max-width: 600px;
                width: 100%;
            }
            h1 {
                text-align: center;
                color: #000000;
                margin-bottom: 30px;
            }
            .info-row {
                margin-bottom: 15px;
                padding: 10px;
                background-color: rgba(255, 255, 255, 0.5);
                border-radius: 5px;
            }
            .label {
                font-weight: bold;
                color: rgb(146, 66, 79);
            }
            .success-message {
                margin-top: 20px;
                padding: 10px;
                background-color: rgba(0, 255, 0, 0.1);
                border-radius: 5px;
                text-align: center;
                color: green;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error saving form data. Please try again.');
    }
});