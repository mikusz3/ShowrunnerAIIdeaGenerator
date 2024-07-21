document.getElementById('generateButton').addEventListener('click', function() {
    const genre = document.getElementById('genre').value;
    const subgenre = document.getElementById('subgenre').value;
    const storyType = document.getElementById('storyType').value;
    const personalFlavor = document.getElementById('personalFlavor').value;

    console.log('Inputs:', { genre, subgenre, storyType, personalFlavor });

    const idea = {
        genre,
        subgenre,
        storyType,
        personalFlavor,
        title: "Test Title",
        description: "Test Description"
    };

    localStorage.setItem('idea', JSON.stringify(idea));
    console.log('Idea saved to localStorage:', idea);

    window.location.href = 'idea.html';
});
