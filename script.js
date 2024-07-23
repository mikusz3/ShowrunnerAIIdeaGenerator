document.addEventListener('DOMContentLoaded', function() {
    const genreSelect = document.getElementById('genre');
    const subgenreSelect = document.getElementById('subgenre');
    
    const genreSubgenres = {
        "Manga / Anime": ["Shonen", "Shojo", "Seinen", "Josei", "Mecha", "Isekai", "Slice of Life"],
        "Sci-Fi": ["Space Opera", "Cyberpunk", "Post-Apocalyptic", "Time Travel", "Alien Invasion"],
        "Drama": ["Medical", "Legal", "Political", "Family", "Teen"],
        "Comedy": ["Sitcom", "Romantic Comedy", "Dark Comedy", "Sketch Comedy", "Mockumentary"],
        "Horror": ["Supernatural", "Slasher", "Psychological", "Found Footage", "Gothic"],
        "Action": ["Spy", "Martial Arts", "Superhero", "Heist", "Military"],
        "Fantasy": ["High Fantasy", "Urban Fantasy", "Dark Fantasy", "Fairy Tale", "Magical Realism"],
        "Mystery": ["Detective", "Cozy Mystery", "Noir", "Whodunit", "True Crime"],
        "Romance": ["Contemporary", "Historical", "Paranormal", "Erotic", "LGBTQ+"],
        "Thriller": ["Psychological", "Crime", "Political", "Techno-thriller", "Conspiracy"],
        "Historical": ["Period Drama", "Alternate History", "Biographical", "War", "Ancient Civilizations"]
    };

    genreSelect.addEventListener('change', function() {
        const selectedGenre = this.value;
        subgenreSelect.innerHTML = '<option value="">Select Subgenre (Optional)</option>';
        
        if (selectedGenre in genreSubgenres) {
            genreSubgenres[selectedGenre].forEach(subgenre => {
                const option = document.createElement('option');
                option.value = subgenre;
                option.textContent = subgenre;
                subgenreSelect.appendChild(option);
            });
            subgenreSelect.disabled = false;
        } else {
            subgenreSelect.disabled = true;
        }
    });

    // Add event listener for the generate button
    document.getElementById('generate').addEventListener('click', generateIdea);
});

async function generateIdea() {
    const genre = document.getElementById('genre').value;
    const subgenre = document.getElementById('subgenre').value;
    const storyType = document.getElementById('storyType').value;
    const personalTouch = document.getElementById('personalTouch').value;

    const prompt = `Generate a title and description for a ${genre} ${subgenre} show that is a ${storyType} tale with ${personalTouch} elements.`;

    // Replace with your OpenAI API endpoint and key
    const apiKey = 'your-openai-api-key';
    const apiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const text = data.choices[0].text.trim().split('\n');
        const title = text[0];
        const description = text.slice(1).join(' ');

        const result = document.getElementById('result');
        const showTitle = document.getElementById('showTitle');
        const showDescription = document.getElementById('showDescription');
        const showPoster = document.getElementById('showPoster');

        showTitle.textContent = title;
        showDescription.textContent = description;
        showPoster.src = 'https://via.placeholder.com/376x504.png?text=Show+Poster';

        result.classList.remove('hidden');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
