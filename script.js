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

function generateIdea() {
    const genre = document.getElementById('genre').value;
    const subgenre = document.getElementById('subgenre').value;
    const storyType = document.getElementById('storyType').value;
    const personalTouch = document.getElementById('personalTouch').value;

    // Here you would typically make an API call to your AI service
    // For now, we'll just display a placeholder result
    const result = document.getElementById('result');
    const showTitle = document.getElementById('showTitle');
    const showDescription = document.getElementById('showDescription');
    const showPoster = document.getElementById('showPoster');

    showTitle.textContent = `${genre} ${subgenre}: A ${storyType} Tale`;
    showDescription.textContent = `An innovative ${genre} series with ${subgenre} elements, set in a ${storyType} world. This show brings a unique ${personalTouch} flavor to the screen.`;
    showPoster.src = 'https://via.placeholder.com/376x504.png?text=Show+Poster';

    result.classList.remove('hidden');
}