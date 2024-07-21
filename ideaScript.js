document.addEventListener('DOMContentLoaded', function() {
    const idea = JSON.parse(localStorage.getItem('idea'));
    console.log('Loaded idea from localStorage:', idea);

    if (idea) {
        const title = idea.title;
        const description = idea.description;

        document.getElementById('title').innerText = title;
        document.getElementById('description').innerText = description;

        // For poster, we can use a static placeholder as we don't have an AI image generator here
        document.getElementById('poster').src = 'https://via.placeholder.com/376x504.png?text=Generated+Poster';

        document.getElementById('saveButton').addEventListener('click', function() {
            html2canvas(document.body).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL();
                link.download = 'show-idea.png';
                link.click();
            });
        });
    }
});
