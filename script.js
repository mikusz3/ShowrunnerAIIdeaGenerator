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

    // Simulate API response
    const simulatedApiResponse = {
        choices: [
            {
                text: `Title: The Adventures of ${storyType} in ${genre}, Description: A thrilling journey through the world of ${genre} with a touch of ${personalFlavor}.`
            }
        ]
    };

    const generatedText = simulatedApiResponse.choices[0].text.trim();
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
});
