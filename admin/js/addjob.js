const form = document.querySelector('form')

form.onsubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Send a POST request to your server
    try {
        const response = await fetch('https://job-api-plum.vercel.app/addjob', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert("Job Added!")
            document.querySelectorAll('input').forEach(element=>{
                element.value=''
            })

        } else {
            console.error('Error:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
