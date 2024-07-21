document.getElementById('generateButton').addEventListener('click', async function() {
    const genre = document.getElementById('genre').value;
    const subgenre = document.getElementById('subgenre').value;
    const storyType = document.getElementById('storyType').value;
    const personalFlavor = document.getElementById('personalFlavor').value;

    console.log('Inputs:', { genre, subgenre, storyType, personalFlavor });

    const idea = {
        genre,
        subgenre,
        storyType,
        personalFlavor
    };

    const groqCloudApiKey = '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';
    const prompt = `Generate a unique title and a brief description for a TV show with the following elements:
    - Genre: ${genre}
    - Subgenre: ${subgenre ? subgenre : 'None'}
    - Type of story: ${storyType}
    - Personal flavor: ${personalFlavor}
    Provide the title and description in the format: Title: [title], Description: [description].`;

    try {
        console.log('Sending request to GroqCloud API...');
        const response = await fetch('https://api.groqcloud.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${groqCloudApiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 150
            })
        });

        console.log('API Response Status:', response.status);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response Data:', data);

        const generatedText = data.choices[0].text.trim();
        console.log('Generated Text:', generatedText);

        // Extract title and description from the generated text
        const titleMatch = generatedText.match(/Title:\s*(.*),\s*Description:/);
        const descriptionMatch = generatedText.match(/Description:\s*(.*)/);

        const title = titleMatch ? titleMatch[1].trim() : 'Untitled Show';
        const description = descriptionMatch ? descriptionMatch[1].trim() : 'No description available.';

        console.log('Title:', title);
        console.log('Description:', description);

        idea.title = title;
        idea.description = description;

        localStorage.setItem('idea', JSON.stringify(idea));
        console.log('Idea saved to localStorage:', idea);

        console.log('Redirecting to idea.html');
        window.location.href = 'idea.html';
    } catch (error) {
        console.error('Error generating idea:', error);
    }
});
